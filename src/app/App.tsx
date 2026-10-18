import { useEffect, useState } from 'react'
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
  const [experience, setExperience] = useState<'workspace' | null>(null)
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
    const target = project ? document.getElementById('case-title') : document.getElementById(hash.slice(1))
    if (target) { target.focus({ preventScroll: true }); target.scrollIntoView({ block: 'start' }) }
  }, [hash, project])
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = project ? `${project.name} — DNNNAH` : `DNNNAH — ${t.title}`
  }, [locale, t.title, project])

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="page">
      <Navbar locale={locale} onLocaleChange={setLocale} onWorkspaceOpen={() => setExperience('workspace')} />
      <main id="main" tabIndex={-1}>{project ? <ProjectCase project={project} locale={locale} /> : <><Hero key={locale} locale={locale} /><About locale={locale} /><Skills locale={locale} /><Projects locale={locale} /><Contact locale={locale} /></>}</main>
    </div>
    {experience === 'workspace' && <Workspace locale={locale} onLocaleChange={setLocale} onClose={() => setExperience(null)} onNavigate={href => {
      setExperience(null)
      if (window.location.hash !== href) window.location.hash = href
      else requestAnimationFrame(() => {
        const target = document.getElementById(projectFromHash(href) ? 'case-title' : href.slice(1))
        target?.focus({ preventScroll: true })
        target?.scrollIntoView({ block: 'start' })
      })
    }} />}
  </>
}
