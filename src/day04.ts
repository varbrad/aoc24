type XY = `${number},${number}`

const parse = (
  input: string,
): { map: Map<XY, string>; w: number; h: number } => {
  const map = new Map<XY, string>()
  const lines = input
    .trim()
    .split('\n')
    .map(l => l.trim().split(''))
  lines.forEach((row, y) => {
    row.forEach((c, x) => {
      map.set(`${x},${y}` as XY, c)
    })
  })
  return { map, w: lines[0].length, h: lines.length }
}

const check = (
  map: Map<XY, string>,
  x: number,
  y: number,
  dx: number,
  dy: number,
  word: string,
): boolean => {
  const value = map.get(`${x},${y}`)
  if (value === undefined || value !== word[0]) return false
  if (word.length === 1) return true
  return check(map, x + dx, y + dy, dx, dy, word.slice(1))
}

export const part1 = (input: string): number => {
  const { map, w, h } = parse(input)
  let ok = 0
  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      // horizontal left
      ok += check(map, x, y, -1, 0, 'XMAS') ? 1 : 0
      // horizontal right
      ok += check(map, x, y, 1, 0, 'XMAS') ? 1 : 0
      // vertical up
      ok += check(map, x, y, 0, -1, 'XMAS') ? 1 : 0
      // vertical down
      ok += check(map, x, y, 0, 1, 'XMAS') ? 1 : 0
      // diagonal up-left
      ok += check(map, x, y, -1, -1, 'XMAS') ? 1 : 0
      // diagonal up-right
      ok += check(map, x, y, 1, -1, 'XMAS') ? 1 : 0
      // diagonal down-left
      ok += check(map, x, y, -1, 1, 'XMAS') ? 1 : 0
      // diagonal down-right
      ok += check(map, x, y, 1, 1, 'XMAS') ? 1 : 0
    }
  }
  return ok
}

export const part2 = (input: string): number => {
  const { map, w, h } = parse(input)
  let ok = 0
  for (let y = 0; y < h; ++y) {
    for (let x = 0; x < w; ++x) {
      // Is this a A?
      if (map.get(`${x},${y}`) !== 'A') continue

      // We're at an A, can we find MAS going on the negative diag?
      const negMAS = check(map, x - 1, y - 1, 1, 1, 'MAS')
      const negSAM = check(map, x - 1, y - 1, 1, 1, 'SAM')
      // We're at an A, can we find MAS going on the positive diag?
      const posMAS = check(map, x - 1, y + 1, 1, -1, 'MAS')
      const posSAM = check(map, x - 1, y + 1, 1, -1, 'SAM')

      if ((negMAS || negSAM) && (posMAS || posSAM)) {
        ok += 1
      }
    }
  }

  return ok
}
