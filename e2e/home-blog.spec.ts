import { expect, test } from '@playwright/test'

/**
 * The homepage blog section links each post by its collection id. Post links
 * once used the unset `slug` and pointed at `/posts/undefined`, which rendered
 * nothing a visitor could read, so every link here must land on a page that
 * renders.
 */
test.describe('Homepage blog section', () => {
  test('every link lands on a page that renders', async ({ page }) => {
    await page.goto('/')

    const hrefs = await page
      .locator('.home-blog a[href]')
      .evaluateAll(links => [...new Set(links.map(link => link.getAttribute('href') ?? ''))])

    expect(hrefs, 'the section links to no post').toContainEqual(
      expect.stringMatching(/^\/posts\/./)
    )

    for (const href of hrefs) {
      const response = await page.goto(href)
      expect(response?.status(), `${href} should not be an error page`).toBeLessThan(400)
      await expect(page.locator('h1').first(), `${href} rendered no heading`).toBeVisible()
    }
  })

  // The site's own `a` rule sets a size and weight, so a row title's link
  // rendered at 16px/400 inside its 18px/700 heading, barely heavier than the
  // description under it.
  test('each row title link takes its heading size and weight', async ({ page }) => {
    await page.goto('/')

    const titles = await page.locator('.home-blog__name').evaluateAll(headings =>
      headings.map(heading => {
        const link = heading.querySelector('a') as HTMLElement
        const [h, a] = [getComputedStyle(heading), getComputedStyle(link)]
        return {
          heading: `${h.fontSize} ${h.fontWeight}`,
          link: `${a.fontSize} ${a.fontWeight}`,
        }
      })
    )

    expect(titles.length, 'no earlier-post rows on the homepage').toBeGreaterThan(0)
    for (const { heading, link } of titles) expect(link).toBe(heading)
  })
})
