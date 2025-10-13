'use client';

import { useEffect, useMemo, useState } from 'react';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category?: string; // normalized by page.tsx
};

const CATEGORY_ORDER = ['General', 'Booking', 'Sessions', 'Payments', 'Policies'];

export default function FAQsClient({ items }: { items: FAQ[] }) {
  // Categories in preferred order with counts
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((i) => {
      const c = i.category ?? 'General';
      counts.set(c, (counts.get(c) ?? 0) + 1);
    });

    const ordered = Array.from(counts.keys()).sort((a, b) => {
      const ai = CATEGORY_ORDER.indexOf(a);
      const bi = CATEGORY_ORDER.indexOf(b);
      const ar = ai === -1 ? 999 : ai;
      const br = bi === -1 ? 999 : bi;
      return ar - br || a.localeCompare(b);
    });

    return ordered.map((c) => ({ name: c, count: counts.get(c)! }));
  }, [items]);

  // Default to first category (not "All") → reduces clutter
  const [tab, setTab] = useState<string>(categories[0]?.name ?? 'General');
  useEffect(() => {
    if (!categories.find((c) => c.name === tab)) setTab(categories[0]?.name ?? 'General');
  }, [categories, tab]);

  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  // Filter within selected category; then sort A→Z
  const inCategory = useMemo(() => {
    const list = items.filter((i) => (i.category ?? 'General') === tab);
    return list.sort((a, b) => a.question.localeCompare(b.question));
  }, [items, tab]);

  // Search inside current category only (keeps results focused)
  const filtered = useMemo(() => {
    if (!q) return inCategory;
    return inCategory.filter((i) =>
      (`${i.question} ${i.answer}`.toLowerCase()).includes(q)
    );
  }, [inCategory, q]);

  // Quick answers (first 3 of the filtered set) — removed from the main list to avoid duplication
  const quick = useMemo(() => filtered.slice(0, 3), [filtered]);
  const quickIds = useMemo(() => new Set(quick.map((f) => f.id)), [quick]);

  // Main list with “show more” pagination to keep things light
  const MAIN_PAGE = 6;
  const [limit, setLimit] = useState(MAIN_PAGE);
  useEffect(() => setLimit(MAIN_PAGE), [tab, q]); // reset when category/search changes
  const main = useMemo(() => filtered.filter((f) => !quickIds.has(f.id)).slice(0, limit), [filtered, quickIds, limit]);
  const hasMore = filtered.filter((f) => !quickIds.has(f.id)).length > limit;

  const mark = (text: string) => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'ig'));
    return (
      <>
        {parts.map((p, idx) =>
          p.toLowerCase() === q ? (
            <mark key={idx} className="bg-lavender-400/40 text-text-primary rounded-sm px-0.5">
              {p}
            </mark>
          ) : (
            <span key={idx}>{p}</span>
          ),
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* HERO */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <DecorShapes />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h1 className="text-center text-3xl md:text-4xl font-semibold tracking-tight">
            How can we help?
          </h1>

          {/* Search */}
          <div className="mt-6 flex justify-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              role="search"
              className="relative w-full max-w-2xl"
            >
              <input
                aria-label="Search FAQs within current category"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type your question"
                className="w-full rounded-pill bg-white text-text-primary placeholder:text-text-secondary/70 px-5 py-4 pr-12 shadow-soft outline-none ring-2 ring-transparent focus:ring-lavender-500/60"
              />
              <button
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-pill px-4 py-2 bg-brand-600 hover:bg-brand-700 transition"
              >
                <SearchIcon />
              </button>
            </form>
          </div>

          {/* Tabs */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map(({ name, count }) => {
              const active = tab === name;
              return (
                <button
                  key={name}
                  onClick={() => setTab(name)}
                  aria-pressed={active}
                  className={[
                    'rounded-pill px-4 py-2 text-sm md:text-base transition flex items-center gap-2',
                    active ? 'bg-white text-brand-800 shadow-soft' : 'bg-white/10 text-white/90 hover:bg-white/15',
                  ].join(' ')}
                >
                  <span>{name}</span>
                  <span className={active ? 'text-brand-700' : 'text-white/70'}>· {count}</span>
                </button>
              );
            })}
          </div>

          {/* Hint */}
          <p className="mt-4 text-center text-white/80">
            Can’t find what you need?{' '}
            <a href="/contact" className="underline decoration-white/40 underline-offset-4 hover:text-white">
              Contact us
            </a>
            .
          </p>
        </div>
      </section>

      {/* QUICK ANSWERS */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-base md:text-lg font-semibold text-text-primary">
            Quick answers in <span className="text-brand-700">{tab}</span>
          </h2>
          {q && (
            <div className="text-sm text-text-secondary">
              {filtered.length} result{filtered.length === 1 ? '' : 's'}
            </div>
          )}
        </div>

        {quick.length ? (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {quick.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                className="group rounded-card border border-slate-200/60 bg-white p-4 hover:border-brand-300 hover:shadow-soft transition"
              >
                <p className="text-xs uppercase tracking-wide text-text-secondary"> {f.category ?? 'General'} </p>
                <h3 className="mt-1 font-medium text-text-primary group-hover:text-brand-700">
                  {mark(f.question)}
                </h3>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-card border border-slate-200/60 bg-white p-6 text-center text-text-secondary">
            No quick answers found in this category.
          </div>
        )}
      </section>

      {/* MAIN LIST (accordion; collapsed by default) */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        {main.length === 0 ? (
          <EmptyState query={query} tab={tab} />
        ) : (
          <div className="space-y-3">
            {main.map((f) => (
              <details
                key={f.id}
                id={f.id}
                className="group rounded-card bg-white p-5 shadow-soft border border-slate-200/70 open:border-brand-300"
              >
                <summary className="cursor-pointer list-none">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 shrink-0 rounded-full bg-brand-100 p-1 text-brand-700">
                      <QIcon />
                    </span>
                    <div className="flex-1 text-base md:text-lg text-text-primary">
                      {mark(f.question)}
                    </div>
                    <span className="ml-2 mt-1 shrink-0 rounded-full border border-slate-200 px-2 py-0.5 text-xs text-text-secondary group-open:bg-brand-50 group-open:text-brand-800">
                      {f.category ?? 'General'}
                    </span>
                  </div>
                </summary>

                <div className="mt-3 pl-9 text-text-secondary">
                  <p className="whitespace-pre-line">{mark(f.answer)}</p>
                </div>
              </details>
            ))}

            {hasMore && (
              <div className="pt-4">
                <button
                  onClick={() => setLimit((n) => n + MAIN_PAGE)}
                  className="mx-auto block rounded-pill bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition"
                >
                  Show more
                </button>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- helpers ---------- */

function EmptyState({ query, tab }: { query: string; tab: string }) {
  return (
    <div className="rounded-card border border-slate-200 bg-white p-8 text-center">
      <p className="text-lg font-medium text-text-primary">No results in {tab}</p>
      <p className="mt-1 text-text-secondary">
        {query
          ? <>We couldn’t find any FAQs for “{query}”. Try a shorter keyword or another category.</>
          : <>This category doesn’t have items yet. Please check another category.</>}
      </p>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" className="opacity-95">
      <path fill="currentColor" d="M15.5 14h-.79l-.28-.27a6.471 6.471 0 0 0 1.57-4.23A6.5 6.5 0 1 0 9.5 16.5a6.47 6.47 0 0 0 4.23-1.57l.27.28v.79L20 21.49 21.49 20 15.5 14Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"/>
    </svg>
  );
}

function QIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M12 2a10 10 0 1 0 6.32 17.78l2.45 2.45 1.41-1.41-2.45-2.45A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm-1-5h2v2h-2v-2Zm1-9a4 4 0 0 0-4 4h2a2 2 0 1 1 3.45 1.39c-.46.46-1.01.86-1.45 1.11V14h2v-.7c.77-.44 2-1.5 2-3.3a4 4 0 0 0-4-4Z"/>
    </svg>
  );
}

function DecorShapes() {
  return (
    <>
      <div className="pointer-events-none absolute -top-10 -left-10 h-56 w-56 rounded-[32px] bg-gradient-to-br from-brand-700 to-gradient-end opacity-30 blur-2xl animate-drift-1" />
      <div className="pointer-events-none absolute -bottom-12 -right-16 h-64 w-64 rounded-[32px] bg-lavender-600/40 opacity-40 blur-3xl animate-drift-2" />
    </>
  );
}

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
