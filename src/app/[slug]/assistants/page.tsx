import type { Metadata } from "next";
import Link from "next/link";
import { Masthead, Colophon, Crumbs } from "@/components/Chrome";
import { JsonLd } from "@/components/JsonLd";
import { Faqs } from "@/components/Faqs";
import { organization, breadcrumbs, webPage, faqPage } from "@/lib/schema";
import { bySlug, privacyPath, type Faq } from "@/data/apps";
import { ASSISTANTS_LIVE, CONNECTOR_URL } from "@/data/flags";
import { SITE_ROOT } from "@/lib/site";
import { pageMeta } from "@/lib/meta";

/*
 * Every claim on this page is grounded in the connector as built: always-on-time-cloud
 * docs/ASSISTANT_CONNECTOR.md and ASSISTANT_PROTOCOL.md (branch assistant/server), and the app's
 * Connected assistants strings (calendar-meeting-alarm, strings_connected_assistants.xml). If the
 * connector changes, check this page against those first.
 */

export const dynamicParams = false;

/** Only Always On Time has an assistant connector. */
export function generateStaticParams() {
  return [{ slug: "always-on-time" }];
}

const PATH = "/always-on-time/assistants/";
const TITLE = "Connect Claude or ChatGPT to Always On Time";
const DESCRIPTION =
  "Ask Claude or ChatGPT what will ring, or have it change your Always On Time alarms. How to add the connector, what the assistant can and cannot see, and how to disconnect.";

export function generateMetadata(): Metadata {
  return pageMeta({
    title: TITLE,
    description: DESCRIPTION,
    path: PATH,
    og: "/og/always-on-time.png",
    noindex: !ASSISTANTS_LIVE,
  });
}

const FAQ: Faq[] = [
  {
    q: "Does connecting an assistant cost anything?",
    a: "No. The connector is free in Always On Time and does not need Plus. Your assistant’s own plan decides whether you can add custom connectors.",
  },
  {
    q: "Which assistants work with Always On Time?",
    a: "Claude and ChatGPT, and other assistants that support MCP connectors. Only Claude and ChatGPT are shown by name in the app; any other client appears as “Unverified app”, together with the web address its sign-in returns to.",
  },
  {
    q: "Can the assistant read or edit my calendar?",
    a: "No. It never reads your calendar or creates or edits events. It sees the titles and times of upcoming events your phone already watches, and it can change only Always On Time’s alarm settings. For anything about the events themselves, use your assistant’s calendar connector.",
  },
  {
    q: "What happens if my phone is offline?",
    a: "The change is saved to your account, and your phone applies it the next time it syncs. Your alarms keep ringing on the phone as usual in the meantime.",
  },
  {
    q: "How do I disconnect?",
    a: "In the app, open Settings › Connected assistants and tap Disconnect, or remove the connector in your assistant. Disconnecting the last assistant deletes the shared copy of your upcoming alarms, the phone’s registration, and the change log right away.",
  },
];

const h2 = "font-display text-[1.375rem] leading-snug text-ink";

