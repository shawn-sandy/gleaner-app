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
        siteTitle: document.querySelector('[data-nav-brand]')?.textContent?.trim() ?? '',
        applicationName: meta('application-name'),
        appleTitle: meta('apple-mobile-web-app-title'),
      }
    })

    expect(identity.siteTitle, 'no site title in the nav brand').not.toBe('')
    expect(identity.applicationName).toBe(identity.siteTitle)
    expect(identity.appleTitle).toBe(identity.siteTitle)
  })
})
