# Design Direction

The visual direction for astro-basics: a seven-token palette, three type roles, and one structural rule that ties
colour to interactivity. These tokens are the public styling contract for projects that consume this package, so the
names and their meanings are stable and overridable.

## Overview

The direction is one idea specific to Astro rather than to websites in general: **colour marks hydration**.

Astro ships static HTML and withholds JavaScript. The palette says the same thing the framework does. Static content
renders in ink on paper, and the accent (`--island`) appears only where something is interactive - links, buttons,
focus rings, the interactive-specimen badge. Nothing decorative carries it.

That is a structural rule, not a style preference, and it is machine-checked. `e2e/homepage-design-direction.spec.ts`
walks the rendered homepage and asserts that **no non-interactive element computes to the accent colour**. Using
`--island` for a decorative border, a heading, a rule or a card surface fails that test.

Three supporting decisions are already settled:

- **One self-hosted display face.** A latin-subset, single-weight `inter-600.woff2` in `public/fonts/`, not a
  CDN and not a system stack alone. It is preloaded from `src/layouts/Base.astro` and declared with `font-display: swap`.
- **The token layer applies sitewide.** Body background and text colour are global, so there is no way to scope them.
  The homepage hero and the card tiering are homepage-only.
- **Component prop signatures stay stable.** `Card` and `FeatureCards` are package exports via `src/components/index.ts`,
  so new props are optional with defaults and new slots are additive.

Source of truth: `src/styles/_design-tokens.scss` (definitions) and `src/styles/_base.scss` (consumers).

## The Seven Direction Tokens

| Token          | Light     | Dark      | Role                                                           |
| -------------- | --------- | --------- | -------------------------------------------------------------- |
| `--ink`        | `#101418` | `#e8eaed` | Primary text; the default `color` on `body`                    |
| `--ink-soft`   | `#5a6472` | `#99a2ad` | Secondary text: decks, eyebrows, labels, captions, inline code |
| `--paper`      | `#fcfcfd` | `#0d1014` | Page background                                                |
| `--paper-sunk` | `#f1f3f5` | `#151a20` | Recessed surfaces: the header band, card backgrounds           |
| `--island`     | `#0b6070` | `#6bb9c9` | The accent. Interactive only                                   |
| `--island-bg`  | `#e6f2f6` | `#102a33` | Accent wash behind interactive affordances and `::selection`   |
| `--rule`       | `#dde1e6` | `#262c33` | Hairlines and dividers                                         |

The accent is a deep petrol — a low-chroma blue-green, deliberately not Tailwind sky-500 and not the violet/indigo
family that generated palettes converge on, so the palette does not read as a framework default. Low chroma is the
point: the accent sits beside ink as a second voice rather than shouting over it, and it darkens cleanly under the
`color-mix` hover states instead of going muddy. Every pair clears WCAG 2.1 AA. Measured against the running page
rather than estimated: in light, ink on paper is 18.04:1, ink-soft on paper 5.85:1, island on paper 7.01:1, and the
lowest pair of all — ink-soft on paper-sunk — 5.39:1; in dark, island on paper is 8.54:1 and the lowest pair — again
ink-soft on paper-sunk — is 6.77:1. `e2e/home-accessibility.spec.ts` asserts the 4.5:1 AA floor against the tokens the
page actually resolves, so no repoint can drop a pair below AA without failing the build. The exact figures above are
not themselves asserted — they record the current budget, and re-measuring is part of changing a token.

Both themes are defined as SCSS mixins - `direction-light` and `direction-dark` - and applied through three scopes:

```scss
:root {
  @include direction-light;
}

@media (prefers-color-scheme: dark) {
  :root {
    @include direction-dark;
  }

  @include direction-dark-surfaces;
}

:root[data-theme='dark'] {
  @include direction-dark;
  @include direction-dark-surfaces;
}

:root[data-theme='light'] {
  @include direction-light;
}
```

The `[data-theme]` scopes carry specificity (0,2,0) against the media query's (0,1,0), so an explicit toggle wins over
the OS preference regardless of source order. Starlight already stamps that attribute on the docs routes.

`direction-dark-surfaces` is the part that matters most. Redefining `:root` variables alone is not enough: @fpkit/acss
resolves `--color-surface` from a token this project never declares and hardcodes `whitesmoke` on the header band, so
the dark scope has to reach the elements themselves.

