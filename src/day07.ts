type Row = { target: number; values: number[] }

const parse = (input: string): Row[] =>
  input
    .trim()
    .split('\n')
    .map(r => {
      const [target, values] = r.split(': ')
      return {
        target: Number(target),
        values: values.trim().split(' ').map(Number),
      }
    })

type Ops = '+' | '*' | '|'

const calc = (a: number, b: number, op: Ops): number => {
  switch (op) {
    case '+':
      return a + b
    case '*':
      return a * b
    case '|':
      return Number(`${a}${b}`)
  }
}

const canSolveInstance = (row: Row, ops: Ops[]): boolean => {
  let total = row.values[0]
  for (let i = 1; i < row.values.length; i++) {
    total = calc(total, row.values[i], ops[i - 1])
  }
  return total === row.target
}

const permuteCache: Map<string, Ops[][]> = new Map()
const generatePermutations = (length: number, withConcat: boolean): Ops[][] => {
  const cacheValue = permuteCache.get(`${length}-${withConcat}`)
  if (cacheValue !== undefined) return cacheValue

  const result: Ops[][] = []

  const generate = (current: Ops[]): void => {
    // Base case: If the current string reaches the desired length, add it to the result
    if (current.length === length) {
      result.push(current)
      return
    }

    generate([...current, '*'])
    generate([...current, '+'])
    if (withConcat) generate([...current, '|'])
  }

  generate([])
  permuteCache.set(`${length}-${withConcat}`, result)
  return result
}

const canSolve = (row: Row, withConcat: boolean): boolean =>
  generatePermutations(row.values.length - 1, withConcat).some(op =>
    canSolveInstance(row, op),
  )

export const part1 = (input: string): number =>
  parse(input).reduce(
    (acc, row) => acc + (canSolve(row, false) ? row.target : 0),
    0,
  )

export const part2 = (input: string): number =>
  parse(input).reduce(
    (acc, row) => acc + (canSolve(row, true) ? row.target : 0),
    0,
  )
