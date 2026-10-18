import { useEffect, useRef, useState } from 'react'
import type { Locale } from '../../i18n/messages'

const destinations = ['hero.tsx', 'about.md', 'skills.ts', 'projects/', 'contact.tsx'] as const

export function Navbar({ locale, onLocaleChange }: { locale: Locale; onLocaleChange: (locale: Locale) => void }) {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const es = locale === 'es'
  const close = () => { setOpen(false); toggle.current?.focus() }

  useEffect(() => {
    if (open) firstLink.current?.focus()
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 70rem)')
    const reset = () => {
      if (media.matches) {
        setOpen(false)
        if (document.activeElement === toggle.current) firstLink.current?.focus()
      }
    }
    media.addEventListener('change', reset)
    return () => media.removeEventListener('change', reset)
  }, [])

  return <header ref={header} className="masthead" onKeyDown={event => {
    if (event.key === 'Escape' && open) { event.preventDefault(); close() }
  }} onBlur={event => {
    if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }}>
    <a className="wordmark" href="#main" aria-label={es ? 'DNNNAH — inicio' : 'DNNNAH — home'}><span className="brand-mark" aria-hidden="true">D.</span>DNNNAH</a>
    <button ref={toggle} className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => open ? close() : setOpen(true)}>
      <span>{es ? (open ? 'Cerrar menú' : 'Abrir menú') : (open ? 'Close menu' : 'Open menu')}</span>
      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 8h16M4 16h16" />}</svg>
    </button>
    <nav id="primary-navigation" className={`primary-navigation${open ? ' is-open' : ''}`} aria-label={es ? 'Navegación principal' : 'Main navigation'}>
      <ul>{destinations.map((label, index) => <li key={label}>{index === 0
        ? <a ref={firstLink} className="file-link" href="#main" aria-current="page" onClick={() => {
          setOpen(false)
          document.getElementById('main')?.focus()
        }}>{label}</a>
        : <span className="file-link file-link--pending" aria-disabled="true">{label}<span className="pending-status">{es ? 'Próximamente' : 'Coming soon'}</span></span>
      }</li>)}</ul>
    </nav>
    <div className="language" role="group" aria-label={es ? 'Idioma' : 'Language'}>
      {(['es', 'en'] as const).map(language => <button key={language} type="button" lang={language} aria-label={language === 'es' ? 'Español' : 'English'} aria-pressed={locale === language} onClick={() => onLocaleChange(language)}>{language.toUpperCase()}</button>)}
    </div>
  </header>
}
