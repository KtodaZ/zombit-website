import ratings from "./ratings.json";

export type Store = { kind: "ios" | "android"; url: string; label: string };
export type Rating = { score: number; count: number | null };

export type AppEntry = {
  slug: string;
  /** Full store name. */
  name: string;
  /** Short name for nav and index rows. */
  shortName: string;
  /** One plain line: what it is. Used on the index plate and as meta description seed. */
  line: string;
  /** The opening statement on the app's own page. */
  lede: string;
  /** Two or three paragraphs of body, drawn from the official store description. */
  body: string[];
  /** Grouped capability lists, straight from the store listing. */
  groups: { title: string; items: string[] }[];
  /** The single accent this entry owns. Used only on the store action. */
  accent: string;
  /** Accent tuned for legibility on the paper ground when used as text. */
  accentInk: string;
  icon: string;
  shots: string[];
  stores: Store[];
  ratings: { ios?: Rating; android?: Rating };
  category: string;
  /** Anything true and load-bearing that the store copy states. */
  notes?: string[];
};

const r = ratings.apps as Record<string, { ios?: Rating; android?: Rating }>;

export const APPS: AppEntry[] = [
  {
    slug: "always-on-time",
    name: "Always On Time: Meeting Alarm",
    shortName: "Always On Time",
    line: "An alarm for your calendar, loud enough to actually catch.",
    lede:
      "A calendar notification is easy to dismiss without noticing. Always On Time rings, vibrates, and can appear over your lock screen before an event, so you get a clear moment to get ready and join.",
    body: [
      "It is built for people with time blindness, packed schedules, or anyone who has missed a meeting because a notification got swiped away before it registered.",
      "There is no score, no streak, and nothing to keep up. The app does one thing: it makes sure the next thing on your calendar does not pass you by.",
    ],
    groups: [
      {
        title: "Calendar meeting alarms",
        items: [
          "Choose which device calendars the app monitors",
          "Set one or more alarms before each meeting",
          "Detect Google Meet, Zoom, Microsoft Teams, and Webex links",
          "Open a meeting directly from the alarm screen when a link is available",
        ],
      },
      {
        title: "Designed for reliable delivery",
        items: [
          "Uses Android alarm APIs for time-sensitive alerts",
          "Guides you through notification, full-screen alarm, and battery settings",
          "Restores upcoming alarms after device restarts",
        ],
      },
      {
        title: "Wear OS companion",
        items: [
          "Receive locally scheduled meeting alarms on a compatible Wear OS watch",
          "Dismiss or snooze from your watch and reconcile the action with your phone",
          "The phone stays the source of truth for calendars, settings, and history",
        ],
      },
    ],
    accent: "#2F6DE0",
    accentInk: "#1B4FAE",
    icon: "/icons/alwaysontime.webp",
    shots: ["/shots/alwaysontime-1.webp", "/shots/alwaysontime-2.webp", "/shots/alwaysontime-3.webp"],
    stores: [
      {
        kind: "android",
        url: "https://play.google.com/store/apps/details?id=com.zombitstudios.alwaysontime",
        label: "Get it on Google Play",
      },
    ],
    ratings: r.alwaysontime ?? {},
    category: "Productivity",
    notes: [
      "Android only. There is no iOS build.",
      "No ads.",
      "Calendar events are primarily processed and stored on your devices.",
    ],
  },
  {
    slug: "artillery-calculator",
    name: "ALL — HLL Artillery Calculator",
    shortName: "Artillery Let Loose",
    line: "Enter the target distance, read the elevation. That is the whole app.",
    lede:
      "The artillery calculator for Hell Let Loose. Enter your target distance, read the elevation. That's it.",
    body: [
      "Every faction across both eras is calibrated separately, so the number you read is the number for the gun you are actually standing behind.",
      "History mode keeps unlimited targets colour-coded by range, and a terrain offset accounts for the elevation difference between your gun and the target.",
    ],
    groups: [
      {
        title: "WWII and Vietnam, every faction",
        items: [
          "US / Germany, Soviet Union, and Britain — stationary and self-propelled artillery",
          "Vietnam: US / NVA mortar calculator (beta)",
        ],
      },
      {
        title: "Features",
        items: [
          "Instant elevation from distance, calibrated for every gun",
          "History mode: track unlimited targets, colour-coded by range",
          "Terrain offset for elevation difference between gun and target",
          "Self-propelled artillery with slope mode",
        ],
      },
    ],
    accent: "#E0A32F",
    accentInk: "#8A5D00",
    icon: "/icons/artillery.webp",
    shots: ["/shots/artillery-1.webp"],
    stores: [
      {
        kind: "ios",
        url: "https://apps.apple.com/us/app/all-hll-artillery-calculator/id1616413054",
        label: "Download on the App Store",
      },
      {
        kind: "android",
        url: "https://play.google.com/store/apps/details?id=flutter.app.artillery_let_loose",
        label: "Get it on Google Play",
      },
    ],
    ratings: r.artillery ?? {},
    category: "Utilities",
    notes: [
      "Not affiliated with Black Matter Pty Ltd or Team17 Group PLC.",
    ],
  },
  {
    slug: "montessori-visual-timer",
    name: "Montessori Visual Timer",
    shortName: "Montessori Visual Timer",
    line: "A timer children read by watching colour disappear, not by reading numbers.",
    lede:
      "Help children understand time in a calm, visual way. Instead of numbers counting down, children see time pass visually, which makes routines, transitions, and waiting periods easier to understand.",
    body: [
      "Inspired by Montessori principles, the app focuses on independence, clarity, and calm environments — at home, in classrooms, and in therapy settings.",
      "It is simple enough that children can operate it themselves, which is the point: the timer belongs to the child, not to the adult enforcing it.",
    ],
    groups: [
      {
        title: "Features",
        items: [
          "Visual countdown so children see how much time is left",
          "Simple and intuitive, designed so children can use it themselves",
          "Adjustable durations for short tasks or longer activities",
          "A gentle completion alert — a soft signal when time is up",
          "Minimalist design with no ads and no clutter",
        ],
      },
      {
        title: "Made for",
        items: [
          "Montessori homes and classrooms",
          "Preschool and elementary children",
          "Building independence and time awareness",
          "Managing transitions between activities",
        ],
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
    stores: [
      {
        kind: "ios",
        url: "https://apps.apple.com/us/app/montessori-visual-timer/id6760267134",
        label: "Download on the App Store",
      },
    ],
    ratings: r.montessori ?? {},
    category: "Productivity",
    notes: ["iOS and iPadOS only. There is no Android build.", "No ads."],
  },
];

export const bySlug = (slug: string) => APPS.find((a) => a.slug === slug);
export const RATINGS_FETCHED_AT = ratings.fetchedAt;

export const SITE = {
  name: "Zombit Studios",
  legalName: "Zombit Studios LLC",
  url: "https://zombit.io",
  tagline: "Small, useful apps for phones and watches.",
  description:
    "Zombit Studios is a small independent studio. We make three single-purpose apps: a calendar meeting alarm for Android, an artillery calculator for Hell Let Loose, and a Montessori visual timer for children.",
  discord: "https://discord.gg/PsuUYHAKkT",
};
