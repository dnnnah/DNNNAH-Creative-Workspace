import { afterEach, expect, it, vi } from 'vitest'
import { startRotation } from '../src/components/hero/rotation'

afterEach(() => vi.useRealTimers())
it('avanza cada 2.5 segundos, vuelve al inicio y cancela al desmontar', () => {
  vi.useFakeTimers()
  const seen: number[] = []
  const stop = startRotation(4, index => seen.push(index))
  vi.advanceTimersByTime(2499)
  expect(seen).toEqual([])
  vi.advanceTimersByTime(1)
  expect(seen).toEqual([1])
  vi.advanceTimersByTime(7500)
  expect(seen).toEqual([1, 2, 3, 0])
  stop()
  vi.advanceTimersByTime(5000)
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

it('continúa desde la frase seleccionada al reiniciar el intervalo', () => {
  vi.useFakeTimers()
  const seen: number[] = []
  const stop = startRotation(4, index => seen.push(index), false, 2)
  vi.advanceTimersByTime(2500)
  expect(seen).toEqual([3])
  vi.advanceTimersByTime(2500)
  expect(seen).toEqual([3, 0])
  stop()
})
