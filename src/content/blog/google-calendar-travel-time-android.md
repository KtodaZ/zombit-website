---
title: "Google Calendar Travel Time on Android: Get Time-to-Leave Alarms"
description: "Google Calendar won't add travel time automatically. Here's how to get leave-on-time alerts on Android with buffers, Waze, or a travel-time alarm."
slug: "google-calendar-travel-time-android"
date: "2026-10-17"
updated: "2026-10-17"
app: "always-on-time"
kind: "guide"
faq:
  - q: "Does Google Calendar add travel time automatically?"
    a: "No. Google Calendar's Android notification settings cover when and how you're notified, not how long the trip takes. You can add travel time by hand, use Waze's calendar sync for driving, or use an app that plans the trip and rings when it's time to leave."
  - q: "How does Waze know when I should leave for a calendar event?"
    a: "After you connect your calendar in Waze's Plan a drive screen, Waze sends a time-to-leave notification based on live traffic. Each event needs a full street address, and Waze needs location access set to Allow all the time."
  - q: "Can I get leave-time alarms for public transit, biking or walking?"
    a: "Waze's reminders are for planned drives. Always On Time can plan driving, public transit, biking or walking trips for an event and, by default, ring 'Leave in 10 minutes' and 'Time to leave' alarms."
  - q: "Does a travel-time alarm need my location?"
    a: "In Always On Time, it's your choice. 'Use my places' plans trips from places you save, like Home and Work, and never uses your location. 'Use my location' plans from where you are and needs location access set to 'Allow all the time'."
sources:
  - title: "Google Calendar Help: Change your notifications (Android)"
    url: "https://support.google.com/calendar/answer/37242?hl=en&co=GENIE.Platform%3DAndroid"
    accessed: "2026-10-17"
  - title: "Waze Help: Sync your calendar with Waze"
    url: "https://support.google.com/waze/answer/6341187?hl=en"
    accessed: "2026-10-17"
  - title: "Waze Help: Get a reminder when it's time to leave"
    url: "https://support.google.com/waze/answer/7502125"
    accessed: "2026-10-17"
  - title: "How-To Geek (via Yahoo Tech): PSA: Google Maps Can Tell You When to Leave to Arrive on Time"
    url: "https://tech.yahoo.com/general/articles/psa-google-maps-tell-leave-140113327.html"
    accessed: "2026-10-17"
  - title: "Google Calendar Community: I can't set travel time in calendar"
    url: "https://support.google.com/calendar/thread/242500740/i-can%E2%80%99t-set-travel-time-in-calendar?hl=en"
    accessed: "2026-10-17"
  - title: "Google Play: Calendar Alarm: Always On Time"
    url: "https://play.google.com/store/apps/details?id=com.zombitstudios.alwaysontime&hl=en_US"
    accessed: "2026-10-17"
  - title: "Always On Time privacy policy: Travel-time alarms and location"
    url: "https://zombit.io/always-on-time/privacy/#travel-location"
    accessed: "2026-10-17"
draft: true
---

Google Calendar doesn't add travel time to your events automatically, and its Android notification settings have no "time to leave" option. A reminder 15 minutes before a dentist appointment is no help if the drive takes 25. You have three practical fixes: add travel time by hand, connect your calendar to Waze for traffic-based driving alerts, or use an app that plans the trip and rings an alarm when it's time to go.

Here's how each one works, and where each one falls short.

## Why a normal reminder isn't enough

A calendar reminder counts back from the start of the event. Getting there on time means counting back from when you need to leave. That gap changes with the place, the time of day, traffic, and whether you're coming from home or work. A fixed "30 minutes before" reminder is too early for a short trip and too late for a long one.

Two things help: a reminder based on the actual trip, and an alert that's hard to miss.

## Option 1: Add travel time by hand (free, no setup)

The simplest fix is to account for the trip yourself.

1. **Add an earlier notification to the event.** Open the event in Google Calendar, tap **Edit**, then **Add notification**, and set it for your travel time plus a few minutes of buffer.
2. **Or block the trip as its own event.** Create a "Drive to dentist" event that ends when the appointment starts. Its start time is your leave time, and its notification is your leave reminder.
3. **Check the trip in a maps app** when you add the event, so the estimate isn't a guess.

In Google's help community, the answer to the travel-time question is the same: there's no automatic option, so you pick a route and add the time yourself.

Some reports say Google can show a leave-time alert for events that have a location, but Google Calendar's help pages don't document it and there's no setting for it, so don't count on it.

**Limits:** it doesn't react to traffic, it's easy to forget, and the reminder is still an ordinary notification.

## Option 2: Waze calendar sync (free, driving only)

