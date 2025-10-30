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

/* ------------------------- Editorial Overrides -------------------- */
/** Clean, factual copy (no placeholders). Also inject per-slug video URLs. */
const OVERRIDES: Record<
  string,
  {
    metaTitle?: string
    metaDescription?: string
    alt?: string[]
    ctaLabel?: string
    youtubeUrl?: string
    overview?: string
    whatItIs?: string
    howItWorksSummary?: string
    howItWorksDetails?: string[]
    howItWorksPlain?: string
    benefits?: string[]
    sessionFlow?: string[]
    howToPrepare?: string[]
    safetyNotes?: string[]
    faqs?: { q: string; a: string }[]
    sources?: Source[]
    devicesBlock?: {
      title: string
      deviceSpecs?: string[]
      mechanisms?: string[]
      timeAndFrequency?: string[]
    }
    moreAboutH2?: {
      mechanismSnapshot?: string[]
      bestUseTips?: string[]
      storageAndPrep?: string[]
    }
  }
> = {
  /* ----------------------- A) Energy Enhancement System ------------ */
  'energy-enhancement-system': {
    metaTitle: 'Energy Enhancement System (EES) Lounge | Upgrade Wellness',
    metaDescription:
      'Quiet, screen-free lounge sessions (1–3 hours) for general relaxation. Learn what to expect, how to prepare, and safety notes.',
    youtubeUrl:
      'https://www.youtube.com/watch?v=CI7VBhg9m88&list=PLsttX-t5ZzrTxuXFRYkT2sAVInwFr_-hP&index=6',
    alt: [
      'Quiet lounge with soft lighting and recliners in a circular layout',
      'Guest resting with eyes closed in a calm lounge',
      'Water bottle and journal on a side table',
      'Sign reading “Quiet Zone — Phones on Airplane Mode”',
    ],
    ctaLabel: 'Book a Lounge Session',
    overview:
      'A quiet, screen-free lounge for general relaxation and reflection. Sessions run 1–3 hours.',
    whatItIs:
      'A calm room with a multi-screen array and comfortable seating. Lighting is soft and conversation is minimal.',
    howItWorksSummary:
      'Rest in a chair with devices on airplane mode. Use the time for mindfulness, light napping, or journaling.',
    benefits: [
      'Calm, phone-free time to unwind',
      'Support for mindfulness or quiet reflection',
      'Low-stimulus reset between busy tasks',
    ],
    sessionFlow: [
      'Arrival: check in, stow devices, brief orientation.',
      'During: quiet room etiquette; rest or journal for 1–3 hours.',
      'After: hydrate and ease back into your day.',
    ],
    howToPrepare: [
      'Wear comfortable layers; go light on fragrance.',
      'Set phones to airplane mode; no speaker audio.',
      'Arrive hydrated and bring a sealed water bottle.',
    ],
    safetyNotes: [
      'General wellness experience; no diagnosis or treatment.',
      'Consult your clinician if pregnant or if you have implanted devices.',
      'Tell staff about any sensitivities to light or sound.',
    ],
    faqs: [
      { q: 'Is it supervised?', a: 'Yes. Staff provide orientation and check in periodically.' },
      { q: 'Can I talk with a friend?', a: 'Please keep conversation minimal to preserve quiet.' },
      { q: 'Can I read or listen to music?', a: 'Yes, if silent to others. No speaker audio.' },
      { q: 'Is there a dress code?', a: 'Wear comfortable, lounge-appropriate clothing.' },
      { q: 'Can I eat during the session?', a: 'Water only in the lounge. Save food for before or after.' },
    ],
    sources: [
      { label: 'FDA — General Wellness: Policy for Low Risk Devices', href: 'https://www.fda.gov/media/90652/download' },
      { label: 'FTC — Health Products Compliance Guidance', href: 'https://www.ftc.gov/system/files/ftc_gov/pdf/Health-Products-Compliance-Guidance.pdf' },
    ],
  },

  /* ----------------------- B) Hydrogen-Rich Water ------------------ */
  'hydrogen-water': {
    metaTitle: 'Hydrogen-Rich Water (H₂) | Upgrade Wellness',
    metaDescription:
      'Chilled water infused with dissolved hydrogen (H₂), served fresh. Research is mixed. See timing, safety, and sources.',
    youtubeUrl: 'https://www.youtube.com/watch?v=bfEFFaeiTRo',
    alt: [
      'Chilled glass of clear water on a counter',
      'Pouring water into a reusable cup at the bar',
      'Dispenser labeled “H₂ water — served fresh”',
    ],
    ctaLabel: 'Order H₂ Water at the Studio',
    overview: 'Chilled still water infused with dissolved molecular hydrogen (H₂), served fresh.',
    whatItIs:
      'Prepared on site and poured promptly to help retain dissolved H₂. Served chilled and still.',
    benefits: ['Pairs naturally with daily hydration', 'Research on outcomes is emerging and mixed'],
    sessionFlow: ['We serve a single chilled portion.', 'Drink soon after pouring.'],
    safetyNotes: [
      'Generally well tolerated in human studies to date.',
      'Follow clinician guidance if you track fluids or have restrictions.',
      'Not a treatment.',
    ],
    faqs: [
      { q: 'What does it taste like?', a: 'Like chilled still water. H₂ itself is tasteless.' },
      { q: 'Is it carbonated?', a: 'No. Dissolved H₂ does not make water fizzy.' },
      { q: 'How soon should I drink it?', a: 'Soon after serving, as dissolved H₂ can dissipate.' },
      { q: 'Can I store it?', a: 'Fresh is best. If saving, keep sealed and cold; potency may decline.' },
    ],
    moreAboutH2: {
      mechanismSnapshot: [
        'Molecular hydrogen dissolves in water and may act as a redox-signaling molecule.',
        'Findings vary by context; many trials are small.',
      ],
      bestUseTips: ['Drink soon after serving for best potency.'],
      storageAndPrep: ['If saving, keep sealed and cold.'],
    },
    sources: [
      { label: 'Pharmaceuticals (2023) — Systematic review/meta-analysis (lipids)', href: 'https://www.mdpi.com/1424-8247/16/2/142' },
      { label: 'IJMS (2024) — Hydrogen water review (evidence mixed)', href: 'https://www.mdpi.com/1422-0067/25/2/973' },
    ],
  },

  /* ----------------------- C) Red Light Therapy (PBM) -------------- */
  'red-light-therapy': {
    metaTitle: 'Red Light Therapy (PBM) | Upgrade Wellness',
    metaDescription:
      'Non-invasive red and near-infrared light. Sessions ~10–20 minutes. What to expect, parameters, safety, and sources.',
    youtubeUrl: 'https://www.youtube.com/watch?v=PlLeI0Rgifg',
    alt: [
      'Person seated near a red-light panel wearing goggles',
      'Close-up of an LED array on a red/NIR panel',
      'Technician adjusting panel height before a session',
      'Timer card showing distance and duration settings',
    ],
    ctaLabel: 'Book a Red Light Session',
    overview:
      'Non-ionizing red and near-infrared light aimed at tissues for a brief, staff-guided session.',
    whatItIs:
      'A light-emitting panel or head-mounted device selected for a target area. Distance and timing are set by staff.',
    howItWorksSummary:
      'Cells absorb red/NIR light. This may influence mitochondrial activity and cell signaling. PBM depends on wavelength, intensity, distance, and time.',
    benefits: [
      'Non-invasive and brief',
      'May support cellular responses linked to recovery',
      'May support skin appearance in some settings',
    ],
    sessionFlow: ['Timing is typically 10–20 minutes.', 'Staff set distance and timer.', 'No downtime.'],
    devicesBlock: {
      title: 'Devices & parameters',
      deviceSpecs: [
        'Common wavelengths: ~630–660 nm (red) and ~810–850 nm (near-infrared).',
        'Treatment areas are targeted or panel-based, set by staff.',
      ],
      timeAndFrequency: ['Session length depends on the area and device settings.'],
    },
    safetyNotes: [
      'Avoid staring into emitters; use eye protection when treating the face.',
      'If you are photosensitive, pregnant, or in active cancer treatment, consult your clinician first.',
      'Temporary warmth or pinkness can occur.',
    ],
    faqs: [
      { q: 'Will I feel anything?', a: 'Mostly gentle warmth. Some people feel nothing during the session.' },
      { q: 'How close should I be?', a: 'Distance affects intensity. Staff set and note a measured distance for consistency.' },
      { q: 'How many sessions do I need?', a: 'It varies by goal and tolerance. Track how the area feels over time.' },
      { q: 'Is it safe for eyes?', a: 'Do not look into emitters. Use provided goggles near the eyes.' },
    ],
    sources: [
      { label: 'JAAD (2025) — Consensus on PBM application/parameters', href: 'https://www.jaad.org/article/S0190-9622%2825%2900659-0/abstract' },
      { label: 'PBM mechanisms overview (review)', href: 'https://europepmc.org/article/MED/32716711' },
      { label: 'Photobiomodulation — cellular/molecular/clinical (review)', href: 'https://www.sciencedirect.com/science/article/pii/S2666469023000386' },
      { label: 'Ocular considerations with LED/NIR PBM (review)', href: 'https://www.dovepress.com/photobiomodulation-using-light-emitting-diode-led-for-treatment-of-ret-peer-reviewed-fulltext-article-OPTH' },
    ],
  },
}

