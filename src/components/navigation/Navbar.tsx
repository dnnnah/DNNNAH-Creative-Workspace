import { useEffect, useRef, useState } from 'react'
import { Menu, X, FileCode2, FileText, Braces, Folder, PanelTop, PanelsTopLeft, Terminal } from 'lucide-react'
import { isApplePlatform } from './shortcut'
import type { Locale } from '../../i18n/messages'

const destinations = [
  { label: 'hero.tsx', icon: FileCode2 },
  { label: 'about.md', icon: FileText },
  { label: 'skills.ts', icon: Braces },
  { label: 'projects/', icon: Folder },
  { label: 'contact.tsx', icon: PanelTop },
] as const

export function Navbar({ locale, onLocaleChange, onWorkspaceOpen, onTerminalOpen }: { locale: Locale; onLocaleChange: (locale: Locale) => void; onWorkspaceOpen?: () => void; onTerminalOpen?: () => void }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('main')
  const toggle = useRef<HTMLButtonElement>(null)
  const header = useRef<HTMLElement>(null)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const es = locale === 'es'
  const [apple] = useState(() => typeof navigator !== 'undefined' && isApplePlatform(navigator.platform || navigator.userAgent))
  const shortcut = apple ? 'CMD+K' : 'Ctrl+K'
  const close = () => { setOpen(false); toggle.current?.focus() }

  useEffect(() => {
    const launch = (event: globalThis.KeyboardEvent) => {
      const modifier = apple ? event.metaKey && !event.ctrlKey : event.ctrlKey && !event.metaKey
      if (event.key.toLowerCase() !== 'k' || !modifier || event.shiftKey || event.altKey || event.repeat || event.isComposing) return
      event.preventDefault()
      setOpen(false)
      onTerminalOpen?.()
    }
    window.addEventListener('keydown', launch)
    return () => window.removeEventListener('keydown', launch)
  }, [apple, onTerminalOpen])

  useEffect(() => {
    const sync = () => setActive(location.hash.startsWith('#projects') ? 'projects' : location.hash === '#skills' ? 'skills' : location.hash === '#about' ? 'about' : location.hash === '#contact' ? 'contact' : 'main')
    sync()
    addEventListener('hashchange', sync)
    return () => removeEventListener('hashchange', sync)
  }, [])

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
    <div className="language" role="group" aria-label={es ? 'Idioma' : 'Language'}>
      {(['es', 'en'] as const).map(language => <button key={language} type="button" lang={language} aria-label={language === 'es' ? 'Español' : 'English'} aria-pressed={locale === language} onClick={() => onLocaleChange(language)}>{language.toUpperCase()}</button>)}
    </div>
    <button className="terminal-shortcut" type="button" aria-label={`${es ? 'Abrir Terminal' : 'Open Terminal'} (${shortcut})`} aria-keyshortcuts={apple ? 'Meta+K' : 'Control+K'} aria-haspopup="dialog" onClick={() => {
      setOpen(false)
      onTerminalOpen?.()
    }}><Terminal size={18} aria-hidden="true" /><kbd>{shortcut}</kbd></button>
    <button ref={toggle} className="menu-toggle" type="button" aria-label={es ? (open ? 'Cerrar menú' : 'Abrir menú') : (open ? 'Close menu' : 'Open menu')} aria-expanded={open} aria-controls="primary-navigation" onClick={() => open ? close() : setOpen(true)}>
      {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
    </button>
    <nav id="primary-navigation" className={`primary-navigation${open ? ' is-open' : ''}`} aria-label={es ? 'Navegación principal' : 'Main navigation'}>
      <ul>{destinations.map(({ label, icon: Icon }, index) => <li key={label}>{index < 5
        ? <a ref={index === 0 ? firstLink : undefined} className="file-link" href={index === 0 ? '#main' : index === 1 ? '#about' : index === 2 ? '#skills' : index === 3 ? '#projects' : '#contact'} aria-current={active === (index === 0 ? 'main' : index === 1 ? 'about' : index === 2 ? 'skills' : index === 3 ? 'projects' : 'contact') ? 'page' : undefined} onClick={() => {
          setOpen(false)
          const target = index === 0 ? 'main' : index === 1 ? 'about' : index === 2 ? 'skills' : index === 3 ? 'projects' : 'contact'
          setActive(target)
          document.getElementById(target)?.focus({ preventScroll: true })
        }}><Icon size={18} aria-hidden="true" /><span>{label}</span>{active === (index === 0 ? 'main' : index === 1 ? 'about' : index === 2 ? 'skills' : index === 3 ? 'projects' : 'contact') && <span className="active-dot" aria-hidden="true" />}</a>
        : <span className="file-link file-link--pending" aria-disabled="true"><Icon size={18} aria-hidden="true" /><span>{label}</span><span className="pending-status">{es ? 'Próximamente' : 'Coming soon'}</span></span>
      }</li>)}</ul>
      <div className="workspace-tools">
        <button className="file-link workspace-launch" type="button" aria-haspopup="dialog" onClick={() => {
          setOpen(false)
          toggle.current?.focus()
          onWorkspaceOpen?.()
        }}><PanelsTopLeft size={18} aria-hidden="true" /><span>Workspace</span></button>
        <button className="file-link workspace-launch" type="button" aria-haspopup="dialog" onClick={() => {
          setOpen(false)
          toggle.current?.focus()
          onTerminalOpen?.()
        }}><Terminal size={18} aria-hidden="true" /><span>Terminal</span></button>
      </div>
    </nav>

  </header>
}
