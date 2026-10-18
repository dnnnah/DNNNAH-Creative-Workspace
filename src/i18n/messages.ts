export type Locale = 'es' | 'en'

export function resolveLocale(value?: string): Locale {
  return value === 'en' ? 'en' : 'es'
}

const es = {
  title: 'Verificación del sistema visual',
  notice: 'Pantalla temporal de desarrollo. Solo comprueba los fundamentos de Editorial Playground; no es una sección del portafolio.',
  skip: 'Saltar al contenido', language: 'Idioma', palette: 'Paleta', typography: 'Tipografía',
  display: 'Títulos y jerarquía editorial.', body: 'Texto de lectura e interfaz.', columns: 'columnas',
  controls: 'Botones y estados', test: 'Probar estado', reset: 'Restablecer', disabled: 'Deshabilitado',
  confirmation: 'Estado activado correctamente.', instruction: 'Usa Tab para comprobar el foco y Enter para activar.',
  grid: 'Grid de 12 columnas', gridNote: 'Estructura fluida con márgenes y separación adaptables.',
}

type Messages = { [Key in keyof typeof es]: string }
const en: Messages = {
  title: 'Visual system verification',
  notice: 'Temporary development screen. It only checks the foundations of Editorial Playground; this is not a portfolio section.',
  skip: 'Skip to content', language: 'Language', palette: 'Palette', typography: 'Typography',
  display: 'Headings and editorial hierarchy.', body: 'Reading and interface text.', columns: 'columns',
  controls: 'Buttons and states', test: 'Test state', reset: 'Reset', disabled: 'Disabled',
  confirmation: 'State activated successfully.', instruction: 'Use Tab to check focus and Enter to activate.',
  grid: '12-column grid', gridNote: 'Fluid structure with adaptable margins and spacing.',
}

export const messages: Record<Locale, Messages> = { es, en }
