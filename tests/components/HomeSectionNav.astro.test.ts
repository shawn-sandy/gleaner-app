// @vitest-environment node
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import HomeFeatures from '#components/astro/HomeFeatures.astro'
import HomeHero from '#components/astro/HomeHero.astro'
import HomeInstall from '#components/astro/HomeInstall.astro'
import HomeRequirements from '#components/astro/HomeRequirements.astro'

type Post = {
  id: string
  data: { title: string; description: string; pubDate: Date; publish: boolean }
}

let posts: Post[] = []

vi.mock('astro:content', () => ({
  getCollection: async (_collection: string, filter?: (entry: Post) => boolean) =>
    filter ? posts.filter(filter) : posts,
}))

const post = (publish: boolean): Post => ({
  id: 'release',
  data: { title: 'Release', description: 'What changed', pubDate: new Date('2026-10-21'), publish },
})

/** Renders an Astro component to an HTML string. */
async function render(component: Parameters<AstroContainer['renderToString']>[0]): Promise<string> {
  const container = await AstroContainer.create()
  return container.renderToString(component)
}

/** Renders the strip; imported late so it reads the mocked collection. */
async function renderNav(): Promise<string> {
  const { default: HomeSectionNav } = await import('#components/astro/HomeSectionNav.astro')
  return render(HomeSectionNav)
}

/** Each in-page link's href and its visible label, number left out, in document order. */
const links = (html: string) =>
  [...html.matchAll(/<a\b[^>]*\bhref="(#[^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map(([, href, inner]) => [
    href,
    inner
      .replace(/<span\b[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/span>/g, '')
      .replace(/<[^>]*>/g, '')
      .trim(),
  ])

describe('HomeSectionNav', () => {
  beforeEach(() => {
    posts = [post(true)]
  })

  it('is a navigation landmark named by its visible "On this page" label', async () => {
    const html = await renderNav()
    const labelledBy = /<nav\b[^>]*\baria-labelledby="([^"]+)"/.exec(html)?.[1]

    expect(labelledBy, 'the nav has no aria-labelledby').toBeDefined()
    expect(html).toMatch(new RegExp(`\\bid="${labelledBy}"[^>]*>\\s*On this page\\s*<`))
  })

  it('jumps to every homepage section in page order', async () => {
    expect(links(await renderNav())).toEqual([
      ['#how', 'Example'],
      ['#skills', 'Skills'],
      ['#install', 'Install'],
      ['#requirements', 'Requirements'],
      ['#blog', 'Blog'],
    ])
  })

  // HomeBlog renders nothing until a post is published, so a Blog link would
  // point at nothing.
  it('leaves out the blog link while no post is published', async () => {
    posts = [post(false)]

    expect(links(await renderNav()).map(([href]) => href)).toEqual([
      '#how',
      '#skills',
      '#install',
      '#requirements',
    ])
  })

  // The links and the ids live in different components, so renaming either
  // side breaks a jump without breaking anything else.
  it('points every link at an id one of the homepage sections renders', async () => {
    const { default: HomeBlog } = await import('#components/astro/HomeBlog.astro')
    const pages = await Promise.all(
      [HomeHero, HomeFeatures, HomeInstall, HomeRequirements, HomeBlog].map(render)
    )
    const ids = new Set([...pages.join('').matchAll(/\bid="([^"]+)"/g)].map(([, id]) => id))

    for (const [href] of links(await renderNav())) {
      expect(ids.has(href.slice(1)), `${href} points at nothing`).toBe(true)
    }
  })
})
