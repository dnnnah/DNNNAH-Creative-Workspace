import assert from 'node:assert/strict'
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright')
const browser = await chromium.launch({headless:true, executablePath:process.env.CHROMIUM_PATH})
const page = await browser.newPage()
await page.addInitScript(() => {
 window.tones=[]
 const Native=window.AudioContext
 window.AudioContext=class extends Native {
  createOscillator() { const node=super.createOscillator(); const start=node.start.bind(node); node.start=(...args)=>{window.tones.push({type:node.type,frequency:node.frequency.value});return start(...args)};return node }
 }
})
page.setDefaultTimeout(3000)
const count=()=>page.evaluate(()=>window.tones.length)
async function soundsOnce(action) {
 const before=await count()
 await action()
 await page.waitForFunction(n=>window.tones.length===n+1,before,{timeout:3000})
 return page.evaluate(()=>window.tones.at(-1))
}
try {
 await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:5181')
 await page.locator('.sound-toggle').click()
 await page.waitForFunction(()=>window.tones.length===1)
 const general=await soundsOnce(()=>page.locator('.skill-piece').first().click())
 await soundsOnce(()=>page.locator('#projects a[href^="#projects/"]').first().click())
 await page.locator('.menu-toggle').click()
 await page.getByRole('button',{name:'Workspace',exact:true}).click()
 const mechanical=await soundsOnce(()=>page.locator('.ws-file').filter({hasText:'about.md'}).click())
 await page.keyboard.press('Escape')
 await page.locator('.terminal-shortcut').click()
 const digital=await soundsOnce(()=>page.getByRole('dialog',{name:'Terminal',exact:true}).getByRole('button',{name:'English',exact:true}).click())
 assert.notDeepEqual(general,mechanical)
 assert.notDeepEqual(mechanical,digital)
 assert.notDeepEqual(general,digital)
 const before=await count()
 await page.getByRole('dialog',{name:'Terminal',exact:true}).getByRole('textbox').fill('help')
 await page.getByRole('textbox').press('Enter')
 await page.mouse.wheel(0,100)
 assert.equal(await count(),before)
 await page.keyboard.press('Escape')
 await page.locator('.sound-toggle').click()
 const muted=await count()
 await page.locator('.menu-toggle').click()
 assert.equal(await count(),muted)
 console.log('PASS: buttons, skills and projects; distinct general/mechanical/digital tones; typing/scroll silent; mute')
} finally { await browser.close() }
