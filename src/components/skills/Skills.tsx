import { useState, type KeyboardEvent } from 'react'
import { ArrowDownRight, ArrowUpRight, Bot, Braces, FlaskConical, MonitorSmartphone, Network, ScanEye, Sheet } from 'lucide-react'
import type { Locale } from '../../i18n/messages'
import { categories, labels, technologies, type Category } from './content'
import './skills.css'

function ToolMark({ name, logo }: { name: string; logo?: string }) {
  if (logo) return <img src={`/skills/${logo}.svg`} alt="" width="96" height="96" loading="lazy" />
  const Icon = name === 'GPT' ? Bot : name === 'MCP / Agent skills' ? Network : name === 'Playwright' ? ScanEye : name === 'TDD / Tests' ? FlaskConical : name === 'Excel' ? Sheet : MonitorSmartphone
  return <Icon size={80} strokeWidth={1.2} aria-hidden="true" />
}

export function Skills({ locale }: { locale: Locale }) {
  const [category, setCategory] = useState<Category>('all')
  const [selected, setSelected] = useState('React')
  const es = locale === 'es'
  const visible = technologies.filter(tool => category === 'all' || tool.category === category)
  const tool = visible.find(item => item.name === selected) ?? visible[0]
  function galleryKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % visible.length
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + visible.length) % visible.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = visible.length - 1
    else return
    event.preventDefault()
    const target = visible[next]
    setSelected(target.name)
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('.skill-piece')[next]?.focus()
  }
  return <section id="skills" className="skills" aria-labelledby="skills-title" tabIndex={-1}>
    <div className="skills-filebar"><span><Braces size={18} aria-hidden="true" />skills.ts</span><span>{es ? 'El criterio antes que la herramienta' : 'Judgment before the tool'}</span></div>
    <div className="skills-opening editorial-grid">
      <h2 id="skills-title">{es ? 'Las herramientas ayudan.' : 'Tools are good.'} <br /><span>{es ? 'Pensar es mejor.' : 'Thinking is better.'}</span></h2>
      <div className="skills-aside"><ArrowDownRight size={48} strokeWidth={1} aria-hidden="true" /><p>{es ? 'Una caja de herramientas, muchas formas de resolver. Selecciona una pieza para ver cómo encaja.' : 'One toolkit, many ways to solve. Select a piece to see how it fits.'}</p></div>
    </div>
    <div className="skills-toolbar"><div className="skills-filters" role="group" aria-label={es ? 'Filtrar tecnologías' : 'Filter technologies'}>{categories.map(item => <button key={item} type="button" aria-pressed={category === item} aria-controls="skills-gallery" onClick={() => { setCategory(item); setSelected(technologies.find(tool => item === 'all' || tool.category === item)!.name) }}>{labels[locale][item]}</button>)}</div><span className="skills-count" role="status">{String(visible.length).padStart(2, '0')} {es ? 'herramientas' : 'tools'}</span></div>
    <div className="skills-workbench editorial-grid">
      <div id="skills-gallery" className="skills-gallery" role="group" aria-label={es ? 'Galería de tecnologías' : 'Technology gallery'}>{visible.map((item, index) => <button className={`skill-piece skill-piece--${index % 6}`} key={item.name} type="button" tabIndex={item.name === tool.name ? 0 : -1} aria-pressed={item.name === tool.name} aria-controls="skill-inspector" onKeyDown={event => galleryKey(event, index)} onClick={() => { setSelected(item.name); if (window.matchMedia('(max-width: 42rem)').matches) { const inspector = document.getElementById('skill-inspector'); inspector?.focus({ preventScroll: true }); inspector?.scrollIntoView({ block: 'start' }) } }}>
        <span className="skill-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><ToolMark name={item.name} logo={item.logo} /><span className="skill-name">{item.name}</span><ArrowUpRight className="skill-arrow" size={18} aria-hidden="true" />
      </button>)}</div>
      <aside tabIndex={-1} id="skill-inspector" className="skill-inspector" aria-label={es ? 'Inspector de tecnología' : 'Technology inspector'}>
        <div className="inspector-label"><span>{es ? 'Una mirada más cerca' : 'A closer look'}</span><span aria-hidden="true">↗</span></div>
        <div aria-live="polite" aria-atomic="true"><span className="inspector-category">{labels[locale][tool.category]}</span><h3>{tool.name}</h3><p>{tool.use[locale]}</p><div className="inspector-context"><span>{tool.context ? (es ? 'En práctica' : 'In practice') : (es ? 'En mi proceso' : 'In my process')}</span><strong>{tool.context ?? (es ? 'Caja de herramientas' : 'Toolkit')}</strong></div></div>
        <button className="inspector-return" type="button" onClick={() => { const selectedButton = document.querySelector<HTMLButtonElement>('.skill-piece[aria-pressed="true"]'); selectedButton?.focus(); selectedButton?.scrollIntoView({ block: 'center' }) }}>{es ? 'Volver a las herramientas ↑' : 'Back to tools ↑'}</button>
        <p className="inspector-note">{es ? 'La herramienta cambia. La intención permanece.' : 'The tool changes. The intention stays.'}</p>
      </aside>
    </div>
    <div className="skills-end"><span>{es ? 'Elegir. Construir. Comprobar.' : 'Choose. Build. Verify.'}</span><span>{es ? 'Siempre aprendiendo ↗' : 'Always learning ↗'}</span></div>
  </section>
}
