import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { translations } from './translations'
import type { Language } from '../types'

interface LanguageContextValue {
  lang: Language
  dir: 'rtl' | 'ltr'
  setLang: (lang: Language) => void
  toggleLang: () => void
  t: (path: string) => any
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

function getFromPath(obj: any, path: string) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), obj)
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('alshifa-lang') : null
    return stored === 'en' || stored === 'ar' ? stored : 'ar'
  })

  const dir: 'rtl' | 'ltr' = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    window.localStorage.setItem('alshifa-lang', lang)
  }, [lang, dir])

  const setLang = (next: Language) => setLangState(next)
  const toggleLang = () => setLangState((prev) => (prev === 'ar' ? 'en' : 'ar'))

  const t = useMemo(() => {
    return (path: string) => {
      const value = getFromPath(translations[lang], path)
      return value ?? path
    }
  }, [lang])

  const value = useMemo(() => ({ lang, dir, setLang, toggleLang, t }), [lang, dir, t])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
