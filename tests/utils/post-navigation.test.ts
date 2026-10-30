import { describe, expect, it } from 'vitest'
import {
  WORDS_PER_MINUTE,
  adjacentPosts,
  countWords,
  readingMinutes,
  type NavigablePost,
} from '#utils/post-navigation'

const post = (id: string, pubDate: string, publish = true): NavigablePost => ({
  id,
  data: { pubDate: new Date(pubDate), publish },
})

const ids = ({ older, newer }: ReturnType<typeof adjacentPosts<NavigablePost>>) => ({
  older: older?.id,
  newer: newer?.id,
})

describe('countWords', () => {
  it('counts link labels but not their targets, and skips Markdown punctuation', () => {
    const body = [
      '## Install it',
      '',
      '- Run the [install command](https://example.com/a/very/long/path) now.',
      '',
      '```bash',
      '/plugin install gleaner',
      '```',
      '',
      '| --- | --- |',
      '![Gleaner icon](/icon.png) <kbd>Enter</kbd>',
    ].join('\n')
    // Install it / Run the install command now. / /plugin install gleaner /
    // Gleaner icon / Enter
    expect(countWords(body)).toBe(14)
  })

  it('reads an empty body as no words', () => {
    expect(countWords('')).toBe(0)
    expect(countWords('  \n# - |  ')).toBe(0)
  })
})

describe('readingMinutes', () => {
  const words = (count: number) => Array.from({ length: count }, () => 'word').join(' ')

  it('rounds up to whole minutes', () => {
    expect(readingMinutes(words(WORDS_PER_MINUTE))).toBe(1)
    expect(readingMinutes(words(WORDS_PER_MINUTE + 1))).toBe(2)
    expect(readingMinutes(words(WORDS_PER_MINUTE * 5))).toBe(5)
  })

  it('never says less than a minute, even with no body', () => {
    expect(readingMinutes('Short.')).toBe(1)
    expect(readingMinutes(undefined)).toBe(1)
  })

  it('takes another reading speed', () => {
    expect(readingMinutes(words(300), 100)).toBe(3)
  })
})

describe('adjacentPosts', () => {
  const posts = [
    post('middle', '2026-10-21'),
    post('newest', '2026-10-25'),
    post('draft', '2026-10-23', false),
    post('oldest', '2026-10-19'),
  ]

  it('links the older and newer published posts, whatever order they arrive in', () => {
    expect(ids(adjacentPosts(posts, 'middle'))).toEqual({ older: 'oldest', newer: 'newest' })
  })

  it('leaves the missing side empty at either end of the series', () => {
    expect(ids(adjacentPosts(posts, 'newest'))).toEqual({ older: 'middle', newer: undefined })
    expect(ids(adjacentPosts(posts, 'oldest'))).toEqual({ older: undefined, newer: 'middle' })
  })

  it('skips drafts, and links nothing from a draft or an unknown id', () => {
    expect(adjacentPosts(posts, 'draft')).toEqual({ older: undefined, newer: undefined })
    expect(adjacentPosts(posts, 'missing')).toEqual({ older: undefined, newer: undefined })
  })

  it('orders posts sharing a day by id, as the homepage does', () => {
    const sameDay = [post('b', '2026-10-25'), post('a', '2026-10-25'), post('c', '2026-10-25')]
    expect(ids(adjacentPosts(sameDay, 'b'))).toEqual({ older: 'c', newer: 'a' })
  })

  it('does not reorder the array it is given', () => {
    const input = [...posts]
    adjacentPosts(input, 'middle')
    expect(input).toEqual(posts)
  })
})
