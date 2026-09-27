import { useParams } from 'react-router-dom'
import { Star, Clock, Languages, GraduationCap, Stethoscope, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import { getDoctorById } from '../data/doctors'
import { services } from '../data/services'
import { testimonials } from '../data/testimonials'
import { TestimonialCard } from '../components/TestimonialCard'
import { LinkButton } from '../components/Button'
import { ErrorState, EmptyState } from '../components/StateViews'
import { shortDayNames, formatWorkingHours } from '../utils/scheduleFormat'

export function DoctorDetails() {
  const { id } = useParams()
  const { t, lang } = useLanguage()
  const doctor = id ? getDoctorById(id) : undefined
  const Arrow = lang === 'ar' ? ArrowRight : ArrowLeft

  if (!doctor) {
    return (
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <ErrorState title={t('doctorDetails.notFoundTitle')} description={t('doctorDetails.notFoundDesc')} />
        <div className="mt-6 flex justify-center">
          <LinkButton to="/doctors" variant="secondary">
            {t('doctorDetails.back')}
          </LinkButton>
        </div>
      </section>
    )
  }

  const specialty = services.find((s) => s.key === doctor.specialtyKey)
  const doctorTestimonials = testimonials.filter((tItem) => tItem.doctorId === doctor.id)
  const days = shortDayNames[lang]

  return (
    <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <LinkButton to="/doctors" variant="ghost" size="md" className="!px-0 !justify-start text-navy/60">
        <Arrow size={16} />
        {t('doctorDetails.back')}
      </LinkButton>

      <div className="mt-6 grid gap-10 lg:grid-cols-[320px_1fr]">
        <div>
          <div className="overflow-hidden rounded-clinic shadow-soft">
            <img src={doctor.photo} alt={pick(lang, doctor.nameAr, doctor.nameEn)} className="h-80 w-full object-cover lg:h-96" />
          </div>
          <div className="mt-5 rounded-clinic border border-navy/10 bg-white p-5">
            <div className="flex items-center gap-2 text-sm text-navy/70">
              <Star size={16} className="fill-amber text-amber" />
              {doctor.rating} ({doctor.reviewCount} {t('doctorDetails.reviews')})
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-navy/70">
              <Clock size={16} className="text-teal-600" />
              {formatWorkingHours(lang, doctor.workingHoursStart, doctor.workingHoursEnd)}
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm text-navy/70">
              <Languages size={16} className="text-teal-600" />
              {doctor.languages.join(' · ')}
            </div>
            <LinkButton to={`/appointment?doctor=${doctor.id}`} className="mt-5 w-full">
              {t('doctorDetails.bookWithDoctor')}
            </LinkButton>
          </div>
        </div>

        <div>
          <span className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-700">
            {specialty ? pick(lang, specialty.titleAr, specialty.titleEn) : ''}
          </span>
          <h1 className="mt-3 font-display text-3xl text-navy md:text-4xl">{pick(lang, doctor.nameAr, doctor.nameEn)}</h1>
          <p className="mt-1 text-navy/55">
            {doctor.experienceYears} {t('doctorsSection.years')}
          </p>

          <div className="mt-8">
            <h2 className="font-display text-lg text-navy">{t('doctorDetails.bio')}</h2>
            <p className="mt-2 leading-relaxed text-navy/65">{pick(lang, doctor.bioAr, doctor.bioEn)}</p>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 font-display text-lg text-navy">
                <GraduationCap size={18} className="text-teal-600" />
                {t('doctorDetails.qualifications')}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-navy/65">
                {(lang === 'ar' ? doctor.qualificationsAr : doctor.qualificationsEn).map((q) => (
                  <li key={q} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                    {q}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="flex items-center gap-2 font-display text-lg text-navy">
                <Stethoscope size={18} className="text-teal-600" />
                {t('doctorDetails.services')}
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-navy/65">
                {(lang === 'ar' ? doctor.servicesAr : doctor.servicesEn).map((s) => (
                  <li key={s} className="flex gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg text-navy">{t('doctorDetails.workingHours')}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {days.map((day, i) => (
                <span
                  key={day}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                    doctor.availableDays.includes(i)
                      ? 'border-teal-200 bg-teal-50 text-teal-700'
                      : 'border-navy/10 text-navy/30 line-through'
                  }`}
                >
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="font-display text-lg text-navy">{t('doctorDetails.reviews')}</h2>
            {doctorTestimonials.length === 0 ? (
              <div className="mt-4">
                <EmptyState title={t('doctorDetails.noReviews')} />
              </div>
            ) : (
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                {doctorTestimonials.map((tItem) => (
                  <TestimonialCard key={tItem.id} testimonial={tItem} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
