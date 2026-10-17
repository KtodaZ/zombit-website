---
title: "How to make Google Calendar events ring like an alarm"
description: "Placeholder post that exercises the blog pipeline: headings, lists, a table, FAQ, sources, and the related-app card. Not for publication; it stays a draft."
slug: "pipeline-test"
date: "2026-10-17"
updated: "2026-10-17"
app: "always-on-time"
kind: "guide"
draft: true
faq:
  - q: "Is this a real post?"
    a: "No. It is a placeholder that keeps the blog pipeline testable until real posts are approved."
  - q: "Will it ever be published?"
    a: "No. It is marked draft, so the production build leaves it out of every page, the feed, and the sitemap."
  - q: "Where do real posts go?"
    a: "Into src/content/blog/ as Markdown with the same frontmatter, once the owner approves them."
sources:
  - title: "Android developers: Schedule alarms"
    url: "https://developer.android.com/develop/background-work/services/alarms/schedule"
    accessed: "2026-10-17"
---

This is a placeholder. Answer-first posts open with the answer in two or three sentences, then
explain. A calendar notification is easy to miss; an alarm is not.

## Why notifications get missed

Notifications are quiet by design. They appear, chime once, and wait in the shade. If you are
deep in a task, that single chime can pass without you noticing.

- Sounds once, then stays silent
- Easy to dismiss without reading
- Hidden when the phone is face down

### A sub-section

Some **bold text**, some *emphasis*, `inline code`, and a [link to the app page](/always-on-time/).
An external link to [Android's alarm docs](https://developer.android.com/develop/background-work/services/alarms/schedule).

## A quick comparison

| Approach | Rings until dismissed | Works on lock screen | Join link |
| --- | --- | --- | --- |
| Calendar notification | No | Partly | No |
| Clock app alarm | Yes | Yes | No |
| Calendar alarm app | Yes | Yes | Yes |

## Steps

1. Install the app.
2. Choose which calendars it watches.
3. Grant the alarm and notification permissions.

> A quoted line, for completeness.
