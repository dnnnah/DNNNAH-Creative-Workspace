import type { MouseEvent, ReactNode } from 'react'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { messages, type Locale } from '../../i18n/messages'
import { aboutCopy } from '../about/content'
import { categories, labels, technologies } from '../skills/content'
import { projects } from '../projects/content'
import { contactLinks } from '../contact/links'
import { usePlayground } from '../playground/context'
import type { WorkspaceFile } from './files'

type Props = { file: WorkspaceFile; locale: Locale; onSelect: (id: string) => void; onNavigate: (href: string) => void; onClose: () => void }
export function WorkspaceContent({ file, locale, onSelect, onNavigate, onClose }: Props) {
  const { ink, toggleInk } = usePlayground()
  const es = locale === 'es'
  const t = messages[locale]
  const about = aboutCopy[locale]
  const project = projects.find(item => item.slug === file.id)
  function link(href: string, label: ReactNode, primary = false) {
    const follow = (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
      if (href.startsWith('#')) { event.preventDefault(); onNavigate(href) }
      else onClose()
    }
    return <a className={`ws-link${primary ? ' ws-link--primary' : ''}`} href={href} onClick={follow}>{label}<ArrowUpRight size={18} aria-hidden="true" /></a>
  }
  return <article className={`ws-document ws-document--${file.id}`}>
    {file.id === 'secret' ? <>
      <h2>secret.ts</h2><p className="ws-lead">{es ? 'La curiosidad también es una herramienta.' : 'Curiosity is a tool, too.'}</p>
      <pre className="secret-code"><code>{'const portfolio = {\n  editorial: 0.75,\n  playground: 0.25,\n  curiosity: true\n}'}</code></pre>
      <p>{es ? 'Tres toques en D. revelan una nota. Aquí puedes intercambiar la lima y la lavanda: un pequeño cambio de perspectiva, sin perder el hilo.' : 'Tap D. three times to reveal a note. Here you can swap lime and lavender: a small change of perspective without losing your place.'}</p>
      <p>{es ? 'En Terminal prueba curl cheat-sheet: café, Matrix, git blame y una catástrofe de mentira. El código ↑ ↑ ↓ ↓ ← → ← → B A deja la presentación sin CSS durante tres segundos. Si esperas, quizá lleguen visitas.' : 'Try curl cheat-sheet in Terminal: coffee, Matrix, git blame and a pretend catastrophe. ↑ ↑ ↓ ↓ ← → ← → B A strips the presentation for three seconds. Wait quietly and visitors may arrive.'}</p>
      <button className="ws-link" type="button" aria-pressed={ink} onClick={toggleInk}>{es ? (ink ? 'Restaurar paleta' : 'Intercambiar acentos') : (ink ? 'Restore palette' : 'Swap accents')}</button>
    </> : file.id === 'hero' ? <>
      <div className="ws-intro"><div><h2>{t.greeting} <br /><span>{t.name}</span></h2><p className="ws-lead">{t.description}</p></div><div className="ws-monogram" aria-hidden="true">D<span>.</span></div></div>
      <div className="ws-principle"><p>{t.principle}</p><span aria-hidden="true">{'{ / }'}</span></div>
      <div className="ws-approach"><h3>{es ? 'De la lógica al detalle.' : 'From logic to detail.'}</h3><ul>{t.phrases.map(phrase => <li key={phrase}>{phrase}</li>)}</ul></div>
      <div className="ws-actions"><button className="ws-link ws-link--primary" onClick={() => onSelect('projects')}>{es ? 'Explorar projects/' : 'Explore projects/'}<ArrowRight size={18} aria-hidden="true" /></button>{link(file.href, es ? 'Ver sección original' : 'View original section')}</div>
    </> : file.id === 'about' ? <>
      <h2>{about.title}</h2><p className="ws-lead">{about.intro}</p><p>{about.bio}</p>
      <blockquote>{about.quote}</blockquote>
      <div className="ws-notes">{about.steps.map(step => <section key={step.title}><h3>{step.title}</h3><p>{step.text}</p></section>)}</div>
      <h3>{about.journey}</h3><ol className="ws-journey">{about.events.map(event => <li key={event.title}><span>{event.time} · {event.place}</span><h4>{event.title}</h4><p>{event.text}</p></li>)}</ol>
      {link(file.href, es ? 'Ver sección original' : 'View original section')}
    </> : file.id === 'skills' ? <>
      <h2>{es ? 'Una intención. Muchas herramientas.' : 'One intention. Many tools.'}</h2>
      <p className="ws-lead">{about.note}</p>
      {categories.filter(category => category !== 'all').map(category => <section className="ws-tool-group" key={category}><h3>{labels[locale][category]}</h3><dl>{technologies.filter(tool => tool.category === category).map(tool => <div key={tool.name}><dt>{tool.name}{tool.context && <span> / {tool.context}</span>}</dt><dd>{tool.use[locale]}</dd></div>)}</dl></section>)}
      {link(file.href, es ? 'Ver sección original' : 'View original section')}
    </> : file.id === 'projects' ? <>
      <h2>{es ? <>Ideas con <br /><span>forma propia.</span></> : <>Ideas with <br /><span>their own shape.</span></>}</h2>
      <p className="ws-lead">{es ? 'Un encargo real, dos exploraciones académicas y una etapa anterior. Cada proyecto tiene su contexto.' : 'A real commission, two academic explorations and a previous chapter. Every project has its context.'}</p>
      <ul className="ws-project-index">{projects.map(item => <li key={item.slug}><button onClick={() => onSelect(item.slug)}><span><strong>{item.name}</strong><span>{item.status[locale]}</span><span>{item.summary[locale]}</span></span><ArrowUpRight size={24} aria-hidden="true" /></button></li>)}</ul>
      {link(file.href, es ? 'Ver sección original' : 'View original section')}
    </> : project ? <>
      <h2>{project.name}</h2><p className="ws-project-state">{project.status[locale]}</p><p className="ws-lead">{project.summary[locale]}</p>
      <div className="ws-notes">{[[es ? 'Contexto' : 'Context', project.context[locale]], [es ? 'Enfoque' : 'Approach', project.approach[locale]], [es ? 'Estado y alcance' : 'Status and scope', project.limits[locale]]].map(([title, body]) => <section key={title}><h3>{title}</h3><p>{body}</p></section>)}</div>
      <h3>{es ? 'Tecnologías documentadas' : 'Documented technologies'}</h3><ul className="ws-stack">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul>
      <div className="ws-actions">{link(file.href, es ? 'Leer caso de estudio' : 'Read case study', true)}{project.demo && link(project.demo, es ? 'Ver demo' : 'View demo')}{project.github && link(project.github, 'GitHub')}</div>
    </> : <>
      <h2>{es ? <>¿Construimos <br />algo <span>juntos?</span></> : <>Shall we build <br />something <span>together?</span></>}</h2>
      <p className="ws-lead">{es ? 'Cuéntame qué tienes en mente. Una idea, un reto o ese detalle que todavía no encaja.' : 'Tell me what you have in mind. An idea, a challenge, or that detail that has yet to click.'}</p>
      <div className="ws-actions">{link(file.href, es ? 'Ir al formulario' : 'Go to the form', true)}{link('https://github.com/dnnnah', 'GitHub / dnnnah')}</div>
      <h3>{es ? 'Perfil y trayectoria' : 'Profile and experience'}</h3><div className="ws-resources">{[{ label: es ? 'Ver CV' : 'View résumé', href: contactLinks.cv }, { label: 'LinkedIn', href: contactLinks.linkedin }].map(item => <div key={item.label}>{item.href.trim() ? link(item.href.trim(), item.label) : <p>{item.label}<span>{es ? 'Próximamente' : 'Coming soon'}</span></p>}</div>)}</div>
      <p className="ws-contact-note">{es ? 'El formulario original muestra la disponibilidad del envío y conserva tu texto mientras exploras Workspace.' : 'The original form shows sending availability and preserves your text while you explore Workspace.'}</p>
    </>}
  </article>
}
