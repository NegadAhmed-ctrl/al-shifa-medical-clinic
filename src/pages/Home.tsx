import { ShieldCheck, Activity, Sparkles as SparklesIcon, PhoneCall, MapPin, Clock } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import { SectionTitle } from '../components/SectionTitle'
import { LinkButton } from '../components/Button'
import { ServiceCard } from '../components/ServiceCard'
import { DoctorCard } from '../components/DoctorCard'
import { TestimonialCard } from '../components/TestimonialCard'
import { FAQAccordion } from '../components/FAQAccordion'
import { services } from '../data/services'
import { doctors } from '../data/doctors'
import { testimonials, faqs } from '../data/testimonials'
import { CLINIC_ADDRESS_AR, CLINIC_ADDRESS_EN } from '../utils/localize'

const trustIcons = [ShieldCheck, Activity, SparklesIcon, Clock]

const galleryImages = [
  'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1666214280391-8ff5bd3c0bf0?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=600&auto=format&fit=crop',
]

export function Home() {
  const { t, lang } = useLanguage()

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50 via-sand to-sand">
        {/* Decorative background blob — hand-drawn accent shape, purely visual */}
        <svg
          className="pointer-events-none absolute -top-16 -end-24 hidden h-[460px] w-[460px] text-teal-400/15 sm:block lg:h-[560px] lg:w-[560px]"
          viewBox="-100 -100 200 200"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M44.9,-58.6 C58.7,-49.3 69.4,-34.6 74.5,-18 C79.6,-1.3 79.1,17.3 71.4,32.6 C63.7,47.9 48.8,59.9 32.4,68.5 C16,77.1 -1.9,82.3 -19.6,79.6 C-37.3,76.9 -54.8,66.3 -66.4,50.7 C-78,35.1 -83.7,14.5 -81.2,-4.9 C-78.7,-24.3 -68,-42.5 -52.7,-53.4 C-37.4,-64.3 -17.5,-67.9 1.8,-70 C21.1,-72.1 31.1,-67.9 44.9,-58.6 Z" />
        </svg>
        <svg
          className="pointer-events-none absolute -bottom-24 -start-16 hidden h-64 w-64 text-amber/10 sm:block"
          viewBox="-100 -100 200 200"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M31.4,-42.6 C41.9,-33.2 52.4,-24.4 57.6,-12.6 C62.8,-0.8 62.7,14 56.4,26.1 C50.1,38.2 37.6,47.6 23.8,54.2 C10,60.8 -5.1,64.6 -19.6,61.4 C-34.1,58.2 -48,48 -56.8,34.4 C-65.6,20.8 -69.3,3.8 -65.9,-11.5 C-62.5,-26.8 -52,-40.4 -38.9,-49.9 C-25.8,-59.4 -12.9,-64.8 0.3,-65.2 C13.5,-65.6 20.9,-52 31.4,-42.6 Z" />
        </svg>

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:px-8 md:py-24">
          <div className="animate-rise">
            <span className="inline-block rounded-full bg-teal-100 px-4 py-1.5 text-xs font-medium text-teal-700">
              {t('hero.eyebrow')}
            </span>
            <h1 className="mt-5 font-display text-4xl leading-tight text-navy md:text-5xl">{t('hero.title')}</h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-navy/65 md:text-lg">{t('hero.subtitle')}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/appointment" size="lg">
                {t('hero.ctaPrimary')}
              </LinkButton>
              <LinkButton to="/doctors" variant="secondary" size="lg">
                {t('hero.ctaSecondary')}
              </LinkButton>
            </div>

            <dl className="mt-12 grid grid-cols-2 gap-6 border-t border-navy/10 pt-8 sm:grid-cols-4">
              {[
                ['12,000+', t('hero.statPatients')],
                ['24', t('hero.statDoctors')],
                ['18', t('hero.statYears')],
                ['4.8/5', t('hero.statRating')],
              ].map(([value, label]) => (
                <div key={label}>
                  <dt className="font-display text-2xl text-teal-600">{value}</dt>
                  <dd className="mt-1 text-xs text-navy/55">{label}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-clinic shadow-soft">
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=900&auto=format&fit=crop"
                alt={lang === 'ar' ? 'داخل عيادة الشفاء الطبية' : 'Inside Al Shifa Medical Clinic'}
                className="h-[420px] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 start-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-soft">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                <ShieldCheck size={18} />
              </span>
              <div className="text-sm">
                <p className="font-semibold text-navy">{t('trust.items.0.title')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust indicators */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <SectionTitle title={t('trust.title')} align="center" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t('trust.items').map((item: { title: string; desc: string }, i: number) => {
            const Icon = trustIcons[i % trustIcons.length]
            return (
              <div key={item.title} className="rounded-clinic border border-navy/10 bg-white p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-100 text-teal-600">
                  <Icon size={20} />
                </span>
                <h3 className="mt-4 font-display text-base text-navy">{item.title}</h3>
                <p className="mt-1.5 text-sm text-navy/60">{item.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Specialties */}
      <section className="bg-teal-50/50 py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionTitle title={t('specialties.title')} subtitle={t('specialties.subtitle')} />
            <LinkButton to="/services" variant="ghost">
              {t('specialties.viewAll')}
            </LinkButton>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionTitle title={t('doctorsSection.title')} subtitle={t('doctorsSection.subtitle')} />
          <LinkButton to="/doctors" variant="ghost">
            {t('doctorsSection.viewAll')}
          </LinkButton>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.slice(0, 3).map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-navy-700 bg-[#0D2C3F] py-16 text-white">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle title={t('why.title')} align="center" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {t('why.items').map((item: { title: string; desc: string }) => (
              <div key={item.title} className="rounded-clinic border border-white/10 bg-white/5 p-6">
                <h3 className="font-display text-base text-white">{item.title}</h3>
                <p className="mt-2 text-sm text-white/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <SectionTitle title={t('testimonialsSection.title')} subtitle={t('testimonialsSection.subtitle')} align="center" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-teal-50/50 py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <SectionTitle title={t('gallery.title')} subtitle={t('gallery.subtitle')} align="center" />
          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {galleryImages.map((src, i) => (
              <div key={i} className="overflow-hidden rounded-clinic">
                <img src={src} alt="" loading="lazy" className="h-48 w-full object-cover transition-transform duration-300 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-8">
        <SectionTitle title={t('faqSection.title')} subtitle={t('faqSection.subtitle')} align="center" />
        <div className="mt-10">
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* CTA banner */}
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-8">
        <div className="flex flex-col items-center gap-5 rounded-clinic bg-teal-500 px-8 py-12 text-center text-white md:flex-row md:justify-between md:text-start">
          <div>
            <h2 className="font-display text-2xl md:text-3xl">{t('ctaBanner.title')}</h2>
            <p className="mt-2 text-teal-50/90">{t('ctaBanner.subtitle')}</p>
          </div>
          <LinkButton to="/appointment" variant="secondary" size="lg" className="!bg-white !text-teal-600 shrink-0">
            {t('ctaBanner.button')}
          </LinkButton>
        </div>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-6xl px-5 pb-20 md:px-8">
        <SectionTitle title={t('locationSection.title')} />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="overflow-hidden rounded-clinic border border-navy/10">
            <iframe
              title="Al Shifa Medical Clinic location"
              src="https://www.google.com/maps?q=Alexandria,Egypt&output=embed"
              className="h-72 w-full lg:h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="flex flex-col justify-center gap-6 rounded-clinic border border-navy/10 bg-white p-7">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 shrink-0 text-teal-600" size={20} />
              <div>
                <p className="text-sm font-medium text-navy/50">{t('locationSection.address')}</p>
                <p className="text-navy">{pick(lang, CLINIC_ADDRESS_AR, CLINIC_ADDRESS_EN)}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-0.5 shrink-0 text-teal-600" size={20} />
              <div>
                <p className="text-sm font-medium text-navy/50">{t('locationSection.hours')}</p>
                <p className="text-navy">{t('locationSection.hoursValue')}</p>
                <p className="text-navy/60 text-sm">{t('locationSection.hoursFridayValue')}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <PhoneCall className="mt-0.5 shrink-0 text-teal-600" size={20} />
              <div dir="ltr" className="text-navy">
                +20 100 123 4567
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
