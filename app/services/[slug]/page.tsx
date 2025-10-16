// app/services/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/Container'
import cards from '@/data/services.json'
import details from '@/data/service-details.json'
import * as React from 'react' // for React.ReactNode types

/** ---------- Types (extended to match your enriched JSON) ---------- */
type Card = {
  id: string
  name: string
  slug: string
  tagline?: string
  summary: string
  duration?: string
  image?: string
}

type Source = { label: string; href: string }

type Detail = {
  slug: string
  name: string
  badges?: string[]
  heroImage?: string
  overview: string
  whatItIs: string
  benefits?: string[]
  sessionFlow?: string[]
  safety?: { notes?: string[] }
  sources?: Source[]

  // New optional blocks
  howItWorks?: {
    summary?: string
    details?: string[]
    plainLanguage?: string
  }
  howToPrepare?: string[]
  helmet810?: {
    title?: string
    deviceSpecs?: string[]
    why810?: string[]
    mechanisms?: string[]
    timeAndFrequency?: string[]
  }
  moreAboutH2?: {
    mechanismSnapshot?: string[]
    bestUseTips?: string[]
    storageAndPrep?: string[]
  }
  microCopy?: string
  faq?: { q: string; a: string }[]
  media?: {
    slots?: { key: string; src: string; caption?: string; aspectHint?: string; maxHeight?: string }[]
  }
}

/** ---------- Data ---------- */
const allCards = cards as Card[]
const allDetails = details as Detail[]
const findDetail = (slug: string) => allDetails.find((d) => d.slug === slug)

export async function generateStaticParams() {
  return allCards.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const d = findDetail(params.slug)
  if (!d) return {}
  return {
    title: `${d.name} | Services`,
    description: d.overview,
    alternates: { canonical: `/services/${d.slug}` },
    robots: { index: true, follow: true },
  }
}

/** Credible fallback sources by slug (used only if detail.sources is empty) */
const PRESET_SOURCES: Record<string, Source[]> = {
  'red-light-therapy': [
    {
      label: 'Cleveland Clinic — Red Light Therapy overview',
      href: 'https://my.clevelandclinic.org/health/articles/22114-red-light-therapy',
    },
    {
      label: 'JAAD (2025) — Consensus on photobiomodulation in clinical practice',
      href: 'https://www.jaad.org/article/S0190-9622%2825%2900659-0/fulltext',
    },
    {
      label: 'Mass General — Brain Photobiomodulation Clinic',
      href: 'https://www.massgeneral.org/psychiatry/treatments-and-services/brain-photobiomodulation-clinic',
    },
  ],
  'hydrogen-water': [
    {
      label: 'PubMed (2024) — Systematic review: Hydrogen water, benefits & evidence',
      href: 'https://pubmed.ncbi.nlm.nih.gov/38256045/',
    },
    {
      label: 'Pharmaceuticals (2023) — Meta-analysis: HRW & blood lipid profiles',
      href: 'https://www.mdpi.com/1424-8247/16/2/142',
    },
  ],
  'energy-enhancement-system': [
    {
      label: 'FTC — Health Products Compliance Guidance (claims must be substantiated)',
      href: 'https://www.ftc.gov/system/files/ftc_gov/pdf/Health-Products-Compliance-Guidance.pdf',
    },
    {
      label: 'NCCIH — Know the Science: Finding reliable health info online',
      href: 'https://www.nccih.nih.gov/health/know-science/finding-and-evaluating-online-resources/finding-health-information-online/introduction',
    },
    {
      label: 'FDA — Warning Letters database (how FDA enforces claims)',
      href: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters',
    },
  ],
}

/** ---------- Small UI helpers (no external deps) ---------- */
function Pill({
  children,
  tone = 'emerald',
}: {
  children: React.ReactNode
  tone?: 'emerald' | 'slate' | 'amber'
}) {
  const tones = {
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    slate: 'border-slate-200 bg-white text-slate-700',
    amber: 'border-amber-300 bg-amber-50 text-amber-900',
  } as const
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}