## Which Surfaces the Aliases Paint

Two component aliases existed in `_design-tokens.scss` with zero consumers, which is why every painted surface
inherited @fpkit/acss defaults. Both now point at direction tokens and both have real painted consumers.

### `--card-background: var(--paper-sunk)`

Painted by `body [data-card]` in `src/styles/_base.scss`, and again inside `direction-dark-surfaces` for the dark
scopes. `[data-card]` is the attribute @fpkit/acss puts on its `Card` root, so the alias reaches:

- `Card.astro` everywhere it renders, including the six homepage feature cards and the hero specimen
- the promoted-tier specimens in `FeatureCards.astro`
- `Featured.astro`
- `DashboardCard` and any other composition built on the @fpkit/acss `Card`

The selector is scoped through `body` on purpose. The vendor's own `[data-card]` rule is (0,1,0); `body [data-card]` is
(0,1,1) and wins on specificity rather than on whichever stylesheet the bundler happens to emit last. It also leaves
`[data-card] > header` - the card's own header strip - alone.

### `--header-background: var(--paper-sunk)`

Painted by `body > header`, which covers the shared `Header.astro` band on every route and the `HomeHero.astro` band on
the homepage. The child combinator is load-bearing twice over: (0,0,2) beats the vendor's (0,0,1), and it cannot reach
a nested `header` inside a card.

A third header token, `--header-deck-font-size`, sizes the deck paragraph under the shared header's `h1`. It is a
fluid `clamp()` on a shallower slope than the `h1` clamp, so the two separate as the viewport grows instead of
converging.

## The Three Type Roles

One typeface used to render across every heading, paragraph, link and button, so elements differed only by size. Three
roles is the smallest set that reads as deliberate.

| Role        | Token                   | Applies to                                                        | Treatment                                  |
| ----------- | ----------------------- | ----------------------------------------------------------------- | ------------------------------------------ |
| **Display** | `--font-family-display` | `h1` through `h6`                                                 | Inter 600, negative tracking               |
| **Body**    | `--font-family-sans`    | `body`, `p`, `li`, and everything inheriting from `body`          | Plus Jakarta Sans 400                      |
| **Mono**    | `--font-family-mono`    | `code`, `kbd`, `samp`, `[data-ui="eyebrow"]`, `[data-ui="label"]` | Uppercase, `0.12em` tracking, `--ink-soft` |

Details worth knowing:

- **Display covers every heading level.** `h1` through `h6` all render at weight 600, which is the single weight the
  self-hosted woff2 ships - so the full range costs no additional font request.
- **Casing is not part of the role.** `text-transform: capitalize` stays on `h1`-`h3`, which are titles. `h4`-`h6` are
  used for UI labels - the contact form renders its error summary as an `h6` - and capitalizing a sentence would
  produce "Please Correct The Following Errors".
- **Tracking is negative on display.** `-0.015em` on `h1`-`h6`, tightened to `-0.02em` on `h1`.
- **The display stack falls back through the system sans**, so a failed font request degrades to a sans rather
  than to a serif.
- **Body is declared on `body`, not `html`.** @fpkit/acss sets `font-family` on `html`, which is why one face used to
  render everywhere. Declaring the body role on `body` beats that by inheritance and leaves the headings free.
- **Mono is opt-in for non-code.** Code semantics get it by element. Everything else opts in through
  `data-ui="eyebrow"` or `data-ui="label"`, so an eyebrow is a deliberate choice at the call site rather than a
  selector guessing at class names.

Use `data-ui="eyebrow"` for the small uppercase line above a headline and `data-ui="label"` for figure and specimen
labels. Both resolve to the mono family, `--ink-soft`, `0.75rem`, `0.12em` tracking, uppercase.

## Overriding the Tokens as a Consumer

Projects that import this package get the components, and the components read these custom properties at runtime.
Nothing is compiled in, so a consumer rebrands the kit by redefining the properties - no fork, no SCSS build, no
component edits.

Two rules make an override stick:

1. **Load your sheet after the kit's stylesheet.** Every override below has the same specificity as the kit's own
   declaration, so source order decides.
