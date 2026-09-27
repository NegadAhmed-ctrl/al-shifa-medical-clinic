import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { LockKeyhole, LogOut, ArrowUpDown } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { getBookings } from '../utils/bookingsStorage'
import { checkAdminPassword } from '../utils/adminAuth'
import { ActionButton } from '../components/Button'
import { EmptyState } from '../components/StateViews'
import type { Booking, BookingStatus } from '../types'

const statusBadge: Record<BookingStatus, string> = {
  confirmed: 'bg-teal-100 text-teal-700',
  rescheduled: 'bg-amber-soft text-amber',
  cancelled: 'bg-red-100 text-red-500',
}

// Session-only: authentication resets on every page reload, since this is a
// demo gate and not a real login system. See src/utils/adminAuth.ts.
export function AdminBookings() {
  const { t } = useLanguage()
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [bookings, setBookings] = useState<Booking[]>([])
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
  const [sortAsc, setSortAsc] = useState(false)

  useEffect(() => {
    if (authed) setBookings(getBookings())
  }, [authed])

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    if (checkAdminPassword(password)) {
      setAuthed(true)
      setError('')
    } else {
      setError(t('adminPage.invalidPassword'))
    }
  }

  const rows = useMemo(() => {
    const filtered = statusFilter === 'all' ? bookings : bookings.filter((b) => b.status === statusFilter)
    return [...filtered].sort((a, b) => {
      const diff = new Date(a.date + 'T' + (a.time || '00:00')).getTime() - new Date(b.date + 'T' + (b.time || '00:00')).getTime()
      return sortAsc ? diff : -diff
    })
  }, [bookings, statusFilter, sortAsc])

  if (!authed) {
    return (
      <section className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-5 py-14">
        <div className="rounded-clinic border border-navy/10 bg-white p-8 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy/5 text-navy/60">
            <LockKeyhole size={22} />
          </span>
          <h1 className="mt-5 font-display text-xl text-navy">{t('adminPage.title')}</h1>
          <p className="mt-2 text-sm text-navy/55">{t('adminPage.subtitle')}</p>
          <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-3 text-start">
            <input
              type="password"
              dir="ltr"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder={t('adminPage.passwordPlaceholder')}
              className={`rounded-xl border bg-white px-4 py-2.5 text-sm text-navy focus-visible:outline-2 ${
                error ? 'border-red-300' : 'border-navy/15'
              }`}
            />
            {error && <span className="text-xs text-red-500">{error}</span>}
            <ActionButton type="submit" className="mt-1 w-full">
              {t('adminPage.submit')}
            </ActionButton>
          </form>
        </div>
      </section>
    )
  }

  const statusFilters: Array<BookingStatus | 'all'> = ['all', 'confirmed', 'rescheduled', 'cancelled']
  const statusLabel: Record<BookingStatus | 'all', string> = {
    all: t('adminPage.filterAll'),
    confirmed: t('adminPage.filterConfirmed'),
    rescheduled: t('adminPage.filterRescheduled'),
    cancelled: t('adminPage.filterCancelled'),
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl text-navy md:text-3xl">{t('adminPage.title')}</h1>
          <p className="mt-2 text-sm text-navy/55">
            {t('adminPage.totalCount')}: {bookings.length}
          </p>
        </div>
        <button
          onClick={() => setAuthed(false)}
          className="flex items-center gap-1.5 rounded-full border border-navy/15 px-4 py-2 text-sm font-medium text-navy/60 hover:border-red-200 hover:text-red-500"
        >
          <LogOut size={14} />
          {t('adminPage.logout')}
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {statusFilters.map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
              statusFilter === s ? 'border-teal-500 bg-teal-500 text-white' : 'border-navy/15 text-navy/60 hover:border-teal-300'
            }`}
          >
            {statusLabel[s]}
          </button>
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-clinic border border-navy/10 bg-white shadow-soft">
        {rows.length === 0 ? (
          <div className="p-8">
            <EmptyState title={t('adminPage.empty')} />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-start text-sm">
              <thead className="border-b border-navy/10 bg-teal-50/50 text-navy/60">
                <tr>
                  <th className="px-4 py-3 text-start font-medium">{t('adminPage.tablePatient')}</th>
                  <th className="px-4 py-3 text-start font-medium" dir="ltr">
                    {t('adminPage.tablePhone')}
                  </th>
                  <th className="px-4 py-3 text-start font-medium">{t('adminPage.tableDoctor')}</th>
                  <th className="px-4 py-3 text-start font-medium">{t('adminPage.tableSpecialty')}</th>
                  <th className="px-4 py-3 text-start font-medium">
                    <button onClick={() => setSortAsc((v) => !v)} className="flex items-center gap-1">
                      {t('adminPage.tableDate')}
                      <ArrowUpDown size={12} />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-start font-medium">{t('adminPage.tableTime')}</th>
                  <th className="px-4 py-3 text-start font-medium">{t('adminPage.tableStatus')}</th>
                  <th className="px-4 py-3 text-start font-medium">{t('adminPage.tableBookedOn')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-navy/5">
                {rows.map((b) => (
                  <tr key={b.id} className="text-navy/75">
                    <td className="px-4 py-3">{b.patientName}</td>
                    <td className="px-4 py-3" dir="ltr">{b.phone}</td>
                    <td className="px-4 py-3">{b.doctorName || '—'}</td>
                    <td className="px-4 py-3">{b.specialtyName}</td>
                    <td className="px-4 py-3" dir="ltr">{b.date}</td>
                    <td className="px-4 py-3" dir="ltr">{b.time}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusBadge[b.status]}`}>
                        {statusLabel[b.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-navy/45" dir="ltr">
                      {new Date(b.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
