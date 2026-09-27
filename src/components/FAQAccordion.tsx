import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { pick } from '../utils/localize'
import type { FAQItem } from '../types'

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const { lang } = useLanguage()
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null)

  return (
    <div className="divide-y divide-navy/10 rounded-clinic border border-navy/10 bg-white">
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div key={item.id}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start"
              onClick={() => setOpenId(isOpen ? null : item.id)}
              aria-expanded={isOpen}
            >
              <span className="font-medium text-navy">{pick(lang, item.questionAr, item.questionEn)}</span>
              <Plus
                size={18}
                className={`shrink-0 text-teal-500 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm leading-relaxed text-navy/65">
                {pick(lang, item.answerAr, item.answerEn)}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
