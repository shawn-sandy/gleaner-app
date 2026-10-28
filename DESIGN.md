---
name: Gleaner
description: Ink on paper with a single lit indicator — a component kit whose accent colour is a machine-checked signal, not decoration.
colors:
  ink: '#101418'
  ink-soft: '#5a6472'
  paper: '#fcfcfd'
  paper-sunk: '#f1f3f5'
  island: '#0b6070'
  island-bg: '#e6f2f6'
  rule: '#dde1e6'
  success: '#22c55e'
  warning: '#f59e0b'
  error: '#ef4444'
  info: '#3b82f6'
  gleaner-evergreen: '#185c53'
  gleaner-evergreen-deep: '#124a42'
  gleaner-copper: '#c46b43'
  gleaner-copper-ink: '#9a4a26'
  gleaner-ground: '#f5f8f6'
  gleaner-ink: '#12302b'
  gleaner-muted: '#4a615c'
  gleaner-mist: '#e3efeb'
  gleaner-card: '#ffffff'
  gleaner-card-border: '#d5e3de'
  gleaner-mark: '#fbede5'
  gleaner-mark-ink: '#12302b'
  gleaner-mark-rule: '#f1d9cb'
  gleaner-clip-muted: '#cfe5de'
  gleaner-clip-rule: '#3e7a70'
  gleaner-band: '#ffffff'
  gleaner-surface: '#f5f8f6'
  gleaner-chip: '#e3efeb'
  gleaner-marker: '#9a4a26'
  gleaner-marker-ink: '#ffffff'
typography:
  display:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontSize: 'clamp(3rem, 6.6vw, 4.5rem)'
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: '-0.035em'
  headline:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontWeight: 600
    letterSpacing: '-0.02em'
  title:
    fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif'
    fontWeight: 600
    letterSpacing: '-0.015em'
  deck:
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: 'clamp(1.125rem, 0.9vw + 0.9rem, 1.5rem)'
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: '1rem'
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: '0.75rem'
    fontWeight: 400
    letterSpacing: '0.12em'
  button:
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif"
    fontSize: '0.9375rem'
    fontWeight: 600
  brand-display:
    fontFamily: "'Plus Jakarta Sans', Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 'clamp(3rem, 5.4vw, 4.875rem)'
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: '-0.035em'
  brand-title:
    fontFamily: "'Plus Jakarta Sans', Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: '1.75rem'
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: '-0.02em'
  brand-button:
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: '1.0625rem'
    fontWeight: 650
  brand-nav:
    fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif"
    fontSize: '1.375rem'
    fontWeight: 600
    letterSpacing: '-0.01em'
  ask:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: '0.875rem'
    fontWeight: 400
    lineHeight: 1.5
  brand-section-title:
    fontFamily: "'Plus Jakarta Sans', Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 'clamp(2.125rem, 4.4cqi, 3.5rem)'
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: '-0.03em'
  brand-section-subtitle:
    fontFamily: "'Plus Jakarta Sans', Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: 'clamp(1.625rem, 2.6cqi, 2.125rem)'
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: '-0.02em'
  brand-skill-name:
    fontFamily: "'Plus Jakarta Sans', Inter, ui-sans-serif, system-ui, sans-serif"
    fontSize: '2rem'
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: '-0.02em'
  chip-mono:
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
    fontSize: '0.8125rem'
    fontWeight: 400
    lineHeight: 1.4
rounded:
  none: '0'
  base: '4px'
  lg: '8px'
  2xl: '16px'
  full: '9999px'
  gleaner-panel: '12px'
  gleaner-card: '14px'
  gleaner-pill: '999px'
spacing:
  1: '4px'
  2: '8px'
  3: '12px'
  4: '16px'
  6: '24px'
  8: '32px'
  11: '44px'
  12: '48px'
  16: '64px'
components:
  button-primary:
    backgroundColor: '{colors.island}'
    textColor: '{colors.paper}'
    rounded: '{rounded.lg}'
    padding: '11px 20px'
    typography: '{typography.button}'
    height: '44px'
  button-primary-hover:
    backgroundColor: '#0a5766'
    textColor: '{colors.paper}'
  button-ghost:
    backgroundColor: 'transparent'
    textColor: '{colors.island}'
    rounded: '{rounded.lg}'
    padding: '11px 20px'
    typography: '{typography.button}'
    height: '44px'
  button-ghost-hover:
    backgroundColor: '{colors.island-bg}'
    textColor: '{colors.island}'
  card:
    backgroundColor: '{colors.paper-sunk}'
    textColor: '{colors.ink}'
    rounded: '{rounded.lg}'
    padding: '24px'
  code-block:
    backgroundColor: '{colors.paper-sunk}'
    textColor: '{colors.ink-soft}'
    rounded: '{rounded.none}'
    padding: '16px 20px'
  input:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.base}'
    padding: '8px 12px'
  nav-toggle:
    backgroundColor: 'transparent'
    textColor: '{colors.ink}'
    rounded: '{rounded.lg}'
    height: '44px'
    width: '44px'
  eyebrow:
    textColor: '{colors.ink-soft}'
    typography: '{typography.label}'
  gleaner-button:
    backgroundColor: '{colors.gleaner-evergreen}'
    textColor: '{colors.gleaner-card}'
    rounded: '{rounded.gleaner-pill}'
    padding: '0 26px'
    typography: '{typography.brand-button}'
    height: '52px'
  gleaner-button-hover:
    backgroundColor: '{colors.gleaner-evergreen-deep}'
    textColor: '{colors.gleaner-card}'
  glean-part-card:
    backgroundColor: '{colors.gleaner-card}'
    textColor: '{colors.gleaner-ink}'
    rounded: '{rounded.gleaner-card}'
    padding: '18px 20px'
    typography: '{typography.ask}'
  saved-clip-card:
    backgroundColor: '{colors.gleaner-evergreen}'
    textColor: '{colors.gleaner-card}'
    rounded: '{rounded.2xl}'
    padding: '22px 24px 24px'
  saved-clip-tag:
    backgroundColor: 'transparent'
    textColor: '{colors.gleaner-clip-muted}'
    rounded: '{rounded.gleaner-pill}'
    padding: '4px 12px'
  gleaner-install-panel:
    backgroundColor: '{colors.gleaner-mist}'
    textColor: '{colors.gleaner-evergreen}'
    rounded: '{rounded.gleaner-panel}'
    padding: '14px 18px'
  gleaner-feature-band:
    backgroundColor: '{colors.gleaner-band}'
    textColor: '{colors.gleaner-ink}'
  skill-card:
    backgroundColor: '{colors.gleaner-surface}'
    textColor: '{colors.gleaner-ink}'
    rounded: '{rounded.2xl}'
    padding: '28px 28px 24px'
  gleaner-chip:
    backgroundColor: '{colors.gleaner-chip}'
    textColor: '{colors.gleaner-evergreen}'
    rounded: '{rounded.gleaner-pill}'
    padding: '4px 12px'
    typography: '{typography.chip-mono}'
  clip-anatomy-card:
    backgroundColor: '{colors.gleaner-surface}'
    textColor: '{colors.gleaner-ink}'
    rounded: '{rounded.2xl}'
    padding: '20px 24px 24px 16px'
  clip-marker:
    backgroundColor: '{colors.gleaner-marker}'
    textColor: '{colors.gleaner-marker-ink}'
    rounded: '{rounded.gleaner-pill}'
    size: '22px'
  clip-marker-large:
    backgroundColor: '{colors.gleaner-marker}'
    textColor: '{colors.gleaner-marker-ink}'
    rounded: '{rounded.gleaner-pill}'
    size: '28px'
  destination-card:
    backgroundColor: 'transparent'
    textColor: '{colors.gleaner-ink}'
    rounded: '{rounded.gleaner-card}'
    padding: '20px'
  copy-command-button:
    backgroundColor: 'transparent'
    textColor: '{colors.gleaner-evergreen}'
    rounded: '{rounded.lg}'
    size: '32px'
  install-card:
    backgroundColor: '{colors.gleaner-surface}'
    textColor: '{colors.gleaner-ink}'
    rounded: '{rounded.2xl}'
    padding: '28px'
  install-card-code:
    backgroundColor: '{colors.gleaner-chip}'
    textColor: '{colors.gleaner-evergreen}'
    rounded: '{rounded.lg}'
    padding: '14px 16px'
  blog-latest-card:
    backgroundColor: '{colors.gleaner-evergreen}'
    textColor: '{colors.gleaner-card}'
    rounded: '{rounded.2xl}'
    padding: '40px'
  blog-read-button:
    backgroundColor: '{colors.gleaner-card}'
    textColor: '{colors.gleaner-evergreen}'
    rounded: '{rounded.lg}'
    padding: '10px 18px'
    height: '44px'
  blog-read-button-hover:
    backgroundColor: '{colors.gleaner-clip-muted}'
    textColor: '{colors.gleaner-evergreen}'
