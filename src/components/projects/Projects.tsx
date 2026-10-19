import { ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Folder, Code2 } from 'lucide-react'
import type { Locale } from '../../i18n/messages'
import { projects, type Project } from './content'
import { ProtechCase } from './ProtechCase'
import './projects.css'

function ProjectLinks({ project, locale }: { project: Project; locale: Locale }) {
  if (!project.demo && !project.github) return null
  const es = locale === 'es'
  return <div className="project-actions">
    {project.demo && <a className="project-demo" href={project.demo} aria-label={`${es ? 'Ver demo de' : 'View demo of'} ${project.name}`}>{es ? 'Ver demo' : 'View demo'}<ArrowUpRight size={18} aria-hidden="true" /></a>}
    {project.github && <a className="project-github" href={project.github} aria-label={`${es ? 'Ver GitHub de' : 'View GitHub for'} ${project.name}`}><Code2 size={18} aria-hidden="true" />GitHub<ArrowUpRight size={18} aria-hidden="true" /></a>}
  </div>
}

function ProjectArt({ project, locale }: { project: Project; locale: Locale }) {
  return <figure className={`project-art project-art--${project.slug}`}>
    <div className="project-artwork" aria-hidden="true">
      {project.slug === 'protech' && <><div className="sound-disc" /><span className="art-word">PRO<br />TECH</span><span className="art-detail">AUDIO / AUTO</span></>}
      {project.slug === 'pawpass' && <><div className="identity-orbit" /><span className="identity-letter">p.</span><span className="art-detail">PawPass</span></>}
      {project.slug === 'nutria' && <><div className="nutrition-shape" /><span className="art-word">Nutr<span>IA</span></span><span className="art-detail">PWA</span></>}
      {project.slug === 'dnnnah-runtime' && <><span className="runtime-brace">{'{ }'}</span><span className="runtime-word">DNNNAH<br /><span>Runtime</span></span><span className="art-detail">Go / {locale === 'es' ? 'archivo visual' : 'visual archive'}</span></>}
    </div>
    <figcaption>{locale === 'es' ? 'Composición abstracta · No es una captura' : 'Abstract composition · Not a screenshot'}</figcaption>
  </figure>
}

export function Projects({ locale }: { locale: Locale }) {
  const es = locale === 'es'
  return <section id="projects" className="projects" tabIndex={-1} aria-labelledby="projects-title">
    <div className="projects-filebar"><span><Folder size={18} aria-hidden="true" />projects/</span><span>{es ? 'Trabajo seleccionado' : 'Selected work'}</span></div>
    <div className="projects-intro"><h2 id="projects-title">{es ? 'Ideas que toman' : 'Ideas taking'}<br /><span>{es ? 'forma propia.' : 'their own shape.'}</span></h2><p>{es ? 'Un encargo real, dos exploraciones académicas y una etapa anterior. Cada proyecto tiene su contexto.' : 'A real commission, two academic explorations and a previous chapter. Every project has its context.'}<ArrowDownRight size={40} strokeWidth={1} aria-hidden="true" /></p></div>
    <div className="projects-masonry">{projects.map(project => <article className={`project-entry project-entry--${project.slug}`} key={project.slug}>
      <a className="project-link" href={`#projects/${project.slug}`} aria-label={`${es ? 'Ver caso' : 'View case study'}: ${project.name}`}><ProjectArt project={project} locale={locale} /><div className="project-heading"><h3>{project.name}</h3><ArrowUpRight size={24} aria-hidden="true" /></div></a>
      <p className="project-status">{project.status[locale]}</p><p className="project-summary">{project.summary[locale]}</p>
      {project.tools.length ? <ul className="project-stack" aria-label={`${es ? 'Stack de' : 'Stack for'} ${project.name}`}>{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul> : <p className="project-stack-pending">{es ? 'Stack por confirmar' : 'Stack to be confirmed'}</p>}
      <details className="project-overview"><summary>{es ? 'Sobre el proyecto' : 'About the project'}</summary><p>{project.context[locale]}</p><a className="project-case-link" href={`#projects/${project.slug}`}>{es ? 'Leer caso de estudio' : 'Read case study'}<ArrowUpRight size={16} aria-hidden="true" /></a></details>
      <ProjectLinks project={project} locale={locale} />
    </article>)}</div>
    <p className="projects-end">{es ? 'El contexto también es parte del trabajo.' : 'Context is part of the work, too.'}</p>
  </section>
}

export function ProjectCase({ project, locale }: { project: Project; locale: Locale }) {
  if (project.slug === 'protech') return <ProtechCase locale={locale} />

  const es = locale === 'es'
  const projectIndex = projects.indexOf(project)
  const previous = projects[(projectIndex - 1 + projects.length) % projects.length]
  const next = projects[(projectIndex + 1) % projects.length]
  return <article className="project-case" aria-labelledby="case-title">
    <a className="case-back" href="#projects"><ArrowLeft size={18} aria-hidden="true" />{es ? 'Volver a proyectos' : 'Back to projects'}</a>
    <div className="case-intro"><h1 id="case-title" tabIndex={-1}>{project.name}</h1><p>{project.status[locale]}</p><p>{project.summary[locale]}</p><ProjectLinks project={project} locale={locale} /></div>
    <ProjectArt project={project} locale={locale} />
    <div className="case-copy">{[
      [es ? 'Contexto' : 'Context', project.context[locale]],
      [es ? 'Enfoque' : 'Approach', project.approach[locale]],
      [es ? 'Estado y alcance' : 'Status and scope', project.limits[locale]],
    ].map(([title, body]) => <section key={title}><h2>{title}</h2><p>{body}</p></section>)}
      <section><h2>{es ? 'Tecnologías documentadas' : 'Documented technologies'}</h2>{project.tools.length ? <ul className="case-tools">{project.tools.map(tool => <li key={tool}>{tool}</li>)}</ul> : <p>{es ? 'Sin stack confirmado para este caso.' : 'No confirmed stack for this case study.'}</p>}</section>
    </div>
    <nav className="case-navigation" aria-label={es ? 'Navegación entre casos' : 'Case study navigation'}>
      <a className="case-navigation__link case-navigation__link--previous" href={`#projects/${previous.slug}`}>
        <span className="case-navigation__direction"><ArrowLeft size={16} aria-hidden="true" />{es ? 'Caso anterior' : 'Previous case study'}</span>
        <strong>{previous.name}</strong>
      </a>
      <a className="case-navigation__link case-navigation__link--next" href={`#projects/${next.slug}`}>
        <span className="case-navigation__direction">{es ? 'Siguiente caso' : 'Next case study'}<ArrowRight size={16} aria-hidden="true" /></span>
        <strong>{next.name}</strong>
      </a>
    </nav>
  </article>
}
