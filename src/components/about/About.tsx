import { ArrowUpRight, FileText, Asterisk, CircleHelp, RotateCcw } from 'lucide-react'
import type { Locale } from '../../i18n/messages'
import { aboutCopy } from './content'
import { Journey } from './Journey'
import './about.css'

export function About({ locale }: { locale: Locale }) {
  const t = aboutCopy[locale]
  return <section id="about" className="about" aria-labelledby="about-title" tabIndex={-1}>
    <div className="about-filebar"><span><FileText size={18} aria-hidden="true" />about.md</span><span>{locale === 'es' ? 'Persona detrás del proceso' : 'Person behind the process'}<ArrowUpRight size={16} aria-hidden="true" /></span></div>
    <div className="about-opening editorial-grid">
      <h2 id="about-title">{locale === 'es' ? <>Más que <br />solo <span>código.</span></> : <>More than <br />just <span>code.</span></>}</h2>
      <figure className="about-portrait" aria-label={t.portrait}>
        <div className="portrait-composition" aria-hidden="true"><div className="portrait-orbit" /><div className="portrait-stem" /><div className="portrait-bowl" /><Asterisk className="portrait-star" strokeWidth={1.2} /><span className="portrait-dot" /></div>
        <figcaption>{locale === 'es' ? 'D. / en construcción continua' : 'D. / a continuous work in progress'}</figcaption>
      </figure>
      <p className="about-intro">{t.intro}</p>
      <div className="about-bio"><p>{t.bio}</p><p className="about-note">{t.note}</p></div>
    </div>
    <Journey locale={locale} />
    <div className="thinking" aria-labelledby="thinking-title">
      <div className="thinking-heading"><h3 id="thinking-title">{t.thinkTitle}</h3><p>{t.quote}</p></div>
      <div className="thinking-grid editorial-grid">{t.steps.map((step, index) => { const Mark = [CircleHelp, ArrowUpRight, RotateCcw][index]; return <article key={step.title} className={`thinking-step thinking-step--${index}`}>
        <span className="thinking-word">{step.word}</span><h4>{step.title}</h4><p>{step.text}</p>
        <Mark className="thinking-mark" size={32} strokeWidth={1.5} aria-hidden="true" />
      </article>})}</div>
    </div>
    <div className="about-end"><span>{locale === 'es' ? 'Aprender. Dirigir. Volver a mirar.' : 'Learn. Direct. Look again.'}</span><Asterisk size={24} aria-hidden="true" /></div>
  </section>
}
