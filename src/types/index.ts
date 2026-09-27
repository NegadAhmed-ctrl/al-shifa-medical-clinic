export type Language = 'ar' | 'en'

export interface Doctor {
  id: string
  nameAr: string
  nameEn: string
  specialtyKey: SpecialtyKey
  photo: string
  experienceYears: number
  bioAr: string
  bioEn: string
  qualificationsAr: string[]
  qualificationsEn: string[]
  languages: string[]
  availableDays: number[]
  workingHoursStart: string
  workingHoursEnd: string
  servicesAr: string[]
  servicesEn: string[]
  rating: number
  reviewCount: number
}

export type SpecialtyKey =
  | 'general'
  | 'dentistry'
  | 'dermatology'
  | 'pediatrics'
  | 'cardiology'
  | 'orthopedics'
  | 'laboratory'
  | 'consultation'

export interface Service {
  id: string
  key: SpecialtyKey
  titleAr: string
  titleEn: string
  descriptionAr: string
  descriptionEn: string
  benefitsAr: string[]
  benefitsEn: string[]
  icon: string
}

export interface Testimonial {
  id: string
  doctorId?: string
  nameAr: string
  nameEn: string
  roleAr: string
  roleEn: string
  quoteAr: string
  quoteEn: string
  rating: number
}

export interface FAQItem {
  id: string
  questionAr: string
  questionEn: string
  answerAr: string
  answerEn: string
}

export interface AppointmentFormData {
  patientName: string
  phone: string
  email: string
  doctorId: string
  specialty: SpecialtyKey | ''
  preferredDate: string
  preferredTime: string
  reason: string
  notes: string
}

export type BookingStatus = 'confirmed' | 'rescheduled' | 'cancelled'

export interface Booking {
  id: string
  patientName: string
  phone: string
  email: string
  doctorId: string
  doctorName: string
  specialty: SpecialtyKey
  specialtyName: string
  date: string
  time: string
  reason: string
  notes: string
  status: BookingStatus
  createdAt: string
}
