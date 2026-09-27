import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import { getIcon } from '../utils/icons'
import { Link } from 'react-router-dom'
import type { Service } from '../types'

export function ServiceCard({ service }: { service: Service }) {
  const { lang, t } = useLanguage()
  const Icon = getIcon(service.icon)
  const Arrow = lang === 'ar' ? ArrowLeft : ArrowRight

  return (
    <Link
      to={`/services#${service.id}`}
      className="group flex flex-col gap-4 rounded-clinic border border-navy/10 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-soft"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
        <Icon size={22} />
      </span>
      <div>
        <h3 className="font-display text-lg text-navy">{pick(lang, service.titleAr, service.titleEn)}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-navy/60">
          {pick(lang, service.descriptionAr, service.descriptionEn)}
        </p>
      </div>
      <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-teal-600">
        {t('servicesPage.learnMore')}
        <Arrow size={15} className="transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5" />
      </span>
    </Link>
  )
}
