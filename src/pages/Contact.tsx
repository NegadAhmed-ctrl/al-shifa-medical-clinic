import { useState, type FormEvent } from 'react'
import { Phone, MessageCircle, Mail, MapPin, Clock, TriangleAlert, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import {
  CLINIC_PHONE_DISPLAY,
  CLINIC_WHATSAPP_NUMBER,
  CLINIC_EMAIL,
  CLINIC_ADDRESS_AR,
  CLINIC_ADDRESS_EN,
  formatWhatsAppLink,
} from '../utils/localize'
import { ActionButton, ExternalButton } from '../components/Button'
import { useToast } from '../components/Toast'

export function Contact() {
  const { t, lang } = useLanguage()
  const { showToast } = useToast()
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setSent(true)
    showToast(t('common.toastMessageSent'), 'success')
  }

  const whatsappHref = formatWhatsAppLink(CLINIC_WHATSAPP_NUMBER, t('common.whatsappMessage'))

  const infoItems = [
    { icon: Phone, label: t('contactPage.phone'), value: CLINIC_PHONE_DISPLAY, href: `tel:${CLINIC_PHONE_DISPLAY.replace(/\s/g, '')}`, dir: 'ltr' },
    { icon: MessageCircle, label: t('contactPage.whatsapp'), value: CLINIC_PHONE_DISPLAY, href: whatsappHref, dir: 'ltr' },
    { icon: Mail, label: t('contactPage.email'), value: CLINIC_EMAIL, href: `mailto:${CLINIC_EMAIL}`, dir: 'ltr' },
    { icon: MapPin, label: t('contactPage.address'), value: pick(lang, CLINIC_ADDRESS_AR, CLINIC_ADDRESS_EN) },
  ]

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:px-8">
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl text-navy md:text-4xl">{t('contactPage.title')}</h1>
        <p className="mt-3 text-navy/60">{t('contactPage.subtitle')}</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            {infoItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-start gap-3 rounded-clinic border border-navy/10 bg-white p-5 transition-colors hover:border-teal-200"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
                  <item.icon size={18} />
                </span>
                <div>
                  <p className="text-xs text-navy/50">{item.label}</p>
                  <p className="text-sm font-medium text-navy" dir={item.dir}>{item.value}</p>
                </div>
              </a>
            ))}
          </div>

          <div className="flex items-start gap-3 rounded-clinic border border-navy/10 bg-white p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-600">
              <Clock size={18} />
            </span>
            <div>
              <p className="text-xs text-navy/50">{t('contactPage.hours')}</p>
              <p className="text-sm font-medium text-navy">{t('locationSection.hoursValue')}</p>
              <p className="text-sm text-navy/60">{t('locationSection.hoursFridayValue')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-clinic border border-red-100 bg-red-50/60 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-500">
              <TriangleAlert size={18} />
            </span>
            <div>
              <p className="text-sm font-semibold text-navy">{t('contactPage.emergency')}</p>
              <p className="mt-0.5 text-sm text-navy/60">{t('contactPage.emergencyDesc')}</p>
              <p className="mt-1.5 text-sm font-medium text-red-500" dir="ltr">+20 122 999 8888</p>
            </div>
          </div>

          <div className="overflow-hidden rounded-clinic border border-navy/10">
            <p className="border-b border-navy/10 px-5 py-3 text-sm font-medium text-navy/60">{t('contactPage.mapTitle')}</p>
            <iframe
              title="Al Shifa Medical Clinic map"
              src="https://www.google.com/maps?q=Alexandria,Egypt&output=embed"
              className="h-56 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="rounded-clinic border border-navy/10 bg-white p-6 md:p-8">
          <h2 className="font-display text-xl text-navy">{t('contactPage.formTitle')}</h2>

          {sent ? (
            <div className="mt-6 flex flex-col items-center gap-3 rounded-clinic bg-teal-50 p-8 text-center">
              <CheckCircle2 size={28} className="text-teal-500" />
              <p className="text-navy">{t('contactPage.sent')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-navy/80">{t('contactPage.name')}</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm focus-visible:outline-2"
                  required
                />
              </label>
              <label className="flex flex-col gap-1.5 text-sm">
                <span className="font-medium text-navy/80">{t('contactPage.messageLabel')}</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('contactPage.messagePlaceholder')}
                  rows={5}
                  className="rounded-xl border border-navy/15 bg-white px-4 py-2.5 text-sm focus-visible:outline-2"
                  required
                />
              </label>
              <ActionButton type="submit" size="lg" className="mt-2">
                {t('contactPage.send')}
              </ActionButton>
            </form>
          )}

          <ExternalButton href={whatsappHref} variant="secondary" className="mt-4 w-full !bg-[#25D366]/10 !text-[#128C46] !border-[#25D366]/30">
            <MessageCircle size={16} />
            {t('contactPage.whatsapp')}
          </ExternalButton>
        </div>
      </div>
    </section>
  )
}
