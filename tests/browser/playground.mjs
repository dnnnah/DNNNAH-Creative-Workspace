import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_PATH })
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } })
const base = process.env.PORTFOLIO_URL || 'http://127.0.0.1:5181'
const captures = process.env.PLAYGROUND_CAPTURES || 'outputs/playground'
await mkdir(captures, { recursive: true })
const errors = []
page.on('pageerror', error => errors.push(error.message))
await page.addInitScript(() => {
 window.audioStarts = 0
 window.audioContexts = 0
 const Native = window.AudioContext
 window.AudioContext = class extends Native {
  constructor(...args) { super(...args); window.audioContexts++ }
  createOscillator() {
   const node = super.createOscillator()
   const start = node.start.bind(node)
   node.start = (...args) => { window.audioStarts++; return start(...args) }
   return node
  }
 }
})
const openWorkspace = async () => {
 await page.getByRole('button', { name: /Abrir menú|Open menu/ }).click()
 await page.getByRole('button', { name: 'Workspace', exact: true }).click()
 await page.getByRole('dialog', { name: 'Workspace', exact: true }).waitFor()
}
const secret = async () => {
 const files = page.getByRole('button', { name: /^(Archivos|Files)$/ })
 if (await files.isVisible()) await files.click()
 await page.locator('.ws-file').filter({ hasText: 'secret.ts' }).click()
}
try {
 await page.goto(base)
 await page.evaluate(() => document.fonts.ready)
 assert.equal(await page.locator('.sound-toggle').getAttribute('aria-pressed'), 'false')
 assert.equal(await page.evaluate(() => window.audioContexts), 0)
 const mark = page.getByRole('button', { name: 'Explorar el monograma D.', exact: true })
 await mark.focus()
 for (let i = 0; i < 3; i++) await page.keyboard.press('Enter')
 assert.match(await page.locator('.playground-status').innerText(), /secret.ts/)
 assert.equal(await page.evaluate(() => window.audioStarts), 0)
 await page.screenshot({ path: `${captures}/desktop.png` })
 await page.locator('.sound-toggle').click()
 await page.waitForFunction(() => window.audioStarts === 1)
 assert.equal(await page.evaluate(() => localStorage.getItem('dnnnah:sound')), 'on')
 await page.reload()
 assert.equal(await page.locator('.sound-toggle').getAttribute('aria-pressed'), 'true')
 assert.equal(await page.evaluate(() => window.audioContexts), 0, 'No autoplay, even with stored consent')
 await page.locator('#contact-name').fill('Ana')
 await page.locator('#contact-message').fill('secret.ts DDD: no global keyboard interception')
 await page.mouse.wheel(0, 400)
 assert.equal(await page.evaluate(() => window.audioStarts), 0)
 await page.evaluate(() => scrollTo(0, 0))
 await openWorkspace()
 await secret()
 const dialog = page.getByRole('dialog', { name: 'Workspace', exact: true })
 const swap = dialog.getByRole('button', { name: 'Intercambiar acentos', exact: true })
 const beforeSwap = await page.evaluate(() => window.audioStarts)
 await swap.click()
 await page.waitForFunction(n => window.audioStarts === n + 1, beforeSwap)
 assert.equal(await dialog.getByRole('button', { name: 'Restaurar paleta', exact: true }).getAttribute('aria-pressed'), 'true')
 assert.equal(await page.locator('.is-ink').count(), 1)
 assert.equal(new URL(page.url()).hash, '')
 await page.screenshot({ path: `${captures}/secret-desktop.png` })
 await dialog.getByRole('button', { name: 'English', exact: true }).click()
 assert.equal(await dialog.getByRole('button', { name: 'Restore palette', exact: true }).count(), 1)
 await page.keyboard.press('Escape')
 assert.equal(await dialog.count(), 0)
 await page.getByRole('button', { name: 'Restore palette', exact: true }).click()
 assert.equal(await page.locator('.is-ink').count(), 0)
 await page.locator('.sound-toggle').click()
 assert.equal(await page.evaluate(() => localStorage.getItem('dnnnah:sound')), 'off')
 const startsBeforeMute = await page.evaluate(() => window.audioStarts)
 await page.locator('.brand-egg').focus()
 for (let i = 0; i < 3; i++) await page.keyboard.press('Space')
 assert.equal(await page.evaluate(() => window.audioStarts), startsBeforeMute, 'Mute prevents discovery sounds')
 await page.reload()
 assert.equal(await page.locator('.sound-toggle').getAttribute('aria-pressed'), 'false')
 await page.keyboard.press(process.platform === 'darwin' ? 'Meta+k' : 'Control+k')
 const terminal = page.getByRole('dialog', { name: 'Terminal', exact: true })
 await terminal.waitFor()
 await terminal.getByRole('textbox').fill('help')
 await terminal.getByRole('textbox').press('Enter')
 assert.ok((await terminal.getByRole('log').innerText()).length > 20)
 await page.keyboard.press('Escape')
 assert.equal(await terminal.count(), 0)
 for (const width of [320, 375, 768, 1024, 1440]) {
  await page.setViewportSize({ width, height: 900 })
  await page.goto(base)
  await page.evaluate(() => document.fonts.ready)
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `page overflow ${width}`)
  for (const selector of ['.brand-egg', '.sound-toggle', '.menu-toggle', '.terminal-shortcut']) {
   const box = await page.locator(selector).boundingBox()
   assert.ok(box.width >= 44 && box.height >= 44, `${selector} touch size at ${width}`)
   assert.equal(await page.locator(selector).evaluate(el => {
    const box = el.getBoundingClientRect()
    return el.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2))
   }), true, `${selector} is not covered by another control at ${width}`)
  }
  if (width === 375) await page.screenshot({ path: `${captures}/mobile.png` })
  await openWorkspace()
  await secret()
  assert.equal(await page.locator('.ws-panel:not([hidden])').evaluate(el => el.scrollWidth > el.clientWidth), false, `secret overflow ${width}`)
  if (width === 375) await page.screenshot({ path: `${captures}/secret-mobile.png` })
  await page.keyboard.press('Escape')
 }
 await page.emulateMedia({ reducedMotion: 'reduce' })
 for (const width of [320, 375, 1440]) {
  await page.setViewportSize({ width, height: 900 })
  // Catch regressions that reintroduce movement on focus or hover under reduced motion.
  const reducedMark = page.locator('.brand-egg')
  await reducedMark.focus()
  await reducedMark.hover()
  assert.deepEqual(await reducedMark.evaluate(el => {
   const style = getComputedStyle(el)
   return { transform: style.transform, transition: style.transitionDuration, animation: style.animationName }
  }), { transform: 'none', transition: '0s', animation: 'none' })
  await openWorkspace()
  assert.equal(await page.locator('dialog').evaluate(el => getComputedStyle(el).animationName), 'none')
  await secret()
  await page.waitForFunction(() => document.activeElement?.id === 'ws-tab-secret', null, { timeout: 3000 })
  const reducedSwap = page.locator('#ws-panel-secret button[aria-pressed]')
  await reducedSwap.focus()
  await page.keyboard.press('Enter')
  assert.equal(await reducedSwap.getAttribute('aria-pressed'), 'true', 'Palette works with keyboard and reduced motion')
  await page.keyboard.press('Space')
  assert.equal(await reducedSwap.getAttribute('aria-pressed'), 'false', 'Palette is reversible without leaving the file')
  assert.equal(await reducedSwap.evaluate(el => el === document.activeElement), true)
  await page.keyboard.press('Escape')
  assert.equal(await page.locator('.menu-toggle').evaluate(el => el === document.activeElement), true, 'Escape restores focus to menu trigger')
 }
 await page.emulateMedia({ reducedMotion: 'no-preference' })
 await openWorkspace()
 assert.notEqual(await page.locator('dialog').evaluate(el => getComputedStyle(el).animationName), 'none', 'Overlay retains its short entry animation when motion is allowed')
 await page.keyboard.press('Escape')
 await page.goto(base)
 const blocked = await browser.newPage()
 await blocked.addInitScript(() => { Storage.prototype.getItem = () => { throw new Error('blocked') }; Storage.prototype.setItem = () => { throw new Error('blocked') } })
 await blocked.goto(base)
 await blocked.locator('.sound-toggle').click()
 assert.equal(await blocked.locator('.sound-toggle').getAttribute('aria-pressed'), 'true')
 await blocked.close()
 const unsupported = await browser.newPage()
 await unsupported.addInitScript(() => { window.AudioContext = undefined })
 await unsupported.goto(base)
 await unsupported.locator('.sound-toggle').click()
 await unsupported.locator('.brand-egg').focus()
 for (let i = 0; i < 3; i++) await unsupported.keyboard.press('Enter')
 assert.match(await unsupported.locator('.playground-status').innerText(), /secret.ts/)
 await unsupported.close()
 assert.deepEqual(errors, [])
 console.log('PASS: discoveries, sound consent/no autoplay/mute/persistence, quiet typing/scroll, ES/EN, Terminal shortcut, Escape, reduced motion, blocked storage, 44px controls and 320–1440 layouts')
} finally { await browser.close() }