/* ----------------------- Static params/metadata -------------------- */
export async function generateStaticParams() {
  return allCards.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const base = process.env.NEXT_PUBLIC_SITE_URL || ''
  const d0 = findDetail(params.slug)
  const ov = OVERRIDES[params.slug]
  if (!d0) return {}

  const title = ov?.metaTitle ?? `${d0.name} | Services`
  const description = ov?.metaDescription ?? d0.overview ?? ''
  const image = d0.heroImage ? prefixAsset(d0.heroImage) : undefined

  return {
    title,
    description,
    alternates: { canonical: `/services/${d0.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: `${base}/services/${d0.slug}`,
      type: 'article',
      images: image ? [{ url: image, alt: d0.name }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

/* ------------------------------ UI bits --------------------------- */
function Pill({
  children,
  tone = 'brand',
}: {
  children: React.ReactNode
  tone?: 'brand' | 'slate' | 'amber' | 'sky'
}) {
  const tones = {
    brand: 'border-[#BFD0F6] bg-[#EBF2FF] text-[#001130]',
    slate: 'border-slate-200 bg-white text-[#001130]',
    amber: 'border-amber-300 bg-amber-50 text-amber-900',
    sky: 'border-sky-200 bg-sky-50 text-sky-900',
  } as const
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1.5 text-[12px] font-medium ${tones[tone]}`}>
      {children}
    </span>
  )
}

