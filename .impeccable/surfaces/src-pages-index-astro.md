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
than print install steps; headline "Tie a string round what you read."; dark-mode logo sits on a
manila tag; SITE_TITLE becomes "Gleaner".

## Direction contract

THESIS: Tie a string round what you read: every glean is a manila tag knotted to the passage it came
from. Refuses the clipper-extension landing (headline left, browser screenshot right, logo row,
three-step cards).

OWN-WORLD: Evergreen field (#185C53) as the desk the reading sits on, white reading sheet, manila
tie-on tags with punched eyelets, waxed copper string (#C46B43) as the only third ink, no grey
midtones. Archivo condensed heavy for printed tag lettering, Source Serif 4 for reading, Courier
Prime for typed tag data in tabular figures. Copper marks what you can pull: links and controls.

STORY: Visitors see a real-looking article with tags knotted to passages, understand a glean is a
summary, tags, a note, and a destination made from a plain-language ask, believe it files into tools
they already use, and install from GitHub.

FIRST VIEWPORT: Nav with the Gleaner symbol. Left ~58%: the white sheet on the evergreen field,
the headline at display scale, the deck, then the "Install Gleaner" plate (itself a manila tag
tied on with the same copper string, visible without scrolling), then the start of an example
article with highlighted passages. Right: tags tied by copper strings to those passages, the
nearest fully legible (title, summary, tags, pencilled note, "Filed to Notion", source and time).

FORM: Reminder Tags, my top-ranked grounded candidate (1 of 7), chosen over the assigned Card
Catalogue. seed:acd49824adf50a9c. Signature interaction: hovering or focusing a highlighted passage
swings its tag forward and pulls its string taut; reduced motion shows it without the swing.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Exact install instructions beyond the repo link.
- Whether other routes adopt the Gleaner world (out of scope here).
