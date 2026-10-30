---
title: "Manage Calendar Alarms with Claude or ChatGPT via MCP"
description: "Ask which calendar alarms will ring or change their settings through Always On Time's optional MCP connector for Claude and ChatGPT."
slug: "calendar-alarms-claude-chatgpt-mcp"
date: "2026-10-30"
updated: "2026-10-30"
app: "always-on-time"
kind: "guide"
faq:
  - q: "Can Claude or ChatGPT manage my calendar alarms?"
    a: "Yes. Always On Time's optional MCP connector lets a connected assistant check upcoming alarms and change the app's alarm settings. It does not create or edit calendar events."
  - q: "Does the assistant need to be connected when an alarm rings?"
    a: "No. Your phone schedules and rings the alarms. The assistant connection is for checking and changing settings, not for delivering the alarm at trigger time."
  - q: "Is the Always On Time MCP connector free?"
    a: "The connector is free in Always On Time and does not need Plus. Your assistant's own plan determines whether you can add custom connectors."
  - q: "What calendar information does the connector share?"
    a: "While connected on Android, it shares a copy of upcoming event titles, times, calendar names and alarm settings for the next 30 days. It does not share event descriptions, attendees, locations, meeting links or travel places. Information an assistant reads is sent to its provider."
sources:
  - title: "Always On Time: assistant connector setup, capabilities and privacy"
    url: "https://zombit.io/always-on-time/assistants/"
    accessed: "2026-10-30"
  - title: "Always On Time privacy policy: connected assistants"
    url: "https://zombit.io/always-on-time/privacy/#assistants"
    accessed: "2026-10-30"
---

You can ask Claude or ChatGPT which Always On Time alarms will ring, adjust a meeting's alarm or pause alarms for a while. The app's optional MCP connector gives the assistant access to alarm information and settings. Your phone still schedules and rings the alarms.

We make Always On Time. This guide describes its Android connector, which is free and does not require Always On Time Plus. Whether you can add a custom connector depends on your assistant's own plan.

## What would you ask it?

The connection is useful when you already have an assistant open and want to check or adjust your alarms without finding each setting on your phone. For example:

- “What rings tomorrow morning?”
- “Make my 3pm ring 15 minutes earlier.”
- “Pause alarms until Monday.”

The assistant can explain why an event has an alarm, change settings for an event or recurring series, and adjust a whole calendar's alarm settings. It can also undo one of its own changes, subject to the limits in the [connector guide](/always-on-time/assistants/#changes).

## Connect it once

MCP stands for Model Context Protocol. Here, it is the connection an assistant uses to work with Always On Time.

You need the Android app installed and Google account sync turned on under **Settings > Account & sync**. Add the connector to your assistant, then sign in with the same Google account you use in the app and review the requested access.

The [step-by-step setup page](/always-on-time/assistants/) has the connector address, instructions for Claude and ChatGPT, and the first connection test.

## Alarm settings, not calendar editing

The connector cannot create, move or delete calendar events. If you want to reschedule the meeting itself, use your calendar app or a separate calendar connector.

It also cannot change sounds, voices or Android permissions. Those controls stay in Always On Time on your phone. For spoken alarms, flashing alerts and easier dismiss controls, see the [Android accessibility guide](/blog/accessible-calendar-alarms-android/).

If your phone is offline when an assistant changes a setting, the change waits in your account until the phone next syncs. Ask it to confirm the change reached your phone before relying on it for an upcoming meeting.

## Know what you are sharing

While an assistant is connected, the Android app shares a copy of upcoming event titles, start and end times, calendar names and alarm settings for the next 30 days. It leaves out descriptions, attendees, locations, meeting links and travel places.

Open **Settings > Connected assistants > See what your assistant can see** to inspect that copy. Information the assistant reads goes to its provider, such as Anthropic or OpenAI, under that provider's privacy policy.

Changes appear in **Settings > Connected assistants > Activity**. Activity stays for 30 days; a change can be undone if those settings have not changed since. The connector instructs assistants to check with you before changes that could stop or quiet alarms, unless you asked for that exact change.

You can disconnect in the app at any time. Disconnecting the last assistant deletes the shared copy and change log. Your phone's alarms keep working. The [privacy policy](/always-on-time/privacy/#assistants) has the full details.

[Get Always On Time on Google Play](https://play.google.com/store/apps/details?id=com.zombitstudios.alwaysontime), or [open the connector setup guide](/always-on-time/assistants/) if you already use the app.
