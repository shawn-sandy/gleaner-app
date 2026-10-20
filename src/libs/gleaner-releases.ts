import type { Loader } from 'astro/loaders'
import { filterXSS } from 'xss'

/** The fields of a GitHub release the changelog reads. */
type GitHubRelease = {
  tag_name: string
  name: string | null
  body: string | null
  html_url: string
  published_at: string | null
  draft: boolean
}

// ponytail: first 100 releases only; follow the Link header if Gleaner ever passes 100.
export const GLEANER_RELEASES_URL =
  'https://api.github.com/repos/shawn-sandy/gleaner/releases?per_page=100'

/**
 * Content-layer loader that fills a collection with Gleaner's published GitHub releases.
 * Each entry's id is the tag (`v2.6.0`) and its body is the release notes rendered from
 * Markdown, so `render(entry)` works on it like a post. Markdown passes raw HTML through,
 * and GitHub only sanitizes it on its own release page, so the rendered notes go through
 * `filterXSS` before they reach this site.
 *
 * Every release is fetched and rendered before the store changes, so any failure (GitHub
 * unreachable, refusing, or silent for 15 s, or a body that opens with `---` and is misread
 * as invalid frontmatter) logs a warning and keeps the last good list rather than a partial
 * one. An offline dev server or a GitHub outage never fails the build.
 *
 * @param options.token - A GitHub token raises the rate limit from 60 to 5,000 requests an
 *   hour. Builds on shared machines, such as Netlify's, can hit the anonymous limit.
 */
export function gleanerReleasesLoader({ token }: { token?: string | undefined } = {}): Loader {
  return {
    name: 'gleaner-releases',
    async load({ store, logger, parseData, renderMarkdown }) {
      const entries: Parameters<typeof store.set>[0][] = []
      try {
        const response = await fetch(GLEANER_RELEASES_URL, {
          // Without a signal a stalled connection holds the build for undici's 300 s timeouts.
          signal: AbortSignal.timeout(15_000),
          headers: {
            Accept: 'application/vnd.github+json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        })
        if (!response.ok) throw new Error(`GitHub answered ${response.status}`)
        const releases = (await response.json()) as GitHubRelease[]

        for (const release of releases) {
          if (release.draft || !release.published_at) continue
          const data = await parseData({
            id: release.tag_name,
            data: {
              title: release.name || release.tag_name,
              url: release.html_url,
              publishedAt: release.published_at,
            },
          })
          const rendered = await renderMarkdown(release.body ?? '')
          entries.push({
            id: release.tag_name,
            data,
            rendered: {
              ...rendered,
              // Remove tags outside the whitelist (and script and style contents) rather than
              // escaping them, which would print the markup as text.
              html: filterXSS(rendered.html, {
                stripIgnoreTag: true,
                stripIgnoreTagBody: ['script', 'style'],
              }),
            },
          })
        }
      } catch (error) {
        const reason = error instanceof Error ? error.message : String(error)
        logger.warn(`Kept the stored Gleaner releases, loading them failed: ${reason}`)
        return
      }

      store.clear()
      for (const entry of entries) store.set(entry)
    },
  }
}
