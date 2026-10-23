import ratings from "./ratings.json";

export type StoreKind = "ios" | "android";
export type Store = {
  kind: StoreKind;
  url: string;
  label: string;
  /** The app's title on this store, when it differs from `name`. */
  title: string;
};
/** One store's listing facts, read by scripts/fetch-ratings.mjs. Never hand-written. */
export type Listing = {
  score: number | null;
  count: number | null;
  price: number;
  currency: string;
};
export type Faq = { q: string; a: string };

/** Widths each store image is encoded at, in public/screens/<slug>/<n>-<w>.webp. */
export const SHOT_WIDTHS = [360, 540, 720] as const;

/**
 * The screenshots as published on one store listing, in listing order. They are the store's own
 * composed images (caption plus device), fetched from App Store Connect or the Play Developer
 * API, never redrawn here.
 */
export type StoreShots = {
  source: StoreKind;
  /** Intrinsic size of the widest (720px) encoding. Every image in a set shares it. */
  w: number;
  h: number;
  /** One description per image: the caption it carries and the screen it shows. */
  alts: string[];
};

/** One of our own videos, hosted on YouTube and embedded only after the visitor presses play. */
export type Video = {
  youtubeId: string;
  /** The video's title on YouTube. */
  title: string;
  /** First paragraph of the YouTube description. */
  description: string;
  /** YouTube publish date, YYYY-MM-DD. */
  uploadDate: string;
  seconds: number;
  /** Landscape sits beside the screenshots; portrait (a Short) leads the row as the first plate. */
  orientation: "landscape" | "portrait";
  /** Poster widths in public/screens/<slug>/video-poster-<w>.webp, and the widest one's size. */
  posterWidths: number[];
  posterW: number;
  posterH: number;
};

export type AppEntry = {
  slug: string;
  /** The app's own name, as it calls itself in the app and its store copy. */
  name: string;
  /** Short name for nav and index rows. */
  shortName: string;
  /** What kind of thing it is, in plain words. Used in page titles. */
  descriptor: string;
  /** One plain line: what it is. Used on the index plate. */
  line: string;
  /** The opening statement on the app's own page; also the meta description. */
  lede: string;
  /** Two or three paragraphs of body, drawn from the official store description. */
  body: string[];
  /** Grouped capability lists, straight from the store listing. */
  groups: { title: string; items: string[] }[];
  /**
   * Questions people ask an assistant or a search box, answered only with facts from the
   * store listing or the privacy policy. Rendered visibly and as FAQPage JSON-LD.
   */
  faq: Faq[];
  /** The single accent this entry owns. Used only on the store action. */
  accent: string;
  /** Accent tuned for legibility on the paper ground when used as text. */
  accentInk: string;
  icon: string;
  shots: string[];
  /** Short description of each shot, in order, for alt text. */
  shotAlts: string[];
  /** The current store listing's screenshots, shown in the showcase strip. Absent before release. */
  storeShots?: StoreShots;
  /** Present only when the app has a published video. */
  video?: Video;
  stores: Store[];
  /** Platforms it runs on, when there is no public store listing yet to say so. */
  platforms?: StoreKind[];
  /**
   * Set while the app has no public store listing (for example, only a closed or internal test
   * track). The text replaces the store actions. A prerelease app keeps its own page and privacy
   * policy (store and Google OAuth reviews need both), but they render noindex and the app is left
   * out of APPS: navigation, the home page, the sitemap, llms.txt, the support page, and the
   * catalogue. Remove it, and add the store, once the listing is public.
   */
  prerelease?: string;
  /** Show Google's Limited Use statement: the app requests Google user data through an API. */
  googleApiData?: boolean;
  listings: { ios?: Listing; android?: Listing };
  /** schema.org applicationCategory, e.g. "UtilitiesApplication". */
  schemaCategory: string;
  /** Human label for the platform tags. */
  category: string;
  /** Anything true and load-bearing that the store copy states. */
  notes?: string[];
  /** Effective date printed on the privacy policy, as written in the policy. */
  privacyEffective: string;
  /** Where the policy text was ported from. */
  privacySource: string;
  /** Extra support routes beyond email. */
  support?: { label: string; url: string; note?: string }[];
  /** Other official web presence for this app. */
  website?: { label: string; url: string };
};

const r = ratings.apps as Record<string, { ios?: Listing; android?: Listing }>;

