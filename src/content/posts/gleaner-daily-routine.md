---
title: 'A day with Gleaner: a user guide for your daily reading routine'
pubDate: 2026-10-29
description: 'A practical guide to fitting Gleaner into an ordinary workday, from a one-time setup to morning tabs, parts and answers while you work, a video at lunch, and a five-minute review at the end of the day. Written for Gleaner 2.12.5.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'claude-code', 'chatgpt', 'plugins']
publish: true
---

Most of what you read in a day is gone by the evening. Gleaner is built to fix
that without adding a new app to your day: you keep reading where you already
read, say what you want to keep in plain words, and Gleaner writes a short,
tagged clip of it. This guide walks through one ordinary workday and shows where
Gleaner fits at each point.

It covers Gleaner 2.12.5. Every phrase below is something you can type as is;
none of them are commands you need to memorize.

## Before day one: set it up once

You need Gleaner installed in the Claude Chrome side panel, Claude Code, or
ChatGPT. The [install steps](/#install) and the [requirements](/#requirements)
are on the homepage.

Then spend two minutes on the one choice that makes a daily habit work: **where
your clips are stored.** Out of the box, Gleaner hands each clip to you in the
chat, as an HTML file in Claude or a Markdown file in ChatGPT. That's fine for a
one-off, but a clip in the chat isn't stored anywhere, so tomorrow's search
can't find it. Pick a home for your clips instead:

```text
/gleaner:preferences setup
```

Or ask in plain words, such as "set up my save preferences."

| If you mostly...                        | Store clips in   | You need                                   |
| --------------------------------------- | ---------------- | ------------------------------------------ |
| want them searchable from anywhere      | **Google Drive** | the Google Drive connector                 |
| like filtering and sorting in a table   | **Notion**       | the Notion connector                       |
| work in a Claude Code project           | **This project** | a Claude Code session                      |
| run Cowork projects on the desktop app  | **Cowork**       | the Claude desktop app, open and connected |
| want a private page you can share later | **Artifact**     | a session that publishes artifacts         |

Setup can also sync your preferences through one Google Drive document, so your
laptop and desktop save to the same place. You can always override the default
for a single save, such as "save this to Notion" or `--to drive`.

**Tip:** Drive and Notion make the best daily default. Both are searchable
outside Gleaner too: type a tag like `#motion` into Drive's search bar, or
filter the Notion database by tag.

## Morning: clear your tabs with a reason

Start with the tabs you opened yesterday and never read. For each one worth
keeping, say so and add why:

> save this page, for the onboarding rewrite
>
> keep this article, good intro to view transitions

The part after the comma becomes the clip's **note**. Notes are searchable and
show up in your clip index, so they are how you'll find things later. Gleaner
never writes a note for you, so a clip without one simply has none.

Have links from a newsletter or a chat thread instead of open tabs? Hand them
over directly:

> `save https://example.com/article`

Gleaner opens or fetches the page and writes a plain-language summary of up to about 400 words:
a TL;DR, key points (or numbered Steps for a tutorial), notable details, and
takeaways. It files the clip under one
category, gives it a type, and adds 3 to 6 tags, reusing the spellings you've
already used.

If you clipped the same page in an earlier session, Gleaner shows you the
earlier clip and offers an updated copy or a skip, so morning catch-up never
fills your library with duplicates.

## While you work: keep only the parts that matter

Most pages aren't worth a whole clip. When only a section matters, collect
parts and save them together:

> grab the part about animation lengths
>
> and this table too
>
> done

Highlight text and say "add this," or describe the part and let Gleaner find it.
Each part is confirmed with its first few words before anything is saved. Parts
can come from different tabs and sites: switch tabs, add, switch again, and say
"done" once. Keep the same conversation open while you collect, because unsaved
parts live in the conversation.

When you ask Claude something about the page you're reading, keep the answer
too:

> how do I rotate an API key in these docs?
>
> save that

Answers are kept as given, so numbered steps and code survive. Anything that
didn't come from the page is marked "(not from the page)," so a clip never
passes off background knowledge as the source's.

**Tip:** add a reason to parts as well, such as "grab the part about easing, for
the motion post." The note sits on that part.

## Lunch: save the talk you won't finish

A conference talk or a tutorial is a good lunch read, and rarely a good lunch
watch. Save it and come back to the moments that matter:

> save this video, for the team demo
>
> keep 3:10 to 5:40

Gleaner reads the transcript from YouTube's **Show transcript** panel when the
browser allows it, and writes a summary. When it has transcript lines or the
video's chapters, the summary lists **key moments** that each link to the exact
second. It also keeps the description's useful links, such as docs
and repos.

Transcripts are easiest in your own Chrome: the Chrome side panel or Claude in
Chrome. In Claude Code's built-in browser without Claude in Chrome, the clip
comes from the description and chapters; paste the transcript for a fuller
summary. A time range such as "keep 3:10 to 5:40" needs the transcript too:
without one, Gleaner asks you to paste it and offers a clip of the whole video
instead. On a phone in ChatGPT, if Gleaner can't read the video, it asks before
saving: paste a description or transcript, or say "save link only" and finish
it at a desk. [What Gleaner's YouTube skill can't do](/posts/youtube-skill-constraints)
has the workaround for each case.

## Late afternoon: turn a clip into a next step

A clip is only useful if it leads somewhere. Right after a save, or for any clip
you name, ask:

> what should I follow up on?
>
> suggest follow-ups for my view transitions clip

Gleaner reads the clip's TL;DR, your note, and the links inside it, and
suggests three next steps tied to them, such as reading a linked page or moving
the post your note mentions forward. It saves them to the clip under a dated
**Follow-ups** heading. Pick one, and Gleaner starts on it.

Every clip also ends with a ready-made prompt. Paste it into a new chat on any
day to get follow-ups for a stored clip, even from a different session. A clip
you only got in the chat isn't stored anywhere, so its prompt asks you to attach
or paste the file. And when a clip has too little to go on, Gleaner asks what
you want instead of guessing.

## End of day: a five-minute review

Before you close the laptop, look back at what you kept:

> show my clips from this week
>
> what did I save about Cowork?
>
> show my #prompting clips

You get a table, newest first, with each clip's date, linked title, category,
type, tags, note, and source. Keyword searches match titles, tags, notes, and
summary text. Use it to drop anything that no longer matters, and to pick
tomorrow's follow-up.

On Friday, take a snapshot of the whole library if you share it with a team or
want to sort it in a spreadsheet:

> make me an index sheet

That creates a Google Sheet named `Clip Index <date>` in your Browser Research
folder in Drive. If your Drive connector can't make Sheets, as in ChatGPT, you
get a `.csv` file instead. Either way it's a snapshot, so ask for a fresh one
whenever you need it. If you store clips in Notion, the database is
already a live index, and Gleaner links it first.

## The routine at a glance

| When           | Say something like                             | You get                               |
| -------------- | ---------------------------------------------- | ------------------------------------- |
| Once           | "set up my save preferences"                   | a default home for every clip         |
| Morning        | "save this page, for the onboarding rewrite"   | a tagged summary with your reason     |
| While working  | "grab the part about X" · "save that" · "done" | one clip of the parts that mattered   |
| Lunch          | "save this video" · "keep 3:10 to 5:40"        | key moments linked to the second      |
| Late afternoon | "what should I follow up on?"                  | three next steps, saved to the clip   |
| End of day     | "show my clips from this week"                 | a searchable table of what you kept   |
| Friday         | "make me an index sheet"                       | a spreadsheet snapshot of the library |

## Small habits that pay off

- **Always add a reason.** ", for the motion post" costs three seconds and is
  what makes a clip findable in a month.
- **Name your tags when they matter.** "tag it motion and css" keeps the
  spelling you want, and Gleaner reuses it from then on.
- **Use `--to` for one-offs.** Keep your daily default, and send a single clip
  elsewhere with `--to notion`, `--to local`, or a named Drive folder such as
  `--to drive:"Research"`.
- **Save in the conversation you collected in.** While you're collecting parts,
  they live in the conversation until you say "done," and so does an answer you
  add to them. A plain "save that" right after an answer saves it at once.
- **Trust the follow-up prompt.** It's the quickest way back to a clip from a
  new session.

For every phrase and option, see the
[usage guide in the Gleaner README](https://github.com/shawn-sandy/gleaner#usage-guide)
and its [phrase cheat sheet](https://github.com/shawn-sandy/gleaner#phrase-cheat-sheet).
