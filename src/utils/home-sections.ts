import { getCollection } from 'astro:content'

/** One homepage section a same-page link jumps to. */
export type HomeSection = {
  /** The id a homepage component sets, as a hash: `#install`. */
  href: string
  /** The link text. */
  label: string
}

/**
 * The homepage sections in page order, for the "On this page" strip under the
 * hero (`HomeSectionNav`) and the footer's line of the same links. `#how` is
 * the hero's example; the rest are `HomeFeatures`, `HomeInstall`,
 * `HomeRequirements` and `HomeBlog`. `tests/components/HomeSectionNav.astro.test.ts`
 * fails if one points at nothing.
 *
 * Blog is left out while no post is published, because `HomeBlog` renders
 * nothing then.
 */
export async function getHomeSections(): Promise<HomeSection[]> {
  const hasPosts = (await getCollection('posts', ({ data }) => data.publish)).length > 0

  return [
    { href: '#how', label: 'Example' },
    { href: '#skills', label: 'Skills' },
    { href: '#install', label: 'Install' },
    { href: '#requirements', label: 'Requirements' },
    ...(hasPosts ? [{ href: '#blog', label: 'Blog' }] : []),
  ]
}
