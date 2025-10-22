'use client'

import { useMemo, useRef, useState } from 'react'
import Reveal from '@/components/Reveal'

/* ---------------- Types ---------------- */
export type Item = {
  title: string
  price: string
  period?: string
  badge?: string
  tone?: 'brand' | 'premium' | 'special'
  description: string[]
  details?: string[]
  ctaHref?: string
  ctaLabel?: string
}

export type PricingData = {
  membership: Item[]
  sessions: Item[]
  overnight: Item[]
  packages: Item[]
}

const LABELS: Record<keyof PricingData, string> = {
  membership: 'Membership',
  sessions: 'Sessions',
  overnight: 'Overnight',
  packages: 'Packages',
}

/* ---------------- Sorting helpers ---------------- */
const BADGE_ORDER = ['Best Value', 'Premium', 'Special', 'Required', 'New Customer']
const badgeRank = (b?: string) => {
  const i = BADGE_ORDER.indexOf(b ?? '')
  return i === -1 ? 999 : i
}
const parsePrice = (p?: string) => {
  if (!p) return Number.POSITIVE_INFINITY
  const n = parseFloat(String(p).replace(/[^\d.]/g, ''))
  return Number.isFinite(n) ? n : Number.POSITIVE_INFINITY
}
function sortFor(tab: keyof PricingData, arr: Item[]) {
  if (tab === 'membership') return arr
  return [...arr].sort((a, b) => {
    const br = badgeRank(a.badge) - badgeRank(b.badge)
    if (br !== 0) return br
    const pa = parsePrice(a.price), pb = parsePrice(b.price)
    if (pa !== pb) return pa - pb
    return (a.title || '').localeCompare(b.title || '')
  })
}

