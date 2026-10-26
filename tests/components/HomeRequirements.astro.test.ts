// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import HomeRequirements from '#components/astro/HomeRequirements.astro'

async function render(): Promise<string> {
  const container = await AstroContainer.create()
  return container.renderToString(HomeRequirements)
}

describe('HomeRequirements', () => {
  it('has one h2 and an h3 per platform card', async () => {
    const html = await render()
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map(m => Number(m[1]))

    expect(levels).toEqual([2, 3, 3])
  })

  // Each card's lists are named by their own visible "Required" / "Optional"
  // label, so a screen reader announces which list it is in. Unique ids keep
  // the second card's lists from borrowing the first card's labels.
  it('names every list by its own Required or Optional label', async () => {
    const html = await render()
    const labelledBy = [...html.matchAll(/<ul\b[^>]*\baria-labelledby="([^"]+)"/g)].map(m => m[1])
    const labelText = (id: string) =>
      html.match(new RegExp(`<p\\b[^>]*\\bid="${id}"[^>]*>\\s*([^<]*?)\\s*</p>`))?.[1]

    expect(html.match(/<ul\b/g)?.length).toBe(4)
    expect(new Set(labelledBy).size).toBe(4)
    expect(labelledBy.map(labelText)).toEqual(['Required', 'Optional', 'Required', 'Optional'])
  })

  it('links to the requirements doc on GitHub', async () => {
    const html = await render()

    expect(html).toContain(
      'href="https://github.com/shawn-sandy/gleaner/blob/main/docs/requirements.md"'
    )
  })
})
