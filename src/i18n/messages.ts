export type Locale = 'es' | 'en'
export function resolveLocale(value?: string): Locale {
  return value === 'en' ? 'en' : 'es'
}

type Messages = {
  title: string; greeting: string; name: string; skip: string; language: string;
  description: string; github: string; source: string; principle: string;
  phrases: readonly string[];
}
export const messages: Record<Locale, Messages> = {
  es: {
    title: 'Donnovan — Creative Workspace', greeting: 'Hola, soy', name: 'Donnovan.',
    skip: 'Saltar al contenido', language: 'Idioma',
    description: 'Dirijo la arquitectura y coordino agentes de IA para convertir ideas en experiencias digitales. De la lógica al detalle, respondo por la calidad del resultado.',
    github: 'Explorar mi GitHub', source: 'Ver más', principle: 'Intención en cada decisión.',
    phrases: ['Diseño la lógica.', 'Dirijo la creación.', 'Respondo por el resultado.', 'Creo experiencias digitales con intención.'],
  },
  en: {
    title: 'Donnovan — Creative Workspace', greeting: "Hi, I'm", name: 'Donnovan.',
    skip: 'Skip to content', language: 'Language',
    description: 'I direct the architecture and coordinate AI agents to turn ideas into digital experiences. From the logic to the details, I own the quality of the result.',
    github: 'Explore my GitHub', source: 'See more', principle: 'Intention in every decision.',
    phrases: ['I design the logic.', 'I direct the build.', 'I own the result.', 'Building digital experiences with intention.'],
  },
}
