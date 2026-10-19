import { expect, test } from '@playwright/test'

/**
 * The vendor `button:is(:hover, :focus)` rule scales buttons to 103% and dims
 * them to 85% brightness. The copy buttons opt out: they change colour only,
 * so they neither jump on hover nor stay enlarged while focused after a click.
 */
test('copy buttons neither scale nor dim on hover or focus', async ({ page }) => {
  await page.goto('/')
  const button = page.locator('.copy-command__button').first()

  const read = () =>
    button.evaluate(el => {
      const style = getComputedStyle(el)
      return { transform: style.transform, filter: style.filter }
    })

  await button.hover()
  expect(await read(), 'on hover').toEqual({ transform: 'none', filter: 'none' })

  await button.focus()
  expect(await read(), 'on focus').toEqual({ transform: 'none', filter: 'none' })
})
