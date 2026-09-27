// ⚠️ DEMO-ONLY AUTH — NOT REAL SECURITY.
// This is a single hardcoded password checked entirely in the browser, with no
// server, no hashing, and no session expiry. Anyone can read this constant by
// opening the compiled JS bundle. Before this dashboard is used with real
// patient data, replace this with proper authentication (a real backend,
// hashed credentials, and a server-side session/token) and move the bookings
// data itself behind that same backend instead of localStorage.
export const ADMIN_PASSWORD = 'clinic-admin-2026'

export function checkAdminPassword(input: string) {
  return input === ADMIN_PASSWORD
}
