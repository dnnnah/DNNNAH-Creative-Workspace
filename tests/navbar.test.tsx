import { expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Navbar } from '../src/components/navigation/Navbar'

test('ofrece solo el destino existente y señaliza los pendientes sin enlaces rotos', () => {
  const html = renderToStaticMarkup(<Navbar locale="es" onLocaleChange={() => {}} />)
  expect(html).toContain('href="#main"')
  expect(html).toContain('aria-current="page"')
  expect(html.match(/aria-disabled="true"/g)).toHaveLength(4)
  for (const target of ['about', 'skills', 'projects', 'contact']) expect(html).not.toContain(`href="#${target}"`)
  expect(html).toContain('Próximamente')
})

test('traduce el menú y conserva las etiquetas de archivo en inglés', () => {
  const html = renderToStaticMarkup(<Navbar locale="en" onLocaleChange={() => {}} />)
  expect(html).toContain('Open menu')
  expect(html).toContain('Coming soon')
  for (const label of ['hero.tsx', 'about.md', 'skills.ts', 'projects/', 'contact.tsx']) expect(html).toContain(label)
})
