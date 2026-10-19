import { expect, test } from 'vitest'
import { renderToReadableStream, renderToStaticMarkup } from 'react-dom/server'
import { App } from '../src/app/App'
import type { ReactNode } from 'react'

async function renderCase(node: ReactNode) {
  const stream = await renderToReadableStream(node)
  await stream.allReady
  return new Response(stream).text()
}

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
      const html = await renderCase(<ProjectCase project={project!} locale={locale} />)
      expect(html).toContain('href="#projects"')
      expect(html).toContain('id="case-title"')
      expect(html).toContain(locale === 'es' ? 'Caso anterior' : 'Previous case study')
      expect(html).toContain(locale === 'es' ? 'Siguiente caso' : 'Next case study')
      if (slug === 'protech') {
        expect(html).toContain(locale === 'es' ? 'Lo que queda como siguiente posibilidad.' : 'Ideas still awaiting approval.')
        expect(html).toContain('href="#projects/dnnnah-runtime"')
        expect(html).toContain('href="#projects/pawpass"')
        expect(html).not.toContain('href="http')
      } else {
        expect(html).toContain(locale === 'es' ? 'Estado y alcance' : 'Status and scope')
        expect(html).toContain(locale === 'es' ? 'No es una captura' : 'Not a screenshot')
      }
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

test('publica únicamente las tres demos confirmadas tanto en tarjetas como en casos ES/EN', async () => {
  const { Projects, ProjectCase } = await import('../src/components/projects/Projects')
  const { projects } = await import('../src/components/projects/content')
  const demos = ['https://pet-carnet.vercel.app/', 'https://nutria-bay.vercel.app/', 'https://dnnnah-runtime.vercel.app/']
  for (const locale of ['es', 'en'] as const) {
    const gallery = renderToStaticMarkup(<Projects locale={locale} />)
    expect(gallery.match(/class="project-demo"/g)).toHaveLength(3)
    for (const url of demos) expect(gallery).toContain(`href="${url}"`)
    for (const project of projects) {
      const html = await renderCase(<ProjectCase project={project} locale={locale} />)
      if (project.slug === 'protech') expect(html).not.toContain('class="project-demo"')
      else {
        expect(html).toContain(`href="${demos[['pawpass', 'nutria', 'dnnnah-runtime'].indexOf(project.slug)]}"`)
        expect(html).toContain(locale === 'es' ? 'Ver demo' : 'View demo')
      }
    }
  }
})

test('ofrece GitHub solo para NutrIA y PawPass con los enlaces confirmados', async () => {
  const { Projects, ProjectCase } = await import('../src/components/projects/Projects')
  const { projects } = await import('../src/components/projects/content')
  for (const locale of ['es', 'en'] as const) {
    const gallery = renderToStaticMarkup(<Projects locale={locale} />)
    expect(gallery.match(/class="project-github"/g)).toHaveLength(2)
    for (const [slug, url] of [['nutria', 'https://github.com/dnnnah/nutrIA'], ['pawpass', 'https://github.com/dnnnah/petCarnet']]) {
      expect(gallery).toContain(`href="${url}"`)
      const html = await renderCase(<ProjectCase project={projects.find(project => project.slug === slug)!} locale={locale} />)
      expect(html).toContain(`href="${url}"`)
    }
    for (const project of projects.filter(project => ['protech', 'dnnnah-runtime'].includes(project.slug))) {
      expect(await renderCase(<ProjectCase project={project} locale={locale} />)).not.toContain('class="project-github"')
    }
  }
})
