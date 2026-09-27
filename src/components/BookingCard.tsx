import { useState } from 'react'
import { User, Stethoscope, CalendarDays, Clock, X, CalendarClock } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { ActionButton } from './Button'
import type { Booking, BookingStatus } from '../types'

const statusStyles: Record<BookingStatus, string> = {
  confirmed: 'bg-teal-100 text-teal-700',
  rescheduled: 'bg-amber-soft text-amber',
  cancelled: 'bg-red-100 text-red-500',
}

interface BookingCardProps {
  booking: Booking
  onCancel: (id: string) => void
  onReschedule: (id: string, date: string, time: string) => void
}

export function BookingCard({ booking, onCancel, onReschedule }: BookingCardProps) {
  const { t } = useLanguage()
  const [editing, setEditing] = useState(false)
  const [newDate, setNewDate] = useState(booking.date)
  const [newTime, setNewTime] = useState(booking.time)

  const isCancelled = booking.status === 'cancelled'
  const statusLabel = {
    confirmed: t('myBookingsPage.statusConfirmed'),
    rescheduled: t('myBookingsPage.statusRescheduled'),
    cancelled: t('myBookingsPage.statusCancelled'),
  }[booking.status]

  function handleSave() {
    if (!newDate || !newTime) return
    onReschedule(booking.id, newDate, newTime)
    setEditing(false)
  }

  function handleCancelClick() {
    if (window.confirm(t('myBookingsPage.cancelConfirm'))) {
      onCancel(booking.id)
    }
  }

  return (
    <div className="rounded-clinic border border-navy/10 bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-lg text-navy">{booking.doctorName || booking.specialtyName}</p>
          <p className="text-xs text-navy/45" dir="ltr">
            {t('myBookingsPage.bookedOn')}: {new Date(booking.createdAt).toLocaleDateString()}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyles[booking.status]}`}>
          {statusLabel}
        </span>
      </div>

      <div className="mt-4 grid gap-3 text-sm text-navy/70 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <User size={15} className="shrink-0 text-teal-600" />
          <span>{t('myBookingsPage.patient')}: {booking.patientName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Stethoscope size={15} className="shrink-0 text-teal-600" />
          <span>{t('myBookingsPage.specialty')}: {booking.specialtyName}</span>
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays size={15} className="shrink-0 text-teal-600" />
          <span dir="ltr">{t('myBookingsPage.date')}: {booking.date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={15} className="shrink-0 text-teal-600" />
          <span dir="ltr">{t('myBookingsPage.time')}: {booking.time}</span>
        </div>
      </div>

      {!isCancelled && (
        <div className="mt-5 border-t border-navy/10 pt-4">
          {editing ? (
            <div className="flex flex-wrap items-end gap-3">
              <label className="flex flex-col gap-1 text-xs text-navy/60">
                {t('myBookingsPage.newDate')}
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="rounded-lg border border-navy/15 px-3 py-2 text-sm"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-navy/60">
                {t('myBookingsPage.newTime')}
                <input
                  type="time"
                  value={newTime}
                  onChange={(e) => setNewTime(e.target.value)}
                  className="rounded-lg border border-navy/15 px-3 py-2 text-sm"
                />
              </label>
              <ActionButton size="md" onClick={handleSave}>
                {t('myBookingsPage.saveChanges')}
              </ActionButton>
              <ActionButton size="md" variant="ghost" onClick={() => setEditing(false)}>
                {t('myBookingsPage.cancelEdit')}
              </ActionButton>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <ActionButton size="md" variant="secondary" onClick={() => setEditing(true)} icon={<CalendarClock size={15} />}>
                {t('myBookingsPage.reschedule')}
              </ActionButton>
              <ActionButton size="md" variant="ghost" onClick={handleCancelClick} icon={<X size={15} />} className="!text-red-500 hover:!bg-red-50">
                {t('myBookingsPage.cancel')}
              </ActionButton>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
