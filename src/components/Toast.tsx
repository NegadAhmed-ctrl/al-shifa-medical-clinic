import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'
import { createPortal } from 'react-dom'

type ToastVariant = 'success' | 'error' | 'info'

interface ToastItem {
  id: string
  message: string
  variant: ToastVariant
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const variantStyles: Record<ToastVariant, { bg: string; icon: ReactNode }> = {
  success: { bg: 'bg-teal-600', icon: <CheckCircle2 size={18} /> },
  error: { bg: 'bg-red-500', icon: <XCircle size={18} /> },
  info: { bg: 'bg-navy', icon: <Info size={18} /> },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      setToasts((prev) => [...prev, { id, message, variant }])
      window.setTimeout(() => dismiss(id), 4000)
    },
    [dismiss]
  )

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4 sm:inset-x-auto sm:end-4 sm:items-end"
            aria-live="polite"
          >
            {toasts.map((toast) => (
              <div
                key={toast.id}
                role="status"
                className={`flex w-full max-w-sm animate-rise items-start gap-3 rounded-xl ${variantStyles[toast.variant].bg} px-4 py-3 text-sm text-white shadow-soft`}
              >
                <span className="mt-0.5 shrink-0">{variantStyles[toast.variant].icon}</span>
                <p className="flex-1 leading-snug">{toast.message}</p>
                <button
                  onClick={() => dismiss(toast.id)}
                  className="shrink-0 opacity-80 hover:opacity-100"
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
