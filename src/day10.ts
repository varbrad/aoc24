type XYString = `${number},${number}`

const parse = (input: string): number[][] =>
  input
    .trim()
    .split('\n')
    .map(l => l.trim().split('').map(Number))

const solve = (
  grid: number[][],
  set: Set<XYString>,
  x: number,
  y: number,
): void => {
  const value = grid[y][x]
  if (value === 9) {
    set.add(`${x},${y}`)
    return
  }

  if (grid[y][x - 1] === value + 1) solve(grid, set, x - 1, y)
  if (grid[y][x + 1] === value + 1) solve(grid, set, x + 1, y)
  if (grid[y - 1]?.[x] === value + 1) solve(grid, set, x, y - 1)
  if (grid[y + 1]?.[x] === value + 1) solve(grid, set, x, y + 1)
}

export const part1 = (input: string): number => {
  const grid = parse(input)

  let sum = 0

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === 0) {
        const set = new Set<XYString>()
        solve(grid, set, x, y)
        sum += set.size
      }
    }
  }

  return sum
}

const solve2 = (grid: number[][], x: number, y: number): number => {
  const value = grid[y][x]
  if (value === 9) return 1

  let sum = 0

  if (grid[y][x - 1] === value + 1) sum += solve2(grid, x - 1, y)
  if (grid[y][x + 1] === value + 1) sum += solve2(grid, x + 1, y)
  if (grid[y - 1]?.[x] === value + 1) sum += solve2(grid, x, y - 1)
  if (grid[y + 1]?.[x] === value + 1) sum += solve2(grid, x, y + 1)

  return sum
}

export const part2 = (input: string): number => {
  const grid = parse(input)

  let sum = 0

  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (grid[y][x] === 0) {
        sum += solve2(grid, x, y)
      }
    }
  }

  return sum
}
