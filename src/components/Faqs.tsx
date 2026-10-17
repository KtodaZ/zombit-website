import type { Faq } from "@/data/apps";

/**
 * Questions and answers, all open. Collapsed accordions hide the answer from a reader skimming
 * the page, and answer engines weigh visible text; there are few enough questions to show them.
 */
export function Faqs({ faq }: { faq: Faq[] }) {
  return (
    <dl className="mt-6 grid gap-x-14 gap-y-8 md:grid-cols-2">
      {faq.map((f) => (
        <div key={f.q} className="max-w-[var(--measure-read)] border-t border-rule-soft pt-4">
          <dt className="font-display text-[1.125rem] leading-snug text-ink">{f.q}</dt>
          <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-soft">{f.a}</dd>
        </div>
      ))}
    </dl>
  );
}
