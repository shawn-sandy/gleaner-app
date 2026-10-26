/**
 * Reading time and older/newer links for a blog post, kept out of
 * `src/pages/posts/[...slug].astro` so they can be tested without Astro.
 */

/** Average adult silent-reading speed, in words a minute. */
export const WORDS_PER_MINUTE = 200

/** The fields these helpers read from a `posts` collection entry. */
export type NavigablePost = {
  id: string
  data: {
    pubDate: Date
    publish: boolean
  }
}

/** The posts either side of one post, by publish date. */
export type AdjacentPosts<T extends NavigablePost> = {
  /** The next post published before this one, if any. */
  older: T | undefined
  /** The next post published after this one, if any. */
  newer: T | undefined
}

/**
 * Counts the words a reader reads in a Markdown body: link and image targets,
 * HTML tags, and Markdown punctuation that stands alone are left out.
 *
 * @param markdown - A post's raw Markdown body, without frontmatter.
 * @returns The number of words.
 */
export function countWords(markdown: string): number {
  const text = markdown
    // `[label](url)` and `![alt](url)` keep their label or alt text.
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
  // A token counts only if it holds a letter or digit, so `#`, `-`, `|`
  // and code fences are skipped.
  return text.split(/\s+/).filter(token => /[\p{L}\p{N}]/u.test(token)).length
}

/**
 * Estimates how long a post takes to read, rounded up to whole minutes.
 *
 * @param markdown - A post's raw Markdown body. `undefined` (an entry with no
 *   body) reads as empty.
 * @param wordsPerMinute - Reading speed; defaults to {@link WORDS_PER_MINUTE}.
 * @returns Minutes to read, never less than 1.
 */
export function readingMinutes(
  markdown: string | undefined,
  wordsPerMinute: number = WORDS_PER_MINUTE
): number {
  return Math.max(1, Math.ceil(countWords(markdown ?? '') / wordsPerMinute))
}

/**
 * Finds the published posts just before and after a post, newest first with
 * ties broken by id, the same order `HomeBlog.astro` lists them in.
 *
 * @param posts - Every entry in the `posts` collection; drafts are ignored.
 * @param id - The current post's id.
 * @returns Both neighbours, each `undefined` at either end of the list or
 *   when `id` is a draft or not found.
 */
export function adjacentPosts<T extends NavigablePost>(
  posts: readonly T[],
  id: string
): AdjacentPosts<T> {
  const ordered = posts
    .filter(post => post.data.publish)
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime() || a.id.localeCompare(b.id))
  const index = ordered.findIndex(post => post.id === id)
  if (index === -1) return { older: undefined, newer: undefined }
  return { older: ordered[index + 1], newer: ordered[index - 1] }
}