2. **Override all three scopes.** The kit sets the tokens in `:root`, in `@media (prefers-color-scheme: dark) :root`,
   and in `:root[data-theme='dark']` / `:root[data-theme='light']`. Redefining only `:root` leaves the dark path on the
   kit's values.

```css
/* your-app/src/styles/brand.css - imported after the kit's index.css */

:root,
:root[data-theme='light'] {
  --ink: #12100e;
  --ink-soft: #6b6257;
  --paper: #fffdf9;
  --paper-sunk: #f5f0e6;
  --island: #b4531a;
  --island-bg: #fdeee2;
  --rule: #e4dbcb;
}

@media (prefers-color-scheme: dark) {
  :root {
    --ink: #f4efe7;
    --ink-soft: #a89a88;
    --paper: #14110d;
    --paper-sunk: #1d1913;
    --island: #ff9a5c;
    --island-bg: #2a1a10;
    --rule: #2e2820;
  }
}

:root[data-theme='dark'] {
  --ink: #f4efe7;
  --ink-soft: #a89a88;
  --paper: #14110d;
  --paper-sunk: #1d1913;
  --island: #ff9a5c;
  --island-bg: #2a1a10;
  --rule: #2e2820;
}
```

You do not need to re-declare the painted rules. `body`, `body > header`, `body [data-card]` and `::selection` all
resolve through `var()`, so redefining the variables repaints every surface that consumes them.

### Overriding type

```css
:root {
  /* Swap the display face. Keep a fallback chain - the kit's @font-face rule
     and Base.astro preload still reference the bundled Inter file. */
  --font-family-display: 'Söhne Breit', ui-sans-serif, system-ui, sans-serif;
  --font-family-sans: 'Söhne', ui-sans-serif, system-ui, sans-serif;
  --font-family-mono: 'Berkeley Mono', ui-monospace, monospace;
}
```

### Overriding component aliases

The component alias layer is a second, narrower override surface. Re-point an alias when a surface should diverge from
the direction rather than follow it:

```css
:root {
  --card-background: var(--paper); /* flush cards instead of recessed */
  --header-background: transparent; /* no header band at all */
  --header-deck-font-size: clamp(1rem, 0.8vw + 0.85rem, 1.375rem);
  --card-radius: 0;
}
```

### What an override must not break

`--island` is the only token bound to a structural rule. If you re-point it, keep it on interactive surfaces only.
Applying your accent to a heading, a decorative border or a static card background reintroduces exactly the ambiguity
the direction removes, and it fails `e2e/homepage-design-direction.spec.ts` if you run this project's suite.

## The Gleaner Brand Layer

The site's Gleaner rebrand is a scoped layer over the direction above, not a replacement. The homepage hero, the
feature section, the Quick install cards and the blog section's posts paint in the Gleaner logo's colours - an evergreen
disc and a copper string - and set their display moments in the wordmark's typeface. The Quick install and blog
headings, and every other site route outside the Starlight docs, still use the seven direction tokens. The two layers
never share a colour. `DESIGN.md` is the full record; this section is the contract.

### The scoped palette

`src/styles/gleaner-palette.css` sets two families of custom properties on any element marked `data-gleaner`: `--g-*`
for the sections' own surfaces, type and controls (`--g-ground`, `--g-ink`, `--g-muted`, `--g-headline`,
`--g-button-*`, `--g-link`, `--g-code-*`, `--g-band`, `--g-card`, `--g-chip`, `--g-marker-*`), and `--glean-*` for the
string components (`--glean-string`, `--glean-surface`, `--glean-border`, `--glean-ink`, `--glean-you`,
`--glean-reply`, `--glean-mark-*`, `--glean-clip-*`).

It uses the same three theming scopes as the direction tokens: light values on `[data-gleaner]`, dark values under
`@media (prefers-color-scheme: dark) { :root:not([data-theme='light']) [data-gleaner] }` and under
`:root[data-theme='dark'] [data-gleaner]`. The `:not()` means a light toggle needs no block of its own. Neither dark
block sets `--glean-clip-*`, so the saved clip and the blog's latest-post card keep their evergreen fill in both themes.

- **Each component that sets `data-gleaner` imports the stylesheet** - `HomeHero`, `HomeFeatures`, `HomeInstall`,
  `HomeBlog` - and the browser loads it once.
