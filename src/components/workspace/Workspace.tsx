import { useEffect, useRef, useState } from 'react'
import { Braces, ChevronDown, ChevronRight, FileCode2, FileText, Folder, PanelLeft, PanelTop, X, Eye } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import type { Locale } from '../../i18n/messages'
import { secretFile, sectionFiles, workspaceFiles, type WorkspaceFile } from './files'
import { WorkspaceContent } from './WorkspaceContent'
import './workspace.css'

const icons = { tsx: FileCode2, md: FileText, ts: Braces, folder: Folder }
function FileIcon({ file }: { file: WorkspaceFile }) {
  const Icon = file.id === 'contact' ? PanelTop : icons[file.kind]
  return <Icon size={18} aria-hidden="true" />
}
export function Workspace({ locale, onLocaleChange, onClose, onNavigate }: { locale: Locale; onLocaleChange: (locale: Locale) => void; onClose: () => void; onNavigate: (href: string) => void }) {
  const es = locale === 'es'
  const modal = useRef<HTMLDialogElement>(null)
  const closeButton = useRef<HTMLButtonElement>(null)
  const focusFrame = useRef(0)
  const [active, setActive] = useState<string | null>('hero')
  const [tabs, setTabs] = useState(['hero'])
  const [expanded, setExpanded] = useState(true)
  const [filesVisible, setFilesVisible] = useState(false)
  const file = workspaceFiles.find(item => item.id === active)

  useEffect(() => {
    const dialog = modal.current!
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.showModal()
    closeButton.current?.focus({ preventScroll: true })
    return () => {
      cancelAnimationFrame(focusFrame.current)
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true })
    }
  }, [])

  function select(id: string) {
    setActive(id)
    setTabs(current => current.includes(id) ? current : [...current, id])
    setFilesVisible(false)
    cancelAnimationFrame(focusFrame.current)
    const focusTab = () => {
      const tab = document.getElementById(`ws-tab-${id}`)
      tab?.focus({ preventScroll: true })
      tab?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
    const existing = document.getElementById(`ws-tab-${id}`)
    if (existing?.getClientRects().length) focusTab()
    else focusFrame.current = requestAnimationFrame(focusTab)
  }
  function closeFile(id: string) {
    cancelAnimationFrame(focusFrame.current)
    const remaining = tabs.filter(tab => tab !== id)
    const next = active === id ? remaining[Math.min(tabs.indexOf(id), remaining.length - 1)] ?? null : active
    setTabs(remaining)
    setActive(next)
    focusFrame.current = requestAnimationFrame(() => {
      const target = document.getElementById(next ? `ws-tab-${next}` : 'ws-open-first')
      target?.focus({ preventScroll: true })
      target?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    })
  }
  function tabKey(event: KeyboardEvent<HTMLButtonElement>, id: string) {
    if (event.key === 'Delete') { event.preventDefault(); closeFile(id); return }
    let index = tabs.indexOf(id)
    if (event.key === 'ArrowRight') index = (index + 1) % tabs.length
    else if (event.key === 'ArrowLeft') index = (index - 1 + tabs.length) % tabs.length
    else if (event.key === 'Home') index = 0
    else if (event.key === 'End') index = tabs.length - 1
    else return
    event.preventDefault()
    select(tabs[index])
  }
  function containTab(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button, [tabindex="0"]')).filter(element => element.tabIndex >= 0 && element.getClientRects().length > 0)
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus() }
  }
  function fileButton(item: WorkspaceFile) {
    return <button className="ws-file" aria-pressed={active === item.id} onClick={() => select(item.id)}><FileIcon file={item} /><span>{item.name}</span></button>
  }
  return <dialog ref={modal} className="workspace" aria-labelledby="ws-title" aria-describedby="ws-description" onKeyDown={containTab} onCancel={event => { event.preventDefault(); onClose() }}>
    <header className="ws-header"><div className="ws-title"><span className="ws-brand" aria-hidden="true">D.</span><h1 id="ws-title">Workspace</h1><span className="ws-header-note">DNNNAH / portfolio</span></div><div className="ws-header-actions"><div className="ws-language" role="group" aria-label={es ? 'Idioma de Workspace' : 'Workspace language'}>{(['es', 'en'] as const).map(language => <button key={language} lang={language} aria-label={language === 'es' ? 'Español' : 'English'} aria-pressed={locale === language} onClick={() => onLocaleChange(language)}>{language.toUpperCase()}</button>)}</div><button ref={closeButton} className="ws-close" onClick={onClose} aria-label={es ? 'Cerrar Workspace' : 'Close Workspace'}><span>{es ? 'Volver al portfolio' : 'Back to portfolio'}</span><X size={20} aria-hidden="true" /></button></div></header>
    <div className="ws-mobile-toolbar"><button aria-expanded={filesVisible} aria-controls="ws-explorer" onClick={() => setFilesVisible(!filesVisible)}><PanelLeft size={18} aria-hidden="true" />{es ? 'Archivos' : 'Files'}{filesVisible ? <ChevronDown size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />}</button><span>{file?.name ?? (es ? 'Sin archivo' : 'No file')}</span></div>
    <nav id="ws-explorer" className={`ws-explorer${filesVisible ? ' is-visible' : ''}`} aria-label={es ? 'Explorador de archivos' : 'File Explorer'}>
      <div className="ws-explorer-label">{es ? 'Explorador' : 'Explorer'}<span aria-hidden="true">/</span></div><p className="ws-root">dnnnah.portfolio</p>
      <ul>{sectionFiles.map(item => <li key={item.id}>{item.id === 'projects' ? <><div className="ws-folder-row">{fileButton(item)}<button className="ws-expand" aria-label={`${es ? (expanded ? 'Contraer' : 'Expandir') : (expanded ? 'Collapse' : 'Expand')} projects/`} aria-expanded={expanded} aria-controls="ws-project-files" onClick={() => setExpanded(!expanded)}>{expanded ? <ChevronDown size={16} aria-hidden="true" /> : <ChevronRight size={16} aria-hidden="true" />}</button></div><ul id="ws-project-files" hidden={!expanded}>{workspaceFiles.filter(item => item.href.startsWith('#projects/')).map(child => <li key={child.id}>{fileButton(child)}</li>)}</ul></> : fileButton(item)}</li>)}</ul>
      {fileButton(secretFile)}
      <div className="ws-explorer-foot"><span aria-hidden="true">{'{ }'}</span><p>{es ? 'Abre un archivo. Encuentra una idea.' : 'Open a file. Find an idea.'}</p></div>
    </nav>
    <section className="ws-editor" aria-label={es ? 'Documentos del portfolio' : 'Portfolio documents'}>
      <div className="ws-tabs" role="tablist" aria-label={es ? 'Archivos abiertos' : 'Open files'}>{tabs.map(id => {
        const item = workspaceFiles.find(entry => entry.id === id)!
        return <div key={id} className="ws-tab" role="presentation" data-active={active === id}>
          <button id={`ws-tab-${id}`} role="tab" aria-selected={active === id} aria-controls={`ws-panel-${id}`} tabIndex={active === id ? 0 : -1} onClick={() => select(id)} onKeyDown={event => tabKey(event, id)}><FileIcon file={item} />{item.name}</button>
          <button className="ws-tab-close" aria-label={`${es ? 'Cerrar' : 'Close'} ${item.name}`} tabIndex={active === id ? 0 : -1} onClick={() => closeFile(id)}><X size={16} aria-hidden="true" /></button>
        </div>
      })}</div>
      <div className="ws-breadcrumb"><span>dnnnah / {file && `${file.href.startsWith('#projects/') ? 'projects / ' : ''}${file.name}`}</span><span><Eye size={14} aria-hidden="true" />{es ? 'Lectura' : 'Reading'}</span></div>
      {tabs.map(id => <div key={id} id={`ws-panel-${id}`} className="ws-panel" role="tabpanel" aria-labelledby={`ws-tab-${id}`} tabIndex={0} hidden={active !== id}>{active === id && file && <WorkspaceContent file={file} locale={locale} onSelect={select} onClose={onClose} onNavigate={onNavigate} />}</div>)}
      {tabs.length === 0 && <div className="ws-empty"><Folder size={48} strokeWidth={1} aria-hidden="true" /><h2>{es ? 'Una idea por abrir.' : 'An idea waiting to open.'}</h2><p>{es ? 'Elige un archivo del explorador para seguir recorriendo el portfolio.' : 'Choose a file in the explorer to keep exploring the portfolio.'}</p><button id="ws-open-first" className="ws-link ws-link--primary" onClick={() => select('hero')}>{es ? 'Abrir hero.tsx' : 'Open hero.tsx'}<FileCode2 size={18} aria-hidden="true" /></button></div>}
    </section>
    <footer className="ws-status"><p id="ws-description"><Eye size={15} aria-hidden="true" />{es ? 'Explora el portfolio' : 'Explore the portfolio'}</p><span className="ws-status-hint">{es ? 'Las ideas se leen. Los enlaces se visitan.' : 'Read the ideas. Follow the links.'}</span><span>{locale.toUpperCase()}<span className="ws-encoding"> / UTF-8</span></span></footer>
  </dialog>
}
