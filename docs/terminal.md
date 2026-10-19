# Terminal v0.2

Consola de portfolio simulada, ES/EN y sin ejecución de shell, evaluación dinámica ni peticiones de comandos. La entrada se compara con un vocabulario cerrado y React escapa el texto. `sudo rm -rf /` solo devuelve una respuesta teatral: no tiene acción, ruta ni efecto sobre archivos.

## Comandos

- `help`: lista completa y atajos de teclado.
- `ls`: `hero.tsx`, `about.md`, `skills.ts`, `projects/`, `contact.tsx`.
- `cat <archivo>`: lectura simulada con contenido de las secciones existentes.
- `open <sección>`: navega a `#main`, `#about`, `#skills`, `#projects` o `#contact`; acepta nombres de sección o archivo.
- `skills` / `stack`: tecnologías y usos documentados.
- `projects`: contexto y enlaces a los cuatro casos de estudio internos existentes; no añade demos ni repos externos.
- `whoami`: presentación de Donnovan.
- `hire`: abre Contact.
- `git blame`, `curl cheat-sheet`, `sudo make-coffee`: guiños y chuleta local.
- `sudo rm -rf /`: simulación inofensiva.
- `matrix`: efecto durante tres segundos; sin animación cuando se solicita movimiento reducido.
- `clear`: limpia las respuestas, conserva el historial de comandos de la sesión.
- `exit`: cierra y restaura el foco.

## Interacción e integración

Enter ejecuta; ↑/↓ recorren el historial conservando el borrador; Tab completa una coincidencia o muestra las opciones. Tab sin coincidencias y Shift+Tab permiten recorrer controles. Escape cierra. Diálogo modal nativo, foco inicial en la entrada, restauración al botón de menú, región de respuestas anunciada y scroll interno. El input y el envío quedan fijos al pie. El idioma puede cambiar dentro de Terminal y retraduce las respuestas existentes.

Un único estado `workspace | terminal | null` en App impide abrir ambos modos simultáneamente. La navegación cierra el diálogo y enfoca la sección o caso, incluso si la ruta ya era la actual. El formulario Contact permanece montado. No se modifica ninguna sección ni Workspace. No incluye Command Palette. Historial y respuestas se limitan a 200 entradas; entrada a 500 caracteres. Los datos se descartan al cerrar.

## Validación reproducible

`npm run check`: typecheck, lint, todas las pruebas unitarias y build.

Con la app en `http://127.0.0.1:5179`, `npm run test:terminal` y `npm run test:workspace` ejecutan pruebas de navegador. Admiten `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH` y `PORTFOLIO_URL` para usar el navegador disponible. Terminal guarda capturas en `outputs/terminal` o en `TERMINAL_CAPTURES`.

Cobertura de Terminal: comandos y archivos, lista de rutas permitidas, entradas hostiles como texto, ausencia de solicitudes de red en simulaciones, casos de estudio reales, historial/borrador, Tab/Shift+Tab, contención/restauración del foco, Escape/exit, Matrix temporal y movimiento reducido, clear, ES/EN, exclusión de overlays, formulario preservado, scroll, controles de 44 px y anchos 320/375/768/1440. Las comprobaciones responsive se realizan en Chrome con tamaños de viewport simulados; no sustituyen una prueba en dispositivos físicos ni con lectores de pantalla.
