# Navbar

La navbar extiende la cabecera existente con la identidad Editorial Playground. El Hero y sus estilos no se modifican. Español inicial e inglés alternativo desde el selector compartido.

## Etiquetas y destinos progresivos

Las etiquetas son nombres visuales, no archivos que deban crearse. Se prioriza `hero.tsx` por la petición actual sobre la convención anterior `home.tsx` y el ejemplo `hero.txs`.

| Etiqueta | Destino previsto | Estado actual |
| --- | --- | --- |
| hero.tsx | #main (Hero existente) | Enlace activo |
| about.md | #about | Próximamente, sin href |
| skills.ts | #skills | Próximamente, sin href |
| projects/ | #projects | Próximamente, sin href |
| contact.tsx | #contact | Próximamente, sin href |

Al implementar cada sección, añadir su id real y sustituir el elemento pendiente por un enlace. Actualizar entonces el indicador de página/sección actual. No habilitar enlaces antes de existir sus destinos.

## Interacción

Desde 70rem la navegación es horizontal. Bajo ese ancho, el botón abre una lista en el flujo de la página. No es un diálogo modal: Tab recorre los enlaces y controles sin atrapar el foco. Al abrir se enfoca hero.tsx; Escape y el botón de cierre devuelven el foco al disparador. Salir de la cabecera cierra el menú; activar hero.tsx enfoca main. El cambio a escritorio restablece el estado del menú. Las opciones pendientes son texto con aria-disabled, no controles muertos en el orden de tabulación.

Marca, controles y enlace activo tienen objetivos de al menos 44px. El menú no añade animaciones; se conserva la regla global de reduced motion.

## Validación

- npm run check: typecheck, lint, 7 pruebas y build correctos.
- Pruebas nuevas: destinos pendientes sin href, destino existente, indicador actual y traducción del menú.
- Navegador Chrome: 320, 390, 768, 1119 y 1440px; apertura por Enter, Escape, foco, enlace al contenido, ES/EN, sin desbordamientos ni errores JavaScript; reduced motion activado durante las comprobaciones funcionales.
- Capturas revisadas de escritorio y móvil, menú cerrado/abierto e inglés.
- Detector de diseño: sin hallazgos.
