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
  // Build categories (unique), ordered by CATEGORY_ORDER then A→Z
  const categories = useMemo(() => {
    const uniq = new Set<string>();
    items.forEach((i) => uniq.add(i.category ?? 'General'));
    const arr = Array.from(uniq);

    const idx = (c: string) => {
      const i = CATEGORY_ORDER.indexOf(c);
      return i === -1 ? 999 : i;
    };

    return arr.sort((a, b) => {
      const d = idx(a) - idx(b);
      return d !== 0 ? d : a.localeCompare(b);
    });
  }, [items]);

  // Default to first category so not everything shows at once
  const [tab, setTab] = useState<string>(categories[0] ?? 'General');
  useEffect(() => {
    if (!categories.includes(tab)) setTab(categories[0] ?? 'General');
  }, [categories, tab]);

  const [query, setQuery] = useState('');

  const q = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    const list = items.filter((i) => {
      const inTab = (i.category ?? 'General') === tab;
      if (!q) return inTab;
      const hay = `${i.question} ${i.answer}`.toLowerCase();
      return inTab && hay.includes(q);
    });
    // Sort A→Z by question for stable UX
    return list.sort((a, b) => a.question.localeCompare(b.question));
  }, [items, tab, q]);

  // Featured = first six of current category (also filtered by search if any)
  const featured = useMemo(() => filtered.slice(0, 6), [filtered]);

  const mark = (text: string) => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'ig'));
    return (
      <>
        {parts.map((p, idx) =>
          p.toLowerCase() === q ? (
            <mark
              key={idx}
              className="bg-lavender-400/40 text-text-primary rounded-sm px-0.5"
            >
              {p}
            </mark>
          ) : (
            <span key={idx}>{p}</span>
          )
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* HERO / SEARCH */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <DecorShapes />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">How can we help?</h1>

          {/* Search bar */}
          <div className="mt-6 flex justify-center">
            <form
              className="relative w-full max-w-2xl"
              onSubmit={(e) => e.preventDefault()}
              role="search"
            >
              <input
                aria-label="Search FAQs"
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

          {/* Tabs / chips (no All) */}
          <div className="mt-6 inline-flex flex-wrap justify-center gap-2 bg-white/10 p-1 rounded-pill backdrop-blur">
            {categories.map((c) => {
              const active = tab === c;
              return (
                <button
                  key={c}
                  onClick={() => setTab(c)}
                  aria-pressed={active}
                  className={[
                    'px-4 py-2 rounded-pill text-sm md:text-base transition',
                    active
                      ? 'bg-white text-brand-800 shadow-soft'
                      : 'text-white/85 hover:bg-white/10',
                  ].join(' ')}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {/* Light info bar */}
          <p className="mt-5 text-white/80">
            Can’t find what you need?{' '}
            <a
              href="/contact"
              className="underline decoration-white/40 underline-offset-4 hover:text-white"
            >
              Contact us
            </a>
            .
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <h2 className="text-center text-xl md:text-2xl font-semibold text-text-primary">
          Featured in {tab}
        </h2>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((f) => (
            <a
              key={f.id}
              href={`#${f.id}`}
              className="group block rounded-card border border-slate-200/60 bg-white p-5 hover:border-brand-300 hover:shadow-soft transition"
            >
              <p className="text-sm uppercase tracking-wide text-text-secondary">
                {f.category ?? 'General'}
              </p>
              <h3 className="mt-1 font-medium text-text-primary group-hover:text-brand-700">
                {f.question}
              </h3>
            </a>
          ))}
          {featured.length === 0 && (
            <div className="rounded-card border border-slate-200/60 bg-white p-6 text-center text-text-secondary">
              No featured items in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* RESULTS / ACCORDION */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-16">
        {filtered.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <div className="space-y-3">
            {filtered.map((f) => (
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
                    <div className="flex-1 text-lg text-text-primary">
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
          </div>
        )}
      </section>
    </div>
  );
}

/* ---------- helpers ---------- */

function EmptyState({ query }: { query: string }) {
  return (
    <div className="rounded-card border border-slate-200 bg-white p-8 text-center">
      <p className="text-lg font-medium text-text-primary">No results</p>
      <p className="mt-1 text-text-secondary">
        We couldn’t find any FAQs for “{query}”. Try a different keyword or{' '}
        <a href="/contact" className="text-brand-700 underline underline-offset-4">
          contact us
        </a>
        .
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
  return s.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&');
}
