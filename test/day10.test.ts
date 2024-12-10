import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day10 from '../src/day10'

describe('d10:p1', () => {
  it('should solve the example input', () => {
    const input = `
      89010123
      78121874
      87430965
      96549874
      45678903
      32019012
      01329801
      10456732
    `

    expect(day10.part1(input)).toEqual(36)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day10.txt'),
      'utf-8',
    )
    expect(day10.part1(input)).toEqual(719)
  })
})

describe('d10:p2', () => {
  it('should solve the example input', () => {
    const input = `
      89010123
      78121874
      87430965
      96549874
      45678903
      32019012
      01329801
      10456732
    `

    expect(day10.part2(input)).toEqual(81)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day10.txt'),
      'utf-8',
    )
    expect(day10.part2(input)).toEqual(1530)
  })
})
