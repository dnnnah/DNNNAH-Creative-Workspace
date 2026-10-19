# Easter eggs de DNNNAH

Revisión del 18 de octubre de 2026, sobre el repositorio `referenced-chatgpt-conversation-this-is-an-2`.

## Punto de partida

Árbol limpio; HEAD inicial `3091773`. Commits recientes: `3091773` (monograma móvil), `20e94ce` (perfiles de sonido), `ad12c51` (secretos y sonido opcional), `4f7825b` (Terminal/contacto), `83898c7` (atajo Navbar).

Ya existían el monograma de tres activaciones, `secret.ts` en Workspace, intercambio reversible de acentos, sonido opcional persistido, Matrix, café, Git simulado y chuleta. `rm` era una respuesta estática. No existían Konami, cursores inactivos, saludo de consola ni detector responsive.

## Cómo descubrirlos

| Secreto | Activación y comportamiento |
| --- | --- |
| Catálogo | Terminal → `help` → `easter`. Incluye easter eggs y `git status`, `git log --oneline`, `git blame`. |
| CSS Broken | Fuera de inputs y diálogos: ↑ ↑ ↓ ↓ ← → ← → B A. Reset visual acotado durante 3 segundos, mensaje localizado y confeti discreto al restaurar. No elimina, desactiva ni inyecta hojas de estilo. El menú conserva su estado y los controles su funcionalidad. |
| Fantasmas | Escritorio con ratón: 20 segundos de inactividad, después uno nuevo cada 6 segundos hasta seis. Curioso busca controles visibles; tímido mantiene distancia; travieso, cómplice y eco orbitan con distintos desfases; guía se acerca al menú con la pista Workspace → secret.ts. Son reacciones visuales: no hacen clic, no enfocan ni modifican controles. |
| Salida de fantasmas | Actividad de ratón, teclado, scroll o foco: desvanecimiento de 500 ms y reinicio de la espera. Sin sonidos. No aparecen con touch, movimiento reducido, pestaña oculta, diálogo abierto o input activo. Contenedor fuera del árbol accesible y sin captura de eventos. |
| Consola del navegador | Al cargar: ASCII DNNNAH y HIRE ME con el correo público. Una emisión por carga incluso en StrictMode; cambiar idioma no repite el log. |
| Responsive | Cuatro cambios de anchura de al menos 8 px en 1,6 s, escritorio con ratón y anchura ≥768 px. Aviso localizado con cierre accesible y aria-live; desaparece a los 6 s. Se rearma tras 1,8 s sin redimensionar. La última petición del usuario reemplaza la restricción inicial de una vez por sesión: ahora se muestra en cada nueva ráfaga. Cambios de altura móvil no lo disparan. |
| Catástrofe | Terminal → `sudo rm -rf /`: contraseña ficticia visual, barra hasta 100%, tres líneas Deleting…, remate de broma. Botón Cancelar o Ctrl+C; Escape cierra Terminal y limpia temporizadores. Movimiento reducido: resultado inmediato. No hay campo de contraseña, shell, evaluación ni petición externa. |
| Otros comandos | `sudo make-coffee`, `matrix`, `git blame`, `curl cheat-sheet`. Siguen disponibles en autocompletado y mediante `easter`, fuera de la lista principal. |
| Archivo secreto | Menú → Workspace → secret.ts; móvil: abrir Archivos. Contenido ES/EN con pistas nuevas y paleta existente. `cat secret.ts` también indica dónde encontrarlo. |
| Monograma | Tres clics, Enter o Espacio, con menos de 1,8 s entre activaciones: pista existente al archivo secreto. Mecánica conservada. |

Sonidos: lógica existente conservada, apagados de forma predeterminada, opt-in persistido. Cursores, resize, scroll y Konami no invocan audio. Command Palette sigue pospuesta.

## Verificación

- `npm run check`: typecheck, lint sin advertencias, 45 pruebas / 11 archivos y build correctos.
- `tests/browser/easter-eggs.mjs`: consola una vez, Konami/restauración/hojas intactas/menú cerrado/confeti, repetición responsive por ráfaga, help/easter/Git, rm completo/cancelado/prompt y remate visible tras finalizar, fantasmas 1→6 y movimiento/pista/desvanecimiento, reduced-motion, touch y overflow móvil. Reloj de navegador instalado antes de cargar la app para acelerar los temporizadores reales, sin hooks de prueba en producción.
- `tests/browser/playground.mjs`: secretos existentes, audio opt-in/mute/persistencia/sin autoplay, ES/EN, teclado/foco/Escape, almacenamiento bloqueado, audio no disponible, 44px y tamaños 320–1440.
- `tests/browser/sound-feedback.mjs`: perfiles general/Terminal/Workspace, controles de secciones, silencio al escribir y scroll, mute.
- `tests/browser/terminal.mjs`: vocabulario cerrado y sin peticiones, rutas, historial, Tab, foco, Matrix, reduced-motion, clear, ES/EN, overlays, formulario y responsive.
- `tests/browser/navigation-contact.mjs`: navegación y caso de estudio, formulario, enlaces reales, comportamiento de contact, Git y layouts 320–1440.
- Detector visual mecánico: sin hallazgos. Capturas inspeccionadas de fantasmas, CSS Broken y móvil. Se corrigió la exposición accidental del menú cerrado durante el reset visual; prueba específica añadida.

Los scripts aceptan `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH`, `PORTFOLIO_URL` (o `BASE_URL` en easter-eggs) y directorios de capturas. No se añadieron dependencias.

## Límites de la evidencia

Navegador Chrome de escritorio, emulación touch y viewports móviles; sin prueba en dispositivo físico, Safari, Firefox ni lector de pantalla real. Sin medición instrumental de rendimiento. Las pruebas verifican semántica y restricciones de interacción, no equivalen a una auditoría completa de accesibilidad. Se conservaron las secciones existentes; no se afirma cobertura exhaustiva de cada ruta posible.
