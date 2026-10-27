import type { Page } from '@playwright/test'

export const VIEWPORTS = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1200, height: 800 },
}

/**
 * Resolves once the page has held the same scroll position for two frames.
 * Scrolls glide: the homepage scrolls smoothly, and `html:focus-within` in the
 * site stylesheet makes every page glide while something has focus.
 */
export const scrollSettled = (page: Page) =>
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
