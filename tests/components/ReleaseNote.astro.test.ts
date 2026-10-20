// @vitest-environment node
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import ReleaseNote from '#components/astro/ReleaseNote.astro'

// 01:17 UTC on October 20 is still the evening of October 19 in New York.
const lateEvening = new Date('2026-10-20T01:17:30Z')
const originalTimeZone = process.env.TZ

async function render(): Promise<string> {
  const container = await AstroContainer.create()
  return container.renderToString(ReleaseNote, {
    props: {
      title: 'Gleaner 2.7.0',
      tag: 'v2.7.0',
      url: 'https://github.com/shawn-sandy/gleaner/releases/tag/v2.7.0',
      publishedAt: lateEvening,
    },
  })
}

describe('ReleaseNote', () => {
  beforeEach(() => {
    // Build servers run in UTC; the date must not follow the machine's zone.
    process.env.TZ = 'UTC'
  })

  afterEach(() => {
    process.env.TZ = originalTimeZone
  })

  it("dates a late-evening release by the author's day, not the build server's", async () => {
    const html = await render()
    const time = /<time\b[^>]*datetime="([^"]+)"[^>]*>([^<]*)<\/time>/.exec(html)

    expect(time?.[1]).toBe(lateEvening.toISOString())
    expect(time?.[2]).toBe('October 19, 2026')
  })

  it('anchors the article on its tag so a release can be linked directly', async () => {
    const html = await render()

    expect(html).toMatch(/<article\b[^>]*\bid="v2\.7\.0"/)
  })
})
