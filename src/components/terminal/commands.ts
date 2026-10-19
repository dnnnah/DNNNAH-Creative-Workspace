import { messages, type Locale } from '../../i18n/messages'
import { aboutCopy } from '../about/content'
import { technologies } from '../skills/content'
import { projects } from '../projects/content'
import { sectionFiles } from '../workspace/files'

export type CommandResult = { text: string; links?: { label: string; href: string }[]; navigate?: string; action?: 'clear' | 'exit' | 'matrix' }
export const commands = ['help', 'ls', 'cat <archivo>', 'open <sección>', 'skills', 'stack', 'projects', 'whoami', 'hire', 'git blame', 'curl cheat-sheet', 'sudo make-coffee', 'sudo rm -rf /', 'matrix', 'clear', 'exit']
const routes: Record<string, string> = Object.fromEntries(sectionFiles.flatMap(file => [[file.id, file.href], [file.name, file.href]]))
const projectLinks = () => projects.map(project => ({ label: project.name, href: `#projects/${project.slug}` }))
export function completeCommand(input: string): string[] {
  const value = input.trimStart()
  const options = value.startsWith('cat ') ? sectionFiles.map(file => `cat ${file.name}`) : value.startsWith('open ') ? Object.keys(routes).map(section => `open ${section}`) : commands.filter(command => !command.includes('<'))
  return options.filter(option => option.startsWith(value))
}
// Closed vocabulary: input is compared as text, never evaluated or sent to a shell/network.
export function executeCommand(input: string, locale: Locale): CommandResult {
  const value = input.trim().replace(/\s+/g, ' ')
  const es = locale === 'es'
  const t = messages[locale]
  const about = aboutCopy[locale]
  const skills = technologies.map(tool => `${tool.name} — ${tool.use[locale]}`).join('\n')
  const projectResult = { text: projects.map(project => `${project.name} · ${project.status[locale]}\n${project.summary[locale]}`).join('\n\n'), links: projectLinks() }
  const identity = `${t.greeting} ${t.name}\n${t.description}`
  const help = commands.map(command => command.replace('<archivo>', es ? '<archivo>' : '<file>').replace('<sección>', es ? '<sección>' : '<section>')).join('\n')
  if (value === 'help' || value === 'curl cheat-sheet') return { text: `${help}\n\n${es ? '↑/↓ historial · Tab completar · Shift+Tab cambiar foco · Escape salir' : '↑/↓ history · Tab complete · Shift+Tab move focus · Escape exit'}` }
  if (value === 'ls') return { text: sectionFiles.map(file => file.name).join('  ') }
  if (value === 'whoami') return { text: identity }
  if (value === 'skills' || value === 'stack') return { text: skills }
  if (value === 'projects') return projectResult
  if (value === 'hire') return { text: es ? 'Vamos a construir algo juntos.' : 'Let’s build something together.', navigate: '#contact' }
  if (value.startsWith('cat ')) {
    const file = value.slice(4)
    if (file === 'hero.tsx') return { text: identity }
    if (file === 'about.md') return { text: `${about.intro}\n\n${about.bio}\n\n${about.quote}` }
    if (file === 'skills.ts') return { text: skills }
    if (file === 'projects/') return projectResult
    if (file === 'contact.tsx') return { text: es ? '¿Construimos algo juntos? Cuéntame qué tienes en mente.' : 'Shall we build something together? Tell me what you have in mind.', links: [{ label: es ? 'Abrir Contact' : 'Open Contact', href: '#contact' }] }
    return { text: es ? 'Archivo desconocido. Usa ls para ver los archivos disponibles.' : 'Unknown file. Use ls to see available files.' }
  }
  if (value.startsWith('open ')) {
    const href = Object.hasOwn(routes, value.slice(5)) ? routes[value.slice(5)] : undefined
    return href ? { text: es ? 'Abriendo sección…' : 'Opening section…', navigate: href } : { text: es ? 'Sección desconocida. Consulta help o ls.' : 'Unknown section. See help or ls.' }
  }
  if (value === 'git blame') return { text: es ? 'La culpa es del último punto y coma. La responsabilidad del resultado es mía.' : 'Blame the last semicolon. I still own the result.' }
  if (value === 'sudo make-coffee') return { text: es ? 'Preparando café imaginario… listo. Dependencia humana satisfecha.' : 'Brewing imaginary coffee… ready. Human dependency satisfied.' }
  if (value === 'sudo rm -rf /') return { text: es ? 'El universo contiene la respiración… Operación cancelada por el sentido común. Simulación: no se ha eliminado nada.' : 'The universe holds its breath… Common sense cancelled the operation. Simulation: nothing was deleted.' }
  if (value === 'matrix') return { text: es ? 'Sigue al conejo blanco. Regresamos en 3 segundos.' : 'Follow the white rabbit. Back in 3 seconds.', action: 'matrix' }
  if (value === 'clear') return { text: es ? 'Consola limpia.' : 'Console cleared.', action: 'clear' }
  if (value === 'exit') return { text: es ? 'Hasta la próxima.' : 'See you next time.', action: 'exit' }
  return { text: es ? 'Comando desconocido. Escribe help para ver los comandos disponibles.' : 'Unknown command. Type help to see available commands.' }
}
