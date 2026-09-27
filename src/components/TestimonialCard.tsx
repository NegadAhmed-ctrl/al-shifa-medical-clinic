import { Star, Quote } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import type { Testimonial } from '../types'

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { lang } = useLanguage()

  return (
    <div className="flex h-full flex-col gap-4 rounded-clinic border border-navy/10 bg-white p-6">
      <Quote size={26} className="text-teal-200" />
      <p className="flex-1 text-[15px] leading-relaxed text-navy/75">
        {pick(lang, testimonial.quoteAr, testimonial.quoteEn)}
      </p>
      <div className="flex items-center justify-between border-t border-navy/10 pt-4">
        <div>
          <p className="text-sm font-semibold text-navy">{pick(lang, testimonial.nameAr, testimonial.nameEn)}</p>
          <p className="text-xs text-navy/50">{pick(lang, testimonial.roleAr, testimonial.roleEn)}</p>
        </div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < testimonial.rating ? 'fill-amber text-amber' : 'text-navy/15'}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
