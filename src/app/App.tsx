import { useEffect, useState } from 'react'
import { Terminal } from '../components/terminal/Terminal'
import { Workspace } from '../components/workspace/Workspace'
import { Contact } from '../components/contact/contact'
import { Navbar } from '../components/navigation/Navbar'
import { About } from '../components/about/About'
import { Skills } from '../components/skills/Skills'
import { Projects, ProjectCase } from '../components/projects/Projects'
import { projectFromHash } from '../components/projects/content'
import { Hero } from '../components/hero/Hero'
import { messages, type Locale } from '../i18n/messages'

export function App() {
  const [experience, setExperience] = useState<'workspace' | 'terminal' | null>(null)
  const [messageDraft, setMessageDraft] = useState<{ message: string } | undefined>(undefined)
  const [locale, setLocale] = useState<Locale>('es')
  const [hash, setHash] = useState(() => typeof window === 'undefined' ? '' : window.location.hash)
  const project = projectFromHash(hash)
  const t = messages[locale]
  useEffect(() => {
    const sync = () => { setHash(window.location.hash); setExperience(null) }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  useEffect(() => {
    const target = hash === '#contact' && messageDraft ? document.getElementById('contact-message') : project ? document.getElementById('case-title') : document.getElementById(hash.slice(1))
    if (target) { target.focus({ preventScroll: true }); target.scrollIntoView({ block: 'start' }) }
  }, [hash, project, messageDraft])
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = project ? `${project.name} — DNNNAH` : `DNNNAH — ${t.title}`
  }, [locale, t.title, project])

  const Experience = experience === 'workspace' ? Workspace : Terminal

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="page">
      <Navbar locale={locale} onLocaleChange={setLocale} onWorkspaceOpen={() => setExperience('workspace')} onTerminalOpen={() => setExperience('terminal')} />
      <main id="main" tabIndex={-1}>{project ? <ProjectCase project={project} locale={locale} /> : <><Hero key={locale} locale={locale} /><About locale={locale} /><Skills locale={locale} /><Projects locale={locale} /><Contact locale={locale} messageDraft={messageDraft} /></>}</main>
    </div>
    {experience && <Experience locale={locale} onLocaleChange={setLocale} onClose={() => setExperience(null)} onNavigate={(href, message?: string) => {
      setMessageDraft(message === undefined ? undefined : { message })
      setExperience(null)
      if (window.location.hash !== href) window.location.hash = href
      else requestAnimationFrame(() => {
        const target = document.getElementById(message === undefined ? (projectFromHash(href) ? 'case-title' : href.slice(1)) : 'contact-message')
        target?.focus({ preventScroll: true })
        target?.scrollIntoView({ block: 'start' })
      })
    }} />}
  </>
}
