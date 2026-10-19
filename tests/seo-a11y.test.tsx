import { expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import indexHtml from '../index.html?raw'
import { App } from '../src/app/App'
import { buildRobotsTxt, buildSitemapXml, localeFromLocation, localeFromSearch, renderHtmlMetadata } from '../src/seo/site'

test('index.html publica metadatos SEO indexables, Open Graph completos con PNG, Twitter Card y JSON-LD', () => {
  expect(indexHtml).toContain('<meta name="robots" content="index, follow" />')
  expect(indexHtml).not.toContain('noindex')
  expect(indexHtml).toContain('<title>Donnovan — Creative Workspace | DNNNAH</title>')
  expect(indexHtml).toContain('<link rel="canonical" href="https://dnnnah.dev/" />')
  expect(indexHtml).toContain('<meta property="og:url" content="https://dnnnah.dev/" />')
  expect(indexHtml).toContain('<meta property="og:title"')
  expect(indexHtml).toContain('<meta property="og:description"')
  expect(indexHtml).toContain('<meta property="og:image" content="https://dnnnah.dev/og-image.png" />')
  expect(indexHtml).toContain('<meta property="og:image:type" content="image/png" />')
  expect(indexHtml).toContain('<meta name="twitter:card" content="summary_large_image" />')
  expect(indexHtml).toContain('<meta name="twitter:image" content="https://dnnnah.dev/og-image.png" />')
  expect(indexHtml).toContain('<link rel="icon" type="image/svg+xml" href="/favicon.svg" />')
  expect(indexHtml).toContain('"@type":"ProfilePage"')
})

test('genera HTML inicial en inglés y adapta el dominio en metadatos, sitemap.xml y robots.txt según VITE_SITE_URL', () => {
  expect(localeFromSearch('?lang=en')).toBe('en')
  expect(localeFromSearch('?lang=es')).toBe('es')
  expect(localeFromSearch('')).toBe('es')
  expect(localeFromLocation('/en/index.html', '')).toBe('en')
  expect(localeFromLocation('/en/', '')).toBe('en')
  expect(localeFromLocation('/en/index.html', '?lang=es')).toBe('es')
  expect(localeFromLocation('/', '')).toBe('es')

  const enHtml = renderHtmlMetadata(indexHtml, 'en', 'https://custom-portfolio.example')
  expect(enHtml).toContain('<html lang="en">')
  expect(enHtml).toContain('<link rel="canonical" href="https://custom-portfolio.example/?lang=en" />')
  expect(enHtml).toContain('<meta property="og:locale" content="en_US" />')
  expect(enHtml).toContain('<meta property="og:url" content="https://custom-portfolio.example/?lang=en" />')
  expect(enHtml).toContain('<meta property="og:image" content="https://custom-portfolio.example/og-image.png" />')
  expect(enHtml).toContain('I direct the architecture and coordinate AI agents')

  const sitemap = buildSitemapXml('https://custom-portfolio.example/')
  expect(sitemap).toContain('<loc>https://custom-portfolio.example/</loc>')
  expect(sitemap).toContain('<loc>https://custom-portfolio.example/?lang=en</loc>')
  expect(sitemap).not.toContain('dnnnah.dev')

  const robots = buildRobotsTxt('https://custom-portfolio.example/')
  expect(robots).toContain('Sitemap: https://custom-portfolio.example/sitemap.xml')
})

test('los encabezados mantienen separación léxica para lectores de pantalla y el pie expone contentinfo', () => {
  const html = renderToStaticMarkup(<App />)
  const textOnly = html.replace(/<[^>]+>/g, '')
  expect(textOnly).not.toContain('soyDonnovan')
  expect(textOnly).not.toContain('quesolo')
  expect(textOnly).not.toContain('ayudan.Pensar')
  expect(textOnly).not.toContain('tomanforma')
  expect(textOnly).not.toContain('journey.pathUn')
  expect(html).toContain('role="contentinfo"')
})
