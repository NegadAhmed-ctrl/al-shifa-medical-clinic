import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, Cross } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import { LanguageSwitcher } from './LanguageSwitcher'
import { LinkButton } from './Button'

export function Navbar() {
  const { t, lang } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [t])

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/doctors', label: t('nav.doctors') },
    { to: '/services', label: t('nav.services') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') },
    { to: '/my-bookings', label: t('nav.myBookings') },
  ]

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative px-1 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-teal-600' : 'text-navy/70 hover:text-navy'
    } after:absolute after:bottom-0 after:inset-x-1 after:h-0.5 after:origin-center after:scale-x-0 after:bg-teal-500 after:transition-transform after:duration-200 ${
      isActive ? 'after:scale-x-100' : ''
    }`

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow ${
        scrolled ? 'bg-white/95 backdrop-blur shadow-sm' : 'bg-white/70 backdrop-blur'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-navy">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal-500 text-white">
            <Cross size={18} />
          </span>
          <span>{lang === 'ar' ? 'عيادة الشفاء' : 'Al Shifa'}</span>
        </Link>

        <div className="hidden lg:flex lg:items-center lg:gap-5">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-3">
          <LanguageSwitcher />
          <LinkButton to="/appointment" size="md">
            {t('nav.book')}
          </LinkButton>
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-navy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-navy/10 bg-white px-5 pb-6 pt-2 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive ? 'bg-teal-50 text-teal-600' : 'text-navy/70'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LanguageSwitcher />
          </div>
          <LinkButton to="/appointment" className="mt-4 w-full">
            {t('nav.book')}
          </LinkButton>
        </div>
      )}
    </header>
  )
}
