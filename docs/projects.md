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

Los casos solo incluyen información confirmada en el encargo. Solo se publican las demos confirmadas por el usuario para PawPass, NutrIA y DNNNAH Runtime; Protech no ofrece enlaces externos. No se publican métricas ni funciones sin verificar. Cada figura se identifica explícitamente como composición abstracta, no como captura. Las tecnologías de Protech se documentan como conjunto, sin asignarles funciones no confirmadas. La base React, Tailwind y TypeScript está confirmada por el usuario para los cuatro proyectos.

Dos columnas asimétricas y escalonadas desde 353 px; una columna hasta 352 px para conservar legibilidad. Arte geométrico local, sin recursos externos ni nuevas dependencias. Las tarjetas muestran el stack y un apartado nativo desplegable con contexto y acceso al caso. Los enlaces y desplegables tienen área mínima de 44 px y foco visible; no se añade movimiento. La navbar sticky y el ajuste global de reduced motion se conservan. El margen superior inicial del navbar es fijo de 20 px, independiente del ancho de pantalla.

## Verificación

`npm run check`: typecheck, ESLint sin advertencias, Vitest y build de producción.

La verificación de navegador cubrió 320, 375, 430, 768, 1280 y 1440 px, los cuatro casos en ES/EN en cada ancho, teclado, foco, menú, enlaces directos, recarga, historial, ausencia de desbordamiento horizontal y reduced motion. Las capturas y el informe JSON se entregan en la conversación.

Las demos se muestran como botones siempre visibles en galería y casos, con nombre accesible del proyecto, en la misma pestaña. GitHub está disponible para NutrIA (dnnnah/nutrIA) y PawPass (dnnnah/petCarnet), con enlaces confirmados por el usuario. Runtime solo muestra Demo y Protech no muestra enlaces externos.
