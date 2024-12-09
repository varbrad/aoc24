import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day9 from '../src/day09'

describe('d9:p1', () => {
  it('should solve the example input', () => {
    const input = '2333133121414131402'

    expect(day9.part1(input)).toEqual(1928)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day09.txt'),
      'utf-8',
    )
    expect(day9.part1(input)).toEqual(6337921897505)
  })
})

describe('d9:p2', () => {
  it('should solve the example input', () => {
    const input = '2333133121414131402'

    expect(day9.part2(input)).toEqual(2858)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day09.txt'),
      'utf-8',
    )
    expect(day9.part2(input)).toEqual(6362722604045)
  })
})
