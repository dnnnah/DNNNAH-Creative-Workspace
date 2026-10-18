import type { Locale } from '../../i18n/messages'
export const categories = ['all', 'frontend', 'backend', 'data', 'ai', 'workflow'] as const
export type Category = typeof categories[number]
export const labels: Record<Locale, Record<Category, string>> = {
  es: { all: 'Todo', frontend: 'Frontend', backend: 'Backend', data: 'Datos', ai: 'IA y agentes', workflow: 'Flujo de trabajo' },
  en: { all: 'All', frontend: 'Frontend', backend: 'Backend', data: 'Data', ai: 'AI & Agents', workflow: 'Workflow' },
}
type Tool = { name: string; category: Category; logo?: string; context?: string; use: Record<Locale, string> }
export const technologies: Tool[] = [
 { name: 'React', category: 'frontend', logo: 'react', context: 'Protech', use: { es: 'Interfaces organizadas en componentes para Protech. La estructura acompaña al producto.', en: 'Component-based interfaces for Protech. Structure follows the product.' } },
 { name: 'TypeScript', category: 'frontend', logo: 'typescript', context: 'Protech', use: { es: 'Tipos explícitos en Protech para expresar contratos y detectar inconsistencias durante el desarrollo.', en: 'Explicit types in Protech to express contracts and catch inconsistencies during development.' } },
 { name: 'HTML', category: 'frontend', logo: 'html5', use: { es: 'Estructura semántica para dar sentido al contenido y a la navegación.', en: 'Semantic structure that gives meaning to content and navigation.' } },
 { name: 'CSS', category: 'frontend', logo: 'css', use: { es: 'Composición, tipografía y layouts que se adaptan al espacio disponible.', en: 'Composition, typography and layouts that adapt to the available space.' } },
 { name: 'JavaScript', category: 'frontend', logo: 'javascript', use: { es: 'Interacciones, estados y lógica de interfaz.', en: 'Interactions, state and interface logic.' } },
 { name: 'Tailwind', category: 'frontend', logo: 'tailwindcss', context: 'Protech', use: { es: 'Estilos de interfaz en Protech mediante utilidades y decisiones visuales consistentes.', en: 'Interface styling in Protech through utilities and consistent visual decisions.' } },
 { name: 'Python', category: 'backend', logo: 'python', context: 'Protech', use: { es: 'Scripts de datos en Protech: automatizar tareas y transformar información.', en: 'Data scripts in Protech: automating tasks and transforming information.' } },
 { name: 'Go', category: 'backend', logo: 'go', use: { es: 'Parte de mi caja de herramientas de backend. Aquí no atribuyo un proyecto específico.', en: 'Part of my backend toolkit. No specific project is attributed here.' } },
 { name: 'PostgreSQL', category: 'data', logo: 'postgresql', use: { es: 'Datos relacionales: estructura, consultas y relaciones explícitas.', en: 'Relational data: structure, queries and explicit relationships.' } },
 { name: 'Supabase', category: 'data', logo: 'supabase', context: 'Protech', use: { es: 'Plataforma de datos utilizada en Protech, conectada con la interfaz del producto.', en: 'Data platform used in Protech, connected to the product interface.' } },
 { name: 'OpenCode', category: 'ai', logo: 'opencode', use: { es: 'Dirección de agentes: definir el objetivo, dar contexto y revisar el resultado.', en: 'Agent direction: defining the goal, providing context and reviewing the result.' } },
 { name: 'GPT', category: 'ai', use: { es: 'Modelos de IA dentro de un proceso guiado por contexto y revisión humana.', en: 'AI models within a process guided by context and human review.' } },
 { name: 'Claude', category: 'ai', logo: 'claude', use: { es: 'Asistencia de IA con instrucciones, contexto y revisión del trabajo generado.', en: 'AI assistance with instructions, context and review of generated work.' } },
 { name: 'Gemini', category: 'ai', logo: 'googlegemini', use: { es: 'Otra herramienta de IA: la elección depende del problema, no de una marca única.', en: 'Another AI tool: the choice depends on the problem, rather than a single brand.' } },
 { name: 'Ollama', category: 'ai', logo: 'ollama', use: { es: 'Modelos locales como alternativa dentro del flujo de trabajo con IA.', en: 'Local models as an alternative within the AI workflow.' } },
 { name: 'MCP / Agent skills', category: 'ai', use: { es: 'Contexto, herramientas e instrucciones reutilizables para orientar a los agentes.', en: 'Context, tools and reusable instructions to guide agents.' } },
 { name: 'Playwright', category: 'workflow', logo: 'playwright', use: { es: 'Validación de interfaces e interacciones en el navegador.', en: 'Validation of interfaces and interactions in the browser.' } },
 { name: 'TDD / Tests', category: 'workflow', use: { es: 'Definir el comportamiento esperado, comprobarlo y refinar la implementación.', en: 'Define expected behavior, verify it and refine the implementation.' } },
 { name: 'Responsive QA', category: 'workflow', use: { es: 'Revisar composición e interacción en distintos tamaños de pantalla.', en: 'Review composition and interaction at different screen sizes.' } },
 { name: 'Excel', category: 'workflow', logo: 'microsoftexcel', use: { es: 'Organizar y revisar información en hojas de cálculo.', en: 'Organize and review information in spreadsheets.' } },
]
