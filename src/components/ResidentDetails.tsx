import React from 'react'
import type { Resident, Package as Pkg } from '../types'

// Props for the component:
type Props = { resident: Resident | null, packages: Pkg[] }

// Component: shows details for the selected resident
export const ResidentDetails: React.FC<Props> = ({ resident, packages }) => {
  if (!resident) 
    return (
      <div className="panel">
        <h3>Select a resident</h3>
      </div>
    )
    
  // Filter packages that belong to this resident
  const list = packages.filter(p => p.residentId === resident.id)

  // Render resident details and their packages
  return ( 
    <div className="panel">
      <h3>
        {resident.firstName} {resident.lastName} {resident.homeAddress}
      </h3>
      <ul>
        {list.map(p => 
          <li key={p.id}>{p.status} - {p.id}</li>)}
      </ul>
    </div>
  )
}