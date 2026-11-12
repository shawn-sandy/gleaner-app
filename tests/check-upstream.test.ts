// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest'
// The `#` alias maps to `src/` only, so it cannot reach `scripts/`.
import { buildReport, checkUpstream, findDrift } from '../scripts/check-upstream.mjs'

const repo = 'shawn-sandy/gleaner'
const base = 'fd87a035ba0a5e9d22d88afd76fe05e7e183c77e'
const head = 'ff6763b0000000000000000000000000000000aa'

const readme = { filename: 'README.md', status: 'modified', patch: '@@ -1 +1 @@\n-old\n+new' }
const versionBump = {
  filename: 'plugins/gleaner/.claude-plugin/plugin.json',
  status: 'modified',
  patch:
    '@@ -1,4 +1,4 @@\n {\n   "name": "gleaner",\n-  "version": "2.6.0",\n+  "version": "2.7.0",',
}

/** Site files `findDrift` says to check for these upstream files, flattened. */
function siteFilesFor(files: object[]) {
  return findDrift(files).flatMap(match => match.site)
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('findDrift', () => {
  it('maps a README edit to the site files that copy or describe it', () => {
    const site = siteFilesFor([readme])
    expect(site).toContain('README.md')
    expect(site).toContain('src/components/astro/HomeFeatures.astro')
  })

  it('lists every site file whose copy follows the changed file', () => {
    const skillsGuide = { filename: 'plugins/gleaner/skills/README.md', status: 'modified' }
    const marketplace = {
      filename: '.claude-plugin/marketplace.json',
      status: 'modified',
      patch: '@@ -1 +1 @@\n-  "name": "shawn-sandy",\n+  "name": "sandy",',
    }
    expect(siteFilesFor([skillsGuide])).toContain('src/components/astro/HomeFeatures.astro')
    expect(siteFilesFor([readme])).toContain('src/components/astro/HomeInstall.astro')
    expect(siteFilesFor([marketplace])).toContain('src/components/astro/HomeHero.astro')
  })

  it('sends a logo change to every file that copies the symbol, its colour or its knot', () => {
    const site = siteFilesFor([{ filename: 'gleaner-symbol.svg', status: 'modified' }])
    expect(site).toContain('src/components/astro/SavedClip.astro')
    expect(site).toContain('public/images/gleaner-wordmark.svg')
    // The nav brand draws this one, the symbol beside the name at 65px tall.
    expect(site).toContain('public/images/gleaner-wordmark-65px.svg')
    expect(site).toContain('public/images/gleaner-wordmark-140px.svg')
    // The favicons copy the symbol, the ICO as frames rendered from it.
    expect(site).toContain('public/favicon.svg')
    expect(site).toContain('public/favicon.ico')
    // The app icons are rendered from the symbol, the 192px one as the apple-touch icon.
    expect(site).toContain('public/icons/icon-192x192.png')
    expect(site).toContain('public/icons/icon-512x512.png')
  })

  it('ignores an edit inside a skill, which rarely changes the homepage', () => {
    expect(
      findDrift([{ filename: 'plugins/gleaner/skills/glean/SKILL.md', status: 'modified' }])
    ).toEqual([])
  })

  it.each(['added', 'removed'])('reports a skill that was %s', status => {
    const site = siteFilesFor([{ filename: 'plugins/gleaner/skills/follow-up/SKILL.md', status }])
    expect(site).toContain('src/components/astro/HomeFeatures.astro')
  })

  it('reports a skill folder that was renamed', () => {
    const site = siteFilesFor([
      {
        filename: 'plugins/gleaner/skills/glean/SKILL.md',
        previous_filename: 'plugins/gleaner/skills/clip/SKILL.md',
        status: 'renamed',
      },
    ])
    expect(site).toContain('src/components/astro/HomeFeatures.astro')
  })

  it('reports a watched file by its old path when it moves', () => {
    const site = siteFilesFor([
      {
        filename: 'docs/chatgpt.md',
        previous_filename: 'docs/chatgpt-marketplace.md',
        status: 'renamed',
      },
    ])
    expect(site).toContain('src/components/astro/HomeInstall.astro')
  })

  it('ignores a manifest change that only bumps the version', () => {
    expect(findDrift([versionBump])).toEqual([])
  })

  it('reports a manifest change beyond the version', () => {
    const renamed = {
      ...versionBump,
      patch: `${versionBump.patch}\n-  "name": "gleaner",\n+  "name": "gleaner-pro",`,
    }
    expect(siteFilesFor([renamed])).toContain('src/components/astro/HomeInstall.astro')
  })

  it('reports a manifest that moved, even when only its version changed', () => {
    const moved = {
      ...versionBump,
      filename: 'plugins/gleaner/plugin.json',
      previous_filename: versionBump.filename,
      status: 'renamed',
    }
    expect(siteFilesFor([moved])).toContain('src/components/astro/HomeInstall.astro')
  })

  it('reports a manifest change GitHub sent without a patch', () => {
    const { patch: _patch, ...noPatch } = versionBump
    expect(siteFilesFor([noPatch])).toContain('src/components/astro/HomeInstall.astro')
  })

  it('ignores files the site neither copies nor describes', () => {
    expect(
      findDrift([
        { filename: 'CHANGELOG.md', status: 'modified' },
        { filename: 'plugins/gleaner/skills/glean/assets/icon-small.png', status: 'modified' },
      ])
    ).toEqual([])
  })
})

describe('buildReport', () => {
  it('is empty when no watched file changed', () => {
    expect(buildReport({ repo, base, head, files: [versionBump] })).toBe('')
  })

  it('names the changed file, the site files to check, the comparison, and the new bookmark', () => {
    const report = buildReport({ repo, base, head, files: [readme] })
    expect(report).toContain('`README.md`')
    expect(report).toContain('src/components/astro/HomeHero.astro')
    expect(report).toContain(`https://github.com/${repo}/compare/${base}...${head}`)
    // Bookmarking the old sha would leave the issue open forever.
    const bookmark = report.split('\n').find(line => line.includes('upstream-sync.json'))
    expect(bookmark).toContain(head)
    expect(bookmark).not.toContain(base)
  })

  it('still reports when GitHub cut the file list off, since a watched file may be missing', () => {
    const files = Array.from({ length: 300 }, (_, i) => ({
      filename: `src/${i}.ts`,
      status: 'added',
    }))
    const report = buildReport({ repo, base, head, files })
    expect(report).not.toBe('')
    expect(report).toContain(`compare/${base}...${head}`)
  })
})

/** Stubs GitHub: main's head is `head`, and the comparison answers with `comparison`. */
function stubGitHub(comparison: unknown) {
  const fetchMock = vi.fn(async (url: string, _init?: { headers?: Record<string, string> }) =>
    url.endsWith('/commits/main')
      ? { ok: true, status: 200, text: async () => head }
      : { ok: true, status: 200, json: async () => comparison }
  )
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('checkUpstream', () => {
  it("compares the bookmark with upstream's latest main commit", async () => {
    const fetchMock = stubGitHub({ status: 'ahead', files: [readme] })

    const report = await checkUpstream({ repo, sha: base })

    expect(fetchMock.mock.calls.map(([url]) => url)).toContain(
      `https://api.github.com/repos/${repo}/compare/${base}...${head}`
    )
    expect(report).toContain('`README.md`')
  })

  it('reads an identical comparison as up to date', async () => {
    stubGitHub({ status: 'identical', files: [] })
    await expect(checkUpstream({ repo, sha: base })).resolves.toBe('')
  })

  // GitHub answers both with an empty file list, which would otherwise close the issue.
  it.each(['behind', 'diverged'])(
    'fails when the comparison is %s, instead of reporting nothing changed',
    async status => {
      stubGitHub({ status, files: [] })
      await expect(checkUpstream({ repo, sha: base })).rejects.toThrow(status)
    }
  )

  it('fails when the comparison has no file list, instead of reporting nothing changed', async () => {
    stubGitHub({ status: 'ahead' })
    await expect(checkUpstream({ repo, sha: base })).rejects.toThrow()
  })

  it('sends the token, which lifts the anonymous rate limit', async () => {
    const fetchMock = stubGitHub({ status: 'identical', files: [] })
    await checkUpstream({ repo, sha: base, token: 'test-token' })
    for (const [, init] of fetchMock.mock.calls) {
      expect(init?.headers?.Authorization).toBe('Bearer test-token')
    }
    expect(fetchMock).toHaveBeenCalledTimes(2)
  })

  it('fails when GitHub refuses, instead of reporting nothing changed', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({ ok: false, status: 403 }))
    )
    await expect(checkUpstream({ repo, sha: base })).rejects.toThrow('403')
  })

  it("fails when GitHub's answer for main is not a commit sha", async () => {
    const fetchMock = vi.fn(async () => ({
      ok: true,
      status: 200,
      text: async () => '<!DOCTYPE html>',
    }))
    vi.stubGlobal('fetch', fetchMock)
    await expect(checkUpstream({ repo, sha: base })).rejects.toThrow()
    expect(fetchMock).toHaveBeenCalledTimes(1)
  })

  it.each([
    ['a sha that is not a full commit sha', { repo, sha: 'main' }],
    ['a repo that is not owner/name', { repo: 'gleaner?per_page=1', sha: base }],
  ])('rejects a bookmark with %s before calling GitHub', async (_case, bookmark) => {
    const fetchMock = vi.fn()
    vi.stubGlobal('fetch', fetchMock)
    await expect(checkUpstream(bookmark)).rejects.toThrow()
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
