import { useEffect, useState, type FormEvent } from 'react'
import { UserRound } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { getBookings, updateBookingStatus } from '../utils/bookingsStorage'
import { getStoredPhone, setStoredPhone, clearStoredPhone, normalizePhone } from '../utils/patientIdentity'
import { isValidEgyptianPhone } from '../utils/validation'
import { useToast } from '../components/Toast'
import { BookingCard } from '../components/BookingCard'
import { EmptyState } from '../components/StateViews'
import { ActionButton, LinkButton } from '../components/Button'
import { CalendarX2 } from 'lucide-react'
import type { Booking } from '../types'

export function MyBookings() {
  const { t } = useLanguage()
  const { showToast } = useToast()
  const [phone, setPhone] = useState<string | null>(null)
  const [phoneInput, setPhoneInput] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    setPhone(getStoredPhone())
  }, [])

  useEffect(() => {
    if (phone) setBookings(getBookings())
  }, [phone])

  function handleIdentify(e: FormEvent) {
    e.preventDefault()
    if (!isValidEgyptianPhone(phoneInput)) {
      setPhoneError(t('myBookingsPage.identifyInvalid'))
      return
    }
    setStoredPhone(phoneInput)
    setPhone(normalizePhone(phoneInput))
  }

  function handleSwitchPhone() {
    clearStoredPhone()
    setPhone(null)
    setPhoneInput('')
    setPhoneError('')
  }

  function refresh(next: Booking[]) {
    setBookings([...next].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
  }

  function handleCancel(id: string) {
    refresh(updateBookingStatus(id, 'cancelled'))
    showToast(t('common.toastBookingCancelled'), 'info')
  }

  function handleReschedule(id: string, date: string, time: string) {
    refresh(updateBookingStatus(id, 'rescheduled', { date, time }))
    showToast(t('common.toastBookingRescheduled'), 'success')
  }

  if (!phone) {
    return (
      <section className="mx-auto max-w-md px-5 py-20 md:px-8">
        <div className="rounded-clinic border border-navy/10 bg-white p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600">
            <UserRound size={24} />
          </span>
          <h1 className="mt-5 font-display text-2xl text-navy">{t('myBookingsPage.identifyTitle')}</h1>
          <p className="mt-2 text-sm text-navy/60">{t('myBookingsPage.identifyDesc')}</p>

          <form onSubmit={handleIdentify} className="mt-6 flex flex-col gap-3 text-start">
            <input
              dir="ltr"
              value={phoneInput}
              onChange={(e) => {
                setPhoneInput(e.target.value)
                setPhoneError('')
              }}
              placeholder={t('myBookingsPage.identifyPlaceholder')}
              className={`rounded-xl border bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/35 focus-visible:outline-2 ${
                phoneError ? 'border-red-300' : 'border-navy/15'
              }`}
            />
            {phoneError && <span className="text-xs text-red-500">{phoneError}</span>}
            <ActionButton type="submit" className="mt-1 w-full">
              {t('myBookingsPage.identifySubmit')}
            </ActionButton>
          </form>
        </div>
      </section>
    )
  }

  const myBookings = bookings.filter((b) => normalizePhone(b.phone) === phone)

  return (
    <section className="mx-auto max-w-4xl px-5 py-14 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <h1 className="font-display text-3xl text-navy md:text-4xl">{t('myBookingsPage.title')}</h1>
          <p className="mt-3 text-navy/60">{t('myBookingsPage.subtitle')}</p>
        </div>
        <button onClick={handleSwitchPhone} className="text-sm font-medium text-teal-600 hover:underline">
          {t('myBookingsPage.switchPhone')}
        </button>
      </div>

      <div className="mt-10">
        {myBookings.length === 0 ? (
          <div className="flex flex-col items-center gap-5">
            <EmptyState
              icon={<CalendarX2 size={22} />}
              title={t('myBookingsPage.emptyTitle')}
              description={t('myBookingsPage.noBookingsForPhone')}
            />
            <LinkButton to="/appointment">{t('myBookingsPage.emptyCta')}</LinkButton>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {myBookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} onCancel={handleCancel} onReschedule={handleReschedule} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
