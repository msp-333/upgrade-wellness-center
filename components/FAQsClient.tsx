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
  /* ---------- categories (ordered; no counts shown) ---------- */
  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(i.category ?? 'General'));
    const order = (c: string) => {
      const idx = CATEGORY_ORDER.indexOf(c);
      return idx === -1 ? 999 : idx;
    };
    return Array.from(set).sort((a, b) => order(a) - order(b) || a.localeCompare(b));
  }, [items]);

  const [tab, setTab] = useState<string>(categories[0] ?? 'General');
  useEffect(() => {
    if (!categories.includes(tab)) setTab(categories[0] ?? 'General');
  }, [categories, tab]);

  /* ---------- search (tab-first; auto-expand when no matches) ---------- */
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const { list: filtered, autoExpanded } = useMemo(() => {
    const inTab = items.filter((i) => (i.category ?? 'General') === tab);
    const hay = (arr: FAQ[]) =>
      arr.filter((i) => (`${i.question} ${i.answer}`.toLowerCase()).includes(q));
    if (!q) return { list: inTab.sort(byQuestion), autoExpanded: false };
    const tabMatches = hay(inTab).sort(byQuestion);
    if (tabMatches.length) return { list: tabMatches, autoExpanded: false };
    const allMatches = hay(items).sort(byQuestion);
    return { list: allMatches, autoExpanded: allMatches.length > 0 };
  }, [items, tab, q]);

  function byQuestion(a: FAQ, b: FAQ) {
    return a.question.localeCompare(b.question);
  }

  /* ---------- pagination (compact view) ---------- */
  const PAGE = 8;
  const [limit, setLimit] = useState(PAGE);
  useEffect(() => setLimit(PAGE), [tab, q]);
  const visible = filtered.slice(0, limit);
  const hasMore = filtered.length > limit;

  /* ---------- highlight ---------- */
  const mark = (text: string) => {
    if (!q) return text;
    const parts = text.split(new RegExp(`(${escapeRegExp(query)})`, 'ig'));
    return (
      <>
        {parts.map((p, i) =>
          p.toLowerCase() === q ? (
            <mark key={i} className="bg-lavender-400/40 text-text-primary rounded-sm px-0.5">
              {p}
            </mark>
          ) : (
            <span key={i}>{p}</span>
          ),
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      {/* Header — softened green + balanced paddings */}
      <section className="relative isolate overflow-hidden text-white">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-700 via-brand-600 to-gradient-end" />
        <div className="absolute inset-0 -z-10 bg-hero-radial opacity-90" />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-[32px] bg-brand-100/60 blur-2xl" />
        <div className="absolute -left-28 -bottom-28 h-80 w-80 rounded-[32px] bg-lavender-600/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <h1 className="text-center text-3xl md:text-4xl font-semibold tracking-tight">
            How can we help?
          </h1>

          {/* Search */}
          <div className="mt-6 md:mt-7 flex justify-center">
            <form
              onSubmit={(e) => e.preventDefault()}
              role="search"
              className="relative w-full max-w-2xl"
            >
              <input
                aria-label="Search FAQs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${tab}`}
                className="w-full rounded-pill bg-white text-text-primary placeholder:text-white/80 px-5 py-4 pr-12 shadow-soft outline-none ring-2 ring-transparent focus:ring-lavender-500/60"
              />
              <button
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-pill px-4 py-2 bg-brand-600 hover:bg-brand-700 transition text-white"
              >
                <SearchIcon />
              </button>
            </form>
          </div>

          {/* Category chips (no counts) — compact gap; mobile scroll */}
          <div className="mt-5 flex gap-2 overflow-x-auto px-1 sm:justify-center">
            {categories.map((name) => {
              const active = tab === name;
              return (
                <button
                  key={name}
                  onClick={() => setTab(name)}
                  aria-pressed={active}
                  className={[
                    'whitespace-nowrap rounded-pill px-4 py-2 text-sm md:text-base transition',
                    active
                      ? 'bg-white text-brand-800 shadow-soft ring-1 ring-white/50'
                      : 'bg-white/10 text-white/90 hover:bg-white/15'
                  ].join(' ')}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results — tighter rhythm, more bottom space */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 pb-32">
        {q && autoExpanded && filtered.length > 0 && (
          <p className="mb-3 text-center text-sm text-text-secondary">
            No matches in <span className="font-medium">{tab}</span>. Showing matches from all categories.
          </p>
        )}

        {filtered.length === 0 ? (
          <div className="rounded-card border border-slate-200 bg-white p-7 md:p-8 text-center">
            <p className="text-lg font-medium">No results{q ? ` for “${query}”` : ''}</p>
            <p className="mt-1 text-text-secondary">Try a different keyword.</p>
          </div>
        ) : (
          <>
            <div className="space-y-2.5 md:space-y-3">
              {visible.map((f) => (
                <details
                  key={f.id}
                  id={f.id}
                  className="group rounded-card bg-white p-5 md:p-5 shadow-soft border border-slate-200/70 open:border-brand-300"
                >
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 rounded-full bg-brand-100 p-1 text-brand-700">
                        <QIcon />
                      </span>

                      <div className="flex-1 text-base md:text-lg">{mark(f.question)}</div>

                      {/* Chevron button (visible + rotates on open) */}
                      <span
                        aria-hidden="true"
                        className="ml-2 mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-transform group-open:rotate-180 group-open:bg-brand-50 group-open:text-brand-700"
                      >
                        <ChevronDownIcon />
                      </span>
                    </div>
                  </summary>

                  <div className="mt-3 pl-9 text-text-secondary">
                    <p className="whitespace-pre-line">{mark(f.answer)}</p>
                  </div>
                </details>
              ))}

              {hasMore && (
                <div className="pt-3 text-center">
                  <button
                    onClick={() => setLimit((n) => n + PAGE)}
                    className="rounded-pill bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition"
                  >
                    Show more
                  </button>
                </div>
              )}
            </div>

            {/* Bottom helper */}
            <p className="mt-12 text-center text-text-secondary">
              Can’t find what you need?{' '}
              <a href="/contact" className="underline underline-offset-4 text-brand-700">
                Contact us
              </a>
              .
            </p>
          </>
        )}
      </section>
    </div>
  );
}

/* ---------- icons & util ---------- */
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
function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
    </svg>
  );
}
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
