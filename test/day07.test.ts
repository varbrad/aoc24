import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day7 from '../src/day07'

describe('d7:p1', () => {
  it('should solve the example input', () => {
    const input = `
    190: 10 19
    3267: 81 40 27
    83: 17 5
    156: 15 6
    7290: 6 8 6 15
    161011: 16 10 13
    192: 17 8 14
    21037: 9 7 18 13
    292: 11 6 16 20`

    expect(day7.part1(input)).toEqual(3749)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day07.txt'),
      'utf-8',
    )
    expect(day7.part1(input)).toEqual(1289579105366)
  })
})

describe('d7:p2', () => {
  it('should solve the example input', () => {
    const input = `
    190: 10 19
    3267: 81 40 27
    83: 17 5
    156: 15 6
    7290: 6 8 6 15
    161011: 16 10 13
    192: 17 8 14
    21037: 9 7 18 13
    292: 11 6 16 20`

    expect(day7.part2(input)).toEqual(11387)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day07.txt'),
      'utf-8',
    )
    expect(day7.part2(input)).toEqual(92148721834692)
  })
})
