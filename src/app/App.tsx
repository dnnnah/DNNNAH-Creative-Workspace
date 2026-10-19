import { useEffect, useState } from 'react'
import { Workspace } from '../components/workspace/Workspace'
import { Terminal } from '../components/terminal/Terminal'
import { Contact } from '../components/contact/contact'
import { Navbar } from '../components/navigation/Navbar'
import { About } from '../components/about/About'
import { Skills } from '../components/skills/Skills'
import { Projects, ProjectCase } from '../components/projects/Projects'
import { projectFromHash } from '../components/projects/content'
import { Playground } from '../components/playground/Playground'
import { Hero } from '../components/hero/Hero'
import { messages, type Locale } from '../i18n/messages'
import { buildSeoMetadata, localeFromLocation } from '../seo/site'

export function App() {
  const [experience, setExperience] = useState<'workspace' | 'terminal' | null>(null)
  const [locale, setLocale] = useState<Locale>(() => typeof window === 'undefined' ? 'es' : localeFromLocation(window.location.pathname, window.location.search))
  const [hash, setHash] = useState(() => typeof window === 'undefined' ? '' : window.location.hash)
  const project = projectFromHash(hash)
  const t = messages[locale]
  useEffect(() => {
    const syncHash = () => { setHash(window.location.hash); setExperience(null) }
    const syncPopState = () => {
      setLocale(localeFromLocation(window.location.pathname, window.location.search))
      setHash(window.location.hash)
      setExperience(null)
    }
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('popstate', syncPopState)
    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('popstate', syncPopState)
    }
  }, [])
  useEffect(() => {
    const focusTarget = () => {
      const target = project ? document.getElementById('case-title') : document.getElementById(hash.slice(1))
      if (!target) return false
      target.focus({ preventScroll: true })
      if (project) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
      else target.scrollIntoView({ block: 'start' })
      return true
    }
    if (focusTarget() || !project) return
    // A lazy case mounts after the hash effect; focus its title once it exists.
    const observer = new MutationObserver(() => {
      if (focusTarget()) observer.disconnect()
    })
    const main = document.getElementById('main')
    if (main) observer.observe(main, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [hash, project])
  useEffect(() => {
    const url = new URL(window.location.href)
    if (url.pathname === '/en' || url.pathname.startsWith('/en/') || url.pathname === '/index.html') url.pathname = '/'
    if (locale === 'en') url.searchParams.set('lang', 'en')
    else url.searchParams.delete('lang')
    const nextUrl = `${url.pathname}${url.search}${url.hash}`
    const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`
    if (nextUrl !== currentUrl) window.history.replaceState(window.history.state, '', nextUrl)

    const meta = buildSeoMetadata(locale, import.meta.env.VITE_SITE_URL as string | undefined, project)
    document.documentElement.lang = locale
    document.title = meta.title
    const setMeta = (selector: string, content: string) => document.querySelector(selector)?.setAttribute('content', content)
    const setLink = (selector: string, href: string) => document.querySelector<HTMLLinkElement>(selector)?.setAttribute('href', href)
    setMeta('meta[name="description"]', meta.description)
    setLink('link[rel="canonical"]', meta.canonical)
    setLink('link[rel="alternate"][hreflang="es"]', meta.esUrl)
    setLink('link[rel="alternate"][hreflang="en"]', meta.enUrl)
    setLink('link[rel="alternate"][hreflang="x-default"]', meta.esUrl)
    setMeta('meta[property="og:title"]', meta.title)
    setMeta('meta[property="og:description"]', meta.description)
    setMeta('meta[property="og:locale"]', meta.ogLocale)
    setMeta('meta[property="og:locale:alternate"]', meta.ogAlternateLocale)
    setMeta('meta[property="og:url"]', meta.canonical)
    setMeta('meta[property="og:image"]', meta.imageUrl)
    setMeta('meta[property="og:image:alt"]', meta.title)
    setMeta('meta[name="twitter:title"]', meta.title)
    setMeta('meta[name="twitter:description"]', meta.description)
    setMeta('meta[name="twitter:image"]', meta.imageUrl)
  }, [locale, project])

  const Experience = experience === 'workspace' ? Workspace : Terminal

  return <Playground locale={locale}>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="page">
      <Navbar locale={locale} onLocaleChange={setLocale} onWorkspaceOpen={() => setExperience('workspace')} onTerminalOpen={() => setExperience('terminal')} />
      <main id="main" tabIndex={-1}>{project ? <ProjectCase project={project} locale={locale} /> : <><Hero key={locale} locale={locale} /><About locale={locale} /><Skills locale={locale} /><Projects locale={locale} /><Contact locale={locale} /></>}</main>
    </div>
    {experience && <Experience locale={locale} onLocaleChange={setLocale} onClose={() => setExperience(null)} onNavigate={href => {
      setExperience(null)
      if (window.location.hash !== href) window.location.hash = href
      else requestAnimationFrame(() => {
        const isCase = !!projectFromHash(href)
        const target = document.getElementById(isCase ? 'case-title' : href.slice(1))
        target?.focus({ preventScroll: true })
        if (isCase) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        else target?.scrollIntoView({ block: 'start' })
      })
    }} />}
  </Playground>
}
