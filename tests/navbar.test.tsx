import { expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Navbar } from '../src/components/navigation/Navbar'

test('ofrece los destinos existentes y señaliza los pendientes sin enlaces rotos', () => {
  const html = renderToStaticMarkup(<Navbar locale="es" onLocaleChange={() => {}} />)
  expect(html).toContain('href="#main"')
  expect(html).toContain('href="#about"')
  expect(html).toContain('href="#skills"')
  expect(html).toContain('aria-current="page"')
  expect(html.match(/aria-disabled="true"/g)).toHaveLength(2)
  expect(html).toContain('href="#projects"')
  expect(html).toContain('href="#contact"')
  expect(html).toContain('Pendiente')
})

test('traduce el menú y conserva las etiquetas de archivo en inglés', () => {
  const html = renderToStaticMarkup(<Navbar locale="en" onLocaleChange={() => {}} />)
  expect(html).toContain('Open menu')
  expect(html).toContain('Pending')
  for (const label of ['hero.tsx', 'about.md', 'skills.ts', 'projects/', 'contact.tsx']) expect(html).toContain(label)
})


test('el disparador solo muestra un icono y conserva su nombre accesible', () => {
  const html = renderToStaticMarkup(<Navbar locale="es" onLocaleChange={() => {}} />)
  expect(html).toContain('aria-label="Abrir menú"')
  expect(html).not.toContain('>Abrir menú<')
})

test('Workspace y Terminal son pendientes sin destinos ficticios', () => {
  const html = renderToStaticMarkup(<Navbar locale="es" onLocaleChange={() => {}} />)
  expect(html).toContain('Workspace')
  expect(html).toContain('Terminal')
  expect(html).not.toContain('href="#workspace"')
  expect(html).not.toContain('href="#terminal"')
})
