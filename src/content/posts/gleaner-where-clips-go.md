---
title: 'Where should my Gleaner clips go?'
pubDate: 2026-10-29
description: 'Chat, Google Drive, Notion, your project, or an artifact: a one-line pick for each place Gleaner can save a clip, what each one needs, and how to send one clip somewhere else. Written for Gleaner 2.13.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'plugins']
publish: true
---

Pick one place to keep your clips and Gleaner saves there every time. This is
the first step of [a day with Gleaner](/posts/gleaner-daily-routine), in more
detail. Written for Gleaner 2.13.

## Set it once

> set up my save preferences

Or run `/gleaner:preferences setup`. Gleaner asks for a default destination
and a format, then remembers them. Say "show my preferences" to check them
later.

## Every clip looks the same

Wherever it goes, a clip carries its source, date, category, tags, and your
note above a short summary. Here's a real one, opened on a phone:

<figure data-size="phone">
  <img
    src="/images/guides/clip-phone.webp"
    width="390"
    height="844"
    alt="A Gleaner clip on a phone: title, rows for source, date, category, type, tags, and note, then a TL;DR."
  />
  <figcaption>A clip saved as a file in Claude, before it goes anywhere.</figcaption>
</figure>

## Pick a destination

| If you want…                       | Pick           | Needs                              |
| ---------------------------------- | -------------- | ---------------------------------- |
| Nothing set up, one clip at a time | The chat       | Nothing                            |
| Clips in folders, by category      | Google Drive   | Google Drive connector             |
| A clip table you can filter        | Notion         | Notion connector                   |
| Clips next to your code            | This project   | A Claude Code session              |
| Clips in a Cowork project          | Cowork project | Claude desktop, open and connected |
| A private web page per clip        | Artifact       | A session like Claude Code         |

**The chat** is the default. You get the clip right in the conversation, as a
file where the app allows it, but it isn't stored, so a later search can't find
it. Fine for a one-off, not for a habit.

**Google Drive** files each clip under `Browser Research/<category>/`, unless
you set or name another folder, as in "save to my Research folder."

**Notion** turns each clip into a page in a **Browser Research** database,
with tags, note, and source as database properties. The first time, Gleaner asks
which page should hold the database.

**Artifacts** are private pages on claude.ai, readable on a phone, until you
share them.

## Send one clip somewhere else

Add `--to` to any request. It changes that save only.

> save this page --to notion
>
> grab the part about easing --to local
>
> save this page --to drive:"Design Inspiration"

To change the default instead, say **"always save here."**

## Markdown or Google Docs?

Stored clips are Markdown files, in Drive too. Say **"save it as a Google
Doc"** for one Doc, or set your format to `auto` to get Docs whenever Drive
can make them. A Drive connector that can't upload raw files saves Docs
instead. Notion and artifact clips keep their own formats.

## If a save fails

If Gleaner can't reach your destination, it gives you the clip as a file and
says plainly that it wasn't saved. It never claims a save that didn't happen.

For every option, see
[choosing where clips go](https://github.com/shawn-sandy/gleaner#choosing-where-clips-go)
in the README.
