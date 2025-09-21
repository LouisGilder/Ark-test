export type Resident = {
  id: string
  firstName: string | null
  lastName: string | null
  email: string
  homeAddress: string
}

export type Package = {
  id: string
  createdAt: string
  residentId: string | null
  status: 'DELIVERED' | 'COLLECTED' | 'MISSING'
  collectedAt: string | null
}