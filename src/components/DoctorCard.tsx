import { Star, Clock } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import { services } from '../data/services'
import { formatWorkingHours } from '../utils/scheduleFormat'
import { LinkButton } from './Button'
import type { Doctor } from '../types'

export function DoctorCard({ doctor }: { doctor: Doctor }) {
  const { lang, t } = useLanguage()
  const specialty = services.find((s) => s.key === doctor.specialtyKey)
  const name = pick(lang, doctor.nameAr, doctor.nameEn)
  const specialtyLabel = specialty ? pick(lang, specialty.titleAr, specialty.titleEn) : ''

  return (
    <div className="group flex flex-col overflow-hidden rounded-clinic border border-navy/10 bg-white transition-shadow hover:shadow-soft">
      <div className="relative h-56 overflow-hidden bg-teal-50">
        <img
          src={doctor.photo}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-3 start-3 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-teal-600 shadow-sm">
          {specialtyLabel}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-lg text-navy">{name}</h3>
          <p className="text-sm text-navy/55">
            {doctor.experienceYears} {t('doctorsSection.years')}
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs text-navy/60">
          <span className="flex items-center gap-1">
            <Star size={14} className="fill-amber text-amber" />
            {doctor.rating} ({doctor.reviewCount})
          </span>
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {formatWorkingHours(lang, doctor.workingHoursStart, doctor.workingHoursEnd)}
          </span>
        </div>

        <div className="mt-auto flex gap-2 pt-2">
          <LinkButton to={`/doctors/${doctor.id}`} variant="secondary" size="md" className="flex-1">
            {t('doctorsSection.viewProfile')}
          </LinkButton>
          <LinkButton to={`/appointment?doctor=${doctor.id}`} variant="primary" size="md" className="flex-1">
            {t('doctorsSection.bookNow')}
          </LinkButton>
        </div>
      </div>
    </div>
  )
}