/** Every app with pages on the site, released or not. Use APPS for anything that lists them. */
export const ALL_APPS: AppEntry[] = [
  {
    slug: "always-on-time",
    name: "Always On Time",
    shortName: "Always On Time",
    descriptor: "Calendar meeting alarm for Android",
    line: "Turns calendar events into full-screen alarms, so the next meeting does not slip past.",
    lede:
      "Always On Time turns your calendar events, appointments, and meetings into full-screen alarms with sound and vibration. Use it with Google Calendar and other calendars synced to your Android phone, then join a meeting straight from the alarm screen.",
    body: [
      "When you are absorbed in a task, a calendar notification is easy to miss. Always On Time gives meetings and appointments a full alarm instead, so you notice when it is time to switch. It is built for people with ADHD, people who experience time blindness, and anyone with back-to-back calls who simply loses track of time.",
      "The app reads the calendars available through Android’s device calendar. A calendar has to be synced to your phone and appear in the app’s calendar selection; a calendar visible only inside another app may not be available.",
    ],
    groups: [
      {
        title: "Calendar alarms and reminders",
        items: [
          "Choose which calendars the app monitors",
          "Set alarms before an event, including 5, 10, or 15-minute reminders",
          "Add more than one alarm per meeting to give yourself time to prepare",
          "Choose sound and vibration, then snooze or dismiss from the alarm screen",
          "Alarms can appear over your lock screen once the required Android permissions are on",
        ],
      },
      {
        title: "Leave on time",
        items: [
          "Optional travel alarms tell you when to leave, based on driving, transit, cycling, or walking time",
          "Live traffic for driving is part of Always On Time Plus, free for a limited time",
          "Choose where the trip starts and how early you want to arrive",
        ],
      },
      {
        title: "Join in one tap",
        items: [
          "Detects Google Meet, Zoom, Microsoft Teams, and Webex links in calendar events",
          "Open the meeting directly from the alarm screen when a supported link is available",
        ],
      },
      {
        title: "Set up for reliable alarms",
        items: [
          "Guided setup for notifications, exact alarms, full-screen alerts, and battery settings",
          "Upcoming alarms are restored after a phone restart",
          "Receive meeting alarms on a compatible Wear OS watch, and snooze or dismiss there",
        ],
      },
    ],
    faq: [
      {
        q: "Is there an Android app that turns Google Calendar events into real alarms?",
        a: "Yes. Always On Time turns calendar events, appointments, and meetings into full-screen alarms with sound and vibration. It works with Google Calendar and other calendars synced to your Android phone, and alarms can appear over the lock screen once the required Android permissions are enabled.",
      },
      {
        q: "Can I join a Zoom, Google Meet, or Teams call from the alarm?",
        a: "Yes, when the event contains a supported link. The app detects Google Meet, Zoom, Microsoft Teams, and Webex links in calendar events and lets you open the meeting directly from the alarm screen.",
      },
      {
        q: "Can it help if I have ADHD or time blindness?",
        a: "That is who it was designed for. A calendar notification is easy to miss while you are absorbed in a task; Always On Time gives meetings and appointments a full-screen alarm with sound and vibration so you notice when it is time to switch tasks. There are no scores or streaks to keep up.",
      },
      {
        q: "Does it work with Outlook or calendars other than Google?",
        a: "It reads any calendar available through Android’s device calendar. The calendar has to be synced to your phone and appear in the app’s calendar selection. A calendar that is visible only inside another app may not be available.",
      },
      {
        q: "Is Always On Time available on iPhone?",
        a: "No. It is an Android app, with a companion for compatible Wear OS watches. There is no iPhone version.",
      },
      {
        q: "Will my alarms still ring after I restart my phone?",
        a: "Yes. Upcoming alarms are restored after a restart. Android permissions and your phone’s battery settings affect alarm delivery, and the app’s guided setup walks you through both.",
      },
      {
        q: "Does Always On Time upload my calendar?",
        a: "Your calendar is processed on your phone to schedule alarms. Optional features, such as syncing settings between phones with a Google sign-in, send the information the privacy policy describes. The app shows no ads, and your data is not sold.",
      },
    ],
    accent: "#2F6DE0",
    accentInk: "#1B4FAE",
    icon: "/icons/alwaysontime.webp",
    shots: ["/shots/alwaysontime-1.webp", "/shots/alwaysontime-2.webp", "/shots/alwaysontime-3.webp"],
    shotAlts: [
      "Home screen showing the next event and today's alarms",
      "Full-screen alarm ten minutes before a meeting",
      "Alarm health screen confirming permissions are granted",
    ],
    storeShots: {
      source: "android",
      w: 720,
      h: 1280,
      alts: [
        "“Never late to a meeting again”: the home screen with the next meeting and today’s alarms",
        "“Join in one tap”: a full-screen alarm ten minutes before a meeting, with Join now and Snooze",
        "“Your schedule, your control”: choosing which calendars the app watches",
        "“Make it yours”: choosing an alarm colour on the Appearance screen",
      ],
    },
    video: {
      youtubeId: "UVZwlFZaIBc",
      title: "Always On Time – Turn Calendar Meetings into Real Alarms",
      description:
        "Calendar notifications are easy to miss. Always On Time turns your meetings into real alarms: full screen, with sound, even on a locked phone. When it's time, tap Join and you're in.",
      uploadDate: "2026-09-24",
      seconds: 17,
      orientation: "landscape",
      posterWidths: [640, 960, 1280],
      posterW: 1280,
      posterH: 720,
    },
    stores: [
      {
        kind: "android",
        url: "https://play.google.com/store/apps/details?id=com.zombitstudios.alwaysontime",
        label: "Get it on Google Play",
        title: "Calendar Alarm: Always On Time",
      },
    ],
    listings: r.alwaysontime ?? {},
    schemaCategory: "ProductivityApplication",
    category: "Productivity",
    notes: [
      "Android only, with a Wear OS companion. There is no iPhone build.",
      "No ads.",
      "Your calendar is processed on your phone to schedule alarms.",
    ],
    privacyEffective: "October 23, 2026",
    privacySource: "Maintained in src/content/privacy/always-on-time.html",
  },
  {
    slug: "artillery-calculator",
    name: "Artillery Let Loose",
    shortName: "Artillery Let Loose",
    descriptor: "Artillery calculator for Hell Let Loose and WARDOGS",
    line: "Enter the target distance, read the elevation to dial. For Hell Let Loose and WARDOGS.",
    lede:
      "Fast firing solutions for Hell Let Loose and WARDOGS. Enter the target distance and immediately read the elevation to dial.",
    body: [
      "The focused keypad and large result display are designed for quick use during a match. Each faction and gun is calculated separately, so the number you read is for the gun you are actually standing behind.",
      "History mode keeps your targets, labelled and colour-coded by range, and terrain-height and vehicle-slope adjustments cover the cases where your gun and your target are not on level ground.",
    ],
    groups: [
      {
        title: "Hell Let Loose",
        items: [
          "Stationary artillery for US, Germany, Soviet, British, and Canadian forces",
          "Mobile artillery and vehicle-specific firing solutions",
          "Vietnam mortar support",
          "Terrain-height and vehicle-slope adjustments where supported",
          "Target history, labels, and favourites",
        ],
      },
      {
        title: "WARDOGS",
        items: [
          "L81 Mortar firing solutions",
          "SPH-2 high-arc and low-arc firing solutions",
          "Fire one ranging shot, then adjust for terrain and vehicle tilt",
        ],
      },
    ],
    faq: [
      {
        q: "How do I calculate artillery elevation in Hell Let Loose?",
        a: "Pick your faction and gun in Artillery Let Loose, enter the distance to the target, and read the elevation to dial. Terrain-height and vehicle-slope adjustments are available where the game needs them.",
      },
      {
        q: "Which factions and guns does it cover?",
        a: "Hell Let Loose stationary artillery for US, Germany, Soviet, British, and Canadian forces, mobile artillery with vehicle-specific solutions, and Vietnam mortars. For WARDOGS it covers the L81 Mortar and the SPH-2 in both high and low arc.",
      },
      {
        q: "Is there an artillery calculator for WARDOGS?",
        a: "Yes. Artillery Let Loose gives L81 Mortar and SPH-2 high- and low-arc firing solutions. Fire one ranging shot, then adjust for terrain and vehicle tilt.",
      },
      {
        q: "Is it on iPhone and Android?",
        a: "Both. On the App Store it is listed as “ALL - HLL Artillery Calculator”, and on Google Play as “Wardogs & HLL Calculator”.",
      },
      {
        q: "Is this an official Hell Let Loose app?",
        a: "No. Artillery Let Loose is an unofficial companion app. It is not affiliated with or endorsed by Black Matter Pty Ltd, Team17 Digital Limited, or Bulkhead Limited.",
      },
      {
        q: "Where can I report a wrong elevation or ask for help?",
        a: "Join the Artillery Let Loose Discord, or email zombit.studios@gmail.com with your faction, gun, distance, and the elevation you expected.",
      },
    ],
    accent: "#E0A32F",
    accentInk: "#8A5D00",
    icon: "/icons/artillery.webp",
    shots: ["/shots/artillery-1.webp", "/shots/artillery-2.webp", "/shots/artillery-3.webp"],
    shotAlts: [
      "Game picker with Hell Let Loose and WARDOGS",
      "Calculator showing an elevation of 800 for a target at 850 metres",
      "History mode with five targets colour-coded by range",
    ],
    storeShots: {
      source: "android",
      w: 720,
      h: 1280,
      alts: [
        "“Distance in, elevation out” for Hell Let Loose and WARDOGS: an elevation of 800 for a target at 850 metres",
        "WARDOGS SPH-2 in high and low arc: 1213 and 84 mils for a target at 1500 metres",
        "“Track every target”: history mode with five targets colour-coded by range",
      ],
    },
    stores: [
      {
        kind: "ios",
        url: "https://apps.apple.com/us/app/all-hll-artillery-calculator/id1616413054",
        label: "Download on the App Store",
        title: "ALL - HLL Artillery Calculator",
      },
      {
        kind: "android",
        url: "https://play.google.com/store/apps/details?id=flutter.app.artillery_let_loose",
        label: "Get it on Google Play",
        title: "Wardogs & HLL Calculator",
      },
    ],
    listings: r.artillery ?? {},
    schemaCategory: "UtilitiesApplication",
    category: "Utilities",
    notes: [
      "An unofficial companion app. Not affiliated with or endorsed by Black Matter Pty Ltd, Team17 Digital Limited, or Bulkhead Limited.",
      "The Google Play version offers in-app purchases.",
    ],
    privacyEffective: "October 17, 2026",
    privacySource: "https://pages.flycricket.io/artillery-let-loose/privacy.html",
    support: [
      {
        label: "Artillery Let Loose Discord",
        url: "https://discord.gg/PsuUYHAKkT",
        note: "Ask questions, share feedback, or report a number that looks wrong.",
      },
    ],
  },
  {
    slug: "montessori-visual-timer",
    name: "Montessori Visual Timer",
    shortName: "Montessori Visual Timer",
    descriptor: "Visual timer for children",
    line: "A timer children read by watching colour disappear, not by reading numbers.",
    lede:
      "Help children understand time in a calm, visual way. Instead of numbers counting down, children see time pass, which makes routines, transitions, and waiting periods easier to understand.",
    body: [
      "Montessori Visual Timer is a simple, distraction-free timer for kids and their parents, teachers, and therapists. Inspired by Montessori principles, it focuses on independence, clarity, and calm environments, at home, in classrooms, and in therapy settings.",
      "It is simple enough that children can run it themselves, which is the point: the timer belongs to the child, not to the adult enforcing it.",
    ],
    groups: [
      {
        title: "Features",
        items: [
          "Visual countdown, so children see how much time is left",
          "Simple and intuitive, designed so children can use it themselves",
          "Adjustable durations for short tasks or longer activities",
          "A gentle completion alert when time is up",
          "Quick timers: one tap for daily routines",
          "Lock controls: a PIN keeps little hands out",
          "Minimalist design with no ads and no clutter",
        ],
      },
      {
        title: "Made for",
        items: [
          "Routines like brushing teeth, clean-up time, reading, homework, or screen breaks",
          "Montessori homes and classrooms",
          "Preschool and elementary children",
          "Building independence and time awareness",
          "Managing transitions between activities",
        ],
      },
    ],
    faq: [
      {
        q: "Is there a visual timer app for young children?",
        a: "Montessori Visual Timer shows time as a coloured section of a clock face that shrinks as time passes, so children can see how much time is left without reading numbers. It runs on iPhone, iPad, and Android.",
      },
      {
        q: "How does a visual timer help with transitions?",
        a: "Children see time disappear instead of watching numbers count down, which makes it easier to understand how long is left in a routine, a transition, or a wait. A gentle alert signals when time is up.",
      },
      {
        q: "Can my child use it on their own?",
        a: "Yes. It is designed so children can use it themselves. A PIN lock keeps the controls from being changed, and quick timers start common routines like brushing teeth or clean-up time with one tap.",
      },
      {
        q: "Does Montessori Visual Timer have ads?",
        a: "No. There are no ads and no clutter, just the timer.",
      },
      {
        q: "Does it collect any data about my child?",
        a: "The app’s privacy policy states that it does not obtain any information when you download and use it, and that registration is not required.",
      },
    ],
    accent: "#E2542B",
    accentInk: "#B23A15",
    icon: "/icons/montessori.webp",
    shots: [
      "/shots/montessori-1.webp",
      "/shots/montessori-2.webp",
      "/shots/montessori-3.webp",
    ],
    shotAlts: [
      "Setting a ten-minute timer on the clock face",
      "Timer counting down, with the coloured section shrinking",
      "PIN pad that keeps the timer controls locked",
    ],
    storeShots: {
      source: "android",
      w: 720,
      h: 1280,
      alts: [
        "Visual Timer: a ten-minute timer set on the clock face",
        "“No distractions”: the timer counting down, with the coloured section shrinking",
        "“Lock controls”: the PIN pad that keeps little hands out",
        "“Quick timers”: one-tap routines such as Brush Teeth, Cleanup, and Quiet Time",
      ],
    },
    video: {
      youtubeId: "W3l46xFXA5s",
      title: "Montessori Visual Timer – A Visual Countdown Timer",
      description:
        "Montessori Visual Timer shows time as a colored wedge that shrinks as the minutes pass, so kids who can't read a clock yet can still see how much time is left.",
      uploadDate: "2026-10-14",
      seconds: 28,
      orientation: "portrait",
      posterWidths: [360, 540, 720],
      posterW: 720,
      posterH: 1561,
    },
    stores: [
      {
        kind: "ios",
        url: "https://apps.apple.com/us/app/montessori-visual-timer/id6760267134",
        label: "Download on the App Store",
        title: "Montessori Visual Timer",
      },
      {
        kind: "android",
        url: "https://play.google.com/store/apps/details?id=com.zombitstudios.visualtimer",
        label: "Get it on Google Play",
        title: "Montessori Visual Timer",
      },
    ],
    listings: r.montessori ?? {},
    schemaCategory: "EducationalApplication",
    category: "Education",
    notes: ["iPhone, iPad, and Android.", "No ads."],
    privacyEffective: "October 17, 2026",
    privacySource:
      "https://doc-hosting.flycricket.io/montessori-visual-timer/1c5cdcb2-37e1-424c-988b-4e81d2ee7950/privacy",
  },
  {
    slug: "word-garden",
    name: "Word Garden",
    shortName: "Word Garden",
    descriptor: "Daily spelling bee word puzzle",
    line: "A daily word puzzle: make words from a handful of letters and try to find them all.",
    lede:
      "Build words. Grow your garden. Find every hidden word. Word Garden is a daily word puzzle inspired by spelling bee games: arrange letters to form words, climb through a series of ranks, and try to find every hidden word.",
    body: [
      "Adjustable difficulty makes it work for kids and adults alike. Turn the centre-letter requirement on or off, switch between three- and four-letter minimums, and use kid-friendly scoring to keep younger players going.",
      "There are no ads and no timers. It is meant as a calm, focused word game for your morning coffee or a bedtime wind-down.",
    ],
    groups: [
      {
        title: "How it works",
        items: [
          "You get a set of letters arranged in a grid",
          "Form words using only those letters, reusing letters as often as you like",
          "Find pangrams, words that use every letter, for bonus points",
          "Climb from beginner all the way to the top rank",
        ],
      },
      {
        title: "For all ages",
        items: [
          "Toggle the centre-letter requirement on or off",
          "Switch between 3-letter and 4-letter minimums",
          "Kid-friendly scoring keeps younger players motivated",
        ],
      },
      {
        title: "Features",
        items: [
          "A fresh puzzle every day",
          "Dark and light themes inspired by Japanese zen gardens",
          "A progress bar with ranks to unlock",
          "Share your results with friends",
          "A celebration screen when you find every word",
        ],
      },
    ],
    faq: [
      {
        q: "Is there a free daily spelling bee word game?",
        a: "Word Garden is a free daily word puzzle inspired by spelling bee games, on iPhone, iPad, and Android. You get a fresh set of letters every day and make as many words from them as you can.",
      },
      {
        q: "What is a pangram in Word Garden?",
        a: "A pangram is a word that uses every one of the day’s letters. Finding one earns bonus points.",
      },
      {
        q: "Is Word Garden good for kids?",
        a: "It has settings for younger players: you can turn off the centre-letter requirement, allow three-letter words, and use kid-friendly scoring.",
      },
      {
        q: "Does Word Garden have ads or a timer?",
        a: "No ads and no timers.",
      },
      {
        q: "Can I play Word Garden in a browser?",
        a: "Yes. There is a web version at wordgarden.zombit.io.",
      },
    ],
    accent: "#E3893A",
    accentInk: "#A4561A",
    icon: "/icons/wordgarden.webp",
    shots: ["/shots/wordgarden-1.webp"],
    shotAlts: ["Daily puzzle with seven letter tiles and the rank progress bar, in dark mode"],
    storeShots: {
      source: "ios",
      w: 720,
      h: 1559,
      alts: [
        "“Grow vocabulary”: the daily puzzle’s letter tiles on a tilted phone",
        "“Daily puzzles”: new letter combinations every day",
        "“Set the pace”: settings for the centre letter, minimum word length, and hints",
        "“Built for focus, not screen time”: the puzzle in the calm dark theme",
      ],
    },
    stores: [
      {
        kind: "ios",
        url: "https://apps.apple.com/us/app/word-garden-spelling-bee/id6781898007",
        label: "Download on the App Store",
        title: "Word Garden: Spelling Bee",
      },
      {
        kind: "android",
        url: "https://play.google.com/store/apps/details?id=com.zombit.wordgarden",
        label: "Get it on Google Play",
        title: "Word Garden: Spelling Bee",
      },
    ],
    listings: r.wordgarden ?? {},
    schemaCategory: "GameApplication",
    category: "Word game",
    notes: ["No ads. No timers.", "iPhone, iPad, Android, and the web."],
    privacyEffective: "October 17, 2026",
    privacySource:
      "https://doc-hosting.flycricket.io/word-garden-spelling/d33dc669-7ac3-449a-b039-8adbd3019491/privacy",
    website: { label: "Play on the web", url: "https://wordgarden.zombit.io" },
  },
  {
    slug: "coffee-roast-tracker",
    name: "Coffee Roast Tracker",
    shortName: "Coffee Roast Tracker",
    descriptor: "Roast log for home coffee roasters",
    line: "Log your home roasts and read the roast level straight from the weight loss.",
    lede:
      "Track your roasts, calculate roast levels by weight loss, and improve your consistency as a home roaster. No account required, and your data stays on your device.",
    body: [
      "Coffee Roast Tracker is a simple tool for home coffee roasters who want to work out the roast level of small batches, keep track of the results, and get more consistent over time.",
      "Start a roast with the bean origin and green weight. After roasting, log the final weight, and the app calculates the weight-loss percentage and the roast level it corresponds to.",
    ],
    groups: [
      {
        title: "How it works",
        items: [
          "Start a roast by entering your bean origin and green weight",
          "After roasting, log your final weight",
          "The app calculates your weight-loss percentage and determines the roast level",
        ],
      },
      {
        title: "Features",
        items: [
          "Automatic roast level detection, from Light (City-) to French, based on industry-standard weight-loss percentages",
          "Roast history: every roast saved, searchable, and grouped by date",
          "Quick stats: average weight loss, most common roast level, and total roasts",
          "Roast guide: a reference chart of weight-loss ranges for each level",
          "Dark mode for early-morning roasts",
          "Edit entries or undo deletions",
        ],
      },
    ],
    faq: [
      {
        q: "How do I work out my coffee roast level from weight loss?",
        a: "Weigh the green beans before roasting and the roasted beans after. Coffee Roast Tracker turns the two weights into a weight-loss percentage and matches it to a roast level from City- to French, using industry-standard weight-loss ranges. Its roast guide shows the range for each level.",
      },
      {
        q: "Do I need an account to use Coffee Roast Tracker?",
        a: "No. There is no account, and your roast data stays on your device.",
      },
      {
        q: "Can I fix a roast I logged wrong?",
        a: "Yes. You can edit entries, and undo a deletion.",
      },
      {
        q: "Is Coffee Roast Tracker on iPhone and Android?",
        a: "Yes, on both the App Store and Google Play.",
      },
    ],
    accent: "#7A5A43",
    accentInk: "#5E4331",
    icon: "/icons/coffee.webp",
    shots: ["/shots/coffee-1.webp"],
    shotAlts: ["Home screen with a roast in progress and four recent roasts with their levels"],
    storeShots: {
      source: "ios",
      w: 720,
      h: 1559,
      alts: [
        "“Meet your coffee roasting companion”: the home screen with a roast in progress and recent roasts",
        "“See your roasting history”: past roasts with their weight loss and roast level",
        "“Quick-reference guide”: the weight-loss range for each roast level",
      ],
    },
    stores: [
      {
        kind: "ios",
        url: "https://apps.apple.com/us/app/coffee-roast-tracker/id6760438622",
        label: "Download on the App Store",
        title: "Coffee Roast Tracker",
      },
      {
        kind: "android",
        url: "https://play.google.com/store/apps/details?id=com.zombit.coffeeRoastingCompanion",
        label: "Get it on Google Play",
        title: "Coffee Roast Tracker",
      },
    ],
    listings: r.coffee ?? {},
    schemaCategory: "UtilitiesApplication",
    category: "Utilities",
    notes: ["No account required. Your data stays on your device."],
    privacyEffective: "October 17, 2026",
    privacySource:
      "https://doc-hosting.flycricket.io/coffee-roast-tracker/214425cb-dda9-4b2e-8894-d739a752cae3/privacy",
  },
  {
    slug: "photovault",
    name: "PhotoVault",
    shortName: "PhotoVault",
    descriptor: "Private encrypted photo and video vault for Android",
    line: "Keeps private photos and videos encrypted behind a six-digit passcode, with optional backup to your own Google Drive.",
    lede:
      "PhotoVault keeps your private photos and videos in an encrypted vault on your Android phone, behind a six-digit passcode. Optional Google Drive backup stores only encrypted copies, in your own Drive.",
    body: [
      "Everything you add is encrypted on your phone and kept in PhotoVault’s private storage, never in your phone’s gallery. The vault asks for its passcode every time you open it, and blocks screenshots and screen recording while it is open.",
      "There is no PhotoVault account and no PhotoVault server. If you connect Google Drive, PhotoVault uploads only encrypted data, to a hidden folder in your own Drive that only PhotoVault can use. We can’t see your photos and videos, and Google receives only encrypted files.",
    ],
    groups: [
      {
        title: "Private by default",
        items: [
          "A six-digit passcode every time you open the app",
          "Screenshots and screen recording blocked inside the vault",
          "A neutral cover on the recent-apps screen",
          "Photos and videos encrypted on your phone and never saved to the gallery",
        ],
      },
      {
        title: "Add and organize",
        items: [
          "Take photos and record videos with the private in-app camera",
          "Import from Android’s photo picker, or share into PhotoVault from other apps",
          "Albums, plus All Media, Camera, Favorites, Videos, and Unsorted",
          "Trash, with restore and permanent delete",
          "Export a copy of a photo or video when you choose",
        ],
      },
      {
        title: "Your Google Drive, optional",
        items: [
          "Encrypted backup to a hidden PhotoVault folder in your own Google Drive",
          "Automatic backup while the vault is open, on Wi-Fi only unless you change it",
          "A master password protects a recovery copy of your vault key, for opening the vault on a new phone",
          "Disconnect at any time; your vault stays on your phone",
        ],
      },
    ],
    faq: [
      {
        q: "Can Zombit Studios see my photos?",
        a: "No. PhotoVault encrypts your photos and videos on your phone. There is no PhotoVault server, and copies in Google Drive are encrypted with a key we never receive.",
      },
      {
        q: "Where are my photos and videos stored?",
        a: "In PhotoVault’s private, encrypted storage on your phone. If you connect Google Drive, encrypted copies go into a hidden app folder in your own Drive. They don’t appear with your other Drive files, and they count against your Google storage.",
      },
      {
        q: "Does importing delete the original photo?",
        a: "No. Importing or sharing into PhotoVault copies the photo or video into the vault. The original stays where it was.",
      },
      {
        q: "What if I forget my master password?",
        a: "We can’t reset it. The master password unlocks the recovery copy of your vault key, and it never leaves your phone, so nobody else can open that copy for you.",
      },
      {
        q: "Can I download PhotoVault?",
        a: "Not yet. PhotoVault is in testing and isn’t on Google Play yet. It is an Android app; there is no iPhone version.",
      },
    ],
    accent: "#3D7A66",
    accentInk: "#2B5C4C",
    icon: "/icons/photovault.webp",
    shots: [],
    shotAlts: [],
    stores: [],
    platforms: ["android"],
    prerelease: "Coming soon to Google Play. PhotoVault is in testing and can’t be downloaded yet.",
    googleApiData: true,
    listings: {},
    schemaCategory: "MultimediaApplication",
    category: "Photography",
    notes: [
      "Android only. There is no iPhone version.",
      "In testing, not yet on Google Play.",
      "No ads, analytics, or crash reporting in the app.",
      "No PhotoVault account or server. Google Drive backup is optional and stores only encrypted data.",
    ],
    privacyEffective: "October 22, 2026",
    privacySource: "Written for zombit.io from the PhotoVault Android source (KtodaZ/photo-vault, 390e9db)",
  },
];

