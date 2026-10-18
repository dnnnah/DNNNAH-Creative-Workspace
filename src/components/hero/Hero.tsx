import { useEffect, useState } from 'react'
import { FileCode2 } from 'lucide-react'
import { messages, type Locale } from '../../i18n/messages'
import { startRotation } from './rotation'
import { Button } from '../ui/Button'

function Arrow() {
  return <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 19 19 5M5 5h14v14" /></svg>
}

export function Hero({ locale }: { locale: Locale }) {
  const t = messages[locale]
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    let stop = startRotation(t.phrases.length, setActive, media.matches || paused, active)
    const update = () => {
      stop()
      stop = startRotation(t.phrases.length, setActive, media.matches || paused, active)
    }
    media.addEventListener('change', update)
    return () => { stop(); media.removeEventListener('change', update) }
  }, [t.phrases.length, paused, active])

  return <section className="hero" aria-labelledby="hero-title">
    <div className="hero-filebar"><FileCode2 size={18} aria-hidden="true" /><span>hero.tsx</span></div>
    <div className="hero-heading editorial-grid">
      <h1 id="hero-title"><span>{t.greeting}</span><span>{t.name}</span></h1>
      <div className="hero-badges">
        <span className="badge badge--lime">Frontend Developer</span>
        <span className="badge badge--lavender">AI-Assisted Engineering</span>
      </div>
    </div>
    <div className="hero-details editorial-grid">
      <div className="phrase-stage">
        <ul className="phrase-stack" aria-label={locale === 'es' ? 'Mi enfoque' : 'My approach'}>
          {t.phrases.map((phrase, index) => <li key={index} className={index === active ? 'phrase is-active' : 'phrase'}><span>{phrase}</span></li>)}
        </ul>
        <div className="phrase-progress" role="group" aria-label={locale === 'es' ? 'Seleccionar frase' : 'Select phrase'}>{t.phrases.map((phrase, index) => <button key={index} type="button" className={index === active ? 'is-active' : ''} aria-label={`${locale === 'es' ? 'Mostrar frase' : 'Show phrase'} ${index + 1}: ${phrase}`} aria-pressed={index === active} onClick={() => setActive(index)}><span aria-hidden="true" /></button>)}</div>
        <Button variant="secondary" className="rotation-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{locale === 'es' ? (paused ? 'Reanudar frases' : 'Pausar frases') : (paused ? 'Resume phrases' : 'Pause phrases')}</Button>
      </div>
      <div className="hero-summary">
        <p>{t.description}</p>
        <div className="hero-actions">
          <a className="button" href="https://github.com/dnnnah">{t.github}<Arrow /></a>
          <a className="button source-link" href="https://github.com/dnnnah/DNNNAH-Creative-Workspace">{t.source}<Arrow /></a>
        </div>
      </div>
    </div>
    <div className="hero-foot"><span>Creative Workspace</span><span>{t.principle}</span></div>
  </section>
}
