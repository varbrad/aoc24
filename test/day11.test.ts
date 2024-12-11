import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day11 from '../src/day11'

describe('d11:p1', () => {
  it('should solve the example input', () => {
    const input = '125 17'

    expect(day11.part1(input)).toEqual(55312)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day11.txt'),
      'utf-8',
    )
    expect(day11.part1(input)).toEqual(209412)
  })
})

describe('d11:p2', () => {
  it('should solve the example input', () => {
    const input = '125 17'

    expect(day11.part2(input)).toEqual(65601038650482)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day11.txt'),
      'utf-8',
    )
    expect(day11.part2(input)).toEqual(248967696501656)
  })
})
