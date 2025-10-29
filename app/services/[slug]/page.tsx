import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/Container'
import cards from '@/data/services.json'
import details from '@/data/service-details.json'
import * as React from 'react'

/* ------------------------------ Types ------------------------------ */
type Card = {
  id: string
  name: string
  slug: string
  tagline?: string
  summary: string
  duration?: string
  image?: string
  intensity?: 'Gentle' | 'Moderate' | 'Focused'
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
    youtubeId?: string
    youtubeUrl?: string
    title?: string
    aspect?: '16:9' | '4:3' | '1:1'
  }
}

/* ------------------------------ Data ------------------------------ */
const allCards = cards as Card[]
const allDetails = details as Detail[]
const findDetail = (slug: string) => allDetails.find((d) => d.slug === slug)

/* ----------------------- Static params/metadata -------------------- */
export async function generateStaticParams() {
  return allCards.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const d = findDetail(params.slug)
  if (!d) return {}
  const title = `${d.name} | Services`
  const description = d.overview
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  return {
    title,
    description,
    alternates: { canonical: `/services/${d.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${base}/services/${d.slug}`,
      type: 'article',
      images: d.heroImage ? [{ url: prefixAsset(d.heroImage), alt: d.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: d.heroImage ? [prefixAsset(d.heroImage)] : undefined,
    },
  }
}

/* --------------------------- Fallback sources ---------------------- */
const PRESET_SOURCES: Record<string, Source[]> = {
  'red-light-therapy': [
    { label: 'Cleveland Clinic — Red Light Therapy overview', href: 'https://my.clevelandclinic.org/health/articles/22114-red-light-therapy' },
    { label: 'JAAD (2025) — Consensus on photobiomodulation in clinical practice', href: 'https://www.jaad.org/article/S0190-9622%2825%2900659-0/fulltext' },
    { label: 'Mass General — Brain Photobiomodulation Clinic', href: 'https://www.massgeneral.org/psychiatry/treatments-and-services/brain-photobiomodulation-clinic' },
  ],
  'hydrogen-water': [
    { label: 'PubMed (2024) — Systematic review: Hydrogen water, benefits & evidence', href: 'https://pubmed.ncbi.nlm.nih.gov/38256045/' },
    { label: 'Pharmaceuticals (2023) — Meta-analysis: HRW & blood lipid profiles', href: 'https://www.mdpi.com/1424-8247/16/2/142' },
  ],
  'energy-enhancement-system': [
    { label: 'FTC — Health Products Compliance Guidance', href: 'https://www.ftc.gov/system/files/ftc_gov/pdf/Health-Products-Compliance-Guidance.pdf' },
    { label: 'NCCIH — Finding reliable health info online', href: 'https://www.nccih.nih.gov/health/know-science/finding-and-evaluating-online-resources/finding-health-information-online/introduction' },
    { label: 'FDA — Warning Letters (claims enforcement)', href: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/compliance-actions-and-activities/warning-letters' },
  ],
}

/* ------------------------------ UI bits --------------------------- */
function Pill({
  children,
  tone = 'emerald',
}: {
  children: React.ReactNode
  tone?: 'emerald' | 'slate' | 'amber' | 'sky'
}) {
  const tones = {
    emerald: 'border-emerald-200 bg-emerald-50 text-emerald-900',
    slate: 'border-slate-200 bg-white text-slate-700',
    amber: 'border-amber-300 bg-amber-50 text-amber-900',
    sky: 'border-sky-200 bg-sky-50 text-sky-900',
  } as const
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}

function SectionHeader({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mt-8 scroll-mt-28 text-base font-semibold text-slate-900">
      {children}
    </h3>
  )
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

function TimelineList({ items }: { items: string[] }) {
  return (
    <ol className="relative mt-3 space-y-5 border-l border-slate-200 pl-5">
      {items.map((s, i) => (
        <li key={s} className="relative">
          <span className="absolute -left-2.5 top-0 inline-flex h-5 w-5 items-center justify-center rounded-full border border-emerald-300 bg-white text-[11px] font-semibold text-emerald-800">
            {i + 1}
          </span>
          <p className="text-slate-700">{s}</p>
        </li>
      ))}
    </ol>
  )
}

function InfoCallout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-xl border border-amber-300/70 bg-amber-50 p-4 text-amber-900">
      <p className="font-semibold">{title}</p>
      <div className="mt-2 text-sm/6">{children}</div>
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
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

function Breadcrumbs({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-600">
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li aria-hidden>›</li>
        <li><Link href="/services" className="hover:underline">Services</Link></li>
        <li aria-hidden>›</li>
        <li aria-current="page" className="text-slate-900 font-medium">{name}</li>
      </ol>
    </nav>
  )
}

/* ------------------------- Right rail helpers ---------------------- */
function parseYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null
    if (u.hostname.includes('youtube.com')) {
      if (u.pathname.startsWith('/embed/')) return u.pathname.split('/embed/')[1] || null
      const v = u.searchParams.get('v')
      return v || null
    }
    return null
  } catch {
    return null
  }
}

function RightRail({
  media,
  hero,
  microCopy,
  toc,
  card,
}: {
  media?: Detail['media']
  hero?: string
  microCopy?: string
  toc: { id: string; label: string }[]
  card: Card
}) {
  const id = media?.youtubeId ?? (media?.youtubeUrl ? parseYouTubeId(media.youtubeUrl) : null)
  const aspect = media?.aspect ?? '16:9'
  const pad = aspect === '1:1' ? 'pt-[100%]' : aspect === '4:3' ? 'pt-[75%]' : 'pt-[56.25%]'
  const title = media?.title ?? 'Video'

  return (
    <aside className="order-1 md:order-2 md:col-span-4">
      <div className="sticky top-20 space-y-4">
        {/* Video card */}
        {(id || hero) && (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            {id ? (
              <div className={`relative ${pad}`}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${id}`}
                  title={title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            ) : (
              <figure className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={prefixAsset(hero!)} alt="" className="w-full" />
              </figure>
            )}
          </div>
        )}

        {/* Book session */}
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-4">
          <p className="text-sm font-semibold text-emerald-900">Ready to book?</p>
          <ul className="mt-2 space-y-1.5 text-sm text-emerald-900/90">
            {card.duration && <li>⏱ Duration: <span className="font-medium">{card.duration}</span></li>}
            {card.intensity && <li>🎚 Intensity: <span className="font-medium">{card.intensity}</span></li>}
          </ul>
          <div className="mt-3">
            <a
              href="/contact"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-emerald-700 hover:to-teal-600"
            >
              Book a Session ↗
            </a>
          </div>
          {microCopy ? <p className="mt-2 text-xs text-emerald-900/80">{microCopy}</p> : null}
        </div>

        {/* On this page */}
        {toc.length > 0 && (
          <nav aria-label="On this page" className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">On this page</p>
            <ul className="mt-2 space-y-1.5 text-sm">
              {toc.map((t) => (
                <li key={t.id}>
                  <a href={`#${t.id}`} className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900">
                    {t.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </aside>
  )
}

function PrevNext({ slug }: { slug: string }) {
  const idx = allCards.findIndex((c) => c.slug === slug)
  if (idx === -1) return null
  const prev = allCards[idx - 1]
  const next = allCards[idx + 1]
  if (!prev && !next) return null
  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
      {prev ? (
        <Link
          href={`/services/${prev.slug}`}
          className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-white"
        >
          ← {prev.name}
        </Link>
      ) : <span />}
      {next ? (
        <Link
          href={`/services/${next.slug}`}
          className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-white"
        >
          {next.name} →
        </Link>
      ) : <span />}
    </div>
  )
}

/* ------------------------------- Utils ---------------------------- */
function prefixAsset(p?: string) {
  if (!p) return ''
  if (/^https?:\/\//i.test(p)) return p
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}${p}`
}

/* -------------------------------- Page ---------------------------- */
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const data = findDetail(params.slug)
  const card = allCards.find((c) => c.slug === params.slug)
  if (!data || !card) return notFound()

  const sources = (data.sources?.length ? data.sources : PRESET_SOURCES[data.slug]) ?? []

  // Build TOC from present sections
  const toc: { id: string; label: string }[] = []
  if (data.overview) toc.push({ id: 'overview', label: 'Overview' })
  if (data.whatItIs) toc.push({ id: 'what-it-is', label: 'What it is' })
  if (data.howItWorks?.summary || data.howItWorks?.details?.length || data.howItWorks?.plainLanguage) {
    toc.push({ id: 'how-it-works', label: 'How it works' })
  }
  if (data.benefits?.length) toc.push({ id: 'benefits', label: 'Potential benefits' })
  if (data.sessionFlow?.length) toc.push({ id: 'session-flow', label: 'Session flow' })
  if (data.howToPrepare?.length) toc.push({ id: 'how-to-prepare', label: 'How to prepare' })
  if (data.helmet810 && (data.helmet810.title || data.helmet810.deviceSpecs?.length || data.helmet810.mechanisms?.length || data.helmet810.why810?.length))
    toc.push({ id: 'helmet-810', label: data.helmet810.title ?? 'Near-Infrared Helmet (810 nm)' })
  if (data.moreAboutH2 && (data.moreAboutH2.mechanismSnapshot?.length || data.moreAboutH2.bestUseTips?.length || data.moreAboutH2.storageAndPrep?.length))
    toc.push({ id: 'more-about-h2', label: 'More about H₂' })
  if (data.safety?.notes?.length) toc.push({ id: 'safety', label: 'Safety notes' })
  if (data.faq?.length) toc.push({ id: 'faqs', label: 'FAQs' })
  toc.push({ id: 'sources', label: 'Sources & references' })

  return (
    <>
      {/* Header */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white" />
        <Container className="pt-10 md:pt-14 pb-6">
          <div className="flex flex-col gap-5">
            <Breadcrumbs name={data.name} />

            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700/70">Service</p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-slate-900">
                {data.name}
              </h1>

              {/* Badges */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                {(data.badges ?? []).map((b) => <Pill key={b}>{b}</Pill>)}
                {card.intensity && <Pill tone="sky">🎚 {card.intensity}</Pill>}
                {card.duration && <Pill tone="slate">⏱ {card.duration}</Pill>}
              </div>
            </div>

            {/* At a glance */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                ← Back to services
              </Link>
              <a
                href="/contact"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-2 text-sm font-semibold text-white hover:from-emerald-700 hover:to-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                Book a Session ↗
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Body — two columns */}
      <section className="py-8 md:py-10">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {/* Main content */}
            <article className="order-2 md:order-1 md:col-span-8">
              <div className="mx-auto rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur">
                <h2 id="overview" className="text-lg font-semibold text-slate-900 scroll-mt-28">Overview</h2>
                <p className="mt-2 text-slate-700">{data.overview}</p>

                <SectionHeader id="what-it-is">What it is</SectionHeader>
                <p className="mt-2 text-slate-700">{data.whatItIs}</p>

                {(data.howItWorks?.summary || data.howItWorks?.details?.length || data.howItWorks?.plainLanguage) && (
                  <>
                    <SectionHeader id="how-it-works">How it works</SectionHeader>
                    {data.howItWorks?.summary && <p className="mt-2 text-slate-700">{data.howItWorks.summary}</p>}
                    {data.howItWorks?.details?.length ? <DotList items={data.howItWorks.details} /> : null}
                    {data.howItWorks?.plainLanguage && (
                      <InfoCallout title="In plain language">
                        <p>{data.howItWorks.plainLanguage}</p>
                      </InfoCallout>
                    )}
                  </>
                )}

                {data.benefits?.length ? (
                  <>
                    <SectionHeader id="benefits">Potential benefits</SectionHeader>
                    <DotList items={data.benefits} />
                  </>
                ) : null}

                {data.sessionFlow?.length ? (
                  <>
                    <SectionHeader id="session-flow">Session flow (what to expect)</SectionHeader>
                    <TimelineList items={data.sessionFlow} />
                  </>
                ) : null}

                {data.howToPrepare?.length ? (
                  <>
                    <SectionHeader id="how-to-prepare">How to prepare</SectionHeader>
                    <DotList items={data.howToPrepare} />
                  </>
                ) : null}

                {data.helmet810 && (data.helmet810.title || data.helmet810.deviceSpecs?.length || data.helmet810.mechanisms?.length || data.helmet810.why810?.length || data.helmet810.timeAndFrequency?.length) ? (
                  <>
                    <SectionHeader id="helmet-810">{data.helmet810.title ?? 'Near-Infrared Light Therapy Helmet (810 nm)'}</SectionHeader>
                    {data.helmet810.deviceSpecs?.length ? <InfoCallout title="Device specs"><DotList items={data.helmet810.deviceSpecs} /></InfoCallout> : null}
                    {data.helmet810.why810?.length ? <Accordion title="Why 810 nm?"><DotList items={data.helmet810.why810} /></Accordion> : null}
                    {data.helmet810.mechanisms?.length ? <Accordion title="Mechanisms (snapshot)"><DotList items={data.helmet810.mechanisms} /></Accordion> : null}
                    {data.helmet810.timeAndFrequency?.length ? <Accordion title="Time & frequency"><DotList items={data.helmet810.timeAndFrequency} /></Accordion> : null}
                  </>
                ) : null}

                {data.moreAboutH2 &&
                  (data.moreAboutH2.mechanismSnapshot?.length ||
                    data.moreAboutH2.bestUseTips?.length ||
                    data.moreAboutH2.storageAndPrep?.length) && (
                    <>
                      <SectionHeader id="more-about-h2">More about H₂</SectionHeader>
                      {data.moreAboutH2.mechanismSnapshot?.length ? <Accordion title="Mechanism snapshot"><DotList items={data.moreAboutH2.mechanismSnapshot} /></Accordion> : null}
                      {data.moreAboutH2.bestUseTips?.length ? <Accordion title="Best-use tips"><DotList items={data.moreAboutH2.bestUseTips} /></Accordion> : null}
                      {data.moreAboutH2.storageAndPrep?.length ? <Accordion title="Storage & prep"><DotList items={data.moreAboutH2.storageAndPrep} /></Accordion> : null}
                    </>
                  )}

                {data.safety?.notes?.length ? (
                  <>
                    <SectionHeader id="safety">Safety notes</SectionHeader>
                    <InfoCallout title="Please read">
                      <ul className="list-disc pl-5">
                        {data.safety.notes.map((n) => <li key={n}>{n}</li>)}
                      </ul>
                    </InfoCallout>
                  </>
                ) : null}

                {data.faq?.length ? (
                  <>
                    <SectionHeader id="faqs">FAQs</SectionHeader>
                    <div className="mt-2 space-y-2">
                      {data.faq.map((f) => (
                        <details key={f.q} className="group rounded-xl border border-slate-200 bg-white/70 p-4 open:bg-white">
                          <summary className="cursor-pointer select-none text-sm font-semibold text-slate-900 outline-none">
                            {f.q}
                            <span className="ml-2 text-slate-400 transition group-open:rotate-180">▾</span>
                          </summary>
                          <div className="mt-3 text-slate-700"><p>{f.a}</p></div>
                        </details>
                      ))}
                    </div>
                  </>
                ) : null}

                {/* Sources */}
                <div className="mt-6">
                  <SectionHeader id="sources">Sources & references</SectionHeader>
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
                          {s.label}<span aria-hidden className="ml-1">↗</span>
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

                <PrevNext slug={data.slug} />
              </div>
            </article>

            {/* Right column */}
            <RightRail media={data.media} hero={data.heroImage} microCopy={data.microCopy} toc={toc} card={card} />
          </div>

          {/* Footer actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/services"
              className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              ← Back to services
            </Link>
            <a
              href="/contact"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-2 text-sm font-semibold text-white hover:from-emerald-700 hover:to-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Book a Session ↗
            </a>
          </div>
        </Container>
      </section>
    </>
  )
}
