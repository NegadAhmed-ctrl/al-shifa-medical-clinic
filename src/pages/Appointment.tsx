import { useLanguage } from '../i18n/LanguageContext'
import { AppointmentForm } from '../components/AppointmentForm'

export function Appointment() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto max-w-3xl px-5 py-14 md:px-8">
      <div className="text-center">
        <h1 className="font-display text-3xl text-navy md:text-4xl">{t('appointmentPage.title')}</h1>
        <p className="mt-3 text-navy/60">{t('appointmentPage.subtitle')}</p>
      </div>
      <div className="mt-10">
        <AppointmentForm />
      </div>
    </section>
  )
}
