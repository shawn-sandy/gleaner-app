// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import HomeFeatures from '#components/astro/HomeFeatures.astro'

async function render(): Promise<string> {
  const container = await AstroContainer.create()
  return container.renderToString(HomeFeatures)
}

describe('HomeFeatures', () => {
  it('labels the sample clip as an example so it never reads as a real one', async () => {
    const html = await render()
    const caption = /<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/.exec(html)?.[1] ?? ''

    expect(caption, 'the sample clip has no caption').not.toBe('')
    expect(caption.replace(/<[^>]*>/g, ' ')).toMatch(/\bExample\b/)
  })

  it('never skips a heading level below its single h2', async () => {
    const html = await render()
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map(m => Number(m[1]))

    expect(
      levels.filter(level => level === 2),
      'the section needs exactly one h2'
    ).toHaveLength(1)
    expect(levels[0]).toBe(2)
    levels.forEach((level, i) => {
      if (i > 0) expect(level - (levels[i - 1] as number)).toBeLessThanOrEqual(1)
    })
  })

  it('states as many skills in the lede as it renders cards', async () => {
    const html = await render()
    const numbers = ['one', 'two', 'three', 'four', 'five', 'six']
    const stated = /\b(\d+|one|two|three|four|five|six)\s+skills\b/i.exec(
      html.replace(/<[^>]*>/g, ' ')
    )?.[1]
    const cards = html.match(/<li\b[^>]*class="[^"]*\bskill-card\b(?!_)/g) ?? []

    expect(stated, 'the lede no longer states how many skills there are').toBeDefined()
    expect(cards.length, 'no skill cards rendered').toBeGreaterThan(0)
    const count = Number(stated) || numbers.indexOf((stated as string).toLowerCase()) + 1
    expect(count).toBe(cards.length)
  })

  it('hides the numbered markers from screen readers, leaving the meaning to the list', async () => {
    const html = await render()
    const markers = [...html.matchAll(/<span\b[^>]*class="[^"]*home-features__marker[^"]*"[^>]*>/g)]

    expect(markers.length, 'no numbered markers rendered').toBeGreaterThan(0)
    for (const [tag] of markers) expect(tag).toMatch(/\baria-hidden="true"/)
    expect(html).toMatch(/<ol\b[^>]*aria-label="[^"]+"/)
  })
})
