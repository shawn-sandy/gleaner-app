---
title: 'How the Gleaner promo Short was made'
pubDate: 2026-10-25
description: 'Gleaner has an animated YouTube Short, about 75 seconds long. Here is what it covers, and how one session turned a script into a word-synced video with an ElevenLabs voiceover.'
author: 'Shawn Sandy'
tags: ['gleaner', 'youtube', 'plugins', 'claude-code']
publish: true
youtube:
  id: 'BjbC91CiQyo'
---

Gleaner has a promo video: an animated vertical Short, about 75 seconds long.
It plays above, or you can
[watch it on YouTube](https://youtube.com/shorts/BjbC91CiQyo). In nine beats it
covers what Gleaner does, from saving a page to following up on a clip.

The whole thing came out of one session on Sunday, October 25, 2026, from the
first storyboard to the final MP4. Claude built the storyboard, ElevenLabs voiced
it, and each item on screen enters on the word that names it.

## What's in it

Each beat is one line of voiceover and one scene. Plenty of people watch Shorts
with the sound off, and this one has no captions burned in yet, so here is the
script:

1. **Hook.** "Ever read something great online, then couldn't find it a week
   later? This is Gleaner, a plugin for Claude and ChatGPT that fixes that."
2. **Problem.** "Tabs pile up, bookmarks lose their context, and notes turn into
   a pile of pasted text with no source."
3. **What a clip holds.** "Gleaner reads the page, skips the ads and navigation,
   and saves a short clip: a TL;DR, key points, takeaways, a category and tags."
4. **Just ask.** "No commands to memorize. Open a page and say 'save this page.'
   Add a reason after it, and Gleaner keeps that as the clip's note."
5. **Collect parts.** "Researching across sites? Highlight a part and say 'add
   this.' Keep going across tabs, then say 'done, save them.' You get one clip
   with every source linked."
6. **Videos too.** "It works on YouTube too. Gleaner reads the transcript and
   saves key moments that link to the exact second."
7. **Where clips go.** "Keep clips in the chat, or save them to Google Drive,
   Notion, a private Claude artifact, a Cowork project, or your Claude Code
   project."
8. **What next.** "Not sure what to do with a clip? Ask 'what should I follow up
   on?' and Gleaner suggests three next steps and saves them into the clip."
9. **Get Gleaner.** "Gleaner is open source on GitHub. Link in the description.
   Follow for more tools like this."

The clip shown in the video, with its timestamps and follow-ups, is an example,
not a real saved clip. Collecting parts across tabs works wherever Gleaner runs,
but not always by highlighting. In ChatGPT's connected tabs you describe or paste
the part, and Claude in Chrome needs the page's URL. The README's
[Collecting across tabs and sites](https://github.com/shawn-sandy/gleaner#collecting-across-tabs-and-sites)
section covers each one.

## How it was made

Six steps take the script to a finished video:

1. **Storyboard.** Lock the beats: each voiceover line, its scene, and the cue
   word each element enters on.
2. **Voiceover.** ElevenLabs reads the whole script as one prompt, in a voice
   called Cookie, so the voice and pace stay even across beats. It makes two
   takes per recording.
3. **Transcribe.** ElevenLabs Scribe returns every word with its start and end
   time.
4. **Timeline.** Split the transcript into lines, map each cue word to its time,
   and cut scenes in the pause between lines.
5. **Render.** Headless Chromium steps an HTML page frame by frame at 30 frames a
   second. The animation depends only on the time, so a slow render can't drop or
   shift a frame. This is the slow step, about 10 minutes per take.
6. **Encode and check.** ffmpeg writes the MP4, then one frame per scene is
   pulled back out of the file to check it.

The first version split the audio on silences instead of word timestamps, and
the slides changed mid-sentence. The pauses inside a line run as long as the
pauses between lines, so silence can't tell them apart. Word timestamps can.

Some motion runs on top of the cues. The newest item glows copper for about a
second, the asks in the chat scene type themselves out, and a progress bar runs
along the top. Nothing important sits in the bottom 350 pixels or so, where
YouTube puts its captions and buttons.

The voiceover was recorded a second time after the script changed from "a
plugin for Claude" to "a plugin for Claude and ChatGPT". The video above is the
second take of that re-record. Both recordings and their transcripts came to
about 7,000 ElevenLabs credits, roughly $1.17 at the prices ElevenLabs showed.

## Make your own with OnCue

The workflow is now a Claude Code plugin marketplace,
[OnCue](https://github.com/shawn-sandy/oncue): "Explainer Shorts where every
word lands on cue." Install it in Claude Code:

```text
/plugin marketplace add shawn-sandy/oncue
/plugin install oncue@oncue
```

| Skill             | Ask for                                 | You get                                                   |
| ----------------- | --------------------------------------- | --------------------------------------------------------- |
| `explainer-video` | "make an explainer short about our CLI" | The whole pipeline, with check-ins at the beats and voice |
| `storyboard`      | "storyboard a 60-second Short"          | A `short.json` spec, beat list, preview stills            |
| `voiceover`       | "voice it with ElevenLabs"              | Two MP3 takes, each with word timestamps                  |
| `vertical-deck`   | "make the 9:16 slides"                  | An editable .pptx, voiceover in speaker notes             |
| `animate-short`   | "render it, and animate the slides"     | The final MP4, or a silent preview before audio           |

One `short.json` file drives the storyboard, the script, the slides and the
video. OnCue is at 1.0.0. An earlier cut of the Gleaner Short, from before the
ChatGPT re-record and the new logo, ships as its example.

## Get Gleaner

In Claude Code:

```text
/plugin marketplace add shawn-sandy/gleaner
/plugin install gleaner@shawn-sandy
```

In the Claude app or Cowork, open **Customize → Plugins**, choose **Add → Add
marketplace**, enter `shawn-sandy/gleaner`, and install **Gleaner**. For
ChatGPT, see the README's
[ChatGPT marketplace](https://github.com/shawn-sandy/gleaner#chatgpt-marketplace)
section. The source is on [GitHub](https://github.com/shawn-sandy/gleaner).
