import { URL } from 'node:url'
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

  // `Base.astro` wrote no Open Graph or Twitter tags, so a shared link showed no
  // card at all. `/about` passes no `pageImageUrl` and is prerendered, so its
  // URLs are resolved against `site` at build time rather than the request.
  test('a page without its own image shares the default card', async ({ page, request }) => {
    await page.goto('/about')

    const meta = (property: string) =>
      page.locator(`meta[property="${property}"]`).getAttribute('content')
    const ogImage = (await meta('og:image')) ?? ''
    expect(ogImage, 'no og:image').not.toBe('')

    // Crawlers ignore relative URLs, so each one must parse without a base.
    const image = new URL(ogImage)
    expect(image.pathname).toBe('/images/og-default.png')
    expect(await meta('twitter:image')).toBe(ogImage)
    expect(new URL((await meta('og:url')) ?? '').pathname).toMatch(/^\/about\/?$/)
    expect(await meta('og:title')).toBe(await page.title())

    // An optional tag with no value is written as an empty one, which card
    // validators flag on every page.
    const empty = await page.evaluate(() =>
      [...document.querySelectorAll('meta[property^="og:"], meta[property^="twitter:"]')]
        .filter(tag => !tag.getAttribute('content'))
        .map(tag => tag.getAttribute('property'))
    )
    expect(empty, 'card tags with no content').toEqual([])

    // The card's file is served, at the size its tags declare (PNG IHDR width
    // and height sit at bytes 16 and 20).
    const png = await request.get(image.pathname)
    expect(png.status()).toBe(200)
    const body = await png.body()
    expect(String(body.readUInt32BE(16))).toBe(await meta('og:image:width'))
    expect(String(body.readUInt32BE(20))).toBe(await meta('og:image:height'))
  })
})
