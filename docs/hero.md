# Hero DNNNAH — verificación

18 de octubre de 2026.

Se sustituye únicamente la pantalla temporal de fundamentos por el Hero. Se conservan React, TypeScript estricto, Vite, Tailwind, fuentes locales, tokens y botón reutilizable. No se agregan dependencias ni secciones adicionales.

Composición: titular amplio en dos líneas, etiquetas lima/lavanda, enfoque rotativo a la izquierda y descripción/CTAs a la derecha; apilado móvil. ES inicial y EN seleccionable con lang y título sincronizados. Descripción centrada en dirección de arquitectura y coordinación de agentes IA, sin atribuir escritura manual de todo el código. Enlaces reales al perfil y repositorio de GitHub.

Las cuatro frases cambian automáticamente cada 2500 ms; la pila reserva el alto de la frase más larga sin alturas rígidas. Cada barra es un botón accesible de 44×44 que permite elegir su frase con clic, Enter o Espacio. Al cambiar de frase, la rotación continúa desde la elegida con un nuevo intervalo; si estaba pausada, conserva la pausa. Pausa/reanudación accesible, sin Next. Con prefers-reduced-motion las cuatro frases se muestran estáticas. Se limpian temporizador y listener al desmontar.

## Comprobaciones

- Typecheck, lint sin advertencias, 5 pruebas unitarias y build: correctos.
- Prueba de rotación escrita antes de implementación: fallo observado al no avanzar; después pasa ciclo, intervalo y limpieza.
- Chrome real mediante Playwright: 320, 375, 430, 768, 1280, 1440 px, ES y EN, todas las frases y retorno al inicio. Sin desbordamiento horizontal ni superposición entre titular/etiquetas o frases/descripción.
- Pausa/reanudación, teclado, enlace de salto, cambio de idioma por teclado y movimiento reducido: correctos. Sin errores JavaScript.
- Capturas ES/EN a 375 y 1440 px; revisión visual de las capturas ES de escritorio/móvil: sin recorte visible de textos o descendentes.
- Detector Impeccable: sin hallazgos antes de añadir el control de pausa, verificado después en navegador.
- Origin coincide con https://github.com/dnnnah/DNNNAH-Creative-Workspace.git. Consulta de lectura git ls-remote exitosa; no anuncia referencias. No push ni PR.

## Límites y evidencia

La conversación recuperada no contiene una imagen completa del Hero original: la fidelidad se contrasta con los requisitos escritos, no píxel a píxel. Context7 rechazó la clave; se consultó https://react.dev/reference/react/useEffect como alternativa oficial.

Las capturas y el registro de navegador se guardan en la carpeta outputs del chat de implementación (referenced-chatgpt-conversation-this-is-an-5). El auxiliar work/verify-hero.cjs permanece fuera del commit. No se realizó una auditoría exhaustiva con lector de pantalla.
