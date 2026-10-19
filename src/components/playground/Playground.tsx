import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import type { Locale } from '../../i18n/messages'
import { PlaygroundContext } from './context'

const soundKey = 'dnnnah:sound'
export function Playground({ locale, children }: { locale: Locale; children: ReactNode }) {
  const [sound, setSound] = useState(() => {
    try { return typeof window !== 'undefined' && window.localStorage.getItem(soundKey) === 'on' } catch { return false }
  })
  const [ink, setInk] = useState(false)
  const [found, setFound] = useState(false)
  const context = useRef<AudioContext | null>(null)
  const voices = useRef(new Set<OscillatorNode>())
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const enabled = useRef(sound)
  const es = locale === 'es'
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
    void context.current?.close().catch(() => {})
  }, [])
  async function play(profile: 'general' | 'terminal' | 'workspace' = 'general') {
    if (!enabled.current || !window.AudioContext) return
    try {
      const audio = context.current ??= new AudioContext()
      if (audio.state === 'suspended') await audio.resume()
      if (!enabled.current || audio.state !== 'running') return
      const oscillator = audio.createOscillator()
      const gain = audio.createGain()
      const tone = profile === 'terminal'
        ? { type: 'square' as const, start: 880, end: 1760, volume: .003, duration: .035 }
        : profile === 'workspace'
          ? { type: 'triangle' as const, start: 1400, end: 180, volume: .009, duration: .025 }
          : { type: 'sine' as const, start: 620, end: 420, volume: .009, duration: .045 }
      const now = audio.currentTime
      oscillator.type = tone.type
      oscillator.frequency.setValueAtTime(tone.start, now)
      oscillator.frequency.exponentialRampToValueAtTime(tone.end, now + tone.duration)
      gain.gain.setValueAtTime(.0001, now)
      gain.gain.linearRampToValueAtTime(tone.volume, now + .002)
      gain.gain.exponentialRampToValueAtTime(.0001, now + tone.duration)
      oscillator.connect(gain).connect(audio.destination)
      voices.current.add(oscillator)
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); voices.current.delete(oscillator) }
      oscillator.start()
      oscillator.stop(now + tone.duration + .005)
    } catch { /* Audio is optional; unavailable devices never block an interaction. */ }
  }
  function toggleSound() {
    const next = !sound
    enabled.current = next
    setSound(next)
    try { localStorage.setItem(soundKey, next ? 'on' : 'off') } catch { /* Session control still works without storage. */ }
    if (next) void play()
    else for (const voice of voices.current) { try { voice.stop() } catch { /* Already ended. */ } }
  }
  function discover() {
    setFound(true)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setFound(false), 5000)
  }
  function interaction(event: MouseEvent<HTMLDivElement>) {
    if (!(event.target instanceof Element)) return
    const control = event.target.closest('button, a[href], [role="button"]')
    if (!control || control.matches('.sound-toggle, :disabled, [aria-disabled="true"]')) return
    if (control instanceof HTMLButtonElement && control.type === 'submit' && event.detail === 0 && document.activeElement?.matches('input, textarea')) return
    const profile = control.closest('.terminal') ? 'terminal' : control.closest('.workspace') ? 'workspace' : 'general'
    void play(profile)
  }
  return <PlaygroundContext value={{ sound, toggleSound, ink, toggleInk: () => { setInk(value => !value) }, discover }}>
    <div onClickCapture={interaction} className={ink ? 'playground is-ink' : 'playground'}>{children}
      <div className="playground-status" role="status">{found && <p>{es ? 'D. — El detalle también juega. Hay una pista en secret.ts, dentro de Workspace.' : 'D. — Details can play, too. Find a clue in secret.ts inside Workspace.'}</p>}</div>
      {ink && <button className="ink-reset" onClick={() => setInk(false)}>{es ? 'Restaurar paleta' : 'Restore palette'}</button>}
    </div>
  </PlaygroundContext>
}
