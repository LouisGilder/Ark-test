import React from 'react'
import type { Resident, Package } from '../types'

// Define the props this component expects
type Props = { 
  residents: Resident[], 
  packages: Package[], 
  onSelect: (id: string) => void, 
  selectedId: string | null 
}

// Utility function to display a resident's name.
// If first/last names are missing, fallback to email.
function nameOf(r: Resident) {
  const name = `${r.firstName ?? ''} ${r.lastName ?? ''}`.trim()
  return name || r.email
}

// Main component: shows a list of residents and their package counts.
export const ResidentList: React.FC<Props> = ({ residents, packages, onSelect, selectedId }) => {
  // Create a map where the key is residentId and the value is that resident's packages.
  const map = new Map<string, Package[]>()

  // Group packages by residentId
  for (const p of packages) {
    // Skip unassigned packages
    if (!p.residentId) continue 

    // Get existing list or start new
    const arr = map.get(p.residentId) ?? []

    arr.push(p)
    map.set(p.residentId, arr)
  }

  return <div className="panel"><h3>Residents</h3><ul>{residents.map(r => {
    // Get all packages for this resident (or empty if none)
    const pkgs = map.get(r.id) ?? []

    return (
      <li 
        key={r.id} 
        onClick={() => onSelect(r.id)} 
        style={{cursor:'pointer',fontWeight:selectedId===r.id?'bold':'normal'}}
      >
        {nameOf(r)} ({pkgs.length})
      </li>
    )
  })}</ul></div>
}