import { describe, expect, it } from 'bun:test'
import fs from 'node:fs/promises'
import path from 'node:path'
import * as day5 from '../src/day05'

describe('d5:p1', () => {
  it('should solve the example input', () => {
    const input = `47|53
      29|13
      47|13
      47|29
      47|61
      53|13
      53|29
      61|13
      61|29
      61|53
      75|13
      75|29
      75|47
      75|53
      75|61
      97|13
      97|29
      97|47
      97|53
      97|61
      97|75

      75,47,61,53,29
      97,61,53,29,13
      75,29,13
      75,97,47,61,53
      61,13,29
      97,13,75,29,47`

    expect(day5.part1(input)).toEqual(143)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day05.txt'),
      'utf-8',
    )
    expect(day5.part1(input)).toEqual(6034)
  })
})

describe('d5:p2', () => {
  it('should solve the example input', () => {
    const input = `47|53
      29|13
      47|13
      47|29
      47|61
      53|13
      53|29
      61|13
      61|29
      61|53
      75|13
      75|29
      75|47
      75|53
      75|61
      97|13
      97|29
      97|47
      97|53
      97|61
      97|75

      75,47,61,53,29
      97,61,53,29,13
      75,29,13
      75,97,47,61,53
      61,13,29
      97,13,75,29,47`

    expect(day5.part2(input)).toEqual(123)
  })

  it('should solve the puzzle input', async () => {
    const input = await fs.readFile(
      path.resolve(__dirname, '../input/day05.txt'),
      'utf-8',
    )
    expect(day5.part2(input)).toEqual(6305)
  })
})
