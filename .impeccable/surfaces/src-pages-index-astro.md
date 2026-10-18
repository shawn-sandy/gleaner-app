---
version: 1
slug: 'src-pages-index-astro'
primary_target: 'src/pages/index.astro'
related_targets: ['src/components/astro/Navigation.astro']
---

# Homepage surface brief

Scope: `/` (src/pages/index.astro and its homepage components), plus the site-wide logo in the nav
brand link and the favicon. Visitor mode: Persuade.

Audience and job: general readers and researchers arriving cold; within seconds they must know what
a glean is and that an AI assistant is required, then follow "Install Gleaner" to
github.com/shawn-sandy/gleaner. Proof is authored sample gleans labelled "Example"; no invented
users, quotes, counts, pricing, or screenshots. Keep a short latest-posts list.

Decisions taken with the build (defaults from the confirmed brief): link to the repo README rather
than print install steps; headline "Tie a string round what you read."; SITE_TITLE becomes
"Gleaner".

## Unresolved

- Exact install instructions beyond the repo link.
- Whether other routes adopt the Gleaner world (out of scope here).
