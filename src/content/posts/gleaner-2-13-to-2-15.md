---
title: 'Gleaner 2.13 to 2.15: bookmarks, a clip list, and editable pages in ChatGPT'
pubDate: 2026-11-07
description: 'Gleaner updates through 2.15.10: bookmarks, clip lists, Further reading, full clips in chat, editable Pages in ChatGPT, the renamed marketplace, and more reliable page and video reads.'
author: 'Shawn Sandy'
tags: ['gleaner', 'chatgpt', 'claude-code', 'plugins', 'changelog']
publish: true
---

Gleaner went from 2.12.2 to 2.15.6 between October 27 and November 7, 2026,
after [the 2.12 post](/posts/gleaner-2-12). That is 18 releases, so this post
groups them by what you notice rather than walking through each one.

Updated November 9, 2026 to include the four releases through **2.15.10**.

Three changes matter most. Every save now shows the whole clip in the chat, on
every host. Clips now end with links to read next, when the page has good ones. And ChatGPT now saves
a new clip as a private page you can edit, unless you have chosen somewhere
else.

## Install or update

In Claude Code:

```text
/plugin marketplace add shawn-sandy/gleaner
/plugin install gleaner@gleaner
```

In the Claude app or Cowork, open **Customize → Plugins**, choose **Add → Add
marketplace**, enter `shawn-sandy/gleaner`, and install **Gleaner**. If a new
command does not show up after an update in Claude Code, run `/reload-plugins`.

