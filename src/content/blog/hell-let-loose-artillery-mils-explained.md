---
title: "Hell Let Loose Artillery Mils Explained, With Tables"
description: "How Hell Let Loose artillery mils work: distance-to-mils tables for US/Germany, Soviet and British guns, worked examples, common mistakes, and WARDOGS notes."
slug: "hell-let-loose-artillery-mils-explained"
date: "2026-10-17"
updated: "2026-10-17"
app: "artillery-calculator"
kind: "guide"
faq:
  - q: "How do you calculate artillery mils in Hell Let Loose?"
    a: "Measure the distance from your gun to the target on the map, then convert it with your faction's table. For US and German howitzers the table runs from 978 mils at 100 m to 622 mils at 1,600 m, about 23.7 mils per 100 m. Soviet and British guns use different numbers."
  - q: "Why does a higher mil number shoot shorter in Hell Let Loose?"
    a: "The stationary howitzers fire at a high angle. Past 45 degrees, raising the barrel sends the shell higher but not as far, so on these guns a bigger mil value lands closer to you and a smaller one lands farther away."
  - q: "Do Soviet and British guns use the same mils as US and German guns?"
    a: "No. US and German guns share one table (978 to 622 mils over 100 to 1,600 m). Soviet guns run from 1,120 to 800 mils and British guns from about 533 to 267 mils over the same distances, so using the wrong table misses badly."
  - q: "What is the range of Hell Let Loose artillery?"
    a: "Stationary howitzers cover 100 to 1,600 metres. Self-propelled artillery, added in Update 19, has shorter vehicle-specific ranges, roughly 100 to 800 metres depending on the vehicle."
  - q: "Is there an artillery calculator for WARDOGS?"
    a: "Yes. Artillery Let Loose covers the WARDOGS L81 Mortar from 132 to 684 m and the SPH-2 from 780 to 2,629 m, using community-measured firing tables."
sources:
  - title: "Milliradian (Wikipedia)"
    url: "https://en.wikipedia.org/wiki/Milliradian"
    accessed: "2026-10-17"
  - title: "Hell Let Loose on Steam"
    url: "https://store.steampowered.com/app/686810"
    accessed: "2026-10-17"
  - title: "Hell Let Loose Update 19 released as patch 1.050 (MP1st)"
    url: "https://mp1st.com/title-updates-and-patches/hell-let-loose-update-19-released-as-patch-1-050"
    accessed: "2026-10-17"
  - title: "Hell Let Loose: Vietnam on Steam"
    url: "https://store.steampowered.com/app/3079210"
    accessed: "2026-10-17"
  - title: "WARDOGS on Steam"
    url: "https://store.steampowered.com/app/1867240"
    accessed: "2026-10-17"
  - title: "Modification Tools & Overlays (Hell Let Loose Steam announcement thread)"
    url: "https://steamcommunity.com/app/686810/discussions/0/3823033163011381984/"
    accessed: "2026-10-17"
  - title: "apollyon-sys/wardogs-calculator (MIT-licensed WARDOGS firing tables)"
    url: "https://github.com/apollyon-sys/wardogs-calculator"
    accessed: "2026-10-17"
draft: true
---

In Hell Let Loose, artillery is aimed by setting the gun's elevation in mils. You measure the distance from your gun to the target, look up the mil value for that distance in your faction's table, and dial it in. For US and German howitzers that's 978 mils at 100 m down to 622 mils at 1,600 m; Soviet and British guns use different tables, which is where most misses come from.

This guide explains what mils are, gives the tables for each faction, walks through the mistakes that cost the most shells, and covers self-propelled guns, the Vietnam mortar and WARDOGS.

## What a mil is

A mil is a small unit of angle. Real-world artillery uses it because it scales neatly with distance: one milliradian covers about one metre at a range of one thousand metres. NATO divides a full circle into 6,400 mils.

You don't need the geometry to fire in Hell Let Loose. What matters is that each gun has a sight with a mil scale, and every distance maps to one setting on that scale. Learn your faction's table, or let a calculator hold it for you, and the rest is measuring distance well.

## Why bigger numbers land closer

The stationary howitzers fire high, lobbing shells at a steep angle. Above 45 degrees, raising the barrel sends the shell higher but not as far. So on these guns the table runs backwards from what new players expect: **a higher mil value lands closer to the gun, and a lower one lands farther away.**

If your first shell falls short, lower the number. If it flies long, raise it.

## Hell Let Loose artillery tables by faction

Each faction's gun has its own scale. The numbers below are the ones [Artillery Let Loose](/artillery-calculator/) uses for stationary howitzers. They match the community tables players built from the in-game sight. Each table is close to a straight line, so you can estimate between rows.

| Distance | US / Germany | Soviet | Britain / Canada |
|---|---|---|---|
| 100 m | 978 | 1120 | 533 |
| 200 m | 954 | 1099 | 516 |
| 400 m | 907 | 1056 | 480 |
| 500 m | 883 | 1035 | 462 |
| 800 m | 812 | 971 | 409 |
| 1000 m | 764 | 928 | 374 |
| 1200 m | 717 | 885 | 338 |
| 1600 m | 622 | 800 | 267 |

