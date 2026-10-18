import { useEffect, useRef, useState } from 'react'
import { Menu, X, FileCode2, FileText, Braces, Folder, PanelTop, PanelsTopLeft, Terminal } from 'lucide-react'
import type { Locale } from '../../i18n/messages'

const destinations = [
  { label: 'hero.tsx', icon: FileCode2 },
  { label: 'about.md', icon: FileText },
  { label: 'skills.ts', icon: Braces },
  { label: 'projects/', icon: Folder },
  { label: 'contact.tsx', icon: PanelTop },
] as const

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
    if (!open) return
    const dismiss = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    return () => document.removeEventListener('pointerdown', dismiss)
  }, [open])

  return <header ref={header} className="masthead" onKeyDown={event => {
    if (event.key === 'Escape' && open) { event.preventDefault(); close() }
  }} onBlur={event => {
    if (open && !event.currentTarget.contains(event.relatedTarget)) setOpen(false)
  }}>
    <a className="wordmark" href="#main" aria-label={es ? 'DNNNAH — inicio' : 'DNNNAH — home'}><span className="brand-mark" aria-hidden="true">D.</span>DNNNAH</a>
    <button ref={toggle} className="menu-toggle" type="button" aria-label={es ? (open ? 'Cerrar menú' : 'Abrir menú') : (open ? 'Close menu' : 'Open menu')} aria-expanded={open} aria-controls="primary-navigation" onClick={() => open ? close() : setOpen(true)}>
      {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
    </button>
    <nav id="primary-navigation" className={`primary-navigation${open ? ' is-open' : ''}`} aria-label={es ? 'Navegación principal' : 'Main navigation'}>
      <ul>{destinations.map(({ label, icon: Icon }, index) => <li key={label}>{index === 0
        ? <a ref={firstLink} className="file-link" href="#main" aria-current="page" onClick={() => {
          setOpen(false)
          document.getElementById('main')?.focus()
        }}><Icon size={18} aria-hidden="true" /><span>{label}</span><span className="active-dot" aria-hidden="true" /></a>
        : <span className="file-link file-link--pending" aria-disabled="true"><Icon size={18} aria-hidden="true" /><span>{label}</span><span className="pending-status">{es ? 'Próximamente' : 'Coming soon'}</span></span>
      }</li>)}</ul>
      <div className="workspace-tools">
        {[{ label: 'Workspace', icon: PanelsTopLeft }, { label: 'Terminal', icon: Terminal }].map(({ label, icon: Icon }) =>
          <span key={label} className="file-link file-link--pending" aria-disabled="true"><Icon size={18} aria-hidden="true" /><span>{label}</span><span className="pending-status">{es ? 'Pendiente' : 'Pending'}</span></span>
        )}
      </div>
    </nav>
    <div className="language" role="group" aria-label={es ? 'Idioma' : 'Language'}>
      {(['es', 'en'] as const).map(language => <button key={language} type="button" lang={language} aria-label={language === 'es' ? 'Español' : 'English'} aria-pressed={locale === language} onClick={() => onLocaleChange(language)}>{language.toUpperCase()}</button>)}
    </div>
  </header>
}
