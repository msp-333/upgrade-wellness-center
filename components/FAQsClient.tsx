'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category?: string; // normalized below
};

/** Final category order (no "Sessions") */
const CATEGORY_ORDER = ['General', 'Booking', 'Policies', 'EES', 'RLT', 'HW', 'Payments'] as const;
type FinalCategory = typeof CATEGORY_ORDER[number];

/** Normalize incoming categories (e.g., legacy "Sessions" -> "General") */
function normalizeCategory(cat?: string): FinalCategory {
  const c = (cat ?? '').trim();
  if (!c) return 'General';
  if (/^sessions$/i.test(c)) return 'General';
  const known = CATEGORY_ORDER as readonly string[];
  return (known.includes(c) ? c : 'General') as FinalCategory;
}

export default function FAQsClient({ items }: { items: FAQ[] }) {
  /* ---------- categories (ordered; no counts) ---------- */
  const categories = useMemo(() => {
    const set = new Set<FinalCategory>();
    items.forEach((i) => set.add(normalizeCategory(i.category)));
    const order = (c: FinalCategory) => CATEGORY_ORDER.indexOf(c);
    return Array.from(set).sort((a, b) => order(a) - order(b) || a.localeCompare(b));
  }, [items]);

  const [tab, setTab] = useState<FinalCategory>(categories[0] ?? 'General');
  useEffect(() => {
    if (!categories.includes(tab)) setTab(categories[0] ?? 'General');
  }, [categories, tab]);

  /* ---------- search (tab-first; auto-expand when no matches) ---------- */
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const { list: filtered, autoExpanded } = useMemo(() => {
    const inTab = items
      .map((i) => ({ ...i, category: normalizeCategory(i.category) }))
      .filter((i) => i.category === tab);

    const hay = (arr: FAQ[]) =>
      arr.filter((i) => (`${i.question} ${i.answer}`.toLowerCase()).includes(q));

    if (!q) return { list: inTab.sort(byQuestion), autoExpanded: false };

    const tabMatches = hay(inTab).sort(byQuestion);
    if (tabMatches.length) return { list: tabMatches, autoExpanded: false };

    const allMatches = hay(items.map((i) => ({ ...i, category: normalizeCategory(i.category) }))).sort(byQuestion);
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
            <mark key={i} className="bg-brand-200/40 text-text-primary rounded-sm px-0.5">
              {p}
            </mark>
          ) : (
            <span key={i}>{p}</span>
          ),
        )}
      </>
    );
  };

  /* ---------- deep-link: open/scroll to #id ---------- */
  useEffect(() => {
    const openFromHash = () => {
      const hash = (typeof window !== 'undefined' && window.location.hash.replace('#', '')) || '';
      if (!hash) return;
      const found = items.find((i) => i.id === hash);
      if (!found) return;
      const cat = normalizeCategory(found.category);
      setTab(cat);
      // Allow tab switch to render, then open details
      setTimeout(() => {
        const el = document.getElementById(hash) as HTMLDetailsElement | null;
        if (!el) return;
        el.open = true;
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [items]);

  /* ---------- keyboard: "/" to focus search, Esc clears ---------- */
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape' && document.activeElement === searchRef.current) {
        setQuery('');
        searchRef.current?.blur();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ---------- FAQPage JSON-LD (SEO) ---------- */
  const jsonLd = useMemo(() => {
    const all = items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: i.answer },
    }));
    return { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: all };
  }, [items]);

  return (
    <div className="min-h-screen bg-surface text-text-primary">
      {/* Header — soft brand gradient, consistent with Services */}
      <section className="relative isolate overflow-hidden text-white">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-800 via-brand-700 to-brand-600" />
        <div className="absolute inset-0 -z-10 bg-hero-radial opacity-80" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <h1 className="text-center text-3xl md:text-4xl font-semibold tracking-tight">
            How can we help?
          </h1>

          {/* Search */}
          <div className="mt-6 md:mt-7 flex justify-center">
            <form onSubmit={(e) => e.preventDefault()} role="search" className="relative w-full max-w-2xl">
              <input
                ref={searchRef}
                aria-label="Search FAQs"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={q ? 'Searching… (Esc to clear)' : `Search ${tab}  —  press /`}
                className="w-full rounded-pill bg-white text-text-primary placeholder:text-slate-500 px-5 py-4 pr-12 shadow-soft outline-none ring-2 ring-transparent focus:ring-brand-400/70"
              />
              <button
                aria-label="Search"
                className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center rounded-pill px-4 py-2 bg-brand-600 hover:bg-brand-700 transition text-white"
              >
                <SearchIcon />
              </button>
            </form>
          </div>

          {/* Category chips — match site pills; mobile scroll */}
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
                      ? 'bg-white text-brand-800 shadow-soft ring-1 ring-white/60'
                      : 'bg-white/10 text-white/90 hover:bg-white/15',
                  ].join(' ')}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Results — white cards like Services page */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 pb-28">
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
                  className="group rounded-[20px] border border-slate-200 bg-white p-5 md:p-5 shadow-soft open:border-brand-300"
                >
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 rounded-full bg-brand-100 p-1 text-brand-700">
                        <QIcon />
                      </span>

                      <div className="flex-1 text-base md:text-lg">{mark(f.question)}</div>

                      {/* Hash link (appears on hover for copy/share) */}
                      <a
                        href={`#${f.id}`}
                        aria-label="Copy link to this question"
                        className="opacity-0 group-hover:opacity-100 transition text-slate-400 hover:text-brand-700 mt-0.5"
                      >
                        <LinkIcon />
                      </a>

                      {/* Chevron */}
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

      {/* FAQPage JSON-LD for SEO */}
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
function LinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M3.9 12a5 5 0 0 1 5-5h3v2h-3a3 3 0 1 0 0 6h3v2h-3a5 5 0 0 1-5-5Zm6-1h4v2h-4v-2Zm5.1-4h3a5 5 0 0 1 0 10h-3v-2h3a3 3 0 1 0 0-6h-3V7Z"/>
    </svg>
  );
}
function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
