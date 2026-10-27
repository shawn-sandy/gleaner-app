// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'

type Post = { id: string; data: { publish: boolean } }

let posts: Post[] = []

vi.mock('astro:content', () => ({
  getCollection: async (_collection: string, filter?: (entry: Post) => boolean) =>
    filter ? posts.filter(filter) : posts,
}))

/** Renders the footer as it appears on the page at `path`. */
async function render(path: string): Promise<string> {
  const { default: Footer } = await import('#components/astro/Footer.astro')
  const container = await AstroContainer.create()
  return container.renderToString(Footer, { request: new Request(`http://localhost${path}`) })
}

/** The footer's same-page links, in document order. */
const jumps = (html: string) =>
  [...html.matchAll(/<a\b[^>]*\bhref="(#[^"]*)"/g)].map(([, href]) => href)

/** The visible text of the paragraph holding the `#how` link. */
const jumpLine = (html: string) =>
  (/<p\b[^>]*>((?:(?!<\/p>)[\s\S])*href="#how"[\s\S]*?)<\/p>/.exec(html)?.[1] ?? '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

describe('Footer', () => {
  beforeEach(() => {
    posts = [{ id: 'release', data: { publish: true } }]
  })

  it('lists the homepage sections on the homepage', async () => {
    expect(jumps(await render('/'))).toEqual([
      '#how',
      '#skills',
      '#install',
      '#requirements',
      '#blog',
    ])
  })

  // Astro drops the space between an element and the text that follows it on
  // the next source line, which would print "Example·Skills".
  it('sets the section links as one dotted line, like the site links', async () => {
    expect(jumpLine(await render('/'))).toBe('Example · Skills · Install · Requirements · Blog')
  })

  it('puts the section links above the site links', async () => {
    const html = await render('/')

    expect(html.indexOf('href="#how"')).toBeGreaterThan(-1)
    expect(html.indexOf('href="#how"')).toBeLessThan(html.indexOf('href="/"'))
  })

  // The sections only exist on the homepage, so anywhere else the links would
  // jump to nothing.
  it('leaves the section links off every other page', async () => {
    expect(jumps(await render('/about'))).toEqual([])
  })
})
