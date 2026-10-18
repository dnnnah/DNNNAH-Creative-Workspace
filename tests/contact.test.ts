import { describe, expect, it } from 'vitest'
import { validateContact } from '../src/components/contact/validation'
import { handleContact } from '../server/contact'
const valid = { name: 'Ana', email: 'ana@example.com', subject: '', message: 'Quiero construir un proyecto contigo.' }
describe('validación de contacto', () => {
 it('rechaza campos vacíos y correo inválido', () => { expect(validateContact({ ...valid, name: ' ', email: 'oops', message: '' })).toEqual({ name: 'required', email: 'email', message: 'required' }) })
 it('admite asunto opcional y rechaza límites y tipos', () => { expect(validateContact(valid)).toEqual({}); expect(validateContact({ ...valid, subject: 'x'.repeat(121) })).toEqual({ subject: 'length' }); expect(validateContact(null)).toHaveProperty('name') })
})
describe('endpoint de contacto', () => {
 const request = (body: unknown, origin = 'https://portfolio.example') => new Request('https://portfolio.example/api/contact', { method: 'POST', headers: { origin, 'content-type': 'application/json' }, body: JSON.stringify(body) })
 it('falla cerrado sin configuración', async () => { expect((await handleContact(request(valid), {})).status).toBe(503) })
 it('rechaza otro origen antes de contactar proveedores', async () => { expect((await handleContact(request(valid, 'https://evil.example'), { CONTACT_ORIGIN: 'https://portfolio.example' })).status).toBe(403) })
 it('rechaza métodos distintos de POST', async () => { expect((await handleContact(new Request('https://portfolio.example/api/contact'), {})).status).toBe(405) })
})

describe('protecciones y confirmación del servidor', () => {
 const env = { CONTACT_ORIGIN: 'https://portfolio.example', TURNSTILE_SECRET_KEY: 'test-secret', UPSTASH_REDIS_REST_URL: 'https://redis.example', UPSTASH_REDIS_REST_TOKEN: 'test-token', RESEND_API_KEY: 'test-key', CONTACT_FROM: 'sender@example.com', CONTACT_TO: 'private@example.com' }
 const request = (data: unknown) => new Request('https://portfolio.example/api/contact', { method: 'POST', headers: { origin: env.CONTACT_ORIGIN, 'content-type': 'application/json', 'x-vercel-forwarded-for': '192.0.2.1' }, body: JSON.stringify(data) })
 // Only external network boundaries are replaced; actual handler and validation execute.
 function network(count = 1, challenge = true, delivery = true): typeof fetch {
  return async (url, init) => {
   if (String(url).includes('redis.example')) return Response.json([{ result: count }, { result: 1 }])
   if (String(url).includes('siteverify')) return Response.json({ success: challenge, hostname: 'portfolio.example', action: 'contact' })
   if (String(url).includes('resend.com')) {
    const payload = JSON.parse(String(init?.body))
    expect(payload.to).toEqual(['private@example.com'])
    expect(payload.reply_to).toBe('ana@example.com')
    expect(payload.text).toContain('Quiero construir un proyecto contigo.')
    return Response.json(delivery ? { id: 'email-accepted' } : { error: 'provider' }, { status: delivery ? 200 : 500 })
   }
   throw new Error('unexpected network call')
  }
 }
 it('rechaza datos inválidos antes de llamar servicios externos', async () => { expect((await handleContact(request({ ...valid, token: 'token', email: 'bad' }), env, async () => { throw new Error('network forbidden') })).status).toBe(400) })
 it('limita intentos con contador persistente', async () => { expect((await handleContact(request({ ...valid, token: 'token' }), env, network(6))).status).toBe(429) })
 it('rechaza Turnstile inválido', async () => { expect((await handleContact(request({ ...valid, token: 'token' }), env, network(1, false))).status).toBe(400) })
 it('solo confirma con recibo real del proveedor', async () => { const response = await handleContact(request({ ...valid, token: 'token' }), env, network()); expect(response.status).toBe(200); expect(await response.json()).toEqual({ code: 'sent' }) })
 it('no simula éxito si falla entrega', async () => { expect((await handleContact(request({ ...valid, token: 'token' }), env, network(1, true, false))).status).toBe(502) })
 it('falla cerrado si el limitador no responde', async () => { expect((await handleContact(request({ ...valid, token: 'token' }), env, async () => { throw new Error('offline') })).status).toBe(503) })
 it('rechaza cuerpos excesivos', async () => { expect((await handleContact(request({ ...valid, message: 'x'.repeat(25000), token: 'token' }), env)).status).toBe(413) })
 it('rechaza JSON mal formado', async () => { const req = new Request('https://portfolio.example/api/contact', { method: 'POST', headers: { origin: env.CONTACT_ORIGIN, 'content-type': 'application/json' }, body: '{' }); expect((await handleContact(req, env)).status).toBe(400) })
})
