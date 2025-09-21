import type { Resident, Package } from './types'

// Base API URL for all requests
const BASE = 'https://ark-takehome-assessment.vercel.app/api'

// Utility: wait for a given number of milliseconds (used for retry backoff)
function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms))
}

// Generic fetch helper with retry + exponential backoff
async function fetchWithRetry<T>(
  input: RequestInfo, 
  init?: RequestInit, 
  attempts = 4
) : Promise<T> {
  let i = 0
  let lastErr: any

  // Try up to `attempts` times
  while (i < attempts) {
    try {
      // Setup timeout + abort controller to cancel slow requests
      const controller = new AbortController()
      const signal = controller.signal
      const timeout = setTimeout(() => controller.abort(), 15000)

      // Make the request
      const res = await fetch(input, { ...init, signal })
      clearTimeout(timeout)

      // Check for HTTP errors
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      // Parse JSON response
      const data = await res.json()
      return data as T
    } catch (err) {
      // Save last error and retry if attempts remain
      lastErr = err
      i++

      // wait before next retry
      if (i < attempts) await sleep(1000)
    }
  }
  // If all attempts fail, throw the last error
  throw lastErr
}

// Fetch all residents
// API returns { residents: Resident[] } so we unwrap it
export async function getResidents(): Promise<Resident[]> {
  const data = await fetchWithRetry<{ residents: Resident[] }>(`${BASE}/residents`)

  if (Array.isArray((data as any).residents)) {
    return (data as any).residents
  }

  throw new Error("Unexpected residents response")
}

// Fetch a single resident by ID
// API returns a Resident object directly
export async function getResident(id: string): Promise<Resident> {
  return fetchWithRetry<Resident>(`${BASE}/residents/${encodeURIComponent(id)}`)
}

// Fetch all packages
// API returns { packages: Package[] } so we unwrap it
export async function getPackages(): Promise<Package[]> {
  const data = await fetchWithRetry<{ packages: Package[] }>(`${BASE}/packages`)

  if (Array.isArray((data as any).packages)) {
    return (data as any).packages
  }

  throw new Error("Unexpected packages response")
}