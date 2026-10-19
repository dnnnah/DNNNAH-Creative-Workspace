import { useEffect, useState } from 'react'
import { MousePointer2, X } from 'lucide-react'
import type { Locale } from '../../i18n/messages'
import { isRapidResize, type ResizeSample } from './gesture-detectors'
import { useFastScroll } from './useFastScroll'
import { ghostCount, ghostPersonalities, ghostPosition } from './ghost-cursors'
let consolePrinted = false
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
export function EasterEggs({ locale }: { locale: Locale }) {
  const es = locale === 'es'
  const { fastScroll, dismissFastScroll } = useFastScroll()
  const [broken, setBroken] = useState(false)
  const [confetti, setConfetti] = useState(false)
  const [responsive, setResponsive] = useState(false)
  const [ghostLeaving, setGhostLeaving] = useState(false)
  const [ghosts, setGhosts] = useState<{ x: number; y: number }[]>([])
  useEffect(() => {
    if (!consolePrinted) {
      consolePrinted = true
      console.info('%cDDD  N   N N   N N   N  AAA  H   H\nD  D NN  N NN  N NN  N A   A H   H\nD  D N N N N N N N N N AAAAA HHHHH\nDDD  N  NN N  NN N  NN A   A H   H\n\nHIRE ME → dnnnah@icloud.com\n¿Inspeccionando? Hablemos. / Inspecting? Let’s talk.', 'font-family:monospace;font-weight:bold;color:#66509b;font-size:14px')
    }
    let index = 0
    let restore: ReturnType<typeof setTimeout>
    let celebration: ReturnType<typeof setTimeout>
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const reset = () => {
      document.documentElement.classList.remove('css-broken')
      setBroken(false)
    }
    const keyboard = (event: KeyboardEvent) => {
      if (event.repeat || event.isComposing || event.ctrlKey || event.metaKey || event.altKey || (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"], dialog'))) { index = 0; return }
      const key = event.key.length === 1 ? event.key.toLowerCase() : event.key
      index = key === konami[index] ? index + 1 : key === konami[0] ? 1 : 0
      if (index !== konami.length || document.documentElement.classList.contains('css-broken')) return
      index = 0
      document.documentElement.classList.add('css-broken')
      setBroken(true)
      restore = setTimeout(() => {
        reset()
        if (!motion.matches) { setConfetti(true); celebration = setTimeout(() => setConfetti(false), 900) }
      }, 3000)
    }
    window.addEventListener('keydown', keyboard)
    return () => { window.removeEventListener('keydown', keyboard); clearTimeout(restore); clearTimeout(celebration); document.documentElement.classList.remove('css-broken') }
  }, [])
  useEffect(() => {
    const pointer = matchMedia('(hover: hover) and (pointer: fine)')
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    let lastActivity = Date.now()
    let tick = 0
    let visible = false
    let fade: ReturnType<typeof setTimeout>
    const activity = () => {
      lastActivity = Date.now()
      if (!visible) return
      visible = false
      setGhostLeaving(true)
      clearTimeout(fade)
      fade = setTimeout(() => { setGhosts([]); setGhostLeaving(false) }, motion.matches || document.hidden ? 0 : 500)
    }
    const events = ['pointermove', 'pointerdown', 'keydown', 'scroll', 'focusin', 'touchstart'] as const
    events.forEach(event => window.addEventListener(event, activity, { passive: true }))
    document.addEventListener('visibilitychange', activity)
    motion.addEventListener('change', activity)
    pointer.addEventListener('change', activity)
    const timer = setInterval(() => {
      if (!pointer.matches || motion.matches || document.hidden || document.querySelector('dialog[open]') || document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')) { activity(); return }
      const count = ghostCount(Date.now() - lastActivity)
      if (!count) return
      const controls = [...document.querySelectorAll<HTMLElement>('.menu-toggle, .brand-egg, main a, main button')].filter(el => {
        const box = el.getBoundingClientRect()
        return box.width && box.top > 0 && box.bottom < innerHeight
      })
      const target = controls[Math.floor(tick / 8) % Math.max(1, controls.length)]?.getBoundingClientRect()
      const point = target ? { x: target.x + target.width / 2, y: target.y + target.height / 2 } : { x: innerWidth / 2, y: innerHeight / 2 }
      tick++
      visible = true
      setGhostLeaving(false)
      const guide = document.querySelector('.menu-toggle')?.getBoundingClientRect()
      setGhosts(Array.from({ length: count }, (_, index) => ghostPosition(index, tick, index === 4 && guide ? { x: guide.x, y: guide.bottom + 25 } : point, innerWidth, innerHeight)))
    }, 750)
    return () => { clearInterval(timer); clearTimeout(fade); events.forEach(event => window.removeEventListener(event, activity)); document.removeEventListener('visibilitychange', activity); motion.removeEventListener('change', activity); pointer.removeEventListener('change', activity) }
  }, [])
  useEffect(() => {
    let triggered = false
    let quiet: ReturnType<typeof setTimeout>
    let dismiss: ReturnType<typeof setTimeout>
    let previousWidth = innerWidth
    let changes: ResizeSample[] = []
    const resize = () => {
      const width = innerWidth
      const delta = Math.abs(width - previousWidth)
      previousWidth = width
      clearTimeout(quiet)
      quiet = setTimeout(() => { triggered = false; changes = [] }, 1800)
      if (triggered || width < 768 || !matchMedia('(hover: hover) and (pointer: fine)').matches || delta < 16) return
      const now = Date.now()
      changes = [...changes.filter(sample => now - sample.time <= 3000), { time: now, width }]
      if (!isRapidResize(changes)) return
      triggered = true
      clearTimeout(dismiss)
      dismiss = setTimeout(() => setResponsive(false), 6000)
      setResponsive(true)
    }
    window.addEventListener('resize', resize)
    return () => { window.removeEventListener('resize', resize); clearTimeout(quiet); clearTimeout(dismiss) }
  }, [])
  return <>
    <div className="egg-status" role="status">{broken && <p>{es ? '¡Oh no, se cayó el stylesheet!' : 'Oh no, the stylesheet fell over!'}<br /><small>{es ? 'Vuelve en 3 segundos.' : 'Back in 3 seconds.'}</small></p>}</div>
    {(responsive || fastScroll) && <aside className="responsive-toast"><p role="status">{fastScroll ? (es ? '¿Buscando el final o probando la velocidad de la luz?' : 'Looking for the end or testing the speed of light?') : es ? '¿Probando el responsive? Yo también muevo la ventana así. Todo encaja.' : 'Testing responsive? I resize like that too. Everything fits.'}</p><button type="button" onClick={() => { setResponsive(false); dismissFastScroll() }} aria-label={fastScroll ? (es ? 'Cerrar aviso de scroll' : 'Dismiss scroll notice') : es ? 'Cerrar aviso responsive' : 'Dismiss responsive notice'}><X size={18} aria-hidden="true" /></button></aside>}
    <div className={`ghost-layer${ghostLeaving ? ' is-leaving' : ''}`} aria-hidden="true">{ghosts.map((point, index) => <div className={`ghost ghost--${ghostPersonalities[index]}`} key={index} style={{ transform: `translate(${point.x}px, ${point.y}px)` }}><MousePointer2 size={20} /><span>{index === 4 ? (es ? 'psst… Workspace → secret.ts' : 'psst… Workspace → secret.ts') : es ? ['¿qué hace esto?', 'con permiso…', '¡te sigo!', 'por aquí', '', 'yo también'][index] : ['what does this do?', 'excuse me…', 'following you!', 'this way', '', 'me too'][index]}</span></div>)}</div>
    {confetti && <div className="egg-confetti" aria-hidden="true">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ left: `${36 + i * 2.5}%`, animationDelay: `${i % 3 * .04}s` }} />)}</div>}
  </>
}
