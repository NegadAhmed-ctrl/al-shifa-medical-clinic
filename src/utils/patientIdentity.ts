const STORAGE_KEY = 'alshifa-current-patient-phone'

export function normalizePhone(value: string) {
  return value.replace(/\s|-/g, '')
}

export function getStoredPhone(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

export function setStoredPhone(phone: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, normalizePhone(phone))
  } catch {
    // localStorage may be unavailable — fail silently, the site still works
  }
}

export function clearStoredPhone() {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
}
