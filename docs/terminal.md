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
- `git status`: estado del repositorio virtual; `git stattus` se acepta como alias.
- `git log --oneline`: instantánea de commits reales verificados; no ejecuta Git en el navegador.
- `git blame`: líneas ilustrativas con autor y numeración en formato Git, marcadas como simulación.
- `ls -la`: archivos y permisos ilustrativos del sistema virtual.
- `pwd`: directorio virtual `/home/visitor/dnnnah/portfolio`.
- `easter`: descubre los easter eggs.
- `cv`: muestra el enlace de CV configurado, o informa que todavía no está disponible.
- `contact`: muestra email, LinkedIn y GitHub confirmados, con enlaces utilizables y sin salir de Terminal.
- `contact --msg "texto"`: responde exactamente `503 — dispatch failed. try the form at contact` en ambos idiomas. No navega, no rellena borradores y no envía solicitudes.
- `curl cheat-sheet`, `sudo make-coffee`: chuleta local y café imaginario.
- `sudo rm -rf /`: simulación inofensiva.
- `matrix`: efecto durante tres segundos; sin animación cuando se solicita movimiento reducido.
- `clear`: limpia las respuestas, conserva el historial de comandos de la sesión.
- `exit`: cierra y restaura el foco.

## Interacción e integración

Enter ejecuta; ↑/↓ recorren el historial conservando el borrador; Tab completa una coincidencia o muestra las opciones. Tab sin coincidencias y Shift+Tab permiten recorrer controles. Escape cierra. Diálogo modal nativo, foco inicial en la entrada, restauración al botón de menú, región de respuestas anunciada y scroll interno. El input y el envío quedan fijos al pie. El idioma puede cambiar dentro de Terminal y retraduce las respuestas existentes.

Un único estado `workspace | terminal | null` en App impide abrir ambos modos simultáneamente. La navegación cierra el diálogo y enfoca la sección o caso, incluso si la ruta ya era la actual. El formulario Contact permanece montado. Contact conserva su estado independiente; no recibe borradores de Terminal. Workspace no se modifica. No incluye Command Palette. Historial y respuestas se limitan a 200 entradas; entrada a 500 caracteres. Los datos se descartan al cerrar.

## Validación reproducible

`npm run check`: typecheck, lint, todas las pruebas unitarias y build.

Con la app en `http://127.0.0.1:5179`, `npm run test:terminal` y `npm run test:workspace` ejecutan pruebas de navegador. Admiten `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH` y `PORTFOLIO_URL` para usar el navegador disponible. Terminal guarda capturas en `outputs/terminal` o en `TERMINAL_CAPTURES`.

Cobertura de Terminal: comandos y archivos, lista de rutas permitidas, entradas hostiles como texto, ausencia de solicitudes de red en simulaciones, casos de estudio reales, historial/borrador, Tab/Shift+Tab, contención/restauración del foco, Escape/exit, Matrix temporal y movimiento reducido, clear, ES/EN, exclusión de overlays, formulario preservado, scroll, controles de 44 px y anchos 320/375/768/1440. Las comprobaciones responsive se realizan en Chrome con tamaños de viewport simulados; no sustituyen una prueba en dispositivos físicos ni con lectores de pantalla.

## Ajustes de entrada y acceso rápido

La barra de entrada tiene borde lavanda de 1 px al recibir foco y margen interior, sin el outline verde que se dibujaba encima del primer carácter. Mantiene un cursor nativo fino. El guion bajo de DNNNAH parpadea cada 1,1 s y permanece visible con movimiento reducido.

La Navbar incorpora un botón visible `CMD+K` en Apple y `Ctrl+K` en los demás. El atajo usa Meta en Apple y Control en Windows/Linux; no confunde AppleWebKit de Android con una plataforma Apple. Abre Terminal también desde Workspace y mantiene la exclusión mutua. En móvil la marca se compacta a D. para conservar controles de 44 px sin solapamientos. No incluye Command Palette.

`npm run test:terminal:update` comprueba las ampliaciones, el borde, el parpadeo real y movimiento reducido, las etiquetas/atajos de Apple, Windows y Linux, el fallo 503 sin POST ni cambios en el formulario y la cabecera en 320/375/768/1440. Usa las mismas variables de entorno del resto de pruebas y guarda capturas en `outputs/terminal-update`.

## Contacto y seguimiento de secciones

Canales públicos: `dnnnah@icloud.com`, `https://www.linkedin.com/in/donnovan-tc/` y `https://github.com/dnnnah`, centralizados en `src/components/contact/links.ts`. El CV sigue pendiente de archivo o URL.

Navbar marca la sección visible al subir y bajar, recalcula tras cambios de tamaño y mantiene Projects activo en sus casos de estudio. Usa una lectura por frame de scroll y no cambia la URL ni el historial. El foco inicial del menú usa `preventScroll`.

El formulario ocupa todo el ancho de su columna y, en una columna, llega al límite derecho de la sección: se eliminó el max-width de 42rem que lo recortaba en 768–880 px.

`npm run test:navigation-contact` verifica estos comportamientos y guarda capturas en `outputs/contact-navigation`. Los clics de la prueba de scroll se hacen por coordenadas de pantalla para evitar que el desplazamiento automático de la herramienta altere la sección antes del clic.
