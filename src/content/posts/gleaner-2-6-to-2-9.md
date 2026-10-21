---
title: 'Gleaner 2.6 to 2.9: clips come back in the chat'
pubDate: 2026-10-21
description: 'Four releases of the Gleaner plugin: clips come back in the conversation by default, as HTML files, written in plain language, and Gleaner reads split articles and canonical links.'
author: 'Shawn Sandy'
tags: ['gleaner', 'claude-code', 'plugins', 'changelog']
publish: true
---

Gleaner went from 2.6.0 to 2.9.0 between October 19 and October 21, 2026. That
is four releases, picking up where
[the 1.0 to 2.5 post](/posts/gleaner-1-0-to-2-5) left off. Two of them change
what you get back when you save something: a clip now comes back in the
conversation unless you say where to store it, and it comes back as an HTML
file. The other two change how a clip is written and how much of the page
Gleaner reads.

## Install or update

In Claude Code:

```text
/plugin marketplace add shawn-sandy/gleaner
/plugin install gleaner@shawn-sandy
```

In the Claude app or Cowork, open **Customize → Plugins**, choose **Add → Add
marketplace**, enter `shawn-sandy/gleaner`, and install **Gleaner**. If a new
command does not show up after an update in Claude Code, run `/reload-plugins`.

## 2.6.0: clips come back in the chat

With no saved preference, a clip now comes back as a file in the conversation
on every surface: the Chrome side panel, ChatGPT, Claude Code, and Cowork.
Nothing is stored unless you name a destination, such as "save to Drive", "save
it to this project", or `--to notion`, or set a default with
`/gleaner:preferences`.

- **`--to chat`**, or "just give me the file", picks the conversation
  explicitly, for when your saved default is somewhere else.
- **Store it after all.** Right after a clip comes back in the chat, "save it to
  Drive" (or "save it to this project" in Claude Code and Cowork) stores that
  same clip, parts included.
- **Cowork stays in the chat too.** Cowork no longer saves into the open
  project on its own; say "this project" to save there.
- **Google Docs go to Drive.** "Save it as a Google Doc" now saves to Drive on
  every surface.
- **No setup question.** The first save no longer asks about setup, since the
  chat default needs nothing stored. Gleaner mentions
  `/gleaner:preferences setup` once per session instead.

One trade-off: a clip in the conversation isn't stored anywhere, so a search or
a follow-up in a later session can't find it. Download or copy it to keep it, or
name a stored destination.

## 2.7.0: written in plain language

Clips are now written for a reader who is new to the topic:

- Short sentences, with technical terms explained the first time they appear.
- A TL;DR that says what the page says.
- Key points and takeaways as full sentences that start with a bold claim. Page
  clips have 3 to 5 key points, down from 5 to 8.

Two sections appear only when they help:

- **How it works:** one short paragraph after the TL;DR, in page and video
  clips, added only when the TL;DR can't explain the page's main idea on its
  own.
- **Steps:** tutorial pages get a numbered list in place of Key points, one
  action per step, in the source's order. Tutorial videos keep Key moments.

Every clip now ends with a copy-and-paste prompt for getting follow-ups later,
set apart below a divider. It names the clip and where it's stored, gives the
file path for clips in a local folder, or asks you to attach the file for a clip
given in the conversation. Clips saved inside your Claude Code project also get
a `claude` terminal command that starts Claude Code and sends the prompt.

## 2.8.0: HTML files in the chat

A clip given in the conversation is now an HTML file you can open in any
browser, in the same clean, single-column style as artifact clips, with light
and dark themes.

- Say "keep it as markdown", or set your default format to `markdown`, to get a
  `.md` file instead.
- Where the chat can't attach files, the clip still comes as one Markdown code
  block.
- Code blocks in HTML clips, artifacts included, can now be scrolled with the
  keyboard.

## 2.9.0: reading more of the page

Gleaner now reads a few facts from the page itself:

- **Split articles.** An article spread across numbered pages (page 2, page 3,
  and so on) is read to the end, up to five pages, and saved as one clip that
  says how many pages it covers.
- **Duplicate links.** The duplicate check also matches the main address a page
  names for itself (its canonical URL, on the same site only), so a tracking or
  share link to an article you've already clipped is caught. When the page says
  it changed after your clip, Gleaner tells you before asking whether to save an
  updated copy.
- **Described parts.** "Grab the part about X" starts from the page heading
  that matches X, when there is one.
- **Clip types.** A page's own schema.org type helps pick the clip's Type, such
  as tutorial for a how-to page.

These use a small read-only script, so they work in the Chrome side panel, the
Claude Code desktop browser, Claude in Chrome, and ChatGPT's Work browser when
it has a JavaScript tool. ChatGPT's connected tabs work as before.

## Where Gleaner stands at 2.9.0

- **Four skills:** `glean`, `youtube`, `preferences`, and `follow-up`.
- **In the chat by default:** an HTML file in the conversation, or a `.md` file
  with the `markdown` format.
- **Five places to store a clip:** Google Drive, Notion, a Cowork project, your
  Claude Code project, and a private claude.ai artifact.
- **Where it runs:** the Claude Chrome side panel, Claude Code's built-in
  browser, Claude in Chrome, and ChatGPT's connected Chrome tabs and Work
  browser.

One change is on `main` but not in a release yet: YouTube clips are now written
from the video's description and chapters, since Gleaner no longer captures
transcripts. Paste a transcript for a fuller summary, or to clip moments by time
range or topic.

Every release, with its full notes, is on the [changelog](/changelog). The
source is on [GitHub](https://github.com/shawn-sandy/gleaner).
