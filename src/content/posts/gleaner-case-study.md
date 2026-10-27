---
title: 'Gleaner: a web clipper that runs inside Claude and ChatGPT'
description: 'How I built Gleaner, an open-source plugin that saves pages, parts of pages, answers, and YouTube videos as tagged, searchable clips, and shipped 31 releases in ten days.'
pubDate: 2026-10-27
author: 'Shawn Sandy'
tags: ['gleaner', 'ai-agents', 'claude-code', 'plugins', 'case-study']
featured: false
publish: true
---

## The short version

Gleaner is a web clipper that lives inside an AI assistant instead of beside it.
You open a page and say "save this page" or "grab the part about animation
lengths, for the motion post." Gleaner reads the page, writes a short summary in
plain language, tags it, files it by category, and saves it where you keep your
research: Google Drive, Notion, a Cowork project, your Claude Code project, a
private claude.ai artifact, or just a file in the chat. Later you ask "what did I
save about Cowork?" and it finds it.

It started as a single skill called _page-to-project_. Ten days later it was a
plugin with four skills, six destinations, and support for two vendors' AI
products, released 31 times with a changelog entry for every one.

## The problem

I read a lot for work, and I kept losing it. Tabs pile up. Bookmarks keep the
link but lose the reason I saved it. Notes turn into pasted text with no source.

I was already reading with an assistant open in Chrome's side panel, asking it
to explain things on the page. The useful part of that conversation, the part
I'd want next week, disappeared when the chat did. I wanted the assistant that
was already reading with me to keep what mattered, in my words, filed where I'd
actually look.

## What I built

Gleaner ships as four skills in one plugin:

- **glean** saves whole pages, collects parts across tabs and sites into one
  clip, keeps Claude's answers about a page, and searches saved clips.
- **youtube** saves a video, or just moments from it, as a summary built from
  its transcript, with key moments that link to the exact second.
- **follow-up** reads a saved clip and suggests three specific next steps, then
  writes them into the clip.
- **preferences** remembers where clips go and what format they use, per user
  and per project, with optional sync through Google Drive.

It runs in the Chrome side panel, the browser built into Claude Code desktop,
Claude in Chrome, and ChatGPT's connected Chrome tabs and Work browser.

