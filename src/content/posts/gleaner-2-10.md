---
title: 'Gleaner 2.10: a preview for every save'
pubDate: 2026-10-23
description: 'Two releases of the Gleaner plugin: every save now shows a bookmark preview in the conversation, YouTube clips are written from the description, and ChatGPT gives Markdown clips by default.'
author: 'Shawn Sandy'
tags: ['gleaner', 'claude-code', 'plugins', 'changelog']
publish: true
---

Gleaner went from 2.9.0 to 2.10.2 on October 23, 2026, picking up where
[the 2.6 to 2.9 post](/posts/gleaner-2-6-to-2-9) left off. Two releases came
out that day, 2.10.1 and 2.10.2. Gleaner's changelog lists most of the change
under 2.10.0, but 2.10.0 was never published on its own: 2.10.1 is the first
release that has it.

That 2.10.0 work changes what you see after every save: a short, structured
preview of the clip, right in the conversation. It also ships the YouTube change
the last post said was waiting on `main`. The 2.10.1 and 2.10.2 entries tidy up
how previews and file formats behave, and switch ChatGPT's default clip to
Markdown.

## Install or update

In Claude Code:

```text
/plugin marketplace add shawn-sandy/gleaner
/plugin install gleaner@shawn-sandy
```

In the Claude app or Cowork, open **Customize → Plugins**, choose **Add → Add
marketplace**, enter `shawn-sandy/gleaner`, and install **Gleaner**. If a new
command does not show up after an update in Claude Code, run `/reload-plugins`.

## 2.10.0: a preview for every save

Every saved or updated clip now shows a bookmark preview in the conversation.
That holds for pages, parts, answers, YouTube videos, and follow-ups. The
preview has the same content in ChatGPT and Claude Code:

- **The clip's title and the save result**, such as where it was stored or that
  it was given in this conversation only.
- **The basics:** the source type, category, saved date, and tags.
- **Overview, Key details, and Why it matters**, taken from the clip.
- **What Gleaner couldn't read**, such as a video summarized from its
  description alone, or an article it read only in part.
- **Actions:** links to the original source, the saved bookmark, the saved HTML,
  and the destination. Gleaner links only what it has verified, and leaves out
  an action it can't back up.

The full clip still holds every detail and the follow-up prompt. The preview is
the short version you read right after saving.

- **"No preview"** skips the detailed preview for one request. Gleaner still
  says where the clip was saved.
- **A failed preview doesn't save twice.** If the preview can't be shown,
  Gleaner falls back to readable Markdown and keeps the save as it was.
- **HTML without changing your preferences.** A clip saved as Markdown in a
  local folder gets an HTML companion file beside it. Drive and Notion saves can
  offer a separate HTML download in the chat, where the chat supports
  attachments. (2.10.2 turns this off in ChatGPT; see below.)

### YouTube clips from the description

The change the last post flagged as unreleased is now out. Gleaner can no longer
capture YouTube transcripts in the browser, so video clips are written from the
video's description and chapters:

- The `youtube` skill no longer asks whether to save a video without a
  transcript.
- When a video has no description, Gleaner asks for a short one. It's optional:
  say "skip" to save from the title alone.
- A new **Channel** line names and links the channel. The **Video** line now
  says what the summary was written from: the description, your description,
  the title, or a pasted transcript.
- A new **Links** section keeps the description's links to docs, repos, slides,
  and other things the video uses. Sponsor, affiliate, social, subscribe, merch,
  and shortened links are left out.
- Paste a transcript (**…more → Show transcript** on YouTube) for a fuller
  summary, or to clip moments by time range or topic.

[What Gleaner's YouTube skill can't do](/posts/youtube-skill-constraints) covers
the limits this sets, and the workaround for each.

## 2.10.1: links that stay links

- **Download links stay clickable.** Where the chat supports download links, a
  download in a preview stays a link you can click, including when an
  interactive preview fails and Gleaner falls back to Markdown.
- **"Use Markdown" still means the file.** Asking to use Markdown still picks
  the saved file format. Ask for a "Markdown preview" to change only how the
  preview looks in the conversation.

## 2.10.2: Markdown by default in ChatGPT

The default clip now depends on where you use Gleaner:

- **ChatGPT gives Markdown.** A clip given in the conversation is a `.md` file
  by default, including when your format is `auto`.
- **Claude keeps HTML.** A clip in the conversation is still an HTML file you
  can open in any browser.
- **Your choice still wins.** A Markdown preference you set applies in both.

ChatGPT also stops adding the automatic HTML companions from 2.10.0 to new
saves. Ask for an HTML download when you want one. An HTML clip or companion
that already exists keeps its format when Gleaner updates it.

## Where Gleaner stands at 2.10.2

- **Four skills:** `glean`, `youtube`, `preferences`, and `follow-up`.
- **In the chat by default:** an HTML file in Claude, a `.md` file in ChatGPT,
  with a bookmark preview after every save.
- **Five places to store a clip:** Google Drive, Notion, a Cowork project, your
  Claude Code project, and a private claude.ai artifact.
- **Where it runs:** the Claude Chrome side panel, Claude Code's built-in
  browser, Claude in Chrome, and ChatGPT's connected Chrome tabs and Work
  browser.

Every published release, with its notes, is on the [changelog](/changelog). The
2.10.0 notes are only in the
[README changelog](https://github.com/shawn-sandy/gleaner#changelog), since
2.10.0 has no release of its own. The source is on
[GitHub](https://github.com/shawn-sandy/gleaner).
