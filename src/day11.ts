const parse = (input: string): Map<number, number> => {
  const ns = input.trim().split(' ').map(Number)
  const map = new Map<number, number>()
  for (let i = 0; i < ns.length; ++i) {
    map.set(ns[i], (map.get(ns[i]) ?? 0) + 1)
  }
  return map
}

const nextStones = (stone: number): number[] => {
  if (stone === 0) return [1]

  const asString = String(stone)
  if (asString.length % 2 === 0)
    return [
      Number(asString.slice(0, asString.length / 2)),
      Number(asString.slice(asString.length / 2)),
    ]

  return [stone * 2024]
}

const calculateLength = (input: string, loops: 25 | 75): number => {
  let stones = parse(input)

  for (let i = 0; i < loops; ++i) {
    const nextMap = new Map<number, number>()
    for (const [n, total] of stones) {
      const next = nextStones(n)
      for (const m of next) {
        nextMap.set(m, (nextMap.get(m) ?? 0) + total)
      }
    }
    stones = nextMap
  }

  return Array.from(stones.values()).reduce((acc, n) => acc + n, 0)
}

export const part1 = (input: string): number => calculateLength(input, 25)
export const part2 = (input: string): number => calculateLength(input, 75)