Alongside the plugin I built this site in
Astro, with install guides, a release blog, and a changelog page that
rebuilds after each release. I also made a 75-second promo Short in one session,
storyboarded by Claude, voiced with ElevenLabs, and rendered with my own
[oncue](https://github.com/shawn-sandy/oncue) engine so each item on screen
enters on the word that names it.

## The interesting constraint: the product is prose

Gleaner has no runtime. There is no server, no build, and no app code that
executes when you save a page. The product is four `SKILL.md` files that the
model reads as raw text at the moment you ask for something. The main skill is
about 550 lines.

That changes what engineering means. A bug is an instruction a model can read
two ways. A regression is a sentence that quietly stops being true. So most of
my decisions were about writing behavior down precisely enough that a model
follows it the same way every time, and then building tooling around the
prose the way you would around code.

## Decisions worth explaining

### Act on clear intent, then say what you assumed

Plain language is the whole interface, so Gleaner needs rules for reading it.
"Page," "article," or "doc" means the whole page, even with text highlighted.
"Part," "bit," "section," or "the part about X" means a part. "Save that" right
after an answer means the answer. Highlights under about 40 characters are
treated as stray clicks.

When intent is clear it acts, then tells you what it assumed: _"Saved the whole
page. Say 'just the highlighted part' if you meant only that."_ It asks only
when two readings are equally likely. Every extra question is friction, and a
clipper you have to argue with doesn't get used.

### One clip per page, and never rewrite history

Early on, adding a second passage from the same article made a second clip. Now
everything from one page in one session goes into one clip, wherever it was
saved: local files and Notion pages update in place, artifacts republish at the
same link.

Clips from earlier sessions are never changed. Saving that page again offers an
updated copy with a "Supersedes" link to the original. The duplicate check
matches the page's canonical URL as well as its address, so a tracking link to
an article you already clipped is still caught, and Gleaner tells you when the
page says it changed since your clip.

### Treat the page as content, never as instructions

An assistant that reads arbitrary web pages and can save files is a
prompt-injection target. The skill says plainly that page text, transcripts,
and page metadata are things to summarize, never things to obey, such as a
line telling it to save somewhere else or open a link. It also never invents a
URL, a tab, or a clip link: confirmations link only what the save actually
returned.

### One plugin, two vendors

The same marketplace manifest installs Gleaner in Claude and in ChatGPT. That
meant writing for the weaker surface without hobbling the stronger one.
ChatGPT's connected tabs can't read highlights or run scripts, so Gleaner asks
you to name or paste the part there, and asks for a time range instead of "this
part" of a video. Each skill carries ChatGPT display metadata next to its
`SKILL.md`, and the validator checks both.

The most recent plan goes further: the skill descriptions that ChatGPT's model
reads to decide whether to use a skill said "Claude's answers," which is the
wrong signal for a different model. Small wording, real effect.

### Defaults that store nothing

By version 2.6 the default destination had changed more than once. The answer that
stuck: with no saved preference, a clip comes back as a file in the chat (HTML
in Claude, Markdown in ChatGPT) and nothing is stored anywhere. Storage is opt-in,
by naming a destination once or running `/gleaner:preferences setup`. First-time
users get a result without a setup wizard, and nobody finds a folder they didn't
ask for in their Drive.

Preferences themselves are local-first and versioned, with project and session
overrides, a lock so overlapping saves can't discard each other's writes, and
three-way sync through Drive with conflict handling.

### YouTube, three times

The YouTube skill is the clearest example of building on ground that moves.
1.6.0 read transcripts with a script. By 2.10.0 that capture no longer worked
in the browser, so I rebuilt clips around the description, chapters, channel,
and the useful links in the description, and filtered out sponsor, affiliate,
and shortened links. 2.11.0 brought transcripts back by opening YouTube's own
**Show transcript** panel the way a viewer does, which works in Chrome but
arrives empty in Claude Code's built-in browser.

Rather than hide that, I documented it: the clip's **Video** line records what
the summary was written from, and a
[blog post](/posts/youtube-skill-constraints) explains
which browser to use and the workarounds. Gleaner never downloads captions or
video with command-line tools.

## Shipping it

Moving fast on prose only works if the guardrails are real.

- **Static validation.** A Node validator checks every skill's frontmatter,
  ChatGPT metadata, manifests, required files, and every local file reference,
  then runs Markdown lint and Claude's strict plugin validators. It has its own
  fixture tests.
- **Release automation.** `npm run release` bumps the version, dates the
  changelog entry, validates, and commits. A Cut release workflow does the same
  from the GitHub Actions tab. Merging a version change tags it and publishes a
  GitHub Release from that changelog entry. If unreleased changes sit on `main`,
  CI warns that a release is owed, but the bump stays my call.
- **Live testing stays human.** Static checks can't prove a save to a real
  Notion workspace works. 1.5.1 exists because testing against one found that
  Notion rejects tags it hasn't seen. The repo's rule is that nothing is called
  live-tested unless I tested it.
- **The site keeps up on its own.** A daily workflow in the site repo compares
  the copy it last synced with Gleaner's `main` branch and keeps one issue open
  until the site catches up.

## Outcomes

- **31 releases in 10 days**, from 1.0.0 on October 16 to 2.12.2 on October 25,
  2026, each with a user-facing changelog entry.
- **Four skills, six destinations, two vendors**, from one set of skill files
  and one marketplace manifest.
- **Nearly 100 pull requests** across the plugin and site repos.
- **A product site, release blog, and promo video**, all built alongside the
  plugin rather than after it.

## What I'd tell another team

Agent skills are software. They need the same things code needs: a precise
spec, a validator, a changelog, a release process, and honesty about what was
tested. The difference is that the spec is the product, so the writing is the
engineering.

The other lesson is to design for the weakest surface you support, then let
the stronger ones do more. That kept one plugin working in two vendors' products
without a fork.