function SectionHeader({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-6 text-base font-semibold text-slate-900">{children}</h3>
}

function DotList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-2 text-slate-700">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}

function NumList({ items }: { items: string[] }) {
  return (
    <ol className="mt-2 list-decimal space-y-2 pl-5 text-slate-700">
      {items.map((s) => (
        <li key={s}>{s}</li>
      ))}
    </ol>
  )
}

function InfoCallout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
      <p className="font-semibold">{title}</p>
      <div className="mt-2 text-sm/6">{children}</div>
    </div>
  )
}

/** Uncontrolled accordion (no defaultOpen prop; stays type-safe) */
function Accordion({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <details className="group mt-4 rounded-xl border border-slate-200 bg-white/70 p-4 open:bg-white">
      <summary className="cursor-pointer select-none text-sm font-semibold text-slate-900 outline-none">
        {title}
        <span className="ml-2 text-slate-400 transition group-open:rotate-180">▾</span>
      </summary>
      <div className="mt-3 text-slate-700">{children}</div>
    </details>
  )
}

function MediaRail({
  hero,
  slots = [],
  microCopy,
}: {
  hero?: string
  slots?: { key: string; src: string; caption?: string; maxHeight?: string }[]
  microCopy?: string
}) {
  if (!hero && (!slots || slots.length === 0) && !microCopy) return null
  return (
    <aside className="order-1 md:order-2 md:col-span-4">
      <div className="sticky top-20 space-y-4">
        {hero ? (
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero} alt="" className="w-full" />
          </figure>
        ) : null}

        {slots?.slice(0, 3).map((m) => (
          <figure
            key={m.key}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white/80"
            style={m.maxHeight ? { maxHeight: m.maxHeight } : undefined}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={m.src} alt={m.caption ?? ''} className="h-full w-full object-cover" />
            {m.caption ? <figcaption className="px-3 py-2 text-xs text-slate-500">{m.caption}</figcaption> : null}
          </figure>
        ))}

        {microCopy ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">{microCopy}</div>
        ) : null}
      </div>
    </aside>
  )
}

