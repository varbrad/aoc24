import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day4 from '../src/day04'

describe('d4:p1', () => {
  it('should solve the example input', () => {
    const input = `
      MMMSXXMASM
      MSAMXMSMSA
      AMXSXMAAMM
      MSAMASMSMX
      XMASAMXAMM
      XXAMMXXAMA
      SMSMSASXSS
      SAXAMASAAA
      MAMMMXMMMM
      MXMXAXMASX`

    expect(day4.part1(input)).toEqual(18)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day04.txt'),
      'utf-8',
    )
    expect(day4.part1(input)).toEqual(2524)
  })
})

describe('d4:p2', () => {
  it('should solve the example input', () => {
    const input = `
      MMMSXXMASM
      MSAMXMSMSA
      AMXSXMAAMM
      MSAMASMSMX
      XMASAMXAMM
      XXAMMXXAMA
      SMSMSASXSS
      SAXAMASAAA
      MAMMMXMMMM
      MXMXAXMASX`

    expect(day4.part2(input)).toEqual(9)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day04.txt'),
      'utf-8',
    )
    expect(day4.part2(input)).toEqual(1873)
  })
})
