import { useEffect, useState } from 'react'
import { isFastScroll, type ScrollSample } from './fast-scroll'

export function useFastScroll() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    let samples: ScrollSample[] = []
    let intent = -Infinity
    let triggered = false
    let quiet: ReturnType<typeof setTimeout>
    let dismiss: ReturnType<typeof setTimeout>
    const input = (event: Event) => {
      if (event instanceof KeyboardEvent && !['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' '].includes(event.key)) return
      if (document.querySelector('dialog[open]') || document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')) return
      intent = performance.now()
      if (!samples.length) samples.push({ time: intent, y: scrollY })
    }
    const scroll = () => {
      const now = performance.now()
      clearTimeout(quiet)
      quiet = setTimeout(() => { triggered = false; samples = [] }, 1500)
      if (triggered || document.hidden || now - intent > 250 || document.querySelector('dialog[open]')) { samples = []; return }
      samples = [...samples.filter(sample => now - sample.time <= 2600), { time: now, y: scrollY }]
      if (!isFastScroll(samples, innerHeight)) return
      triggered = true
      samples = []
      setVisible(true)
      clearTimeout(dismiss)
      dismiss = setTimeout(() => setVisible(false), 4500)
    }
    const events = ['wheel', 'touchmove', 'keydown'] as const
    events.forEach(event => window.addEventListener(event, input, { passive: true }))
    window.addEventListener('scroll', scroll, { passive: true })
    return () => {
      events.forEach(event => window.removeEventListener(event, input))
      window.removeEventListener('scroll', scroll)
      clearTimeout(quiet); clearTimeout(dismiss)
    }
  }, [])
  return { fastScroll: visible, dismissFastScroll: () => setVisible(false) }
}
