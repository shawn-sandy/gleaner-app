import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { RESET_MS, bindCopyCommands } from '#utils/copy-command'

const COMMAND = '/plugin install gleaner@shawn-sandy'

const writeText = vi.fn<(text: string) => Promise<void>>()

/** Lets the click handler's awaited clipboard call settle. */
const settle = async () => {
  for (let i = 0; i < 5; i++) await Promise.resolve()
}

/**
 * The hooks `bindCopyCommands` relies on. The Astro renderer does not run
 * under happy-dom, so `tests/components/CopyCommand.astro.test.ts` checks the
 * component renders these same hooks.
 */
const renderRow = (command = COMMAND) =>
  `<div><code>${command}</code><button class="copy-command__button" type="button" data-copy="${command}">Copy</button><span role="status" data-copy-status></span></div>`

let root: HTMLElement

beforeEach(() => {
  writeText.mockReset().mockResolvedValue(undefined)
  Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true })
  root = document.createElement('div')
  document.body.append(root)
})

afterEach(() => {
  vi.useRealTimers()
  root.remove()
})

describe('bindCopyCommands', () => {
  it('copies exactly the command and shows the copied state', async () => {
    root.innerHTML = renderRow()
    bindCopyCommands(root)
    const button = root.querySelector('button')!

    button.click()
    await settle()

    expect(writeText).toHaveBeenCalledWith(COMMAND)
    expect(button.dataset.state).toBe('copied')
    expect(root.querySelector('[role="status"]')?.textContent).not.toBe('')
  })

  it('drops the check when a later copy fails', async () => {
    root.innerHTML = renderRow()
    bindCopyCommands(root)
    const button = root.querySelector('button')!
    const status = root.querySelector('[role="status"]')!

    button.click()
    await settle()
    const success = status.textContent

    writeText.mockRejectedValueOnce(new Error('NotAllowedError'))
    button.click()
    await settle()

    expect(button.dataset.state).toBeUndefined()
    expect(status.textContent).not.toBe('')
    expect(status.textContent).not.toBe(success)
  })

  it('selects the command when the copy fails, so a keyboard copy works', async () => {
    root.innerHTML = renderRow()
    bindCopyCommands(root)
    writeText.mockRejectedValueOnce(new Error('NotAllowedError'))

    root.querySelector('button')!.click()
    await settle()

    expect(String(window.getSelection())).toBe(COMMAND)
  })

  it('resets the button and the announcement after RESET_MS', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] })
    root.innerHTML = renderRow()
    bindCopyCommands(root)
    const button = root.querySelector('button')!

    button.click()
    await settle()
    vi.advanceTimersByTime(RESET_MS - 1)
    expect(button.dataset.state).toBe('copied')

    vi.advanceTimersByTime(1)
    expect(button.dataset.state).toBeUndefined()
    expect(root.querySelector('[role="status"]')?.textContent).toBe('')
  })

  // A page that swaps content in (view transitions, deferred islands) renders
  // buttons after the script has run.
  it('handles buttons added after it was bound', async () => {
    bindCopyCommands(root)
    root.innerHTML = renderRow()

    root.querySelector('button')!.click()
    await settle()

    expect(writeText).toHaveBeenCalledWith(COMMAND)
  })

  it('leaves other elements that carry a data-copy attribute alone', async () => {
    root.innerHTML = '<button type="button" data-copy="not a command">Other</button>'
    bindCopyCommands(root)

    root.querySelector('button')!.click()
    await settle()

    expect(writeText).not.toHaveBeenCalled()
  })
})