/** Released apps: the ones the site lists anywhere. */
export const APPS: AppEntry[] = ALL_APPS.filter((a) => !a.prerelease);

export const bySlug = (slug: string) => ALL_APPS.find((a) => a.slug === slug);
/** The platforms an app runs on: its store listings, or `platforms` before it has any. */
export const platformsOf = (app: AppEntry): StoreKind[] => app.platforms ?? app.stores.map((s) => s.kind);
export const RATINGS_FETCHED_AT = ratings.fetchedAt;

/**
 * Fewest ratings a store average needs before the site shows it anywhere: on the page, in
 * llms-full.txt, or as aggregateRating JSON-LD. A 5.0 from one rating says little and reads as
 * padding; under the threshold the store link alone carries the listing.
 */
export const MIN_RATINGS = 10;

/** A fetched store rating with a real score and enough ratings behind it to publish. */
export const showsRating = (l: Listing | undefined): l is Listing =>
  Boolean(l && l.score !== null && l.count !== null && l.count >= MIN_RATINGS);

/** public/ path of one encoded store image, n counted from 1. */
export const storeShotPath = (app: AppEntry, n: number, w: number) => `/screens/${app.slug}/${n}-${w}.webp`;
/** The widest encoding of every store image, in listing order. */
export const storeShotUrls = (app: AppEntry) =>
  (app.storeShots?.alts ?? []).map((_, i) => storeShotPath(app, i + 1, 720));
