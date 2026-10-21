import { test, expect, type Page } from '@playwright/test'

/**
 * The homepage hero logo fades out over the first logo-height of scroll, and
 * stays put for visitors who ask for reduced motion.
 */

/**
 * The hero logo, found by its role and accessible name. Scoped to the banner
 * (the hero `header`) because the site nav's brand image is also "Gleaner".
 */
const logo = (page: Page) =>
  page.getByRole('banner').getByRole('img', { name: 'Gleaner', exact: true })

/** Scrolls the page to `y` and returns the logo's computed opacity. */
async function opacityAt(page: Page, y: number): Promise<number> {
  await page.evaluate(async top => {
    window.scrollTo({ top, behavior: 'instant' })
    // A scroll timeline updates on the next frame. Reading in the same task
    // returns the pre-scroll opacity, which made the reduced-motion check pass
    // with the fade still running.
    await new Promise(resolve =>
      window.requestAnimationFrame(() => window.requestAnimationFrame(resolve))
    )
  }, y)
  return logo(page).evaluate(el => Number(getComputedStyle(el).opacity))
}

/** The logo's rendered height, which is also the fade's scroll distance. */
async function logoHeight(page: Page): Promise<number> {
  return logo(page).evaluate(el => el.getBoundingClientRect().height)
}

test.describe('home hero logo scroll fade', () => {
  test('fades out as the page scrolls down and back in at the top', async ({ page }) => {
    await page.goto('/')
    test.skip(
      !(await page.evaluate(
        () =>
          window.CSS.supports('animation-timeline: scroll()') &&
          window.CSS.supports('animation-range: 0 1px')
      )),
      'No scroll-driven animations here, so the logo stays opaque by design.'
    )
    const height = await logoHeight(page)

    await expect.poll(() => opacityAt(page, 0)).toBe(1)

    await expect.poll(() => opacityAt(page, height / 2)).toBeLessThan(0.75)
    expect(await opacityAt(page, height / 2)).toBeGreaterThan(0.25)

    await expect.poll(() => opacityAt(page, height)).toBe(0)

    await expect.poll(() => opacityAt(page, 0)).toBe(1)
  })

  test('stays fully opaque when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const height = await logoHeight(page)

    await expect.poll(() => opacityAt(page, height)).toBe(1)
  })
})
