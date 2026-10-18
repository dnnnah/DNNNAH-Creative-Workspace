import { afterEach, expect, it, vi } from 'vitest'
import { startRotation } from '../src/components/hero/rotation'

afterEach(() => vi.useRealTimers())
it('avanza cada 4.5 segundos, vuelve al inicio y cancela al desmontar', () => {
  vi.useFakeTimers()
  const seen: number[] = []
  const stop = startRotation(4, index => seen.push(index))
  vi.advanceTimersByTime(4499)
  expect(seen).toEqual([])
  vi.advanceTimersByTime(1)
  expect(seen).toEqual([1])
  vi.advanceTimersByTime(13500)
  expect(seen).toEqual([1, 2, 3, 0])
  stop()
  vi.advanceTimersByTime(9000)
  expect(seen).toEqual([1, 2, 3, 0])
})
it('mantiene todas las frases estáticas si se reduce el movimiento', () => {
  vi.useFakeTimers()
  const seen: number[] = []
  const stop = startRotation(4, index => seen.push(index), true)
  vi.advanceTimersByTime(18000)
  expect(seen).toEqual([])
  stop()
})
