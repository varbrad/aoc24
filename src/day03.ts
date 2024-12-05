const regex = /mul\((\d{1,3}),(\d{1,3})\)/g
export const part1 = (input: string): number => {
  let sum = 0
  for (const match of input.matchAll(regex)) {
    const [_, a, b] = match
    sum += Number(a) * Number(b)
  }
  return sum
}

const regex2 = /mul\((\d{1,3}),(\d{1,3})\)|don't\(\)|do\(\)/g
export const part2 = (input: string): number => {
  let sum = 0
  let enabled = true
  for (const match of input.matchAll(regex2)) {
    const [op, a, b] = match
    switch (op) {
      case 'do()':
        enabled = true
        break
      case "don't()":
        enabled = false
        break
      default:
        sum += enabled ? Number(a) * Number(b) : 0
    }
  }
  return sum
}
