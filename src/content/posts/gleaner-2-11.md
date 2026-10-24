---
title: 'Gleaner 2.11: YouTube transcripts are back'
pubDate: 2026-10-24
description: "The Gleaner plugin's 2.11.0 release writes YouTube clips from the transcript again, read from YouTube's own Show transcript panel where the browser allows it, and lets follow-ups hand a clip to another installed skill."
author: 'Shawn Sandy'
tags: ['gleaner', 'youtube', 'claude-code', 'plugins', 'changelog']
publish: true
---

Gleaner went from 2.10.2 to 2.11.0 on October 24, 2026, a day after
[the 2.10 post](/posts/gleaner-2-10). This time it's one release, and most of it
is about YouTube.

In 2.10, Gleaner couldn't capture transcripts in the browser, so video clips
were written from the description. 2.11.0 writes them from the transcript
again. It reads the lines from YouTube's own **Show transcript** panel, where
the browser allows it. The release also sharpens video tags, rules out
downloading captions or videos, and lets a follow-up hand a clip to another
skill.

## Install or update

In Claude Code:

```text
/plugin marketplace add shawn-sandy/gleaner
/plugin install gleaner@shawn-sandy
```

In the Claude app or Cowork, open **Customize → Plugins**, choose **Add → Add
marketplace**, enter `shawn-sandy/gleaner`, and install **Gleaner**. If a new
command does not show up after an update in Claude Code, run `/reload-plugins`.

## 2.11.0: transcripts from YouTube's own panel

The panel Gleaner reads is the one behind **…more → Show transcript** on
YouTube. How it gets there depends on where you use Gleaner.

### In the Chrome side panel and Claude in Chrome

- **Gleaner opens the panel itself** and reads it, long transcripts included.
- **The Video line says `transcript panel`.** The **Video** line records what a
  clip was written from, and this is its new answer.
- **Parts work without pasting.** Clipping moments by time range or topic, and
  "add this part", now read from that transcript. In 2.10, clipping moments
  needed a pasted transcript.
- **The language is named.** When the transcript isn't in the video's language,
  the clip says which language it was written from.

### In Claude Code's built-in browser

YouTube sends the transcript panel empty to Claude Code's built-in browser. So
Claude Code reads the panel through Claude in Chrome when that's connected.
Without Claude in Chrome, the clip is written from the description, as in 2.10.

### In ChatGPT

Where Gleaner would ask you to paste a transcript, it first asks you to open
**Show transcript** in the video's tab. It then reads the lines from there, and
the **Video** line says `transcript panel`. ChatGPT's Work browser goes one step
further: when it has a click or JavaScript tool, it opens the panel itself.

[What Gleaner's YouTube skill can't do](/posts/youtube-skill-constraints) was
written for 2.10, when Gleaner couldn't capture transcripts in the browser.
Where Gleaner reads the panel, you no longer need its paste-the-transcript
workarounds.

## Sharper video clips

- **Better tags.** A video's tags and category take hints from the uploader's
  keywords and YouTube's own category for the video.
- **Fewer misheard names.** The same keywords and category help catch names a
  transcript got wrong.
- **Readable without the video.** Key moments and parts are written to make
  sense without the video open.
- **Several videos, asked first.** Saving several videos confirms first whether
  you want one clip for each or one clip for the set.

## Two more changes

- **No downloads.** Gleaner never downloads captions or videos with
  command-line tools.
- **Follow-ups can hand off.** `/gleaner:follow-up` can hand a clip to another
  installed skill that turns a video or page into something, such as
  `youtube-to-blog`. It does this only when your session lists such a skill.

## Where Gleaner stands at 2.11.0

- **Four skills:** `glean`, `youtube`, `preferences`, and `follow-up`.
- **In the chat by default:** an HTML file in Claude, a `.md` file in ChatGPT,
  with a bookmark preview after every save.
- **YouTube clips:** written from YouTube's transcript panel where Gleaner can
  read it, and from the description where it can't.
- **Five places to store a clip:** Google Drive, Notion, a Cowork project, your
  Claude Code project, and a private claude.ai artifact.
- **Where it runs:** the Claude Chrome side panel, Claude Code's built-in
  browser, Claude in Chrome, and ChatGPT's connected Chrome tabs and Work
  browser.

Every published release, with its notes, is on the [changelog](/changelog). The
source is on [GitHub](https://github.com/shawn-sandy/gleaner).
