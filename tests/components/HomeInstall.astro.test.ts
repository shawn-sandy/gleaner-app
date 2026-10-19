// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import HomeInstall from '#components/astro/HomeInstall.astro'

async function render(): Promise<string> {
  const container = await AstroContainer.create()
  return container.renderToString(HomeInstall)
}

describe('HomeInstall', () => {
  it('has one h2 and an h3 per platform column', async () => {
    const html = await render()
    const levels = [...html.matchAll(/<h([1-6])\b/g)].map(m => Number(m[1]))

    expect(levels).toEqual([2, 3, 3])
  })

  // Astro drops a line break between text and an inline element that starts
  // the next source line, rendering "chooseAdd" or "marketplace,shawn-sandy".
  it('keeps a space before every inline strong or code that follows text', async () => {
    const html = await render()
    const glued = [...html.matchAll(/([^\s>(])<(strong|code)\b[^>]*>([^<]{0,20})/g)].map(
      m => `${m[1]}${m[3]}`
    )

    expect(glued).toEqual([])
  })
})
