import type { Locale } from '../../i18n/messages'

type Copy = Record<Locale, string>
export type Project = { slug: string; name: string; status: Copy; summary: Copy; context: Copy; approach: Copy; limits: Copy; tools: string[] }
export const projects: Project[] = [
  {
    slug: 'protech', name: 'Protech',
    status: { es: 'Freelance · Remunerado', en: 'Freelance · Paid work' },
    summary: { es: 'Audio y accesorios para el camino.', en: 'Audio and accessories for the road.' },
    context: { es: 'Una PWA realizada como trabajo freelance remunerado para el sector de audio y accesorios automotrices.', en: 'A PWA created as paid freelance work for the automotive audio and accessories sector.' },
    approach: { es: 'React, Vite y TypeScript forman la base de la interfaz, con Tailwind para estilos. El trabajo también incluye Supabase, scripts Python y Cloudinary.', en: 'React, Vite and TypeScript form the interface foundation, with Tailwind for styling. The work also includes Supabase, Python scripts and Cloudinary.' },
    limits: { es: 'No se documentan aquí funcionalidades concretas, métricas ni estado de despliegue. La composición visual evoca el audio; no es una captura del producto.', en: 'Specific features, metrics and deployment status are not documented here. The visual composition evokes audio; it is not a product screenshot.' },
    tools: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Supabase', 'Python', 'Cloudinary'],
  },
  {
    slug: 'pawpass', name: 'PawPass',
    status: { es: 'Académico · Incompleto', en: 'Academic · Incomplete' },
    summary: { es: 'Una identidad para cada mascota.', en: 'An identity for every pet.' },
    context: { es: 'Proyecto académico en desarrollo sobre identidad digital para mascotas.', en: 'An academic project in development exploring digital identity for pets.' },
    approach: { es: 'El eje del proyecto es la identidad digital. Esta presentación se limita al concepto confirmado, sin atribuirle funciones terminadas.', en: 'Digital identity is the project’s central idea. This presentation stays with the confirmed concept, without attributing completed features to it.' },
    limits: { es: 'Trabajo incompleto. Las tecnologías y los resultados todavía no están documentados aquí. El arte es una exploración abstracta de identidad, no una interfaz funcional.', en: 'Incomplete work. Technologies and results are not documented here yet. The artwork is an abstract exploration of identity, not a working interface.' },
    tools: [],
  },
  {
    slug: 'nutria', name: 'NutrIA',
    status: { es: 'Académico · Incompleto', en: 'Academic · Incomplete' },
    summary: { es: 'La nutrición como punto de partida.', en: 'Nutrition as a starting point.' },
    context: { es: 'Una PWA de nutrición, desarrollada como proyecto académico y todavía incompleta.', en: 'A nutrition PWA developed as an academic project, still incomplete.' },
    approach: { es: 'El formato PWA y la nutrición definen el alcance conocido. El nombre del proyecto no implica funciones de IA implementadas.', en: 'The PWA format and nutrition define the known scope. The project name does not imply implemented AI features.' },
    limits: { es: 'No se presentan recomendaciones nutricionales, funciones terminadas ni resultados clínicos. La composición es abstracta y no representa una pantalla real.', en: 'No nutritional recommendations, completed features or clinical results are presented. The composition is abstract and does not depict a real screen.' },
    tools: [],
  },
  {
    slug: 'dnnnah-runtime', name: 'DNNNAH Runtime',
    status: { es: 'Portafolio anterior', en: 'Previous portfolio' },
    summary: { es: 'Otra forma de contar el código.', en: 'Another way to tell the code’s story.' },
    context: { es: 'Mi portafolio anterior, con una identidad visual inspirada en Go.', en: 'My previous portfolio, with a visual identity inspired by Go.' },
    approach: { es: 'La temática Go era el lenguaje visual del portafolio. No se asume que Go fuera su tecnología de implementación.', en: 'The Go theme was the portfolio’s visual language. Go is not assumed to have been its implementation technology.' },
    limits: { es: 'Una referencia a la etapa anterior, sin métricas ni enlaces no verificados. La composición tipográfica es una interpretación gráfica, no una captura del sitio.', en: 'A reference to the previous chapter, without metrics or unverified links. The typographic composition is a graphic interpretation, not a site screenshot.' },
    tools: [],
  },
]
export function projectFromHash(hash: string) {
  return projects.find(project => hash === `#projects/${project.slug}`)
}
