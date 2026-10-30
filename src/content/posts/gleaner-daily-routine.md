---
title: 'A day with Gleaner: a quick guide to your daily reading routine'
pubDate: 2026-10-29
description: 'A five-minute guide to fitting Gleaner into your workday: set it up once, then save, collect, follow up, and review with a few plain phrases. Written for Gleaner 2.12.5.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'claude-code', 'chatgpt', 'plugins']
publish: true
---

Keep what you read without adding another app to your day. Say what you want
in plain words, and Gleaner writes a short, tagged clip. Here's one workday with
it, for Gleaner 2.12.5.

## Once: pick where clips go

Run `/gleaner:preferences setup`, or say "set up my save preferences."

By default, a clip comes back as a file in the chat, which a later search can't
find. Pick **Google Drive** or **Notion** instead, so every clip is stored and
searchable. You can still send one clip elsewhere with `--to`, such as
`--to local`.

More on this: [where should my clips go?](/posts/gleaner-where-clips-go)

New to Gleaner? [Install it](/#install) first.

## Morning: clear your tabs

> save this page, for the onboarding rewrite

The words after the comma become the clip's **note**, which is how you'll find
it later. Got links instead of tabs? Say `save https://…`.

## While you work: keep just the good parts

> grab the part about animation lengths
>
> and this table too
>
> done

Parts can come from different tabs. Keep the same conversation open until you
say "done." After Claude answers a question about the page, say **"save that"**
to keep the answer.

More on this: [save the good parts, not the whole page](/posts/gleaner-save-good-parts).

## Lunch: save the talk

> save this video
>
> keep 3:10 to 5:40

You get a summary whose key moments link to the exact second. Clipping a time
range needs the transcript, which Gleaner reads best in your own Chrome. See
[what the YouTube skill can't do](/posts/youtube-skill-constraints) for the
workarounds.

## Afternoon: decide what's next

> what should I follow up on?

Gleaner suggests three next steps from the clip and saves them to it. Pick one,
and it starts on it.

## End of day: look back

> show my clips from this week
>
> what did I save about Cowork?

You get a table of what you kept, newest first. On Fridays, say **"make me an
index sheet"** for a spreadsheet snapshot.

More on this: [find anything you saved](/posts/gleaner-find-saved-clips).

## The routine at a glance

| When      | Say                              |
| --------- | -------------------------------- |
| Once      | "set up my save preferences"     |
| Morning   | "save this page, for …"          |
| Working   | "grab the part about …" · "done" |
| Lunch     | "save this video"                |
| Afternoon | "what should I follow up on?"    |
| Evening   | "show my clips from this week"   |

Want every phrase and option? See the
[phrase cheat sheet](https://github.com/shawn-sandy/gleaner#phrase-cheat-sheet).