export default function AssistantsPage() {
  const app = bySlug("always-on-time")!;
  const trail: [string, string][] = [
    ["Zombit Studios", "/"],
    [app.name, "/always-on-time/"],
    ["AI assistants", PATH],
  ];

  return (
    <>
      <JsonLd data={organization} />
      <JsonLd data={webPage(PATH, TITLE, DESCRIPTION, app.slug)} />
      <JsonLd data={faqPage(`${SITE_ROOT}${PATH}`, FAQ)} />
      <JsonLd data={breadcrumbs(trail.slice(1))} />
      <Masthead current={app.slug} />
      <main id="main" className="mx-auto max-w-[var(--measure-page)] px-6 sm:px-8">
        <header className="border-b border-rule pt-10 pb-10 sm:pt-14 sm:pb-12">
          <Crumbs trail={trail} />
          <h1 className="mt-6 max-w-[var(--measure-doc)] font-display text-[2rem] leading-[1.14] tracking-[-0.015em] text-ink sm:text-[2.5rem]">
            {TITLE}
          </h1>
          <p className="mt-4 max-w-[var(--measure-doc)] text-[1.0625rem] leading-relaxed text-ink-soft">
            Ask your assistant what will ring, or have it change your alarms. It is free, needs no
            Plus, and nothing is shared until you connect one.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2 text-[0.9375rem] text-ink">
            {["What rings tomorrow morning?", "Make my 3pm ring 15 minutes earlier", "Pause alarms until Monday"].map(
              (e) => (
                <li key={e} className="border border-rule-soft bg-plate px-3 py-1.5 font-display italic">
                  “{e}”
                </li>
              ),
            )}
          </ul>
          {!ASSISTANTS_LIVE && (
            <p
              role="note"
              className="mt-8 max-w-[var(--measure-doc)] border-l-2 border-ink pl-4 text-[0.9375rem] leading-relaxed text-ink"
            >
              <strong className="font-semibold">Not available yet.</strong> The connector is still being
              rolled out. This page describes how it will work; the address below will not connect
              until it is live.
            </p>
          )}
        </header>

        <div className="doc max-w-[var(--measure-doc)] py-10 text-[1rem] leading-[1.7] text-ink-soft sm:py-14 [&>*+*]:mt-4">
          <h2 className={h2} id="before-you-start">
            Before you start
          </h2>
          <ul>
            <li>Always On Time installed on your Android phone.</li>
            <li>
              Signed in with Google under <strong className="text-ink">Settings › Account &amp; sync</strong>.
              Assistants reach your alarms through account sync, so the connection works only for an
              account that has turned it on.
            </li>
          </ul>
          <p>The connector address you will paste:</p>
          <p>
            <code className="block w-fit max-w-full select-all break-all px-3 py-2 text-[0.9375rem]">
              {CONNECTOR_URL}
            </code>
          </p>

          <h2 className={h2} id="claude">
            Connect Claude
          </h2>
          <ol>
            <li>
              In Claude, go to <strong className="text-ink">Customize › Connectors</strong>, choose{" "}
              <strong className="text-ink">+ Add</strong>, then{" "}
              <strong className="text-ink">Add custom connector</strong>.
            </li>
            <li>Name it “Always On Time”, paste the connector address, and continue.</li>
            <li>
              Sign in with Google when asked, using the account you sync with in the app, and approve.
            </li>
            <li>
              In a chat, open <strong className="text-ink">+ › Connectors</strong> and make sure Always On
              Time is switched on.
            </li>
          </ol>
          <p>
            On Team and Enterprise plans an owner adds the connector once under Organization settings,
            then each member connects it. Anthropic keeps the current steps in its{" "}
            <a href="https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp">
              custom connector guide
            </a>
            .
          </p>

          <h2 className={h2} id="chatgpt">
            Connect ChatGPT
          </h2>
          <ol>
            <li>
              In ChatGPT settings, open <strong className="text-ink">Apps</strong>, then{" "}
              <strong className="text-ink">Advanced settings</strong>, and turn on{" "}
              <strong className="text-ink">Developer mode</strong>.
            </li>
            <li>Create a new app or connector, name it “Always On Time”, and paste the connector address.</li>
            <li>Choose OAuth sign-in, then sign in with Google and approve.</li>
          </ol>
          <p>
            Which ChatGPT plans can add custom connectors, and the exact menu names, change from time to
            time. If yours look different, check OpenAI’s{" "}
            <a href="https://help.openai.com/en/articles/12584461">Developer mode help article</a>.
          </p>

          <h2 className={h2} id="approve">
            Signing in and the setup test
          </h2>
          <p>
            Adding the connector opens the Always On Time connection page. Sign in with the Google account
            you use in the app, review what the assistant can see and change, and approve. Signing in
            there does not give the assistant your Google account.
          </p>
          <p>
            The first time the assistant uses the connection, it runs a setup test: your phone shows a
            notification such as “Claude is connected to Always On Time. Message received.” If the
            assistant says to open the app first, open Always On Time on your phone and ask again.
          </p>
          <p>
            Only Claude and ChatGPT are shown by name. Anything else appears as “Unverified app”,
            together with the web address its sign-in returns to. If you did not add it yourself, disconnect it.
          </p>

          <h2 className={h2} id="what-it-can-do">
            What an assistant can do
          </h2>
          <ul>
            <li>Tell you which alarms will ring, and when, for the next 30 days on calendars the app watches.</li>
            <li>Explain why an event rings when it does, or why it has no alarm.</li>
            <li>List your calendars and alarm settings, and the last 14 days of alarm history.</li>
            <li>
              Change alarms for one event, every event in a recurring series, a whole calendar, or the app
              as a whole.
            </li>
            <li>Pause every alarm until a time, or until you resume them.</li>
            <li>Undo one of its own changes from the last 30 days.</li>
            <li>Give you a link that opens the right screen in the app, for things it cannot change.</li>
          </ul>

          <h2 className={h2} id="what-it-cannot-do">
            What it cannot do
          </h2>
          <ul>
            <li>Read or change your calendar, or create, edit, or delete events.</li>
            <li>
              See event descriptions, attendees, locations, meeting links, or the places you travel from
              and to.
            </li>
            <li>
              Change sounds, voices, or Android permissions. Those stay on the phone; the assistant can
              send you a link to the right screen instead.
            </li>
            <li>See events more than 30 days ahead, or on calendars the app does not watch.</li>
          </ul>

          <h2 className={h2} id="changes">
            When an assistant changes something
          </h2>
          <p>
            Your phone stays in charge. The assistant changes the same settings that account sync already
            carries between your phones, and your phone applies them like a change from another phone of
            yours.
          </p>
          <p>
            Before a change that could stop alarms from ringing or being heard (pausing alarms, turning
            alarms off, no longer watching a calendar, or making alarms quieter), the assistant is told
            to check with you first. When your phone applies such a change, it shows a notification, for
            example “Claude paused your alarms”, with an <strong className="text-ink">Undo</strong> button.
          </p>
          <p>
            Every change appears under <strong className="text-ink">Settings › Connected assistants ›
            Activity</strong> for 30 days. You can undo each one until then, as long as nothing has changed
            those settings since.
          </p>

          <h2 className={h2} id="privacy">
            Privacy
          </h2>
          <ul>
            <li>
              While an assistant is connected, your phone keeps a copy of its upcoming alarms in your
              account for it: event titles, start and end times, calendar names, and alarm settings for
              the next 30 days. It never includes descriptions, attendees, locations, meeting links, or
              travel places.
            </li>
            <li>
              You can see exactly what it can read under{" "}
              <strong className="text-ink">Settings › Connected assistants › See what your assistant can
              see</strong>.
            </li>
            <li>
              What the assistant reads is sent to its provider, such as Anthropic or OpenAI, and from then
              on that provider’s privacy policy applies to it.
            </li>
            <li>Connections that go unused for 90 days are removed.</li>
            <li>
              Disconnect any time in <strong className="text-ink">Settings › Connected assistants</strong>, or
              in your assistant. Disconnecting the last one deletes the shared copy, your phone’s
              registration, and the change log right away. Your alarms keep ringing on the phone.
            </li>
          </ul>
          <p>
            The full details are in the{" "}
            <Link href={`${privacyPath(app)}#assistants`}>Always On Time privacy policy</Link>.
          </p>
        </div>

        <section aria-labelledby="assistant-questions" className="border-t border-rule py-12 sm:py-16">
          <h2 id="assistant-questions" className={h2}>
            Questions
          </h2>
          <Faqs faq={FAQ} />
        </section>
      </main>
      <Colophon app={app} />
    </>
  );
}
