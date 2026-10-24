---
title: 'Gleaner for YouTube: save a video, or just the moments that matter'
pubDate: 2026-10-24
description: 'How the /gleaner:youtube skill turns a YouTube video into a clip: a summary from its transcript or description, key moments that link to the exact second, the useful links, and just the parts you want.'
author: 'Shawn Sandy'
tags: ['gleaner', 'claude-code', 'plugins', 'youtube']
publish: true
---

Gleaner has a skill for web pages, `glean`, and a skill for YouTube videos,
`youtube`. This post is about the second one. It saves a video, or moments from
it, as a clip, and it works the way it does as of Gleaner 2.11.0, which brought
back clips written from the video's transcript.

The short version: Gleaner opens YouTube's own **Show transcript** panel and
reads the transcript, along with the video's description. Key moments come from
the transcript, or from the description's chapters when there isn't one, and
each links to the second it starts. The description's useful links are kept.
With a transcript, you can also clip just the parts you want. Where Gleaner
can't read the panel, paste the transcript instead.

## Install or update

In Claude Code:

```text
/plugin marketplace add shawn-sandy/gleaner
/plugin install gleaner@shawn-sandy
```

In the Claude app or Cowork, open **Customize → Plugins**, choose **Add → Add
marketplace**, enter `shawn-sandy/gleaner`, and install **Gleaner**. If a new
command does not show up after an update in Claude Code, run `/reload-plugins`.

## Saving a video

On a YouTube video, ask the same way you would for a page, or pass a link:

```text
save this video
clip this talk, for the motion post
save https://youtu.be/… to Notion
```

In Claude Code the same skill is also `/gleaner:youtube`. A video clip has the
same shape as a page clip, with a few parts that only videos get:

- **Channel:** the channel's name, linked to its page.
- **Video:** the publish date, the length, and what the summary was written
  from: the transcript panel, a pasted transcript, the description, your
  description, or the title only.
- **TL;DR:** two or three plain sentences on what the video covers, written only
  from what the description and any transcript say.
- **Key moments:** up to eight, in time order, each linking to the second it
  starts. With a transcript, they come from its lines, and any chapters help
  pick and name them. Without one, they're the video's chapters: the
  description lines that begin with a timestamp, such as `3:10 Generics`. A
  video with no chapters and no transcript has no Key moments, and Gleaner never
  estimates a timestamp.
- **Notable details:** code, numbers, tools, and names from the description.
- **Links:** up to eight of the description's links to things the video uses or
  talks about, such as docs, repos, slides, papers, and related videos.
- **Takeaways:** one to three ideas for how to use what the video covers, or
  what to follow up on.

Clips are often read later without the video open, so each key moment and part
says what it refers to, such as "the generics example", and never points at the
screen.

The Links section leaves out sponsor and affiliate links, social profiles and
link hubs, subscribe, newsletter, and membership links, merch, and shortened
links that hide where they go, such as bit.ly. Gleaner describes each link in
the description's own words and never opens one to find out what it is.

Gleaner also reads two details YouTube keeps about a video. Up to two of the
clip's tags can come from the uploader's keywords, and YouTube's category, such
as Science & Technology, hints at the clip's category and type. Both give way to
what the video actually covers.

To save several videos at once, say whether you want one clip per video or one
clip for the set. If you don't, Gleaner asks before saving. For one clip, it
reads every video first, so the summary covers the set instead of stitching
separate summaries together.

Everything else works the way it does for pages: your note, the `--to` flag,
categories and tags, the places a clip can be stored, and the preview in the
conversation.

## One video, one Source

A video can be shared many ways: a `youtu.be` link, a Shorts link, a live link,
or a watch link with tracking on the end. Gleaner saves all of them with the
same **Source**, `https://www.youtube.com/watch?v=<id>`, so the duplicate check
catches a video you've already clipped, whichever link you used.

A link with a timestamp (`t=`) opens the player at that time, so "add this part"
starts from where the link pointed.

## Videos with no description

Some descriptions say nothing about the video. They are empty, or hold only
links, hashtags, sponsor reads, and "subscribe" boilerplate. When that happens,
and there's no transcript either, Gleaner asks one optional question before
saving:

```text
This video has no description. Add a short one if you like, or say "skip" to save it from the title alone.
```

- **Write a line or two,** and Gleaner uses your words as the description. The
  **Video** line says the clip came from `your description`.
- **Say "skip",** or "just save it", and the clip is saved from the title and
  channel alone. It has no Key moments, Notable details, or Takeaways, and its
  TL;DR says only what the title does.

## Reading the transcript

In your own Chrome, meaning the Chrome side panel or Claude in Chrome, Gleaner
opens the video's **Show transcript** panel the way a viewer would and reads it,
long transcripts included. Opening the panel submits nothing and changes no
setting. The clip's **Video** line says it came from `transcript panel`.

