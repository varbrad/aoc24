const parse = (input: string): { target: number; values: number[] }[] =>
  input
    .trim()
    .split('\n')
    .map(row => {
      const [a, b] = row.split(': ')
      return {
        target: Number(a.trim()),
        values: b.trim().split(' ').map(Number),
      }
    })

export const canBeSolved = (
  target: number,
  values: number[],
  withConcat?: boolean,
): boolean => {
  // If we have only 1 value left, does the target equal it?
  if (values.length === 1) return target === values[0]

  const lastValue = values[values.length - 1]

  const next = []
  const div = target / lastValue
  if (Number.isInteger(div)) next.push(div)

  if (withConcat && String(target).endsWith(String(lastValue)))
    next.push(Number(String(target).slice(0, -String(lastValue).length)))

  const sub = target - lastValue
  if (sub > 0) next.push(sub)

  return next.some(n => canBeSolved(n, values.slice(0, -1), withConcat))
}

const solve = (rows: ReturnType<typeof parse>, withConcat?: boolean) =>
  rows.reduce(
    (acc, { target, values }) =>
      acc + (canBeSolved(target, values, withConcat) ? target : 0),
    0,
  )

export const part1 = (input: string): number => solve(parse(input))
export const part2 = (input: string): number => solve(parse(input), true)
