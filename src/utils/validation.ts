export function isValidEgyptianPhone(value: string) {
  const cleaned = value.replace(/\s|-/g, '')
  return /^01[0125]\d{8}$/.test(cleaned)
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

export function isFutureDate(value: string) {
  if (!value) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const picked = new Date(value)
  return picked.getTime() >= today.getTime()
}

export function generateReferenceId() {
  return 'ASH-' + Math.random().toString(36).slice(2, 8).toUpperCase()
}
