// app/faqs/page.tsx
import Link from 'next/link';
import Container from '@/components/Container';
import faqs from '@/data/faqs.json';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  section?: string; // optional, used for grouping
};

export const metadata = {
  title: 'FAQs',
  description: 'Common questions about our programs, services, and studio policies.',
  alternates: { canonical: '/faqs' },
  robots: { index: true, follow: true },
};

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export default function FAQsPage({
  searchParams,
}: {
  searchParams?: { q?: string };
}) {
  const items = faqs as FAQ[];
  const q = (searchParams?.q ?? '').trim();

  // Filter by query (server side; no client JS)
  const filtered = q
    ? items.filter((it) =>
        (it.question + ' ' + it.answer).toLowerCase().includes(q.toLowerCase())
      )
    : items;

  // Group by section (fallback to "General")
  const grouped = filtered.reduce((acc, it) => {
    const key = it.section?.trim() || 'General';
    (acc[key] ||= []).push(it);
    return acc;
  }, {} as Record<string, FAQ[]>);

  const sections = Object.keys(grouped);

  // Minimal FAQPage JSON-LD (top 12 QAs)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filtered.slice(0, 12).map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };

  const resultCount = filtered.length;
  const totalCount = items.length;

  return (
    <Container className="py-12 md:py-16">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
          FAQs — Energy Enhancement System, Red Light Therapy & Hydrogen Water
        </h1>
        <p className="mt-3 text-slate-600">
          Answers about booking, policies, and what to expect from each service.
        </p>

        {/* Disclaimer callout */}
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
          <p className="text-sm">
            <strong>Disclaimer:</strong> These services are wellness modalities and are not intended
            to diagnose, treat, cure, or prevent disease. Always consult your licensed healthcare
            provider for medical concerns.
          </p>
        </div>

        {/* Search (GET) */}
        <form method="get" className="mt-6 flex items-center gap-2">
          <label htmlFor="q" className="sr-only">
            Search FAQs
          </label>
          <input
            id="q"
            name="q"
            defaultValue={q}
            placeholder="Search FAQs (e.g., cancellation, eye protection)"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          {q ? (
            <Link
              href="/faqs"
              className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              Clear
            </Link>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              Search
            </button>
          )}
        </form>

        <p className="mt-2 text-xs text-slate-500">
          {q
            ? `Showing ${resultCount} of ${totalCount} FAQs for “${q}”.`
            : `Showing ${totalCount} FAQs.`}
        </p>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
        {/* Sticky in-page nav (sections) */}
        <nav
          aria-label="On this page"
          className="hidden lg:block lg:sticky lg:top-24 self-start"
        >
          <div className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 shadow-sm backdrop-blur">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              On this page
            </p>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              {sections.map((sec) => (
                <li key={sec}>
                  <a href={`#${slugify(sec)}`} className="hover:underline">
                    {sec}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        {/* Main FAQ content */}
        <div className="space-y-10">
          {sections.map((sec) => {
            const list = grouped[sec];
            return (
              <section
                key={sec}
                id={slugify(sec)}
                aria-labelledby={`${slugify(sec)}-title`}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3">
                  <h2
                    id={`${slugify(sec)}-title`}
                    className="text-xl md:text-2xl font-semibold tracking-tight text-slate-900"
                  >
                    {sec}
                  </h2>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 ring-1 ring-inset ring-emerald-200">
                    {list.length}
                  </span>
                </div>

                <div className="mt-4 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur">
                  {list.map((f, i) => (
                    <details
                      key={f.id}
                      className="group open:bg-white/90"
                    >
                      <summary className="flex cursor-pointer list-none items-start gap-3 px-4 py-3 text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500">
                        {/* Index bubble */}
                        <span
                          aria-hidden
                          className="mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ring-1 ring-slate-300 text-slate-600 group-open:bg-emerald-100 group-open:text-emerald-700 group-open:ring-emerald-200"
                        >
                          {i + 1}
                        </span>
                        <span className="flex-1 font-medium">{f.question}</span>
                        {/* Chevron */}
                        <svg
                          className="mt-1 h-4 w-4 shrink-0 text-slate-500 transition-transform group-open:rotate-180"
                          viewBox="0 0 20 20"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M6 8l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </summary>
                      <div className="px-4 pb-4 pt-1 text-slate-700">
                        <p className="leading-7">{f.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            );
          })}

          <div>
            <a
              href="#top"
              className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              ↑ Back to top
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
