import type { Language } from '../types'

// Shared weekday labels (index 0 = Sunday ... 6 = Saturday), so every place
// that needs to render a doctor's availableDays uses the same names instead
// of each screen keeping its own copy.
export const shortDayNames: Record<Language, string[]> = {
  ar: ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'],
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
}

export function formatTime12h(time: string, lang: Language) {
  return to12Hour(time, lang)
}

function to12Hour(time: string, lang: Language) {
  const [hourStr, minuteStr] = time.split(':')
  const hour = Number(hourStr)
  const minute = minuteStr ?? '00'
  const period = hour < 12 ? (lang === 'ar' ? 'ص' : 'AM') : lang === 'ar' ? 'م' : 'PM'
  const displayHour = hour % 12 === 0 ? 12 : hour % 12
  return `${displayHour}:${minute} ${period}`
}

export function formatWorkingHours(lang: Language, start: string, end: string) {
  const dash = lang === 'ar' ? '-' : '–'
  return `${to12Hour(start, lang)} ${dash} ${to12Hour(end, lang)}`
}

function toMinutes(time: string) {
  const [hourStr, minuteStr] = time.split(':')
  return Number(hourStr) * 60 + Number(minuteStr ?? '0')
}

export function isWithinWorkingHours(time: string, start: string, end: string) {
  if (!time) return false
  const t = toMinutes(time)
  return t >= toMinutes(start) && t <= toMinutes(end)
}

export function availableDaysLabel(lang: Language, availableDays: number[]) {
  return availableDays
    .slice()
    .sort((a, b) => a - b)
    .map((i) => shortDayNames[lang][i])
    .join(lang === 'ar' ? '، ' : ', ')
}
