export const ghostPersonalities = ['curioso', 'timido', 'travieso', 'complice', 'guia', 'eco'] as const
export function ghostCount(idleMs: number) { return Math.min(6, Math.max(0, Math.floor((idleMs - 20000) / 6000) + 1)) }
// Followers react to the leader; the shy cursor keeps its distance and the guide seeks Workspace.
export function ghostPosition(index: number, tick: number, target: { x: number; y: number }, width: number, height: number) {
  const phase = tick / 4
  const radius = index === 1 ? 115 : 28 + index * 12
  const x = target.x + Math.cos(phase - index * .8) * radius
  const y = target.y + Math.sin(phase - index * .8) * (radius / 2)
  return { x: Math.max(20, Math.min(width - 150, x)), y: Math.max(20, Math.min(height - 60, y)) }
}
