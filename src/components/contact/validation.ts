export type ContactData = { name: string; email: string; subject: string; message: string }
export type Field = keyof ContactData
export type Errors = Partial<Record<Field, 'required' | 'length' | 'email'>>
export function validateContact(input: unknown): Errors {
 const data = input && typeof input === 'object' ? input as Record<string, unknown> : {}
 const errors: Errors = {}
 for (const [field, max] of [['name', 80], ['email', 254], ['subject', 120], ['message', 4000]] as const) {
  const value = data[field]
  if (typeof value !== 'string' || (field !== 'subject' && !value.trim())) errors[field] = 'required'
  else if (value.length > max) errors[field] = 'length'
  else if (field === 'email' && (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || /[\r\n]/.test(value))) errors[field] = 'email'
 }
 return errors
}
