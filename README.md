# DNNNAH — Creative Workspace

Base técnica inicial. La pantalla actual es **temporal** y sirve exclusivamente para verificar el sistema visual. No contiene Hero, About, Skills, Projects ni Contact y no sustituye el diseño aprobado.

## Inicio

Requiere Node.js 22.12+ (verificado con 26.9) y npm. Instalar con `npm ci`; iniciar con `npm run dev`.

| Script | Función |
| --- | --- |
| `npm run dev` | Desarrollo con recarga |
| `npm run typecheck` | TypeScript estricto sin emitir archivos |
| `npm run lint` | ESLint sin advertencias permitidas |
| `npm test` | Pruebas unitarias con Vitest |
| `npm run build` | Typecheck y compilación de producción |
| `npm run preview` | Previsualización local de dist |
| `npm run check` | Todas las comprobaciones anteriores |

## Decisiones

React + TypeScript + Vite, con Tailwind mediante su plugin oficial. Las versiones instaladas quedan fijadas en package-lock.json. React y React DOM son las únicas bibliotecas de aplicación; no hay router, gestor de estado, iconos ni animaciones externas.

Fuentes variables locales mediante Fontsource: Space Grotesk para títulos, Inter para lectura y JetBrains Mono para medidas y datos. No se realizan peticiones a Google Fonts.

`src/styles/index.css` es la fuente de tokens: crema #F6F5F0, negro #171717, lima #B8FF65 y lavanda #D9CDFF; escala de espaciado de 4 px, tipografía fluida y grid editorial de 12 columnas. En móvil los bloques ocupan las 12 columnas y los márgenes/gaps se reducen. Los acentos usan texto negro para conservar contraste.

`src/components/ui/Button.tsx` conserva los atributos HTML nativos: tipo button por defecto, variantes primaria/secundaria y estados hover, active, disabled y focus-visible. Enlace de salto al contenido, áreas de interacción de al menos 44 px, anuncio de estado y respeto por prefers-reduced-motion.

`src/i18n/messages.ts` define las claves compartidas de ES/EN. Español es siempre el idioma inicial; el selector actualiza document.lang y el título. No se persiste ni infiere el idioma del navegador. Los textos son únicamente etiquetas del verificador; añadir el contenido real del portafolio cuando sea aprobado. No hay HTML inyectado ni traducciones biográficas inventadas.

## Estructura

- `src/app`: composición temporal, reemplazable al implementar las secciones aprobadas.
- `src/components/ui`: primitivas reutilizables.
- `src/styles`: tokens y fundamentos.
- `src/i18n`: mensajes tipados y resolución segura de idioma.
- `tests`: contratos de internacionalización.
- `docs/base-tecnica.md`: alcance y aceptación.

Pruebas unitarias cubren fallback de idioma, selección inglesa y paridad de diccionarios. La revisión visual debe comprobar escritorio y móvil, teclado, cambio de idioma y ausencia de desbordamiento. El verificador incluye noindex; debe revisarse al publicar el portafolio real.

Sin despliegue, push ni PR. Los commits siguen Conventional Commits con descripción en español.

Referencias: [Vite](https://vite.dev/guide/) y [Tailwind con Vite](https://tailwindcss.com/docs/installation/using-vite). Context7 no estuvo disponible por credenciales inválidas durante la preparación.
