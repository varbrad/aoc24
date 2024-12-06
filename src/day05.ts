export const part1 = (input: string): number => {
  const [a, b] = input.trim().split('\n\n')

  const orderings = a
    .trim()
    .split('\n')
    .map(l => l.trim().split('|').map(Number) as [number, number])
  const updates = b
    .trim()
    .split('\n')
    .map(l => l.trim().split(',').map(Number))

  let sum = 0
  outer: for (const update of updates) {
    for (let i = 0; i < update.length - 1; ++i) {
      const a = update[i]
      const b = update[i + 1]

      // Do we have a rule exluding this?
      const excluded = orderings.some(([x, y]) => x === b && y === a)
      if (excluded) continue outer
    }
    sum += update[Math.floor(update.length / 2)]
  }
  return sum
}

const check = (
  update: number[],
  orderings: [number, number][],
): { ok: boolean; badIndex: number } => {
  for (let i = 0; i < update.length - 1; ++i) {
    const a = update[i]
    const b = update[i + 1]

    // Do we have a rule exluding this?
    const excluded = orderings.some(([x, y]) => x === b && y === a)
    if (excluded) {
      return { ok: false, badIndex: i }
    }
  }
  return { ok: true, badIndex: -1 }
}

const fix = (update: number[], orderings: [number, number][]): number[] => {
  while (true) {
    const { ok, badIndex } = check(update, orderings)
    if (ok) return update
    const a = update[badIndex]
    const b = update[badIndex + 1]
    update[badIndex] = b
    update[badIndex + 1] = a
  }
}

export const part2 = (input: string): number => {
  const [a, b] = input.trim().split('\n\n')

  const orderings = a
    .trim()
    .split('\n')
    .map(l => l.trim().split('|').map(Number) as [number, number])
  const updates = b
    .trim()
    .split('\n')
    .map(l => l.trim().split(',').map(Number))

  let sum = 0
  for (const update of updates) {
    const { ok } = check(update, orderings)
    if (ok) continue
    const fixed = fix(update, orderings)
    sum += fixed[Math.floor(fixed.length / 2)]
  }
  return sum
}
