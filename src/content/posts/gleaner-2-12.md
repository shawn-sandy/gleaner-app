---
title: 'Gleaner 2.12: whole clips in ChatGPT, and tabs that close'
pubDate: 2026-10-25
description: "Four releases of the Gleaner plugin, 2.11.1 to 2.12.2: ChatGPT asks before saving a video it can't read and shows the whole clip in the chat, Gleaner closes the Claude in Chrome tabs it opens, and browser and Drive defaults are spelled out."
author: 'Shawn Sandy'
tags: ['gleaner', 'chatgpt', 'claude-code', 'plugins', 'changelog']
publish: true
---

Gleaner went from 2.11.0 to 2.12.2 on October 25, 2026, a day after
[the 2.11 post](/posts/gleaner-2-11). Four releases came out that day: 2.11.1,
2.12.0, 2.12.1, and 2.12.2.

Most of the change is in ChatGPT. Gleaner now asks before saving a video it
can't read, shows the whole clip in the conversation instead of a file you have
to open, and picks the right browser when a session has more than one. The one
minor release, 2.12.0, is for Claude: Gleaner closes the Claude in Chrome tabs
it opens.

## Install or update

In Claude Code:

```text
/plugin marketplace add shawn-sandy/gleaner
/plugin install gleaner@shawn-sandy
```

In the Claude app or Cowork, open **Customize → Plugins**, choose **Add → Add
marketplace**, enter `shawn-sandy/gleaner`, and install **Gleaner**. If a new
command does not show up after an update in Claude Code, run `/reload-plugins`.

## 2.11.1: ChatGPT asks before saving a video it can't read

Sometimes ChatGPT can't read a YouTube video at all. The fetch fails, or the
page it gets back, such as an error page, doesn't show the description or
transcript. That could leave you with a clip that was only a link. Now Gleaner
stops before it creates or changes anything, and asks:

> I couldn't read this video's content. Paste its description or transcript for
> a summary, or say "save link only." I haven't created or changed a file.

- **Paste the description or transcript,** and Gleaner writes the clip from it
  without trying the link again. The clip's **Video** line says
  `your description` or `pasted transcript`.
- **Say "save link only"** (or "skip"), and you get a link-only bookmark: the
  link, the title and channel where Gleaner could confirm them, and your note.
  It has no summary, says so, and its **Video** line says `link only`.
- **Say "keep it as is"** or "cancel", and nothing is saved.

This works the same on a phone. A video whose description Gleaner can read
still saves without the question, and a missing transcript alone doesn't
trigger it. A video Gleaner could read whose description is simply empty gets
the older question instead: add a short description, or say "skip" for a clip
written from the title.

If you saved the video earlier in the same conversation, Gleaner offers to
update that clip instead. Paste the text, and the clip is refreshed with its
notes, parts, follow-ups, destination, and format kept. If the clip is stored
somewhere that needs a replacement file, Gleaner asks before making one.

This is ChatGPT only. In Claude, videos are read the same way as in 2.11.0.
[What Gleaner's YouTube skill can't do](/posts/youtube-skill-constraints) now
covers what this means on a phone.

## 2.12.0: Gleaner closes the tabs it opens

In Claude in Chrome, Gleaner opens tabs of its own: for a URL you give it, for
the next page of a multi-page article, and, since 2.11.0, for a second copy of a
YouTube video so it can read the transcript. Nothing closed them, so they piled
up.

Now Gleaner keeps track of the tabs it opens. It closes them once the clip is
saved, or once the request ends without a save, such as a skipped duplicate, a
declined offer, or an error.

- **Tabs stay open while you collect parts,** since each part reads the page
  again, and whenever you ask to keep one.
- **Your tabs are left alone.** Gleaner closes only tabs it opened itself.
- **Adding to the clip later in the same session opens the page again.** A
  reopened video starts at
  the link's time, not where you were watching, so "add this part" reads your
  position only from a tab you're watching. Otherwise, name the time range or
  topic.

