type Block = { id: number; size: number; pos: number }

const parse = (input: string): (number | null)[] => {
  const ns = input.trim().split('').map(Number)

  const hdd: (number | null)[] = []
  for (const [ix, size] of ns.entries()) {
    const isBlock = ix % 2 === 0

    for (let i = 0; i < size; ++i) {
      hdd.push(isBlock ? ix / 2 : null)
    }
  }

  return hdd
}

export const part1 = (input: string): number => {
  const hdd = parse(input)
  const emptyIndexes = hdd
    .map((slot, ix) => (slot === null ? ix : null))
    .filter((x): x is number => x !== null)
    .reverse()

  for (let i = hdd.length - 1; i >= 0; --i) {
    const v = hdd[i]
    if (v === null) {
      emptyIndexes.shift()
      continue
    }
    const ix = emptyIndexes.pop()
    if (ix === undefined) {
      // We can't do any more moving, break
      break
    }
    hdd[ix] = v
    hdd[i] = null
  }

  const checksum = hdd
    .map((id, ix) => (id === null ? 0 : id * ix))
    .reduce((a, b) => a + b, 0)

  return checksum
}

const parse2 = (input: string): Block[] => {
  const ns = input.trim().split('').map(Number)

  const hdd: Block[] = []
  let pos = 0
  for (const [ix, size] of ns.entries()) {
    const isBlock = ix % 2 === 0

    hdd.push({
      id: isBlock ? ix / 2 : -1,
      size,
      pos,
    })

    pos += size
  }

  return hdd
}

export const part2 = (input: string): number => {
  const hdd = parse2(input)

  const emptyBlocks = hdd.filter(block => block.id === -1)
  const blocksToMove = hdd.filter(block => block.id !== -1)

  for (let i = blocksToMove.length - 1; i >= 0; --i) {
    const block = blocksToMove[i]
    // Try and move this block by searching empty blocks
    for (let j = 0; j < emptyBlocks.length; ++j) {
      const emptyBlock = emptyBlocks[j]
      // If this block is behind our pos, then ignore
      if (block.pos < emptyBlock.pos) continue
      // Can we fit in this block?
      const canFit = block.size <= emptyBlock.size
      if (!canFit) continue

      // We now need to create an empty space where the block was
      emptyBlocks.push({
        id: -1,
        size: block.size,
        pos: block.pos,
      })

      // We can fit, lets move to the empty block space
      block.pos = emptyBlock.pos

      // We can fit, work out if we have remaining space, as we will need to shrink the empty block and pos
      const remainingSpace = emptyBlock.size - block.size

      // If there is no space, remove the empty block
      if (remainingSpace === 0) {
        emptyBlock.size = 0
      } else {
        // We have a bit of free space, lets move the empty block pos by the block size
        emptyBlock.pos += block.size
        emptyBlock.size = remainingSpace
      }
      break
    }

    // Do any empty blocks need to be merged?
    emptyBlocks.sort((a, b) => a.pos - b.pos)
    for (let i = emptyBlocks.length - 1; i >= 1; --i) {
      const n = emptyBlocks[i - 1]
      const m = emptyBlocks[i]
      if (n.pos + n.size === m.pos) {
        n.size += m.size
        emptyBlocks.splice(i, 1)
      }
    }
  }

  const final = [...emptyBlocks, ...blocksToMove].sort((a, b) => a.pos - b.pos)
  const checksum = final
    .map(block => {
      if (block.id === -1) return 0
      let sum = 0
      for (let i = 0; i < block.size; ++i) {
        sum += block.id * (block.pos + i)
      }
      return sum
    })
    .reduce((a, b) => a + b, 0)

  return checksum
}
