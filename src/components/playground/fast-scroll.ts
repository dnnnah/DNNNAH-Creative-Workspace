export type ScrollSample = { time: number; y: number }
export function isFastScroll(samples: ScrollSample[], viewportHeight: number): boolean {
  if (samples.length < 12 || viewportHeight <= 0) return false
  const elapsed = samples.at(-1)!.time - samples[0].time
  if (elapsed < 1800 || elapsed > 2600) return false
  const distance = samples.slice(1).reduce((total, sample, index) => total + Math.abs(sample.y - samples[index].y), 0)
  return distance >= viewportHeight * 10
}
