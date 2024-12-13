import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day12 from '../src/day12'

describe('d12:p1', () => {
  it('should solve the example input', () => {
    const input = `
      RRRRIICCFF
      RRRRIICCCF
      VVRRRCCFFF
      VVRCCCJFFF
      VVVVCJJCFE
      VVIVCCJJEE
      VVIIICJJEE
      MIIIIIJJEE
      MIIISIJEEE
      MMMISSJEEE
    `

    expect(day12.part1(input)).toEqual(1930)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day12.txt'),
      'utf-8',
    )
    expect(day12.part1(input)).toEqual(1361494)
  })
})

describe('d12:p2', () => {
  it('should solve the example input', () => {
    const input = `
      AAAAAA
      AAABBA
      AAABBA
      ABBAAA
      ABBAAA
      AAAAAA
    `

    expect(day12.part2(input)).toEqual(368)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day12.txt'),
      'utf-8',
    )
    expect(day12.part2(input)).toEqual(830516)
  })
})
