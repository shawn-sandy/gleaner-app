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

  // Each card's lists are named by their visible "Required" / "Optional"
  // label, so a screen reader announces which list it is in.
  it('names every list by a label that exists', async () => {
    const html = await render()
    const lists = [...html.matchAll(/<ul\b[^>]*>/g)].map(m => m[0])
    const labelledBy = lists.map(tag => tag.match(/aria-labelledby="([^"]+)"/)?.[1])
    const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]))

    expect(lists.length).toBe(4)
    for (const id of labelledBy) expect(id && ids.has(id), `list labelled by "${id}"`).toBe(true)
  })

  it('links to the requirements doc on GitHub', async () => {
    const html = await render()

    expect(html).toContain(
      'href="https://github.com/shawn-sandy/gleaner/blob/main/docs/requirements.md"'
    )
  })

  // Astro drops a line break between text and an inline element that starts
  // the next source line (see HomeInstall.astro.test.ts).
  it('keeps a space around every inline element that meets text', async () => {
    const html = await render()
    const inline = 'strong|code|em|a'
    const glued = [
      new RegExp(`[^\\s>(]<(?:${inline})\\b[^>]*>[^<]{0,20}`, 'g'), // text<code>
      new RegExp(`</(?:${inline})>[\\w(]`, 'g'), // </code>text
      new RegExp(`</(?:${inline})><(?:${inline})\\b`, 'g'), // </strong><code>
    ].flatMap(pattern => html.match(pattern) ?? [])

    expect(glued).toEqual([])
  })
})