function SectionHeader({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h3 id={id} className="mt-12 scroll-mt-28 text-2xl font-semibold text-[#001130] md:text-[28px]">
      {children}
    </h3>
  )
}

function DotList({ items }: { items: string[] }) {
  if (!items?.length) return null
  return (
    <ul className="mt-4 space-y-3 text-[18px]/8 text-slate-700 md:text-[19px]">
      {items.map((b) => (
        <li key={b} className="flex gap-3">
          <span className="mt-2 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-[#6592E1]" />
          <span>{b}</span>
        </li>
      ))}
    </ul>
  )
}

/** New, aligned timeline with consistent marker column (fixes clipped first letters). */
function TimelineList({ items }: { items: string[] }) {
  if (!items?.length) return null
  return (
    <ol className="mt-4 space-y-4 border-l border-[#D6E4FF] pl-6">
      {items.map((s, i) => (
        <li key={s} className="grid grid-cols-[2rem_1fr] items-start gap-3">
          <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#BFD0F6] bg-white text-[11px] font-semibold text-[#001130]">
            {i + 1}
          </span>
          <p className="text-[18px]/8 text-slate-700 md:text-[19px]">{s}</p>
        </li>
      ))}
    </ol>
  )
}

function InfoCallout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 rounded-2xl border border-amber-300/70 bg-amber-50 p-6 text-amber-900">
      <p className="text-[16px]/6 font-semibold">{title}</p>
      <div className="mt-2 text-[16px]/7">{children}</div>
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group mt-4 rounded-2xl border border-[#E6EEFF] bg-white/95 p-6 open:bg-white">
      <summary className="cursor-pointer select-none text-[16px] font-semibold text-[#001130] outline-none">
        {title}
        <span className="ml-2 text-slate-400 transition group-open:rotate-180">▾</span>
      </summary>
      <div className="mt-3 text-[17px]/7 text-slate-700">{children}</div>
    </details>
  )
}

