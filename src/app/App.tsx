import { useEffect, useState } from 'react'
import { Hero } from '../components/hero/Hero'
import { messages, type Locale } from '../i18n/messages'

export function App() {
  const [locale, setLocale] = useState<Locale>('es')
  const t = messages[locale]
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = `DNNNAH — ${t.title}`
  }, [locale, t.title])

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="page">
      <header className="masthead">
        <span className="wordmark"><span className="brand-mark" aria-hidden="true">D.</span>DNNNAH</span>
        <nav className="language" aria-label={t.language}>
          {(['es', 'en'] as const).map(language => <button key={language} type="button" lang={language} aria-label={language === 'es' ? 'Español' : 'English'} aria-pressed={locale === language} onClick={() => setLocale(language)}>{language.toUpperCase()}</button>)}
        </nav>
      </header>
      <main id="main" tabIndex={-1}><Hero key={locale} locale={locale} /></main>
    </div>
  </>
}
