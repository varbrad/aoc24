const parse = (
  input: string,
): { orderings: [number, number][]; updates: number[][] } => {
  const [a, b] = input.trim().split('\n\n')

  const orderings = a
    .trim()
    .split('\n')
    .map(l => l.trim().split('|').map(Number) as [number, number])
  const updates = b
    .trim()
    .split('\n')
    .map(l => l.trim().split(',').map(Number))

  return { orderings, updates }
}

const check = (
  update: number[],
  orderings: [number, number][],
): { ok: boolean; badIndex: number } => {
  for (let i = 0; i < update.length - 1; ++i) {
    if (orderings.some(([x, y]) => x === update[i + 1] && y === update[i]))
      return { ok: false, badIndex: i }
  }
  return { ok: true, badIndex: -1 }
}

export const part1 = (input: string): number => {
  const { orderings, updates } = parse(input)

  let sum = 0
  for (const update of updates) {
    sum += check(update, orderings).ok
      ? update[Math.floor(update.length / 2)]
      : 0
  }
  return sum
}

const fix = (update: number[], orderings: [number, number][]): number[] => {
  while (true) {
    const { ok, badIndex } = check(update, orderings)
    if (ok) return update
    const a = update[badIndex]
    update[badIndex] = update[badIndex + 1]
    update[badIndex + 1] = a
  }
}

export const part2 = (input: string): number => {
  const { orderings, updates } = parse(input)

  let sum = 0
  for (const update of updates) {
    const { ok } = check(update, orderings)
    if (ok) continue
    const fixed = fix(update, orderings)
    sum += fixed[Math.floor(fixed.length / 2)]
  }
  return sum
}
