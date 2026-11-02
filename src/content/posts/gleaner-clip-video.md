---
title: 'Clip a video in three phrases'
pubDate: 2026-11-02
description: 'Save a YouTube video as a summary whose key moments link to the exact second, or keep just the minutes that matter. Three phrases, what you get, and what to do when there is no transcript. Written for Gleaner 2.14.0.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'youtube', 'plugins']
publish: true
---

A talk is an hour long, and the part you need is four minutes of it. This guide
covers the lunch step of [a day with Gleaner](/posts/gleaner-daily-routine): keeping
a video, or just the moments that matter, with three phrases. Written for
Gleaner 2.14.0.

## 1. Save the whole video

Open the video and say:

> save this video

Or pass a link from anywhere:

> save `https://youtu.be/…`, for the motion post

As with a page, the words after the comma become the clip's note. Any kind of
YouTube link works (`youtu.be`, Shorts, a share link), and they all count as the
same video, so Gleaner tells you if you've already clipped it.

## 2. Keep just a stretch

> keep 3:10 to 5:40

Give a start and end time, and Gleaner adds that stretch as a part. Its heading
links straight to 3:10 in the video.

## 3. Keep a topic

> grab the part about generics
>
> add this part

Name a topic and Gleaner finds it in the transcript. "Add this part" keeps the
chapter you're watching, or about the last minute. In ChatGPT, Gleaner often
can't see where you are in the video, so name a time range or topic there
instead. Collect as many parts as you like, then say **"done"** to save them as
one clip.

## What you get

The same short summary as a page clip, plus:

- **Key moments** in place of key points, each linking to the second it starts.
- A **Channel** line that names and links the channel.
- A **Video** line with the publish date, length, and what the summary was
  written from.
- A **Links** section with the description's useful links, such as docs and
  repos. Sponsor, social, merch, and shortened links are left out.

The full clip shows in the chat, wherever it's stored.

## When there's no transcript

Gleaner reads the transcript from YouTube's own **Show transcript** panel, and
that works best in your own Chrome, through the side panel or Claude in Chrome.
YouTube sends the panel empty to the Claude Code built-in browser.

Without a transcript, the clip is written from the description and chapters.
That's fine for the whole video, but parts need the transcript. To fix it, paste
the transcript yourself (**…more → Show transcript** on YouTube), before or
after saving.

If a video has no description either, Gleaner asks for a short one. Say "skip"
to save it from the title alone.

In ChatGPT, open **Show transcript** in the video's tab when Gleaner asks. If it
can't read the video at all, paste a description or transcript, or say
**"save link only"** for a plain bookmark.

For more workarounds, see
[what the YouTube skill can't do](/posts/youtube-skill-constraints).

## Quick reference

| To…                  | Say                        |
| -------------------- | -------------------------- |
| Save a video         | "save this video"          |
| Keep a time range    | "keep 3:10 to 5:40"        |
| Keep a topic         | "grab the part about …"    |
| Keep what's playing  | "add this part" (Claude)   |
| Save collected parts | "done"                     |
| Bookmark only        | "save link only" (ChatGPT) |

For every option, see
[saving YouTube videos](https://github.com/shawn-sandy/gleaner#saving-youtube-videos)
in the README.
