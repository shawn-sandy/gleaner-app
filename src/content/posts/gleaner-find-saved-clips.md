---
title: 'Find anything you saved with Gleaner'
pubDate: 2026-10-29
description: 'Find clips by topic, tag, or date, keep an optional clip list or ChatGPT index, and export snapshots as spreadsheets or bookmarks. Updated for Gleaner 2.15.10.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'plugins']
publish: true
---

Saving is half the job. This guide covers the other half: getting a clip back
when you need it. It's the end-of-day step of
[a day with Gleaner](/posts/gleaner-daily-routine), in more detail. Updated
November 9, 2026 for Gleaner 2.15.10.

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

ChatGPT now defaults to editable Pages when available. Keep the verified Page
link to return to that clip. The limits below apply to clips delivered only in
the conversation, such as an explicit `--to chat` save.

A clip that stayed in the conversation isn't stored anywhere, so a Drive or
Notion search can't see it. Gleaner tags those chats with a plain
`Gleaner clip` line instead. Where your app can search past conversations
(Claude Code desktop, or claude.ai with chat search turned on), a Gleaner search
lists those chats too, marked "(chat)." You can also type `Gleaner clip` and a
tag into that conversation search yourself.

If a clip matters, save it somewhere stored. See
[where should my clips go?](/posts/gleaner-where-clips-go)

## Keep a list as you save

> keep my clip list in Notion

An optional clip list records saves across destinations, including chat-only
clips. Choose a Google Sheet in Drive, a Notion database, or a `Clip List.md`
file in a local or Cowork folder. Drive lists also need the Google Sheets
connector. The list stays off until you set it up.

Say "don't list this" to skip one row, or "stop my clip list" to turn it off.
Neither deletes clips. A failed row does not undo a successful save, and searches
still read your clips rather than the list. A same-session update adds a row
only when its link changes; the newest row then holds the current link.

In ChatGPT, you can also ask:

> Keep a Gleaner Clip Index.md file in ChatGPT and update it whenever I save or update a clip.

With persistent file tools, Gleaner maintains that one file and refreshes an
existing clip's row when it changes. Without those tools, it can provide a
downloadable snapshot. For use across chats, add the instruction and saved-file
link to your project's instructions. Adding the file to Project Sources and
refreshing an uploaded copy are manual steps.

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
