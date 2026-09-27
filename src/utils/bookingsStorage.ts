import type { Booking, BookingStatus } from '../types'

const STORAGE_KEY = 'alshifa-bookings'

function readAll(): Booking[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(bookings: Booking[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings))
  } catch {
    // localStorage may be unavailable (private browsing, quota, etc.) — fail silently
  }
}

export function getBookings(): Booking[] {
  return readAll().sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
}

export function addBooking(booking: Booking) {
  const bookings = readAll()
  bookings.push(booking)
  writeAll(bookings)
}

export function updateBookingStatus(
  id: string,
  status: BookingStatus,
  changes?: Partial<Pick<Booking, 'date' | 'time'>>
) {
  const bookings = readAll()
  const next = bookings.map((b) => (b.id === id ? { ...b, status, ...changes } : b))
  writeAll(next)
  return next
}