/* ---------------- Component ---------------- */
export default function PricingClient({ data }: { data: PricingData }) {
  const tabs = useMemo(() => Object.keys(LABELS) as (keyof PricingData)[], [])
  const counts = useMemo(
    () => ({
      membership: data.membership.length,
      sessions: data.sessions.length,
      overnight: data.overnight.length,
      packages: data.packages.length,
    }),
    [data]
  )

  const [tab, setTab] = useState<keyof PricingData>('membership')
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const items = data[tab]
  const sorted = useMemo(() => sortFor(tab, items), [tab, items])

  const gotoMembership = () => {
    setTab('membership')
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const wrap = 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8'

  return (
    <div className="bg-surface text-text-primary overflow-x-hidden">
      {/* ===== Header — NO GRID BG, soft brand glows, Reveal ============ */}
      <section className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-emerald-50 via-surface to-surface" />
        {/* removed grid wash */}
        <div className="pointer-events-none absolute -right-24 -top-20 h-64 w-64 rounded-[32px] bg-brand-100 opacity-60 blur-2xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 h-64 w-64 rounded-[32px] bg-lavender-600/10 opacity-70 blur-3xl" />

        <div className={`${wrap} pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8`}>
          <Reveal delay={80}>
            <div className="text-center">
              <span className="inline-block rounded-full border border-emerald-600/20 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
                Pricing
              </span>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                Our Pricing
              </h1>
              <p className="mx-auto mt-2 max-w-xl text-text-secondary">
                Simple, transparent options—book what fits your routine.
              </p>
            </div>
          </Reveal>

          {/* Tabs with counts */}
          <Reveal delay={140}>
            <div
              role="tablist"
              aria-label="Pricing categories"
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {tabs.map((key, i) => {
                const active = tab === key
                return (
                  <button
                    key={key}
                    role="tab"
                    aria-selected={active}
                    aria-controls={`pricing-panel-${key}`}
                    onClick={() => setTab(key)}
                    className={[
                      'rounded-pill px-4 py-2 text-sm md:text-base transition inline-flex items-center gap-2',
                      'shadow-soft ring-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60',
                      active
                        ? 'bg-white text-brand-800 ring-brand-200'
                        : 'bg-white/85 text-text-primary ring-slate-200 hover:bg-white',
                    ].join(' ')}
                    style={{ transitionDelay: `${i * 50}ms` }}
                  >
                    <span>{LABELS[key]}</span>
                    <span className={active ? 'text-brand-700' : 'text-text-secondary'} aria-hidden>
                      · {counts[key]}
                    </span>
                  </button>
                )
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== Divider ==================================================== */}
      <SectionDivider label="Choose a plan" tone="lavender" />

      {/* ===== Membership notice ======================================== */}
      <section className={`${wrap} mt-6 sm:mt-8`}>
        <Reveal delay={110}>
          <div className="rounded-card border border-brand-300/40 bg-brand-100 p-5 sm:p-6 shadow-soft">
            <div className="grid items-center gap-4 sm:grid-cols-[auto,1fr,auto]">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white">
                <InfoIcon />
              </div>
              <div>
                <h2 className="text-base font-semibold text-brand-800 sm:text-lg">Membership Required</h2>
                <p className="mt-1 text-sm text-text-secondary">
                  Add the PMA Membership to your cart first. After accepting the agreement, you’ll be able to book.
                </p>
              </div>
              <div className="flex sm:justify-end">
                <button
                  onClick={gotoMembership}
                  className="w-full sm:w-auto rounded-pill bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  View Membership Options
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== Results ==================================================== */}
      <section
        ref={sectionRef}
        id={`pricing-panel-${tab}`}
        role="tabpanel"
        aria-labelledby={tab}
        className={`${wrap} py-10 sm:py-12 md:py-16 scroll-mt-24 md:scroll-mt-28`}
      >
        <h2 className="sr-only">{LABELS[tab]}</h2>

        {sorted.length === 0 ? (
          <Reveal delay={100}>
            <div className="rounded-card border border-slate-200 bg-white p-8 text-center text-text-secondary">
              No options yet for <span className="font-medium text-text-primary">{LABELS[tab]}</span>. Check back soon.
            </div>
          </Reveal>
        ) : (
          <ul role="list" className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 sm:gap-6">
            {sorted.map((it, idx) => {
              const specifics = it.details && it.details.length > 0 ? it.details : it.description?.slice(1) ?? []
              const href = (it.ctaHref ?? '/contact').trim() || '/contact'
              const label = it.ctaLabel ?? 'Book Appointment'
              return (
                <Reveal key={`${it.title}-${idx}`} delay={120 + (idx % 9) * 70}>
                  <li>
                    <article className={cardClass(it.tone)}>
                      {/* Title + chip */}
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-semibold sm:text-lg">{it.title}</h3>
                        {it.badge && <span className={chipClass(it.tone)}>{it.badge}</span>}
                      </div>

                      {/* Price */}
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold tracking-tight sm:text-3xl">{it.price}</span>
                        {it.period && <span className="text-sm text-text-secondary">{it.period}</span>}
                      </div>

                      {/* Summary */}
                      {it.description?.[0] && (
                        <p className="mt-3 text-sm text-text-secondary sm:text-[15px]">{it.description[0]}</p>
                      )}

                      {/* Details */}
                      {specifics.length > 0 && (
                        <details className="group mt-3">
                          <summary className="cursor-pointer select-none text-sm font-medium text-brand-700 hover:underline">
                            Details
                          </summary>
                          <ul className="mt-2 space-y-2 text-sm text-text-secondary">
                            {specifics.map((d, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                                  <DotIcon />
                                </span>
                                <span>{d}</span>
                              </li>
                            ))}
                          </ul>
                        </details>
                      )}

                      {/* CTA — ALWAYS opens in new tab */}
                      <div className="mt-auto pt-6">
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={ctaClass(it.tone)}
                          aria-label={`${label} — opens in a new tab`}
                        >
                          {label}
                          <ExternalIcon />
                        </a>
                      </div>
                    </article>
                  </li>
                </Reveal>
              )
            })}
          </ul>
        )}
      </section>

      {/* ===== Policy strip ============================================== */}
      <section className="pb-10 sm:pb-12">
        <Reveal delay={90}>
          <div className={`${wrap}`}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-[#E4DAFF] bg-[#F8F5FF] px-4 py-3 text-center text-sm text-slate-700">
              Sessions are non-diagnostic and non-medical. For medical concerns, please consult your licensed provider.
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

/* ---------------- Section divider ---------------- */
function SectionDivider({ label, tone = 'emerald' }: { label: string; tone?: 'emerald' | 'lavender' }) {
  const line =
    tone === 'lavender'
      ? 'from-[#7C6FB0]/30 via-transparent to-[#7C6FB0]/30'
      : 'from-emerald-500/30 via-transparent to-emerald-500/30'
  return (
    <div className="py-6 sm:py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-1 sm:gap-4">
          <span className={`hidden sm:block h-px w-10 bg-gradient-to-r ${line}`} />
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-slate-500">{label}</span>
          <span className={`h-px flex-1 bg-gradient-to-r ${line}`} />
        </div>
      </div>
    </div>
  )
}

/* ---------------- UI helpers ---------------- */
function cardClass(tone: Item['tone']) {
  const base =
    'relative flex h-full flex-col rounded-card border p-5 sm:p-6 shadow-soft bg-white transition hover:shadow-md focus-within:ring-2 focus-within:ring-brand-300/60'
  switch (tone) {
    case 'premium':
      return `${base} border-lavender-600/40 bg-lavender-600/5`
    case 'special':
      return `${base} border-brand-200 bg-brand-50/40`
    default:
      return `${base} border-brand-300/40`
  }
}
function chipClass(tone: Item['tone']) {
  const base =
    'rounded-pill px-3 py-1 text-[11px] font-semibold leading-tight border text-center shadow-[0_0_0_1px_rgba(16,185,129,0.12)]'
  switch (tone) {
    case 'premium':
      return `${base} bg-lavender-600/10 text-lavender-600 border-lavender-600/30`
    case 'special':
      return `${base} bg-brand-50 text-text-primary border-brand-200`
    default:
      return `${base} bg-brand-50 text-brand-800 border-brand-200`
  }
}
function ctaClass(_: Item['tone']) {
  const base =
    'inline-flex w-full items-center justify-center gap-2 rounded-pill px-4 py-2 text-center text-sm font-semibold ' +
    'transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  return `${base} bg-lavender-600 text-white hover:bg-lavender-500 focus-visible:ring-lavender-300`
}

/* ---------------- Icons ---------------- */
function InfoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" className="opacity-10" />
      <path fill="currentColor" d="M11 10h2v7h-2zM11 7h2v2h-2z" />
    </svg>
  )
}
function DotIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  )
}
function ExternalIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" className="opacity-90">
      <path
        fill="currentColor"
        d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
      />
    </svg>
  )
}
