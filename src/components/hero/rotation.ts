/** Devuelve la limpieza del temporizador; el modo reducido conserva el texto estático. */
export function startRotation(count: number, onChange: (index: number) => void, reduced = false) {
  if (reduced || count < 2) return () => {}
  let index = 0
  const timer = setInterval(() => {
    index = (index + 1) % count
    onChange(index)
  }, 4500)
  return () => clearInterval(timer)
}
