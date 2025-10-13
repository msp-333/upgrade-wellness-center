'use client';

import { useMemo, useRef, useState } from 'react';

export type Item = {
  title: string;
  price: string;         // display-ready (e.g., "$120")
  period?: string;       // e.g., "per year"
  badge?: string;        // e.g., "Required", "Premium", "Special"
  tone?: 'brand' | 'premium' | 'special';
  description: string[]; // paragraphs
  ctaHref?: string;
  ctaLabel?: string;
};

export type PricingData = {
  membership: Item[];
  sessions: Item[];
  overnight: Item[];
  packages: Item[];
};

const LABELS: Record<keyof PricingData, string> = {
  membership: 'Membership',
  sessions: 'Sessions',
  overnight: 'Overnight',
  packages: 'Packages',
};

export default function PricingClient({ data }: { data: PricingData }) {
  const tabs = useMemo(
    () => (Object.keys(LABELS) as (keyof PricingData)[]),
    []
  );

  const [tab, setTab] = useState<keyof PricingData>('membership');
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const items = data[tab];

  const gotoMembership = () => {
    setTab('membership');
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-surface text-text-primary">
      {/* Hero */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div className="absolute -right-24 -top-20 h-64 w-64 rounded-[32px] bg-gradient-to-br from-brand-700 to-gradient-end opacity-30 blur-2xl" />
        <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-[32px] bg-lavender-600/40 opacity-40 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Our Pricing</h1>
          <p className="mx-auto mt-3 max-w-2xl text-white/85">
            Straightforward options to help you recharge—no surprises.
          </p>

          {/* Tabs */}
          <div
            role="tablist"
            aria-label="Pricing categories"
            className="mt-6 inline-flex flex-wrap justify-center gap-2 rounded-pill bg-white/10 p-1 backdrop-blur"
          >
            {tabs.map((key) => {
              const active = tab === key;
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(key)}
                  className={[
                    'px-4 py-2 rounded-pill text-sm md:text-base transition',
                    active
                      ? 'bg-white text-brand-800 shadow-soft'
                      : 'text-white/85 hover:bg-white/10',
                  ].join(' ')}
                >
                  {LABELS[key]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Membership notice */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="rounded-card border border-brand-300/40 bg-brand-100 p-5 md:p-6 shadow-soft">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white shrink-0">
              <InfoIcon />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-brand-800">Membership Required</h3>
              <p className="mt-1 text-text-secondary">
                Please add the PMA Membership to your cart first. After accepting
                the agreement, you’ll be able to book your first appointment. Need help?
                Call us anytime.
              </p>
            </div>
            <div>
              <button
                onClick={gotoMembership}
                className="rounded-pill bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700 transition"
              >
                View Membership Options
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Active category title */}
      <section ref={sectionRef} className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">{LABELS[tab]}</h2>
          <div className="mx-auto mt-3 h-1 w-12 rounded-full bg-brand-600/70" />
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((it, idx) => (
            <article
              key={`${it.title}-${idx}`}
              className={cardClass(it.tone)}
            >
              {it.badge && (
                <span className={badgeClass(it.tone)}>
                  {it.badge}
                </span>
              )}

              <h3 className="text-lg font-semibold">{it.title}</h3>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold tracking-tight">{it.price}</span>
                {it.period && <span className="text-sm text-text-secondary">{it.period}</span>}
              </div>

              <div className="mt-4 space-y-3 text-text-secondary">
                {it.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-6">
                <a
                  href={it.ctaHref ?? '/contact'}
                  className={ctaClass(it.tone)}
                >
                  {it.ctaLabel ?? 'Book Appointment'}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ---------- helpers ---------- */

function cardClass(tone: Item['tone']) {
  const base =
    'relative flex h-full flex-col rounded-card border p-6 shadow-soft bg-white';
  switch (tone) {
    case 'premium':
      return `${base} border-lavender-600/40 bg-lavender-600/5`;
    case 'special':
      return `${base} border-gold-mist bg-gold-mist/20`;
    default:
      return `${base} border-brand-300/40 bg-white`;
  }
}

function badgeClass(tone: Item['tone']) {
  const base =
    'absolute right-4 top-0 translate-y-[-50%] rounded-pill px-3 py-1 text-xs font-semibold shadow-soft';
  switch (tone) {
    case 'premium':
      return `${base} bg-lavender-600 text-white`;
    case 'special':
      return `${base} bg-brand-50 text-text-primary border border-gold-mist`;
    default:
      return `${base} bg-brand-600 text-white`;
  }
}

function ctaClass(tone: Item['tone']) {
  const base = 'block w-full rounded-pill px-4 py-2 text-center font-medium transition';
  switch (tone) {
    case 'premium':
      return `${base} bg-lavender-600 text-white hover:bg-lavender-500`;
    case 'special':
      return `${base} bg-brand-700 text-white hover:bg-brand-800`;
    default:
      return `${base} bg-brand-600 text-white hover:bg-brand-700`;
  }
}

function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" className="opacity-10" />
      <path fill="currentColor" d="M11 10h2v7h-2zM11 7h2v2h-2z" />
    </svg>
  );
}