---

# Design System: Gleaner

## Overview

**Creative North Star: "The Instrument Reading"**

Under its brand layer, Gleaner looks like the face of a measuring instrument. The ground is neutral and quiet, the
scale is precise and legible at a glance, and exactly one thing on the dial is lit. Nothing is
decorated for its own sake; every mark on the surface is there because it reports something. The
palette's own token names say it out loud — `ink`, `paper`, `island` — and the accent behaves like
a needle rather than a brand flourish.

The density is calm and generous. Content sits on an 80rem measure with real air around it, prose
is capped at 60ch, and surfaces separate by tone and a single hairline rather than by shadow or
ornament. Type does the structural work: one display face at one weight, Plus Jakarta Sans for
reading, and small mono capitals for anything that annotates rather than speaks. When a component
needs to explain itself, it does so by standing next to the source that produced it — the
instrument shows its reading and its calibration together.

What makes the system unusual is that its central rule is enforced by tests rather than taste.
Colour marks hydration: static content is ink on paper, and the accent appears only on things a
visitor can operate. `e2e/homepage-design-direction.spec.ts` walks the rendered homepage and fails
the build if a non-interactive element computes to the accent, and `e2e/home-accessibility.spec.ts`
asserts the 4.5:1 contrast floor against the tokens the page actually resolves. Breaking the
direction is a build failure, not a disagreement. Confirmed rejections: the violet/indigo family
every generated palette converges on, and stock Tailwind sky-500 — the accent is deliberately
neither.

The Gleaner brand arrives as a scoped layer rather than a replacement. The homepage hero, the
navigation brand link, the hero's example thread, the feature section below the hero, the Quick
install and Requirements cards and the blog section's posts paint in the Gleaner logo's own colours
(an evergreen disc and a copper string) and set their display moments in the wordmark's typeface.
The Quick install, Requirements and blog headings, and every other route, still paint with the
instrument palette above.
The two layers never share a colour, which is what keeps the accent audit meaningful.

**Key Characteristics:**

- One lit indicator: the accent is a signal, never decoration
- Ink-on-paper neutrals with tonal layering instead of shadow
- Three type roles and no fourth
- Small mono capitals for every annotation and label
- Measured, not estimated — contrast ratios are recorded and asserted
- The rendered artifact and its source shown together
- A scoped Gleaner brand layer (evergreen, copper, Plus Jakarta Sans) that never touches the accent

## Colors

A near-monochrome ink-and-paper ground carrying exactly one chromatic voice, a low-chroma
blue-green that darkens cleanly rather than going muddy.

### Primary

- **Harbour Teal** (`#0b6070` light / `#6bb9c9` dark): The single accent. It appears on links,
  buttons, focus rings, and the interactive-specimen badge — and nowhere else. Low chroma is the
  point: it sits beside ink as a considered second voice rather than shouting over it, and it
  survives `color-mix` darkening for hover states without turning grey. Measures 7.01:1 on paper in
  light and 8.54:1 in dark.
- **Harbour Wash** (`#e6f2f6` light / `#102a33` dark): The accent's tinted background. Backs
  interactive affordances on hover, and paints `::selection`.

### Neutral

- **Ink** (`#101418` light / `#e8eaed` dark): Primary text and the default `color` on `body`.
  18.04:1 on paper.
- **Soft Ink** (`#5a6472` light / `#99a2ad` dark): Secondary text — decks, eyebrows, labels,
  captions, inline code. 5.85:1 on paper.
- **Paper** (`#fcfcfd` light / `#0d1014` dark): The page background.
- **Sunk Paper** (`#f1f3f5` light / `#151a20` dark): Recessed surfaces — the header band, card
  backgrounds, code blocks. Soft Ink on Sunk Paper is the lowest pair in the whole system: 5.39:1
  light, 6.77:1 dark.
- **Rule** (`#dde1e6` light / `#262c33` dark): Hairlines and dividers. Never text.

### Tertiary

