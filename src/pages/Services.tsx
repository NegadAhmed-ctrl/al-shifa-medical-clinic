import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import { services } from '../data/services'
import { getIcon } from '../utils/icons'
import { LinkButton } from '../components/Button'
import { CheckCircle } from 'lucide-react'

export function Services() {
  const { t, lang } = useLanguage()

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl text-navy md:text-4xl">{t('servicesPage.title')}</h1>
        <p className="mt-3 text-navy/60">{t('servicesPage.subtitle')}</p>
      </div>

      <div className="mt-12 flex flex-col gap-6">
        {services.map((service, index) => {
          const Icon = getIcon(service.icon)
          const reversed = index % 2 === 1
          // Every third card gets a warmer gradient tile instead of the flat
          // teal circle, so the list doesn't read as one repeated component.
          const isAccentTile = index % 3 === 2
          return (
            <div
              id={service.id}
              key={service.id}
              className="grid scroll-mt-24 gap-8 rounded-clinic border border-navy/10 bg-white p-7 md:grid-cols-[auto_1fr_auto] md:items-center md:p-9"
            >
              <span
                className={`flex h-14 w-14 items-center justify-center text-teal-600 ${
                  reversed ? 'md:order-2' : ''
                } ${
                  isAccentTile
                    ? 'rounded-2xl bg-gradient-to-br from-teal-400 to-teal-600 text-white shadow-soft rotate-3'
                    : 'rounded-2xl bg-teal-100'
                }`}
              >
                <Icon size={26} />
              </span>

              <div className={reversed ? 'md:order-1' : ''}>
                <h2 className="font-display text-xl text-navy md:text-2xl">
                  {pick(lang, service.titleAr, service.titleEn)}
                </h2>
                <p className="mt-2 max-w-xl leading-relaxed text-navy/60">
                  {pick(lang, service.descriptionAr, service.descriptionEn)}
                </p>
                <p className="mt-4 text-sm font-medium text-navy/70">{t('servicesPage.benefitsTitle')}</p>
                <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
                  {(lang === 'ar' ? service.benefitsAr : service.benefitsEn).map((b) => (
                    <li key={b} className="flex items-start gap-2 text-sm text-navy/65">
                      <CheckCircle size={15} className="mt-0.5 shrink-0 text-teal-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <LinkButton to={`/appointment?specialty=${service.key}`} variant="secondary" className="md:order-3 shrink-0">
                {t('servicesPage.bookThisService')}
              </LinkButton>
            </div>
          )
        })}
      </div>
    </section>
  )
}
