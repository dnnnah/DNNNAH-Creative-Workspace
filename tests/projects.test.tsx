import { expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { App } from '../src/app/App'

test('la portada ofrece cuatro casos navegables y distingue arte de capturas', () => {
  const html = renderToStaticMarkup(<App />)
  for (const slug of ['protech', 'pawpass', 'nutria', 'dnnnah-runtime']) expect(html).toContain(`href="#projects/${slug}"`)
  expect(html).toContain('Composición abstracta')
  expect(html).toContain('Académico · Incompleto')
})

test('cada enlace de galería resuelve un caso bilingüe con retorno y sin enlaces inventados', async () => {
  const { ProjectCase } = await import('../src/components/projects/Projects')
  const { projectFromHash } = await import('../src/components/projects/content')
  for (const slug of ['protech', 'pawpass', 'nutria', 'dnnnah-runtime']) {
    const project = projectFromHash(`#projects/${slug}`)
    expect(project).toBeDefined()
    for (const locale of ['es', 'en'] as const) {
      const html = renderToStaticMarkup(<ProjectCase project={project!} locale={locale} />)
      expect(html).toContain('href="#projects"')
      expect(html).toContain('id="case-title"')
      expect(html).toContain(locale === 'es' ? 'Estado y alcance' : 'Status and scope')
      expect(html).toContain(locale === 'es' ? 'No es una captura' : 'Not a screenshot')
      expect(html).not.toContain('href="http')
    }
  }
  expect(projectFromHash('#projects/desconocido')).toBeUndefined()
  expect(projectFromHash('#projects/protech-extra')).toBeUndefined()
})

test('las tarjetas muestran el stack y permiten leer el contexto sin abandonar la galería', () => {
  const html = renderToStaticMarkup(<App />)
  expect(html).toContain('aria-label="Stack de Protech"')
  expect(html).toContain('Cloudinary</li>')
  expect(html).toContain('<summary>Sobre el proyecto</summary>')
  expect(html.match(/class="project-stack"/g)).toHaveLength(4)
})
