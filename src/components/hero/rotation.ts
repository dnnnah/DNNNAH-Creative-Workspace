/** Devuelve la limpieza del temporizador; el modo reducido conserva el texto estático. */
export function startRotation(count: number, onChange: (index: number) => void, reduced = false, initialIndex = 0) {
  if (reduced || count < 2) return () => {}
  let index = initialIndex
  const timer = setInterval(() => {
    index = (index + 1) % count
    onChange(index)
  }, 2500)
  return () => clearInterval(timer)
}