Status colours, used only in alerts, form validation, and system feedback — never as brand colour:
**Success** (`#22c55e`), **Warning** (`#f59e0b`), **Error** (`#ef4444`), **Info** (`#3b82f6`).

### Gleaner Brand Layer

A second, scoped palette drawn from the Gleaner logo: a deep forest evergreen and a warm copper,
on a faintly green-tinted ground. It paints only elements marked `data-gleaner`: the homepage hero
(`HomeHero`, with `GleanPart`, `SavedClip` and `CopyCommand` inside it), the "On this page" strip
on its bottom edge (`HomeSectionNav`), the homepage feature
section (`HomeFeatures`, with `SkillCard` inside it), the Quick install cards (`HomeInstall`, which
marks its card grid, not its heading), the Requirements cards below them (`HomeRequirements`,
which marks its cards and footer, not its heading), the blog section's posts (`HomeBlog`, which
likewise marks only its posts) and, the one exception that leaves the homepage, the "Back to top"
button pinned to the corner of every page that renders `Base` (`BackToTop`, which marks its
wrapper; the Starlight guide has its own layout and no such button). `CopyCommand` sets no `data-gleaner` of its own: it reads the palette from
the section around it and falls back to the inherited colour. The navigation brand carries the logo itself but
keeps inheriting the bar's ink. Light values are the frontmatter tokens; the dark values below are
set on `[data-gleaner]` in both dark scopes by `src/styles/gleaner-palette.css`. Hero contrast
figures are the ones measured and recorded in that stylesheet; feature-section figures marked
"measured" were computed in the browser from the live computed colours of the running page, and
are identical under the OS dark preference and the theme toggle. Figures marked "computed for this
document" come from the WCAG relative-luminance formula run against the shipped hex values.

- **Evergreen** (light `gleaner-evergreen` / dark `#9ed9c8`): The logo disc colour. In light it
  is the hero headline, the install button fill, the secondary link, the install-command text, and
  Gleaner's reply line; in dark those roles lift to a pale sage. Headline on ground 7.29:1 light,
  headline and link 10.93:1 dark. The saved clip card and the blog's latest-post card keep the
  light evergreen fill in both themes. In the Quick install cards it is the assistant name and the
  install-guide link. In the section strip under the hero it is the link text: 7.29:1 light on the
  hero's ground at desktop width, and on a phone's tiles 7.79:1 light, 9.39:1 dark, all measured.
  The "Back to top" button's arrow on its tile measures the same, 7.79:1 light and 9.39:1 dark.
  In the Requirements cards it is the assistant name, the filled required check
  and the outlined optional plus (7.29:1 light, 9.39:1 dark on the card), and the requirements link
  below them, on the page's Paper (7.60:1 light, 12.00:1 dark), all measured. In the blog section it
  is the post-title links and "All posts", which sit on the page's Paper: 7.60:1 light, 12.00:1
  dark (computed for this document). In the feature section
  it is the section title and subtitles, the skill names, the chip text, and the usage-guide link
  (measured): section title and link on the band 7.79:1 light, 10.93:1 dark;
  skill name on its card 7.29:1 light, 9.39:1 dark.
- **Deep Evergreen** (light `gleaner-evergreen-deep` / dark `#b9e6d9`): Install button hover fill.
- **Copper** (light `gleaner-copper` / dark `#d98a62`): The string and its knot. Graphic only,
  never text: 3.55:1 on ground light (graphics need 3:1), 6.42:1 dark. In the feature section it is
  the 2px string in the sample clip's gutter, measured against the clip card it sits on: 3.55:1
  light, 5.52:1 dark.
- **Copper Ink** (light `gleaner-copper-ink` / dark `#eba67f`): The "you" speaker label on an ask,
  the one place copper becomes text. 6.21:1 on the white ask card light (computed for this
  document); on the feature section's skill card 5.81:1 light and 7.32:1 dark (measured).
- **Ground** (light `gleaner-ground` / dark `#0e1d1a`): The hero band background.
- **Band** (light `gleaner-band` / dark `#0e1d1a`): The feature section's background. White in light,
  so the section steps up from the hero's tinted ground; in dark it takes the hero's ground colour.
  Measured on it: lede 14.16:1 light, 14.76:1 dark; muted 6.65:1 light, 8.46:1 dark.
- **Feature Card** (light `gleaner-surface` / dark `#152b27`): The skill cards, the sample clip
  card, the Quick install cards and the Requirements cards, one tone off the band. Muted text on it
  6.22:1 light, 7.27:1 dark (measured).
- **Chip** (light `gleaner-chip` / dark `#234240`): The `/gleaner:` command chip, the `--to` flag
  chips, and inside the Quick install cards both the inline code and the block that holds the
  `CopyCommand` rows. Evergreen command text on it 6.61:1 light, 6.86:1 dark (measured). The install
  cards use Chip rather than Mist because in dark Mist is the card's own colour, so code on a card
  would lose its surface.
- **Marker / Marker Ink** (light `gleaner-marker`, `gleaner-marker-ink` / dark `#d98a62`, `#0e1d1a`):
  The numbered copper markers on the sample clip and its callouts. In light the fill is the Copper
  Ink value under a white numeral; in dark it is the string's copper under a ground-coloured numeral.
  Numeral on marker 6.21:1 light, 6.42:1 dark; marker fill against the clip card 5.81:1 light, 5.52:1
  dark, a graphic (measured).
- **Gleaner Ink** (light `gleaner-ink` / dark `#e4efeb`): Hero body text and card text. 13.24:1
  light, 14.76:1 dark.
- **Muted** (light `gleaner-muted` / dark `#a3bab3`): Deck-adjacent fine print, the install label,
  the mono example heading. 6.22:1 light, 8.46:1 dark. It is also the "Earlier posts" label and the
  post dates and one-line descriptions on Paper: 6.49:1 light, 9.29:1 dark (computed for this
  document).
- **Mist** (light `gleaner-mist` / dark `#152b27`): The hero's install-command panel, which holds
  the `CopyCommand` rows. Evergreen command text on it measures 6.61:1 light (computed for this
  document).
- **Card / Card Border** (light `gleaner-card`, `gleaner-card-border` / dark `#152b27`,
  `#2b4842`): The white ask cards on the string and their 1px border. The border colour is also the
  feature band's top border, every feature-section card border, and its hairlines.