- **Components that only read the palette carry fallbacks.** `GleanPart`, `SavedClip` and `SkillCard` give every
  property a light-theme fallback; `CopyCommand` falls back to the inherited colour.
- **The palette stays out of `_design-tokens.scss` on purpose.** The committed `src/styles/index.css` is out of step
  with its SCSS source, so a recompile would ship unrelated changes. Promote it only alongside a deliberate recompile
  and review of `index.css`.

### The Separate Hue Rule

No Gleaner colour equals `--island`, in either theme. The accent audit in `e2e/homepage-design-direction.spec.ts`
compares every non-interactive element's computed colour, background, painted border and outline with the resolved
`--island`, in light and dark. It still passes with the Gleaner sections in place because evergreen is its own hue: in
OKLCH, `#185c53` sits at hue 182 against Harbour Teal's 215, and the dark `#9ed9c8` at 175 against `#6bb9c9` at 212.
The audit is an exact match, so it would not catch a near-miss. Never tune a Gleaner colour toward `--island`, and
never reuse `--island` inside the brand layer.

Hero contrast, computed with the WCAG formula from the shipped hex values: headline on ground 7.29:1 light, 10.93:1
dark; ink 13.24:1 and 14.76:1; muted 6.22:1 and 8.46:1; the install button label on its fill 7.79:1 and 10.93:1; the
copper string, a graphic, 3.55:1 and 6.42:1. `e2e/home-accessibility.spec.ts` asserts the AA floor for the direction
tokens only, so these are a recorded budget, not an assertion.

### Brand type

Plus Jakarta Sans ships as one variable woff2 (`public/fonts/plus-jakarta-sans-wght.woff2`, 200-800, SIL OFL 1.1). At
400 it is the body face, `--font-family-sans`, so bold body text (links, labels, `strong`) renders in it at 600-700.
Its display use, as the Gleaner brand face at 600-800, is reserved for brand moments: the
navigation wordmark (600, drawn into its SVG), the hero headline (800), the hero install button (650), the saved clip
title (800), the feature section's `h2` and `h3` and skill names (800), the Quick install card names (800), and the
blog's post titles (800 for the latest, 700 for earlier rows). Page headings on other site routes outside the Starlight
docs stay on Inter 600 and labels stay mono, so the three type roles still hold and the brand face costs no font
request beyond the body face. The components name the face directly, so overriding `--font-family-sans` leaves the
brand moments on Plus Jakarta Sans.

### Brand components

| Component      | `data-gleaner`                    | Used in                                                    | What it is                                                          |
| -------------- | --------------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------------- |
| `HomeHero`     | On its `header`                   | `src/pages/index.astro`, header slot                       | Hero band: logo, headline, install button and panel, example thread |
| `GleanPart`    | Reads it                          | `HomeHero`'s example thread                                | One ask on the copper string                                        |
| `SavedClip`    | Reads it                          | The last item of the same thread                           | The evergreen clip the string ties off in                           |
| `HomeFeatures` | On its `section`                  | `src/pages/index.astro`, featured slot                     | Feature band: skill cards, sample clip anatomy, save destinations   |
| `SkillCard`    | Reads it                          | `HomeFeatures`                                             | One skill card                                                      |
| `HomeInstall`  | On its card grid, not its heading | `src/pages/index.astro`, main content                      | Claude and ChatGPT Quick install cards                              |
| `HomeBlog`     | On its posts, not its heading     | `src/pages/index.astro`, main content                      | Latest-post card and up to three earlier rows; omitted with no post |
| `CopyCommand`  | Reads it, else inherits           | `HomeHero`'s install panel and `HomeInstall`'s Claude card | One install command with a copy button                              |

`CopyCommand` holds one command per instance because Claude Code takes one slash command per message. Its accessible
name is "Copy " plus the command, and the result is announced through a `role="status"` region present from the start.

The hero logo (`gleaner-symbol.svg`, `--hero-logo-size: clamp(7rem, 25vw, 12.5rem)`) fades to transparent over the first
logo-height of scroll with `animation-timeline: scroll()` and `animation-range: 0 var(--hero-logo-size)`. The rule sits
inside `@supports (animation-timeline: scroll()) and (animation-range: 0 1px)` and
`@media (prefers-reduced-motion: no-preference)`, so reduced motion and unsupported browsers keep the logo opaque. The
range is checked because Firefox 144 with scroll-driven animations switched on has the timeline but not the range, and
would spread the fade over the whole page. It is the system's only scroll-linked animation.

