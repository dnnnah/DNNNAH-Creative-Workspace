# Playground: secretos y movimiento

## Sorpresas existentes

1. Activa el monograma D. tres veces seguidas (menos de 1,8 segundos entre activaciones), con clic, Enter o Espacio. Aparece una pista durante cinco segundos, anunciada por `role="status"`.
2. Abre Menú → Workspace → secret.ts (en móvil, abre primero Archivos). El archivo tiene contenido propio ES/EN y no cambia la URL a un destino inexistente.
3. En secret.ts, activa Intercambiar acentos / Swap accents. Lima y lavanda intercambian papeles. El mismo botón restaura la paleta; fuera de Workspace también existe un control para restaurarla. El cambio es de sesión y no se guarda al recargar.

No se añadieron sorpresas adicionales. Los comandos lúdicos de Terminal y el sistema de audio se conservaron. Command Palette continúa pospuesta.

## Corrección de esta revisión

La cabecera a 320 px permitía que el control de sonido cubriera el centro del monograma, aunque ambos declararan un tamaño de 44 px. El CSS de Playground reserva ahora 44 px para el monograma y reduce espacios horizontales hasta 400 px. En ese rango el control de audio muestra el icono; conserva su nombre accesible, estado y lógica originales. No se modificaron los componentes de las secciones ni Navbar, Workspace, Terminal o el código de audio.

## Validación

- `npm run check`: typecheck, lint sin advertencias, 40 tests en 9 archivos y build correctos.
- `tests/browser/playground.mjs`: Chromium local, sin errores de página; ES/EN, descubrimiento por teclado, secret.ts, paleta reversible, Escape, audio apagado inicialmente, consentimiento persistido sin autoplay, silencio al escribir/desplazarse, almacenamiento bloqueado y AudioContext ausente.
- Responsive: 320, 375, 768, 1024 y 1440 px sin desbordamiento de página; controles principales de al menos 44 × 44 px y centros sin obstrucción.
- Movimiento reducido: 320, 375 y 1440 px; monograma sin transformación ni transición, overlay sin animación, paleta operable con Enter/Espacio, foco conservado en su botón y restaurado al menú al cerrar. Con movimiento permitido, el overlay conserva su entrada breve.
- `tests/browser/sound-feedback.mjs`: tonos diferenciados, silencio de escritura/scroll y apagado correctos.
- Detector Impeccable sobre el CSS modificado: sin hallazgos.
- Capturas revisadas: escritorio, secret.ts móvil y cabecera móvil tras el ajuste.

Los scripts de navegador admiten `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH`, `PORTFOLIO_URL` y, para capturas de Playground, `PLAYGROUND_CAPTURES`. Requieren un servidor local y un navegador instalado.

## Límites

Validado en Chromium de escritorio con tamaños de viewport móviles; no en dispositivo físico, Safari o Firefox. No se hizo una auditoría con lector de pantalla ni una medición instrumental de CLS. No se añadieron animaciones nuevas ni se alteraron las existentes.
