---
title: 'Gleaner 2.13–2.15: editable Pages, clip lists, and easier saves'
pubDate: 2026-11-09
description: 'Catch up through Gleaner 2.15.10: editable Pages in ChatGPT, full clips in every host, optional clip lists, Further reading, updated install commands, and more reliable page and YouTube reads.'
author: 'Shawn Sandy'
tags: ['gleaner', 'chatgpt', 'claude-code', 'plugins', 'changelog']
publish: true
---

Your clips are easier to read and return to. Since the
[2.12 roundup](/posts/gleaner-2-12), Gleaner has added editable Pages in ChatGPT,
optional lists that track your saves, and the full clip in every host's chat.
This catches up through **2.15.10**, released November 9, 2026.

## Install with the new marketplace name

The GitHub repository is still `shawn-sandy/gleaner`. The marketplace name
changed to `gleaner` in 2.15.8, so a new Claude Code install uses:

```text
/plugin marketplace add shawn-sandy/gleaner
/plugin install gleaner@gleaner
```

Existing installs from the `shawn-sandy` marketplace need a reinstall. Follow
the [migration steps](https://github.com/shawn-sandy/gleaner#upgrading-from-shawn-sandy-to-gleaner)
to keep your data. The [homepage install guide](/#install) covers Claude and ChatGPT.

Gleaner still has four skills: `glean`, `youtube`, `preferences`, and `follow-up`.
The optional Node bookmark renderer was removed in 2.15.7; you don't need Node.js
to use the plugin.

## Edit a saved clip in ChatGPT

Since 2.15.6, a new, unconfigured ChatGPT save creates a private editable Page
when Page tools and access are available. The full clip stays in the conversation,
alongside a verified Page link. You can also request one explicitly:

> save this page --to page

Your chosen or saved destination still wins, as does a winning raw-file request.
To get a Markdown chat file, ask for Markdown or use `--to chat`. Pages cannot
be saved as a persistent destination preference.

If Page tools are missing before a built-in default save starts, Gleaner explains
and delivers Markdown instead. An explicit Page request needs your choice of
another destination. A refused or uncertain Page write is reported and resolved
before another save; it never silently becomes a second copy somewhere else.

Same-session Page updates preserve manual edits. Exported copies use the current
Page content, but do not automatically stay in sync. See
[where clips go](/posts/gleaner-where-clips-go) for the destination choices.

## Read the whole clip wherever you work

Version 2.14.0 brought full in-chat clips to Claude Code, Cowork, and the Chrome
side panel, including saves to an external destination. Claude still defaults
to HTML chat delivery. Ask for a "short preview" or "no preview" for one save
when you want less in the conversation.

ChatGPT also shows the complete updated clip after edits. Read it directly on
your phone; a **Download Markdown (.md)** link is a separate file download,
without a promise that your phone opens a preview.

Version 2.15.0 added **Further reading**: two to five useful links from the source,
each with a short explanation. These links and video description links carry
`utm_source=gleaner`; the clip's source link stays unchanged.

## Keep track of what you save

Version 2.13 added browser bookmark exports and chat markers that help hosts
with conversation search find the chat holding a clip. Version 2.14.1 added an
optional clip list:

> keep my clip list in Notion

Choose a Google Sheet in Drive, a Notion database, or a `Clip List.md` file in
a local or Cowork folder. It records saves across destinations, including clips
delivered only in chat, and stays off until you enable it. Drive lists need
the Google Sheets connector too.

ChatGPT gained a separate maintained index in 2.15.2:

> Keep a Gleaner Clip Index.md file in ChatGPT and update it whenever I save or update a clip.

With persistent file tools, this updates one file and refreshes an existing
clip's row. Without them, you can get a downloadable snapshot. Adding the index
to Project Sources and refreshing an uploaded copy remain manual steps.

The [finding clips guide](/posts/gleaner-find-saved-clips) explains the list,
index, search, and snapshot exports.

## More reliable page and video reads

Recent updates reduce repeated preference and folder lookups within a
conversation. Your host still controls permission prompts.

For YouTube, Claude Code can use available Playwright tools to read the
transcript when Claude in Chrome is unavailable. ChatGPT tries eligible browser
tools before asking you to paste content or choose a link-only bookmark.
Version 2.15.9 routes video requests, including Shorts, to the YouTube skill
before ordinary page extraction.

Version 2.15.10 adds one web-fetch attempt when a browser read fails, returns no
text, or site access is declined. The clip says it was read without a browser.
A sign-in page, paywall notice, or bot check is not saved as content. A cut-off
response is marked partial and cannot replace a fuller existing clip.

These features depend on the tools your session provides. For video-specific
limits, see [what the YouTube skill can read](/posts/youtube-skill-constraints).
The [changelog](/changelog) has every release, and the
[upstream README](https://github.com/shawn-sandy/gleaner/blob/f99782493e368b8887591109beb90cffa3aa572c/README.md)
records the behavior covered here.