- **Mark / Mark Ink / Mark Rule** (light `gleaner-mark`, `gleaner-mark-ink`, `gleaner-mark-rule` /
  dark `#4b2d20`, `#f7e6dc`, `#6a4030`): A copper-tinted highlight for captured content: the
  highlighted passage and the captured table, with the rule between table rows, and the
  highlighted note in the feature section's sample clip. 12.37:1 light, 10.21:1 dark (measured on
  the highlighted note).
- **Clip Muted / Clip Rule** (`gleaner-clip-muted`, `gleaner-clip-rule`, same in both themes):
  Secondary text, tag outlines, and the destination divider on the evergreen saved clip. Clip Muted on Evergreen 5.91:1 (computed for this document); white clip title on Evergreen 7.79:1.
  The blog's latest-post card uses the same family: its date line and description in Clip Muted,
  its title in white, and a white "Read the post" button with an Evergreen label (7.79:1) that
  turns Clip Muted on hover (5.91:1, as above).
- **Button label** is white on Evergreen in light (7.79:1) and the dark ground colour on sage in
  dark (10.93:1).

### Named Rules

**The Hydration Rule.** Colour marks interactivity. Static content renders in ink on paper; the
accent appears only where something responds — links, buttons, focus rings, the specimen badge.
Never a decorative border, a heading, a hairline, or a card surface. This is machine-checked, not a
preference: `e2e/homepage-design-direction.spec.ts` fails the build when a non-interactive element
computes to the accent. Treat it exactly as you would a type error.

**The Legacy Family Rule.** The `--color-primary-*` sky-blue ramp and the `--color-neutral-*` grey
ramp exist for backward compatibility with earlier component tokens. They are not the palette. New
work reaches for the seven direction tokens; a sky-blue that reaches the screen is a regression.

**The Three Scopes Rule.** Both palette families flip together in all three theming scopes —
`:root`, `@media (prefers-color-scheme: dark)`, and `:root[data-theme]`. Redefining only `:root`
looks correct in light mode and silently keeps the old values the moment the visitor's OS is dark.

**The Separate Hue Rule.** No Gleaner colour equals the site's `--island` accent, in either theme.
The accent audit in `e2e/homepage-design-direction.spec.ts` compares each element's computed
colour, background, border, and outline to the resolved `--island`; because the Gleaner layer paints
the hero headline and cards in evergreen (hue 182 in OKLCH, computed for this document) rather than
in Harbour Teal (hue 215), the homepage audit still passes with the hero and the feature section in
place; the accent tests were re-run in light and dark after the feature section shipped. The audit is an
exact match, so it would not catch a near-miss: keep the brand layer on its own hue family, never
tuned toward the accent.

**The Component-Scoped Palette Rule.** The Gleaner colours live as custom properties on any
element marked `data-gleaner` (`--g-*` for the sections' own surfaces, type, and controls,
`--glean-*` for the string components), set in one shared stylesheet,
`src/styles/gleaner-palette.css`, not in `src/styles/_design-tokens.scss`. This is a deliberate,
recorded compromise: the committed `src/styles/index.css` is out of sync with its SCSS source, so
recompiling it to add global tokens would ship unrelated changes. The stylesheet sets the light
values on `[data-gleaner]` and flips them in both dark scopes (`prefers-color-scheme: dark` under
`:root:not([data-theme='light'])`, and `:root[data-theme='dark']`), honouring the Three Scopes Rule.
Each component that sets `data-gleaner` (`HomeHero`, `HomeSectionNav`, `HomeFeatures`, `HomeInstall`,
`HomeRequirements`, `HomeBlog`, `BackToTop`) imports the stylesheet itself, and the browser loads it once; components that read the palette
from inside one (`GleanPart`, `SavedClip`, `SkillCard`) carry light-theme fallbacks for every
property they read. Promote these to
the global token file only alongside a deliberate recompile of `index.css`.

## Typography

