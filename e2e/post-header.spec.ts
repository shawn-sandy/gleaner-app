import { expect, test } from '@playwright/test'

/**
 * The blog post header (`src/components/astro/PostHeader.astro`): the Gleaner
 * band that replaces the shared `Header` on `/posts/<slug>` only, carrying the
 * date, read time, author and tag chips that used to sit in the article body.
 * Docs and content articles share `MarkdownPostLayout` and keep the shared
 * header; it once vanished from them when the band was passed to `Layout` as a
 * conditional slot, which registers the slot even when it renders nothing.
 */
test.describe('Post header', () => {
  test('a post opens with the band, its date, read time and tag links', async ({ page }) => {
    await page.goto('/posts/gleaner-daily-routine')

    const header = page.locator('header.post-header[data-gleaner]')
    await expect(header).toHaveCount(1)
    await expect(header.locator('h1')).toHaveText(
      'A day with Gleaner: a quick guide to your daily reading routine'
    )
    await expect(page.locator('h1')).toHaveCount(1)

    const meta = header.locator('.post-header__meta')
    await expect(meta.locator('time')).toHaveAttribute('datetime', '2026-10-29')
    await expect(meta).toHaveText(/^29 Oct 2026 · \d+ min read · Shawn Sandy$/)

    const chips = header.locator('ul[aria-label="Tags"] a')
    expect(await chips.count(), 'no tag chips in the band').toBeGreaterThan(0)
    for (const chip of await chips.all()) {
      await expect(chip).toHaveAttribute('href', `/tags/${await chip.innerText()}`)
    }

    // The shared header, read-time line and end-of-post tag list are gone.
    await expect(page.locator('header section#header')).toHaveCount(0)
    await expect(page.locator('article .post-reading-time')).toHaveCount(0)
    await expect(page.locator('article ul.tags')).toHaveCount(0)
  })

  test('a content article keeps the shared header', async ({ page }) => {
    await page.goto('/content/content')

    await expect(page.locator('header.post-header')).toHaveCount(0)
    await expect(page.locator('header section#header h1')).toHaveText('Content articles')
  })

  // The 320 Rule (DESIGN.md): the band must not widen the document.
  test('nothing widens the page at 320px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 800 })
    await page.goto('/posts/gleaner-daily-routine')

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    )
    expect(overflow).toBe(0)
  })
})
