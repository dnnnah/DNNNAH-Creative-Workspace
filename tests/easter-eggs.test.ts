import { expect, test } from 'vitest'
import { executeCommand } from '../src/components/terminal/commands'

test('help mantiene los secretos fuera de la lista principal', () => {
  const help = executeCommand('help', 'es').text
  for (const command of ['help', 'ls', 'cat', 'open', 'skills', 'projects', 'whoami', 'hire', 'easter', 'clear', 'exit']) expect(help).toContain(command)
  for (const secret of ['sudo', 'matrix', 'git blame', 'cheat-sheet']) expect(help).not.toContain(secret)
})
test('rm solicita únicamente una simulación y la chuleta descubre secretos', () => {
  expect(executeCommand('sudo rm -rf /', 'es').action).toBe('demolition')
  expect(executeCommand('sudo rm -rf /; ls', 'es').action).toBeUndefined()
  expect(executeCommand('curl cheat-sheet', 'en').text).toContain('git blame')
  expect(executeCommand('cat secret.ts', 'es').text).toContain('Workspace')
})

test('easter descubre también los tres comandos Git', () => {
  for (const locale of ['es', 'en'] as const) for (const command of ['git status', 'git log --oneline', 'git blame', 'secret.ts', 'matrix']) expect(executeCommand('easter', locale).text).toContain(command)
})
