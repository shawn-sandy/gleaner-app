// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'

type Post = {
  id: string
  data: { title: string; description: string; pubDate: Date; publish: boolean }
}

let posts: Post[] = []

vi.mock('astro:content', () => ({
  getCollection: async (_collection: string, filter?: (entry: Post) => boolean) =>
    filter ? posts.filter(filter) : posts,
}))

const post = (id: string, pubDate: string, publish = true): Post => ({
  id,
  data: { title: `Title ${id}`, description: `About ${id}`, pubDate: new Date(pubDate), publish },
})

const originalTimeZone = process.env.TZ

async function render(): Promise<string> {
  const { default: HomeBlog } = await import('#components/astro/HomeBlog.astro')
  const container = await AstroContainer.create()
  return container.renderToString(HomeBlog)
}

/** The post ids the section links to, in document order. */
const linkedIds = (html: string) =>
  [...html.matchAll(/href="\/posts\/([^"]+)"/g)].map(match => match[1])

describe('HomeBlog', () => {
  beforeEach(() => {
    posts = []
  })

  afterEach(() => {
    // Assigning `undefined` to an env var stores the string "undefined".
    if (originalTimeZone === undefined) delete process.env.TZ
    else process.env.TZ = originalTimeZone
  })

  it('features the newest published post, then lists the rest newest first', async () => {
    posts = [
      post('older', '2026-10-01'),
      post('draft', '2026-10-30', false),
      post('newest', '2026-10-21'),
      post('middle', '2026-10-19'),
    ]
    const html = await render()

    expect(linkedIds(html)).toEqual(['newest', 'middle', 'older'])
    const featured = /<article\b[\s\S]*?<\/article>/.exec(html)?.[0] ?? ''
    expect(featured).toContain('Title newest')
    expect(featured).not.toContain('Title middle')
    expect(html).toContain('href="/blog"')
  })

  // Safari drops list semantics, and the list's label with them, from a list
  // styled `list-style: none` unless it carries `role="list"`.
  it('keeps the earlier list a list in Safari', async () => {
    posts = [post('newest', '2026-10-21'), post('older', '2026-10-19')]
    const html = await render()

    expect(html).toMatch(/<ul\b[^>]*\brole="list"/)
  })

  it('caps the section at four posts', async () => {
    posts = ['01', '02', '03', '04', '05', '06'].map(day => post(day, `2026-10-${day}`))
    const html = await render()

    expect(linkedIds(html)).toEqual(['06', '05', '04', '03'])
  })

  it('orders same-day posts the same way whatever order the collection returns', async () => {
    const sameDay = [post('alpha', '2026-10-21'), post('beta', '2026-10-21')]
    posts = sameDay
    const forward = linkedIds(await render())
    posts = [...sameDay].reverse()
    const reversed = linkedIds(await render())

    expect(forward).toEqual(reversed)
  })

  it('dates a post by its frontmatter day in a western time zone', async () => {
    // `pubDate: 2026-10-21` is midnight UTC: 8 p.m. on October 20 in New York.
    process.env.TZ = 'America/New_York'
    posts = [post('newest', '2026-10-21')]
    const html = await render()
    const time = /<time\b[^>]*datetime="([^"]+)"[^>]*>([^<]*)<\/time>/.exec(html)

    expect(time?.[1]).toBe('2026-10-21')
    expect(time?.[2]).toContain('21')
  })

  it('leaves out the earlier list when there is only one post', async () => {
    posts = [post('only', '2026-10-21')]
    const html = await render()

    expect(linkedIds(html)).toEqual(['only'])
    expect(html).not.toMatch(/<ul\b/)
  })

  it('renders nothing when no post is published', async () => {
    posts = [post('draft', '2026-10-21', false)]
    const html = await render()

    expect(html).not.toMatch(/<section\b/)
  })
})