This is Claude in Chrome only. Gleaner has no confirmed way to close tabs in
Claude Code's built-in browser or ChatGPT's Work browser, so tabs there are left
as they are.

## 2.12.1: the whole clip, right in ChatGPT

Since 2.10.2, ChatGPT has given each clip as a Markdown file. On a phone,
ChatGPT can offer that file as a download rather than a preview, so reading the
full clip meant leaving the chat.

Now ChatGPT shows the whole clip in the conversation, phone included: the
summary, key points, your notes, source and timestamp links, limitations, and
the follow-ups. When ChatGPT can attach the Markdown file, it follows as a
separate **Download Markdown (.md)** link, and a stored clip also gets a link to
where it was saved. This replaces the short structured preview in ChatGPT.

- **No file to attach?** The clip in the chat is the delivery, and Gleaner says
  no file was attached.
- **Want less?** Ask for a short preview, or for the download only.
- **A clip too long for one reply** comes in labeled parts, or Gleaner says
  what's left and offers to continue.

Claude doesn't change: you still get the HTML file and the short preview.

## 2.12.2: the right browser, and where Drive saves go

### Which browser Gleaner reads

Gleaner reads pages through whichever browser it can reach. 2.12.2 extends its
rule to ChatGPT sessions that have both the Work browser and connected Chrome
tabs. It now picks a browser in this order:

1. **The browser or tab you name.**
2. **A browser that can find the page you asked about.** In ChatGPT, that's the
   Work browser, then connected tabs. In Claude, it's the Chrome side panel,
   then Claude Code's built-in browser, then Claude in Chrome.

Once it has chosen, Gleaner stays on that page for later reads and highlights.
It won't jump to another page because a different browser has more tools. The
one exception is the YouTube transcript tab: when a video is in Claude Code's
built-in browser, Gleaner still opens it in Claude in Chrome to read the
transcript.

### Drive's default folder

When you save to Google Drive without a folder in your preferences or in the
request, the clip goes to `Browser Research/<Category>`. That default applies
only once Drive is chosen. With no destination chosen, a clip still stays in
the conversation.

## Also new: collecting parts across tabs

No release, but the README now explains how to collect parts from several tabs
and sites into one clip. Collected parts live in the conversation, not in a tab,
and each "add this" reads the tab you're on at that moment. How you point at the
next page depends on where you run Gleaner:

| Where you run Gleaner          | How to add a part from another page                                  |
| ------------------------------ | -------------------------------------------------------------------- |
| Chrome side panel              | Switch tabs, highlight or describe the part, and say "add this"      |
| Claude Code's built-in browser | Switch tabs in the Browser pane                                      |
| ChatGPT, connected tabs        | Switch tabs and describe or paste the part; highlights can't be read |
| ChatGPT Work browser           | Open the page there; highlights need the session's JavaScript tool   |
| Claude in Chrome               | Give it the page's URL and describe the part                         |

Say "done", "save them", or "wrap it up" to save them as one clip. Keep the same
conversation open while you collect: a new session drops unsaved parts.

## Where Gleaner stands at 2.12.2

- **Four skills:** `glean`, `youtube`, `preferences`, and `follow-up`.
- **In the chat by default:** an HTML file and a short preview in Claude; in
  ChatGPT, the whole clip in the conversation, with a `.md` download.
- **YouTube clips:** written from YouTube's transcript panel where Gleaner can
  read it, and from the description where it can't. In ChatGPT, a video it
  can't read at all waits for your paste or a link-only choice.
- **Five places to store a clip:** Google Drive, Notion, a Cowork project, your
  Claude Code project, and a private claude.ai artifact.
- **Where it runs:** the Claude Chrome side panel, Claude Code's built-in
  browser, Claude in Chrome, and ChatGPT's connected Chrome tabs and Work
  browser. In Claude in Chrome, it closes the tabs it opens.

Every published release, with its notes, is on the [changelog](/changelog). The
source is on [GitHub](https://github.com/shawn-sandy/gleaner).
