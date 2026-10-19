import { expect, test } from 'vitest'
import { ghostCount, ghostPosition } from '../src/components/playground/ghost-cursors'
test('la población espera inactividad y se multiplica con límite de seis', () => {
  expect(ghostCount(19999)).toBe(0)
  expect(ghostCount(20000)).toBe(1)
  expect(ghostCount(26000)).toBe(2)
  expect(ghostCount(90000)).toBe(6)
})
test('las personalidades reaccionan al mismo objetivo sin salir del viewport', () => {
  expect(ghostPosition(0, 0, { x: 200, y: 200 }, 1440, 900)).not.toEqual(ghostPosition(1, 0, { x: 200, y: 200 }, 1440, 900))
  for (let i = 0; i < 6; i++) {
    const position = ghostPosition(i, 8, { x: 1500, y: 1000 }, 1440, 900)
    expect(position.x).toBeLessThanOrEqual(1290)
    expect(position.y).toBeLessThanOrEqual(840)
  }
})
