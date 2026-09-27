import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import { doctors } from '../data/doctors'
import { services } from '../data/services'
import { DoctorCard } from '../components/DoctorCard'
import { EmptyState } from '../components/StateViews'
import type { SpecialtyKey } from '../types'

export function Doctors() {
  const { t, lang } = useLanguage()
  const [query, setQuery] = useState('')
  const [specialty, setSpecialty] = useState<SpecialtyKey | 'all'>('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return doctors.filter((doctor) => {
      const matchesSpecialty = specialty === 'all' || doctor.specialtyKey === specialty
      if (!matchesSpecialty) return false
      if (!q) return true
      const name = pick(lang, doctor.nameAr, doctor.nameEn).toLowerCase()
      const specialtyService = services.find((s) => s.key === doctor.specialtyKey)
      const specialtyLabel = specialtyService ? pick(lang, specialtyService.titleAr, specialtyService.titleEn).toLowerCase() : ''
      return name.includes(q) || specialtyLabel.includes(q)
    })
  }, [query, specialty, lang])

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl text-navy md:text-4xl">{t('doctorsPage.title')}</h1>
        <p className="mt-3 text-navy/60">{t('doctorsPage.subtitle')}</p>
      </div>

      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute top-1/2 start-4 -translate-y-1/2 text-navy/35" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('doctorsPage.searchPlaceholder')}
            className="w-full rounded-full border border-navy/15 bg-white py-3 ps-11 pe-4 text-sm focus-visible:outline-2"
          />
        </div>

        <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setSpecialty('all')}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
              specialty === 'all' ? 'border-teal-500 bg-teal-500 text-white' : 'border-navy/15 text-navy/60 hover:border-teal-300'
            }`}
          >
            {t('doctorsPage.filterAll')}
          </button>
          {services.map((s) => (
            <button
              key={s.key}
              onClick={() => setSpecialty(s.key)}
              className={`shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition-colors ${
                specialty === s.key ? 'border-teal-500 bg-teal-500 text-white' : 'border-navy/15 text-navy/60 hover:border-teal-300'
              }`}
            >
              {pick(lang, s.titleAr, s.titleEn)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <EmptyState title={t('doctorsPage.noResults')} description={t('doctorsPage.noResultsHint')} />
            <button
              onClick={() => {
                setQuery('')
                setSpecialty('all')
              }}
              className="rounded-full border border-navy/15 px-5 py-2.5 text-sm font-medium text-navy/70 transition-colors hover:border-teal-300 hover:text-teal-600"
            >
              {t('doctorsPage.resetFilters')}
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
