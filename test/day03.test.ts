import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day3 from '../src/day03'

describe('d3:p1', () => {
  it('should solve the example input', () => {
    const input =
      'xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))'

    expect(day3.part1(input)).toEqual(161)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day03.txt'),
      'utf-8',
    )
    expect(day3.part1(input)).toEqual(166905464)
  })
})

describe('d3:p2', () => {
  it('should solve the example input', () => {
    const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

    expect(day3.part2(input)).toEqual(48)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day03.txt'),
      'utf-8',
    )
    expect(day3.part2(input)).toEqual(72948684)
  })
})
