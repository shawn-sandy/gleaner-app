// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { experimental_AstroContainer as AstroContainer } from 'astro/container'
import CopyCommand from '#components/astro/CopyCommand.astro'
import HomeHero from '#components/astro/HomeHero.astro'
import HomeInstall from '#components/astro/HomeInstall.astro'

const INSTALL = [
  '/plugin marketplace add shawn-sandy/gleaner',
  '/plugin install gleaner@shawn-sandy',
]

/** The text each copy button hands to the clipboard, in page order. */
function copied(html: string): string[] {
  return [...html.matchAll(/<button\b[^>]*\sdata-copy="([^"]*)"/g)].map(m => m[1])
}

describe('CopyCommand', () => {
  const render = async (command: string) => {
    const container = await AstroContainer.create()
    return container.renderToString(CopyCommand, { props: { command } })
  }

  it('copies exactly the command it shows', async () => {
    const html = await render(INSTALL[0])

    expect(copied(html)).toEqual([INSTALL[0]])
    expect(html).toMatch(new RegExp(`<code\\b[^>]*>${INSTALL[0]}</code>`))
  })

  it('renders a native button that cannot submit a surrounding form', async () => {
    const tag = /<button\b[^>]*>/.exec(await render(INSTALL[0]))?.[0] ?? ''

    expect(tag).toMatch(/\stype="button"/)
  })

  // Two buttons that are both just "Copy" are indistinguishable in a screen
  // reader's list of controls, so the name has to carry the command.
  it('names the button after the command it copies', async () => {
    const html = await render(INSTALL[1])
    const button = /<button\b[^>]*>([\s\S]*?)<\/button>/.exec(html)?.[1] ?? ''
    const name = button.replace(/<[^>]+>/g, '')

    expect(name).toContain(INSTALL[1])
  })

  it('has a status region to announce the result of a copy', async () => {
    expect(await render(INSTALL[0])).toMatch(/\srole="status"/)
  })
})

describe('install snippets', () => {
  it.each([
    ['HomeHero', HomeHero],
    ['HomeInstall', HomeInstall],
  ])('%s offers one copy button per install command', async (_name, Component) => {
    const container = await AstroContainer.create()

    expect(copied(await container.renderToString(Component))).toEqual(INSTALL)
  })
})