As formulas (d is distance in metres):

- **US / Germany:** mils = 1001.47 − 0.237 × d (about 23.7 mils per 100 m)
- **Soviet:** mils = 1120 − 21.33 × (d ÷ 100 − 1) (about 21.3 mils per 100 m)
- **Britain / Canada:** mils = 551 − 0.1775 × d (about 17.75 mils per 100 m)

A worked example: your US gun is 850 m from an enemy garrison. 1001.47 − (0.237 × 850) = 800, so dial 800. On a Soviet gun the same 850 m is about 960 mils, and on a British gun about 400.

## Self-propelled artillery is a different animal

Update 19 (December 2025) added self-propelled artillery (SPA) for every faction: the KV-2, Sherman M4A3 105, Sturmpanzer IV Brummbär, Churchill AVRE, Panzer III Ausf. N and Bishop SP 25pdr. Only the new Artillery Squad can use them. The same update cut static artillery to one buildable gun per team.

Two things catch people out with SPA:

- **Shorter ranges, per vehicle.** The ranges in our app run from 100–250 m for the Churchill AVRE to 100–800 m for the Bishop, with the others in between.
- **The scale runs the other way.** In the SPA tables our app uses, the number goes up as the distance goes up. Don't carry your howitzer habits over.

Because a tank can sit on a slope, vehicle tilt also matters. Artillery Let Loose lets you enter the vehicle's slope (−90° to +90°) alongside the distance and adjusts the elevation for it.

## Common mistakes that waste shells

1. **Using the wrong faction's table.** British numbers are roughly half the US/German ones. A US value dialled on a British gun misses completely. Check which faction you're playing every match.
2. **Measuring from the wrong spot.** Measure from your gun to the target, not from HQ or the centre of a grid square. With only one buildable gun per team now, the gun may not be where you're used to.
3. **Ignoring height.** The tables assume the target is level with you. A target on a hill or down in a valley needs a correction. Artillery Let Loose's terrain setting uses the standard approximation (height difference × 1000 ÷ distance) and says plainly that it's a strong estimate, not one fully validated in-game.
4. **Doing the maths in your head under fire.** 23.7 mils per 100 m is easy at a desk and easy to fumble mid-match. Small slips add up when you're walking fire onto a target.
5. **Mixing up SPA and the howitzer.** The tables point in opposite directions. Make sure the number you dial came from the right gun.
6. **Not walking your fire.** If a shell misses, adjust in small steps rather than re-measuring from scratch. A fixed step (say 25 m) toward or away from the gun is quick to apply and easy to track.

## The Vietnam mortar

Hell Let Loose: Vietnam came out on August 13, 2026, and it has a Mortar Squad. Artillery Let Loose includes a mortar mode for both sides (US and NVA) covering 100 to 450 metres. As with the howitzers, a lower number reaches farther.

## WARDOGS artillery

WARDOGS is a different game from BULKHEAD, in Steam Early Access since September 10, 2026. Its guns don't follow a simple straight-line formula, so Artillery Let Loose uses community-measured firing tables (adapted from the open-source apollyon-sys/wardogs-calculator project) and interpolates between them.

- **L81 Mortar:** 132 to 684 m, one mil solution.
- **SPH-2:** 780 to 2,629 m, with a high-arc solution across the whole range and a low-arc solution from 1,181 m.

Answers can appear as a small range (for example "742–748") because the measured tables are ranges, not single points. The tables assume flat ground, so park on level ground: vehicle tilt changes the range, especially between the two SPH-2 arcs. A good habit is to fire one ranging shot, see where it lands, and adjust from there.

## How a calculator helps

None of this is hard on paper. It's hard with tanks rolling toward your gun and your squad lead calling targets. A calculator removes the steps where mistakes creep in:

- **The right table every time.** Pick your faction or vehicle once, and every number comes from that gun's scale.
- **Speed.** Type the distance and read the mils straight away, on a large readout you can glance at mid-match. It also accepts a plugged-in USB or Bluetooth numpad.
- **Several targets at once.** History mode keeps a grid of labelled targets, colour-coded by range, so you can switch between fire missions without re-measuring. It's always on in the iPhone app; on Android it's a one-time purchase or a 24-hour unlock by watching an ad.
- **Walk buttons.** Optional − and + buttons step the distance by a set amount after each shot.
- **Terrain and slope.** Height and vehicle-tilt adjustments are built in where the game needs them.

A note on fair play: the Hell Let Loose team's pinned Steam post says tools or overlays that give "some players an unfair advantage" are "not condoned." Artillery Let Loose runs on your phone and never touches the game, but individual servers can set their own rules, so check yours if you're unsure.

Artillery Let Loose is free on Android (with ads) and $1.99 on iPhone, with no ads on iOS. [See the app](/artillery-calculator/) or join the Discord to report a number that looks off.

*Artillery Let Loose is an unofficial companion app, not affiliated with or endorsed by the developers or publishers of Hell Let Loose or WARDOGS.*
