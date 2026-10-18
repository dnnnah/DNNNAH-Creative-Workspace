import { validateContact, type ContactData } from '../src/components/contact/validation'
export type ContactEnv = Partial<Record<'CONTACT_ORIGIN' | 'TURNSTILE_SECRET_KEY' | 'UPSTASH_REDIS_REST_URL' | 'UPSTASH_REDIS_REST_TOKEN' | 'RESEND_API_KEY' | 'CONTACT_FROM' | 'CONTACT_TO', string>>
const reply = (status: number, code: string) => Response.json({ code }, { status, headers: { 'Cache-Control': 'no-store', ...(status === 429 ? { 'Retry-After': '600' } : {}) } })
export async function handleContact(request: Request, env: ContactEnv, transport: typeof fetch = fetch): Promise<Response> {
 if (request.method !== 'POST') return reply(405, 'method')
 if (!env.CONTACT_ORIGIN) return reply(503, 'unavailable')
 if (request.headers.get('origin') !== env.CONTACT_ORIGIN) return reply(403, 'origin')
 if (!['CONTACT_ORIGIN', 'TURNSTILE_SECRET_KEY', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'RESEND_API_KEY', 'CONTACT_FROM', 'CONTACT_TO'].every(key => env[key as keyof ContactEnv])) return reply(503, 'unavailable')
 if (!request.headers.get('content-type')?.startsWith('application/json')) return reply(415, 'content-type')
 try {
  // Stream with a hard bound; Content-Length is controlled by the caller.
  const reader = request.body?.getReader()
  if (!reader) return reply(400, 'invalid')
  let raw = ''; let size = 0; const decoder = new TextDecoder()
  while (true) { const chunk = await reader.read(); if (chunk.done) break; size += chunk.value.byteLength; if (size > 24000) { await reader.cancel(); return reply(413, 'size') }; raw += decoder.decode(chunk.value, { stream: true }) }
  raw += decoder.decode()
  let data: ContactData & { token?: string }
  try { data = JSON.parse(raw) } catch { return reply(400, 'invalid') }
  if (Object.keys(validateContact(data)).length || typeof data?.token !== 'string' || !data.token || data.token.length > 2048) return reply(400, 'invalid')
  // Vercel overwrites this header. Do not trust arbitrary X-Forwarded-For.
  const ip = request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim()
  if (!ip) return reply(503, 'unavailable')
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip))
  const key = `contact:${Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, '0')).join('')}:${Math.floor(Date.now() / 600000)}`
  const rate = await transport(`${env.UPSTASH_REDIS_REST_URL}/multi-exec`, { method: 'POST', headers: { Authorization: `Bearer ${env.UPSTASH_REDIS_REST_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify([['INCR', key], ['EXPIRE', key, 660]]), signal: AbortSignal.timeout(8000) })
  const counts = await rate.json() as { result?: number; error?: string }[]
  if (!rate.ok || !Array.isArray(counts) || counts.some(item => item.error) || typeof counts[0]?.result !== 'number' || counts[1]?.result !== 1) return reply(503, 'unavailable')
  if (counts[0].result > 5) return reply(429, 'rate')
  const verification = await transport('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY!, response: data.token, remoteip: ip }), signal: AbortSignal.timeout(8000) })
  const challenge = await verification.json() as { success?: boolean; hostname?: string; action?: string }
  if (!verification.ok || !challenge.success || challenge.hostname !== new URL(env.CONTACT_ORIGIN!).hostname || challenge.action !== 'contact') return reply(400, 'challenge')
  const delivery = await transport('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: env.CONTACT_FROM, to: [env.CONTACT_TO], reply_to: data.email.trim(), subject: `Portfolio: ${data.subject.trim() || 'Contacto'}`, text: `Nombre: ${data.name.trim()}\nCorreo: ${data.email.trim()}\n\n${data.message.trim()}` }), signal: AbortSignal.timeout(10000) })
  const receipt = await delivery.json() as { id?: string }
  return delivery.ok && receipt.id ? reply(200, 'sent') : reply(502, 'delivery')
 } catch { return reply(503, 'unavailable') }
}
