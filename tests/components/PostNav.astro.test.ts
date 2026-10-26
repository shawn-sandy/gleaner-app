// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import PostNav, { type Props } from '#components/astro/PostNav.astro'

async function render(props: Props): Promise<string> {
  const container = await AstroContainer.create()
  return container.renderToString(PostNav, { props })
}

describe('PostNav', () => {
  it('links the older post as prev and the newer post as next', async () => {
    const html = await render({
      older: { id: 'gleaner-2-10', title: 'Gleaner 2.10' },
      newer: { id: 'gleaner-2-12', title: 'Gleaner 2.12' },
    })
    expect(html).toContain('aria-label="More posts"')
    expect(html).toMatch(/href="\/posts\/gleaner-2-10"[^>]*rel="prev"/)
    expect(html).toMatch(/href="\/posts\/gleaner-2-12"[^>]*rel="next"/)
    expect(html.indexOf('Older post')).toBeLessThan(html.indexOf('Newer post'))
  })

  it('shows only the side that exists', async () => {
    const html = await render({ older: undefined, newer: { id: 'next', title: 'Next' } })
    expect(html).toContain('Newer post')
    expect(html).not.toContain('Older post')
  })

  it('renders nothing for a post with no neighbours', async () => {
    const html = await render({ older: undefined, newer: undefined })
    expect(html).not.toContain('<nav')
  })
})
