type Node = { type: string; x: number; y: number }
type XYString = `${number},${number}`

const parse = (
  input: string,
): { nodes: Node[]; types: string[]; w: number; h: number } => {
  const nodes: Node[] = []
  const lines = input
    .trim()
    .split('\n')
    .map(l => l.trim().split(''))
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      if (lines[y][x] === '.') continue
      nodes.push({ type: lines[y][x], x, y })
    }
  }
  return {
    nodes,
    types: Array.from(new Set(nodes.map(n => n.type))),
    w: lines[0].length,
    h: lines.length,
  }
}

export const part1 = (input: string): number => {
  const { nodes, types, w, h } = parse(input)
  const antiNodes = new Set<XYString>()
  for (const type of types) {
    // Calculate all anti-nodes of this type
    const typeNodes = nodes.filter(n => n.type === type)
    for (let i = 0; i < typeNodes.length - 1; ++i) {
      for (let j = i + 1; j < typeNodes.length; ++j) {
        const dx = typeNodes[i].x - typeNodes[j].x
        const dy = typeNodes[i].y - typeNodes[j].y
        // Generate the two anti-nodes from i
        const antiNodeA = { x: typeNodes[i].x + dx, y: typeNodes[i].y + dy }
        const antiNodeB = { x: typeNodes[j].x - dx, y: typeNodes[j].y - dy }
        if (
          antiNodeA.x >= 0 &&
          antiNodeA.x < w &&
          antiNodeA.y >= 0 &&
          antiNodeA.y < h
        )
          antiNodes.add(`${antiNodeA.x},${antiNodeA.y}`)
        if (
          antiNodeB.x >= 0 &&
          antiNodeB.x < w &&
          antiNodeB.y >= 0 &&
          antiNodeB.y < h
        )
          antiNodes.add(`${antiNodeB.x},${antiNodeB.y}`)
      }
    }
  }
  return antiNodes.size
}

export const part2 = (input: string): number => {
  const { nodes, types, w, h } = parse(input)
  const antiNodes = new Set<XYString>()
  for (const n of nodes) {
    antiNodes.add(`${n.x},${n.y}`)
  }
  for (const type of types) {
    // Calculate all anti-nodes of this type
    const typeNodes = nodes.filter(n => n.type === type)
    for (let i = 0; i < typeNodes.length - 1; ++i) {
      for (let j = i + 1; j < typeNodes.length; ++j) {
        const dx = typeNodes[i].x - typeNodes[j].x
        const dy = typeNodes[i].y - typeNodes[j].y
        // Generate all negative anti nodes
        for (let k = 1; ; ++k) {
          const antiNode = {
            x: typeNodes[i].x + k * dx,
            y: typeNodes[i].y + k * dy,
          }
          if (
            antiNode.x < 0 ||
            antiNode.x >= w ||
            antiNode.y < 0 ||
            antiNode.y >= h
          )
            break
          antiNodes.add(`${antiNode.x},${antiNode.y}`)
        }
        for (let k = 1; ; ++k) {
          const antiNode = {
            x: typeNodes[j].x - k * dx,
            y: typeNodes[j].y - k * dy,
          }
          if (
            antiNode.x < 0 ||
            antiNode.x >= w ||
            antiNode.y < 0 ||
            antiNode.y >= h
          )
            break
          antiNodes.add(`${antiNode.x},${antiNode.y}`)
        }
      }
    }
  }
  return antiNodes.size
}
