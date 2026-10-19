import { messages, type Locale } from '../../i18n/messages'
import { aboutCopy } from '../about/content'
import { technologies } from '../skills/content'
import { projects } from '../projects/content'
import { portfolioHistory } from './history'
import { contactLinks } from '../contact/links'
import { sectionFiles } from '../workspace/files'

export type CommandResult = { text: string; links?: { label: string; href: string }[]; navigate?: string; action?: 'clear' | 'exit' | 'matrix' | 'demolition' }
export const commands = ['help', 'ls', 'ls -la', 'pwd', 'cat <archivo>', 'open <sección>', 'skills', 'stack', 'projects', 'whoami', 'hire', 'contact', 'contact --msg', 'cv', 'git status', 'git log --oneline', 'git blame', 'easter', 'curl cheat-sheet', 'sudo make-coffee', 'sudo rm -rf /', 'matrix', 'clear', 'exit']
const routes: Record<string, string> = Object.fromEntries(sectionFiles.flatMap(file => [[file.id, file.href], [file.name, file.href]]))
const projectLinks = () => projects.map(project => ({ label: project.name, href: `#projects/${project.slug}` }))
export function completeCommand(input: string): string[] {
  const value = input.trimStart()
  const options = value.startsWith('cat ') ? sectionFiles.map(file => `cat ${file.name}`) : value.startsWith('open ') ? Object.keys(routes).map(section => `open ${section}`) : commands.filter(command => !command.includes('<'))
  return options.filter(option => option.startsWith(value))
}
// Closed vocabulary: input is compared as text, never evaluated or sent to a shell/network.
export function executeCommand(input: string, locale: Locale): CommandResult {
  const raw = input.trim()
  const value = raw.replace(/\s+/g, ' ')
  const es = locale === 'es'
  const t = messages[locale]
  const about = aboutCopy[locale]
  const skills = technologies.map(tool => `${tool.name} — ${tool.use[locale]}`).join('\n')
  const projectResult = { text: projects.map(project => `${project.name} · ${project.status[locale]}\n${project.summary[locale]}`).join('\n\n'), links: projectLinks() }
  const identity = `${t.greeting} ${t.name}\n${t.description}`
  const help = ['help', 'ls', 'cat <archivo>', 'open <sección>', 'skills / stack', 'projects', 'whoami', 'hire', 'easter', 'clear', 'exit'].map(command => command.replace('<archivo>', es ? '<archivo>' : '<file>').replace('<sección>', es ? '<sección>' : '<section>')).join('\n')
  if (value === 'curl cheat-sheet') return { text: 'sudo make-coffee · sudo rm -rf / · matrix · git blame\n' + (es ? 'Todo es una simulación. Ctrl+C cancela la escena.' : 'Everything is simulated. Ctrl+C cancels the scene.') }
  if (value === 'help') return { text: `${help}\n\n${es ? '↑/↓ historial · Tab completar · Shift+Tab cambiar foco · Escape salir' : '↑/↓ history · Tab complete · Shift+Tab move focus · Escape exit'}` }
  if (value === 'pwd') return { text: '/home/visitor/dnnnah/portfolio' }
  if (value === 'ls -la') return { text: [es ? 'Sistema de archivos virtual · permisos ilustrativos' : 'Virtual filesystem · illustrative permissions', 'drwxr-xr-x visitor dnnnah .', 'drwxr-xr-x visitor dnnnah ..', ...sectionFiles.map(file => `${file.kind === 'folder' ? 'drwxr-xr-x' : '-rw-r--r--'} visitor dnnnah ${file.name}`)].join('\n') }
  if (value === 'cv') {
    const href = contactLinks.cv.trim()
    return href ? { text: es ? 'Currículum de Donnovan.' : 'Donnovan’s résumé.', links: [{ label: es ? 'Ver CV' : 'View résumé', href }] } : { text: es ? 'El CV todavía no está disponible. Puedes usar contact para conversar conmigo.' : 'The résumé is not available yet. Use contact to get in touch.' }
  }
  if (value === 'contact') return {
    text: es ? 'Conversemos. Estos son mis canales de contacto:' : 'Let’s talk. Here are my contact channels:',
    links: [
      { label: contactLinks.email, href: `mailto:${contactLinks.email}` },
      { label: 'LinkedIn / donnovan-tc', href: contactLinks.linkedin },
      { label: 'GitHub / dnnnah', href: contactLinks.github },
    ],
  }
  if (/^contact\s+--msg(?:\s|$)/.test(raw)) return { text: '503 — dispatch failed. try the form at contact' }
  if (value === 'git log --oneline') return { text: `${es ? 'Historial del portfolio · instantánea documentada' : 'Portfolio history · documented snapshot'}\n\n${portfolioHistory.join('\n')}` }
  if (value === 'git status' || value === 'git stattus') return { text: es ? 'En la rama main\nNada para hacer commit, árbol de trabajo limpio.\n\nSimulación del portfolio; no consulta tu repositorio.' : 'On branch main\nNothing to commit, working tree clean.\n\nPortfolio simulation; does not inspect your repository.' }
  if (value === 'easter') return { text: es ? 'Pistas del Playground:\n  sudo make-coffee — café imaginario\n  sudo rm -rf / — catástrofe simulada; Ctrl+C cancela\n  matrix — sigue al conejo blanco\n  curl cheat-sheet — chuleta secreta\n\nGit (simulado):\n  git status\n  git log --oneline\n  git blame\n\nWorkspace → secret.ts · tres toques en D.\n↑ ↑ ↓ ↓ ← → ← → B A — CSS Broken (3 segundos)\nEspera sin tocar el ratón: quizá lleguen visitas.\nDevTools esconde un saludo; redimensionar también tiene premio.' : 'Playground clues:\n  sudo make-coffee — imaginary coffee\n  sudo rm -rf / — simulated catastrophe; Ctrl+C cancels\n  matrix — follow the white rabbit\n  curl cheat-sheet — secret cheat sheet\n\nGit (simulated):\n  git status\n  git log --oneline\n  git blame\n\nWorkspace → secret.ts · tap D. three times\n↑ ↑ ↓ ↓ ← → ← → B A — CSS Broken (3 seconds)\nWait without moving the mouse: visitors may arrive.\nDevTools hides a greeting; resizing has a reward too.' }
  if (value === 'ls') return { text: sectionFiles.map(file => file.name).join('  ') }
  if (value === 'whoami') return { text: identity }
  if (value === 'skills' || value === 'stack') return { text: skills }
  if (value === 'projects') return projectResult
  if (value === 'hire') return { text: es ? 'Vamos a construir algo juntos.' : 'Let’s build something together.', navigate: '#contact' }
  if (value.startsWith('cat ')) {
    const file = value.slice(4)
    if (file === 'secret.ts') return { text: es ? 'Abre Workspace → secret.ts. Pistas: curl cheat-sheet · ↑ ↑ ↓ ↓ ← → ← → B A' : 'Open Workspace → secret.ts. Clues: curl cheat-sheet · ↑ ↑ ↓ ↓ ← → ← → B A' }
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
  if (value === 'git blame') return { text: `${es ? 'Simulación de git blame · hero.tsx · líneas ilustrativas' : 'Simulated git blame · hero.tsx · illustrative lines'}\n\n00000000 (Donnovan 1) const name = "Donnovan";\n00000000 (Donnovan 2) const portfolio = {\n00000000 (Donnovan 3)   intent: "${t.principle}",\n00000000 (Donnovan 4) };` }
  if (value === 'sudo make-coffee') return { text: es ? 'Preparando café imaginario… listo. Dependencia humana satisfecha.' : 'Brewing imaginary coffee… ready. Human dependency satisfied.' }
  if (value === 'sudo rm -rf /') return { action: 'demolition', text: es ? 'El universo contiene la respiración… Operación cancelada por el sentido común. Simulación: no se ha eliminado nada.' : 'The universe holds its breath… Common sense cancelled the operation. Simulation: nothing was deleted.' }
  if (value === 'matrix') return { text: es ? 'Sigue al conejo blanco. Regresamos en 3 segundos.' : 'Follow the white rabbit. Back in 3 seconds.', action: 'matrix' }
  if (value === 'clear') return { text: es ? 'Consola limpia.' : 'Console cleared.', action: 'clear' }
  if (value === 'exit') return { text: es ? 'Hasta la próxima.' : 'See you next time.', action: 'exit' }
  return { text: es ? 'Comando desconocido. Escribe help para ver los comandos disponibles.' : 'Unknown command. Type help to see available commands.' }
}
