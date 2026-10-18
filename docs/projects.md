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

Los casos solo incluyen información confirmada en el encargo. No se publican enlaces externos, métricas ni funciones sin verificar. Cada figura se identifica explícitamente como composición abstracta, no como captura. Las tecnologías de Protech se documentan como conjunto, sin asignarles funciones no confirmadas. El stack de los demás casos queda sin confirmar.

Dos columnas asimétricas y escalonadas desde 353 px; una columna hasta 352 px para conservar legibilidad. Arte geométrico local, sin recursos externos ni nuevas dependencias. Los enlaces tienen área mínima de 44 px y foco visible; no se añade movimiento. La navbar sticky y el ajuste global de reduced motion se conservan.

## Verificación

`npm run check`: typecheck, ESLint sin advertencias, Vitest y build de producción.

La verificación de navegador cubrió 320, 375, 430, 768, 1280 y 1440 px, los cuatro casos en ES/EN en cada ancho, teclado, foco, menú, enlaces directos, recarga, historial, ausencia de desbordamiento horizontal y reduced motion. Las capturas y el informe JSON se entregan en la conversación.
