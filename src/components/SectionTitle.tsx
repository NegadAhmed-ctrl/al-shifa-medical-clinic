interface SectionTitleProps {
  title: string
  subtitle?: string
  align?: 'start' | 'center'
}

export function SectionTitle({ title, subtitle, align = 'start' }: SectionTitleProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <h2 className="font-display text-3xl md:text-4xl text-navy leading-snug">{title}</h2>
      {subtitle && <p className="mt-3 text-navy/60 text-base md:text-lg">{subtitle}</p>}
    </div>
  )
}
