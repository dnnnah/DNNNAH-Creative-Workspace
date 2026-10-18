import { expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Skills } from '../src/components/skills/Skills'

test('ofrece un destino accesible y un inspector con contexto real en ambos idiomas', () => {
  for (const locale of ['es', 'en'] as const) {
    const html = renderToStaticMarkup(<Skills locale={locale} />)
    expect(html).toContain('id="skills"')
    expect(html).toContain('aria-labelledby="skills-title"')
    expect(html).toContain('Protech')
    expect(html).toContain('aria-controls="skill-inspector"')
    expect(html).toContain(locale === 'es' ? 'Pensar es mejor.' : 'Thinking is better.')
  }
})
