# Base técnica DNNNAH

Alcance autorizado: React, TypeScript estricto, Vite, Tailwind, tokens Editorial Playground e internacionalización ES/EN. La única interfaz es una comprobación temporal; no representa el diseño de ninguna sección del portafolio.

Arquitectura: `src/app` compone la pantalla; `src/components/ui` contiene primitivas; `src/i18n` define idiomas y mensajes tipados; `src/styles` define tokens y fundamentos. Sin router, backend ni gestor de estado externo.

Secuencia: configurar herramientas; probar resolución de idioma; implementar diccionarios y primitivas; aplicar tokens y pantalla; ejecutar comprobaciones y revisar escritorio/móvil; crear un único commit local si pasan.

Aceptación: ES inicial y EN seleccionable, atributo lang sincronizado, botones nativos y foco visible, grid de 12 columnas sin desbordamiento móvil, fuentes locales, movimiento reducido, typecheck/lint/test/build correctos. No push, PR ni contenido biográfico inventado.
