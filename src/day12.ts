const parse = (input: string): string[][] =>
  input
    .trim()
    .split('\n')
    .map(l => l.trim().split(''))

type XYString = `${number},${number}`
type Region = { id: string; area: number; perimeter: number }

const resolveRegion = (
  visited: Set<XYString>,
  grid: string[][],
  x: number,
  y: number,
): Region => {
  const me = grid[y][x]

  const result: Region = { id: me, area: 1, perimeter: 0 }

  const neighbours = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
    .map(([dx, dy]) => ({
      x: x + dx,
      y: y + dy,
      value: grid[y + dy]?.[x + dx] ?? '.',
    }))
    .filter(n => n.value === me)

  result.perimeter = 4 - neighbours.length

  visited.add(`${x},${y}`)

  for (const n of neighbours) {
    if (visited.has(`${n.x},${n.y}`)) continue
    const r = resolveRegion(visited, grid, n.x, n.y)
    result.area += r.area
    result.perimeter += r.perimeter
  }

  return result
}

export const part1 = (input: string): number => {
  const grid = parse(input)

  const visited = new Set<XYString>()
  let sum = 0
  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (visited.has(`${x},${y}`)) continue
      const region = resolveRegion(visited, grid, x, y)
      sum += region.area * region.perimeter
    }
  }

  return sum
}

type Region2 = { id: string; area: number }

const resolveRegion2 = (
  visited: Set<XYString>,
  fencing: Set<XYString>,
  grid: string[][],
  x: number,
  y: number,
): Region2 => {
  const me = grid[y][x]

  const result: Region2 = { id: me, area: 1 }

  const allNeighbours = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ].map(([dx, dy]) => ({
    dx,
    dy,
    x: x + dx,
    y: y + dy,
    value: grid[y + dy]?.[x + dx] ?? '.',
  }))

  visited.add(`${x},${y}`)

  for (const n of allNeighbours) {
    if (n.value === me) continue
    fencing.add(`${n.x * 3 + n.dx},${n.y * 3 + n.dy}`)
  }

  const neighbours = allNeighbours.filter(n => n.value === me)

  for (const n of neighbours) {
    if (visited.has(`${n.x},${n.y}`)) continue
    const r = resolveRegion2(visited, fencing, grid, n.x, n.y)
    result.area += r.area
  }

  return result
}

const resolvePosition = (xy: XYString, fencing: Set<XYString>): void => {
  fencing.delete(xy)
  const [x, y] = xy.split(',').map(Number)
  const neighbours = [
    [-3, 0],
    [3, 0],
    [0, -3],
    [0, 3],
  ].map(([dx, dy]) => `${x + dx},${y + dy}` as XYString)
  for (const n of neighbours) {
    if (fencing.has(n)) {
      resolvePosition(n, fencing)
    }
  }
}

const calculateSides = (fencing: Set<XYString>): number => {
  let sum = 0
  while (fencing.size > 0) {
    const value = fencing.values().next().value
    if (value === undefined) break
    resolvePosition(value, fencing)
    sum++
  }
  return sum
}

export const part2 = (input: string): number => {
  const grid = parse(input)

  const visited = new Set<XYString>()
  let sum = 0
  for (let y = 0; y < grid.length; ++y) {
    for (let x = 0; x < grid[y].length; ++x) {
      if (visited.has(`${x},${y}`)) continue
      const fencing = new Set<XYString>()
      const region = resolveRegion2(visited, fencing, grid, x, y)
      const sides = calculateSides(fencing)
      sum += region.area * sides
    }
  }

  return sum
}
