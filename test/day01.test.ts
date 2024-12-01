import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day1 from '../src/day01'

describe('d1:p1', () => {
  it('should solve the example input', () => {
    const input = `3   4
4   3
2   5
1   3
3   9
3   3
`

    expect(day1.part1(input)).toEqual(11)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day01.txt'),
      'utf-8',
    )
    expect(day1.part1(input)).toEqual(1222801)
  })
})

describe('d1:p2', () => {
  it('should solve the example input', () => {
    const input = `3   4
4   3
2   5
1   3
3   9
3   3
`

    expect(day1.part2(input)).toEqual(31)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day01.txt'),
      'utf-8',
    )
    expect(day1.part2(input)).toEqual(22545250)
  })
})
