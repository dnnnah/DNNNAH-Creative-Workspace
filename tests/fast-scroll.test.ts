import { expect, test } from 'vitest'
import { isFastScroll } from '../src/components/playground/fast-scroll'
import { isRapidResize } from '../src/components/playground/gesture-detectors'
const fast = Array.from({ length: 21 }, (_, i) => ({ time: i * 100, y: i * 500 }))
test('scroll exige casi dos segundos sostenidos y diez pantallas de recorrido', () => {
  expect(isFastScroll(fast, 900)).toBe(true)
  expect(isFastScroll(fast.slice(0, 12), 900)).toBe(false)
  expect(isFastScroll(fast.map(sample => ({ ...sample, y: sample.y / 10 })), 900)).toBe(false)
  expect(isFastScroll([{ time: 0, y: 0 }, { time: 10, y: 12000 }], 900)).toBe(false)
  expect(isFastScroll(fast.map(sample => ({ ...sample, time: sample.time * 2 })), 900)).toBe(false)
})
test('resize exige repetición de ida y vuelta sostenida durante casi dos segundos', () => {
  const resize = Array.from({ length: 13 }, (_, i) => ({ time: i * 170, width: i % 2 ? 1100 : 1400 }))
  expect(isRapidResize(resize)).toBe(true)
  expect(isRapidResize(resize.slice(0, 10))).toBe(false)
  expect(isRapidResize(resize.map((sample, i) => ({ ...sample, width: 800 + i * 60 })))).toBe(false)
  expect(isRapidResize(resize.map(sample => ({ ...sample, width: sample.width / 20 })))).toBe(false)
  expect(isRapidResize(resize.map(sample => ({ ...sample, time: sample.time * 3 })))).toBe(false)
})