export const posterPath = (app: AppEntry, w: number) => `/screens/${app.slug}/video-poster-${w}.webp`;
export const watchUrl = (v: Video) => `https://www.youtube.com/watch?v=${v.youtubeId}`;
export const embedUrl = (v: Video) => `https://www.youtube-nocookie.com/embed/${v.youtubeId}`;

export const privacyPath = (app: AppEntry) => `/${app.slug}/privacy/`;

/** Store price as a short phrase, or null when the listing has not been read. */
export function priceLabel(l: Listing | undefined) {
  if (!l) return null;
  if (l.price === 0) return "Free";
  return new Intl.NumberFormat("en-US", { style: "currency", currency: l.currency }).format(l.price);
}

export const SITE = {
  name: "Zombit Studios",
  legalName: "Zombit Studios LLC",
  tagline: "Small, useful apps for phones and watches.",
  description:
    "Zombit Studios LLC is a small independent app studio. It makes five single-purpose apps: Always On Time, a calendar alarm for Android; Artillery Let Loose, an artillery calculator for Hell Let Loose and WARDOGS; Montessori Visual Timer for children; Word Garden, a daily spelling bee puzzle; and Coffee Roast Tracker for home roasters.",
  email: "zombit.studios@gmail.com",
  /** Store developer pages: the studio's verifiable identity elsewhere. */
  sameAs: [
    "https://play.google.com/store/apps/developer?id=Zombit+Studios",
    "https://apps.apple.com/us/developer/zombit-studios-llc/id1616413356",
  ],
  /** Always On Time account deletion (hosted by the Always On Time cloud service). */
  aotDeleteAccount: "https://alwaysontime.zombit.io/delete-account/",
};
