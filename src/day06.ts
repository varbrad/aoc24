type XY = { x: number; y: number }
type XYString = `${number},${number}`

const parse = (
  input: string,
): { obstacles: Set<XYString>; pos: XY; dir: XY; w: number; h: number } => {
  const obstacles = new Set<XYString>()

  let pos: XY | null = null
  const lines = input
    .trim()
    .split('\n')
    .map(l => l.trim().split(''))
  for (const [y, line] of lines.entries()) {
    for (const [x, char] of line.entries()) {
      if (char === '^') pos = { x, y }
      if (char === '#') obstacles.add(`${x},${y}`)
    }
  }

  if (!pos) throw new Error('No starting position found')

  return {
    obstacles,
    pos,
    dir: { x: 0, y: -1 },
    w: lines[0].length,
    h: lines.length,
  }
}

const visitedNodes = (input: string): Set<XYString> => {
  const { obstacles, pos, dir, w, h } = parse(input)

  const visited = new Set<XYString>()
  visited.add(`${pos.x},${pos.y}`)

  while (true) {
    // Step 1: is there a obstacle infront of us?
    const isObstacle = obstacles.has(`${pos.x + dir.x},${pos.y + dir.y}`)
    if (isObstacle) {
      // We need to rotate 90 degrees right
      const newDY = dir.x
      const newDX = -dir.y
      dir.x = newDX
      dir.y = newDY
      continue
    }
    // Step 2: Else, Move forward
    pos.x += dir.x
    pos.y += dir.y
    // Step 3: Ensure we're not off the board, if so, end loop
    if (pos.x < 0 || pos.x >= w || pos.y < 0 || pos.y >= h) break
    visited.add(`${pos.x},${pos.y}`)
  }

  return visited
}

export const part1 = (input: string): number => {
  const { obstacles, pos, dir, w, h } = parse(input)

  const visited = new Set<XYString>()
  visited.add(`${pos.x},${pos.y}`)

  while (true) {
    // Step 1: is there a obstacle infront of us?
    const isObstacle = obstacles.has(`${pos.x + dir.x},${pos.y + dir.y}`)
    if (isObstacle) {
      // We need to rotate 90 degrees right
      const newDY = dir.x
      const newDX = -dir.y
      dir.x = newDX
      dir.y = newDY
      continue
    }
    // Step 2: Else, Move forward
    pos.x += dir.x
    pos.y += dir.y
    // Step 3: Ensure we're not off the board, if so, end loop
    if (pos.x < 0 || pos.x >= w || pos.y < 0 || pos.y >= h) break
    visited.add(`${pos.x},${pos.y}`)
  }

  return visited.size
}

const getsStuckInLoop = (
  pos: XY,
  dir: XY,
  obstacles: Set<XYString>,
  w: number,
  h: number,
): boolean => {
  type Key = `pos:${XYString},dir:${XYString}`
  const cache = new Set<Key>()
  while (true) {
    // Step 0: Are we in a loop?
    const key: Key = `pos:${pos.x},${pos.y},dir:${dir.x},${dir.y}`
    if (cache.has(key)) return true
    // Step 1: is there a obstacle infront of us?
    const isObstacle = obstacles.has(`${pos.x + dir.x},${pos.y + dir.y}`)
    if (isObstacle) {
      // We need to rotate 90 degrees right
      const newDY = dir.x
      const newDX = -dir.y
      dir.x = newDX
      dir.y = newDY
      continue
    }
    // Step 2: Else, Move forward
    pos.x += dir.x
    pos.y += dir.y
    // Step 3: If we're off the board, we're not in a loop
    if (pos.x < 0 || pos.x >= w || pos.y < 0 || pos.y >= h) return false
    // Step 4: Add to cache
    cache.add(key)
  }
}

export const part2 = (input: string): number => {
  const { obstacles, pos, dir, w, h } = parse(input)

  let loops = 0

  const visited = visitedNodes(input)

  for (const node of visited) {
    if (`${pos.x},${pos.y}` === node) continue // Starting spot
    const newObstacles = new Set(obstacles)
    newObstacles.add(node)
    const getsStuck = getsStuckInLoop(
      structuredClone(pos),
      structuredClone(dir),
      newObstacles,
      w,
      h,
    )
    loops += getsStuck ? 1 : 0
  }

  return loops
}
