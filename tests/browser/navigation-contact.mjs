import assert from 'node:assert/strict'
import { mkdir } from 'node:fs/promises'
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright')
const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH})
const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'})
const base=process.env.PORTFOLIO_URL||'http://127.0.0.1:5179'
const directory=process.env.CONTACT_CAPTURES||'outputs/contact-navigation'
await mkdir(directory,{recursive:true})
const errors=[]
page.on('pageerror',error=>errors.push(error.message))
try {
 await page.goto(base)
 await page.locator('#about').waitFor({state:'visible'})
 await page.evaluate(()=>document.fonts.ready)
 assert.equal(await page.locator('.hero .source-link').getAttribute('href'),'#projects')
 await page.locator('.hero .source-link').click()
 await page.waitForFunction(()=>location.hash==='#projects')
 await page.goto(base)
 await page.locator('#about').waitFor({state:'visible'})
 await page.evaluate(()=>document.fonts.ready)
 const menu=page.locator('.menu-toggle')
 const toggleMenu = async () => { const box = await menu.boundingBox(); await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2) }
 const nav=page.getByRole('navigation',{name:'Navegación principal',exact:true})
 for(const section of ['about','skills','projects','contact','projects','skills','about','main']) {
  await page.evaluate(id=>{const el=document.getElementById(id);window.scrollTo(0,el.getBoundingClientRect().top+scrollY-110)},section)
  const scrollBefore = await page.evaluate(()=>scrollY)
  await toggleMenu()
  assert.equal(await page.evaluate(()=>scrollY),scrollBefore,'Abrir el menú no debe mover la página')
  const expected={main:'hero.tsx',about:'about.md',skills:'skills.ts',projects:'projects/',contact:'contact.tsx'}[section]
  await page.waitForFunction(name=>document.querySelector('#primary-navigation a[aria-current="page"]')?.textContent===name,expected,{timeout:2000}).catch(async error=>{
   console.log('Scroll diagnóstico',section,await page.evaluate(()=>({scroll:scrollY,active:document.querySelector('#primary-navigation a[aria-current]')?.textContent,header:document.querySelector('.masthead').getBoundingClientRect().bottom,sections:['main','about','skills','projects','contact'].map(id=>[id,document.getElementById(id)?.getBoundingClientRect().top])})))
   throw error
  })
  assert.equal(await nav.locator('a[aria-current="page"]').count(),1)
  assert.equal(new URL(page.url()).hash,'','El scroll no debe modificar rutas ni historial')
  await toggleMenu()
 }
 for(const width of [1440,1024,880,768,375,320]) {
  await page.setViewportSize({width,height:1000})
  await page.goto(`${base}/#contact`)
  await page.locator('#contact-name').fill('Ana')
  const bounds=await page.evaluate(()=>{const section=document.querySelector('#contact').getBoundingClientRect(),editor=document.querySelector('.contact-editor').getBoundingClientRect();return {right:section.right,editorRight:editor.right}})
  assert.ok(Math.abs(bounds.right-bounds.editorRight)<1,`Formulario alineado a la derecha en ${width}px: ${JSON.stringify(bounds)}`)
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false)
  await page.evaluate(()=>{const editor=document.querySelector('.contact-editor');scrollTo({top:editor.getBoundingClientRect().top+scrollY-110,behavior:'instant'})})
  if (!process.env.SKIP_CAPTURES) await page.screenshot({path:`${directory}/formulario-${width}.png`})
 }
 await page.setViewportSize({width:1440,height:1000})
 await page.keyboard.press('Meta+k')
 const dialog=page.getByRole('dialog',{name:'Terminal',exact:true})
 const input=dialog.getByRole('textbox')
 const run=async command=>{await input.fill(command);await input.press('Enter')}
 const posts=[]
 page.on('request',request=>{if(request.method()==='POST')posts.push(request.url())})
 await run('contact')
 assert.equal(await dialog.isVisible(),true)
 assert.equal(await dialog.getByRole('link',{name:'dnnnah@icloud.com',exact:true}).getAttribute('href'),'mailto:dnnnah@icloud.com')
 assert.equal(await dialog.getByRole('link',{name:/LinkedIn/}).getAttribute('href'),'https://www.linkedin.com/in/donnovan-tc/')
 assert.equal(await dialog.getByRole('link',{name:/GitHub/}).getAttribute('href'),'https://github.com/dnnnah')
 await run('contact --msg "Hola Donnovan"')
 assert.ok((await dialog.getByRole('log').innerText()).includes('503 — dispatch failed. try the form at contact'))
 assert.equal(await dialog.isVisible(),true)
 await run('git log --oneline')
 assert.match(await dialog.getByRole('log').innerText(),/83898c7 fix\(navbar\)/)
 if (!process.env.SKIP_CAPTURES) await page.screenshot({path:`${directory}/terminal-contact.png`})
 await dialog.getByRole('button',{name:'English',exact:true}).click()
 assert.ok((await dialog.getByRole('log').innerText()).includes('503 — dispatch failed. try the form at contact'))
 assert.equal(await dialog.getByRole('link',{name:'dnnnah@icloud.com',exact:true}).count(),1)
 await page.keyboard.press('Escape')
 assert.equal(await page.locator('#contact-name').inputValue(),'Ana')
 assert.equal(await page.locator('#contact-message').inputValue(),'')
 assert.deepEqual(posts,[])
 await page.goto(`${base}/#projects/pawpass`)
 await page.locator('.menu-toggle').click()
 assert.equal(await page.locator('#primary-navigation a[aria-current="page"]').innerText(),'projects/')
 assert.deepEqual(errors,[])
 console.log('PASS: contact con datos y enlaces reales; mensaje 503 exacto sin envío/navegación/borrador; git log; Navbar sincronizada al subir/bajar sin cambiar URL, caso de estudio; formulario alineado y sin overflow en 320–1440.')
} finally {await browser.close()}
