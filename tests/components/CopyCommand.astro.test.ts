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
    // Content under aria-hidden is not part of the name.
    const name = button
      .replace(/<(\w+)\b[^>]*\saria-hidden="true"[^>]*>[\s\S]*?<\/\1>/g, '')
      .replace(/<[^>]+>/g, '')

    expect(name).toContain(INSTALL[1])
  })

  // Inside the button the announcement would also become part of its name.
  it('has a status region, outside the button, to announce the result', async () => {
    const html = await render(INSTALL[0])
    const status = /<[^>]*\srole="status"[^>]*>/.exec(html)

    expect(status?.[0]).not.toMatch(/aria-hidden/)
    expect(status!.index).toBeGreaterThan(html.indexOf('</button>'))
  })

  // `tests/utils/copy-command.test.ts` drives the handler against these hooks.
  it('renders the hooks the click handler looks for', async () => {
    const html = await render(INSTALL[0])
    const button = /<button\b[^>]*>/.exec(html)?.[0] ?? ''

    expect(button).toMatch(/\sclass="[^"]*\bcopy-command__button\b/)
    expect(html).toMatch(/<code\b/)
    expect(html).toMatch(/\sdata-copy-status/)
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
