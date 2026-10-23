---
title: "What Gleaner's YouTube skill can't do, and how to work around it"
pubDate: 2026-10-23
description: 'The YouTube skill writes clips from what it can read on the video page. Here is what that rules out, from transcripts to saving on a phone, and the workaround for each.'
author: 'Shawn Sandy'
tags: ['gleaner', 'youtube', 'plugins', 'guide']
publish: true
---

Gleaner's `youtube` skill saves a video as a clip: a short summary, the channel,
the description's useful links, and the video's chapters as key moments that
link to the exact second. It gets all of that by reading the video page. It
doesn't watch the video or listen to it.

That one fact sets every limit below. This post covers the skill as of Gleaner
2.10, which writes clips from the video's description instead of its
transcript. The change is listed under 2.10.0 in the
[README's changelog](https://github.com/shawn-sandy/gleaner#changelog), and
2.10.1, released October 23, 2026, is the first published release that has it.

## The short version

- **Save from a desktop browser Gleaner can drive**, such as the Chrome side
  panel or the Browser pane in Claude Code desktop, not from your phone.
- **Paste the transcript** when the description isn't enough, or when you want
  just part of a video.
- **Name the time range or topic** for a part whenever Gleaner can't see the
  player.

## Gleaner doesn't capture transcripts

YouTube returns caption files empty to scripts, and to browsers it doesn't
trust, such as a signed-out built-in browser. So Gleaner no longer tries. A clip
is written from the video's description, and it can only say what the
description says. The clip's **Video** line records this as `from: description`.

**Workaround: paste the transcript.** On YouTube in a desktop browser, open
**…more** under the video, then **Show transcript**, then select and copy the
text. Paste it into the chat before or after you save:

- **Before:** the clip is written from the description and the transcript, with
  key moments from the whole video.
- **After, in the same session:** the clip you just saved is refreshed.
- **After, in a later session:** open the video, paste the transcript, and save
  it to the same place as before, such as "save to Notion". If that place stores
  clips, Gleaner finds the earlier clip and offers an updated copy that links to
  it. A clip given in the chat isn't stored anywhere, so there is nothing to
  find, and you get a new clip instead.

Pasted transcripts are often auto-captions, which have no punctuation and often
mishear names and jargon. Gleaner checks product names, people, and code terms
against the title and description, but give those a quick read.

## A thin description makes a thin clip

Some descriptions say nothing about the video: they are empty, or hold only
links, hashtags, sponsor reads, and "subscribe" boilerplate. Gleaner asks one
optional question for a short description of your own. Say "skip", and it saves
the clip from the title and channel alone. That clip's TL;DR says only what the
title says, and it has no key moments, notable details, or takeaways.

**Workaround: give it something to read.** Two or three sentences of your own
are enough, and the clip records them as `from: your description`. A pasted
transcript does better, since it covers the whole video.

## Key moments come from chapters

Gleaner never estimates a timestamp. Key moments are the chapters written in the
description: the lines that start with a time, such as `0:00 Intro` or
`3:10 Generics`, up to eight of them, with small ones merged. Gleaner reads
chapters only from the description, so a video with none written there gets no
key moments, even if YouTube shows chapters in the player.

**Workaround: paste the transcript.** Its timestamped lines give Gleaner real
moments to link to, chapters or not.

## Parts need a transcript

Clipping part of a video, such as "keep 3:10 to 5:40" or "grab the part about
generics", needs the transcript's lines for that stretch. Without a transcript,
Gleaner won't save a part. It asks you to paste the transcript and offers a clip
of the whole video instead.

**Workarounds:**

- **Paste the transcript first**, then collect as many parts as you like, and
  say "done" to save them as one clip.
- **Save the whole video with a note** that names the moment, such as "save
  this video, for the motion post, the easing demo at 3:10". Notes keep your own
  words, so the pointer survives without a transcript.

## "This part" needs to see the player

"Add this part" means the chapter you're watching, or about the last minute if
there are no chapters. Like any part, it needs a pasted transcript. Gleaner
reads where you are by running a small script in the browser, and where it can't
run one, it can't tell where you are:

- **ChatGPT's connected Chrome tabs**, which have no JavaScript tool.
- **ChatGPT's Work browser**, unless the session shows a JavaScript tool for it.
- **A chat with no browser at all**, which has no player to read.

**Workaround: say where.** Once a transcript is pasted, "keep 12:00 to 15:30" or
"the part about generics" works everywhere. In a Claude browser (the Chrome side
panel, the Browser pane in Claude Code desktop, or Claude in Chrome), a link with
a timestamp (`?t=190`) opens the player at that time, so "add this part" uses
that position.

ChatGPT has one small advantage here: when a connected tab shows the video's
transcript lines, Gleaner uses them, so you may not need to paste anything.

## On a phone, there's usually no browser for Gleaner to drive

Every browser Gleaner reads a video in is one it drives: the Chrome side panel,
the Browser pane in Claude Code desktop, Claude in Chrome, or ChatGPT's
connected Chrome tabs and Work browser. On a phone, you usually aren't in any of
them. When Gleaner runs in a chat with no browser tools and you give it a link,
such as one shared from the YouTube app, it can only fetch the video's page from
the web. It says the video was read without a browser.

What that costs you:

- **Fewer details.** The fetched page may not return the description at all.
  When it doesn't, Gleaner says it couldn't read the description and asks for a
  short one. Say "skip", and the clip is written from the title alone.
- **No playback position.** "Add this part" has nothing to read. Paste the
  transcript and give a time range or topic instead.
- **No sign-in.** Private, members-only, and age-restricted videos need you
  signed in to YouTube in the browser Gleaner is using. With no browser, there
  is nothing to sign in to.
- **No easy transcript.** Copying a transcript is easiest in a desktop browser,
  so the best clip of a video is a desktop job.

**Workaround: open the video in a desktop browser Gleaner can drive.**

- **Chrome side panel:** open the video in Chrome, open the Claude side panel,
  and say "save this video".
- **Claude Code desktop:** open the Browser pane (Cmd+Shift+B on Mac,
  Ctrl+Shift+B on Windows), go to the video, and say "save this video". The pane
  has its own sign-ins, separate from Chrome, so sign in to YouTube there once
  for private or members-only videos.
- **Claude in Chrome** (Claude Code with `--chrome`, or Cowork): it works in tabs
  it opens itself, so pass the link: `save https://youtu.be/…`.

If you find a video on your phone, you don't have to save it there. Send
yourself the link, or add it to Watch Later, and save it at your desk. Gleaner
gives a `youtu.be` link, a Short, a live link, a link to the mobile site, and a
share link with tracking on it the same `youtube.com/watch?v=…` source. If you
stored a clip of the video earlier, saving it to the same place again lets the
duplicate check catch it.

If you'd rather save on the go, store the clip, for example
`save https://youtu.be/… to Notion`, instead of taking it in the chat. Back at a
desktop, open the video, paste the transcript, and say "save to Notion" again.
Gleaner finds the stored clip and offers an updated copy.

The phone is still a good place to read clips. Save one from Claude Code with
`--to artifact`, and it becomes a private claude.ai page that reads well on a
small screen.

## Quick reference

| Constraint                        | Workaround                                             |
| --------------------------------- | ------------------------------------------------------ |
| No transcript capture             | Paste it from **…more → Show transcript**              |
| Thin or empty description         | Add a short description, or paste the transcript       |
| No chapters, so no key moments    | Paste the transcript                                   |
| Parts need a transcript           | Paste it first, or save the whole video with a note    |
| "This part" needs the player      | Paste the transcript, then say the time range or topic |
| Phone: link only, no sign-in      | Save from a desktop browser Gleaner can drive          |
| Phone: saving now, refining later | Store the clip, then save it again with the transcript |

## Check what a clip was written from

From 2.10 on, a whole-video clip's **Video** line ends with what Gleaner read:
`description`, `your description`, `title only`, or `pasted transcript`. When a
clip looks thin, check that line first. It tells you which workaround to reach
for.

The skill's source is on
[GitHub](https://github.com/shawn-sandy/gleaner/blob/main/plugins/gleaner/skills/youtube/SKILL.md),
and every release is on the [changelog](/changelog).
