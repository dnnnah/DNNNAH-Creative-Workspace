import { expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Navbar } from '../src/components/navigation/Navbar'

test('ofrece los destinos existentes y ambos modos sin enlaces rotos', () => {
  const html = renderToStaticMarkup(<Navbar locale="es" onLocaleChange={() => {}} />)
  expect(html).toContain('href="#main"')
  expect(html).toContain('href="#about"')
  expect(html).toContain('href="#skills"')
  expect(html).toContain('aria-current="page"')
  expect(html.match(/aria-haspopup="dialog"/g)).toHaveLength(3)
  expect(html).toContain('href="#projects"')
  expect(html).toContain('href="#contact"')
  expect(html).not.toContain('Pendiente')
})

test('traduce el menú y conserva las etiquetas de archivo en inglés', () => {
  const html = renderToStaticMarkup(<Navbar locale="en" onLocaleChange={() => {}} />)
  expect(html).toContain('Open menu')
  expect(html).not.toContain('Pending')
  for (const label of ['hero.tsx', 'about.md', 'skills.ts', 'projects/', 'contact.tsx']) expect(html).toContain(label)
})


test('el disparador solo muestra un icono y conserva su nombre accesible', () => {
  const html = renderToStaticMarkup(<Navbar locale="es" onLocaleChange={() => {}} />)
  expect(html).toContain('aria-label="Abrir menú"')
  expect(html).not.toContain('>Abrir menú<')
})

test('Workspace y Terminal ofrecen botones de diálogo', () => {
  const html = renderToStaticMarkup(<Navbar locale="es" onLocaleChange={() => {}} />)
  expect(html).toMatch(/<button[^>]*aria-haspopup="dialog"[^>]*>[\s\S]*?Workspace/)
  expect(html).toContain('Terminal')
  expect(html).not.toContain('href="#workspace"')
  expect(html).not.toContain('href="#terminal"')
})
