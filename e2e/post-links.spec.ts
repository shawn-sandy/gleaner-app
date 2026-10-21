import { URL } from 'node:url'
import { expect, test } from '@playwright/test'

/**
 * The sidebar's recent-posts list and the tag pages built post URLs from
 * `post.slug`, which the content layer's glob loader never sets, so every link
 * pointed at `/posts/undefined`. The post route matches on `post.id`.
 */
test.describe('Post links', () => {
  for (const path of ['/posts/gleaner-1-0-to-2-5', '/blog', '/tags/gleaner']) {
    test(`every post link on ${path} opens a post`, async ({ page, request }) => {
      await page.goto(path)

      const hrefs = await page
        .locator('a[href*="posts/"]')
        .evaluateAll(links => links.map(link => link.getAttribute('href') ?? ''))
      const postLinks = [...new Set(hrefs.map(href => new URL(href, page.url()).href))].filter(
        href => new URL(href).pathname.startsWith('/posts/')
      )

      expect(postLinks, `no post links on ${path}`).not.toHaveLength(0)
      for (const href of postLinks) {
        expect(href).not.toContain('undefined')
        const response = await request.get(href)
        expect(response.status(), href).toBe(200)
      }
    })
  }
})