**Display Font:** Inter 600 (self-hosted, latin subset, single weight; falls back through the
system sans)
**Body Font:** Plus Jakarta Sans 400 (`--font-family-sans`; falls back through the system sans
stack `ui-sans-serif, system-ui, -apple-system, …`)
**Label/Mono Font:** System mono stack (`ui-monospace, SFMono-Regular, Menlo, …`)
**Gleaner Brand Font:** Plus Jakarta Sans, variable 200-800 (self-hosted single woff2, SIL OFL
1.1, the wordmark's typeface). The same file sets body copy at 400 and the brand roles at 600-800.

**Character:** Neutral and instrument-like. The display face is tight and confident — negative
tracking, one weight, no italic — and the body face underneath it is Plus Jakarta Sans, the
wordmark's typeface at a reading weight, so body copy and the Gleaner brand share one voice. The
mono capitals are the system's annotation voice: everything that labels, measures, or points at
something else speaks in them.

### Hierarchy

- **Display** (600, `clamp(3rem, 6.6vw, 4.5rem)`, 1.02, `-0.035em`): The instrument-palette display
  role. One knob drives both display and deck size, so the ratio between them stays pinned at 3.2 at
  every viewport width instead of collapsing at desktop. The Gleaner homepage hero now sets its `h1`
  in Brand Display instead (below).
- **Headline** (600, `h1` scale, `-0.02em`): Page-level `h1` on every other route. Capitalized.
- **Title** (600, `h2`/`h3` scale, `-0.015em`): Section and card titles. Capitalized.
- **Deck** (400, `clamp(1.125rem, 0.9vw + 0.9rem, 1.5rem)`, 1.5): The paragraph under a page
  heading, in Soft Ink. Its clamp runs a shallower slope than the heading's, so the two separate as
  the viewport grows rather than converging.
- **Body** (400, 1rem, 1.5): Prose and lists, capped at 60ch — 80ch inside `article`.
- **Label** (400, 0.75rem, `0.12em`, uppercase, Soft Ink): Eyebrows, figure captions, specimen
  badges, inline code. Opted into with `data-ui="eyebrow"` or `data-ui="label"`.
- **Button** (600, 0.9375rem): Interactive control labels. On the body sans, not the display face
  and not the mono label role — a button is neither a title nor an annotation.

### Gleaner Brand Type

- **Brand Display** (Plus Jakarta Sans 800, `clamp(3rem, 5.4vw, 4.875rem)`, 1.02, `-0.035em`,
  sentence case, balanced wrap): The homepage hero headline, in Evergreen. The deck is derived from
  it (`clamp(1rem, display / 3.4, 1.375rem)`, body sans, 1.55), so the display-to-deck ratio the
  direction test asks for (3.0 or more) holds: 3.4 at 1280px and exactly 3.0 at the 48px / 16px
  floors.
- **Brand Title** (Plus Jakarta Sans 800, 1.75rem, 1.15, `-0.02em`): The saved clip title. Keeps the
  case it was saved in rather than taking the site's `h3` capitalisation.
- **Brand Button** (Plus Jakarta Sans 650, 1.0625rem): The hero install button label.
- **Brand Nav** (Plus Jakarta Sans 600, 1.375rem, `-0.01em`; 1rem at 360px and narrower): The site
  title beside the logo symbol in the navigation bar, on every page, matching the wordmark's
  SemiBold. Below 360px the toggle, brand and account links only fit on one bar at 1rem.
- **Ask** (mono 400, 0.875rem, 1.5): A visitor's plain-language request inside a string card, and
  Gleaner's reply at 0.8125rem. The mono voice is what marks a line as something typed to Claude.
  The skill cards' "Things to say" lists use the same role.
- **Brand Section Title** (Plus Jakarta Sans 800, `clamp(2.125rem, 4.4cqi, 3.5rem)`, 1.05,
  `-0.03em`, sentence case, balanced wrap): The feature section's `h2`, in Evergreen. It scales in
  container units against the band rather than the viewport.
- **Brand Section Subtitle** (Plus Jakarta Sans 800, `clamp(1.625rem, 2.6cqi, 2.125rem)`, 1.15,
  `-0.02em`, sentence case): The feature section's `h3` headings, in Evergreen.
- **Brand Skill Name** (Plus Jakarta Sans 800, 2rem, 1.1, `-0.02em`, lower case): The skill name on
  a skill card. It is a command name, so it keeps its lower case.
- **Chip Mono** (mono 400, 0.8125rem, 1.4): The command and `--to` flag chips. The same size sets the
  sample clip's mono path in its caption and the destination paths, at 1.5.
- **Install Card Name** (Plus Jakarta Sans 800, 1.75rem, 1.1, `-0.02em`): "Claude" and "ChatGPT" on
  the Quick install cards and the Requirements cards, in Evergreen.
- **Latest Post Title** (Plus Jakarta Sans 800, `clamp(1.75rem, 4vw, 2.375rem)`, 1.15, `-0.02em`):
  The newest post's title on the blog's evergreen card, in white, sentence case.
- **Post Row Title** (Plus Jakarta Sans 700, 1.125rem, 1.4): An earlier post's title in the blog
  list, set as an Evergreen link that inherits its heading's font rather than the site's 16px/400
  `a` rule.

The Quick install, Requirements and blog headings ("Quick install", "Requirements", "From the
blog") sit outside `data-gleaner`
on the site's own heading face, weight and colour; their components set only the size
(`clamp(1.625rem, 4vw, 2.125rem)`, 1.15) and sentence case. The Quick install heading is the
homepage's one display-role heading that `e2e/homepage-design-direction.spec.ts` checks.

Body copy in the hero and the feature section takes the body token (`--font-family-sans`, Plus
Jakarta Sans 400), and mono stays on `--font-family-mono`. The brand roles part from body copy by
weight, size and colour, not by family. The feature section's callout `h4`
titles (1.1875rem, 1.3) stay on the site display face. The feature design canvas's JetBrains Mono
was deliberately not adopted: the site self-hosts its fonts and makes no font CDN request.

### Named Rules

**The Three Roles Rule.** Display for `h1`–`h6`, body sans for everything that reads, mono for
everything that annotates. There is no fourth role. A new face is a new decision about the whole
system, not a local one.

**The One Weight Rule.** The self-hosted display face ships exactly one weight (600) as a single
latin-subset woff2, preloaded, no CDN, one font request total. Every heading level renders at that
weight — so covering `h4`–`h6` costs nothing. A design that needs a second weight is asking for a
second network request; make that trade deliberately or not at all.

**The Labels Keep Their Case Rule.** `text-transform: capitalize` applies to `h1`–`h3`, which are
titles. `h4`–`h6` are used as UI labels — the contact form renders its error summary as an `h6` —
and capitalizing a sentence produces "Please Correct The Following Errors".

**The Brand Face Rule.** Plus Jakarta Sans does two jobs. At 400 it is the body face, the
`--font-family-sans` token, so it sets reading text on every site route outside the Starlight docs. At 600-800 it is the Gleaner
brand face, and that use is scoped to brand moments: the nav brand, the hero headline, the hero
install button, the saved clip title, the homepage feature section's `h2` and `h3` headings and
skill names, the Quick install and Requirements cards' assistant names, and the blog section's
post titles. Those
are the only headings it sets; page headings on other routes stay on the Inter
display face, and labels stay mono. It ships as one variable woff2 covering 200-800, declared once
in `src/styles/_design-tokens.scss` and preloaded in `Base.astro` alongside the Inter display file,
so the site makes two font requests in total.

## Layout

A single centred measure of 80rem (`--max-content-width`, 1280px) governs `main`, direct `section`
children of `body`, and the inner column of full-bleed bands. Bands that paint a background span
the full viewport and push their content in with
`padding-inline: max(1.25rem, calc((100% - 80rem) / 2))` rather than being constrained themselves —
that keeps the band edge-to-edge while its contents stay on the shared measure, with no wrapper
element.

Vertical rhythm runs on an 8pt grid (`--space-*`). `main` carries 2rem block padding; sections take
2rem inline padding; sibling sections separate by 2rem; elements inside an `article` separate by
1.5rem. Composed pages own the space between their own regions — a reusable component never carries
page-specific margin, which is why the homepage sets the Quick install and blog sections' gutter in
`index.astro`, where they are composed, rather than inside the components around them.

The homepage hero is the Gleaner band: a full-bleed flex row on the shared measure holding the pitch
(up to 40rem) beside the example thread (up to 36rem), each with a 28rem basis, separated by a 3.5rem
row gap and a 5rem column gap and wrapping to one column below roughly 60rem. The thread is an
ordered list whose left padding (`--glean-gutter`, 3.5rem, 2.75rem below 30rem) is the lane the copper
string runs down; items separate by `--glean-gap` (1.25rem), which the string bridges. Interactive controls hold a 44px minimum
target (`--space-11`, WCAG 2.2 SC 2.5.8).

The feature section is a second full-bleed Gleaner band directly under the hero, on the same
measure and edges, separated from it by a 1px top border and no outer margin. It declares
`container-type: inline-size` and spaces itself in container units: its regions separate by
`clamp(4.5rem, 8cqi, 7rem)`, and the band pads `clamp(4.5rem, 8cqi, 7rem)` above and
`clamp(5rem, 9cqi, 8rem)` below. Every row is a wrapping flex row driven by flex bases rather than
breakpoints: the heading (32.5rem basis) beside its lede (23.75rem basis, 32.5rem cap); three skill
cards (20rem basis, 1.5rem gap); the sample clip (32.5rem basis, 42.5rem cap) beside its callouts
(22.5rem basis), 2.5rem by 4rem gaps; and five destination cards (12.5rem basis, 1rem gap) below a
hairline. The lists own their spacing through the gap and clear the site's per-item margin, so the
last card in a row is never taller than the rest.

Below the feature section, the page returns to `main`: Quick install, then the blog, both inside
the layout's main-content `section` and its `article`. Neither is a band. Each is a `section` on the
page's Paper, a flex column with `2rem` above and `3rem` below. `index.astro` overrides that
wrapper's 2rem inline padding (`main:has(.home-install) > section`) with
`clamp(0rem, calc((80rem + 2.5rem - 100vw) / 2), 1.25rem)`, so their outer edges meet the feature
section's: 1.25rem while the viewport is narrower than the measure, easing to 0 once `main` is
centred with room to spare. Quick install puts its two cards in a grid,
`repeat(auto-fit, minmax(min(100%, 22rem), 1fr))` with a 1.5rem gap, so they sit side by side
while each keeps 22rem and stack below that. The blog stacks its latest-post card, the earlier-post
list and the "All posts" link 2rem apart; each earlier-post row keeps its date (8.5rem) beside the
title and description while the summary keeps 20rem, and drops it above them below that.

### Named Rules

**The 320 Rule.** Nothing may widen the document at a 320px viewport (WCAG 2.1 SC 1.4.10 Reflow).
Grid children declare `min-width: 0`, long headings set `overflow-wrap: break-word` and
`hyphens: auto`, and any content wider than the viewport — code samples above all — scrolls inside
its own `overflow-x: auto` box rather than pushing the page.

**The Composition Owns Spacing Rule.** Space between two components belongs to the page that
composes them, never to either component. Components are exported for reuse; a margin baked into
one is a bug at every other call site.

## Elevation & Depth

Depth is tonal, not cast. Surfaces separate by stepping between Paper and Sunk Paper and by a
single 1px Rule hairline; the header band, cards, and code blocks are all recessed by tone alone.
The full eight-step shadow scale (`--shadow-sm` through `--shadow-2xl`) exists in the token file and
remains available, but resting surfaces do not spend it.

### Shadow Vocabulary

- **`--shadow-sm`** (`0 1px 2px 0 rgb(0 0 0 / 0.05)`): The lightest available lift. Hover response
  on an interactive card.
- **`--shadow-base`** (`0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): Aliased by
  `--card-shadow`. Reserved for a card that is genuinely lifting under interaction.
- **`--shadow-lg`** (`0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`):
  Overlays and popovers that float above the page.

### Named Rules

**The Flat-At-Rest Rule.** Surfaces are flat at rest. A shadow is a response to state — hover,
focus, or genuine overlay — never a resting property of a card, a band, or a section. If a surface
needs to read as separate while sitting still, step its tone or draw a hairline.

## Shapes

Softly rounded, never pill-shaped, and never sharp except on purpose. The system default is 8px
(`--radius`, matching `--radius-lg`) and it covers buttons, cards, the specimen frame, and the
navigation toggle. Smaller controls that sit inside a form — text inputs, selects — use 4px
(`--radius-base`) so they read as fields rather than as buttons. Images take 16px
(`--img-radius`, `--radius-2xl`), the one place the geometry is allowed to soften noticeably.
Fully-round (`--radius-full`) is reserved for avatars and status dots.

Borders are always exactly 1px in Rule; there is no 2px border anywhere in the resting system. The
only 2px stroke in the language is the focus ring, which is a 2px Harbour Teal outline offset by
2px — deliberately the heaviest line the system draws, because it is the one a keyboard user needs
to find.

The Gleaner brand layer runs softer and rounder than the instrument system, by design and only
inside its scope: the hero install button and the saved clip's tags are full pills (999px), the ask
cards on the string take 14px, the saved clip 16px, and the install-command panel 12px. The string
itself is a 3px copper line with 2px-rounded ends, crossed by a two-bar wrap (two 3.5px strokes with
round caps) at each ask, and it ties off in the logo's knot, drawn from the same path data as
`gleaner-symbol.svg`. In the feature section the skill cards and the sample clip take 16px, the
destination cards 14px, and the command chips, flag chips, and numbered markers are full pills. Its
string is lighter than the hero's: a 2px copper line centred in the clip's 1.375rem marker gutter,
carrying marker 3 down across the type and tags lines and stopping 0.375rem short at its end.
Outside the Gleaner scope, the "never pill-shaped" language above still holds.

### Named Rules

**The Squared-Insert Rule.** An element that spans its container edge-to-edge drops its own radius
to zero and separates with a hairline instead. The code block inside a specimen card is the
canonical case: it runs the full card width, so a rounded corner inside a rounded corner would read
as a mistake.

## Components

### Buttons

- **Shape:** Softly rounded (8px), 1px border, 44px minimum height.
- **Primary:** Harbour Teal fill with a matching border, label in Paper — not white. The accent
  lightens in dark mode, so white label text would fall to roughly 2.5:1 there; inverting to Paper
  measures 7.01:1 light and 8.54:1 dark. Padding `0.6875rem 1.25rem`, weight 600, 0.9375rem.
- **Ghost / Secondary:** Transparent fill, label in Harbour Teal, border in neutral Rule. The
  neutral border is what creates the hierarchy — an accent border here made the two buttons read as
  two equal calls to action.
- **Hover:** Fill mixes 12% toward ink in OKLCH (`color-mix(in oklch, …)`), and the label picks up
  an underline at 3px offset so the state never relies on hue alone. The ghost variant gains its
  Harbour Wash tint and trades its neutral border for the accent — hover is where it earns the
  border its resting state gave up.
- **Active:** Fill mixes 22% toward ink.
- **Focus:** 2px Harbour Teal outline, 2px offset.
- **Transition:** Colour only, 150ms `ease-out`. Nothing moves, so there is nothing to suppress
  under `prefers-reduced-motion`.

### Cards

- **Corner Style:** Softly rounded (8px).
- **Background:** Sunk Paper, painted through `body [data-card]` so it flips with the theme.
- **Border:** 1px Rule.
- **Shadow Strategy:** None at rest — see Elevation & Depth.
- **Internal Padding:** 24px (`--card-padding`), 16px gap between children.
- **Behavior:** A card with a link renders a "Continue Reading" footer; the link, being
  interactive, carries the accent.

### Inputs / Fields

- **Style:** 4px radius, 1px border, Paper fill.
- **Focus:** The system focus ring — 2px Harbour Teal outline, 2px offset.
- **Validation:** Deferred until blur (`:user-invalid:not(:focus)`), so a field never turns red
  while it is still being typed into. Invalid fields take an Error outline and a `⚠` prefixed
  message; valid fields take a Success outline and drop their hint. Required fields append a
  " required \*" marker generated from the label.

### Navigation

- **Style:** A single horizontal bar at every width, packed to the start, with the brand and a 44px
  hamburger toggle grouped left and the account slot pushed right by auto margin.
- **Mechanism:** The panel is a native HTML `popover` — toggle, Escape, and outside-click come from
  the platform, with no JavaScript involved. There is no open-state class; the only CSS hook is
  `:has(> [popover]:popover-open)`.
- **Colour:** The bar and panel both inherit their background rather than declaring one, so the
  chain body → nav → panel can never disagree about the active theme.
- **Toggle states:** Transparent border at rest (kept, not removed, so revealing it costs no layout
  shift), rising to 30% of the current text colour on hover and focus.

### The Specimen (signature component)

The system's signature pattern, and the clearest expression of the North Star: a rendered component
and the source that produced it, shown as one object. A framed panel carries a small mono-capital
"Rendered" badge on a Sunk Paper strip, the live component in a padded body, and a full-width code
block below a hairline with squared corners and its own horizontal scroll.

The rule that makes it worth having: **the rendered instance and the printed snippet are built from
the same constants**, so the sample cannot drift from the component standing beside it. It appears
in the promoted tier of `FeatureCards`, which now renders in the design-direction guide rather
than on the homepage.

### Gleaner Brand Components

The brand layer's components tell one story: plain-language asks threaded on a copper string that
ties off in a saved clip, then what that clip holds and where it goes. All of them read their
colours from the `--glean-*` and `--g-*` properties `src/styles/gleaner-palette.css` sets on
`[data-gleaner]`, so they render correctly only inside a `data-gleaner` element, or with light
fallbacks alone.

- **Navigation brand:** `gleaner-wordmark-65px.svg`, the symbol beside "Gleaner" in Plus Jakarta
  Sans SemiBold, drawn 2em tall: 60px from 440px wide, 44px at the 1.375rem floor, 32px below 360px,
  44px minimum target. Its alt is the brand title, which names the link. The name's evergreen fill
  is fixed in the file, so unlike the old text title it does not flip with the theme and reads
  poorly on the dark bar. The bar is pinned to the top of the viewport.
- **Hero logo:** `gleaner-symbol.svg` above the eyebrow, `clamp(7rem, 25vw, 12.5rem)` wide (112px
  on a phone, 200px from an 800px viewport), with 2rem below it and the alt "Gleaner". It fades out
  and shrinks over the first logo-height of scroll as it rises toward the pinned nav: a
  scroll-driven animation (`animation-timeline: scroll()`, `animation-range: 0 var(--hero-logo-size)`)
  from full opacity and size to opacity 0 and `scale: 0.8`. It applies only under
  `prefers-reduced-motion: no-preference` and only where the browser supports both
  `animation-timeline: scroll()` and `animation-range`; Firefox 144 with scroll-driven animations
  switched on has the timeline but not the range, and would spread the fade over the whole page.
  Everywhere else the logo stays opaque and full size. It is the system's only scroll-linked
  animation; `e2e/home-hero-logo-fade.spec.ts` covers it.
- **Hero install button:** Evergreen pill, white label in Brand Button with a trailing arrow,
  52px minimum height, 1.625rem inline padding. Hover deepens the fill and adds an underline at
  3px offset so the state never relies on colour alone; colour-only 150ms `ease-out` transition.
  Focus is a 2px Evergreen outline at 3px offset, shared with the secondary text link (Evergreen,
  600, 44px minimum target, 5px underline offset).
- **Install panel:** Mist panel at 12px radius (0.875rem by 1.125rem padding, 30rem cap) holding a
  small muted 600 label ("In Claude Code") and one `CopyCommand` row per install command.
- **CopyCommand:** One command on its own row with an icon button that copies it. One command per
  instance on purpose: Claude Code takes a single slash command per message, so a button that
  copied two lines would paste both into one prompt and run neither. The command is mono 0.875rem
  on a 1.6 line in Evergreen (`--g-code-ink`) and wraps anywhere instead of scrolling, so a 320px
  screen needs no scroll box. The button is a transparent 2rem square at 8px radius, with the icon
  in the same Evergreen; hover fills it at 12% of the current colour (colour-only 150ms `ease-out`),
  focus draws a 2px Evergreen outline at 2px offset, and a copy turns the copy icon into a check.
  If the copy fails, the command is selected so a keyboard copy works. Its accessible name is
  "Copy " plus the command, in visually hidden text, so several on one page never read as identical
  controls, and the result is announced through a `role="status"` region that is in the markup from
  the start, because one added at click time is not reliably announced. Rows separate by 0.25rem.
  The button is 32px, under the 44px target the rest of the system holds (it clears WCAG 2.2's 24px
  minimum).
- **Quick install card (`HomeInstall`):** One card per assistant, Claude and ChatGPT: a Feature
  Card at 16px radius with a 1px Card Border, padded `clamp(1.25rem, 3vw, 1.75rem)`. It holds the
  assistant name in Install Card Name (Evergreen), a Muted line saying where Gleaner runs, the
  steps as an ordered list (1.6 line, 0.5rem apart, 1.25rem indent) with inline code on Chip at
  6px radius, an optional bold
  "In Claude Code" label above `CopyCommand` rows on a Chip block (8px radius, 0.875rem by 1rem
  padding), a 0.9375rem Muted "Needs" line, and an underlined Evergreen 600 link to the full guide
  pinned to the card's foot by an auto top margin, so the two cards' links line up.
- **Blog latest-post card (`HomeBlog`):** The newest published post on a solid Evergreen card at
  16px radius in both themes, padded `clamp(1.5rem, 4vw, 2.5rem)` with a 1rem gap. A Clip Muted
  meta line (a 700 uppercase "Latest" at 0.8125rem with 0.06em tracking, then the date), the title
  in Latest Post Title, the description in Clip Muted at 1.0625rem, and a white "Read the post"
  button: Evergreen 700 label with a trailing arrow, 8px radius, 44px minimum height, Clip Muted on
  hover, and a 2px white focus outline at 3px offset, because the site's ring is drawn for the page
  ground. With no published post, the whole section is left out.
- **Blog post rows (`HomeBlog`):** Up to three earlier posts under a Muted "Earlier posts" label,
  each row between Card Border hairlines with 1.25rem block padding: the date in Muted with tabular
  figures, then the title in Post Row Title as an Evergreen link and a one-line Muted description cut
  with an ellipsis. The list carries `role="list"`, which Safari drops from a list with
  `list-style: none`. "All posts" closes the section as an Evergreen 600 link with a trailing arrow
  and a 44px minimum target. Posts sort newest first and fall back to their id when two share a
  date; dates print in UTC, so a build machine west of UTC never dates a post a day early.
- **GleanPart (signature):** One ask on the string. A list item whose 3px copper string runs from
  its top through the gap to the next item, so consecutive parts read as one unbroken line, with
  the two-bar wrap 1.375rem down. The card is white with a 1px border at 14px radius
  (1.125rem by 1.25rem padding) holding the mono ask after a copper "you", any captured content (a
  Mark-highlighted passage or table), and an optional Evergreen reply after a bold "gleaner". The
  string and wrap are `aria-hidden`; the content carries the meaning.
- **SavedClip (signature):** The last item of the same list. Its string comes down across the gap
  and stops at the logo's knot (60 by 35px). The card is solid Evergreen at 16px radius in both
  themes, carrying a small mono "Saved" label, the clip title in Brand Title, a summary in Clip
  Muted, a row of outlined pill tags in mono, and the destination below a Clip Rule hairline.
- **SkillCard:** One skill as a list item: a Feature Card at 16px radius with a 1px border
  (1.75rem padding, 1.5rem at the foot). The name in Brand Skill Name, a mono `/gleaner:<name>`
  command chip, a bold 1.125rem title, a muted description, and a mono "Things to say" list pinned
  to the card's foot by an auto top margin under a hairline, each line after a copper "you" label,
  so the lists of cards in one row line up.
- **Clip anatomy (signature):** The README's sample clip shown as its Markdown file, in a `figure`
  captioned "Example" with its mono path. The Feature Card body is mono 0.875rem on a 1.5rem line;
  numbered copper markers (1.375rem) sit in a gutter beside the lines they explain, the 2px string
  links marker 3 to the type and tags lines filed with it, and the note is highlighted in Mark. The
  Markdown syntax is muted and `aria-hidden`, so a screen reader hears the clip's fields rather than
  the punctuation. Beside it, an ordered list of four callouts repeats the markers at 1.75rem, each
  with an `h4` title and a muted paragraph.
- **Destination card:** One save destination: a bold 1.0625rem name, its mono path in Muted with
  each segment kept whole, and a `--to` flag chip pinned to the foot. Transparent on the band, 1px
  border, 14px radius, 1.25rem padding. The row closes with a "Read the usage guide" link in
  Evergreen (600, 44px minimum target, 5px underline offset, 2px Evergreen focus outline at 3px
  offset), matching the hero's secondary link.

## Do's and Don'ts

### Do:

- **Do** reserve Harbour Teal for things a visitor can operate — links, buttons, focus rings,
  specimen badges. Run the homepage e2e spec before assuming an exception is safe.
- **Do** use the seven direction tokens (`--ink`, `--ink-soft`, `--paper`, `--paper-sunk`,
  `--island`, `--island-bg`, `--rule`) for every new surface.
- **Do** flip both palette families in all three theming scopes when overriding, and load your
  sheet after the kit's.
- **Do** separate surfaces with a tone step and a 1px Rule hairline before reaching for a shadow.
- **Do** put annotations, eyebrows, and captions in mono capitals via `data-ui="eyebrow"` or
  `data-ui="label"` rather than styling them ad hoc.
- **Do** let long content scroll inside its own box; check 320px before shipping.
- **Do** pair a rendered component with the source that produced it, built from shared constants.
- **Do** re-measure contrast when repointing a token — the recorded ratios are a budget, not a
  decoration.
- **Do** keep the Gleaner colours on their own evergreen and copper hues, and confirm the homepage
  accent audit still passes after any change to them.
- **Do** set new `--g-*` and `--glean-*` values in all three theming scopes in
  `src/styles/gleaner-palette.css`, import that stylesheet in any component that sets
  `data-gleaner`, and give components that read the palette a light-theme fallback for each
  property they read.
- **Do** keep Plus Jakarta Sans headings to brand moments: nav brand, hero headline, hero CTA, clip
  title, the feature section's headings and skill names, the Quick install cards' names, and the
  blog's post titles. Everywhere else it sets body copy only.
- **Do** give every install command its own `CopyCommand`; one button never copies two commands.

### Don't:

- **Don't** put the accent on a heading, a decorative border, a hairline, or a card surface. The
  test will catch it, and it is the one rule the whole system rests on.
- **Don't** reach for the legacy `--color-primary-*` sky-blue or `--color-neutral-*` greys in new
  work; they exist only for backward compatibility.
- **Don't** drift the accent toward violet, indigo, or Tailwind sky-500 — those are confirmed
  rejections, not untried options.
- **Don't** put white text on the accent. Use Paper; white fails contrast in dark mode.
- **Don't** add a shadow to a resting surface, or a further typeface beyond Inter and Plus Jakarta
  Sans, or a second Inter weight.
- **Don't** tune a Gleaner colour toward Harbour Teal or reuse `--island` inside the brand layer;
  the audit only catches exact matches.
- **Don't** set copper as text anywhere but the "you" label, and don't use the string colour for
  type; it is measured as a graphic.
- **Don't** move the Gleaner palette into `_design-tokens.scss` without deliberately recompiling
  and reviewing `index.css`.
- **Don't** bake page-specific margin into a reusable component.
- **Don't** apply `text-transform: capitalize` to `h4`–`h6`; they carry sentence-cased UI labels.
- **Don't** style navigation state against `[aria-expanded]` — it is an implicit accessibility-tree
  mapping on a popover invoker, not a DOM attribute, and never matches.
