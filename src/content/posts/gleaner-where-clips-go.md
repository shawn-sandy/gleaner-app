---
title: 'Where should my Gleaner clips go?'
pubDate: 2026-10-29
description: 'Editable Pages in ChatGPT, chat files, Google Drive, Notion, your project, or an artifact: where Gleaner saves clips and how to choose. Updated for Gleaner 2.15.10.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'plugins']
publish: true
---

Pick one place to keep your clips and Gleaner saves there every time. This is
the first step of [a day with Gleaner](/posts/gleaner-daily-routine), in more
detail. Updated November 9, 2026 for Gleaner 2.15.10.

## Set it once

> set up my save preferences

Or run `/gleaner:preferences setup`. Gleaner asks for a default destination
and a format, then remembers them. Say "show my preferences" to check them
later.

No setup is needed for the built-in defaults: an editable Page in ChatGPT when
Page tools are available, or HTML chat delivery in Claude. Pages can be requested
with `--to page`, but cannot be stored as a persistent destination preference.

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

| If you want…                  | Pick           | Needs                              |
| ----------------------------- | -------------- | ---------------------------------- |
| An editable clip in ChatGPT   | Editable Page  | Page create, read and edit tools   |
| A file in the conversation    | The chat       | No destination connector           |
| Clips in folders, by category | Google Drive   | Google Drive connector             |
| A clip table you can filter   | Notion         | Notion connector                   |
| Clips next to your code       | This project   | A Claude Code session              |
| Clips in a Cowork project     | Cowork project | Claude desktop, open and connected |
| A private web page per clip   | Artifact       | A session like Claude Code         |

**Editable Pages** are the default for new, unconfigured ChatGPT clips. You get
a private editable Page, its verified link, and the full clip in the conversation.
An explicit or saved destination, a retained clip's destination, or a winning
raw-file request takes precedence. Exports include your current Page edits;
downloaded copies do not automatically stay in sync.

**The chat** is still Claude's default. In either host, use `--to chat` for
conversation delivery: HTML in Claude, Markdown in ChatGPT, with a file where the
app supports attachments. This does not store a clip in Drive or Notion. A later
search can point back to the chat only where your app can search past conversations.

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
>
> save this page --to page

To change a supported persistent default instead, say **"always save here."**
Editable Pages are the exception: use the ChatGPT built-in default or request
one for this save.

## Markdown or Google Docs?

Stored clips are Markdown files, in Drive too. Say **"save it as a Google
Doc"** for one Doc, or set your format to `auto` to get Docs whenever Drive
can make them. A Drive connector that can't upload raw files saves Docs
instead. Editable Pages, Notion and artifact clips keep their own formats.

## If a save fails

For destinations with file fallback, Gleaner gives you the clip in the chat and
says where it wasn't saved. Pages have separate recovery rules. Missing Page
tools before a built-in default save allow Markdown delivery with an explanation;
an explicit Page request needs your choice of an alternative. A refused or failed
Page save is reported, and an uncertain write is checked before another save is
attempted. Gleaner never claims an unverified save.

For every option, see
[choosing where clips go](https://github.com/shawn-sandy/gleaner#choosing-where-clips-go)
in the README.
