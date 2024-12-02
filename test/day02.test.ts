import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day2 from '../src/day02'

describe('d2:p1', () => {
  it('should solve the example input', () => {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

    expect(day2.part1(input)).toEqual(2)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day02.txt'),
      'utf-8',
    )
    expect(day2.part1(input)).toEqual(663)
  })
})

describe('d2:p2', () => {
  it('should solve the example input', () => {
    const input = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

    expect(day2.part2(input)).toEqual(4)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day02.txt'),
      'utf-8',
    )
    expect(day2.part2(input)).toEqual(692)
  })
})
