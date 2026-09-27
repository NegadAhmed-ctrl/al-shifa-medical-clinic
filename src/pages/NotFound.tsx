import { Compass } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { LinkButton } from '../components/Button'

export function NotFound() {
  const { t } = useLanguage()

  return (
    <section className="mx-auto flex max-w-lg flex-col items-center px-5 py-24 text-center md:px-8">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600">
        <Compass size={30} />
      </span>
      <p className="mt-6 font-display text-6xl text-teal-500">404</p>
      <h1 className="mt-3 font-display text-2xl text-navy">{t('notFound.title')}</h1>
      <p className="mt-2 text-navy/60">{t('notFound.desc')}</p>
      <LinkButton to="/" className="mt-8">
        {t('notFound.back')}
      </LinkButton>
    </section>
  )
}