function Breadcrumbs({ name }: { name: string }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-200">
      <ol className="flex flex-wrap items-center gap-1">
        <li><Link href="/" className="hover:underline">Home</Link></li>
        <li aria-hidden>›</li>
        <li><Link href="/services" className="hover:underline">Services</Link></li>
        <li aria-hidden>›</li>
        <li aria-current="page" className="font-medium text-white">{name}</li>
      </ol>
    </nav>
  )
}

/* ------------------------- Helpers ---------------------- */
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

function prefixAsset(p?: string) {
  if (!p) return ''
  if (/^https?:\/\//i.test(p)) return p
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? ''
  return `${base}${p}`
}

function estimateReadingMinutes(...chunks: (string | string[] | undefined)[]) {
  const text = chunks
    .flat()
    .filter(Boolean)
    .map((c) => (Array.isArray(c) ? c.join(' ') : c))
    .join(' ')
  const words = text.trim().split(/\s+/).length
  const minutes = Math.max(2, Math.round(words / 220))
  return minutes
}

/* ----------------------- Prev/Next ----------------------- */
function PrevNext({ slug }: { slug: string }) {
  const idx = allCards.findIndex((c) => c.slug === slug)
  if (idx === -1) return null
  const prev = allCards[idx - 1]
  const next = allCards[idx + 1]
  if (!prev && !next) return null
  return (
    <div className="mt-12 flex flex-wrap items-center justify-between gap-3">
      {prev ? (
        <Link
          href={`/services/${prev.slug}`}
          className="inline-flex items-center rounded-xl border border-[#BFD0F6] px-5 py-2.5 text-[16px] text-[#001130] hover:bg-[#EBF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6592E1]/40"
        >
          ← {prev.name}
        </Link>
      ) : <span />}
      {next ? (
        <Link
          href={`/services/${next.slug}`}
          className="inline-flex items-center rounded-xl border border-[#BFD0F6] px-5 py-2.5 text-[16px] text-[#001130] hover:bg-[#EBF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6592E1]/40"
        >
          {next.name} →
        </Link>
      ) : <span />}
    </div>
  )
}

/* -------------------------------- Page ---------------------------- */
export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const raw = findDetail(params.slug)
  const card = allCards.find((c) => c.slug === params.slug)
  if (!raw || !card) return notFound()

  const ov = OVERRIDES[params.slug]

  // Merge overrides (no placeholders) + inject per-slug YouTube URL
  const mergedMedia = {
    ...(raw.media ?? {}),
    ...(ov?.youtubeUrl ? { youtubeUrl: ov.youtubeUrl } : {}),
  }

  const data: Detail = {
    ...raw,
    media: mergedMedia,
    overview: ov?.overview ?? raw.overview,
    whatItIs: ov?.whatItIs ?? raw.whatItIs,
    howItWorks: {
      ...(raw.howItWorks ?? {}),
      summary: ov?.howItWorksSummary ?? raw.howItWorks?.summary,
      details: ov?.howItWorksDetails ?? raw.howItWorks?.details,
      plainLanguage: ov?.howItWorksPlain ?? raw.howItWorks?.plainLanguage,
    },
    benefits: ov?.benefits ?? raw.benefits,
    sessionFlow: ov?.sessionFlow ?? raw.sessionFlow,
    howToPrepare: ov?.howToPrepare ?? raw.howToPrepare,
    safety: { notes: ov?.safetyNotes ?? raw.safety?.notes },
    faq: ov?.faqs ?? raw.faq,
    moreAboutH2: ov?.moreAboutH2 ?? raw.moreAboutH2,
    helmet810: ov?.devicesBlock
      ? {
          title: ov.devicesBlock.title,
          deviceSpecs: ov.devicesBlock.deviceSpecs,
          mechanisms: ov.devicesBlock.mechanisms,
          timeAndFrequency: ov.devicesBlock.timeAndFrequency,
        }
      : raw.helmet810,
    sources: ov?.sources?.length ? ov.sources : raw.sources,
  }

  const sources = data.sources ?? []
  const ytId =
    data.media?.youtubeId ?? (data.media?.youtubeUrl ? parseYouTubeId(data.media.youtubeUrl) : null)
  const ytUrl = data.media?.youtubeUrl || (ytId ? `https://www.youtube.com/watch?v=${ytId}` : undefined)
  const aspect = data.media?.aspect ?? '16:9'
  const pad = aspect === '1:1' ? 'pt-[100%]' : aspect === '4:3' ? 'pt-[75%]' : 'pt-[56.25%]'
  const readMins = estimateReadingMinutes(
    data.overview,
    data.whatItIs,
    data.howItWorks?.summary,
    data.howItWorks?.details,
    data.howItWorks?.plainLanguage,
    data.benefits,
    data.sessionFlow,
    data.howToPrepare,
    data.helmet810?.deviceSpecs,
    data.helmet810?.timeAndFrequency,
    data.moreAboutH2?.mechanismSnapshot,
    data.moreAboutH2?.bestUseTips,
    data.moreAboutH2?.storageAndPrep,
    data.faq?.map((f) => `${f.q} ${f.a}`),
  )

  const primaryCta = ov?.ctaLabel ?? 'Book a Session'
  const heroAlt = ov?.alt?.[0] ?? ''

  return (
    <>
      {/* Editorial hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10">
          {data.heroImage ? (
            <div className="h-full w-full overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={prefixAsset(data.heroImage)} alt={heroAlt} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-[#001130]/80 via-[#001130]/55 to-[#001130]/0" />
            </div>
          ) : (
            <div className="h-full w-full bg-gradient-to-b from-[#EBF2FF] via-white to-white" />
          )}
        </div>

        <Container className="pt-12 md:pt-16 pb-8">
          <Breadcrumbs name={data.name} />
          <div className="mt-6 max-w-6xl">
            <p className="text-[12px] uppercase tracking-[0.22em] text-[#EBF2FF]/90 md:text-[13px]">Service</p>
            <h1 className="mt-2 text-5xl font-semibold tracking-tight text-white md:text-6xl">{data.name}</h1>

            {card.tagline ? (
              <p className="mt-3 text-[19px]/8 text-slate-100 md:text-[20px]">{card.tagline}</p>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-2">
              {(data.badges ?? []).map((b) => <Pill key={b} tone="slate">{b}</Pill>)}
              {card.intensity && <Pill tone="sky">🎚 {card.intensity}</Pill>}
              {card.duration && <Pill tone="brand">⏱ {card.duration}</Pill>}
              <span className="ml-1 text-[13px] text-slate-200/90">· ~{readMins} min read</span>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center rounded-xl border border-[#BFD0F6]/60 bg-[#001130]/30 px-5 py-2.5 text-[16px] text-[#EBF2FF] backdrop-blur hover:bg-[#001130]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#81B1E6]/50"
              >
                ← Back to services
              </Link>
              <a
                href="/contact"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#6592E1] to-[#81B1E6] px-5 py-2.5 text-[16px] font-semibold text-[#FCFDFE] shadow-sm hover:from-[#547FD3] hover:to-[#6FA0EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6592E1]/50"
              >
                {primaryCta} ↗
              </a>
            </div>
          </div>

          {/* Wide YouTube (now filled per slug) */}
          {ytId ? (
            <div className="mt-8 overflow-hidden rounded-2xl border border-[#E6EEFF] bg-[#001130]/10 backdrop-blur">
              <div className={`relative ${pad}`}>
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube-nocookie.com/embed/${ytId}`}
                  title={data.media?.title ?? 'Video'}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              {data.media?.title ? (
                <p className="px-4 py-3 text-center text-[13px] text-slate-100/90">
                  {data.media.title} · {ytUrl ? <a href={ytUrl} target="_blank" rel="noreferrer noopener" className="underline decoration-slate-300 underline-offset-4">Open on YouTube</a> : null}
                </p>
              ) : null}
            </div>
          ) : null}
        </Container>
      </section>

      {/* Single-column body */}
      <section className="py-10 md:py-12">
        <Container>
          <article className="mx-auto max-w-4xl rounded-3xl border border-[#E6EEFF] bg-white p-6 shadow-sm md:max-w-5xl md:p-10">
            {/* Optional lead image if there’s no video */}
            {!ytId && data.heroImage ? (
              <figure className="mb-8 overflow-hidden rounded-2xl border border-[#E6EEFF]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={prefixAsset(data.heroImage)} alt={heroAlt} className="w-full object-cover" />
              </figure>
            ) : null}

            {/* Overview */}
            {data.overview ? (
              <>
                <h2 id="overview" className="mt-2 scroll-mt-28 text-3xl font-semibold text-[#001130] md:text-[32px]">
                  Overview
                </h2>
                <p className="mt-4 text-[18px]/8 text-slate-700 md:text-[19px]">{data.overview}</p>
              </>
            ) : null}

            {/* What it is */}
            {data.whatItIs ? (
              <>
                <SectionHeader id="what-it-is">What it is</SectionHeader>
                <p className="mt-4 text-[18px]/8 text-slate-700 md:text-[19px]">{data.whatItIs}</p>
              </>
            ) : null}

            {/* How it works */}
            {(data.howItWorks?.summary || data.howItWorks?.details?.length || data.howItWorks?.plainLanguage) && (
              <>
                <SectionHeader id="how-it-works">How it works</SectionHeader>
                {data.howItWorks?.summary ? (
                  <p className="mt-4 text-[18px]/8 text-slate-700 md:text-[19px]">{data.howItWorks.summary}</p>
                ) : null}
                {data.howItWorks?.details?.length ? <DotList items={data.howItWorks.details} /> : null}
                {data.howItWorks?.plainLanguage ? (
                  <InfoCallout title="In plain language">
                    <p className="text-[17px]/7">{data.howItWorks.plainLanguage}</p>
                  </InfoCallout>
                ) : null}
              </>
            )}

            {/* Benefits */}
            {data.benefits?.length ? (
              <>
                <SectionHeader id="benefits">Potential benefits</SectionHeader>
                <DotList items={data.benefits} />
              </>
            ) : null}

            {/* What to expect */}
            {data.sessionFlow?.length ? (
              <>
                <SectionHeader id="session-flow">What to expect</SectionHeader>
                <TimelineList items={data.sessionFlow} />
              </>
            ) : null}

            {/* How to prepare */}
            {data.howToPrepare?.length ? (
              <>
                <SectionHeader id="how-to-prepare">How to prepare</SectionHeader>
                <DotList items={data.howToPrepare} />
              </>
            ) : null}

            {/* Devices & parameters (repurposed helmet810 API) */}
            {data.helmet810 && (data.helmet810.title || data.helmet810.deviceSpecs?.length || data.helmet810.timeAndFrequency?.length) ? (
              <>
                <SectionHeader id="devices-params">{data.helmet810.title ?? 'Devices & parameters'}</SectionHeader>
                {data.helmet810.deviceSpecs?.length ? <DotList items={data.helmet810.deviceSpecs} /> : null}
                {data.helmet810.timeAndFrequency?.length ? <Accordion title="Time & frequency"><DotList items={data.helmet810.timeAndFrequency} /></Accordion> : null}
              </>
            ) : null}

            {/* More about H2 */}
            {data.moreAboutH2 &&
              (data.moreAboutH2.mechanismSnapshot?.length ||
                data.moreAboutH2.bestUseTips?.length ||
                data.moreAboutH2.storageAndPrep?.length) && (
                <>
                  <SectionHeader id="more-about-h2">More about H₂</SectionHeader>
                  {data.moreAboutH2.mechanismSnapshot?.length ? (
                    <Accordion title="Mechanism snapshot"><DotList items={data.moreAboutH2.mechanismSnapshot} /></Accordion>
                  ) : null}
                  {data.moreAboutH2.bestUseTips?.length ? (
                    <Accordion title="Best-use tips"><DotList items={data.moreAboutH2.bestUseTips} /></Accordion>
                  ) : null}
                  {data.moreAboutH2.storageAndPrep?.length ? (
                    <Accordion title="Storage & prep"><DotList items={data.moreAboutH2.storageAndPrep} /></Accordion>
                  ) : null}
                </>
              )}

            {/* Safety */}
            {data.safety?.notes?.length ? (
              <>
                <SectionHeader id="safety">Safety & considerations</SectionHeader>
                <InfoCallout title="Please read">
                  <ul className="list-disc pl-5 text-[17px]/7">
                    {data.safety.notes.map((n) => <li key={n}>{n}</li>)}
                  </ul>
                </InfoCallout>
              </>
            ) : null}

            {/* FAQs */}
            {data.faq?.length ? (
              <>
                <SectionHeader id="faqs">FAQs</SectionHeader>
                <div className="mt-4 space-y-3">
                  {data.faq.map((f) => (
                    <details key={f.q} className="group rounded-2xl border border-[#E6EEFF] bg-white/95 p-6 open:bg-white">
                      <summary className="cursor-pointer select-none text-[17px] font-semibold text-[#001130] outline-none">
                        {f.q}
                        <span className="ml-2 text-slate-400 transition group-open:rotate-180">▾</span>
                      </summary>
                      <div className="mt-3 text-[17px]/7 text-slate-700"><p>{f.a}</p></div>
                    </details>
                  ))}
                </div>
              </>
            ) : null}

            {/* Sources */}
            <div className="mt-12">
              <SectionHeader id="sources">Sources</SectionHeader>
              <ul className="mt-4 space-y-2">
                {(data.sources ?? []).map((s) => (
                  <li key={s.label} className="flex items-start gap-2">
                    <span aria-hidden className="mt-[0.45rem] inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="text-[17px]/7 text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
                    >
                      {s.label}<span aria-hidden className="ml-1">↗</span>
                    </a>
                  </li>
                ))}
                {!(data.sources ?? []).length && (
                  <li className="text-slate-500 text-[16px]">Sources will be added soon.</li>
                )}
              </ul>

              <p className="mt-4 text-[12px] text-slate-500">
                General wellness information only; not medical advice.
              </p>
            </div>

            {/* Footer actions */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="inline-flex items-center rounded-xl border border-[#BFD0F6] px-5 py-2.5 text-[16px] text-[#001130] hover:bg-[#EBF2FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6592E1]/40"
              >
                ← Back to services
              </Link>
              <a
                href="/contact"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center rounded-xl bg-gradient-to-r from-[#6592E1] to-[#81B1E6] px-5 py-2.5 text-[16px] font-semibold text-[#FCFDFE] hover:from-[#547FD3] hover:to-[#6FA0EA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6592E1]/50"
              >
                {ov?.ctaLabel ?? 'Book a Session'} ↗
              </a>
            </div>

            <PrevNext slug={data.slug} />
          </article>
        </Container>
      </section>
    </>
  )
}
