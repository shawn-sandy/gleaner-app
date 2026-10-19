import { describe, expect, it } from 'vitest'
import { SITE_DESCRIPTION, SITE_TITLE } from '#utils/site-config'

describe('site-config', () => {
  // The description outlived the rename to Gleaner and kept calling the site
  // an Astro starter; a description that names the site cannot drift that way.
  it('describes the site by its own name', () => {
    expect(SITE_TITLE.trim()).not.toBe('')
    expect(SITE_DESCRIPTION).toContain(SITE_TITLE)
  })
})
