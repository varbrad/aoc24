const parse = (input: string): number[][] =>
  input
    .trim()
    .split('\n')
    .map(l => l.trim().split(/\s+/).map(Number))

const isSafe = (ns: number[]): boolean => {
  const dx = Math.sign(ns[1] - ns[0])
  // Handle edge-case where first two numbers are the same, automatically unsafe
  if (dx === 0) return false
  const dxs = ns.slice(1).map((n, i) => n - ns[i])
  // Ensure all same sign, so we must be all asc or desc
  if (!dxs.every(d => Math.sign(d) === dx)) return false
  // Ensure gaps aren't too big (max 3)
  if (dxs.some(d => Math.abs(d) > 3)) return false
  return true
}

export const part1 = (input: string): number =>
  parse(input).reduce((acc, ns) => acc + (isSafe(ns) ? 1 : 0), 0)

export const part2 = (input: string): number =>
  parse(input).reduce((acc, ns) => {
    if (isSafe(ns)) return acc + 1
    for (let i = 0; i < ns.length; ++i) {
      const newNs = ns.slice()
      newNs.splice(i, 1)
      if (isSafe(newNs)) return acc + 1
    }
    return acc
  }, 0)
