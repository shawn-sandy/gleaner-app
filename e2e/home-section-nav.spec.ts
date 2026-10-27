import { test, expect, type Page } from '@playwright/test'

/** The "On this page" strip under the hero. */
const strip = (page: Page) => page.getByRole('navigation', { name: 'On this page' })

/** Resolves once the page has held the same scroll position for two frames. */
const scrollSettled = (page: Page) =>
  page.evaluate(
    () =>
      new Promise<void>(resolve => {
        let last = -1
        let still = 0
        const tick = () => {
          still = window.scrollY === last ? still + 1 : 0
          last = window.scrollY
          if (still >= 2) resolve()
          else window.requestAnimationFrame(tick)
        }
        tick()
      })
  )

test.describe('Homepage section strip', () => {
  test('every link lands on a section of the page', async ({ page }) => {
    await page.goto('/')

    const hrefs = await strip(page)
      .getByRole('link')
      .evaluateAll(nodes => nodes.map(node => node.getAttribute('href') ?? ''))

    expect(hrefs.length, 'the strip has no links').toBeGreaterThan(0)
    for (const href of hrefs) {
      await expect(page.locator(href), `${href} points at nothing`).toHaveCount(1)
    }
  })

  test('the footer repeats the links, and each lands on a section', async ({ page }) => {
    await page.goto('/')

    const stripHrefs = await strip(page)
      .getByRole('link')
      .evaluateAll(nodes => nodes.map(node => node.getAttribute('href') ?? ''))
    const footerHrefs = await page
      .getByRole('navigation', { name: 'Footer' })
      .locator('a[href^="#"]')
      .evaluateAll(nodes => nodes.map(node => node.getAttribute('href') ?? ''))

    expect(footerHrefs).toEqual(stripHrefs)
    for (const href of footerHrefs) {
      await expect(page.locator(href), `${href} points at nothing`).toHaveCount(1)
    }
  })

  // `html { scroll-padding-top }` in Navigation.astro keeps a jump target out
  // from under the pinned site nav; without it the section's heading lands
  // behind the bar.
  test('a jump leaves the section clear of the pinned site nav', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    await strip(page).getByRole('link', { name: 'Requirements' }).click()
    await expect(page).toHaveURL(/#requirements$/)

    const navBottom = await page
      .getByRole('navigation', { name: 'Primary' })
      .evaluate(node => node.getBoundingClientRect().bottom)
    const top = () =>
      page.locator('#requirements').evaluate(node => node.getBoundingClientRect().top)

    // The jump glides, so wait for it to arrive and stop before measuring:
    // mid-glide the section is still below the bar and would pass early.
    await expect.poll(top).toBeLessThan(navBottom + 200)
    await scrollSettled(page)
    expect(await top()).toBeGreaterThanOrEqual(navBottom - 1)
  })

  // A glide to the section the link names, never a jump cut, unless the
  // visitor asked for reduced motion. Scoped to the homepage.
  test('scrolls smoothly on the homepage unless motion is reduced', async ({ page }) => {
    const behavior = () =>
      page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)

    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/')
    expect(await behavior()).toBe('smooth')

    await page.emulateMedia({ reducedMotion: 'reduce' })
    expect(await behavior()).toBe('auto')

    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/about')
    expect(await behavior()).toBe('auto')
  })

  test('sits in one row on a desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 })
    await page.goto('/')

    const tops = await strip(page)
      .getByRole('link')
      .evaluateAll(nodes => nodes.map(node => Math.round(node.getBoundingClientRect().top)))

    expect(new Set(tops).size, `link tops ${tops.join(', ')}`).toBe(1)
  })

  test('folds into two columns of 44px targets on a phone', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const boxes = await strip(page)
      .getByRole('link')
      .evaluateAll(nodes =>
        nodes.map(node => {
          const { left, height } = node.getBoundingClientRect()
          return { left: Math.round(left), height }
        })
      )

    expect(new Set(boxes.map(box => box.left)).size).toBe(2)
    for (const { height } of boxes) expect(height).toBeGreaterThanOrEqual(44)
  })
})
