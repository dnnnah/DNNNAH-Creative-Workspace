# Contact — implementación y activación

Se amplía el portafolio existente con cierre editorial asimétrico: titular protagonista, acento lavanda y formulario semántico inspirado en un editor. Colores y fuentes existentes. Sin cambios en Hero, About, Skills ni Projects. Navbar sticky conserva su comportamiento; contact.tsx ahora apunta a #contact. Footer compacto. GitHub es el único perfil profesional confirmado.

## Estado actual

**No operativo por defecto.** No se encontraron configuración de hosting ni credenciales. No se envía correo en Vite ni en una publicación estática de dist. Los campos permiten redactar, el aviso explica el estado y el botón está desactivado. No hay correo personal en el cliente. No se han creado cuentas, servicios ni despliegues.

`api/contact.ts` es un adaptador preparado para **Vercel Functions con Web Handler**, una opción pendiente de confirmar, no evidencia del hosting real. `server/contact.ts` es independiente del adaptador salvo la obtención de IP confiable de Vercel. Para otro hosting hay que adaptar esa fuente de IP a una cabecera que sobrescriba el proveedor, nunca aceptar X-Forwarded-For arbitrario. Nunca publicar dist como si incluyera el endpoint.

## Activación en Vercel (cuando se confirme ese destino)

1. Configurar proyecto Vite con build `npm run build`, salida `dist` y función `/api/contact`. Verificar que la función se empaqueta; no configurar una reescritura SPA que la oculte. Hash routing no requiere fallback de rutas.
2. Crear Turnstile con dominios permitidos. Añadir sitekey pública a `VITE_TURNSTILE_SITE_KEY` y secreto privado a `TURNSTILE_SECRET_KEY`. El widget usa action `contact`; servidor valida success, hostname exacto y action. Los tokens caducan o se consumen y el widget se renueva tras cada intento.
3. Crear Redis Upstash con REST habilitado y guardar URL/token en variables privadas. Se ejecuta transacción INCR + EXPIRE: 5 solicitudes por IP en ventana fija de 10 minutos. Puede haber hasta 10 alrededor del límite de ventana. Claves IP con hash SHA-256, TTL 660 segundos; no es anonimización absoluta. Falla cerrado si Redis falla. Revisar límites globales/costos en hosting antes de abrir tráfico público.
4. Configurar Resend con dominio remitente verificado y permiso de envío. Guardar `RESEND_API_KEY`, `CONTACT_FROM` y `CONTACT_TO` únicamente en servidor. El destinatario nunca viene del cliente. Texto plano, reply_to validado; no HTML del usuario ni datos de formulario en logs.
5. `CONTACT_ORIGIN`: origen HTTPS canónico exacto, sin barra final (ej. el dominio que se confirme). Previews necesitan su propio origen y hostname autorizado. El servidor rechaza cualquier otro Origin.
6. Mantener `VITE_CONTACT_ENABLED=false` hasta comprobar en entorno de pruebas: envío recibido, respuesta no exitosa ante token inválido, 429 al sexto intento, fallo cerrado con Redis caído y correo no expuesto en assets. Después activar `VITE_CONTACT_ENABLED=true` y reconstruir. La sitekey es pública; ningún otro secreto debe llevar prefijo VITE_.
7. Prueba real de extremo a extremo pendiente: requiere hosting, credenciales y destinatario autorizados. Las pruebas locales sustituyen solo proveedores externos y no prueban entrega real.

## Comportamiento

Nombre 80, correo 254, asunto opcional 120, mensaje 4000 caracteres. Validación cliente y servidor, cuerpo limitado a 24 KB, solo POST JSON, origen exacto, rate limit persistente, Turnstile servidor y timeouts. Sin credenciales o IP de confianza devuelve 503; origen 403; formato 400/415; tamaño 413; exceso 429; proveedor fallido 502. Solo 200 + recibo de Resend produce confirmación (aceptación por el proveedor, no garantía de llegada al buzón). Ante error conserva el texto. No reintenta envíos automáticamente; una respuesta perdida puede requerir comprobar el buzón antes de reenviar.

Labels visibles, autocomplete, required, aria-invalid, errores asociados, foco en primer error y estado anunciado. ES/EN con datos conservados al cambiar idioma. El estilo no añade movimiento; respeta reduced motion global. Enlaces/controles principales con área mínima 44 px. Sin Workspace, Terminal ni command palette nuevos.

## Fuentes consultadas

Context7 se intentó y devolvió clave inválida; alternativa oficial:
- [Vercel Web Handlers](https://vercel.com/docs/functions/functions-api-reference)
- [Turnstile servidor](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/)
- [Turnstile widget](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/)
- [Upstash REST transactions](https://upstash.com/docs/redis/features/restapi)
- [Resend API](https://resend.com/docs/api-reference/emails/send-email)

## Coherencia visual

Revisión contra `src/styles/index.css`, About, Skills y Projects, y capturas ES de Contact a 1440 y 375 px. Contact reutiliza los cuatro tokens de color existentes (crema, tinta, lima y lavanda) y las familias Space Grotesk para títulos, Inter para cuerpo/campos y JetBrains Mono para etiquetas y metadatos. La barra de archivo y los separadores continúan el lenguaje de las secciones existentes. La composición editorial usa columnas 1:1.1 en escritorio y una columna por debajo de 55 rem; ambas capturas muestran el formulario y su aviso de envío inactivo legibles.

El editor introduce una sombra sólida lavanda de 8 px (4 px en pantallas estrechas), sin animaciones ni transiciones nuevas. Su superficie blanca prolonga un uso ya presente en navegación y enlaces; los grises auxiliares y el rojo de error son valores locales de estados, sin redefinir los tokens globales. El sistema previo ya combina esquinas rectas con radios en navegación/filtros y colores auxiliares locales en Projects: esa variación preexistente no se normaliza en esta extensión. Se conserva el foco y la preferencia de movimiento reducido globales. No se detectaron bloqueadores de coherencia visual en esta revisión; las capturas no verifican estados de error ni entrega de correo.

## CV y LinkedIn

Los apartados están visibles bajo «Perfil y trayectoria» (ES) / «Profile and experience» (EN). Mientras no tengan ruta muestran «Próximamente» / «Coming soon» sin enlace ficticio. GitHub conserva su destino confirmado.

Para activarlos, editar `src/components/contact/links.ts`: `cv` admite una ruta pública al PDF (guardar en `public/cv.pdf` y escribir `/cv.pdf`) o una URL HTTPS; `linkedin` admite la URL completa del perfil. Guardar y reconstruir. No introducir rutas locales del ordenador, que no son accesibles al visitante. El CV se abre como documento; no se fuerza descarga.
