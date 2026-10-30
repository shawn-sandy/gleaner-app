---
title: 'Turn your Gleaner clips into browser bookmarks'
pubDate: 2026-10-30
description: 'One phrase gives you a bookmarks file for Chrome, Firefox, Safari, or Edge, with a folder per category. What goes in the file, what each browser keeps, what gets left out, and how to import it. Written for Gleaner 2.13.1.'
author: 'Shawn Sandy'
tags: ['gleaner', 'guide', 'plugins']
publish: true
---

Your clips live in Drive, Notion, or a project folder. Your browser's bookmarks
bar is where you spend the day. Since Gleaner 2.13.0, one phrase connects the
two. This is the bookmarks half of "take your clips with you" from
[find anything you saved](/posts/gleaner-find-saved-clips), in more detail.
Written for Gleaner 2.13.1.

## Just ask

> export my gleans as bookmarks
>
> make me a bookmark list

You get a file called `Gleaner Bookmarks <date>.html`, in Claude and ChatGPT
alike. It arrives in the chat as a download where the app can attach one. Where
it can't, the file comes as a code block: copy it into a text editor and save it
under that name. Gleaner won't upload it to Drive or write it into your project
unless you ask.

One thing to watch: "bookmark this page" still saves the page as a clip. The
export phrase has "export" or "list" in it.

## What's in the file

It's the bookmarks format every browser imports, so what you see after
importing is what's in the file:

- **A `Gleaner` folder**, with one subfolder per category, such as
  `Design Engineering` or `AI & Agents`.
- **One bookmark per clip.** It opens the page you clipped. An answer saved
  without a page opens the clip itself.
- **The clip's saved date** as the bookmark's date, so sorting by date added
  groups them by the day you saved them.
- **The clip's tags**, without the `#`.
- **Your note and a link back to the clip**, in the bookmark's description.

## Export some of them

Any filter a search takes works here too:

> export my #motion clips as bookmarks
>
> export this week's clips as bookmarks

## Import it

Every browser can import a bookmarks HTML file:

- **Chrome**: at the top right, **More**, then **Bookmarks and lists**, then
  **Import bookmarks and settings**, and choose the file. If you already have
  bookmarks, the import lands under **Other bookmarks**.
- **Firefox**: Manage bookmarks, then **Import and Backup**, then **Import
  Bookmarks from HTML**.
- **Safari**: **File**, then **Import Browsing Data from File or Folder**, and
  choose the file.
- **Edge**: Settings, then **Import browser data**, from a favorites or
  bookmarks HTML file.

## What your browser keeps

Browsers agree on folders, titles, links, and dates. They don't agree on the
rest:

- **Tags**: Chrome has no bookmark tags, so it drops them.
- **Notes and clip links** sit in each bookmark's description line, which
  browsers may not keep on import.

So treat the bookmarks as a way to open pages. Your note and summary live in
the clip, and a search still finds them there.

## What's left out

- **A clip with nothing to open.** A clip with no web link, such as an answer
  without a page saved only to a local folder, is skipped. Gleaner says how
  many it left out and why.
- **Clips kept only in a chat.** Where your app searches past conversations, a
  search can point you to that chat, but Gleaner's README says a clip kept only
  in a past conversation can't go in the file. To make a clip exportable, save
  it somewhere stored. See
  [where should my clips go?](/posts/gleaner-where-clips-go)
- **Nothing to export** means no file, and Gleaner says so.

## It's a snapshot

Like the index sheet, the file is a picture of your clips at one moment. Clips
you save later aren't in it, and importing a newer file won't update the
bookmarks you imported before. It adds a second set. To swap in a fresh one,
delete the old `Gleaner` folder in your browser first, then import.

If you save to Notion, the database is already a live index that updates
itself. The bookmarks file is for the browser bar; the index sheet is for rows
you can sort and filter.

## Quick reference

| To…                     | Say                                     |
| ----------------------- | --------------------------------------- |
| Export every clip       | "export my gleans as bookmarks"         |
| Export one tag          | "export my #… clips as bookmarks"       |
| Export recent clips     | "export this week's clips as bookmarks" |
| Get rows instead        | "make me an index sheet"                |
| Save a page, not export | "bookmark this page"                    |

For the full rules, see
[bookmarks file](https://github.com/shawn-sandy/gleaner#bookmarks-file) in the
README.
