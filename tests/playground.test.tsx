import { expect, test } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { App } from '../src/app/App'
import { workspaceFiles } from '../src/components/workspace/files'
import { WorkspaceContent } from '../src/components/workspace/WorkspaceContent'

test('el sonido comienza apagado y el guiño del monograma tiene control de teclado', () => {
  const html = renderToStaticMarkup(<App />)
  expect(html).toMatch(/aria-label="Activar sonidos"[^>]*aria-pressed="false"/)
  expect(html).toContain('aria-label="Explorar el monograma D."')
})
test('secret.ts ofrece contenido bilingüe propio, sin navegar a un hash inexistente', () => {
  const file = workspaceFiles.find(item => item.id === 'secret')
  expect(file).toBeDefined()
  for (const locale of ['es', 'en'] as const) {
    const html = renderToStaticMarkup(<WorkspaceContent file={file!} locale={locale} onSelect={() => {}} onNavigate={() => {}} onClose={() => {}} />)
    expect(html).toContain('secret.ts')
    expect(html).toContain('aria-pressed="false"')
    expect(html).not.toContain('href="#secret"')
  }
})
