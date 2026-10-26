---
title: "What Gleaner's YouTube skill can't do, and how to work around it"
pubDate: 2026-10-23
description: 'As of Gleaner 2.12, the YouTube skill writes clips from what it can read on the video page. Here is what that rules out, from transcripts to saving on a phone, and the workaround for each.'
author: 'Shawn Sandy'
tags: ['gleaner', 'youtube', 'plugins', 'guide']
publish: true
---

Gleaner's `youtube` skill saves a video as a clip: a short summary, the channel,
the description's useful links, and key moments that link to the exact second.
It gets all of that by reading the video page. It doesn't watch the video or
listen to it.

That one fact sets every limit below. This post covers the skill as of Gleaner
2.12.2, released October 25, 2026. It was first written for 2.10, when clips
came from the video's description and Gleaner couldn't capture transcripts in
the browser. 2.11.0 reads transcripts again, from YouTube's own **Show
transcript** panel, in the browsers that let it. 2.11.1 and 2.12.1 change ChatGPT in
ways that matter most on a phone: it asks before saving a video it can't read,
and shows the whole clip in the chat. The changes are listed in the
[README's changelog](https://github.com/shawn-sandy/gleaner#changelog).

## The short version

- **Save from Chrome:** the Chrome side panel or Claude in Chrome. Gleaner reads
  the transcript there itself. On a phone, store the clip by link and finish it
  at a desk. In ChatGPT, when Gleaner can't read the video at all, it asks you
  to paste its description or transcript, or to save the link only.
- **Paste the transcript** only where Gleaner can't read it, such as Claude
  Code's built-in browser without Claude in Chrome, or a chat with no browser.
  In ChatGPT, open **Show transcript** in the video's tab first.
- **Name the time range or topic** for a part whenever Gleaner can't see the
  player.

## Not every browser can read the transcript

Gleaner reads a transcript from YouTube's **Show transcript** panel, under
**…more** below the video. It opens the panel the way a viewer does, which
submits nothing and changes no setting, and reads it, long transcripts included.
The clip's **Video** line records this as `from: transcript panel`. When the
transcript isn't in the video's own language, the clip says which language it
was written from.

Where that works depends on the browser:

- **The Chrome side panel and Claude in Chrome:** Gleaner opens the panel and
  reads it.
- **Claude Code's built-in browser:** YouTube opens the panel there but sends it
  empty, even when you're signed in. When Claude in Chrome is connected, Claude
  Code opens the video in a Claude in Chrome tab and reads the transcript there.
  Otherwise the clip is written from the description, and the confirmation says
  that saving the video from Chrome reads its transcript.
- **ChatGPT:** where Gleaner would ask you to paste a transcript, it first asks
  you to open **…more → Show transcript** in the video's tab, then reads the
  lines from there. It asks for a paste only if no tab shows the video, or the
  tab still shows no transcript lines. The Work browser opens the panel itself
  when it has a click or JavaScript tool.
- **A chat with no browser:** there's no panel to open, so the clip is written
  from the description.

Some videos have no transcript, and sometimes the panel doesn't load. Either
way, the clip is written from the description, and the confirmation says what
it was written from. Gleaner never downloads captions or the video with
command-line tools such as yt-dlp. The panel and a pasted transcript are its
only transcript sources.

**Workaround: save from Chrome, or paste the transcript.** Where Gleaner can't
read the panel, copy the transcript yourself. On YouTube in a desktop browser,
open **…more** under the video, then **Show transcript**, then select and copy
the text. Paste it into the chat before or after you save:

- **Before:** the clip is written from the description and the transcript, with
  key moments from the whole video.
- **After, in the same session:** the clip you just saved is refreshed.
- **After, in a later session:** open the video, paste the transcript, and save
  it to the same place as before, such as "save to Notion". If that place stores
  clips, Gleaner finds the earlier clip and offers an updated copy that links to
  it. A clip given in the chat isn't stored anywhere, so there is nothing to
  find, and you get a new clip instead.

Transcripts are often auto-captions, which have no punctuation and often mishear
names and jargon. That goes for the panel and a pasted copy alike. Gleaner
checks product names, people, and code terms against the title, the description,
the uploader's keywords, and YouTube's category for the video, but give those a
quick read.

## A thin description makes a thin clip

Some descriptions say nothing about the video: they are empty, or hold only
links, hashtags, sponsor reads, and "subscribe" boilerplate. When Gleaner has a
transcript, it writes from that and doesn't ask. Without one, it asks one
optional question for a short description of your own. Say "skip", and it saves
the clip from the title and channel alone. That clip's TL;DR says only what the
title says, and it has no key moments, notable details, or takeaways.

**Workaround: give it something to read.** Two or three sentences of your own
are enough, and the clip records them as `from: your description`. A transcript
does better, since it covers the whole video: save from Chrome, or paste one.

## Without a transcript, key moments come from chapters

Gleaner never estimates a timestamp. With a transcript, key moments come from
its timestamped lines, and any chapters help choose and name them. Without one,
key moments are the chapters written in the description: the lines that start
with a time, such as `0:00 Intro` or `3:10 Generics`, up to eight of them, with
small ones merged. Gleaner reads chapters only from the description, so a video
with no transcript and no chapters written there gets no key moments, even if
YouTube shows chapters in the player.

**Workaround: save from Chrome, or paste the transcript.** Its timestamped lines
give Gleaner real moments to link to, chapters or not.

## Parts need a transcript

Clipping part of a video, such as "keep 3:10 to 5:40" or "grab the part about
generics", needs the transcript's lines for that stretch. In the Chrome side
panel and Claude in Chrome, Gleaner reads them from the panel, so parts work
without pasting. Where it has no transcript, Gleaner won't save a part. It asks
you to paste the transcript and offers a clip of the whole video instead. In
ChatGPT, it first asks you to open **Show transcript** in the video's tab.

**Workarounds:**

- **Clip parts in Chrome:** collect as many as you like, and say "done" to save
  them as one clip.
- **Paste the transcript first** where Gleaner can't read the panel, then
  collect parts the same way.
- **Save the whole video with a note** that names the moment, such as "save
  this video, for the motion post, the easing demo at 3:10". Notes keep your own
  words, so the pointer survives without a transcript.

## "This part" needs to see the player

"Add this part" means the chapter you're watching, or about the last minute if
there are no chapters. Like any part, it needs a transcript, which Gleaner reads
from the panel in Chrome. Gleaner reads where you are by running a small script
in the browser, and where it can't run one, it can't tell where you are:

- **ChatGPT's connected Chrome tabs**, which have no JavaScript tool.
- **ChatGPT's Work browser**, unless the session shows a JavaScript tool for it.
- **A chat with no browser at all**, which has no player to read.

**Workaround: say where.** Once Gleaner has a transcript, "keep 12:00 to 15:30"
or "the part about generics" works everywhere. In a Claude browser (the Chrome
side panel, the Browser pane in Claude Code desktop, or Claude in Chrome), a
link with a timestamp (`?t=190`) opens the player at that time, so "add this
part" uses that position. In Claude in Chrome, Gleaner closes its own tab once a
clip is saved. A part added later opens the video again at the link's time, not
where you were watching, so name the time range or topic.

In ChatGPT, the transcript can come from the tab: open **…more → Show
transcript** in the video's tab, and Gleaner reads the lines from there, so you
don't need to paste anything. You still name the time range or topic.

## On a phone, there's usually no browser for Gleaner to drive

Every browser Gleaner reads a video in is one it drives: the Chrome side panel,
the Browser pane in Claude Code desktop, Claude in Chrome, or ChatGPT's
connected Chrome tabs and Work browser. On a phone, you usually aren't in any of
them. When Gleaner runs in a chat with no browser tools and you give it a link,
such as one shared from the YouTube app, it can only fetch the video's page from
the web. It says the video was read without a browser.

What that costs you:

- **Fewer details.** The fetched page may not return the description at all.
  In Claude, Gleaner then says it couldn't read the description and asks for a
  short one. Say "skip", and the clip is written from the title alone. In
  ChatGPT, Gleaner saves nothing until you choose: paste the description or
  transcript for a summary, or say "save link only" for a bookmark with no
  summary, which its **Video** line marks `link only`.
- **No playback position.** "Add this part" has nothing to read. Paste the
  transcript and give a time range or topic instead.
- **No sign-in.** Private, members-only, and age-restricted videos need you
  signed in to YouTube in the browser Gleaner is using. With no browser, there
  is nothing to sign in to.
- **No transcript panel.** With no browser, there's no panel to open, and
  copying a transcript by hand is easiest in a desktop browser. The best clip of
  a video is a desktop job.

**Workaround: open the video in a desktop browser Gleaner can drive.**

- **Chrome side panel:** open the video in Chrome, open the Claude side panel,
  and say "save this video". Gleaner reads the transcript there.
- **Claude Code desktop:** open the Browser pane (Cmd+Shift+B on Mac,
  Ctrl+Shift+B on Windows), go to the video, and say "save this video". The pane
  has its own sign-ins, separate from Chrome, so sign in to YouTube there once
  for private or members-only videos. YouTube sends the pane an empty transcript
  panel, so Claude Code reads the transcript through Claude in Chrome when
  that's connected, and otherwise writes the clip from the description.
- **Claude in Chrome** (Claude Code with `--chrome`, or Cowork): it works in tabs
  it opens itself, so pass the link: `save https://youtu.be/…`. It reads the
  transcript too.

If you find a video on your phone, you don't have to save it there. Send
yourself the link, or add it to Watch Later, and save it at your desk. Gleaner
gives a `youtu.be` link, a Short, a live link, a link to the mobile site, and a
share link with tracking on it the same `youtube.com/watch?v=…` source. If you
stored a clip of the video earlier, saving it to the same place again lets the
duplicate check catch it.

If you'd rather save on the go, store the clip, for example
`save https://youtu.be/… to Notion`, instead of taking it in the chat. Back at a
desktop, open the video in Chrome and say "save to Notion" again. Gleaner reads
the transcript this time, finds the stored clip, and offers an updated copy.

In ChatGPT, when Gleaner can't read the video, say "save link only" to keep the
bookmark now. Paste the description or transcript later in the same
conversation, and Gleaner fills in that clip instead of making a new one. If the
clip is stored somewhere that needs a replacement file, it asks first.

The phone is still a good place to read clips. In ChatGPT, the whole clip shows
in the conversation, phone included, with the Markdown file linked after it when
ChatGPT can attach one. In
Claude Code, save with `--to artifact`, and the clip becomes a private
claude.ai page that reads well on a small screen.

## Quick reference

| Constraint                            | Workaround                                                 |
| ------------------------------------- | ---------------------------------------------------------- |
| Not every browser reads transcripts   | Save from the Chrome side panel or Claude in Chrome        |
| Built-in browser gets an empty panel  | Connect Claude in Chrome, or paste the transcript          |
| ChatGPT: connected tabs can't click   | Open **…more → Show transcript** in the video's tab        |
| Thin or empty description             | Save from Chrome, add a description, or paste a transcript |
| No transcript or chapters, no moments | Save from Chrome, or paste the transcript                  |
| Parts need a transcript               | Clip them in Chrome, paste it first, or save with a note   |
| "This part" needs the player          | Get a transcript, then say the time range or topic         |
| Phone: no browser, no sign-in         | Save from a desktop browser Gleaner can drive              |
| ChatGPT can't read the video at all   | Paste the description or transcript, or save the link only |
| Phone: saving now, refining later     | Store the clip, then save it again from Chrome             |

## Check what a clip was written from

A whole-video clip's **Video** line ends with what Gleaner read:
`transcript panel`, `pasted transcript`, `description`, `your description`,
`title only`, or, in ChatGPT, `link only`. 2.11 added `transcript panel`, and
2.11.1 added `link only`. When a clip looks thin, check that line first. It
tells you which workaround to reach for.

The skill's source, as of 2.12.2, is on
[GitHub](https://github.com/shawn-sandy/gleaner/blob/v2.12.2/plugins/gleaner/skills/youtube/SKILL.md),
and every release is on the [changelog](/changelog).
