import { useEffect, useState } from 'react'
import { Navbar } from '../components/navigation/Navbar'
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
      <Navbar locale={locale} onLocaleChange={setLocale} />
      <main id="main" tabIndex={-1}><Hero key={locale} locale={locale} /></main>
    </div>
  </>
}
