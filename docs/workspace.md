# Workspace — exploración del portfolio

Experiencia LIGHT aprobada el 18 de octubre de 2026. Amplía Editorial Playground con un explorador de archivos, documentos de lectura, tabs seleccionables/cerrables y barra de estado. Sin edición, guardado, ejecución, terminal ni comandos simulados.

## Entrada y salida

Abrir menú → Workspace. Se usa un único estado `experience` en App, actualmente `workspace | null`, para evitar overlays paralelos. Terminal conserva su etiqueta pendiente; Command Palette no se implementa.

El diálogo nativo usa `showModal()`: el portfolio de fondo queda inerte. Al abrir se enfoca Cerrar Workspace. Tab y Shift+Tab recorren los controles del modo; Escape o el botón de cierre lo desmontan. Se restaura el foco al botón del menú, que era el control visible al abrir. El menú se cierra antes de abrir el modo. Al salir por enlaces internos se enfoca el destino real en lugar del menú. También se admite navegar al hash que ya estaba seleccionado; el historial del navegador cierra Workspace.

El bloqueo de scroll se limita a la vida del diálogo y se restaura el valor inline anterior al desmontarlo. Panel, explorador y tabs tienen scroll independiente y contenido. Los enlaces mantienen sus href reales y admiten apertura normal en otra pestaña con modificadores.

## Archivos, contenido y tabs

- `hero.tsx`: mensajes existentes del Hero, enfoque y acceso a projects/.
- `about.md`: introducción, biografía, proceso y trayectoria desde `about/content.ts`.
- `skills.ts`: categorías, tecnologías y descripciones desde `skills/content.ts`.
- `projects/`: índice de los cuatro proyectos; disclosure separado para expandir/contraer el árbol.
- Cada `<slug>.md`: contexto, enfoque, alcance, tecnologías y enlaces documentados desde `projects/content.ts`.
- `contact.tsx`: invitación a conversar, acceso al formulario real, GitHub y recursos configurables. No duplica el formulario ni afirma que el envío esté activo.

Reabrir un archivo selecciona su tab existente. Flechas izquierda/derecha, Home y End seleccionan y enfocan tabs. Cada tab tiene cierre independiente; Delete sobre el tab también lo cierra. Cerrar el activo selecciona el siguiente a su derecha o el último restante; cerrar uno inactivo conserva la selección. Al cerrar todos se muestra una vista vacía con acceso para abrir hero.tsx y se conserva el explorador. Cerrar un documento solo cambia la vista de lectura del portfolio.

El selector ES/EN del encabezado comparte el estado de idioma con el portfolio. Cambiar idioma conserva tabs, selección y árbol; también traduce el estado vacío y los nombres accesibles. Al cerrar Workspace, el portfolio conserva el idioma elegido.

## Composición y accesibilidad

Mismos tokens crema #F6F5F0, tinta #171717, lima #B8FF65 y lavanda #D9CDFF; Space Grotesk, Inter y JetBrains Mono. Jerarquía de documento editorial dentro de una estructura IDE: sidebar de archivos, tabs, ruta, lectura y estado. No se inventan biografía, funcionalidades ni métricas.

Desde 320 px: modo a pantalla completa, explorador plegable mediante Archivos, documentos en una columna y tabs con scroll horizontal. Seleccionar un archivo repliega el explorador y lleva el foco a su tab. Controles de al menos 44 × 44 px. Nombres accesibles, estado seleccionado/expandido/idioma, relaciones tab/panel y foco visible. Sin animación con reduced motion.

## Verificación reproducible

```sh
npm run check
npm run dev -- --host 127.0.0.1 --port 5179
# En otra terminal, con Playwright y Chromium disponibles:
npm run test:workspace
```

`test:workspace` necesita Playwright en el entorno; no se añade dependencia de producción ni se descarga navegador. Si está fuera del proyecto, `PLAYWRIGHT_MODULE` admite su ruta absoluta a index.mjs. `CHROMIUM_PATH` admite el ejecutable ya instalado. Variables opcionales: `PORTFOLIO_URL` (por defecto http://127.0.0.1:5179) y `WORKSPACE_CAPTURES` (por defecto work/workspace-captures).

Las pruebas de navegador recorren apertura/cierre, Escape, foco inicial/restaurado/contenido, Tab inverso, tabs con teclado, cierres activos/inactivos y último archivo, idioma dentro del modo, árbol, rutas reales y mismo hash, historial, conservación del texto de Contact, objetivos táctiles y desbordamiento a 375/320 px. Capturan desktop a 1440 × 1000 y móvil a 375/320 × 812. Se verifica reduced motion y ausencia de errores de ejecución en Chromium.

## Límites

Contact ya existía: envío desactivado por defecto y pendiente de servicios externos; CV/LinkedIn siguen pendientes de URLs. No se modifica su implementación ni se verifica entrega real. No se cambian Hero, About, Skills, Projects, Contact ni casos de estudio. Solo se integra App y el acceso de navbar, además de pruebas/configuración de pruebas y archivos nuevos de Workspace.

Las comprobaciones de navegador se realizan en Chromium local; no sustituyen pruebas manuales con lector de pantalla, Safari/Firefox o dispositivos físicos. Workspace conserva tabs durante una apertura, no entre sesiones, y no modifica la URL al seleccionar archivos internos.

Context7 devolvió clave inválida. Referencias oficiales consultadas para el ciclo de vida y el diálogo nativo: [React useEffect](https://react.dev/reference/react/useEffect) y [MDN dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog).
