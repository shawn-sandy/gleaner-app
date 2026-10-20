// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
import type { LoaderContext } from 'astro/loaders'
import { gleanerReleasesLoader } from '#libs/gleaner-releases'

type StoredEntry = { id: string; data: Record<string, unknown>; rendered?: { html: string } }

/** The slice of Astro's loader context the releases loader touches, backed by a plain Map. */
function fakeContext(existing: StoredEntry[] = []) {
  const entries = new Map(existing.map(entry => [entry.id, entry]))
  const context = {
    store: {
      clear: vi.fn(() => entries.clear()),
      set: vi.fn((entry: StoredEntry) => {
        entries.set(entry.id, entry)
        return true
      }),
    },
    logger: { warn: vi.fn() },
    parseData: vi.fn(async ({ data }: { data: Record<string, unknown> }) => data),
    renderMarkdown: vi.fn(async (markdown: string) => ({ html: `<p>${markdown}</p>` })),
  }
  return { entries, context, asLoaderContext: context as unknown as LoaderContext }
}

function respondWith(body: unknown, init: { ok?: boolean; status?: number } = {}) {
  const fetchMock = vi.fn(async () => ({
    ok: init.ok ?? true,
    status: init.status ?? 200,
    json: async () => body,
  }))
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

const published = {
  tag_name: 'v2.6.0',
  name: 'Gleaner 2.6.0',
  body: 'Clips come back in the chat.',
  html_url: 'https://github.com/shawn-sandy/gleaner/releases/tag/v2.6.0',
  published_at: '2026-10-19T20:15:19Z',
  draft: false,
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('gleanerReleasesLoader', () => {
  it('stores each published release under its tag, with its notes rendered', async () => {
    respondWith([
      published,
      { ...published, tag_name: 'v2.5.0', name: null, published_at: '2026-10-19T02:02:21Z' },
      { ...published, tag_name: 'v2.7.0', name: 'Gleaner 2.7.0', draft: true, published_at: null },
    ])
    const { entries, asLoaderContext } = fakeContext()

    await gleanerReleasesLoader().load(asLoaderContext)

    expect([...entries.keys()]).toEqual(['v2.6.0', 'v2.5.0'])
    expect(entries.get('v2.6.0')?.data).toEqual({
      title: 'Gleaner 2.6.0',
      url: 'https://github.com/shawn-sandy/gleaner/releases/tag/v2.6.0',
      publishedAt: '2026-10-19T20:15:19Z',
    })
    expect(entries.get('v2.6.0')?.rendered?.html).toContain('Clips come back in the chat.')
    expect(entries.get('v2.5.0')?.data.title, 'an unnamed release falls back to its tag').toBe(
      'v2.5.0'
    )
  })

  it('sends the token as a bearer header only when one is given', async () => {
    const fetchMock = respondWith([])
    const headersOf = (call: number) =>
      (fetchMock.mock.calls[call] as unknown as [string, { headers: Record<string, string> }])[1]
        .headers

    await gleanerReleasesLoader({ token: 'test-token' }).load(fakeContext().asLoaderContext)
    await gleanerReleasesLoader().load(fakeContext().asLoaderContext)

    expect(headersOf(0).Authorization).toBe('Bearer test-token')
    expect(headersOf(1)).not.toHaveProperty('Authorization')
  })

  it('keeps the stored releases and warns when GitHub refuses the request', async () => {
    respondWith({ message: 'API rate limit exceeded' }, { ok: false, status: 403 })
    const stored = { id: 'v2.5.0', data: { title: 'Gleaner 2.5.0' } }
    const { entries, context, asLoaderContext } = fakeContext([stored])

    await gleanerReleasesLoader().load(asLoaderContext)

    expect(context.store.clear).not.toHaveBeenCalled()
    expect(entries.get('v2.5.0')).toBe(stored)
    expect(context.logger.warn).toHaveBeenCalledWith(expect.stringContaining('403'))
  })

  it('keeps the stored releases and warns when the request never reaches GitHub', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => {
        throw new TypeError('fetch failed')
      })
    )
    const stored = { id: 'v2.5.0', data: { title: 'Gleaner 2.5.0' } }
    const { entries, context, asLoaderContext } = fakeContext([stored])

    await gleanerReleasesLoader().load(asLoaderContext)

    expect(entries.get('v2.5.0')).toBe(stored)
    expect(context.logger.warn).toHaveBeenCalledWith(expect.stringContaining('fetch failed'))
  })

  it('drops a release GitHub no longer lists once a fetch succeeds', async () => {
    respondWith([published])
    const { entries, asLoaderContext } = fakeContext([
      { id: 'v1.0.0', data: { title: 'Deleted on GitHub' } },
    ])

    await gleanerReleasesLoader().load(asLoaderContext)

    expect([...entries.keys()]).toEqual(['v2.6.0'])
  })

  it('keeps the stored releases and warns when a release body cannot be rendered', async () => {
    // A body opening with `---` is read as YAML frontmatter, and invalid YAML throws.
    respondWith([published, { ...published, tag_name: 'v2.5.0', body: '---\n*a\n---' }])
    const stored = { id: 'v2.4.0', data: { title: 'Gleaner 2.4.0' } }
    const { entries, context, asLoaderContext } = fakeContext([stored])
    context.renderMarkdown.mockImplementation(async (markdown: string) => {
      if (markdown.startsWith('---')) throw new Error('unidentified alias')
      return { html: `<p>${markdown}</p>` }
    })

    await gleanerReleasesLoader().load(asLoaderContext)

    expect([...entries.keys()], 'a half-rendered list replaced the stored one').toEqual(['v2.4.0'])
    expect(context.logger.warn).toHaveBeenCalledWith(expect.stringContaining('unidentified alias'))
  })

  it('strips script and event-handler HTML from the rendered notes', async () => {
    respondWith([published])
    const { entries, context, asLoaderContext } = fakeContext()
    context.renderMarkdown.mockResolvedValue({
      html: '<p>Fixed <img src="x" onerror="alert(1)"><a href="javascript:alert(2)">a link</a></p><script>alert(3)</script>',
    })

    await gleanerReleasesLoader().load(asLoaderContext)

    const html = entries.get('v2.6.0')?.rendered?.html ?? ''
    expect(html, 'the notes did not render').toContain('Fixed')
    expect(html).not.toMatch(/onerror|javascript:|<script/i)
  })
})
