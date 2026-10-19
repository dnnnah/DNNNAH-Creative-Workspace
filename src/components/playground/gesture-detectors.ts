export type ResizeSample = { time: number; width: number }
export function isRapidResize(samples: ResizeSample[]): boolean {
  if (samples.length < 10) return false
  const elapsed = samples.at(-1)!.time - samples[0].time
  if (elapsed < 1800 || elapsed > 3000) return false
  let distance = 0, reversals = 0, previousDirection = 0
  for (let index = 1; index < samples.length; index++) {
    const delta = samples[index].width - samples[index - 1].width
    if (Math.abs(delta) < 16) continue
    const direction = Math.sign(delta)
    if (previousDirection && direction !== previousDirection) reversals++
    previousDirection = direction
    distance += Math.abs(delta)
  }
  return reversals >= 4 && distance >= 1600
}
