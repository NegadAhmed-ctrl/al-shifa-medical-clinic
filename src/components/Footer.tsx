import { Link } from 'react-router-dom'
import { Cross, Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { CLINIC_PHONE_DISPLAY, CLINIC_EMAIL, CLINIC_ADDRESS_AR, CLINIC_ADDRESS_EN } from '../utils/localize'

export function Footer() {
  const { t, lang } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-navy/10 bg-navy-700 bg-[#0D2C3F] text-white/80">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-display text-lg font-semibold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500">
                <Cross size={18} />
              </span>
              <span>{lang === 'ar' ? 'عيادة الشفاء الطبية' : 'Al Shifa Medical Clinic'}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{t('footer.about')}</p>
            <div className="mt-5 flex gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-teal-500 transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 hover:bg-teal-500 transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">{t('footer.quickLinks')}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white">{t('nav.home')}</Link></li>
              <li><Link to="/doctors" className="hover:text-white">{t('nav.doctors')}</Link></li>
              <li><Link to="/services" className="hover:text-white">{t('nav.services')}</Link></li>
              <li><Link to="/appointment" className="hover:text-white">{t('nav.book')}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white">{t('footer.contactUs')}</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/60">
              <li className="flex items-start gap-2">
                <Phone size={15} className="mt-0.5 shrink-0" />
                <span dir="ltr">{CLINIC_PHONE_DISPLAY}</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={15} className="mt-0.5 shrink-0" />
                <span>{CLINIC_EMAIL}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={15} className="mt-0.5 shrink-0" />
                <span>{lang === 'ar' ? CLINIC_ADDRESS_AR : CLINIC_ADDRESS_EN}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>&copy; {year} {lang === 'ar' ? 'عيادة الشفاء الطبية' : 'Al Shifa Medical Clinic'} — {t('footer.rights')}</p>
          <p>{t('footer.demoNotice')}</p>
        </div>
      </div>
    </footer>
  )
}
