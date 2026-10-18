import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { messages, type Locale } from '../i18n/messages'

const colors = [['cream', '#F6F5F0'], ['ink', '#171717'], ['lime', '#B8FF65'], ['lavender', '#D9CDFF']] as const

export function App() {
  const [locale, setLocale] = useState<Locale>('es')
  const [activated, setActivated] = useState(false)
  const t = messages[locale]
  useEffect(() => {
    document.documentElement.lang = locale
    document.title = `DNNNAH — ${t.title}`
  }, [locale, t.title])

  return <>
    <a className="skip-link" href="#main">{t.skip}</a>
    <div className="page">
      <header className="masthead">
        <span className="wordmark">DNNNAH</span>
        <nav className="language" aria-label={t.language}>
          {(['es', 'en'] as const).map(language => <button key={language} type="button" lang={language} aria-label={language === 'es' ? 'Español' : 'English'} aria-pressed={locale === language} onClick={() => setLocale(language)}>{language.toUpperCase()}</button>)}
        </nav>
      </header>
      <main id="main" tabIndex={-1}>
        <div className="introduction editorial-grid">
          <h1>{t.title}</h1><p>{t.notice}</p>
        </div>
        <div className="specimen editorial-grid">
          <h2>{t.palette}</h2>
          <div className="specimen-content palette">{colors.map(([name, hex]) => <figure className="swatch" key={name}><div className={`swatch-color bg-${name}`} style={{ backgroundColor: hex }} /><figcaption>{hex}</figcaption></figure>)}</div>
        </div>
        <div className="specimen editorial-grid">
          <h2>{t.typography}</h2>
          <div className="specimen-content">
            <p className="font-sample font-display"><strong>Space Grotesk</strong>{t.display}</p>
            <p className="font-sample font-sans"><strong>Inter</strong>{t.body}</p>
            <p className="font-sample font-mono"><strong>JetBrains Mono</strong>12 {t.columns} · 4 / 8 / 16 / 24 / 40 / 64 px</p>
          </div>
        </div>
        <div className="specimen editorial-grid">
          <h2>{t.controls}</h2>
          <div className="specimen-content">
            <div className="controls"><Button onClick={() => setActivated(true)}>{t.test}</Button><Button variant="secondary" onClick={() => setActivated(false)}>{t.reset}</Button><Button disabled>{t.disabled}</Button></div>
            <p className="status" role="status">{activated ? t.confirmation : t.instruction}</p>
          </div>
        </div>
        <div className="specimen editorial-grid">
          <h2>{t.grid}</h2><p className="specimen-content">{t.gridNote}</p>
          <div className="grid-sample editorial-grid" role="img" aria-label={t.grid}>{Array.from({ length: 12 }, (_, index) => <span key={index} aria-hidden="true">{index + 1}</span>)}</div>
        </div>
      </main>
    </div>
  </>
}