### What a Gleaner override must not break

The brand components are not package exports, so the Gleaner layer is not part of the consumer contract. A fork or a
page that reskins them overrides `--g-*` and `--glean-*` with the stylesheet's own selectors, in all three scopes,
loaded after it; the dark selectors carry (0,3,0), so redefining only `[data-gleaner]` loses in dark mode. Keep:

- **The Separate Hue Rule** - in both directions: re-pointing `--island` has to clear the Gleaner values too. Run the
  accent audit in light and dark.
- **Copper as a graphic** - `--glean-string` is measured at 3:1; only `--glean-you` sets copper as text.
- **`--glean-clip-*` readable in both themes** - it does not flip, and the "Read the post" button inverts it.
- **The hero ratio** - the hero `h1` over the following paragraph must stay at 3.0 or more at 1280px and 390px; the deck
  is derived from the headline size.
- **The type-role probe** - the direction spec reads the display role from the first heading outside `[data-gleaner]`,
  today "Quick install", so keep `data-gleaner` off the Quick install and blog headings.
- **The recorded contrast** - no test asserts it. Re-measure every pair a change touches, and keep the components' light
  fallbacks in step if you change the stylesheet's defaults.

## Verification

Measured against the running dev server, light and dark:

| Surface                                 | Light              | Dark               |
| --------------------------------------- | ------------------ | ------------------ |
| `body` background                       | `rgb(252,252,253)` | `rgb(13,16,20)`    |
| `body` colour                           | `rgb(16,20,24)`    | `rgb(232,234,237)` |
| `body > header` (`--header-background`) | `rgb(241,243,245)` | `rgb(21,26,32)`    |
| `[data-card]` (`--card-background`)     | `rgb(241,243,245)` | `rgb(21,26,32)`    |
| Link colour (`--island`)                | `rgb(11,96,112)`   | `rgb(107,185,201)` |
| `code` colour (`--ink-soft`)            | `rgb(90,100,114)`  | `rgb(153,162,173)` |

Automated coverage:

- `e2e/homepage-design-direction.spec.ts` - three distinct font families resolve, the display-to-deck ratio clears 3.0,
  both aliases have at least one consumer, body background differs between light and dark, no non-interactive element
  carries the accent, and horizontal overflow is 0 at 320, 390, 768 and 1280
- `tests/integration/design-tokens.test.ts` - `--card-background` and `--header-background` each keep at least one
  `var()` consumer in the compiled CSS, and the dark block sets at least one painted property rather than variables alone

The Gleaner brand layer:

- `e2e/homepage-design-direction.spec.ts` - the accent audit runs over the Gleaner sections in light and dark, the
  hero's display-to-deck ratio clears 3.0 at 1280 and 390, and the type-role probe skips headings inside
  `[data-gleaner]`
- `e2e/home-hero-logo-fade.spec.ts` - the logo fades out over its own height of scroll and back in at the top, and
  stays opaque under reduced motion; the fade test skips itself where scroll-driven animations are unsupported
- `e2e/home-gleaner-lists.spec.ts` - no list item in a Gleaner section carries the vendor margin or indent, and the
  hero's copper string runs unbroken from ask to ask
- `e2e/home-install.spec.ts` - the install cards' code stands apart from its card in light and dark
- `e2e/home-blog.spec.ts` - every blog link lands on a page that renders, and row title links keep their heading's size
  and weight
- `e2e/copy-command.spec.ts` - the hero's first copy button neither scales nor dims on hover or focus

## Related

- `DESIGN.md` - the full design record for both layers, with every contrast figure
- `src/styles/gleaner-palette.css` - the Gleaner `--g-*` and `--glean-*` palette in all three theming scopes
- `src/components/astro/` - `HomeHero`, `GleanPart`, `SavedClip`, `HomeFeatures`, `SkillCard`, `HomeInstall`,
  `HomeBlog` and `CopyCommand`
- `src/styles/DESIGN-TOKENS-README.md` - the wider token layer this direction extends
- `docs/prototypes/restyle-astro-kit-homepage.html` - clickable prototype of the target state, with a working
  light/dark switch
- Starlight guide: **Design Direction** at `/guide/design-direction`
