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
  stores: Store[];
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

export const APPS: AppEntry[] = [
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
    privacyEffective: "October 16, 2026",
    privacySource: "always-on-time-cloud, account-web/privacy-policy.html on main",
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
    privacyEffective: "2026-10-17",
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
    privacyEffective: "2026-10-17",
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
    privacyEffective: "2026-10-17",
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
    privacyEffective: "2026-10-17",
    privacySource:
      "https://doc-hosting.flycricket.io/coffee-roast-tracker/214425cb-dda9-4b2e-8894-d739a752cae3/privacy",
  },
];

export const bySlug = (slug: string) => APPS.find((a) => a.slug === slug);
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
