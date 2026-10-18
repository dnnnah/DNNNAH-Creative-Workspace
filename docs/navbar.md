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

El menú hamburguesa con Lucide Menu/X es el acceso principal en todos los tamaños. El disparador solo contiene el icono y tiene aria-label localizado. El desplegable es no modal: Tab recorre el enlace y los controles sin atrapar el foco. Al abrir se enfoca hero.tsx; Escape y el botón de cierre devuelven el foco al disparador. Salir de la cabecera o pulsar fuera cierra el menú; activar hero.tsx cierra y enfoca main. Las opciones pendientes son texto con aria-disabled, sin href ni tabulación. Workspace y Terminal tienen iconos Lucide y estado Pendiente/Pending.

La cabecera usa sticky con separación superior igual al margen lateral exterior (incluye el centrado del contenedor en pantallas anchas), z-index 30, blanco #FFFFFF al 96% y separador fino. La hamburguesa conserva su posición original junto al selector de idioma. El desplegable mantiene su alineación original a la derecha en escritorio; solo en móvil (hasta 35rem) se centra respecto a la cabecera. La barra añade 12px de espacio interior a ambos lados para separar el monograma y los controles de sus bordes. El panel blanco tiene bordes cálidos, filas de 48px y foco interior para evitar recortes. El scroll interno no se propaga a la página al alcanzar sus límites. El desplegable se superpone sin desplazar el Hero y admite scroll interno en pantallas bajas. La navegación por anclas reserva la altura de la cabecera; el enlace de salto queda por encima de ella.
Marca, controles y enlace activo tienen objetivos de al menos 44px. El menú no añade animaciones; se conserva la regla global de reduced motion.

## Validación actual

- `npm run check`: typecheck, lint, 9 pruebas y build correctos.
- Pruebas: nombre accesible sin texto visible, destinos pendientes sin href, destino real, indicador activo y traducción; suite previa del Hero y mensajes intacta.
- Navegador: 1440×800, 390×844 y 320×640; sin desbordamiento horizontal, disparador 44×44.
- El offset sticky, el espacio inicial, las anclas y la altura máxima del menú comparten el margen superior adaptable.
- Enter abre y enfoca hero.tsx; Escape cierra y devuelve el foco; seleccionar cierra y enfoca main sin ocultarlo bajo la cabecera. Tab permite salir sin trampa y cierra al abandonar la cabecera.
- ES inicial y EN alternativo comprobados. Regla global de reduced motion conservada, sin cambios en Hero.
- Compilación de producción servida localmente: sin errores ni avisos de consola. Los errores transitorios de recarga en caliente durante la edición no se reproducen en producción.
- Detector de diseño: sin hallazgos.
- Capturas entregadas fuera del repositorio: escritorio, móvil, inglés y sticky.
