---
title: 'Save the good parts, not the whole page'
pubDate: 2026-10-30
description: 'Collect just the passages that matter, from one page or several tabs, and save them as one Gleaner clip. The phrases for adding, checking, and saving parts, plus keeping Claude’s answers. Written for Gleaner 2.13.1.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'plugins']
publish: true
---

Most pages have one good section. Gleaner can keep just that, or a few bits from
several pages, as one clip. This is the "while you work" step of
[a day with Gleaner](/posts/gleaner-daily-routine), in more detail. Written for
Gleaner 2.13.1.

## Add a part

Highlight some text and say:

> add this

Or skip the highlight and describe it:

> grab the part about animation lengths
>
> and this table

Gleaner confirms each part with its first few words, so you can check it's the
right one. Nothing is saved yet.

A highlight counts when it is about 40 characters or more. A stray word is ignored.

## Check what you've got

> what have I got so far?
>
> drop the second one
>
> start over

## Save them as one clip

> done

Any of "done," "save them," or "that's it" works. You get one clip with a
heading per part, a link to each source page, and a **Scope** line such as
`2 parts from 2 pages`.

<figure data-size="phone">
  <img
    src="/images/guides/clip-parts-phone.webp"
    width="390"
    height="838"
    alt="A Gleaner clip on a phone: two numbered parts, each linking its source page, with short bullets."
  />
  <figcaption>Two parts from two release posts, saved as one clip.</figcaption>
</figure>

## Collect across tabs

Parts can come from different tabs and sites. Switch tabs, add, and switch
again. Each "add this" reads the tab you're on.

- **Chrome side panel:** highlight or describe, then "add this."
- **ChatGPT with connected tabs:** describe the part or paste it, since
  highlights can't be read there.
- **Claude in Chrome:** give the page's URL and describe the part.

Keep the same conversation open until you say "done." Closing it drops the
parts you haven't saved.

## Keep an answer

Ask Claude about the page, then keep the reply:

> how do I rotate an API key in these docs?
>
> save that

An answer is kept as given, so steps and code survive. Anything that didn't
come from the page is marked "(not from the page)." While you're collecting,
"save that" adds the answer as another part instead.

## When it guesses wrong

- **Got the whole page?** Say "page," "article," or "doc" only when you want all
  of it. "Save this" with nothing highlighted saves the page.
- **Highlight ignored?** Some sites clear it when you click away. Highlight
  again right before asking, or name the part.
- **Already saved this page?** In the same session, "add this bit too" goes into
  that clip. Say "as a new clip" to start another.

For every option, see
[saving parts of pages](https://github.com/shawn-sandy/gleaner#saving-parts-of-pages)
in the README.
