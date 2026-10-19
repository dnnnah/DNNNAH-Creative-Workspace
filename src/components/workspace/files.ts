import { projects } from '../projects/content'

export const sectionFiles = [
  { id: 'hero', name: 'hero.tsx', href: '#main', kind: 'tsx' },
  { id: 'about', name: 'about.md', href: '#about', kind: 'md' },
  { id: 'skills', name: 'skills.ts', href: '#skills', kind: 'ts' },
  { id: 'projects', name: 'projects/', href: '#projects', kind: 'folder' },
  { id: 'contact', name: 'contact.tsx', href: '#contact', kind: 'tsx' },
] as const
export const secretFile = { id: 'secret', name: 'secret.ts', href: '', kind: 'ts' } as const
export const workspaceFiles = [
  ...sectionFiles,
  secretFile,
  ...projects.map(project => ({ id: project.slug, name: `${project.slug}.md`, href: `#projects/${project.slug}`, kind: 'md' as const })),
]
export type WorkspaceFile = typeof workspaceFiles[number]
