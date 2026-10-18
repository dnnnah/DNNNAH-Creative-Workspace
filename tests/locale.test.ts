import { describe, expect, it } from 'vitest'
import { resolveLocale, messages } from '../src/i18n/messages'

describe('resolución de idioma', () => {
  it('usa español por defecto y ante valores desconocidos', () => {
    expect(resolveLocale()).toBe('es')
    expect(resolveLocale('fr')).toBe('es')
  })
  it('acepta la alternativa inglesa explícita', () => {
    expect(resolveLocale('en')).toBe('en')
  })
  it('ofrece las mismas claves en ambos diccionarios', () => {
    expect(Object.keys(messages.en).sort()).toEqual(Object.keys(messages.es).sort())
  })
})
