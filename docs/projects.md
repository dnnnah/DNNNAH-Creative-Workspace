# Projects — Editorial Playground

Galería de cuatro proyectos en `src/components/projects/`. Se conservan los tokens y las fuentes existentes. Hero, About y Skills no cambian; Navbar solo activa Projects y su estado actual.

## Rutas

- `/#projects`: galería.
- `/#projects/protech`: PWA freelance remunerada.
- `/#projects/pawpass`: identidad digital de mascotas, académico incompleto.
- `/#projects/nutria`: PWA de nutrición, académico incompleto.
- `/#projects/dnnnah-runtime`: portafolio anterior con temática Go.

Se utilizan fragmentos para soportar enlaces directos y recargas en hosting estático sin configuración adicional. Atrás/adelante funciona con el historial del navegador. Los cambios de ruta trasladan el foco al título o al destino de sección. El idioma se conserva al navegar durante la sesión; una recarga inicia en español, igual que la aplicación existente.

## Contenido y presentación

Los casos solo incluyen información confirmada en el encargo. Solo se publican las demos confirmadas por el usuario para PawPass, NutrIA y DNNNAH Runtime; Protech no ofrece enlaces externos. No se publican métricas ni funciones sin verificar. Las figuras de la galería se identifican explícitamente como composiciones abstractas, no como capturas. El caso Runtime incluye capturas reales del boceto original, con procedencia en `public/projects/runtime/SOURCES.md`. Las tecnologías de Protech se documentan como conjunto, sin asignarles funciones no confirmadas. La base React, Tailwind y TypeScript está confirmada por el usuario para los cuatro proyectos.

Dos columnas asimétricas y escalonadas desde 353 px; una columna hasta 352 px para conservar legibilidad. Arte geométrico local, sin recursos externos ni nuevas dependencias. Las tarjetas muestran el stack y un apartado nativo desplegable con contexto y acceso al caso. Los enlaces y desplegables tienen área mínima de 44 px y foco visible; no se añade movimiento. La navbar sticky y el ajuste global de reduced motion se conservan. El margen superior inicial del navbar es fijo de 20 px, independiente del ancho de pantalla.

## Verificación

`npm run check`: typecheck, ESLint sin advertencias, Vitest y build de producción.

La verificación de navegador cubrió 320, 375, 430, 768, 1280 y 1440 px, los cuatro casos en ES/EN en cada ancho, teclado, foco, menú, enlaces directos, recarga, historial, ausencia de desbordamiento horizontal y reduced motion. Las capturas y el informe JSON se entregan en la conversación.

Las demos se muestran como botones siempre visibles en galería y casos, con nombre accesible del proyecto, en la misma pestaña. GitHub está disponible para NutrIA (dnnnah/nutrIA), PawPass (dnnnah/petCarnet) y Runtime (dnnnah/dnnnah-runtime), con enlaces confirmados por el usuario. Protech no muestra enlaces externos.


## Runtime — caso narrativo

`/#projects/dnnnah-runtime` presenta una historia en español e inglés sobre la transición de un portafolio orientado a Go hacia el interés por las interfaces. Conserva la ruta existente, el foco en `case-title`, el regreso a la galería y la navegación entre casos. `Projects.tsx` carga `RuntimeCase.tsx` de forma diferida con `React.lazy` y `Suspense`; su CSS es local al caso y reutiliza las fuentes y los tokens existentes. Es una extensión del sistema actual, sin una nueva identidad global.

La narración documenta dirección visual e iteración con Claude y su agente, con intervenciones puntuales en CSS y Tailwind. Incluye la fricción del scroll horizontal, los Easter eggs y el aprendizaje de `git log --oneline` y Conventional Commits. El alcance es un experimento personal y boceto funcional; no se presentan métricas de producto ni se afirma que se publicaran allí los proyectos de backend previstos.

La captura `public/projects/runtime/profile-dark.webp` procede del sitio original del usuario, en modo oscuro, tomada el 2026-10-31. Se convirtió de PNG a WebP con calidad 88 y dimensiones 1273 × 716; no es una imagen generada por IA.

Validación de esta extensión: typecheck, lint y build aprobados; los 5 tests de Projects aprobados. La suite completa registró 47 aprobados y 3 fallos en aserciones de copy de About, Skills y Terminal sin cambios en esta tarea. La revisión visual recomendó publicar dentro del alcance comprobado: hero en escritorio y móvil; la parte inferior se revisó en código.

### Runtime: ampliación narrativa

El encabezado documenta Tipo de proyecto, Estado, Mi papel y Tecnologías en filas, con el patrón visual de Protech. Cuatro capturas reales acompañan la portada, el perfil oscuro, el tema claro y la terminal con help. Se amplía el relato sobre dirigir propuestas de IA y la elección de atmósferas visuales. GitHub confirmado: https://github.com/dnnnah/dnnnah-runtime; visible tanto en galería como en el caso ES/EN.

La terminal se presenta en modo oscuro con póster WebP. Un botón ES/EN carga una demo GIF bajo demanda (135 KiB, help → whoami); detener vuelve al póster estático. Los enlaces de demo y GitHub comparten un contenedor flex con alineación y márgenes comunes.
