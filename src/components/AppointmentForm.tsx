import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import { doctors } from '../data/doctors'
import { services } from '../data/services'
import { isValidEgyptianPhone, isValidEmail, isFutureDate, generateReferenceId } from '../utils/validation'
import { addBooking, getBookings } from '../utils/bookingsStorage'
import { setStoredPhone, normalizePhone } from '../utils/patientIdentity'
import { availableDaysLabel, formatWorkingHours, formatTime12h, isWithinWorkingHours } from '../utils/scheduleFormat'
import { useToast } from './Toast'
import { ActionButton, LinkButton } from './Button'
import type { AppointmentFormData, SpecialtyKey, Booking } from '../types'

const initialData: AppointmentFormData = {
  patientName: '',
  phone: '',
  email: '',
  doctorId: '',
  specialty: '',
  preferredDate: '',
  preferredTime: '',
  reason: '',
  notes: '',
}

type Errors = Partial<Record<keyof AppointmentFormData, string>>

function fillTemplate(template: string, values: Record<string, string>) {
  return Object.entries(values).reduce((acc, [key, value]) => acc.split(`{${key}}`).join(value), template)
}

export function AppointmentForm() {
  const { t, lang } = useLanguage()
  const { showToast } = useToast()
  const [searchParams] = useSearchParams()
  const presetDoctor = searchParams.get('doctor') ?? ''
  const presetSpecialtyParam = searchParams.get('specialty')
  const presetSpecialty = services.some((s) => s.key === presetSpecialtyParam)
    ? (presetSpecialtyParam as SpecialtyKey)
    : presetDoctor
      ? doctors.find((d) => d.id === presetDoctor)?.specialtyKey ?? ''
      : ''

  const [data, setData] = useState<AppointmentFormData>({
    ...initialData,
    doctorId: presetDoctor,
    specialty: presetSpecialty,
  })
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)

  // Only offer doctors that actually practice the selected specialty —
  // if no specialty is chosen yet, show everyone.
  const availableDoctors = useMemo(
    () => (data.specialty ? doctors.filter((d) => d.specialtyKey === data.specialty) : doctors),
    [data.specialty]
  )

  const selectedDoctor = useMemo(
    () => (data.doctorId ? doctors.find((d) => d.id === data.doctorId) : undefined),
    [data.doctorId]
  )

  function update<K extends keyof AppointmentFormData>(key: K, value: AppointmentFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function handleSpecialtyChange(value: SpecialtyKey | '') {
    setData((prev) => {
      const stillValid = value ? doctors.some((d) => d.id === prev.doctorId && d.specialtyKey === value) : true
      return { ...prev, specialty: value, doctorId: stillValid ? prev.doctorId : '' }
    })
    setErrors((prev) => ({ ...prev, specialty: undefined }))
  }

  function validate(): Errors {
    const next: Errors = {}
    if (!data.patientName.trim()) next.patientName = t('appointmentPage.errors.required')
    if (!data.phone.trim()) next.phone = t('appointmentPage.errors.required')
    else if (!isValidEgyptianPhone(data.phone)) next.phone = t('appointmentPage.errors.phone')
    if (data.email.trim() && !isValidEmail(data.email)) next.email = t('appointmentPage.errors.email')
    if (!data.specialty) next.specialty = t('appointmentPage.errors.required')

    if (!data.preferredDate) next.preferredDate = t('appointmentPage.errors.required')
    else if (!isFutureDate(data.preferredDate)) next.preferredDate = t('appointmentPage.errors.date')
    else if (selectedDoctor) {
      // Only enforced once a specific doctor is chosen — picking just a
      // specialty leaves any date/time open since there's no fixed schedule.
      const weekday = new Date(data.preferredDate).getDay()
      if (!selectedDoctor.availableDays.includes(weekday)) {
        next.preferredDate = fillTemplate(t('appointmentPage.errors.dayUnavailable'), {
          name: pick(lang, selectedDoctor.nameAr, selectedDoctor.nameEn),
        })
      }
    }

    if (!data.preferredTime) next.preferredTime = t('appointmentPage.errors.required')
    else if (
      selectedDoctor &&
      !isWithinWorkingHours(data.preferredTime, selectedDoctor.workingHoursStart, selectedDoctor.workingHoursEnd)
    ) {
      next.preferredTime = fillTemplate(t('appointmentPage.errors.timeOutsideHours'), {
        name: pick(lang, selectedDoctor.nameAr, selectedDoctor.nameEn),
        start: formatTime12h(selectedDoctor.workingHoursStart, lang),
        end: formatTime12h(selectedDoctor.workingHoursEnd, lang),
      })
    } else if (data.doctorId && data.preferredDate) {
      const isSlotTaken = getBookings().some(
        (b) =>
          b.status !== 'cancelled' &&
          b.doctorId === data.doctorId &&
          b.date === data.preferredDate &&
          b.time === data.preferredTime
      )
      if (isSlotTaken) next.preferredTime = t('appointmentPage.errors.slotTaken')
    }
    if (!data.reason.trim()) next.reason = t('appointmentPage.errors.required')
    return next
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    setSubmitting(true)
    // No backend is connected yet — this simulates a network call so the
    // structure is ready to be swapped for a real API request later.
    await new Promise((resolve) => setTimeout(resolve, 900))
    setSubmitting(false)

    const reference = generateReferenceId()
    const doctor = doctors.find((d) => d.id === data.doctorId)
    const specialtyInfo = services.find((s) => s.key === data.specialty)

    const booking: Booking = {
      id: reference,
      patientName: data.patientName.trim(),
      phone: data.phone.trim(),
      email: data.email.trim(),
      doctorId: data.doctorId,
      doctorName: doctor ? pick(lang, doctor.nameAr, doctor.nameEn) : '',
      specialty: data.specialty as SpecialtyKey,
      specialtyName: specialtyInfo ? pick(lang, specialtyInfo.titleAr, specialtyInfo.titleEn) : '',
      date: data.preferredDate,
      time: data.preferredTime,
      reason: data.reason.trim(),
      notes: data.notes.trim(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
    addBooking(booking)
    setStoredPhone(normalizePhone(data.phone))
    showToast(t('common.toastBookingConfirmed'), 'success')
    setSuccess(reference)
  }

  function resetForm() {
    setData(initialData)
    setErrors({})
    setSuccess(null)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-clinic border border-teal-100 bg-teal-50/60 p-10 text-center animate-rise">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-500 text-white">
          <CheckCircle2 size={28} />
        </span>
        <h3 className="font-display text-2xl text-navy">{t('appointmentPage.successTitle')}</h3>
        <p className="max-w-md text-navy/60">{t('appointmentPage.successDesc')}</p>
        <p className="text-sm font-medium text-navy/70">
          {t('appointmentPage.successRef')}: <span dir="ltr" className="text-teal-600">{success}</span>
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <LinkButton to="/" variant="secondary">
            {t('appointmentPage.backHome')}
          </LinkButton>
          <LinkButton to="/my-bookings" variant="secondary">
            {t('appointmentPage.viewBookings')}
          </LinkButton>
          <ActionButton onClick={resetForm}>{t('appointmentPage.bookAnother')}</ActionButton>
        </div>
      </div>
    )
  }

  const inputClass = (field: keyof AppointmentFormData) =>
    `w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-navy placeholder:text-navy/35 focus-visible:outline-2 ${
      errors[field] ? 'border-red-300' : 'border-navy/15'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-clinic border border-navy/10 bg-white p-6 md:p-8">
      <h2 className="font-display text-xl text-navy">{t('appointmentPage.formTitle')}</h2>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <Field label={t('appointmentPage.patientName')} error={errors.patientName}>
          <input
            className={inputClass('patientName')}
            placeholder={t('appointmentPage.patientNamePlaceholder')}
            value={data.patientName}
            onChange={(e) => update('patientName', e.target.value)}
          />
        </Field>

        <Field label={t('appointmentPage.phone')} error={errors.phone}>
          <input
            className={inputClass('phone')}
            placeholder={t('appointmentPage.phonePlaceholder')}
            dir="ltr"
            value={data.phone}
            onChange={(e) => update('phone', e.target.value)}
          />
        </Field>

        <Field label={t('appointmentPage.email')} error={errors.email}>
          <input
            type="email"
            className={inputClass('email')}
            placeholder={t('appointmentPage.emailPlaceholder')}
            dir="ltr"
            value={data.email}
            onChange={(e) => update('email', e.target.value)}
          />
        </Field>

        <Field label={t('appointmentPage.specialty')} error={errors.specialty}>
          <select
            className={inputClass('specialty')}
            value={data.specialty}
            onChange={(e) => handleSpecialtyChange(e.target.value as SpecialtyKey | '')}
          >
            <option value="">{t('appointmentPage.specialtyPlaceholder')}</option>
            {services.map((s) => (
              <option key={s.key} value={s.key}>
                {pick(lang, s.titleAr, s.titleEn)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t('appointmentPage.doctor')}>
          <select
            className={inputClass('doctorId')}
            value={data.doctorId}
            onChange={(e) => update('doctorId', e.target.value)}
            disabled={availableDoctors.length === 0}
          >
            <option value="">{t('appointmentPage.doctorPlaceholder')}</option>
            {availableDoctors.map((d) => (
              <option key={d.id} value={d.id}>
                {pick(lang, d.nameAr, d.nameEn)}
              </option>
            ))}
          </select>
          {data.specialty && availableDoctors.length === 0 && (
            <span className="text-xs text-navy/45">{t('appointmentPage.doctorNoneForSpecialty')}</span>
          )}
        </Field>

        <Field label={t('appointmentPage.preferredDate')} error={errors.preferredDate}>
          <input
            type="date"
            className={inputClass('preferredDate')}
            value={data.preferredDate}
            onChange={(e) => update('preferredDate', e.target.value)}
          />
        </Field>

        <Field label={t('appointmentPage.preferredTime')} error={errors.preferredTime}>
          <input
            type="time"
            className={inputClass('preferredTime')}
            value={data.preferredTime}
            onChange={(e) => update('preferredTime', e.target.value)}
          />
        </Field>

        {selectedDoctor && (
          <p className="md:col-span-2 -mt-2 text-xs text-navy/50">
            {fillTemplate(t('appointmentPage.scheduleHint'), {
              days: availableDaysLabel(lang, selectedDoctor.availableDays),
              hours: formatWorkingHours(lang, selectedDoctor.workingHoursStart, selectedDoctor.workingHoursEnd),
            })}
          </p>
        )}

        <div className="md:col-span-2">
          <Field label={t('appointmentPage.reason')} error={errors.reason}>
            <textarea
              rows={3}
              className={inputClass('reason')}
              placeholder={t('appointmentPage.reasonPlaceholder')}
              value={data.reason}
              onChange={(e) => update('reason', e.target.value)}
            />
          </Field>
        </div>

        <div className="md:col-span-2">
          <Field label={t('appointmentPage.notes')}>
            <textarea
              rows={2}
              className={inputClass('notes')}
              placeholder={t('appointmentPage.notesPlaceholder')}
              value={data.notes}
              onChange={(e) => update('notes', e.target.value)}
            />
          </Field>
        </div>
      </div>

      <ActionButton type="submit" size="lg" disabled={submitting} className="mt-7 w-full md:w-auto">
        {submitting ? t('appointmentPage.submitting') : t('appointmentPage.submit')}
      </ActionButton>
    </form>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-navy/80">{label}</span>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
}
