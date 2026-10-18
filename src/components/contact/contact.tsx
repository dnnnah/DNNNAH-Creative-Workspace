import { useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Locale } from '../../i18n/messages'
import { validateContact, type ContactData, type Errors, type Field } from './validation'
import { Turnstile } from './Turnstile'
import './contact.css'
const empty: ContactData = { name: '', email: '', subject: '', message: '' }
export function Contact({ locale }: { locale: Locale }) {
 const es = locale === 'es'
 const [data, setData] = useState(empty)
 const [errors, setErrors] = useState<Errors>({})
 const [token, setToken] = useState('')
 const [attempt, setAttempt] = useState(0)
 const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error' | 'rate'>('idle')
 const form = useRef<HTMLFormElement>(null)
 const key = import.meta.env.VITE_TURNSTILE_SITE_KEY as string | undefined
 const enabled = import.meta.env.VITE_CONTACT_ENABLED === 'true' && !!key
 const labels = es ? { name: 'Nombre', email: 'Correo', subject: 'Asunto', message: 'Mensaje' } : { name: 'Name', email: 'Email', subject: 'Subject', message: 'Message' }
 const errorText = (field: Field) => errors[field] === 'email' ? (es ? 'Introduce un correo válido.' : 'Enter a valid email.') : errors[field] === 'length' ? (es ? 'El texto supera el límite permitido.' : 'This text exceeds the allowed length.') : (es ? 'Completa este campo.' : 'Complete this field.')
 async function submit(event: FormEvent) {
  event.preventDefault()
  if (!enabled || state === 'sending') return
  const next = validateContact(data); setErrors(next)
  const first = Object.keys(next)[0]
  if (first) { form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return }
  if (!token) { setState('error'); return }
  setState('sending')
  try {
   const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...data, token }), signal: AbortSignal.timeout(20000) })
   const result = await response.json() as { code?: string }
   if (response.ok && result.code === 'sent') { setState('sent'); setData(empty) }
   else setState(response.status === 429 ? 'rate' : 'error')
  } catch { setState('error') }
  finally { setToken(''); setAttempt(value => value + 1) }
 }
 return <>
  <section id="contact" className="contact" tabIndex={-1} aria-labelledby="contact-title">
   <div className="contact-index"><span>05 / contact.tsx</span><span>{es ? 'La siguiente idea empieza aquí' : 'The next idea starts here'}</span></div>
   <div className="contact-layout">
    <div className="contact-intro">
     <p className="contact-comment">// {es ? 'de idea a experiencia' : 'from idea to experience'}</p>
     <h2 id="contact-title">{es ? <>¿Construimos algo <span>juntos?</span></> : <>Shall we build something <span>together?</span></>}</h2>
     <p className="contact-description">{es ? 'Cuéntame qué tienes en mente. Una idea, un reto o ese detalle que todavía no encaja.' : 'Tell me what you have in mind. An idea, a challenge, or that detail that has yet to click.'}</p>
     <a className="contact-profile" href="https://github.com/dnnnah">GitHub / dnnnah <span aria-hidden="true">↗</span></a>
     <div className="contact-signature" aria-hidden="true">idea <span>→</span> {es ? 'intención' : 'intention'} <span>→</span> build</div>
    </div>
    <div className="contact-editor">
     <div className="contact-tab"><span>contact.tsx</span><span aria-hidden="true">↗</span></div>
     <form ref={form} onSubmit={submit} noValidate aria-label={es ? 'Formulario de contacto' : 'Contact form'} aria-describedby="contact-status">
      <p className="contact-code" aria-hidden="true"><span>const</span> nextProject = {'{'}</p>
      <div className="contact-fields">{(['name', 'email', 'subject', 'message'] as const).map((field, index) => <div className="contact-field" key={field}>
       <span className="contact-line" aria-hidden="true">0{index + 1}</span>
       <div><label htmlFor={`contact-${field}`}>{labels[field]} <span>{field === 'subject' ? (es ? '(opcional)' : '(optional)') : '*'}</span></label>
        {field === 'message' ? <textarea id={`contact-${field}`} name={field} value={data[field]} onChange={event => setData({ ...data, [field]: event.target.value })} rows={4} maxLength={4000} required aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined} /> : <input id={`contact-${field}`} name={field} type={field === 'email' ? 'email' : 'text'} autoComplete={field === 'name' ? 'name' : field === 'email' ? 'email' : 'off'} value={data[field]} onChange={event => setData({ ...data, [field]: event.target.value })} maxLength={field === 'name' ? 80 : field === 'email' ? 254 : 120} required={field !== 'subject'} aria-invalid={!!errors[field]} aria-describedby={errors[field] ? `${field}-error` : undefined} />}
        {errors[field] && <p className="contact-error" id={`${field}-error`}>{errorText(field)}</p>}
       </div>
      </div>)}</div>
      <p className="contact-code" aria-hidden="true">{'};'}</p>
      <p className="contact-required">{es ? '* Campos obligatorios' : '* Required fields'}</p>
      {enabled && <Turnstile key={`${locale}-${attempt}`} sitekey={key!} locale={locale} onToken={setToken} />}
      <p id="contact-status" className="contact-status" role="status" aria-live="polite">{!enabled ? (es ? 'Envío no disponible todavía. Este formulario no envía mensajes por ahora.' : 'Sending is not available yet. This form does not send messages at this time.') : state === 'sent' ? (es ? 'Mensaje enviado. Gracias por compartir tu idea.' : 'Message sent. Thanks for sharing your idea.') : state === 'rate' ? (es ? 'Demasiados intentos. Espera 10 minutos antes de volver a intentarlo.' : 'Too many attempts. Wait 10 minutes before trying again.') : state === 'error' ? (es ? 'No se confirmó el envío. Revisa la verificación y vuelve a intentarlo; tu texto sigue aquí.' : 'Sending was not confirmed. Check verification and try again; your text is still here.') : state === 'sending' ? (es ? 'Enviando mensaje…' : 'Sending message…') : (es ? 'Completa la verificación antes de enviar. Solo usaré tus datos para responder.' : 'Complete verification before sending. Your details will only be used to reply.')}</p>
      <button className="contact-submit" type="submit" disabled={!enabled || state === 'sending'}>{es ? (state === 'sending' ? 'Enviando…' : 'Enviar mensaje') : (state === 'sending' ? 'Sending…' : 'Send message')}<span aria-hidden="true">↗</span></button>
     </form>
     <div className="contact-editor-foot"><span>UTF-8</span><span>{es ? 'Una conversación, muchas posibilidades.' : 'One conversation, many possibilities.'}</span></div>
    </div>
   </div>
  </section>
  <footer className="contact-footer"><a className="contact-footer-brand" href="#main">DNNNAH<span>© {new Date().getFullYear()}</span></a><nav aria-label={es ? 'Navegación del pie' : 'Footer navigation'}><a href="#projects">projects/</a><a href="#contact">contact.tsx</a><a href="#main">hero.tsx ↑</a></nav><p>{es ? 'Intención en cada decisión.' : 'Intention in every decision.'}</p></footer>
 </>
}
