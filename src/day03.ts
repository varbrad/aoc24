const regex = /mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g

const solve = (input: string, useConditionals: boolean): number => {
  let sum = 0
  let enabled = true
  for (const match of input.matchAll(regex)) {
    const [op, a, b] = match
    switch (op) {
      case 'do()':
        enabled = true
        break
      case "don't()":
        enabled = false
        break
      default:
        sum += !useConditionals || enabled ? Number(a) * Number(b) : 0
    }
  }
  return sum
}

export const part1 = (input: string): number => solve(input, false)
export const part2 = (input: string): number => solve(input, true)
