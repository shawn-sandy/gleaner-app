import { expect, test } from '@playwright/test'

/**
 * `Base.astro` hard-coded "AstroKit" as the home-screen and browser app name,
 * so after the rename to Gleaner every page's app-name tags contradicted the
 * title in its own nav. Checked on `/about`, a page that sets neither.
 */
test.describe('Site identity metadata', () => {
  test('app-name tags match the site title', async ({ page }) => {
    await page.goto('/about')

    const identity = await page.evaluate(() => {
      const meta = (name: string) =>
        document.querySelector(`meta[name="${name}"]`)?.getAttribute('content') ?? ''
      return {
        siteTitle: document.querySelector('[data-nav-brand] img')?.getAttribute('alt') ?? '',
        applicationName: meta('application-name'),
        appleTitle: meta('apple-mobile-web-app-title'),
      }
    })

    expect(identity.siteTitle, 'no site title in the nav brand').not.toBe('')
    expect(identity.applicationName).toBe(identity.siteTitle)
    expect(identity.appleTitle).toBe(identity.siteTitle)
  })

  // `Layout.astro` gave every page without a description "Sign in to your
  // account", in the meta description and as the header subtitle, so those
  // pages never named the site. `/about` passes no description.
  test('a page without its own description describes the site', async ({ page }) => {
    await page.goto('/about')

    const siteTitle = (await page.locator('[data-nav-brand] img').getAttribute('alt')) ?? ''
    const description = await page.locator('meta[name="description"]').getAttribute('content')

    expect(siteTitle, 'no site title in the nav brand').not.toBe('')
    expect(description).toContain(siteTitle)
    await expect(page.locator('body > header')).toContainText(siteTitle)
  })
})