/** ---------- Page ---------- */
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const data = findDetail(params.slug)
  const card = allCards.find((c) => c.slug === params.slug)
  if (!data || !card) return notFound()

  const sources = (data.sources?.length ? data.sources : PRESET_SOURCES[data.slug]) ?? []

  return (
    <>
      {/* Header */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white" />
        <Container className="pt-12 md:pt-16 pb-6">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700/70">Service</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                {data.name}
              </h1>

              <div className="mt-2 flex flex-wrap gap-2">
                {(data.badges ?? []).map((b) => (
                  <Pill key={b}>{b}</Pill>
                ))}
                {card.duration && <Pill tone="slate">⏱ {card.duration}</Pill>}
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/services"
                className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                ← Back to services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Body — 2-column: content + slim media rail */}
      <section className="py-8 md:py-10">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Main content */}
            <article className="order-2 md:order-1 md:col-span-8">
              <div className="mx-auto rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur">
                <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
                <p className="mt-2 text-slate-700">{data.overview}</p>

                <SectionHeader>What it is</SectionHeader>
                <p className="mt-2 text-slate-700">{data.whatItIs}</p>

                {data.howItWorks?.summary || data.howItWorks?.details?.length || data.howItWorks?.plainLanguage ? (
                  <>
                    <SectionHeader>How it works</SectionHeader>
                    {data.howItWorks?.summary ? (
                      <p className="mt-2 text-slate-700">{data.howItWorks.summary}</p>
                    ) : null}

                    {data.howItWorks?.details?.length ? <DotList items={data.howItWorks.details} /> : null}

                    {data.howItWorks?.plainLanguage ? (
                      <InfoCallout title="In plain language">
                        <p>{data.howItWorks.plainLanguage}</p>
                      </InfoCallout>
                    ) : null}
                  </>
                ) : null}

                {data.benefits?.length ? (
                  <>
                    <SectionHeader>Potential benefits</SectionHeader>
                    <DotList items={data.benefits} />
                  </>
                ) : null}

                {data.sessionFlow?.length ? (
                  <>
                    <SectionHeader>Session flow (what to expect)</SectionHeader>
                    <NumList items={data.sessionFlow} />
                  </>
                ) : null}

                {data.howToPrepare?.length ? (
                  <Accordion title="How to prepare">
                    <DotList items={data.howToPrepare} />
                  </Accordion>
                ) : null}

                {/* Red Light therapy — Helmet 810 block */}
                {data.helmet810 && (data.helmet810.title || data.helmet810.deviceSpecs?.length || data.helmet810.mechanisms?.length) ? (
                  <>
                    <SectionHeader>{data.helmet810.title ?? 'Near-Infrared Light Therapy Helmet (810 nm)'}</SectionHeader>

                    {data.helmet810.deviceSpecs?.length ? (
                      <Accordion title="Device specs">
                        <DotList items={data.helmet810.deviceSpecs} />
                      </Accordion>
                    ) : null}

                    {data.helmet810.why810?.length ? (
                      <Accordion title="Why 810 nm?">
                        <DotList items={data.helmet810.why810} />
                      </Accordion>
                    ) : null}

                    {data.helmet810.mechanisms?.length ? (
                      <Accordion title="Mechanisms (snapshot)">
                        <DotList items={data.helmet810.mechanisms} />
                      </Accordion>
                    ) : null}

                    {data.helmet810.timeAndFrequency?.length ? (
                      <Accordion title="Time & frequency">
                        <DotList items={data.helmet810.timeAndFrequency} />
                      </Accordion>
                    ) : null}
                  </>
                ) : null}

                {/* Hydrogen Water — moreAboutH2 */}
                {data.moreAboutH2 &&
                (data.moreAboutH2.mechanismSnapshot?.length ||
                  data.moreAboutH2.bestUseTips?.length ||
                  data.moreAboutH2.storageAndPrep?.length) ? (
                  <>
                    <SectionHeader>More about H₂</SectionHeader>
                    {data.moreAboutH2.mechanismSnapshot?.length ? (
                      <Accordion title="Mechanism snapshot">
                        <DotList items={data.moreAboutH2.mechanismSnapshot} />
                      </Accordion>
                    ) : null}
                    {data.moreAboutH2.bestUseTips?.length ? (
                      <Accordion title="Best-use tips">
                        <DotList items={data.moreAboutH2.bestUseTips} />
                      </Accordion>
                    ) : null}
                    {data.moreAboutH2.storageAndPrep?.length ? (
                      <Accordion title="Storage & prep">
                        <DotList items={data.moreAboutH2.storageAndPrep} />
                      </Accordion>
                    ) : null}
                  </>
                ) : null}

                {/* Safety */}
                {data.safety?.notes?.length ? (
                  <InfoCallout title="Safety notes">
                    <ul className="list-disc pl-5">
                      {data.safety.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  </InfoCallout>
                ) : null}

                {/* FAQ */}
                {data.faq?.length ? (
                  <>
                    <SectionHeader>FAQs</SectionHeader>
                    <div className="mt-2 space-y-2">
                      {data.faq.map((f) => (
                        <Accordion key={f.q} title={f.q}>
                          <p>{f.a}</p>
                        </Accordion>
                      ))}
                    </div>
                  </>
                ) : null}

                {/* Sources */}
                <div className="mt-6">
                  <SectionHeader>Sources & references</SectionHeader>
                  <ul className="mt-2 space-y-1">
                    {(sources ?? []).map((s) => (
                      <li key={s.label} className="flex items-start gap-2">
                        <span aria-hidden className="mt-[0.35rem] inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
                        >
                          {s.label}
                          <span aria-hidden className="ml-1">↗</span>
                        </a>
                      </li>
                    ))}
                    {(!sources || sources.length === 0) && (
                      <li className="text-slate-500">We’ll add independent sources here soon.</li>
                    )}
                  </ul>
                  <p className="mt-3 text-[12px] text-slate-500">
                    Wellness services are not medical treatment. This page is for general information and is not a substitute for professional advice.
                  </p>
                </div>
              </div>
            </article>

            {/* Media / Quick info rail */}
            <MediaRail hero={data.heroImage} slots={data.media?.slots} microCopy={data.microCopy} />
          </div>

          {/* Footer actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              ← Back to services
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Contact us
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
