import { Link } from 'react-router-dom'
import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'md' | 'lg'
  children: ReactNode
  className?: string
  icon?: ReactNode
}

const variantClasses: Record<string, string> = {
  primary: 'bg-teal-500 text-white hover:bg-teal-600 shadow-soft',
  secondary: 'bg-white text-navy border border-navy/15 hover:border-teal-500 hover:text-teal-600',
  ghost: 'bg-transparent text-navy hover:bg-teal-50',
}

const sizeClasses: Record<string, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-200 focus-visible:outline-2'

export function LinkButton({
  to,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
}: BaseProps & { to: string }) {
  return (
    <Link to={to} className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {children}
      {icon}
    </Link>
  )
}

export function ExternalButton({
  href,
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
}: BaseProps & { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
      {icon}
    </a>
  )
}

export function ActionButton({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  ...rest
}: BaseProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className} disabled:opacity-60 disabled:cursor-not-allowed`}
      {...rest}
    >
      {children}
      {icon}
    </button>
  )
}
