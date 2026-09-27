import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import { doctors } from '../data/doctors'
import { services } from '../data/services'
import { LinkButton } from '../components/Button'

export function About() {
  const { t, lang } = useLanguage()

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl text-navy md:text-4xl">{t('aboutPage.title')}</h1>
        <p className="mt-3 text-navy/60">{t('aboutPage.subtitle')}</p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-clinic shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=800&auto=format&fit=crop"
            alt=""
            className="h-72 w-full object-cover md:h-96"
          />
        </div>
        <div>
          <h2 className="font-display text-xl text-navy">{t('aboutPage.storyTitle')}</h2>
          <p className="mt-3 leading-relaxed text-navy/65">{t('aboutPage.storyBody')}</p>
          <h2 className="mt-7 font-display text-xl text-navy">{t('aboutPage.missionTitle')}</h2>
          <p className="mt-3 leading-relaxed text-navy/65">{t('aboutPage.missionBody')}</p>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="font-display text-2xl text-navy">{t('aboutPage.teamTitle')}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor) => {
            const specialty = services.find((s) => s.key === doctor.specialtyKey)
            return (
              <div key={doctor.id} className="flex items-center gap-4 rounded-clinic border border-navy/10 bg-white p-4">
                <img src={doctor.photo} alt="" className="h-16 w-16 shrink-0 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-navy">{pick(lang, doctor.nameAr, doctor.nameEn)}</p>
                  <p className="text-sm text-navy/55">{specialty ? pick(lang, specialty.titleAr, specialty.titleEn) : ''}</p>
                </div>
              </div>
            )
          })}
        </div>
        <div className="mt-8">
          <LinkButton to="/doctors" variant="secondary">
            {t('doctorsSection.viewAll')}
          </LinkButton>
        </div>
      </div>
    </section>
  )
}
