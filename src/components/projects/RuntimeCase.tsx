import { ArrowLeft, ArrowRight, ArrowUpRight, Code2 } from 'lucide-react'
import { useState } from 'react'
import type { Locale } from '../../i18n/messages'
import './runtime-case.css'

const copy = {
  es: {
    back: 'Volver a proyectos', archive: 'Experimento personal · Memoria de una transición',
    title: 'Quería mostrar mi backend. Descubrí mi lugar en la interfaz.',
    lead: 'Empecé DNNNAH Runtime para presentarme como desarrollador de Go. Mientras lo construía, me di cuenta de que estaba más emocionado por diseñar el portafolio que por hacer los proyectos que iba a mostrar en él.',
    demo: 'Ver demo', role: 'Mi papel', roleBody: 'Dirección visual y desarrollo con Claude; iteración de diseño, componentes e interacciones.',
    kind: 'Tipo de proyecto', kindBody: 'Personal · Exploración de diseño y desarrollo',
    heroCaption: 'Así me presentaba: Backend Engineer · Automation Enthusiast · Go Developer. La interfaz acabaría llevándome en otra dirección.',
    themeTitle: 'Dos atmósferas para la misma identidad.',
    themeBody: 'El modo oscuro se acercaba a un editor de código: violeta, carbón y acentos de sintaxis. El claro recuperaba el celeste del universo de Go. Elegir cómo debía sentirse cada uno era parte de lo que me tenía atrapado: ya estaba pensando en la experiencia mucho más allá del contenido que debía publicar.',
    dark: 'Modo oscuro · Un entorno de código', light: 'Modo claro · El guiño a Go',
    terminalCaption: 'La terminal del boceto en modo oscuro. Reproduce la demo para ver help y whoami en acción.',
    processTitle: 'Aprender a pedir también era aprender a diseñar.',
    processBody: 'Trabajar con un agente me obligó a convertir una sensación —«todavía parece una plantilla»— en una dirección que pudiera comunicar. Cada propuesta me ayudaba a reconocer qué quería conservar, qué no encajaba y dónde faltaba personalidad. Conforme aclaraba lo que quería mostrar, también entendía mejor qué me interesaba del frontend.',
    state: 'Estado', stateBody: 'Experimento · Boceto funcional', stack: 'Tecnologías',
    originTitle: 'Buscaba orden. Encontré Go.',
    origin: ['Al empezar a tomarme en serio la programación, el backend compilado me atraía por su estructura. Go tenía la sobriedad que buscaba: una sintaxis directa, tipado estático y una forma clara de pensar en servicios, APIs y datos.', 'Quería que mi primer portafolio profesional expresara esa afinidad. Uní DNNNAH, mi identificador habitual en videojuegos, con la idea de un entorno de ejecución. Runtime empezó como una manera de presentarme desde el mundo que entonces quería habitar.'],
    visualTitle: 'Presentarme como código fuente.',
    visual: 'La metáfora de Go salió de los bloques de código y organizó la interfaz: el perfil como struct, la navegación entre tipos, la tipografía monoespaciada y los colores de sintaxis. Quería que recorrer el sitio se sintiera como explorar un pequeño entorno propio.',
    imageAlt: 'Captura del portafolio Runtime en modo oscuro: navegación lateral entre tipos de Go y perfil presentado como código con colores de sintaxis.',
    caption: 'Captura del boceto original · La identidad y el contenido pertenecen a esa etapa experimental.',
    aiTitle: 'La IA proponía. Yo buscaba el sazón.',
    ai: ['Trabajé directamente con Claude y su agente de construcción. La IA participó en las propuestas visuales, los componentes y las animaciones. Sus primeras soluciones se veían bien, pero seguían pareciéndome una plantilla: les faltaba algo que yo reconociera como mío.', 'Siempre me habían atraído los portafolios y case studies que muestran la personalidad detrás del código. Fui guiando las propuestas, precisando lo que quería y revisando cada cambio hasta acercarlo a mi gusto. También intervine en CSS y Tailwind en algunos momentos; el proceso tuvo mucho más de dirigir e iterar con la IA que de escribir cada estilo a mano.'],
    aiNote: 'Aprendí a expresar una intención, sostenerla entre cambios y comprobar si el resultado seguía siendo coherente con ella.',
    playTitle: 'Quería que alguien tuviera ganas de explorar.',
    play: 'Los Easter eggs daban espacio a esa parte lúdica: una secuencia Konami que descubría al Gopher, cursores fantasma, una respuesta al scroll acelerado y una terminal para navegar con comandos. Me interesaba lo que podía pasar entre una persona y la pantalla.',
    scrollTitle: 'El scroll que se resistía.',
    scroll: ['El desplazamiento horizontal de proyectos con GSAP fue una de las fricciones más persistentes. Coordinar el movimiento, los contenedores y los distintos anchos de pantalla exigió varias correcciones. El historial conserva incluso el cambio de GSAP a un carrusel en móvil.', 'El resultado quedó imperfecto. Aun así, me descubrí volviendo a él porque me importaba cómo se sentía recorrerlo. Estaba invirtiendo más atención e imaginación en esa experiencia que en los servicios que debía presentar.'],
    quote: 'Estaba más emocionado por diseñar el portafolio que por hacer mis proyectos.',
    turningTitle: 'Lo que quería compartir tenía una interfaz.',
    turning: ['Hacer funcionar una API me daba satisfacción técnica. Construir Runtime añadía algo que me estaba faltando: podía mostrarlo, alguien podía explorarlo y yo podía observar cómo respondía a lo que había creado.', 'Me entusiasmaba generar algo propio, capaz de expresar mi personalidad y de hacer sentir algo a otra persona. El portafolio me ayudó a reconocer que quería trabajar en ese punto de contacto entre el software y quienes lo usan.'],
    learningTitle: 'También aprendí a sostener un proyecto.',
    gitTitle: 'Un historial que ya importaba',
    git: 'Antes hacía pequeños commits, de vez en cuando. Runtime fue mi primer proyecto de una escala mayor: empecé a consultar git log y su vista --oneline para seguir los cambios. También descubrí los Conventional Commits, aunque llegaron cuando buena parte del proyecto ya estaba hecha.',
    agentTitle: 'Dirigir sin perder el hilo',
    agent: 'Con Claude aprendí a coordinar diseño y código dentro de una conversación que crecía. Tuve que ser más preciso con lo que quería, recuperar el contexto y evaluar si una propuesta resolvía mi intención. Aprender a trabajar con la IA fue parte del proyecto.',
    closeTitle: 'Un sueño efímero que dejó huella.',
    close: ['Runtime se quedó como un experimento, un boceto funcional. Dediqué tanta energía al lugar donde iba a mostrar mi trabajo que los proyectos de backend que debían llenarlo no llegaron a publicarse allí.', 'Hoy lo veo como una memoria de ese cambio. La estructura que me atrajo de Go sigue en mi forma de pensar, y la curiosidad por las interfaces con personalidad sigue en lo que construyo. Runtime me ayudó a descubrir que quería crear experiencias que otras personas pudieran usar, entender y sentir.'],
    prev: 'Caso anterior', next: 'Siguiente caso',
  },
  en: {
    back: 'Back to projects', archive: 'Personal experiment · A record of a transition',
    title: 'I set out to show my backend work. I found my place in the interface.',
    lead: 'I started DNNNAH Runtime to introduce myself as a Go developer. As I built it, I realized I was more excited about designing the portfolio than building the projects I planned to put inside it.',
    demo: 'View demo', role: 'My role', roleBody: 'Visual direction and development with Claude; iterating on design, components and interactions.',
    kind: 'Project type', kindBody: 'Personal · Design and development exploration',
    heroCaption: 'How I introduced myself: Backend Engineer · Automation Enthusiast · Go Developer. The interface would lead me somewhere else.',
    themeTitle: 'Two atmospheres for the same identity.',
    themeBody: 'Dark mode felt closer to a code editor: violet, charcoal and syntax accents. Light mode brought back the blue associated with Go. Deciding how each should feel was part of what kept me engaged: I was already thinking about the experience far beyond the content I needed to publish.',
    dark: 'Dark mode · A coding environment', light: 'Light mode · A nod to Go',
    terminalCaption: 'The sketch’s terminal in dark mode. Play the demo to see help and whoami in action.',
    processTitle: 'Learning to ask was also learning to design.',
    processBody: 'Working with an agent made me turn a feeling—“it still looks like a template”—into a direction I could communicate. Each proposal helped me recognize what I wanted to keep, what did not fit and where personality was missing. As I clarified what I wanted to show, I also understood more about what interested me in frontend.',
    state: 'Status', stateBody: 'Experiment · Functional sketch', stack: 'Technologies',
    originTitle: 'I was looking for structure. I found Go.',
    origin: ['When I began taking programming seriously, compiled backend development appealed to me for its structure. Go offered the simplicity I wanted: direct syntax, static typing and a clear way to think about services, APIs and data.', 'I wanted my first professional portfolio to express that affinity. I combined DNNNAH, my usual gaming handle, with the idea of a runtime environment. It became a way to introduce myself through the world I wanted to work in at the time.'],
    visualTitle: 'Introducing myself as source code.',
    visual: 'The Go metaphor extended beyond code blocks and organized the interface: a profile as a struct, navigation between types, monospace typography and syntax colors. I wanted exploring the site to feel like entering a small environment of my own.',
    imageAlt: 'Capture of Runtime in dark mode: sidebar navigation between Go types and a profile presented as syntax-highlighted code.',
    caption: 'Capture of the original sketch · Its identity and content reflect that experimental stage.',
    aiTitle: 'AI made proposals. I looked for personality.',
    ai: ['I worked directly with Claude and its build agent. AI contributed visual proposals, components and animations. Its first solutions looked good, but they still felt like a template: something I could recognize as my own was missing.', 'I had always enjoyed portfolios and case studies that reveal the personality behind the code. I guided the proposals, clarified my intentions and reviewed changes until they felt closer to my taste. I also adjusted CSS and Tailwind at times; much of the process involved directing and iterating with AI.'],
    aiNote: 'I learned to express an intention, maintain it through changes and check whether the result still made sense as a whole.',
    playTitle: 'I wanted people to feel like exploring.',
    play: 'Easter eggs made room for play: a Konami sequence that revealed the Gopher, ghost cursors, a reaction to rapid scrolling and a terminal for command navigation. I was interested in what could happen between a person and the screen.',
    scrollTitle: 'The scroll that fought back.',
    scroll: ['Horizontal project scrolling with GSAP was a persistent source of friction. Coordinating movement, containers and different screen widths took several corrections. The history even records replacing GSAP with a carousel on mobile.', 'The result remained imperfect. Yet I kept coming back because I cared about how it felt to explore. I was putting more attention and imagination into that experience than into the services it was meant to present.'],
    quote: 'I was more excited about designing the portfolio than building my projects.',
    turningTitle: 'What I wanted to share had an interface.',
    turning: ['Making an API work gave me technical satisfaction. Building Runtime added something I had been missing: I could show it, someone could explore it, and I could watch how they responded to what I had created.', 'I was excited to make something personal that could express my personality and make someone feel something. The portfolio helped me recognize that I wanted to work where software meets the people using it.'],
    learningTitle: 'I also learned to keep a project going.',
    gitTitle: 'A history that mattered',
    git: 'Previously, I made small commits every now and then. Runtime was my first larger project: I started using git log and its --oneline view to follow changes. I also discovered Conventional Commits, although much of the project was already built by then.',
    agentTitle: 'Directing without losing the thread',
    agent: 'With Claude, I learned to coordinate design and code inside a growing conversation. I had to be more precise, recover context and judge whether a proposal served my intention. Learning to work with AI became part of the project.',
    closeTitle: 'A fleeting dream that left a mark.',
    close: ['Runtime remained an experiment, a functional sketch. I invested so much energy in the place where I would show my work that the backend projects meant to fill it never made it there.', 'Today I see it as a record of that change. The structure that drew me to Go remains in how I think, and my curiosity about interfaces with personality remains in what I build. Runtime helped me discover that I wanted to create experiences other people could use, understand and feel.'],
    prev: 'Previous case study', next: 'Next case study',
  },
}

