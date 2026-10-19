import { expect, test } from 'vitest'
import { executeCommand, completeCommand } from '../src/components/terminal/commands'

test('lista únicamente los archivos del portfolio y lee contenido real traducido', () => {
  expect(executeCommand('ls', 'es').text).toBe('hero.tsx  about.md  skills.ts  projects/  contact.tsx')
  expect(executeCommand('cat about.md', 'es').text).toContain('UDG / CUCEI')
  expect(executeCommand('cat about.md', 'en').text).toContain('sixth semester')
  expect(executeCommand('cat hero.tsx', 'es').text).toContain('Donnovan')
  expect(executeCommand('cat skills.ts', 'es').text).toContain('Playwright')
  expect(executeCommand('cat projects/', 'es').links?.[0].href).toBe('#projects/protech')
  expect(executeCommand('cat contact.tsx', 'es').links?.[0].href).toBe('#contact')
})
test('navega solo hacia rutas existentes y nunca interpreta entrada arbitraria', () => {
  for (const [input, href] of [['open hero', '#main'], ['open about', '#about'], ['open skills.ts', '#skills'], ['open projects/', '#projects'], ['open contact', '#contact'], ['hire', '#contact']]) expect(executeCommand(input, 'es').navigate).toBe(href)
  for (const input of ['open https://evil.test', 'open inexistente', 'cat ../../.env', 'help; ls', 'sudo rm -rf /; whoami', '<script>alert(1)</script>']) {
    const result = executeCommand(input, 'es')
    expect(result.navigate).toBeUndefined()
    expect(result.text).toMatch(/help|ls/)
  }
})
test('cada comando original tiene comportamiento y las simulaciones no producen acciones', () => {
  for (const input of ['help', 'skills', 'stack', 'projects', 'whoami', 'git blame', 'curl cheat-sheet', 'sudo make-coffee', 'sudo rm -rf /', 'matrix', 'clear', 'exit']) expect(executeCommand(input, 'es').text).toBeTruthy()
  expect(executeCommand('stack', 'en')).toEqual(executeCommand('skills', 'en'))
  expect(executeCommand('sudo rm -rf /', 'es')).toEqual({ text: 'El universo contiene la respiración… Operación cancelada por el sentido común. Simulación: no se ha eliminado nada.' })
  expect(executeCommand('matrix', 'es').action).toBe('matrix')
  expect(executeCommand('clear', 'es').action).toBe('clear')
  expect(executeCommand('exit', 'es').action).toBe('exit')
  expect(executeCommand('whoami', 'en').text).toContain('I direct')
  expect(executeCommand('nope', 'en').text).toContain('Unknown command')
})
test('autocompleta comandos y argumentos permitidos sin inventar destinos', () => {
  expect(completeCommand('sudo m')).toEqual(['sudo make-coffee'])
  expect(completeCommand('cat a')).toEqual(['cat about.md'])
  expect(completeCommand('open con')).toContain('open contact')
  expect(completeCommand('s')).toEqual(['skills', 'stack', 'sudo make-coffee', 'sudo rm -rf /'])
  expect(completeCommand('xyz')).toEqual([])
})

test('amplía el sistema de archivos virtual y Git sin efectos reales', () => {
  expect(executeCommand('pwd', 'es').text).toBe('/home/visitor/dnnnah/portfolio')
  const listing = executeCommand('ls -la', 'es').text
  for (const file of ['hero.tsx', 'about.md', 'skills.ts', 'projects/', 'contact.tsx', 'drwxr-xr-x', '-rw-r--r--']) expect(listing).toContain(file)
  expect(executeCommand('git status', 'es').text).toMatch(/rama main/)
  expect(executeCommand('git status', 'en').text).toMatch(/On branch main/)
  expect(executeCommand('git stattus', 'es')).toEqual(executeCommand('git status', 'es'))
  expect(executeCommand('git blame', 'es').text).toMatch(/Donnovan\s+1\)/)
  expect(executeCommand('git blame', 'en').text).toContain('Simulated')
  expect(executeCommand('easter', 'es').text).toContain('sudo make-coffee')
  expect(executeCommand('easter', 'en').text).toContain('matrix')
  expect(executeCommand('cv', 'es').text).toContain('disponible')
  expect(executeCommand('cv', 'es').links).toBeUndefined()
})

test('contact prepara un borrador literal sin enviar y conserva sus espacios', () => {
  expect(executeCommand('contact', 'es').navigate).toBe('#contact')
  expect(executeCommand('contact --msg', 'es')).toMatchObject({ navigate: '#contact', message: '' })
  expect(executeCommand('contact --msg "Hola,  Donnovan"', 'es')).toMatchObject({ navigate: '#contact', message: 'Hola,  Donnovan' })
  expect(executeCommand("contact --msg 'Hola mundo'", 'en').message).toBe('Hola mundo')
  expect(executeCommand('contact --msg <script>alert(1)</script>', 'es').message).toBe('<script>alert(1)</script>')
  expect(executeCommand('contact --msg "sin cerrar', 'es').navigate).toBeUndefined()
  expect(executeCommand('contact --other', 'es').navigate).toBeUndefined()
  expect(completeCommand('git st')).toEqual(['git status'])
  expect(completeCommand('ls -')).toEqual(['ls -la'])
  expect(completeCommand('contact --')).toEqual(['contact --msg'])
})

test('el atajo corresponde al sistema operativo, no al motor WebKit', async () => {
  const { isApplePlatform } = await import('../src/components/navigation/shortcut')
  for (const platform of ['MacIntel', 'iPhone', 'iPad', 'Macintosh']) expect(isApplePlatform(platform)).toBe(true)
  for (const platform of ['Win32', 'Linux x86_64', 'Android AppleWebKit/537.36', '']) expect(isApplePlatform(platform)).toBe(false)
})
