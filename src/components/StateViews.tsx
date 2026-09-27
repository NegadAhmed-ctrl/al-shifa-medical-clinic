import type { ReactNode } from 'react'
import { Loader2, SearchX, AlertTriangle } from 'lucide-react'

export function LoadingState({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-navy/50">
      <Loader2 size={28} className="animate-spin text-teal-500" />
      <p className="text-sm">{label}</p>
    </div>
  )
}

export function EmptyState({ title, description, icon }: { title: string; description?: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-clinic border border-dashed border-navy/15 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy/5 text-navy/40">
        {icon ?? <SearchX size={22} />}
      </span>
      <p className="font-medium text-navy">{title}</p>
      {description && <p className="max-w-sm text-sm text-navy/55">{description}</p>}
    </div>
  )
}

export function ErrorState({ title, description }: { title: string; description?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-clinic border border-red-100 bg-red-50/60 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-500">
        <AlertTriangle size={22} />
      </span>
      <p className="font-medium text-navy">{title}</p>
      {description && <p className="max-w-sm text-sm text-navy/55">{description}</p>}
    </div>
  )
}
