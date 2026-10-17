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
    a: "Stationary howitzers cover 100 to 1,600 meters. Self-propelled artillery, added in Update 19, has shorter vehicle-specific ranges, from 100–250 m up to 100–800 m depending on the vehicle."
  - q: "Is there an artillery calculator for WARDOGS?"
    a: "Yes. Artillery Let Loose covers the WARDOGS L81 Mortar from 132 to 684 m and the SPH-2 from 780 to 2,629 m, using community-measured firing tables."
sources:
  - title: "Milliradian (Wikipedia)"
    url: "https://en.wikipedia.org/wiki/Milliradian"
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
---

In Hell Let Loose, artillery is aimed by setting the gun's elevation in mils. You measure the distance from your gun to the target, look up the mil value for that distance in your faction's table, and dial it in. For US and German howitzers that's 978 mils at 100 m down to 622 mils at 1,600 m; Soviet and British guns use different tables, which is where most misses come from.

## What a mil is

A mil is a small unit of angle. Real-world artillery uses it because it scales neatly with distance: one milliradian covers about one meter at a range of one thousand meters. NATO divides a full circle into 6,400 mils.

You don't need the geometry to fire in Hell Let Loose. Each gun has a sight with a mil scale, and every distance maps to one setting on that scale. Learn your faction's table, or let a calculator hold it for you, and the rest is measuring distance well.

## Why bigger numbers land closer

The stationary howitzers fire high, lobbing shells at a steep angle. Above 45 degrees, raising the barrel sends the shell higher but not as far. As a result, the table on these guns runs the opposite way from what new players expect. **A higher mil value lands closer to the gun, and a lower one lands farther away.**

If your first shell falls short, lower the number. If it flies long, raise it.

## Hell Let Loose artillery tables by faction

Each faction's gun has its own scale. The numbers below come from the formulas [Artillery Let Loose](/artillery-calculator/) uses for stationary howitzers, rounded to the nearest mil. Each table is a straight line, so you can estimate between rows.

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

As formulas (d is distance in meters):

- **US / Germany:** mils = 1001.47 − 0.237 × d (about 23.7 mils per 100 m)
- **Soviet:** mils = 1120 − 21.33 × (d ÷ 100 − 1) (about 21.3 mils per 100 m)
- **Britain / Canada:** mils = 551 − 0.1775 × d (about 17.75 mils per 100 m)

A worked example: your US gun is 850 m from an enemy garrison. 1001.47 − (0.237 × 850) = 800, so dial 800. On a Soviet gun the same 850 m is about 960 mils, and on a British gun about 400.

## Self-propelled artillery uses its own tables

Update 19 (December 3, 2025) added self-propelled artillery (SPA), one vehicle per faction: the KV-2, Sherman M4A3 105, Sturmpanzer IV Brummbär, Churchill AVRE, Panzer III Ausf. N and Bishop SP 25pdr. Only the new Artillery Squad can use them. The same update cut static artillery from three guns to one buildable gun per team.

SPA differs from the howitzers in two ways:

- **Shorter ranges, per vehicle.** The ranges in our app run from 100–250 m for the Churchill AVRE to 100–800 m for the Bishop, with the others in between.
- **The scale runs the other way.** In the SPA tables our app uses, the number goes up as the distance goes up. Don't carry your howitzer habits over.

Because a tank can sit on a slope, vehicle tilt also matters. Artillery Let Loose lets you enter the vehicle's slope (−90° to +90°) alongside the distance and adjusts the elevation for it.

## Common mistakes that waste shells

1. **Using the wrong faction's table.** British numbers are roughly half the US/German ones. A US value dialed on a British gun misses completely. Check which faction you're playing every match.
2. **Measuring from the wrong spot.** Measure from your gun to the target, not from HQ or the center of a grid square. With only one buildable gun per team now, the gun may not be where you're used to.
3. **Ignoring height.** The tables assume the target is level with you. A target on a hill or down in a valley needs a correction. Artillery Let Loose's terrain setting uses standard mil geometry (height difference × 1000 ÷ distance), and the app states that this is a strong theoretical estimate that hasn't been fully validated in-game.
4. **Doing the math in your head under fire.** 23.7 mils per 100 m is easy at a desk and easy to fumble mid-match. Small slips add up when you're walking fire onto a target.
5. **Mixing up SPA and the howitzer.** The tables point in opposite directions. Make sure the number you dial came from the right gun.
6. **Not walking your fire.** If a shell misses, adjust in small steps rather than re-measuring from scratch. A fixed step (say 25 m) toward or away from the gun is quick to apply and easy to track.

## The Vietnam mortar

Hell Let Loose: Vietnam came out on August 13, 2026, and it has a Mortar Squad. Artillery Let Loose includes a mortar mode for both sides (US and NVA) covering 100 to 450 meters, using the same numbers for each side. As with the howitzers, a lower number reaches farther.

## WARDOGS artillery

WARDOGS is a separate game from developer BULKHEAD, in Steam Early Access since September 10, 2026. Instead of a formula, Artillery Let Loose uses community-measured firing tables for its guns and interpolates between the measured points.

- **L81 Mortar:** 132 to 684 m, one mil solution.
- **SPH-2:** 780 to 2,629 m, with a high-arc solution across the whole range and a low-arc solution from 1,181 m.

On the L81 and the SPH-2's high arc, a higher number lands closer, like the Hell Let Loose howitzers. On the SPH-2's low arc, the number goes up with distance.

The tables were measured on flat ground, so park the SPH-2 on level ground: vehicle tilt changes the range. Fire one ranging shot, see where it lands, and adjust from there.

## How a calculator helps

The math is easy on paper and harder with tanks rolling toward your gun and your squad lead calling targets. A calculator takes over the error-prone steps:

- **The right table every time.** Pick your faction or vehicle once, and every number comes from that gun's scale.
- **Speed.** Type the distance and read the mils straight away, on a large readout you can glance at mid-match. It also accepts input from a connected USB or Bluetooth keyboard or numpad.
- **Several targets at once.** History mode keeps your targets in a grid, color-coded by range, with optional labels, so you can switch between fire missions without re-measuring. It's included in the iPhone app; on Android it's a one-time purchase, or you can unlock it free for 3 hours by watching an ad.
- **Walk buttons.** Optional − and + buttons step the distance by 10, 25, 50 or 100 m after each shot.
- **Terrain and slope.** Height and vehicle-tilt adjustments are built in where the game needs them.

A note on fair play: a pinned post on the Hell Let Loose Steam forum says third-party modification tools or overlays that give some players an unfair advantage are "not condoned," and that players who use them risk anti-cheat action. Artillery Let Loose is a separate phone app; it doesn't modify the game, read its data or draw over it. Servers can set their own rules, so check yours if you're unsure.

As of October 2026, Artillery Let Loose is free on Android (with ads) and $1.99 on iPhone, with no ads on iOS. It's listed as "Wardogs & HLL Calculator" on Google Play and "ALL - HLL Artillery Calculator" on the App Store. [See the app](/artillery-calculator/) or [join the Discord](https://discord.gg/PsuUYHAKkT) to report a number that looks off.

*Artillery Let Loose is an unofficial companion app. It is not affiliated with or endorsed by Black Matter, Expression Games, Team17 or BULKHEAD.*