export function RuntimeCase({ locale }: { locale: Locale }) {
  const t = copy[locale]
  const [playing, setPlaying] = useState(false)
  return <article className="project-case runtime-case" aria-labelledby="case-title">
    <a className="case-back" href="#projects"><ArrowLeft size={18} aria-hidden="true" />{t.back}</a>
    <div className="runtime-filebar"><span>DNNNAH Runtime</span><span>{t.archive}</span></div>
    <header className="runtime-hero">
      <h1 id="case-title" tabIndex={-1}>{t.title}</h1>
      <div className="runtime-hero__context"><p>{t.lead}</p><div className="runtime-hero__actions"><a className="project-demo" href="https://dnnnah-runtime.vercel.app/" aria-label={`${t.demo}: DNNNAH Runtime`}>{t.demo}<ArrowUpRight size={18} aria-hidden="true" /></a><a className="project-github" href="https://github.com/dnnnah/dnnnah-runtime" aria-label="GitHub: DNNNAH Runtime"><Code2 size={18} aria-hidden="true" />GitHub<ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
    </header>
    <dl className="runtime-meta">
      <div><dt>{t.kind}</dt><dd>{t.kindBody}</dd></div>
      <div><dt>{t.state}</dt><dd>{t.stateBody}</dd></div>
      <div><dt>{t.role}</dt><dd>{t.roleBody}</dd></div>
      <div><dt>{t.stack}</dt><dd>Next.js · React · TypeScript · Tailwind CSS · GSAP · Vercel</dd></div>
    </dl>
    <figure className="runtime-opening-image"><img src="/projects/runtime/hero.webp" alt="DNNNAH Runtime — Backend Engineer · Automation Enthusiast · Go Developer" width="1273" height="716" /><figcaption>{t.heroCaption}</figcaption></figure>
    <section className="runtime-chapter"><h2>{t.originTitle}</h2><div>{t.origin.map(p => <p key={p}>{p}</p>)}</div></section>
    <section className="runtime-identity"><div className="runtime-chapter"><h2>{t.visualTitle}</h2><p>{t.visual}</p></div>
      <figure><img src="/projects/runtime/profile-dark.webp" alt={t.imageAlt} width="1273" height="716" loading="lazy" /><figcaption>{t.caption}</figcaption></figure>
    </section>
    <section className="runtime-themes"><div className="runtime-chapter"><h2>{t.themeTitle}</h2><p>{t.themeBody}</p></div><div className="runtime-theme-pair">{[["profile-light",t.light]].map(([file,label]) => <figure key={file}><img src={`/projects/runtime/${file}.webp`} alt={`${label} — DNNNAH Runtime`} width="1273" height="716" loading="lazy" /><figcaption>{label}</figcaption></figure>)}</div></section>
    <section className="runtime-chapter runtime-ai"><h2>{t.aiTitle}</h2><div>{t.ai.map(p => <p key={p}>{p}</p>)}<p className="runtime-ai__note">{t.aiNote}</p></div></section>
    <section className="runtime-chapter"><h2>{t.processTitle}</h2><p>{t.processBody}</p></section>
    <section className="runtime-chapter"><h2>{t.playTitle}</h2><p>{t.play}</p></section>
    <figure className="runtime-terminal-image"><img src={playing ? "/projects/runtime/terminal-demo.gif" : "/projects/runtime/terminal.webp"} alt={locale === "es" ? "Terminal interactiva de Runtime mostrando los comandos disponibles con help" : "Runtime interactive terminal showing available commands with help"} width="696" height="536" loading="lazy" /><figcaption><span>{t.terminalCaption}</span><button type="button" className="runtime-demo-toggle" aria-pressed={playing} onClick={() => setPlaying(value => !value)}>{playing ? (locale === "es" ? "Detener demo" : "Stop demo") : (locale === "es" ? "Reproducir demo" : "Play demo")}</button></figcaption></figure>
    <section className="runtime-chapter"><h2>{t.scrollTitle}</h2><div>{t.scroll.map(p => <p key={p}>{p}</p>)}</div></section>
    <blockquote className="runtime-realization"><p>{t.quote}</p></blockquote>
    <section className="runtime-chapter"><h2>{t.turningTitle}</h2><div>{t.turning.map(p => <p key={p}>{p}</p>)}</div></section>
    <section className="runtime-learning"><h2>{t.learningTitle}</h2><div><section><h3>{t.gitTitle}</h3><p>{t.git}</p><code>git log --oneline</code></section><section><h3>{t.agentTitle}</h3><p>{t.agent}</p></section></div></section>
    <section className="runtime-chapter runtime-close"><h2>{t.closeTitle}</h2><div>{t.close.map(p => <p key={p}>{p}</p>)}</div></section>
    <nav className="case-navigation" aria-label={locale === 'es' ? 'Navegación entre casos' : 'Case study navigation'}>
      <a className="case-navigation__link case-navigation__link--previous" href="#projects/nutria"><span className="case-navigation__direction"><ArrowLeft size={16} aria-hidden="true" />{t.prev}</span><strong>NutrIA</strong></a>
      <a className="case-navigation__link case-navigation__link--next" href="#projects/protech"><span className="case-navigation__direction">{t.next}<ArrowRight size={16} aria-hidden="true" /></span><strong>Protech</strong></a>
    </nav>
  </article>
}
