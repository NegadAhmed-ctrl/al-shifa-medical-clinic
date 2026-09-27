import { useLanguage } from '../i18n/LanguageContext'

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLanguage()

  return (
    <div
      className={`inline-flex items-center rounded-full border border-navy/15 bg-white p-0.5 text-xs font-medium ${
        compact ? '' : ''
      }`}
      role="group"
      aria-label="Language switcher"
    >
      <button
        onClick={() => setLang('ar')}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          lang === 'ar' ? 'bg-teal-500 text-white' : 'text-navy/70 hover:text-navy'
        }`}
        aria-pressed={lang === 'ar'}
      >
        العربية
      </button>
      <button
        onClick={() => setLang('en')}
        className={`rounded-full px-3 py-1.5 transition-colors ${
          lang === 'en' ? 'bg-teal-500 text-white' : 'text-navy/70 hover:text-navy'
        }`}
        aria-pressed={lang === 'en'}
      >
        English
      </button>
    </div>
  )
}
