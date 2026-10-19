import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH })
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const base = process.env.BASE_URL || 'http://127.0.0.1:5175'
const captures = process.env.EGG_CAPTURES || 'outputs/easter-eggs'
await mkdir(captures, { recursive: true })
const errors = []
page.on('pageerror', error => errors.push(error.message))
async function burst(direction = 1) {
 for (let i = 0; i < 25; i++) { await page.mouse.wheel(0, direction * (Math.floor(i / 3) % 2 ? -850 : 850)); await page.waitForTimeout(85) }
}
try {
 await page.goto(base)
 await page.mouse.move(700, 400)
 for (let i = 0; i < 4; i++) { await page.mouse.wheel(0, 100); await page.waitForTimeout(180) }
 assert.equal(await page.getByRole('button', { name: 'Cerrar aviso de scroll' }).count(), 0)
 await page.evaluate(() => scrollTo(0, 3000)); await page.waitForTimeout(1700)
 await burst()
 await page.getByRole('button', { name: 'Cerrar aviso de scroll' }).waitFor()
 assert.match(await page.locator('.responsive-toast').innerText(), /velocidad de la luz/)
 await page.screenshot({ path: `${captures}/fast-scroll-desktop.png` })
 await page.getByRole('button', { name: 'Cerrar aviso de scroll' }).click()
 await page.waitForTimeout(1700)
 await burst(-1)
 await page.getByRole('button', { name: 'Cerrar aviso de scroll' }).waitFor()
 await page.waitForTimeout(4700)
 assert.equal(await page.getByRole('button', { name: 'Cerrar aviso de scroll' }).count(), 0)
 await page.reload()
 await page.evaluate(() => scrollTo(0, 3000)); await page.waitForTimeout(300)
 assert.equal(await page.getByRole('button', { name: 'Cerrar aviso de scroll' }).count(), 0, 'Programmatic navigation is not a gesture')
 await page.emulateMedia({ reducedMotion: 'reduce' })
 await page.getByRole('button', { name: 'English', exact: true }).click()
 await page.evaluate(() => scrollTo(0, 3000))
 await page.mouse.move(700, 400)
 await page.waitForTimeout(1700)
 await burst(-1)
 await page.getByRole('button', { name: 'Dismiss scroll notice' }).waitFor()
 assert.match(await page.locator('.responsive-toast').innerText(), /speed of light/)
 assert.equal(await page.locator('.responsive-toast').evaluate(el => getComputedStyle(el).animationName), 'none')
 await page.setViewportSize({ width: 375, height: 812 })
 assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false)
 await page.screenshot({ path: `${captures}/fast-scroll-mobile.png` })
 assert.deepEqual(errors, [])
 console.log('PASS: normal scroll ignored, fast gesture, rearm, dismissal, auto close, programmatic jump ignored, ES/EN, reduced motion and mobile layout')
} finally { await browser.close() }
