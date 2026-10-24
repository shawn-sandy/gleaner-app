# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- **YouTube skill post** (`src/content/posts/gleaner-youtube-skill.md`): a guide to the
  `/gleaner:youtube` skill as of Gleaner 2.11.0, drafted for 2.10 and brought up to date before
  publishing. Covers what a video clip holds, one Source per video, the no-description question,
  reading the transcript from YouTube's Show transcript panel (and pasting it where the panel
  can't be read, as in the Claude Code built-in browser without Claude in Chrome), clipping
  moments, where the skill runs, follow-ups that hand a clip to another installed skill, and the
  skill's history from 1.6.0 to 2.11.0. Written from the upstream youtube and follow-up skills and
  the README changelog at `0d96d93`
- **Gleaner 2.10 release post** (`src/content/posts/gleaner-2-10.md`): a blog post that follows the
  2.6 to 2.9 post through the Gleaner 2.10.1 and 2.10.2 releases: a structured bookmark preview
  after every save, "no preview", HTML companions, and description-based YouTube clips (listed
  under 2.10.0 upstream, which has no release of its own, so first released in 2.10.1), clickable
  download links in previews and "Markdown preview" versus "use Markdown" (2.10.1), and Markdown
  clips by default in ChatGPT, with no automatic HTML companions there, while Claude keeps HTML
  (2.10.2), with the install commands and where the plugin stands at 2.10.2. Written from the
  [shawn-sandy/gleaner](https://github.com/shawn-sandy/gleaner) GitHub release notes and README
  changelog
- **Homepage blog section** (`src/components/astro/HomeBlog.astro`): "From the blog", under the
  quick-install guide, features the newest published post on an evergreen card with a "Read the
  post" link, lists up to three earlier posts as rows of date, title and a one-line description,
  and links to `/blog`
  - Reads the `posts` collection: published posts only, newest first, posts with the same `pubDate`
    by id so the order does not depend on the order the collection returns. With no published post
    the section is left out
  - The earlier-posts list carries `role="list"`, which Safari otherwise drops from a list styled
    `list-style: none`
  - Prints each post's frontmatter day in UTC, so a build machine west of UTC does not date
    `pubDate: 2026-10-21` as October 20
  - `tests/components/HomeBlog.astro.test.ts` covers the order, the four-post cap, the same-date
    tie, the time zone, the `/blog` link, the list role, and the one-post and no-post cases;
    `e2e/home-blog.spec.ts` checks every link in the section lands on a page that renders, and
    that each row title link keeps its heading's size and weight against the site's `a` rule
- **Gleaner 2.6 to 2.9 release post** (`src/content/posts/gleaner-2-6-to-2-9.md`): a blog post
  that follows the 1.0 to 2.5 post through the next four releases: clips in the chat by default
  (2.6.0), plain-language clips with How it works, Steps, and a follow-up prompt (2.7.0), HTML
  files in the chat (2.8.0), and split articles and canonical-URL duplicate checks (2.9.0), with
  the install commands, where the plugin stands at 2.9.0, and a note on the unreleased switch to
  description-based YouTube clips on upstream `main`. Written from the
  [shawn-sandy/gleaner](https://github.com/shawn-sandy/gleaner) GitHub release notes and README
  changelog
- **Upstream drift check** (`scripts/check-upstream.mjs`, `upstream-sync.json`,
  `.github/workflows/upstream-drift.yml`): a daily workflow keeps one issue open while
  [shawn-sandy/gleaner](https://github.com/shawn-sandy/gleaner) has changes the site's hand-written
  copy has not caught up with, listing each changed upstream file and the site files to check
  - `upstream-sync.json` holds the bookmark, the upstream commit the site copy was last brought up
    to date with. The PR that updates the site moves it, and the next run closes the issue. It
    starts at `fd87a03`, the upstream commit the README copy matches most closely
  - Watched: the README and skills guide (copied here, and followed by the homepage sections), a
    skill added, removed or renamed (the homepage skill cards), the manifests and ChatGPT guide
    (install steps, the hero's install commands, and the site description), and the logo (the symbol
    and wordmark files, palette, favicon, and `SavedClip`'s knot). Edits
    inside a skill and version-only bumps to a manifest that stayed put are left out, since most
    upstream commits make them and they change nothing the site shows
  - `npm run check:upstream` runs the same check locally, for when Actions is unavailable. A GitHub
    error, a comparison without a file list, or a bookmark main is not ahead of fails the run
    instead of reading as "up to date". Only a run on `primary` opens, updates or closes the issue
  - `tests/check-upstream.test.ts` is a hard gate in CI
- **Changelog page from Gleaner's GitHub releases** (`src/pages/changelog.astro`,
  `src/libs/gleaner-releases.ts`, `src/components/astro/ReleaseNote.astro`): `/changelog` lists
  every published [shawn-sandy/gleaner](https://github.com/shawn-sandy/gleaner) release, newest
  first, with its notes, date, and a link to the release on GitHub
  - A `releases` content collection loads the releases from the GitHub API at build time, skipping
    drafts. It sends `GITHUB_TOKEN` when set (documented, commented out, in `.env.example`) to lift
    the anonymous limit of 60 requests an hour. Every release is fetched and rendered before the
    stored list changes, so if GitHub cannot be reached, or a release body cannot be rendered, it
    logs a warning and keeps the last good list; an outage or an offline dev server never fails
    the build. With nothing stored, the page links to GitHub's releases page instead
  - The rendered notes go through `filterXSS` (the `xss` package, now a direct dependency at the
    version already installed through the Netlify adapter), because Markdown passes raw HTML
    through and GitHub only sanitizes it on its own release page
  - Gleaner's release workflow calls a Netlify build hook after it publishes a release, so the
    page updates without a commit here. The hook URL lives in the gleaner repo's
    `NETLIFY_BUILD_HOOK` secret
  - Dates use New York time, so a late-evening release keeps the day the release post gives it on
    a build server running in UTC
  - The changelog starts at 2.2.0: versions 1.0.0 to 2.1.0 were never published as GitHub
    Releases

- **Footer links** (`src/components/astro/Footer.astro`): a Home, Blog, and Changelog line above
  the social links, in a `nav` labelled "Footer". The home e2e specs now look up the
  `navigation` landmark by its "Primary" name, since an unnamed lookup matches both navs

- **Gleaner release history post** (`src/content/posts/gleaner-1-0-to-2-5.md`): a blog post that
  walks through all 19 Gleaner plugin releases, 1.0.0 to 2.5.0, grouped by release day, with the
  install commands and a summary of where the plugin stands at 2.5.0. Written from the
  [shawn-sandy/gleaner](https://github.com/shawn-sandy/gleaner) changelog and commit history

- **Copy buttons on the install commands** (`src/components/astro/CopyCommand.astro`,
  `src/components/astro/HomeHero.astro`, `src/components/astro/HomeInstall.astro`): each Claude
  Code command in the hero and the Quick install card sits on its own row with an icon button
  that copies it
  - One command per button, because Claude Code takes a single slash command per message; the
    old two-line `<pre>` would have pasted both into one prompt
  - Copies with the Clipboard API and swaps the icon for a check. If the copy fails (plain
    `http`, permission denied) it selects the command so Ctrl+C or Command+C still works. Both
    outcomes are announced through a `role="status"` region, and the button's accessible name is
    "Copy" plus the command
  - The click logic lives in `src/utils/copy-command.ts` as one delegated listener on the
    document, so buttons rendered after the script runs work too
  - 32px square, borderless, and colour-only on hover and focus; selectors use two classes because
    Astro's `:where()` scoping loses to the vendor `button`, `button[type]` and
    `button:is(:hover, :focus)` rules (fixed height, primary fill, a 103% scale and dimming)

- **Dashboard app shell** (`src/layouts/Dashboard.astro`, `src/components/dashboard/`): `/dashboard`,
  `/dashboard/users` and `/profile` now share a dashboard layout with its own sidebar in place of
  the site navigation and footer
  - `DashboardSidebar` is a sticky column at 64rem and wider; below that it collapses to a top bar
    whose menu button opens the same links in a native `popover`, so there is one copy of the links.
    The account button sits in the bar on narrow screens rather than in the popover, because Clerk
    renders its account menu outside the sidebar and a click there light-dismissed the popover. A
    small script closes a menu left open when the viewport widens past the breakpoint. The whole
    sidebar is one `nav` landmark, and the current page is marked with `aria-current`
  - `DashboardPage` gives every dashboard page the same header (eyebrow, title, optional actions)
    and content width
  - New building blocks: `AccountPanel`, `DashboardCallout`, `DashboardSection`, `StatusPill`,
    `DashboardIcon` and a named line-icon set (`icons.ts`)
  - `fetchCurrentUserWithRole` (`src/utils/dashboard-user.ts`) looks up the signed-in user at most
    once per request, keyed on `Astro.locals`; the layout, the page and `UserInfo` share it, so a
    dashboard page makes one Clerk call. `getDashboardUser` shapes that result for display, with the
    last sign-in in UTC and labelled as such
  - `Base.astro` gains a `hideSiteChrome` prop to omit the site navigation and footer

- **Theme toggle** (`src/components/astro/ThemeToggle.astro`, `src/layouts/Base.astro`): a
  light/dark button in the site navigation bar
  - Stamps `:root[data-theme]`, which the token layer already honours over `prefers-color-scheme`;
    until a visitor chooses, nothing is stamped and the OS preference stays in charge
  - Stores the choice under Starlight's `starlight-theme` key, so the site and the docs routes
    share one preference
  - An inline `<head>` script in `Base.astro` restores the choice before first paint, so a stored
    theme never flashes the OS theme first
  - Native `<button>` with `aria-pressed`; the sun/moon icon is keyed off the root theme in CSS so
    it is correct before any script runs
  - `e2e/theme-toggle.spec.ts` covers both switch directions, persistence before first paint, OS
    fallback and the Starlight hand-off

- **Design System Record** (`DESIGN.md`, `PRODUCT.md`, `.impeccable/design.json`): the incumbent
  visual system and durable product context captured as machine-readable records
  - `DESIGN.md` follows the DESIGN.md format spec — YAML frontmatter carrying the eleven colour
    tokens, six type roles, radius and spacing scales, and nine component definitions, followed by
    the eight canonical prose sections
  - Ten named rules extracted from the implementation, including The Hydration Rule (colour marks
    interactivity), The One Weight Rule (one self-hosted display weight, one font request), and
    The 320 Rule (nothing widens the document at a 320px viewport)
  - Creative North Star recorded as "The Instrument Reading": neutral ground, precise scale,
    exactly one lit indicator
  - `.impeccable/design.json` sidecar carries what the frontmatter schema cannot — computed OKLCH
    canonicals and eight-step tonal ramps per colour, shadow and motion vocabularies, breakpoints,
    and seven drop-in component HTML/CSS snippets
  - `PRODUCT.md` records the evaluating-developer audience, the three confirmed differentiators,
    clone-or-template distribution, and an explicit list of evidence the project does **not** have,
    so future work cannot fabricate it
  - The README's Styling System section links `DESIGN.md` and a published Astro Kit design system
    artifact that renders its tokens, type roles and components in light and dark themes
- **Impeccable live mode** (`.impeccable/live/config.json`): durable configuration for browser-based
  design iteration. Running live mode injects a picker `<script>` into `src/layouts/Base.astro` and
  writes session state under `.impeccable/live/`; both are local development artifacts, removed by
  `live-server.mjs stop` and excluded from version control via `.gitignore`
- **Homepage Design Direction** (`src/components/astro/HomeHero.astro`, `src/styles/_design-tokens.scss`):
  the homepage now renders live component specimens instead of describing them
  - Seven direction tokens — `--ink`, `--ink-soft`, `--paper`, `--paper-sunk`, `--island`,
    `--island-bg`, `--rule` — each flipping in both `prefers-color-scheme: dark` and the
    `:root[data-theme]` override path, so an explicit toggle always beats the OS preference
  - "Colour marks hydration": `--island` paints only interactive elements. An E2E test fails the
    build if any non-interactive element computes to the accent
  - Three type roles where there was previously one: display (self-hosted Inter 600,
    24KB latin subset, preloaded), body (system sans), mono (code and labels)
  - `HomeHero.astro`: full-bleed band pairing a rendered `Card` with the import line that produces
    it. Content stays on the 80rem measure via `padding-inline: max(gutter, (100% - maxw) / 2)`
  - `FeatureCards.astro` gains `sectionTitle` and `promoted` props for two-tier output — promoted
    specimens carry a code slot, the remainder render as compact rows. Both default to the
    existing six-card layout, so current call sites are unaffected
  - `Card.astro` exports its `Props` type and accepts a named `code` slot
  - Docs: `project-docs/03-features/design-direction.md` and a Starlight guide at
    `/guide/design-direction`
- **Popover Navigation** (`src/components/astro/Navigation.astro`): site navigation moved into a
  native HTML popover panel opened by a hamburger button, at every viewport width
  - Zero JavaScript: open, close, Esc-to-close and outside-click dismissal all come from the
    `popover="auto"` and `popovertarget` attributes
  - `popover="auto"` is written explicitly. The attribute's invalid-value default is `manual`,
    which silently has no light dismiss and no Esc close
  - Exported `Props` type: `brandTitle`, `brandHref`, `menuId`, `showBrand`
  - Site-title brand link on the left; the Clerk auth control stays in the bar
  - `userId`-gated dashboard and profile links render into the panel through the default slot,
    so signed-in users get the same decluttered bar
  - 44x44px hit area (WCAG 2.2 SC 2.5.8), `aria-label="Primary"` landmark, reduced-motion-safe fade
  - `@supports not selector(:popover-open)` fallback renders the links as a static inline row and
    hides the hamburger in engines without the Popover API
  - New `sass:build` script for one-shot SCSS compilation (`npm run sass` is a watcher that never
    terminates, so it cannot be used as a verification command)
  - Coverage: `tests/components/Navigation.astro.test.ts` (8 cases) and
    `e2e/navigation-popover.spec.ts` (10 cases, passing on Chromium)
  - The popover is presentational and never an access-control mechanism; authenticated-only
    markup stays behind the server-side `userId` check
  - Full documentation: [Navigation Popover guide](/guide/components/navigation-popover)
- **Breaking (library consumers)**: `Navigation.astro`'s default slot now renders inside the
  popover panel rather than in the bar
- **Skip to main content link** (`src/layouts/Base.astro`): first focusable element on every page,
  letting keyboard users bypass the nav bar. Matters more now that the hamburger button, not the
  brand link, owns first focus
  - Styling comes from `@fpkit/acss`'s existing `body > a[href^="#"]` rule rather than a
    reimplementation, so it keeps that rule's slide-in transition and `--color-skip-link-bg` token
  - Target is the `<main id="main" tabindex="-1">` landmark in
    `src/components/astro/MainSection.astro`; `tabindex="-1"` is what moves focus rather than only
    the scroll position
  - `src/pages/offline.astro` and `src/pages/supabase-test.astro` bypass `MainSection`, so both
    gained their own `<main>` landmark (neither had one before)
  - Coverage: `e2e/skip-link.spec.ts`
- **User Sync Utility** (`src/utils/user-sync.ts`): Consolidated utility for fetching user data from Clerk and syncing with Supabase
  - `fetchUserWithRole()` function reduces component code by 80% (1 line vs 40+ lines)
  - Automatic user creation when users don't exist in database (handles PGRST116 errors)
  - Race condition safety with upsert operations (prevents duplicate user creation)
  - Graceful error handling with structured error fields (`error` for critical, `roleError` for warnings)
  - Non-throwing design allows components to display appropriate error messages
  - Default role assignment (`'member'`) for new users
  - Re-exported through `#utils/user-sync` and `#utils` for convenient importing
  - Comprehensive JSDoc documentation with usage examples
  - Full documentation: [User Sync Utility Guide](/guide/utilities/user-sync)
- **Component Updates**: Refactored `UserInfo.astro` to use new User Sync Utility
  - Eliminated duplicate user fetching and role sync code
  - Consistent error handling across user-facing components
  - Improved maintainability with centralized sync logic
- **Comment System**: Full-featured comment system for blog posts and documentation pages
  - Polymorphic database design supporting multiple content types (`post`, `doc`)
  - Threaded comments with 3-level nesting support
  - Real-time comment creation, editing, and deletion
  - User authentication via Clerk integration
  - Rate limiting and spam protection (5 comments per minute per user)
  - Content sanitization with DOMPurify for XSS prevention
  - CSRF token validation for secure form submissions
  - Soft delete functionality (comments marked as 'archived')
  - Responsive design with accessibility features (ARIA labels, keyboard navigation)
  - Server-side rendering with client-side interactivity
- Documentation improvements and updates
- **Auth and database setup skill** (`.claude/skills/auth-and-database-setup/`): a Claude skill
  that turns on Clerk login and a Turso or Supabase database
  - The person pastes every key into `.env` themselves, so no secret passes through the chat
  - `scripts/status.mjs` reports each feature as ON or OFF using the same rules as
    `src/utils/env-config.ts`, and never prints a key, URL or hostname
  - When Supabase is configured, it also checks that the `users` table from
    `scripts/migrations/001_core_schema.sql` exists (10-second timeout), and whether Clerk
    user sync is ready (login on plus `SUPABASE_SERVICE_ROLE_KEY`)
  - The `project-setup` skill now hands login and database setup off to it

### Changed

- **Site copy caught up with Gleaner 2.11.0 (`0d96d93`)** (`README.md`,
  `plugins/gleaner/skills/README.md`, `src/components/astro/HomeFeatures.astro`,
  `src/content/posts/youtube-skill-constraints.md`, `upstream-sync.json`): since 2.11.0, Gleaner writes a video clip from the transcript it reads in
  YouTube's own Show transcript panel, in the Chrome side panel and Claude in Chrome, and falls
  back to the description and chapters where the panel can't be read
  - The README and skills guide mirror upstream again: upstream's changes since `f4e3174` merged
    into the mirrors, links to files that only exist upstream pointed at GitHub, then Prettier
  - The youtube skill card and "What's in every clip" say a video is clipped from its transcript,
    or from its description and chapters without one, where they said the description only
  - `src/content/posts/youtube-skill-constraints.md`, still listed on the homepage, opens with a
    dated update note: it describes 2.10, 2.11.0 reads the transcript panel in the Chrome side panel
    and Claude in Chrome, and its paste workarounds now apply only where the panel can't be read.
    Its description starts "As of Gleaner 2.10". The body is unchanged, as a record of 2.10
  - The hero, install cards and site description are unchanged: the hero already names YouTube
    moments, the ChatGPT guide changed only its YouTube transcript step, and the manifests changed
    only their version
  - The bookmark moves from `f4e3174` to `0d96d93`, main's head one commit past the `v2.11.0` tag
    (`075bb34`); that commit only adds a "Release owed" warning to upstream's validate workflow, with
    its tests and notes in its README, `AGENTS.md` and `CLAUDE.md`, so the next drift check reports
    nothing
- **Site copy caught up with Gleaner 2.10.2 (`f4e3174`)** (`README.md`,
  `plugins/gleaner/skills/README.md`, `src/components/astro/HomeHero.astro`,
  `src/components/astro/HomeFeatures.astro`, `upstream-sync.json`): since 2.10.2, a clip left in
  the chat is a Markdown file in ChatGPT and an HTML file in Claude, and since 2.10.0 every save
  shows a preview in the conversation
  - The README and skills guide mirror upstream again, rebuilt the way the last sync did: upstream
    text, links to files that only exist upstream pointed at GitHub, the fork step still naming
    shawn-sandy/gleaner, then Prettier. The same steps applied to `2bc1086` reproduce the previous
    mirrors byte for byte
  - The hero deck and fine print, the "This conversation" destination, "What's in every clip" and
    "Saves where you already keep things" say Markdown in ChatGPT and HTML in Claude where they
    said an HTML file in the chat. The destinations paragraph adds the post-save preview: an
    overview, key details, why it matters and links to the source and the clip
  - The hero's example clip still reads "HTML file in the chat": it follows the README's example,
    which is a Claude one. The install cards and site description are unchanged: the ChatGPT
    guide's import steps did not change, and the manifests changed only their format wording and
    version
  - The bookmark moves from `2bc1086` to `f4e3174`, the `v2.10.2` tag, so the next drift check
    reports nothing
- **Hero logo shrinks as it fades** (`src/components/astro/HomeHero.astro`): the scroll-driven fade
  now also scales the logo from full size to 80% over the same first logo-height of scroll, using
  the `scale` property so it composes with any transform. Reduced motion and browsers without
  scroll-driven animations keep it opaque and full size. `e2e/home-hero-logo-fade.spec.ts` checks
  the drawn width shrinks through the range and returns at the top, and stays full size under
  reduced motion
- **Design System Record renamed to Gleaner** (`DESIGN.md`): the system is named Gleaner, and the
  record now covers the homepage sections that shipped without a spec
  - The Overview no longer says the homepage's latest-posts list paints with the instrument
    palette; `HomeBlog`'s posts use the Gleaner layer
  - Documents `HomeInstall`'s Quick install cards, `HomeBlog`'s latest-post card and earlier-post
    rows (with their contrast on Paper, computed from the shipped hex values), `CopyCommand`, and
    the hero logo's scroll-driven fade and the conditions that keep it opaque
  - Adds three brand type roles and six frontmatter component entries
- **Design Direction guide covers the Gleaner brand layer** (`src/content/docs/guide/design-direction.mdx`,
  `project-docs/03-features/design-direction.md`): the Starlight guide and the project docs page documented only the
  instrument system, so both now carry the Gleaner layer from `DESIGN.md`
  - The scoped palette: `data-gleaner`, the `--g-*` and `--glean-*` properties in `src/styles/gleaner-palette.css`, its
    three theming scopes, and why it stays out of `_design-tokens.scss`
  - The Separate Hue Rule and why the exact-match accent audit still passes (evergreen at OKLCH hue 182 against Harbour
    Teal's 215), with the hero contrast figures computed from the shipped hex values
  - Plus Jakarta Sans's display use at 600-800, limited to brand moments, and each brand component with where it is
    used, including the hero logo's scroll fade and its reduced-motion and `@supports` conditions
  - What a Gleaner palette override must not break, and the brand layer's e2e coverage under Verification
  - The guide's Related Files table lists the brand components and no longer calls `HomeHero` a component specimen
- **Homepage YouTube copy caught up with Gleaner `2bc1086`** (`src/components/astro/HomeFeatures.astro`):
  the youtube skill card and "What's in every clip" still said video clips are built from the
  transcript
  - The youtube skill card says a video's summary comes from its description, with its channel,
    useful links and chapters, and that clipping moments needs a pasted transcript
  - "What's in every clip" adds the channel line, the links list and chapters as key moments
  - The hero and site description are unchanged: upstream's intro and manifests still describe
    saving parts of a video
- **README mirrors caught up with Gleaner `2bc1086`** (`README.md`,
  `plugins/gleaner/skills/README.md`, `upstream-sync.json`): the README and skills guide match
  upstream again, rebuilt the way the last sync did: upstream text, links to files that only exist
  upstream pointed at GitHub, the fork step still naming shawn-sandy/gleaner, then Prettier
  - They cover 2.9.0 (articles split across pages read to the end, canonical-URL duplicate checks,
    parts that start from a matching heading) and the unreleased YouTube change: clips are written
    from the video's description and chapters, with a Channel line and a Links section, and a
    pasted transcript is needed for a fuller summary or for parts
  - `docs/chatgpt-marketplace.md` changed only its YouTube guidance and test checklist, which the
    install cards don't show, so `HomeInstall.astro` is unchanged. The homepage copy for these
    changes was updated separately
  - The bookmark moves from `79b80e2` to `2bc1086`, so the next drift check reports nothing
- **Browser and home-screen icons use the stacked-card symbol** (`public/favicon.svg`,
  `public/icons/icon-192x192.png`, `public/icons/icon-512x512.png`): the tab icon was still the
  evergreen hand without the cards, and the PNG icons were the Astro starter logo
  - `favicon.svg` is a copy of `public/images/gleaner-symbol.svg`
  - The PNGs are rendered from it with sharp and flattened on `paper` (`#fcfcfd`), since iOS fills
    a transparent apple-touch icon's corners with black. The 192px one is the apple-touch icon
  - The upstream drift check's logo watch lists both PNGs beside the favicon
- **Site nav pinned, with the Gleaner wordmark as its brand** (`src/components/astro/Navigation.astro`,
  `src/components/astro/HomeHero.astro`, `public/images/gleaner-wordmark-65px.svg`): the nav stays
  at the top of the viewport as the page scrolls, and the homepage hero opens with the Gleaner
  symbol
  - The brand link is now the 65px wordmark image, 2em tall (60px down to 32px by width), and
    `brandTitle` is its alt text rather than visible text, so it should keep "Gleaner" in it. The
    name in the image is dark green, so it reads poorly on the dark bar
  - acss's `html, body { height: 100% }` held `body` to one viewport, so the sticky bar scrolled
    away after the first screen. `body` now grows with the page when it holds the nav, and
    `scroll-padding-top` lands anchor jumps, the skip link's included, below the bar
  - The focused skip link paints above the bar (`--z-index-skipLink`); at acss's z-index 100 the
    sticky bar covered it. `e2e/skip-link.spec.ts` now checks it is the top element, and
    `e2e/navigation-popover.spec.ts` checks the bar stays pinned past the first screen
  - The hero symbol scales from 112px on a phone to 200px from an 800px viewport up
  - The four nav brand contrast e2e tests went with the brand text they measured, and the upstream
    drift check's logo watch lists the new wordmark files in place of `Navigation.astro`
- **Stacked-card Gleaner symbol** (`public/images/gleaner-symbol.svg`): the symbol now sits on three
  stacked rounded cards, the back two tilted, in place of the evergreen disc. The homepage hero
  draws this file, and the nav's wordmark carries the same symbol. Upstream Gleaner still uses the
  disc
  - New alongside it: `gleaner-sq.svg` and `gleaner-square copy.svg` (copies of the new symbol),
    `gleaner-stacked-wordmark.svg` (the symbol beside "Gleaner", 716×300) and
    `gleaner-wordmark-65px.svg` (the same wordmark at 65px tall)
- **Homepage search and clip-anatomy copy scoped** (`src/components/astro/HomeFeatures.astro`): the
  feature heading, the "Search by asking" callout and "What's in every clip" now match what
  Gleaner does under its chat default
  - Search only finds stored clips, so the heading reads "Store it, find it again" and the callout
    says a clip left in the chat won't turn up
  - The section list is labeled as a page clip's; videos get key moments and tutorial pages get
    numbered steps in place of key points (tutorial videos keep key moments)
- **Site copy caught up with Gleaner `79b80e2`** (`README.md`, `plugins/gleaner/skills/README.md`,
  `src/components/astro/HomeHero.astro`, `src/components/astro/HomeFeatures.astro`,
  `src/components/astro/HomeInstall.astro`, `src/utils/site-config.ts`, `upstream-sync.json`): the
  README and skills guide mirrors match upstream again, now with four skills and the follow-up
  guide, and the homepage follows Gleaner's new default
  - Clips now come back as an HTML file in the chat unless you name a place or set a default, so
    the hero's example clip, its fine print, and the destinations list lead with the chat, and the
    install cards call Google Drive optional rather than the default save location
  - The hero eyebrow and site description call Gleaner "a web clipper for Claude and ChatGPT", as
    upstream's README title now does. The preferences card says to run setup, since the first save
    no longer asks
  - The bookmark moves from `fd87a03` to `79b80e2`, so the next drift check reports nothing
- **Homepage feature section: the follow-up skill** (`src/components/astro/HomeFeatures.astro`): a
  fourth card for `follow-up`, the skill upstream Gleaner added, and the intro now says "four
  skills"
  - The card's title, description and asks follow the Gleaner README and skills README; the asks
    are the README's own examples, word for word, like the other cards'
  - The skill cards sit in a grid of up to two columns, so four make an even two by two instead of
    three in a row and one stretched alone; one column below about 704px
  - Cards side by side share their row's tracks through `subgrid`, so their phrase lists start
    level even where the follow-up card's longest ask wraps (about 704px to 848px)
  - A new test checks that the intro's skill count matches the cards rendered

- **Homepage feature section copy** (`src/components/astro/HomeFeatures.astro`): shorter, plainer
  wording with the same facts; the section headline, card titles and callout titles are unchanged
  - The glean and youtube cards open with what you can save; the youtube card uses the README's
    "a whole video or just the moments that matter"
  - "Claude's answer" becomes "the answer you got", matching the hero, and the intro says "Claude or
    ChatGPT picks the right one", since Gleaner also runs in ChatGPT
  - The clip heading reads "What's in every clip", and its intro says "a title and details such as
    the source, date and tags" instead of "the details at the top"
  - The filing callout no longer reads as if the category were a type
  - The `--to` flag in the destinations intro keeps its leading space after the line rewrap, and
    `white-space: nowrap` stops it breaking at its hyphens

- **Homepage hero copy** (`src/components/astro/HomeHero.astro`): the hero now names ChatGPT
  alongside Claude, as the Quick install section already did
  - Eyebrow "Read-it-later for Claude and ChatGPT"; the deck says "save" to match the install
    steps and no longer repeats the destination list from the fine print
  - The second link reads "See an example", since it jumps to a static example rather than a demo
  - The requirements line reads "Needs a paid Claude plan or a ChatGPT workspace"

- **Site navigation bar** (`src/components/astro/Navigation.astro`, `src/layouts/Base.astro`): a
  larger brand, more room, and the menu parked
  - The brand grows from 1.375rem to 1.875rem (a 60px symbol) between about 387px and 440px wide;
    the existing 1rem rule below 360px still keeps a 320px phone free of horizontal scrolling
  - The bar gets `--space-3` block padding and `flex-shrink: 0`; `body` is a flex column and
    `_base.scss`'s explicit `min-height: 4rem` let it squeeze the taller bar back to 64px. The open
    panel now starts below the 84px bar instead of at `_navigation.scss`'s `top: 4rem`
  - New `showMenu` prop (default `true`). `Base.astro` passes `false`, so the hamburger is hidden
    until the menu is ready; the panel still renders because the bar's row layout keys off
    `:has(> [popover])`. The e2e hamburger suite skips itself at runtime while no hamburger is
    present, and its anonymous-visitor link check now runs on its own
  - While parked, signed-in visitors have no nav route to `/dashboard` or `/profile`: those links
    live in the panel

- **Homepage quick install guide** (`src/pages/index.astro`, `src/components/astro/HomeInstall.astro`,
  `src/layouts/Layout.astro`): the "Latest posts" list and its sidebar give way to a two-column
  install guide, one card for Claude and one for ChatGPT
  - Steps follow the Gleaner README's Install section and its `docs/chatgpt-marketplace.md`; each
    card links to the full guide
  - `Layout.astro` gains a `hideSidebar` prop; the homepage sets it, and every other page keeps the
    sidebar
  - The columns stack once two 22rem cards no longer fit; the Claude Code commands wrap rather than
    scroll at phone width
  - Only the cards set `data-gleaner`. The "Quick install" heading and intro stay on the site's
    Inter heading and colours, so the homepage keeps the display-role heading that
    `e2e/homepage-design-direction.spec.ts` checks now that "Latest posts" is gone
  - Code on the cards sits on `--g-chip`, as the skill cards' command pills do: the dark palette's
    `--g-code-bg` is the card's own colour, so code lost its surface there
  - `tests/components/HomeInstall.astro.test.ts` guards the heading order and catches Astro dropping
    the space around an inline element at a source line break; `e2e/home-install.spec.ts` checks
    that code stands apart from its card in both themes
- **Body copy set in Plus Jakarta Sans** (`src/styles/_design-tokens.scss`, `DESIGN.md`,
  `.impeccable/design.json`): `--font-family-sans` now leads with Plus Jakarta Sans, so body text on
  every site route outside the Starlight docs renders in the Gleaner wordmark's typeface at 400 instead of the system sans. Headings
  stay on Inter 600, and labels stay mono
  - The `@font-face` moved from `Navigation.astro` and `HomeHero.astro` into the global token file,
    so it is declared once. It reuses the variable woff2 the nav brand already preloads, so the site
    still makes two font requests

- **Homepage rebuilt around Gleaner** (`src/pages/index.astro`, `src/components/astro/HomeHero.astro`,
  `src/components/astro/HomeFeatures.astro`, `src/components/astro/SkillCard.astro`,
  `src/styles/gleaner-palette.css`): the hero, nav brand and the section below the hero now present
  Gleaner instead of Astro Kit
  - The hero pairs the pitch and an Install Gleaner link with the README's example told as a copper
    string of asks (`GleanPart`) that ties off in the clip they saved (`SavedClip`); the nav brand
    shows the Gleaner symbol beside a larger 1.375rem title (1rem at 360px and narrower, where the
    bar would otherwise overflow), `SITE_TITLE` is "Gleaner", and Plus Jakarta Sans (the wordmark's
    face) is self-hosted and preloaded
  - The Gleaner lists clear the @fpkit/acss `li` margin and indent, which broke the copper string
    between asks and made the last tag pill taller; `e2e/home-gleaner-lists.spec.ts` guards it
  - `HomeFeatures` replaces the "What's in the kit" cards: the three skills, what every clip gets
    (the README's sample clip, captioned "Example", with numbered callouts), and the five save
    destinations with their `--to` flags. Copy follows the Gleaner README
  - The Gleaner colours live in `src/styles/gleaner-palette.css` on `[data-gleaner]` and flip in
    all three theme scopes; none of them is the `--island` accent, and the homepage accent audit
    still passes. DESIGN.md records the layer with measured contrast
  - `SITE_DESCRIPTION` describes Gleaner, and the `application-name` and
    `apple-mobile-web-app-title` tags in `Base.astro` read `SITE_TITLE` instead of a hard-coded
    "AstroKit"; the theme-repaint e2e probe reads the Gleaner ask card now that no `[data-card]`
    renders on the homepage
  - `Layout.astro` falls back to `SITE_DESCRIPTION` instead of "Sign in to your account" for pages
    that pass no description (`/about`, `/blog`, the tag pages and others), in both the meta
    description and the header subtitle
- **README describes Gleaner** (`README.md`, `plugins/gleaner/skills/README.md`): the root README
  now mirrors the [Gleaner plugin README](https://github.com/shawn-sandy/gleaner/blob/main/README.md)
  in place of the Astro Basics overview, and the skills usage guide sits at the same path as
  upstream. Links to files that only exist in the plugin repository point at GitHub
- **E2E tests follow one base URL** (`playwright.config.ts`, `e2e/`): specs navigate with relative
  paths instead of a hard-coded `http://localhost:4321`, and `use.baseURL` reads
  `PLAYWRIGHT_BASE_URL` (default `http://localhost:4321`). The dev server Playwright starts uses the
  port from the same URL. Previously a server from another checkout holding 4321 was tested
  silently
- **Homepage hero speaks to the agentic starter** (`src/components/astro/HomeHero.astro`): the
  headline is now "Build agentic web apps on Astro Kit.", the deck names what comes wired in (login,
  database, dashboard) and that the repo is set up for Claude Code, and the eyebrow drops the "zero
  client JS" claim, which is Astro's baseline and not something the kit adds
- **Homepage sections have headings** (`src/pages/index.astro`): "What's in the kit" and "Latest
  posts" as `h2`s, so the feature cards and the post list no longer follow the hero `h1` without a
  section heading of their own
- **PRODUCT.md** names the primary user as a non-developer who hands the repo to Claude Code, drops
  the Turso and threaded-comment claims, and records the open security constraints (auth fails open
  without Clerk keys; `POST /api/test/sync-user` has no auth check)

- **Breaking: the contact form is email-only** (`src/pages/api/message-us.ts`): submissions to
  `POST /api/message-us` (the `/message-us` page) are no longer stored; each one is delivered only
  as the `contact-notification` email
  - Requires `EMAIL_PROVIDER`, `EMAIL_PROVIDER_API_KEY`, `EMAIL_FROM_ADDRESS` and
    `EMAIL_TO_ADDRESS`; without them the endpoint answers 503 instead of accepting the message
  - A failed send answers 502 rather than reporting success, since nothing else records it
  - The response no longer carries an `id`, the email no longer shows a message ID, and the sender's
    IP address and user agent are no longer recorded (`src/utils/ip-validation.ts` removed)
  - `GET /api/message-us` reports whether email is configured instead of the database provider

- **Supabase is the only database**: `db:wizard` and `db:status` configure and report Supabase
  only, `src/utils/env-config.ts` drops `TURSO_*` and `DATABASE_PROVIDER`, and `npm run setup:roles`
  generates PostgreSQL migrations only and prints the `psql` command to apply them

- **Dashboard components restyled to the design direction** (`src/components/dashboard/`):
  `StatsCards` is a single hairline-divided strip, `PostPreview` a column list that stacks in narrow
  containers, `ActivityFeed` a timeline and `QuickActions` a row list. Existing props still work:
  `icon` accepts a dashboard icon name or, as before, any text such as an emoji, and posts gain an
  optional `href` for an edit link. "Create new post" moves from the quick actions to the page header

- **Accent repointed from violet to petrol** (`src/styles/_design-tokens.scss`): `--island` and
  `--island-bg` move off the violet/indigo family that generated palettes converge on
  - Light `#5b2cf5` → `#0b6070`, dark `#9b7dff` → `#6bb9c9`; the washes follow, `#f0ebff` →
    `#e6f2f6` and `#1e1830` → `#102a33`. Low chroma is the intent: the accent now sits beside ink
    as a second voice instead of shouting over it
  - Two token declarations cover the whole surface. Links (`--link-color`), focus rings, both hero
    CTAs and the feature-card accent already resolved through `--island`, so no component changed
    colour by hand. The `color-mix` hover states needed no rework either — they mix toward `--ink`,
    which is hue-agnostic
  - Contrast measured against the running page in both themes: links, ghost label and primary fill
    all 7.01:1 in light and 8.54:1 in dark; accent on its own wash 6.30:1 light, and the lowest
    pair overall is unchanged at ink-soft on paper-sunk (5.39:1 light, 6.77:1 dark)
  - `e2e/homepage-design-direction.spec.ts` needed no assertion change: it reads `--island` off the
    live document and resolves it through the browser's own colour parser rather than comparing
    against a literal
- **Hero call-to-action colour pass** (`src/components/astro/HomeHero.astro`): the two hero CTAs
  read as a primary and a secondary rather than as two equal buttons
  - The secondary's border drops from full-chroma `--island` to the neutral `--rule`. Both buttons
    previously painted the accent at the same strength, so the border measured the same 7.01:1
    against paper as the primary's fill and the pair carried identical visual weight. The accent
    stays on the secondary's label, so "colour marks hydration" is unaffected — the rule forbids
    accenting elements a visitor _cannot_ operate, and the E2E audit only polices that direction
  - Hover and pressed fills are mixed toward ink in OKLCH at 88% and 78%. `--ink` is near-black in
    light and near-white in dark, so a single pair of declarations darkens the accent on paper and
    lightens it on the dark surface with no second theme block. Label contrast rises rather than
    falls in both: light 7.01 → 8.07 → 9.04, dark
    8.54 → 9.24 → 9.88. The mix is `oklch` because the same operation in sRGB mutes the accent's
    chroma as it darkens
  - The primary previously had no colour change on hover at all; `text-decoration: underline` was
    its only feedback. The underline stays as the non-colour cue, so the state never relies on hue
  - The secondary promotes its border back to the accent on hover, earning at hover what the
    resting state trades away for hierarchy
  - `transition` covers `background-color` and `border-color` only at 150ms. Nothing moves, so
    there is no motion to gate behind `prefers-reduced-motion`
- **Typographic hierarchy pass** (`src/styles/_base.scss`, `src/components/astro/Footer.astro`,
  `src/pages/index.astro`): three adjustments so heading, body and supporting text read at
  distinct levels
  - The display role now covers `h1` through `h6` rather than `h1`-`h3`. Every level resolves to
    weight 600, the single weight the self-hosted woff2 ships, so the wider range costs no
    additional font request. `text-transform: capitalize` deliberately stays on `h1`-`h3`: `h4`-`h6`
    are used for UI labels, and the contact form's `h6` error summary would otherwise render as
    "Please Correct The Following Errors"
  - Footer drops to `0.875rem` on `--ink-soft`, matching the compact feature rows. Social links
    need `--link-fs` retuned rather than a `font-size` override, because the vendor rule
    `a[href] { --link-fs: 1rem; font-size: var(--link-fs) }` declares the variable on the element
    itself, where inheritance cannot reach it
  - The homepage hero and the feature cards were flush; the composing section in `index.astro` now
    carries `margin-block-start: 4rem`. The spacing lives at the call site because `FeatureCards`
    is a package export and must not carry homepage-specific margin
- **Navigation styles scoped to `[data-site-nav]`**: every selector in
  `src/styles/components/_navigation.scss` and in `Navigation.astro`'s `is:inline` first-paint
  block previously matched bare `nav`, `nav:has(> [popover])` and `nav > button[popovertarget]`.
  `Navigation` is exported from `src/components/index.ts` and the package's `./astro` entry, so a
  consumer page with its own popover navigation inherited the site's 44x44 button, transparent
  border and fixed-position panel
  - The root `nav` now carries `data-site-nav` and all 22 selectors are prefixed with it
  - The marker adds `(0,1,0)` uniformly, so every precedence relationship is preserved: the
    inline block moves `(0,1,2)` -> `(0,2,2)` and the stylesheet rules `(0,2,2)` -> `(0,3,2)`
  - **Breaking (library consumers)**: hand-written popover nav markup that relied on these styles
    leaking out of the package must add `data-site-nav` to its root `nav`. Consumers rendering the
    exported `Navigation` component are unaffected — it carries the marker itself

- **Page background**: `body` now sets an explicit `background-color: #fff` in
  `src/styles/_base.scss`. Nothing previously painted the body, so pages fell back to the
  browser's default canvas, which renders dark under `prefers-color-scheme: dark`. The value is
  literal rather than tokenised, so the page stays white in both colour schemes
  - **Superseded by the Homepage Design Direction work above**: the literal is now
    `var(--paper)`, which is the point — the body is meant to follow the colour scheme rather
    than stay white in both. The original entry stands as the record of why the literal was
    there; it is no longer the current behaviour
- Minor updates and refinements

### Removed

- **Starter blog posts** (`src/content/posts/`): the four template posts by "Astro Learner"
  (`post-1.md`, `post-2.md`, `mdx-example.mdx`, `youtube.mdx`), leaving the Gleaner release history
  post as the only post. `e2e/astro-v7-upgrade.spec.ts` now loads `/posts/gleaner-1-0-to-2-5` in
  place of the removed `/posts/post-2`

- **Messages feature**: the `messages` table, the dashboard inbox (`/dashboard/messages`), the
  `/forum` page (it only listed messages), `/api/messages`, `MessageList.astro`, `MessagesList.tsx`,
  the `useSupabase` hook, `src/libs/supabase-server.ts`, and `npm run db:seed:messages`
  - `scripts/migrations/006_drop_messages_table.sql` drops the table from existing Supabase
    databases. It is irreversible; export the table first if you need its rows
- **Turso and the database abstraction layer**: `getDatabase()` (`src/libs/database.ts`,
  `src/libs/database-types.ts`), `src/libs/turso.ts`, `db/migrations/`, `db/schema.sql` and the
  `@libsql/client` dependency
- **Database tooling built on them**: `db:setup`, `db:manage`, `db:schema`, `db:reset`, `db:check`,
  `db:migrate*`, `db:switch*`, `db:backup`, `db:restore`, `test:db:connection` and
  `test:db:abstraction`, their scripts, and the matching `/db-*` Claude commands except
  `/db-setup` and `/db-status`
- **Supabase test page**: `/supabase-test` and `/api/supabase-test`

### Fixed

- **Post links pointed at `/posts/undefined`** (`PostsList.astro`, `ContentList.astro`,
  `AstroPages.astro`, `CollectionList.astro`, `CollectionTagList.astro`, `src/pages/tags/[tag].astro`):
  post URLs were built from `post.slug`, which the content layer's glob loader no longer sets. The
  sidebar's recent-posts list on every page and the tag pages linked each post to the 404 at
  `/posts/undefined`, and the paginated lists at `/posts/1` and `/content/1` rendered their links
  with no `href` at all. They now use `post.id`, which the post route matches on. The components
  guide's `PostCard` example is updated to match
  - `e2e/post-links.spec.ts` checks that every post link on `/posts/gleaner-1-0-to-2-5`, `/blog`,
    `/tags/gleaner`, and `/posts/1` returns 200

- **Nav bar wider than a phone for signed-out visitors** (`src/components/astro/Navigation.astro`):
  beside Clerk's "Sign in" button, the login slot's acss padding (1rem on the list, 0.75rem on each
  item) made the page scroll sideways by 27px at 320px and 7px at 375px. Up to 30rem the list sets
  `--nav-padding-inline` to 0.25rem, so the bar fits from 320px up in both themes with its 16px edge
  kept; wider screens keep the old spacing
  - The e2e reflow checks did not catch it: without a Clerk key the sign-in button never renders,
    and the nav suite skips itself while the menu is parked

- **Nav brand unreadable in dark mode** (`src/components/astro/Navigation.astro`): the evergreen
  name from the entry below measured 2.45:1 on the dark bar. In dark mode it now uses the Gleaner
  palette's mint `#9ed9c8` (12:1), whether the OS preference or the theme toggle picked dark;
  light mode keeps the evergreen (7.6:1). `e2e/navigation-popover.spec.ts` holds all four theme
  routes to 4.5:1

- **Brand name painted in link teal** (`src/components/astro/Navigation.astro`): the site's
  `a[href]` rule gave the brand `--link-color`, so it never followed the theme as its comment
  claimed. It now uses the symbol disc's evergreen `#185C53` in both themes

- **Interactive sections randomly dead on sites built without a Clerk key** (`astro.config.mjs`):
  `clerk()` injected its two browser startup scripts on every page even with no publishable key,
  and whichever ran first threw `@clerk/astro: Missing publishableKey`. Every island awaits the
  before-hydration script before it starts, so on loads where that copy ran first no island on the
  page hydrated (a card gallery's Next button and its testimonials froze on about 1 load in 4). A
  `clerkIntegration()` helper now reads the key with `loadEnv` and, unless it starts with `pk_`,
  runs Clerk's `astro:config:setup` hook with a no-op `injectScript`. The integration stays
  registered because `Show` needs its virtual config module. Sites that add a key must rebuild,
  since the publishable key is baked in at build time
- **Supabase tables unreachable without automatic Data API grants; users could set their own
  role** (`scripts/migrations/007_data_api_grants.sql`): 001 and 002 relied on Supabase granting
  every API role full access to new tables. Projects without those grants (the default for new
  projects since 2026-05-30) answered `42501 permission denied` to every role, including the
  service role behind the Clerk webhook and user sync. Where the grants did exist, a signed-in user
  could update their own `users.role`, which `requireRole()` trusts. 007 revokes everything, then
  grants `service_role` full DML and `authenticated` only what `/api/user/profile` and
  `/api/user/profile-with-org` use, with column-level `UPDATE`. `anon` gets nothing. Rollback in
  `rollback_007_data_api_grants.sql`
  - The auth-and-database-setup status script reads an anon `42501` as the table existing, and
    once the anon key checks out it probes again as `service_role` when
    `SUPABASE_SERVICE_ROLE_KEY` is set. Clerk user sync stays "not ready" until that probe passes
  - The setup guides list 007 in their fresh-install steps
- **Dashboard menu covered the page in browsers without popovers** (`src/components/dashboard/DashboardSidebar.astro`):
  below 64rem the sidebar's link panel was always `position: fixed`, and where the `popover` attribute
  is unsupported (Chrome and Edge before 114, Safari before 17, Firefox before 125) nothing hid it,
  so it sat over the page permanently while the menu button did nothing. The fixed dropdown now
  applies only under `@supports selector(:popover-open)`. Browsers that support `@supports selector()`
  but not popovers list the links in flow under the bar, hide the button and stop the bar sticking;
  older browsers without `@supports selector()` also get the links in flow instead of an overlay

- **Homepage polish** (`src/pages/index.astro`, `src/components/astro/HomeHero.astro`,
  `FeatureCards.astro`, `Card.astro`, `Footer.astro`)
  - The promoted feature specimens printed `<Card cardTitle="…" />`, which renders an empty card;
    they now print the body the card beside them actually renders
  - Hero, features and post list share one left edge (they sat at 16, 20 and 32px on mobile, and the
    post list 32px in on desktop)
  - Post titles on the homepage take the card-title size instead of the vendor `--h3` scale, which
    reached 48px at desktop and outranked everything below the hero
  - The headline no longer hyphenates mid-word at common phone widths; `hyphens: auto` now applies
    only below 21rem, and `text-wrap: balance` keeps a short headline from stranding its last word
  - The hero overrode the vendor `header { min-width: 20rem }`, which scrolled the page 15px
    sideways at 320px in browsers with a classic scrollbar (SC 1.4.10)
  - The scrolling code samples in the hero and the promoted cards take `tabindex="0"`, so a keyboard
    can scroll them (axe `scrollable-region-focusable`)
  - The footer read "ontwitter"; the compact feature rows lost a stray 8px list indent
- **`.impeccable/hook.cache.json` is ignored** (`.gitignore`): the design hook's per-session cache
  holds absolute local paths and was committed by accident

- **Dark mode left light surfaces on several pages** (`src/styles/_design-tokens.scss`,
  `src/styles/components/_form.scss`, `_alert.scss`, `_card.scss`, and the dashboard, profile,
  offline and message-us pages): @fpkit/acss's own `[data-theme=dark]` block points
  its semantic tokens at the dark end of the neutral scale, which the site's dark palette has already
  inverted, so the two flips cancelled under the theme toggle. The skip link measured `#f4f4f5` and
  white text on the vendor's dark-mode button blue measured 3.52:1. The toggle path now restates the
  vendor's light mapping for those tokens, and hard-coded light colours on the listed pages and
  stylesheets use the direction tokens instead. Form fields kept a `whitesmoke` fill under light
  text in dark mode, which made typed input unreadable

- **`db:migrate` scripts never loaded `.env`** (`package.json`): `db:migrate`,
  `db:migrate:status`, `db:migrate:create` and `db:migrate:rollback` ran
  `node scripts/migrate.js`, and the `--env-file=.env` in that file's shebang does not apply under
  `node <file>`. With Turso configured in `.env` they still reported "Missing required environment
  variables". They now pass `--env-file=.env` like the other `db:*` scripts, so like those
  scripts they need a `.env` file to exist. `scripts/migrate.js` treats `YOUR_...` placeholders as
  missing, so a fresh copy of `.env.example` gets the missing-variables message instead of a libsql stack trace
- **`db:status` reported `.env.example` placeholders as set** (`scripts/database-status.js`): any
  truthy value printed "✓ Set", so an unedited `YOUR_...` placeholder counted as a configured
  database. Values starting with `YOUR_` now count as not set, as they do in
  `src/utils/env-config.ts`. `tests/scripts/db-scripts.test.ts` covers both fixes
- **Horizontal rules out-shouted the content they separated**: `@fpkit/acss` colours `hr` through
  `--color-border-subtle`, a legacy neutral step that the inverted dark palette turned near-white
  (#f4f4f5 on the dark blog list). `hr` now uses the `--rule` hairline token in both themes;
  `e2e/dividers.spec.ts` asserts it on `/` and `/posts/1`
- **`resetTursoClient()` threw `ReferenceError: cachedEnv is not defined`**: the variable was
  removed with the environment-config abstraction but its reset line was left behind, crashing
  every `tests/turso-crash.test.ts` hook
- **`useSupabase` lint warnings**: `catch (err: any)` replaced with `unknown` and a narrow
  `ClerkApiError` type for the JWT-template check
- **Design tokens had no consumers, so dark mode could not change a pixel**:
  `src/styles/_design-tokens.scss` declared a full alias layer that nothing read.
  `--card-background` and `--header-background` each had zero `var()` consumers, so every card and
  the header band fell through to the `@fpkit/acss` defaults — including a hardcoded `whitesmoke`
  on the header. The dark-mode block compounded this by redefining `:root` variables and nothing
  else, so no element repainted. Both aliases now have painted consumers, and the dark scope
  reaches the elements themselves. `tests/integration/design-tokens.test.ts` parses the compiled
  stylesheet and fails if either alias loses its last painting consumer
- **ESLint could not lint the E2E suite** (`eslint.config.js`): Playwright specs fell through to
  the unit-test override, which declares no browser globals, so every `page.evaluate` callback
  using `getComputedStyle`, `Element` or `Node` failed `no-undef` at the pre-commit hook. `e2e/**`
  now has its own override declaring those three globals
- **Popover fallback was silently inert in engines without `:has()`**: the
  `@supports not selector(:popover-open)` block in `src/styles/components/_navigation.scss` listed
  its bare and `:has()` selectors as one comma-separated list. A selector list is unforgiving, so a
  parser that cannot understand `:has()` discards the whole rule — including the bare selector that
  existed specifically to serve those engines. Each block is now written as two separate rules
- **Horizontal overflow at 320px viewports** (WCAG 2.1 SC 1.4.10 Reflow): every page
  scrolled horizontally by 5px on a 320px-wide screen
  - Overrode `@fpkit/acss`'s `body { min-width: 20.3125rem }` (325px) floor with
    `min-width: 0` in `src/styles/_base.scss`. The floor was wider than the viewport
    it had to fit, so the overflow was present with the whole `<nav>` hidden and on
    every page including 404
  - `e2e/navigation-popover.spec.ts`'s 320px reflow test now asserts
    `scrollWidth <= clientWidth` outright, both panel-shut and panel-open. It
    previously had to measure against its own closed-panel baseline because the
    framework floor made an absolute check impossible
  - Added a page-level `no horizontal scrolling at 320px` case to
    `e2e/home-responsive.spec.ts`
- **Flaky axe-core scan in `e2e/navigation-popover.spec.ts`**: `:popover-open` flips at
  the start of the panel's 150ms opacity fade, so the WCAG scan could sample a
  still-transparent panel and report a colour-contrast violation that no user ever
  sees. The scan now waits for the fade to settle before running
- **`npm run db:wizard` wiped unrelated `.env` settings** (`scripts/setup-wizard.js`): the wizard
  rebuilt `.env` from a fixed list of Clerk, Turso, Supabase server, `ENABLE_COMMENTS` and
  `DATABASE_PROVIDER` keys, silently dropping `PUBLIC_SUPABASE_*`, `AXIOM_*`, `EMAIL_*`,
  `PWA_ENABLED`, `ASTRO_ADAPTER` and every comment. It also kept inline `# comments` as part of the
  values it read. The read/write logic now lives in `scripts/lib/env-file.js`: values are parsed
  with Node's `util.parseEnv` (the same parser as `node --env-file`), and only keys whose value
  changed are rewritten in place, keeping their inline comments. Every other line is left as is,
  and a leading BOM no longer hides the first key. `tests/scripts/setup-wizard-env.test.ts` runs
  the write path, and the real wizard with scripted answers, on `.env.example` plus an extra key,
  and fails if any unmanaged key, comment or blank line is lost or reordered

### Security

- **Protected routes no longer fail open without Clerk keys** (`src/middleware.ts`): with the Clerk
  keys missing or still the `YOUR_*` placeholders, `/dashboard` and `/organization` (and their
  sub-paths) used to be served to anyone. They now render a setup notice (`/auth-setup`) with HTTP 503. With real keys, unauthenticated visitors are still redirected to sign-in. The stale
  `/forum(.*)` entry is gone from the route matcher
- **Removed `POST /api/test/sync-user`**: it upserted any Clerk user into `users` with the
  service-role client and returned their profile, with no authentication. The authenticated
  `POST /api/user/sync` still syncs the signed-in user
- `e2e/auth-fail-closed.spec.ts` covers both, and CI runs it against the keyless production build

## [0.2.0] - 2025-08-15

### Added

- Comprehensive release process documentation and agent coordination system
- Security audit checklist template for all releases (40-60% faster task completion)
- Release epic template with actionable checklists
- Automated release manager agent (`@docs/agents/astro-basics-release-manager.md`)
- Native Clerk-Supabase integration (2025 production-ready architecture)
- Forum and messaging features with Supabase backend
- Organization management capabilities
- Enhanced dashboard with user profile management
- Improved error handling and user feedback

### Changed

- **BREAKING**: Replaced astro-imagetools with native Astro Image component for better security
- **BREAKING**: Removed astro-lighthouse integration (performance monitoring via native tools)
- Updated authentication flow to use Clerk's native third-party integration
- Refactored Supabase client initialization for better flexibility
- Improved camelCase key transformation in data attributes
- Updated Vitest to v3.2.4 for improved testing stability
- Updated @astrojs/vercel adapter to latest version

### Fixed

- Corrected camelCase key transformation in getDataAttributes utility
- Optimized IP address validation to prevent invalid IPv6 truncation
- Fixed various TypeScript strict mode issues
- Resolved Vitest test infrastructure compatibility issues

### Security

- **CRITICAL**: 90% reduction in security vulnerabilities (20 → 2)
- **RESOLVED**: All HIGH and CRITICAL severity vulnerabilities
- **RESOLVED**: Removed vulnerable dependencies (astro-lighthouse, astro-imagetools)
- **RESOLVED**: Updated Vercel adapter to fix path-to-regexp vulnerabilities
- Implemented Row-Level Security (RLS) policies for all Supabase tables
- Added comprehensive security audit requirements for releases
- Enhanced input validation and sanitization
- Improved error handling to prevent information disclosure
- Remaining 2 moderate vulnerabilities are development-only (no production impact)

## [0.1.0] - 2024-12-XX

### Added

- Initial project setup with Astro framework
- Component library structure (Astro and React components)
- Content collections (posts, docs, content) with MDX support
- Clerk authentication integration
- Supabase database integration
- Turso (LibSQL) database support
- PWA functionality with service worker
- E2E testing with Playwright
- Unit testing with Vitest
- SCSS compilation and styling system
- GitHub Actions CI/CD pipeline
- Netlify/Vercel deployment support
- Dashboard with protected routes
- API endpoints for user data
- Message submission system
- Comprehensive linting setup (ESLint, StyleLint, Prettier)
- Pre-commit hooks with Husky
- Database migration system
- SEO optimization with sitemap generation
- Image optimization with Astro Image Tools
- Lighthouse performance monitoring

### Security

- Initial security audit completed
- Authentication middleware implemented
- Protected routes configuration
- Environment variable validation

## Release Schedule

### Upcoming Releases

#### v0.2.0 (Target: Q1 2025)

- Complete security hardening
- Performance optimizations
- Enhanced user profile management
- Improved error handling
- Production-ready release

#### v0.3.0 (Target: Q2 2025)

- Advanced organization features
- Webhook integration
- Real-time collaboration features
- Enhanced analytics

#### v1.0.0 (Target: Q3 2025)

- Stable API
- Full feature set
- Enterprise features
- Complete documentation

## Migration Guides

Migration guides for breaking changes are available in `/docs/migrations/`.

## Contributors

Thanks to all contributors who have helped shape this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For detailed release notes, see the [releases page](https://github.com/shawn-sandy/astro-basics/releases).
