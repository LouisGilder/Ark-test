import React, { useEffect, useMemo, useState } from 'react'
import { getResidents, getPackages } from './api'
import type { Resident, Package as Pkg } from './types'
import { ResidentList } from './components/ResidentList'
import { ResidentDetails } from './components/ResidentDetails'
import { ErrorBoundary } from './components/ErrorBoundary'

// Simple loading spinner component
function Spinner() {
  return <div className="loading">Loading…</div>
}

// Main application component
export default function App() {
  // State variables
  const [residents, setResidents] = useState<Resident[] | null>(null)
  const [packages, setPackages] = useState<Pkg[] | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Load data when the component mounts
  useEffect(() => {
    // flag to avoid state updates after unmount
    let mounted = true

    async function loadAll() {
      // clear any previous errors
      setError(null)
      try {
        // Fetch both residents and packages concurrently
        const [res, pkgs] = await Promise.all([getResidents(), getPackages()])

        // ignore results if component unmounted
        if (!mounted) return

        // Save data to state
        setResidents(res)
        setPackages(pkgs)
      } catch (err: any) {
        // Catch and store error message
        setError(err?.message ?? 'Failed to load')
      }
    }

    loadAll()

    // Cleanup: set flag false so async response is ignored after unmount
    return () => { mounted = false }
  }, [])

  // Compute number of unassigned packages (no residentId)
  const unassignedCount = useMemo(() => {
    if (!packages) return 0
    return packages.filter((p) => !p.residentId).length
  }, [packages])

  // If there was a loading error, show message
  if (error) {
    return (
      <div style={{padding:24}}>
        <h2>Unable to load data</h2>
        <p className="muted">{error}</p>
      </div>
    )
  }

  // If data is still loading, show spinner
  if (!residents || !packages) {
    return <Spinner />
  }

  // Find the currently selected resident (or null if none selected)
  const selectedResident = residents.find((r) => r.id === selected) ?? null

  // Main app layout wrapped in an ErrorBoundary
  return (
    <ErrorBoundary>
      <div className="app">
        {/* Header with title and unassigned package count */}
        <div className="header">
          <h1>Ark — Package Dashboard</h1>
          <div className="top-unassigned">Unassigned packages: {unassignedCount}</div>
        </div>
        
        {/* Sidebar: list of residents with package counts */}
        <ResidentList 
          residents={residents} 
          packages={packages} 
          onSelect={(id) => setSelected(id)} 
          selectedId={selected} 
        />
        
        {/* Main panel: details of the selected resident */}
        <ResidentDetails 
          resident={selectedResident} 
          packages={packages} 
        />

      </div>
    </ErrorBoundary>
  )
}