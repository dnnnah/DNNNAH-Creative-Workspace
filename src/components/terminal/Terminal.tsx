import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Terminal as TerminalIcon, X } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import type { Locale } from '../../i18n/messages'
import { completeCommand, executeCommand } from './commands'
import './terminal.css'
import { Demolition } from './Demolition'

type Props = { locale: Locale; onLocaleChange: (locale: Locale) => void; onClose: () => void; onNavigate: (href: string) => void }
export function Terminal({ locale, onLocaleChange, onClose, onNavigate }: Props) {
  const es = locale === 'es'
  const modal = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const bottom = useRef<HTMLDivElement>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [value, setValue] = useState('')
  const [entries, setEntries] = useState<string[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [position, setPosition] = useState<number | null>(null)
  const draft = useRef('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [busy, setBusy] = useState(false)
  const [matrix, setMatrix] = useState(false)

  useEffect(() => {
    const dialog = modal.current!
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    input.current?.focus({ preventScroll: true })
    return () => {
      clearTimeout(timer.current)
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [])
  useEffect(() => { bottom.current?.scrollIntoView({ block: 'nearest' }) }, [entries, suggestions, locale, busy])

  function submit() {
    const command = value.trim()
    if (!command || busy) return
    const result = executeCommand(command, locale)
    setHistory(current => [...current.slice(-199), command])
    setPosition(null)
    draft.current = ''
    setValue('')
    setSuggestions([])
    if (result.action === 'exit') { onClose(); return }
    if (result.navigate) { onNavigate(result.navigate); return }
    setEntries(current => result.action === 'clear' ? [] : [...current.slice(-199), command])
    if (result.action === 'demolition') setBusy(true)
    if (result.action === 'matrix') {
      setMatrix(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setMatrix(false), 3000)
    }
    input.current?.focus({ preventScroll: true })
  }
  function keyboard(event: KeyboardEvent<HTMLInputElement>) {
    if (event.nativeEvent.isComposing) return
    if (event.key === 'Tab' && !event.shiftKey && value.trim()) {
      const matches = completeCommand(value)
      if (matches.length) {
        event.preventDefault()
        if (matches.length === 1) { setValue(matches[0]); setSuggestions([]) }
        else setSuggestions(matches)
      }
    }
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault()
      if (!history.length) return
      if (position === null && event.key === 'ArrowDown') return
      if (position === null) draft.current = value
      const next = event.key === 'ArrowUp' ? Math.max(0, (position ?? history.length) - 1) : (position ?? history.length) + 1
      setPosition(next >= history.length ? null : next)
      setValue(next >= history.length ? draft.current : history[next])
      setSuggestions([])
    }
  }
  function containFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab' || event.defaultPrevented) return
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, input, a[href], [tabindex="0"]')).filter(element => element.getClientRects().length && element.tabIndex >= 0)
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }
  return <dialog ref={modal} className="terminal" aria-labelledby="term-title" aria-describedby="term-description" onKeyDown={containFocus} onCancel={event => { event.preventDefault(); onClose() }}>
    <header className="term-header"><div className="term-title"><TerminalIcon size={21} aria-hidden="true" /><h1 id="term-title">Terminal</h1><span>v0.2</span></div><div className="term-actions"><div role="group" aria-label={es ? 'Idioma de Terminal' : 'Terminal language'}>{(['es', 'en'] as const).map(language => <button key={language} aria-label={language === 'es' ? 'Español' : 'English'} lang={language} aria-pressed={locale === language} onClick={() => onLocaleChange(language)}>{language.toUpperCase()}</button>)}</div><button aria-label={es ? 'Cerrar Terminal' : 'Close Terminal'} onClick={onClose}><X size={20} aria-hidden="true" /></button></div></header>
    <div className="term-path" aria-hidden="true">dnnnah / portfolio <span>~/terminal</span></div>
    <div className="term-scroll" tabIndex={0} aria-label={es ? 'Contenido de la consola' : 'Console content'}>
      <div className="term-welcome"><p className="term-wordmark">DNNNAH<span>_</span></p><p>{es ? 'Otra forma de entrar en mi mundo.' : 'Another way into my world.'}</p><p id="term-description">{es ? 'Explora el portfolio con comandos. Escribe help para empezar.' : 'Explore the portfolio with commands. Type help to get started.'}</p><p className="term-simulation">{es ? 'Simulación interactiva · ningún comando opera sobre tu equipo.' : 'Interactive simulation · no command operates on your computer.'}</p></div>
      <div role="log" aria-label={es ? 'Historial de respuestas' : 'Response history'} aria-live="polite" aria-relevant="additions" className="term-log">{entries.map((command, index) => {
        const result = executeCommand(command, locale)
        return <div className="term-entry" key={`${index}-${command}`}><p className="term-command"><span aria-hidden="true">❯</span> {command}</p><div className="term-output">{result.action === 'demolition' ? <Demolition locale={locale} onDone={() => { if (index === entries.length - 1) setBusy(false) }} /> : result.text}</div>{result.links && <ul className="term-links">{result.links.map(link => <li key={link.href}><a href={link.href} onClick={event => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
          if (link.href.startsWith('#')) { event.preventDefault(); onNavigate(link.href) }
          else onClose()
        }}>{link.label}<ArrowRight size={16} aria-hidden="true" /></a></li>)}</ul>}</div>
      })}</div>
      <div ref={bottom} />
    </div>
    <div className="term-input-area"><div role="status" className="term-suggestions">{suggestions.join('  ·  ')}</div><form onSubmit={event => { event.preventDefault(); submit() }}><label htmlFor="term-input"><span className="term-user" aria-hidden="true">visitor<span>@dnnnah</span> ~</span><span className="sr-only">{es ? 'Comando' : 'Command'}</span><span aria-hidden="true">❯</span></label><input ref={input} id="term-input" readOnly={busy} autoComplete="off" autoCapitalize="none" spellCheck={false} maxLength={500} value={value} onChange={event => { setValue(event.target.value); setPosition(null); setSuggestions([]) }} onKeyDown={keyboard} aria-describedby="term-hints" /><button type="submit" disabled={busy} aria-label={es ? 'Ejecutar comando' : 'Run command'}><ArrowRight size={20} aria-hidden="true" /></button></form><p id="term-hints">{es ? '↑↓ historial · Tab completar · Shift+Tab foco · Esc salir' : '↑↓ history · Tab complete · Shift+Tab focus · Esc exit'}</p></div>
    <footer className="term-footer"><span><span className="term-ready" aria-hidden="true" />{es ? 'Listo para explorar' : 'Ready to explore'}</span><span>{locale.toUpperCase()} / UTF-8</span></footer>
    {matrix && <div className="term-matrix" aria-hidden="true">{Array.from({ length: 16 }, (_, index) => <span key={index} style={{ animationDelay: `${index * -0.17}s` }}>01<br />ア<br />10<br />イ<br />01<br />ウ<br />10<br />エ<br />01<br />オ<br />10<br />カ</span>)}</div>}
  </dialog>
}
