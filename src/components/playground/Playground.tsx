import { useEffect, useRef, useState, type ReactNode } from 'react'
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
  const lastSound = useRef(0)
  const enabled = useRef(sound)
  const es = locale === 'es'
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current)
    void context.current?.close().catch(() => {})
  }, [])
  async function play() {
    if (!enabled.current || !window.AudioContext || performance.now() - lastSound.current < 100) return
    lastSound.current = performance.now()
    try {
      const audio = context.current ??= new AudioContext()
      if (audio.state === 'suspended') await audio.resume()
      if (!enabled.current || audio.state !== 'running') return
      const oscillator = audio.createOscillator()
      const gain = audio.createGain()
      oscillator.frequency.setValueAtTime(520, audio.currentTime)
      oscillator.frequency.exponentialRampToValueAtTime(360, audio.currentTime + .07)
      gain.gain.setValueAtTime(.025, audio.currentTime)
      gain.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + .09)
      oscillator.connect(gain).connect(audio.destination)
      voices.current.add(oscillator)
      oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); voices.current.delete(oscillator) }
      oscillator.start()
      oscillator.stop(audio.currentTime + .1)
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
    void play()
  }
  return <PlaygroundContext value={{ sound, toggleSound, ink, toggleInk: () => { setInk(value => !value); void play() }, discover }}>
    <div className={ink ? 'playground is-ink' : 'playground'}>{children}
      <div className="playground-status" role="status">{found && <p>{es ? 'D. — El detalle también juega. Hay una pista en secret.ts, dentro de Workspace.' : 'D. — Details can play, too. Find a clue in secret.ts inside Workspace.'}</p>}</div>
      {ink && <button className="ink-reset" onClick={() => setInk(false)}>{es ? 'Restaurar paleta' : 'Restore palette'}</button>}
    </div>
  </PlaygroundContext>
}
