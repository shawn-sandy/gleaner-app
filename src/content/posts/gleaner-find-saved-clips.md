---
title: 'Find anything you saved with Gleaner'
pubDate: 2026-10-29
description: 'Ask Gleaner what you saved and get a table back. The phrases that find clips by topic, tag, or date, plus index sheets, bookmarks, and why a clip kept in the chat is hard to find. Written for Gleaner 2.13.1.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'plugins']
publish: true
---

Saving is half the job. This guide covers the other half: getting a clip back
when you need it. It's the end-of-day step of
[a day with Gleaner](/posts/gleaner-daily-routine), in more detail. Written for
Gleaner 2.13.1.

## Just ask

> what did I save about Cowork?
>
> show my #prompting clips
>
> clips from this week
>
> anything on view transitions?

Gleaner searches your saved clips and answers with a table, newest first: date,
linked title, category, type, tags, note, and source. A keyword matches titles,
tags, notes, and the summary text, so the note you added when you saved
("for the onboarding rewrite") works as a search term too.

A clip built from several parts says so in the title, such as "(3 parts)" or
"(whole page + 2 parts)."

## Search where the clips live

You don't need Claude open to find a clip.

- **Google Drive**: type a tag like `#motion` or a phrase from your note into
  Drive's search bar.
- **Notion**: open the Browser Research database and filter or sort it. It's
  already a live index.
- **Artifacts**: name them in the request, as in "what did I save to artifacts
  about motion?" Gleaner checks about 50 per request and tells you if there
  are more.

## Clips you kept in the chat

A clip that stayed in the conversation isn't stored anywhere, so a Drive or
Notion search can't see it. Gleaner tags those chats with a plain
`Gleaner clip` line instead. Where your app can search past conversations
(Claude Code desktop, or claude.ai with chat search turned on), a Gleaner search
lists those chats too, marked "(chat)." You can also type `Gleaner clip` and a
tag into that conversation search yourself.

If a clip matters, save it somewhere stored. See
[where should my clips go?](/posts/gleaner-where-clips-go)

## Take your clips with you

> make me an index sheet

You get a Google Sheet called `Clip Index <date>`, with one row per clip. It's a
snapshot, so ask for a fresh one when you need it. If your Drive connector
can't make Sheets, you get a `.csv` file instead. If you save to Notion, you get
the database link first, since it's already a live index. Ask again if you still
want the sheet.

> export my gleans as bookmarks

You get a bookmarks file to import into Chrome, Firefox, Safari, or Edge, with
one folder per category. It's a snapshot too. See
[turn your clips into browser bookmarks](/posts/gleaner-export-bookmarks) for
what's in the file and how to import it.

## Quick reference

| To find…            | Say                             |
| ------------------- | ------------------------------- |
| A topic             | "what did I save about …?"      |
| A tag               | "show my #… clips"              |
| Recent clips        | "clips from this week"          |
| Everything, as rows | "make me an index sheet"        |
| Your browser        | "export my gleans as bookmarks" |

For every search option, see
[finding your clips](https://github.com/shawn-sandy/gleaner#finding-your-clips)
in the README.
