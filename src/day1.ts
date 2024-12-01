export const part1 = (input: string): number => {
  const parsed = input.trim().split('\n').map(l => l.split(/\s+/).map(Number))
  const a = parsed.map(a => a[0]).sort((a, b) => a - b)
  const b = parsed.map(a => a[1]).sort((a, b) => a - b)
  return a.reduce((acc, v, i) => acc + Math.abs(v - b[i]), 0)
}

export const part2 = (input: string): number => {
  const parsed = input.trim().split('\n').map(l => l.split(/\s+/).map(Number))
  const a = parsed.map(a => a[0]).sort((a, b) => a - b)
  const b = parsed.map(a => a[1]).sort((a, b) => a - b)

  return a.reduce((acc, v, i) => {
    const occurences = b.filter(x => x === v).length
    return acc + (v*occurences)
  }, 0)
}