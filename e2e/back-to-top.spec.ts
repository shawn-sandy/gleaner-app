import { test, expect, type Page } from '@playwright/test'

/** The pinned "Back to top" link every `Base` page renders. */
const button = (page: Page) => page.getByRole('link', { name: 'Back to top' })

/** Scrolls straight to `top`, so a smooth-scrolling page is not still gliding when measured. */
const scrollToY = (page: Page, top: number) =>
  page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top)

/** Whether this browser runs the scroll timeline that reveals the button. */
const hasScrollTimelines = (page: Page) =>
  page.evaluate(
    () =>
      window.CSS.supports('animation-timeline: scroll()') &&
      window.CSS.supports('animation-range: 0 1px')
  )

test.describe('Back to top', () => {
  // The homepage scrolls smoothly and `/changelog` does not; both are taller
  // than two screens at this size.
  for (const path of ['/', '/changelog']) {
    test(`${path}: appears once scrolled and takes you back to the top`, async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 800 })
      await page.goto(path)

      // Hidden, not just transparent, so keyboard users cannot tab to an
      // invisible control at the top. Browsers without scroll timelines
      // show it all the time instead.
      if (await hasScrollTimelines(page)) await expect(button(page)).toBeHidden()

      await scrollToY(page, 1600)
      await expect(button(page)).toBeVisible()

      await button(page).click()
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

      // The jump also moves where keyboard focus starts, so the next Tab
      // reaches the skip link instead of the end of the page.
      await page.keyboard.press('Tab')
      await expect(page.locator('.skip-link')).toBeFocused()
    })
  }

  // The reveal is an animation, and the reduced-motion reset would leave it
  // stuck on its hidden first frame, so under reduced motion it is not run.
  test('stays visible under reduced motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/changelog')

    await expect(button(page)).toBeVisible()
  })

  test('is a 44px target pinned inside the window on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 })
    await page.goto('/changelog')
    await scrollToY(page, 1600)

    const box = await button(page).boundingBox()
    expect(box, 'the button has no box').not.toBeNull()
    expect(box!.height).toBeGreaterThanOrEqual(44)

    // In the bottom-right corner, about 1rem in from each edge, and no wider
    // than its label: the skip link's `body > a[href^="#"]` rule once
    // stretched it across the whole window.
    expect(box!.width).toBeLessThan(200)
    expect(320 - (box!.x + box!.width)).toBeGreaterThanOrEqual(8)
    expect(320 - (box!.x + box!.width)).toBeLessThanOrEqual(24)
    expect(640 - (box!.y + box!.height)).toBeGreaterThanOrEqual(8)
    expect(640 - (box!.y + box!.height)).toBeLessThanOrEqual(24)
  })

  // At the foot of the page the button sits below the footer's last line
  // instead of over it.
  test('covers none of the footer at the bottom of the page', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 640 })
    await page.goto('/changelog')
    await scrollToY(page, 100_000)

    const covered = await page.evaluate(() => {
      const b = document.querySelector('.back-to-top a')!.getBoundingClientRect()
      return [...document.querySelectorAll('footer p, footer a')]
        .filter(el => {
          const r = el.getBoundingClientRect()
          return r.right > b.left && r.left < b.right && r.bottom > b.top && r.top < b.bottom
        })
        .map(el => el.textContent?.trim().slice(0, 40))
    })

    expect(covered).toEqual([])
  })

  // The skip link's `:focus` rule moves any `body > a[href^="#"]` to the top
  // of the window; the button must stay in its corner when tabbed to.
  test('stays in its corner when it has focus', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/changelog')
    await scrollToY(page, 1600)

    await button(page).focus()
    const box = await button(page).boundingBox()

    expect(box!.y).toBeGreaterThan(800 / 2)
    expect(box!.width).toBeLessThan(200)
  })
})
