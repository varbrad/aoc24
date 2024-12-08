import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day6 from '../src/day06'

describe('d6:p1', () => {
  it('should solve the example input', () => {
    const input = `
    ....#.....
    .........#
    ..........
    ..#.......
    .......#..
    ..........
    .#..^.....
    ........#.
    #.........
    ......#...`

    expect(day6.part1(input)).toEqual(41)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day06.txt'),
      'utf-8',
    )
    expect(day6.part1(input)).toEqual(5242)
  })
})

describe('d6:p2', () => {
  it('should solve the example input', () => {
    const input = `
    ....#.....
    .........#
    ..........
    ..#.......
    .......#..
    ..........
    .#..^.....
    ........#.
    #.........
    ......#...`

    expect(day6.part2(input)).toEqual(6)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day06.txt'),
      'utf-8',
    )
    expect(day6.part2(input)).toEqual(1424)
  })
})
