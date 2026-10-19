import type { Locale } from '../../i18n/messages'

type Copy = Record<Locale, string>
export type Project = { slug: string; name: string; status: Copy; summary: Copy; context: Copy; approach: Copy; limits: Copy; tools: string[]; demo?: string; github?: string }
export const projects: Project[] = [
  {
    slug: 'protech', name: 'Protech',
    status: { es: 'Freelance · Remunerado', en: 'Freelance · Paid work' },
    summary: { es: 'Un catálogo digital para encontrar flyers, precios y existencias de audio y accesorios automotrices.', en: 'A digital catalog for finding flyers, pricing and stock across automotive audio and accessories.' },
    context: { es: 'Los flyers, precios y existencias estaban repartidos entre carpetas de Google Drive, listas y conversaciones de WhatsApp. El equipo necesitaba reunirlos en una herramienta ágil para consultar productos y preparar solicitudes.', en: 'Flyers, prices and stock were spread across Google Drive folders, price lists and WhatsApp conversations. The team needed one fast way to find products and prepare order requests.' },
    approach: { es: 'Empezó como un catálogo y evolucionó a una PWA con búsqueda, filtros, precios por categoría, existencias y cotizaciones en PDF. La experiencia se adaptó a clientes, vendedores y administración.', en: 'It began as a catalog and grew into a PWA with search, filters, category pricing, stock visibility and PDF quotes. The experience serves customers, sellers and administrators.' },
    limits: { es: 'El PDF facilita enviar la solicitud al área de pedidos por WhatsApp; no confirma por sí solo una compra. Las cifras de ahorro son reportes de vendedores, no analítica instrumentada.', en: 'The PDF makes it easier to send a request to the order team over WhatsApp; it does not confirm a purchase by itself. Time savings are seller reports, not instrumented analytics.' },
    tools: ['React', 'Vite', 'TypeScript', 'Tailwind', 'Supabase', 'Python', 'Cloudinary'],
  },
  {
    slug: 'pawpass', name: 'PawPass', demo: 'https://pet-carnet.vercel.app/', github: 'https://github.com/dnnnah/petCarnet',
    status: { es: 'Académico · Incompleto', en: 'Academic · Incomplete' },
    summary: { es: 'Una identidad para cada mascota.', en: 'An identity for every pet.' },
    context: { es: 'Proyecto académico en desarrollo sobre identidad digital para mascotas.', en: 'An academic project in development exploring digital identity for pets.' },
    approach: { es: 'El eje del proyecto es la identidad digital. Esta presentación se limita al concepto confirmado, sin atribuirle funciones terminadas.', en: 'Digital identity is the project’s central idea. This presentation stays with the confirmed concept, without attributing completed features to it.' },
    limits: { es: 'Trabajo incompleto. La base utiliza React, Tailwind y TypeScript; los resultados todavía no están documentados aquí. El arte es una exploración abstracta de identidad, no una interfaz funcional.', en: 'Incomplete work. The foundation uses React, Tailwind and TypeScript; results are not documented here yet. The artwork is an abstract exploration of identity, not a working interface.' },
    tools: ['React', 'Tailwind', 'TypeScript'],
  },
  {
    slug: 'nutria', name: 'NutrIA', demo: 'https://nutria-bay.vercel.app/', github: 'https://github.com/dnnnah/nutrIA',
    status: { es: 'Académico · Incompleto', en: 'Academic · Incomplete' },
    summary: { es: 'La nutrición como punto de partida.', en: 'Nutrition as a starting point.' },
    context: { es: 'Una PWA de nutrición, desarrollada como proyecto académico y todavía incompleta.', en: 'A nutrition PWA developed as an academic project, still incomplete.' },
    approach: { es: 'El formato PWA y la nutrición definen el alcance conocido. El nombre del proyecto no implica funciones de IA implementadas.', en: 'The PWA format and nutrition define the known scope. The project name does not imply implemented AI features.' },
    limits: { es: 'No se presentan recomendaciones nutricionales, funciones terminadas ni resultados clínicos. La composición es abstracta y no representa una pantalla real.', en: 'No nutritional recommendations, completed features or clinical results are presented. The composition is abstract and does not depict a real screen.' },
    tools: ['React', 'Tailwind', 'TypeScript'],
  },
  {
    slug: 'dnnnah-runtime', name: 'DNNNAH Runtime', demo: 'https://dnnnah-runtime.vercel.app/',
    status: { es: 'Portafolio anterior', en: 'Previous portfolio' },
    summary: { es: 'Otra forma de contar el código.', en: 'Another way to tell the code’s story.' },
    context: { es: 'Mi portafolio anterior, con una identidad visual inspirada en Go.', en: 'My previous portfolio, with a visual identity inspired by Go.' },
    approach: { es: 'La temática Go era el lenguaje visual del portafolio. No se asume que Go fuera su tecnología de implementación.', en: 'The Go theme was the portfolio’s visual language. Go is not assumed to have been its implementation technology.' },
    limits: { es: 'Una referencia a la etapa anterior, sin métricas ni enlaces no verificados. La composición tipográfica es una interpretación gráfica, no una captura del sitio.', en: 'A reference to the previous chapter, without metrics or unverified links. The typographic composition is a graphic interpretation, not a site screenshot.' },
    tools: ['React', 'Tailwind', 'TypeScript'],
  },
]
export function projectFromHash(hash: string) {
  return projects.find(project => hash === `#projects/${project.slug}`)
}
