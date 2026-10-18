import { useEffect, useRef } from 'react'
import type { Locale } from '../../i18n/messages'
type Widget = { render: (element: HTMLElement, options: Record<string, unknown>) => string; remove: (id: string) => void }
declare global { interface Window { turnstile?: Widget } }
export function Turnstile({ sitekey, locale, onToken }: { sitekey: string; locale: Locale; onToken: (token: string) => void }) {
 const container = useRef<HTMLDivElement>(null)
 useEffect(() => {
  let id: string | undefined
  const mount = () => { if (container.current && window.turnstile && !id) id = window.turnstile.render(container.current, { sitekey, action: 'contact', language: locale, size: 'compact', callback: onToken, 'expired-callback': () => onToken(''), 'error-callback': () => onToken('') }) }
  let script = document.querySelector<HTMLScriptElement>('#contact-turnstile')
  if (!script) { script = document.createElement('script'); script.id = 'contact-turnstile'; script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; script.async = true; document.head.append(script) }
  script.addEventListener('load', mount); mount()
  return () => { script?.removeEventListener('load', mount); if (id) window.turnstile?.remove(id) }
 }, [sitekey, locale, onToken])
 return <div ref={container} className="contact-challenge" />
}
