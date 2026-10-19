/**
 * Click behaviour for `CopyCommand.astro`, kept out of the component so it can
 * be tested without a browser.
 */

/** How long the check and the announcement stay before the button resets. */
export const RESET_MS = 2000

/** The button `CopyCommand.astro` renders, and nothing else with `data-copy`. */
const BUTTON = '.copy-command__button[data-copy]'

/** Each button's pending reset, so a second click restarts its own timer. */
const timers = new WeakMap<HTMLButtonElement, ReturnType<typeof setTimeout>>()

/**
 * Copies a button's command, then shows and announces the result.
 *
 * On failure (no Clipboard API on a plain-http page, or permission denied)
 * it selects the command so Ctrl+C or Command+C still works, and drops any
 * check left by an earlier success.
 */
async function copy(button: HTMLButtonElement): Promise<void> {
  const row = button.parentElement
  const status = row?.querySelector('[data-copy-status]')

  let copied = true
  try {
    await navigator.clipboard.writeText(button.dataset.copy ?? '')
  } catch {
    copied = false
    const code = row?.querySelector('code')
    if (code) window.getSelection()?.selectAllChildren(code)
  }

  if (copied) button.dataset.state = 'copied'
  else delete button.dataset.state
  if (status) {
    status.textContent = copied
      ? 'Copied to the clipboard.'
      : "Couldn't copy. The command is selected, so press Ctrl+C or Command+C to copy it."
  }

  globalThis.clearTimeout(timers.get(button))
  timers.set(
    button,
    setTimeout(() => {
      delete button.dataset.state
      if (status) status.textContent = ''
    }, RESET_MS)
  )
}

/**
 * Listens for clicks on copy buttons anywhere in `root`.
 *
 * One delegated listener rather than one per button, so buttons rendered
 * after the script runs (a view transition, a deferred island) work too.
 *
 * @param root - Where to listen; the component passes the page's document.
 */
export function bindCopyCommands(root: ParentNode & EventTarget = document): void {
  root.addEventListener('click', event => {
    const button = (event.target as Element | null)?.closest?.<HTMLButtonElement>(BUTTON)
    if (button) void copy(button)
  })
}