YouTube opens that panel in the Claude Code built-in browser too, but sends it
empty, signed in or not. So when you save a video there and Claude in Chrome is
connected, Gleaner opens the video in a Claude in Chrome tab and reads the panel
there. Without Claude in Chrome, the clip is written from the description, and
Gleaner tells you that saving the video from Chrome reads its transcript.

Where the panel can't be read, paste the transcript yourself: on YouTube, open
**…more** under the video, then **Show transcript**, and copy it into the chat.
The **Video** line then says `pasted transcript`. Gleaner never downloads
captions or the video with command-line tools such as yt-dlp. YouTube blocks or
rate-limits them, so the panel and a paste are the only places a transcript
comes from.

However it arrives, a transcript adds:

- **A fuller summary,** with key moments from the whole video, not just the
  chapters.
- **How it works:** one short paragraph after the TL;DR, added only when the
  TL;DR can't explain the main idea on its own.
- **Parts:** the moments you want to keep, covered in the next section.

Transcripts are often auto-captions, which have no punctuation and often
mishear names and jargon. Gleaner checks product names, people, and code terms
against the title, the description, the uploader's keywords, and the category
before they go in the clip. If the panel's transcript isn't in the video's own
language, Gleaner says which language the clip was written from.

A transcript that arrives after saving, pasted or read once you open the panel,
updates the clip if you saved it in this session. For a clip from an earlier
session, Gleaner offers an updated copy instead. When a clip is saved without a
transcript, Gleaner says what it was written from, and that pasting the
transcript gets a fuller summary.

## Clipping moments

With a transcript, from the panel or pasted, you can collect parts of a video
the way you collect parts of a page:

| You say                                       | The part is                                                              |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| "keep 3:10 to 5:40", "the first five minutes" | the transcript lines in that range                                       |
| "grab the part about generics"                | the chapter or passage that best matches the topic                       |
| "add this part", while watching               | the chapter you're in, or the last minute or so if there are no chapters |

Each part is confirmed with its range and its first few words:

```text
Added part 2: generics (3:10–5:40, "So now let's look at…"). Add more, or say "done" to save.
```

In the saved clip, each part's heading links to the second it starts. Without a
transcript, Gleaner won't save a part. It asks you to paste the transcript and
offers a clip of the whole video instead.

You can also ask Claude a question about the video and say "save that". The
answer is kept as given, and any timestamps in it link to the second.

## Where it runs

- **The Chrome side panel and Claude in Chrome:** Gleaner opens the video's
  watch page and reads its details with a small read-only script: the title,
  channel, length, publish date, keywords, category, full description, and
  where you are in the video. Then it opens the transcript panel and reads that.
- **The Claude Code built-in browser:** the details script works the same way,
  but YouTube sends the transcript panel empty. Gleaner reads the transcript
  through Claude in Chrome when it's connected, and otherwise writes from the
  description unless you paste the transcript.
- **ChatGPT:** connected Chrome tabs have no way to run a script, so Gleaner
  reads the video's tab instead. It can't tell where you are in the video, so
  "this part" asks for a time range or topic. Where it would ask you to paste a
  transcript, it first asks you to open **…more**, then **Show transcript**, in
  the video's tab, and reads the lines from there. The Work browser opens the
  panel itself when the session gives it a click or JavaScript tool.
- **No browser:** Gleaner fetches the page for the title, channel, and
  description, and says the video was read without a browser.

Private, members-only, and age-restricted videos don't load in a signed-out
browser. Gleaner says so and suggests signing in to YouTube in that browser.

## After you save

Ask "what should I follow up on?" and Gleaner suggests three next steps for the
clip. If your session lists a skill that turns a video into something, such as
youtube-to-blog, one of the three may hand the clip to it, starting from the
clip's source, summary, key moments, and links. With no such skill listed,
Gleaner never suggests one.

## How it got here

- **1.6.0** (October 16): the youtube skill arrives. Clips are built from the
  video's transcript, with a description-only clip for videos without captions.
- **1.7.0** (October 16): answers about a video link their timestamps to the
  second.
- **1.10.0** (October 17): in ChatGPT, the skill reads the video's tab when the
  browser can't run its script.
- **2.4.0** (October 18): a video with no transcript gets a "save it anyway?"
  question.
- **2.10.0** (October 23): clips are written from the description. The
  transcript script had stopped working: in the Claude Code browser, turning
  captions on sent no request for them at all. So the skill now builds the clip
  from what the player does return, and the "save it anyway?" question is gone.
- **2.11.0** (October 24): clips are written from the transcript again, read
  from YouTube's own Show transcript panel instead of the caption files. Tags
  take hints from the uploader's keywords and the category, and follow-ups can
  hand a clip to another installed skill.

The [1.0 to 2.5 post](/posts/gleaner-1-0-to-2-5) has more on the early
releases. Every release, with its full notes, is on the
[changelog](/changelog). The source is on
[GitHub](https://github.com/shawn-sandy/gleaner).
