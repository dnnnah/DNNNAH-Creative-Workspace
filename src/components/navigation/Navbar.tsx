import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX, Menu, X, FileCode2, FileText, Braces, Folder, PanelTop, PanelsTopLeft, Terminal } from 'lucide-react'
import { usePlayground } from '../playground/context'
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
  const { sound, toggleSound, discover } = usePlayground()
  const taps = useRef({ count: 0, time: 0 })
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
    let frame = 0
    const update = () => {
      frame = 0
      if (location.hash.startsWith('#projects/')) { setActive('projects'); return }
      const activationLine = (header.current?.getBoundingClientRect().bottom ?? 69) + 48
      const sections = ['main', 'about', 'skills', 'projects', 'contact']
      let current = 'main'
      for (const id of sections) {
        const section = document.getElementById(id)
        if (section && section.getBoundingClientRect().top <= activationLine) current = id
      }
      setActive(current)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    schedule()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    const observer = new ResizeObserver(schedule)
    const main = document.getElementById('main')
    if (main) observer.observe(main)
    if (header.current) observer.observe(header.current)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      window.removeEventListener('hashchange', schedule)
    }
  }, [])

  useEffect(() => {
    if (open) firstLink.current?.focus({ preventScroll: true })
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
    <div className="brand-group"><button className="brand-egg brand-mark" type="button" aria-label={es ? 'Explorar el monograma D.' : 'Explore the D. monogram'} title={es ? 'Tres toques revelan un detalle' : 'Three taps reveal a detail'} onClick={() => {
      const now = Date.now()
      taps.current.count = now - taps.current.time < 1800 ? taps.current.count + 1 : 1
      taps.current.time = now
      if (taps.current.count === 3) { taps.current.count = 0; discover() }
    }}>D.</button><a className="wordmark" href="#main" aria-label={es ? 'DNNNAH — inicio' : 'DNNNAH — home'}>DNNNAH</a></div>
    <button className="sound-toggle" type="button" aria-label={es ? (sound ? 'Desactivar sonidos' : 'Activar sonidos') : (sound ? 'Disable sounds' : 'Enable sounds')} aria-pressed={sound} onClick={toggleSound}>{sound ? <Volume2 size={18} aria-hidden="true" /> : <VolumeX size={18} aria-hidden="true" />}<span>{sound ? 'ON' : 'OFF'}</span></button>
    <div className="language">
      <button className="language-toggle" type="button" lang={es ? 'en' : 'es'} aria-label={es ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'} title={es ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'} onClick={() => onLocaleChange(es ? 'en' : 'es')}>{es ? 'EN' : 'ES'}</button>
    </div>
    <button className="terminal-shortcut" type="button" aria-label={`${es ? 'Abrir Terminal' : 'Open Terminal'} (${shortcut})`} aria-keyshortcuts={apple ? 'Meta+K' : 'Control+K'} aria-haspopup="dialog" onClick={() => {
      setOpen(false)
      onTerminalOpen?.()
    }}><kbd>{shortcut}</kbd></button>
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
