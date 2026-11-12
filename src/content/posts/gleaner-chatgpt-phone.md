---
title: 'Gleaner in ChatGPT and on your phone'
pubDate: 2026-11-01
description: 'Gleaner works in ChatGPT too, including the mobile app. How to set it up, which browser it reads, what a clip looks like on your phone, and what to say when it can’t see the page. Written for Gleaner 2.15.10.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'plugins']
publish: true
---

Gleaner isn't only for Claude. The same plugin runs in ChatGPT, on the desktop
and in the phone app, with the same phrases. This expands the morning step of
[a day with Gleaner](/posts/gleaner-daily-routine) for ChatGPT. Written for
Gleaner 2.15.10.

## Set it up once

In a ChatGPT workspace that allows plugin imports, open the workspace's
**Plugins** settings and import `https://github.com/shawn-sandy/gleaner`. Enable
Gleaner for the workspace and install it in a new chat. Then connect what
Gleaner needs. Importing the plugin doesn't grant any of these:

- **Your browser**, so it can read your Chrome tabs
- **Google Drive** or **Notion**, if you want clips stored there

## Save a page

> save this page
>
> save https://… to Drive

Gleaner reads the page from one of two places:

- **Connected Chrome tabs.** It reads the tab you name, or the one you're on.
- **The Work browser.** Switch to Work mode and Gleaner opens the page itself.

Highlights can't be read from connected tabs, so describe the part instead:

> grab the part about easing

Or paste the text. The Work browser can read highlights when it has its
JavaScript tool.

## What you get

By default, a new clip is saved as a private, editable ChatGPT Page. The full
clip also shows right in the chat, with its links, tags, and note, and Gleaner
adds a link to the Page once it has checked the Page exists.

- **Your choices win.** Say "save to Drive", name a folder, or set a default with
  `/gleaner:preferences setup`, and the clip goes there instead.
- **Want a file?** Ask for the clip as Markdown. The export includes any edits
  you made to the Page.
- **No Page tools?** Gleaner says so and puts the clip in the chat as a Markdown
  file, with a **Download Markdown (.md)** link where ChatGPT can attach files.

## On your phone

The clip in the chat is the reading view, so you never have to open anything.
The Page link opens your editable copy. A Markdown download link may download
the file or offer another app; a preview isn't guaranteed on mobile. A Drive or
Notion link opens the clip in that app.

> show the full saved clip here
>
> convert this saved clip to PDF

Saving a video from your phone works too. If Gleaner can't read the video, it
asks first. Paste the description or transcript for a summary, or say:

> save link only

## When it can't see the page

- **"I can't read that tab."** Connect your browser in ChatGPT, switch to Work
  mode, or paste the URL or text.
- **Too many approval prompts?** Since 2.13.4, Gleaner asks less often. Drive lookups
  run once per conversation, and a prompt you decline isn't asked again.
- **No transcript for a video?** In connected tabs, open **Show transcript**
  under the video and ask again.

For setup details and limits, see
[reading saved clips on ChatGPT mobile](https://github.com/shawn-sandy/gleaner#reading-saved-clips-on-chatgpt-mobile)
and the
[ChatGPT marketplace guide](https://github.com/shawn-sandy/gleaner/blob/main/docs/chatgpt-marketplace.md).
