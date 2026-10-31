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
    context: { es: 'Proyecto académico sobre identidad digital para mascotas.', en: 'An academic project exploring digital identity for pets.' },
    approach: { es: 'Exploro cómo presentar la identidad de una mascota en una interfaz web.', en: 'I explore how to present a pet’s identity through a web interface.' },
    limits: { es: 'La base utiliza React, Tailwind y TypeScript. Los resultados todavía no están documentados.', en: 'The foundation uses React, Tailwind and TypeScript. Results are not documented yet.' },
    tools: ['React', 'Tailwind', 'TypeScript'],
  },
  {
    slug: 'nutria', name: 'NutrIA', demo: 'https://nutria-bay.vercel.app/', github: 'https://github.com/dnnnah/nutrIA',
    status: { es: 'Académico · Incompleto', en: 'Academic · Incomplete' },
    summary: { es: 'La nutrición como punto de partida.', en: 'Nutrition as a starting point.' },
    context: { es: 'Proyecto académico que explora una experiencia web de nutrición.', en: 'An academic project exploring a nutrition web experience.' },
    approach: { es: 'Trabajo la propuesta como una PWA con React, Tailwind y TypeScript.', en: 'I am developing the concept as a PWA with React, Tailwind and TypeScript.' },
    limits: { es: 'Las funciones y los resultados del proyecto todavía no están documentados en este caso.', en: 'The project’s features and results are not documented in this case study yet.' },
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
