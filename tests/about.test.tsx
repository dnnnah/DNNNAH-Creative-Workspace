import { expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { About } from '../src/components/about/About'

test('publica un destino about accesible y formación en curso en ambos idiomas', () => {
  for (const locale of ['es', 'en'] as const) {
    const html = renderToStaticMarkup(<About locale={locale} />)
    expect(html).toContain('id="about"')
    expect(html).toContain('aria-labelledby="about-title"')
    expect(html).toContain(locale === 'es' ? 'Sexto semestre' : 'Sixth semester')
    expect(html).toContain(locale === 'es' ? 'En curso' : 'In progress')
    expect(html).toContain('Protech')
    expect(html).toContain('aria-pressed="true"')
    expect(html).not.toContain('href="http')
  }
})
