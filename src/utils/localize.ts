import type { Language } from '../types'

export function pick<T>(lang: Language, ar: T, en: T): T {
  return lang === 'ar' ? ar : en
}

export function formatWhatsAppLink(phone: string, message: string) {
  const cleanPhone = phone.replace(/[^\d]/g, '')
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
}

export const CLINIC_PHONE_DISPLAY = '+20 100 123 4567'
export const CLINIC_WHATSAPP_NUMBER = '201001234567'
export const CLINIC_EMAIL = 'info@alshifa-clinic.example.com'
export const CLINIC_ADDRESS_AR = '15 شارع فؤاد، محطة الرمل، الإسكندرية'
export const CLINIC_ADDRESS_EN = '15 Fouad Street, Raml Station, Alexandria'
