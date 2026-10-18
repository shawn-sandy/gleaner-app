import { expect, test } from '@playwright/test'

/**
 * The Gleaner sections space their lists with `gap`. @fpkit/acss gives every
 * `li` an 8px bottom margin (except the last) and an 8px marker indent, which
 * broke the hero's copper string between asks, made the last tag pill taller
 * than the rest, and pushed cards off their headings. These guard both the
 * cause and the most visible symptom.
 */
test.describe('Gleaner homepage lists', () => {
  test('no list item in a Gleaner section carries the vendor margin or indent', async ({
    page,
  }) => {
    await page.goto('/')

    const offenders = await page.locator('[data-gleaner] li').evaluateAll(items =>
      items
        .map(item => {
          const style = getComputedStyle(item)
          return {
            item: `${item.className.split(' ')[0] || 'li'}: ${item.textContent?.trim().slice(0, 30)}`,
            margin: style.marginBlockEnd,
            indent: style.paddingInlineStart,
            hasOwnPadding: item.matches(
              '.skill-card, .home-features__places > li, .saved-clip__tags li'
            ),
          }
        })
        .filter(
          ({ margin, indent, hasOwnPadding }) =>
            margin !== '0px' || (!hasOwnPadding && indent !== '0px')
        )
    )

    expect(offenders, 'list items with a stray margin or indent').toEqual([])
  })

  test("the hero's copper string runs unbroken from ask to ask", async ({ page }) => {
    await page.goto('/')

    const gaps = await page.locator('.home-hero .glean-part').evaluateAll(parts =>
      parts.slice(0, -1).map(part => {
        const string = part.querySelector('.glean-part__string') as HTMLElement
        const next = part.nextElementSibling as HTMLElement
        return Math.round(next.getBoundingClientRect().top - string.getBoundingClientRect().bottom)
      })
    )

    expect(gaps.length, 'the hero has fewer than two asks').toBeGreaterThan(0)
    for (const gap of gaps)
      expect(gap, 'px between one string and the next ask').toBeLessThanOrEqual(0)
  })
})
