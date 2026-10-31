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
    description: 'Dirijo la arquitectura y coordino agentes de IA para convertir ideas en experiencias digitales. Combino desarrollo web y diseño de interfaces.',
    github: 'Explorar mi GitHub', source: 'Ver más', principle: 'Intención en cada decisión.',
    phrases: ['Del problema al alcance.', 'De la estructura a la interfaz.', 'De la primera versión a los ajustes.'],
  },
  en: {
    title: 'Donnovan — Creative Workspace', greeting: "Hi, I'm", name: 'Donnovan.',
    skip: 'Skip to content', language: 'Language',
    description: 'I direct the architecture and coordinate AI agents to turn ideas into digital experiences. I combine web development and interface design.',
    github: 'Explore my GitHub', source: 'See more', principle: 'Intention in every decision.',
    phrases: ['From problem to scope.', 'From structure to interface.', 'From the first version to refinements.'],
  },
}
