---
title: 'From clip to next step'
pubDate: 2026-10-31
description: 'Ask Gleaner what to do with a clip and get three next steps tied to its note, takeaways, and links, saved to the clip. The phrases, what lands in the clip, and how to pick a clip up again later. Written for Gleaner 2.13.1.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'plugins']
publish: true
---

A clip is only useful if you do something with it. Gleaner can suggest what that
is. This is the afternoon step of
[a day with Gleaner](/posts/gleaner-daily-routine), in more detail. Written for
Gleaner 2.13.1.

## Ask for next steps

Right after a save, say:

> what should I follow up on?

Or point at any saved clip by topic, link, or file path:

> suggest follow-ups for my view transitions clip

In Claude Code, `/gleaner:follow-up` does the same.

## What you get

Three next steps, each tied to something in the clip:

- read a page the clip links to
- move forward the post or project your note mentions
- compare it with other clips that share its tags

Your note counts most. A clip saved "for the motion post" gets at least one step
that moves that post along. That's a good reason to add a note when you save.

Pick one by number, and Gleaner starts on it in the same chat:

> do 2

## Where they're saved

The three steps go into the clip, under a dated **Follow-ups** heading after its
Takeaways. Ask again later and a new dated list is added below; earlier ones
stay as they were.

A clip from an earlier session is never edited. You get an updated copy that
links back to the original, and later follow-ups go into that copy.

## Come back to it later

Every clip ends with a ready-made line below a divider. Paste it into a new chat
to get follow-ups:

> To get follow-ups, paste this into a new chat: …

It names the clip and where it's stored, so Gleaner can find it. A clip kept in
the chat isn't stored anywhere, so its line asks you to attach or paste the clip
instead. Clips saved in your Claude Code project also get a terminal command
that starts Claude Code with the prompt.

## Hand it to another skill

If your session has a skill that writes something new from a page or video,
such as a blog post or newsletter piece, one of the three steps may hand the
clip to it, starting from the clip's source, summary, key moments, and links.
Gleaner only suggests a skill your session actually lists.

## When it doesn't go to plan

- **It asked a question instead.** The clip had too little to go on, such as no
  note and no links. Say what you want: go deeper, use it in something, or find
  related clips.
- **"Isn't stored anywhere."** A clip kept in the chat can't be read from a
  later session. Where your app can search past chats, a search can point you
  back to it, but a follow-up still needs the file. Download it, or save it
  somewhere stored. See
  [where should my clips go?](/posts/gleaner-where-clips-go)
- **Not a Gleaner clip.** You still get suggestions, but nothing is saved.
  Gleaner offers to save the page as a clip first.

For every detail, see
[following up on a clip](https://github.com/shawn-sandy/gleaner#following-up-on-a-clip)
in the README.