The marketplace was renamed to `gleaner` in 2.15.8. Existing installs from
`shawn-sandy` need a reinstall; follow the
[migration steps](https://github.com/shawn-sandy/gleaner#upgrading-from-shawn-sandy-to-gleaner)
to keep your data.

## 2.15.7 to 2.15.10: installation and more reliable reads

- **2.15.7:** the optional Node bookmark renderer was removed. You don't need
  Node.js to use Gleaner; the plugin ships instructions, metadata, and icons.
- **2.15.8:** the Claude Code install ID is now `gleaner@gleaner`. The GitHub
  repository remains `shawn-sandy/gleaner`.
- **2.15.9:** video requests, including Shorts, go to the YouTube skill before
  ordinary page extraction, so video sourcing and transcript fallbacks apply.
- **2.15.10:** when a browser read fails, returns no text, or site access is
  declined, Gleaner tries one web fetch and says the clip was read without a
  browser. Sign-in pages, paywall notices, and bot checks are not saved as
  content. A cut-off response is marked partial and cannot replace a fuller
  existing clip.

## 2.15.5 and 2.15.6: editable Pages are ChatGPT's default

This is the change that moves where your clips go.

In 2.15.5, ChatGPT could save a clip as an editable Page if you asked: say
"save this clip as an editable ChatGPT Page", or add `--to page`. In 2.15.6,
that became what happens when you have not chosen anything else.

- **The default:** a ChatGPT save with no destination set makes a private
  editable Page. The whole clip still appears in the chat, and Gleaner adds a
  link to the Page after checking that it was created.
- **Your choices still win.** A destination you name, a saved preference, a
  clip you are updating, or a request for a raw file all come before the Page.
- **Edits are kept.** If you edit the Page and then add to the clip in the same
  conversation, Gleaner keeps your edits. Ask for the Page as Markdown, and the
  export includes them. Downloaded copies do not automatically stay in sync.
- **No Page tools?** If ChatGPT doesn't have them when you save, Gleaner says so
  and falls back to a Markdown file in the chat. It does this only for the
  built-in default.
- **If a write is refused or unclear,** Gleaner doesn't quietly save somewhere
  else. It says what happened and asks, or checks the same Page again before
  trying another save.

Claude doesn't change. You still get the clip in the chat with an HTML file.
Gleaner's notes list the installed plugin, Android, and live Claude checks as
release gates for this change.

Pages require the available create, read, and edit tools and access. `--to page`
applies to one save; Pages cannot be stored as a persistent destination preference.

## 2.14.0: the whole clip, on every host

Since 2.12.1, ChatGPT showed the whole clip in the conversation. Claude Code,
Cowork, and the Chrome side panel showed a short preview instead. 2.14.0 makes
them all the same: every save and update shows the full clip in the chat, even
when it was stored in Drive, Notion, a project folder, or an artifact.

- **Want less?** Say "short preview" for the old compact layout, or "no
  preview" for just the outcome. Either applies to that save only.
- **No file to attach?** Claude now shows the clip as rendered Markdown, as
  ChatGPT does, instead of one code block.
- **Storage and formats are unchanged.**

## 2.15.0: Further reading

Every clip now ends with a **Further reading** section: two to five links the
page itself points to, such as docs, repos, and related articles, each with a
few words on what it adds. If the page has nothing worth keeping, the section
is left out. A video clip's **Links** section is treated the same way.

These links carry `utm_source=gleaner`, so a site can see that the visit came
from a Gleaner clip. The **Source** link is left as it was.

## 2.14.1: a clip list

A clip you leave in the chat isn't stored, and clips stored in different places
are hard to see together. The optional clip list gives every clip you save one
row in a single place you choose:

| Where the list lives     | What Gleaner keeps there                                      |
| ------------------------ | ------------------------------------------------------------- |
| A Drive folder           | A Google Sheet named `Clip List` (needs the Sheets connector) |
| Notion                   | A separate `Clip List` database                               |
| A local or Cowork folder | A `Clip List.md` table                                        |

It stays off until you turn it on with `/gleaner:preferences setup` or "keep my
clip list in Notion". After that, every new clip, updated copy, chat clip, and
YouTube save adds a row: date, title, category, type, tags, note, source link,
clip link, and where it was saved. Say "don't list this" to skip one row, or
"stop my clip list" to turn it off. A row that can't be added never changes the
save itself. For Notion, setup asks before it creates the database, and creates
it only if you say yes.

## 2.13.0 and 2.13.1: bookmarks, and finding chats

**Bookmarks.** "Export my gleans as bookmarks" gives you a
`Gleaner Bookmarks <date>.html` file to import into Chrome, Firefox, Safari, or
Edge. Your clips land in a `Gleaner` folder with one subfolder per category.
Like the index sheet, it is a snapshot. The step-by-step is in
[Turn your clips into browser bookmarks](/posts/gleaner-export-bookmarks).

**Finding the chat.** Every save, update, and search now ends with one plain
line that tags the conversation, such as
`Gleaner clip · 2026-10-19 · Motion timing guidelines · …`. Where your host can
search past conversations (Claude Code desktop, or claude.ai with chat search
turned on), "what did I save about X?" can also find chats that hold a clip,
including clips you kept only in the chat. They are listed marked "(chat)". In
Claude Code desktop, a conversation that began with a Gleaner request is named
`Gleaner: <clip title>` after its first save. See
[Find anything you saved](/posts/gleaner-find-saved-clips).

## 2.13.2 to 2.13.4: YouTube reading, and fewer prompts

- **Playwright transcripts (2.13.2).** In Claude Code without Claude in Chrome,
  Gleaner can now read a YouTube transcript through the Playwright browser tools
  if the session has them. It opens the video in a new tab, reads the **Show
  transcript** panel, and closes the tab. Chrome is still the first choice.
- **Ads and the newer panel (2.13.2).** Gleaner waits for a YouTube ad to finish
  before opening the transcript panel, because a panel opened during an ad stays
  empty. It also reads YouTube's newer transcript panel, which some videos open
  instead of the classic one. Before, those videos were saved as if they had no
  transcript.
- **ChatGPT tries the other browser (2.13.3).** ChatGPT now checks which browser
  tools it has before reading a video, and tries an untried browser after a
  failed fetch before it asks you to paste text or save a link only.
- **Fewer permission prompts (2.13.4).** Preference sync and the Drive lookup
  run once per conversation, Drive saves combine their searches, and Notion
  saves reuse the database already found. A site approval lasts the conversation
  where the host allows it, and a declined prompt isn't asked again.

## 2.14.2: pasted links on a phone

When you give Gleaner a link from the Claude phone or web app, and the browser
is on your computer, it now reads the page with one web fetch instead of
opening Chrome or the built-in browser, which can ask you to approve each step.
It still opens the browser if the fetch can't read the page, or if you ask for
a highlight, the browser, or a video's transcript or part. A YouTube clip saved
this way is written from the video's description, and the confirmation says how
to get the transcript. In the built-in browser, a site approval is now
requested for the whole site instead of once, since a clip reads the page more
than once.

## 2.15.2 and 2.15.4: ChatGPT's clip index file, and previews after edits

- **A clip index file (2.15.2).** On request, ChatGPT can keep one persistent
  `Gleaner Clip Index.md` file, and update the same file when clips change. To
  use it across chats, add that to your ChatGPT project's instructions with the
  file's link. Adding it to the project's sources is still up to you. Claude's
  clip lists are unchanged. Persistent file tools are required to maintain one
  file; without them, Gleaner can provide a downloadable snapshot. Refreshing an
  uploaded project copy remains a manual step.
- **Previews after edits (2.15.4).** After every edit to a clip, ChatGPT shows
  the complete updated clip in the conversation, and fixes a missing preview
  there without making another file. A Markdown link is still a download, and
  the plugin can't change how the phone app opens it.

## Smaller changes

- **2.12.3:** a new clip's confirmation now starts with its title. A stored clip
  starts `Saved "<title>"`, an update starts `Updated "<title>"`, and a clip
  kept only in the chat starts `Here's "<title>"`. Skill descriptions are
  shorter.
- **2.12.4:** the plugin icon is now the square logo from this site, replacing
  the round one, including in ChatGPT.
- **2.12.5:** outside ChatGPT, a YouTube clip saved without a transcript because
  no Chrome was available ends by suggesting you save it again from the video's
  page in Chrome.
- **2.15.0, 2.15.1, and 2.15.3:** the plugin icon can show in Anthropic's plugin
  directory, the plugin and skill descriptions are capped at 500 characters and
  now name "glean" and "glean it" as ways to ask, and YouTube, Preferences, and
  Follow-up get the same icons as Glean.

## Also new: prompt examples

No release, but the README now has a **Prompt examples** section with tables of
ready-to-use requests: saving pages, passages, and videos; saving answers and
whole conversations; and choosing destinations, updating clips, and finding
them. A new **Reading saved clips on ChatGPT mobile** section explains what you
see on a phone: the formatted clip in the chat, and a separate download link.
For a session clip, Gleaner saves only the messages it can actually read. It
won't rebuild earlier ones from memory.

## Where Gleaner stands at 2.15.10

- **Four skills:** `glean`, `youtube`, `preferences`, and `follow-up`.
- **In the chat by default:** the whole clip, on every host. Claude adds an
  HTML file. ChatGPT also makes a private editable Page and links to it, or
  gives a Markdown file if Page tools are missing.
- **Every clip** ends with Further reading links when the page has good ones.
- **Places to store a clip:** a private editable Page in ChatGPT (its default),
  plus Google Drive, Notion, a Cowork project, your Claude Code project, and a
  private claude.ai artifact. An optional clip list
  keeps a row for each clip, wherever it went.
- **Getting them out:** an index sheet, a browser bookmarks file, and, in
  ChatGPT, a clip index file.
- **Where it runs:** the Claude Chrome side panel, Claude Code's built-in
  browser, Claude in Chrome, and ChatGPT's connected Chrome tabs and Work
  browser.

Several of these have a step-by-step guide:
[where clips go](/posts/gleaner-where-clips-go),
[ChatGPT and your phone](/posts/gleaner-chatgpt-phone), and
[clipping a video](/posts/gleaner-clip-video). The phone guide was written for an
earlier release. Where it calls the chat, or a Markdown download, ChatGPT's
default, a ChatGPT save now makes an editable Page unless you choose
otherwise. Every published release, with its
notes, is on the [changelog](/changelog). The source is on
[GitHub](https://github.com/shawn-sandy/gleaner/blob/f99782493e368b8887591109beb90cffa3aa572c/README.md).
