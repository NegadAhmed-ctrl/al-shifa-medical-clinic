import { MessageCircle, Phone } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { CLINIC_WHATSAPP_NUMBER, CLINIC_PHONE_DISPLAY, formatWhatsAppLink } from '../utils/localize'

export function FloatingActions() {
  const { t } = useLanguage()
  const whatsappHref = formatWhatsAppLink(CLINIC_WHATSAPP_NUMBER, t('common.whatsappMessage'))

  return (
    <div className="fixed bottom-5 end-5 z-40 flex flex-col items-end gap-3 print:hidden">
      <a
        href={`tel:${CLINIC_PHONE_DISPLAY.replace(/\s/g, '')}`}
        className="sm:hidden flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-soft"
        aria-label="Call the clinic"
      >
        <Phone size={20} />
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft hover:scale-105 transition-transform"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  )
}
