import { useEffect, useState } from 'react'
import type { Locale } from '../../i18n/messages'

// Entirely local theatre. No credential field, shell, network or filesystem access.
export function Demolition({ locale, onDone }: { locale: Locale; onDone: () => void }) {
  const [progress, setProgress] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches ? 100 : 0)
  const [cancelled, setCancelled] = useState(false)
  const es = locale === 'es'
  useEffect(() => {
    if (progress === 100 || cancelled) { onDone(); return }
    const timer = setTimeout(() => setProgress(value => Math.min(100, value + 10)), 220)
    return () => clearTimeout(timer)
  }, [progress, cancelled, onDone])
  useEffect(() => {
    const cancel = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key.toLowerCase() === 'c') { event.preventDefault(); setCancelled(true) }
    }
    window.addEventListener('keydown', cancel)
    return () => window.removeEventListener('keydown', cancel)
  }, [])
  return <section className="term-demolition" aria-label={es ? 'Simulación de eliminación' : 'Simulated deletion'}>
    <p>{es ? 'SIMULACIÓN — no se elimina nada.' : 'SIMULATION — nothing is deleted.'}</p>
    <pre aria-label={es ? 'Contraseña ficticia, no se solicita entrada' : 'Fictional password, no input requested'}>Password: ********</pre>
    <pre aria-hidden="true">[{ '█'.repeat(progress / 10) }{ '░'.repeat(10 - progress / 10) }] {progress}%</pre>
    <progress value={progress} max={100} aria-label={es ? 'Progreso simulado' : 'Simulated progress'} />
    {progress >= 20 && <p>Deleting system files...</p>}
    {progress >= 50 && <p>Deleting portfolio...</p>}
    {progress >= 80 && <p>Deleting your career prospects...</p>}
    <p role="status">{cancelled ? (es ? 'Simulación cancelada. Todo sigue aquí.' : 'Simulation cancelled. Everything is still here.') : progress === 100 ? (es ? '¡Es broma! 😅 No se ha eliminado nada.' : 'Just kidding! 😅 Nothing was deleted.') : ''}</p>
    {!cancelled && progress < 100 && <button type="button" onClick={() => setCancelled(true)}>{es ? 'Cancelar simulación (Ctrl+C)' : 'Cancel simulation (Ctrl+C)'}</button>}
  </section>
}
