import { expect, test } from '@playwright/test'

/**
 * In the dark Gleaner palette `--g-code-bg` and `--g-card` are the same
 * colour, so code set on the install cards lost its surface and read as plain
 * text. Every code surface on a card must differ from the card in both themes.
 */
test.describe('Homepage install guide', () => {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`code stands apart from its card in ${colorScheme} mode`, async ({ page }) => {
      await page.emulateMedia({ colorScheme })
      await page.goto('/')

      const clashes = await page.locator('.home-install__card').evaluateAll(cards =>
        cards.flatMap(card => {
          const cardBg = getComputedStyle(card).backgroundColor
          return [...card.querySelectorAll('pre, :not(pre) > code')]
            .map(el => ({
              text: el.textContent?.trim().slice(0, 30),
              bg: getComputedStyle(el).backgroundColor,
            }))
            .filter(({ bg }) => bg === cardBg)
        })
      )

      expect(clashes, 'code with the same background as its card').toEqual([])
    })
  }
})