Waze can read your phone's calendar and send a "time to leave" notification based on live traffic. Per Waze Help, the setup on Android is:

1. Open Waze, tap the menu, then **Plan a drive**.
2. Tap **Connect calendar** and allow access.
3. Under **Plan a drive > Settings > Time to leave reminder**, choose **Early and Time to leave** (alerts 90 and 10 minutes before you should leave) or **Time to leave** (10 minutes before) only.
4. Set Waze's location permission to **Allow all the time**.

**What to watch for:**

- Each event needs a **full address** with street, house number and city. If Waze shows "Set address" next to an event, no reminder will be sent until you fix it.
- Waze uses your device's default calendar. Other calendars need to sync to it.
- It's built for **driving**: the reminders are for planned drives.
- The alert is a **notification**, so the earlier advice about Do Not Disturb and missed banners still applies.
- Waze Help says this feature isn't supported on Android Auto, Android Automotive or CarPlay.

**Pick this if** you mostly drive and already use Waze.

## Option 3: Travel-time alarms in Always On Time

Always On Time is our app. It turns calendar events into full-screen alarms, and it can also plan the trip to an event and ring when it's time to leave. By default, alarms show **"Leave in 10 minutes"** and then **"Time to leave"**, and the alarm screen has a Directions button.

### How to set it up

1. **Install Always On Time** from Google Play and finish the normal setup: choose your calendars and allow notifications, exact alarms and full-screen alerts.
2. **Turn on Plan time to leave.** It's under **Getting there** in Settings, and new users also see an optional Getting there step during setup.
3. **Choose where trips start.** "Use my location" plans from where you are. "Use my places" plans from places you save, such as Home, Work, School or Gym (up to eight), found by address search.
4. **Set a weekly schedule** if you use your places, such as at work 9 to 5 on weekdays and home otherwise. The trip to each event starts from the place you're scheduled to be.
5. **Choose how you travel:** Driving, Public transit, Biking or Walking. You can change it for one event on its **Getting there** card, and the change applies to every occurrence of a recurring event.
6. **Pick your buffer and alarm times.** "Arrive early" adds a cushion (5 minutes by default). The default leave alarms are 10 minutes before leaving plus one at the leave time, and you can change them.
7. **Make sure events have a real location.** Travel planning only applies to events with a physical address and no video-call link.

### What happens next

For events with an address coming up in the next few days, the app estimates the trip from your starting point, beginning the day before, and refreshes the estimate as the event gets closer. If a refresh fails, it usually keeps the existing plan rather than dropping it. While a trip is planned, the leave alarms take the place of your default "before the event" alarms, which come back if travel planning is turned off. **Directions** opens Google Maps with the destination and travel mode filled in.

For driving, **live traffic** lets the leave time move when roads are slow. Without it, driving estimates use typical traffic for that time of day. Live traffic is part of Always On Time Plus, which is free for a limited time right now.

### Things to know

- **Location is your choice.** With "Use my places," your location is never used. "Use my location" needs location access set to "Allow all the time," because leave times are planned while the app is closed.
- **Addresses go to route providers.** To estimate the trip, the event's location and your starting point are sent to TomTom or Google, and address search uses Google. The app's privacy policy explains this.
- **Online meetings are skipped.** Events with a Meet, Zoom, Teams or Webex link get normal alarms, not travel alarms.
- **Estimates aren't guarantees.** Road closures and late trains happen. A few minutes of "Arrive early" buffer is a good habit.

**Pick this if** you want a real alarm rather than a notification, or you travel by transit, bike or on foot.

## Quick comparison

| | Manual buffer | Waze calendar sync | Always On Time travel alarms |
|---|---|---|---|
| Cost | Free | Free | Free (live traffic via Plus, free for a limited time) |
| Uses live traffic | No | Yes | Yes, for driving with Plus |
| Travel modes | Any (you estimate) | Driving | Driving, transit, biking, walking |
| Alert type | Notification | Notification | Full-screen alarm |
| Needs a full address | No | Yes | Yes (a physical location) |
| Location access | None | Allow all the time | Not needed with saved places; Allow all the time to plan from your location |

## Tips that help whichever option you use

- **Put a full address in the event's location field**, not just "Dentist". Both Waze and Always On Time need it.
- **Leave a buffer for the last stretch**, like parking, building entrances, or finding the right room. Travel estimates stop at the door.
- **Keep video-call links in the event** for online meetings. Apps can then tell an online meeting from one you need to travel to.
- **Test once.** Add a test event with a real address a couple of hours from now and see what happens.

If you mainly need meetings to stop slipping past you, start with our guide to [making Google Calendar ring like an alarm on Android](/blog/google-calendar-alarm-android/).
