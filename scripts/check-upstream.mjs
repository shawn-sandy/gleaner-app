/**
 * Reports what changed in Gleaner (shawn-sandy/gleaner) since the site copy was last checked,
 * and which site files each change affects. Much of this site is hand-written from the plugin's
 * README, manifests and logo, and nothing updates that copy when the plugin changes.
 *
 * `upstream-sync.json` holds the bookmark: the upstream commit the site was last brought up to
 * date with. The script compares it with upstream's main branch and prints a Markdown report,
 * or nothing when no watched file changed. The PR that updates the site moves the bookmark.
 *
 * Run it with `npm run check:upstream`. `.github/workflows/upstream-drift.yml` runs it daily and
 * turns the report into an issue. `GITHUB_TOKEN`, when set, lifts the anonymous API limit.
 * Exits non-zero when GitHub cannot be reached, so an outage never reads as "up to date".
 */
import { realpathSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { fileURLToPath, URL } from 'node:url'

/**
 * One changed file from GitHub's compare API.
 * @typedef {{ filename: string, previous_filename?: string, status: string, patch?: string }} CompareFile
 */

// GitHub's compare API lists at most 300 changed files.
const MAX_COMPARE_FILES = 300
const FULL_SHA = /^[0-9a-f]{40}$/

const SKILL_FILE = /^plugins\/gleaner\/skills\/[^/]+\/SKILL\.md$/
// Edits inside a skill rarely change the homepage, and most upstream commits make them, so only
// a skill appearing, disappearing or moving counts.
const SKILL_LIST_CHANGES = new Set(['added', 'removed', 'renamed', 'copied'])

/** @param {CompareFile} file */
const pathsOf = file => [file.filename, file.previous_filename].filter(Boolean)

/** @param {...string} paths */
const touches =
  (...paths) =>
  /** @param {CompareFile} file */
  file =>
    pathsOf(file).some(path => paths.includes(path))

/**
 * True when a file stayed put and every changed line in its patch is a `"version":` line. Each
 * release bumps the version in plugin.json, which changes nothing the site shows. A missing patch
 * (GitHub leaves it out of large diffs) counts as a real change.
 * @param {CompareFile} file
 */
function bumpsOnlyVersion({ status, patch }) {
  if (status !== 'modified' || !patch) return false
  const changed = patch.split('\n').filter(line => /^[+-]/.test(line))
  return changed.length > 0 && changed.every(line => /^[+-]\s*"version"\s*:/.test(line))
}

const manifests = touches(
  '.claude-plugin/marketplace.json',
  'plugins/gleaner/.claude-plugin/plugin.json',
  'docs/chatgpt-marketplace.md'
)

/**
 * Each upstream file the site copies or describes, and the site files to check when it changes.
 * Each component's header comment names the upstream files its copy follows.
 * @type {{ matches: (file: CompareFile) => boolean, site: string[] }[]}
 */
export const WATCHES = [
  {
    matches: touches('README.md'),
    site: [
      'README.md',
      'src/components/astro/HomeHero.astro',
      'src/components/astro/HomeFeatures.astro',
      'src/components/astro/HomeInstall.astro',
    ],
  },
  {
    matches: touches('plugins/gleaner/skills/README.md'),
    site: ['plugins/gleaner/skills/README.md', 'src/components/astro/HomeFeatures.astro'],
  },
  {
    matches: file =>
      SKILL_LIST_CHANGES.has(file.status) && pathsOf(file).some(path => SKILL_FILE.test(path)),
    site: ['src/components/astro/HomeFeatures.astro'],
  },
  {
    // The plugin and marketplace names make up the install commands.
    matches: file => manifests(file) && !bumpsOnlyVersion(file),
    site: [
      'src/components/astro/HomeInstall.astro',
      'src/components/astro/HomeHero.astro',
      'src/utils/site-config.ts',
    ],
  },
  {
    // The site's palette and favicon are drawn from the logo.
    matches: touches('gleaner-symbol.svg'),
    site: [
      'public/images/gleaner-symbol.svg',
      'public/favicon.svg',
      'src/styles/gleaner-palette.css',
    ],
  },
]

/**
 * Groups changed upstream files by the watch they trip. Files no watch covers are dropped.
 * @param {CompareFile[]} files
 * @returns {{ files: CompareFile[], site: string[] }[]}
 */
export function findDrift(files) {
  return WATCHES.map(watch => ({ files: files.filter(watch.matches), site: watch.site })).filter(
    match => match.files.length > 0
  )
}

/** @param {CompareFile} file */
const describe = file =>
  file.previous_filename
    ? `\`${file.filename}\` (${file.status} from \`${file.previous_filename}\`)`
    : `\`${file.filename}\` (${file.status})`

/**
 * The Markdown report for an issue body, or `''` when there is nothing to do.
 * @param {{ repo: string, base: string, head: string, files: CompareFile[] }} comparison
 */
export function buildReport({ repo, base, head, files }) {
  const drift = findDrift(files)
  const truncated = files.length >= MAX_COMPARE_FILES
  if (drift.length === 0 && !truncated) return ''

  const lines = [
    `Gleaner changed since the site copy was last checked. [See every change](https://github.com/${repo}/compare/${base}...${head}).`,
    '',
  ]
  if (drift.length > 0) {
    lines.push('| Upstream file | Site files to check |', '| --- | --- |')
    for (const match of drift) {
      const site = match.site.map(path => `\`${path}\``).join('<br>')
      lines.push(`| ${match.files.map(describe).join('<br>')} | ${site} |`)
    }
    lines.push('')
  }
  if (truncated) {
    lines.push(
      `GitHub lists at most ${MAX_COMPARE_FILES} changed files, so a watched file may be missing from this list. Check the full comparison.`,
      ''
    )
  }
  lines.push(
    `When the site is up to date, set \`sha\` in \`upstream-sync.json\` to \`${head}\` in the same PR. The next daily check then closes this issue.`,
    ''
  )
  return lines.join('\n')
}

/**
 * Fetches a GitHub API path, failing on any non-2xx answer or after 15 s.
 * @param {string} path
 * @param {string} accept
 * @param {string | undefined} token
 */
async function github(path, accept, token) {
  const response = await fetch(`https://api.github.com/repos/${path}`, {
    signal: AbortSignal.timeout(15_000),
    headers: { Accept: accept, ...(token ? { Authorization: `Bearer ${token}` } : {}) },
  })
  if (!response.ok) throw new Error(`GitHub answered ${response.status} for ${path}`)
  return response
}

/**
 * Compares the bookmark with the latest commit on upstream's main branch and returns the report.
 * @param {{ repo: string, sha: string, token?: string | undefined }} options
 */
export async function checkUpstream({ repo, sha, token }) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repo)) throw new Error(`Not an owner/name repository: ${repo}`)
  if (!FULL_SHA.test(sha)) throw new Error(`Not a full commit sha: ${sha}`)

  // Pin main's sha first, so the comparison and the bookmark the report suggests are the same commit.
  const head = (
    await (await github(`${repo}/commits/main`, 'application/vnd.github.sha', token)).text()
  ).trim()
  // The report tells people to bookmark this value, so it must be a real sha.
  if (!FULL_SHA.test(head)) throw new Error(`GitHub's answer for main is not a commit sha`)
  const comparison = await github(
    `${repo}/compare/${sha}...${head}`,
    'application/vnd.github+json',
    token
  )
  const { status, files } = /** @type {{ status?: string, files?: CompareFile[] }} */ (
    await comparison.json()
  )
  // `behind` and `diverged` (main reset or force-pushed, or a bookmark off main) also come with an
  // empty or partial file list. Only `ahead` and `identical` can be trusted to be complete.
  if (status !== 'ahead' && status !== 'identical') {
    throw new Error(`Main is not ahead of the bookmark (comparison is ${status}), so check the sha`)
  }
  if (!Array.isArray(files)) throw new Error('GitHub sent a comparison without a file list')
  return buildReport({ repo, base: sha, head, files })
}

// Compare real paths: Node resolves symlinks for import.meta.url but not for argv, and a mismatch
// would exit 0 with no output, which the workflow reads as "up to date".
if (process.argv[1] && realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const { repo, sha } = JSON.parse(
    await readFile(new URL('../upstream-sync.json', import.meta.url), 'utf8')
  )
  const report = await checkUpstream({ repo, sha, token: process.env.GITHUB_TOKEN })
  if (report) process.stdout.write(report)
  else console.error(`The site copy is up to date with ${repo}.`)
}
