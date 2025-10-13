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
  /* ---------- categories (ordered, with counts) ---------- */
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach((i) => {
      const c = i.category ?? 'General';
      counts.set(c, (counts.get(c) ?? 0) + 1);
    });

    const order = (c: string) => {
      const idx = CATEGORY_ORDER.indexOf(c);
      return idx === -1 ? 999 : idx;
    };

    return Array.from(counts.entries())
      .sort(([a], [b]) => order(a) - order(b) || a.localeCompare(b))
      .map(([name, count]) => ({ name, count }));
  }, [items]);

  const [tab, setTab] = useState<string>(categories[0]?.name ?? 'General');
  useEffect(() => {
    if (!categories.find((c) => c.name === tab)) setTab(categories[0]?.name ?? 'General');
  }, [categories, tab]);

  /* ---------- search ---------- */
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  // When searching, user can expand scope from current category to all
  const [searchAll, setSearchAll] = useState(false);
  useEffect(() => {
    if (!q) setSearchAll(false); // reset scope when query cleared
  }, [q]);

  /* ---------- filtered data (no duplication, A→Z) ---------- */
  const filtered = useMemo(() => {
    const scopeList =
      q && searchAll ? items : items.filter((i) => (i.category ?? 'General') === tab);

    const list = !q
      ? scopeList
      : scopeList.filter((i) => (`${i.question} ${i.answer}`.toLowerCase()).includes(q));

    return list.sort((a, b) => a.question.localeCompare(b.question));
  }, [items, tab, q, searchAll]);

  /* ---------- pagination (reduce clutter) ---------- */
  const PAGE = 8;
  const [limit, setLimit] = useState(PAGE);
  useEffect(() => setLimit(PAGE), [tab, q, searchAll]);
  const visible = filtered.slice(0, limit);
  const hasMore = filtered.length > limit;

  /* ---------- search highlighting ---------- */
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
      {/* Header / Search — light and calm */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-surface to-surface">
        <div className="absolute -right-24 -top-20 h-64 w-64 rounded-[32px] bg-brand-100 opacity-60 blur-2xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-[32px] bg-lavender-600/10 opacity-70 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
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
                aria-label="Search FAQs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`Search ${searchAll ? 'all categories' : tab}`}
                className="w-full rounded-pill bg-white text-text-primary placeholder:text-text-secondary/70 px-5 py-4 pr-12 shadow-soft outline-none ring-2 ring-transparent focus:ring-lavender-500/60"
              />
              <button
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-pill px-4 py-2 bg-brand-600 hover:bg-brand-700 transition text-white"
              >
                <SearchIcon />
              </button>
            </form>
          </div>

          {/* Category tabs with counts */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {categories.map(({ name, count }) => {
              const active = tab === name && !searchAll;
              return (
                <button
                  key={name}
                  onClick={() => { setTab(name); setSearchAll(false); }}
                  aria-pressed={active}
                  className={[
                    'rounded-pill px-4 py-2 text-sm md:text-base transition inline-flex items-center gap-2',
                    active ? 'bg-white text-brand-800 shadow-soft ring-1 ring-brand-200'
                           : 'bg-white/70 text-text-primary hover:bg-white shadow-soft'
                  ].join(' ')}
                >
                  <span>{name}</span>
                  <span className={active ? 'text-brand-700' : 'text-text-secondary'}>· {count}</span>
                </button>
              );
            })}

            {/* Search-all toggle appears only when actively typing */}
            {q && (
              <button
                onClick={() => setSearchAll((v) => !v)}
                className={[
                  'rounded-pill px-4 py-2 text-sm md:text-base transition',
                  searchAll
                    ? 'bg-white text-brand-800 shadow-soft ring-1 ring-brand-200'
                    : 'bg-white/70 text-text-primary hover:bg-white shadow-soft',
                ].join(' ')}
                title="Search across all categories"
              >
                {searchAll ? 'Searching: All categories' : 'Search all'}
              </button>
            )}
          </div>

          {/* Small helper line */}
          <p className="mt-4 text-center text-text-secondary">
            Can’t find what you need?{' '}
            <a href="/contact" className="underline underline-offset-4 text-brand-700">
              Contact us
            </a>
            .
          </p>
        </div>
      </section>

      {/* Results (single clean list, no duplicates/“featured” section) */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {filtered.length === 0 ? (
          <div className="rounded-card border border-slate-200 bg-white p-8 text-center">
            <p className="text-lg font-medium">No results{q ? ` for “${query}”` : ''}</p>
            <p className="mt-1 text-text-secondary">
              Try a shorter keyword{q ? ' or search all categories' : ''}.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-base md:text-lg font-semibold">
                {q ? 'Results' : tab}{' '}
                <span className="text-text-secondary">· {filtered.length}</span>
              </h2>
              {filtered.length > PAGE && (
                <span className="text-sm text-text-secondary">
                  Showing {Math.min(limit, filtered.length)} of {filtered.length}
                </span>
              )}
            </div>

            <div className="space-y-3">
              {visible.map((f) => (
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
                      <div className="flex-1 text-base md:text-lg">{mark(f.question)}</div>
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
                <div className="pt-4 text-center">
                  <button
                    onClick={() => setLimit((n) => n + PAGE)}
                    className="rounded-pill bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 transition"
                  >
                    Show more
                  </button>
                </div>
              )}
            </div>
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
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
