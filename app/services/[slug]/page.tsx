// app/services/[slug]/page.tsx
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Container from '@/components/Container'
import cards from '@/data/services.json'
import details from '@/data/service-details.json'

type Card = {
  id: string
  name: string
  slug: string
  tagline?: string
  summary: string
  duration?: string
  image?: string
}

type Detail = {
  slug: string
  name: string
  badges?: string[]
  overview: string
  whatItIs: string
  benefits?: string[]
  sessionFlow?: string[]
  safety?: { notes?: string[] }
  sources?: { label: string; href: string }[]
}

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
const PRESET_SOURCES: Record<string, { label: string; href: string }[]> = {
  // Photobiomodulation / Red Light Therapy
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

  // Hydrogen-Rich Water
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

  // Energy Enhancement System — neutral, compliance-forward resources
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

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const data = findDetail(params.slug)
  const card = allCards.find((c) => c.slug === params.slug)
  if (!data || !card) return notFound()

  const sources = (data.sources?.length ? data.sources : PRESET_SOURCES[data.slug]) ?? []

  return (
    <>
      {/* Header (one-column, no image) */}
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
                  <span
                    key={b}
                    className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-900"
                  >
                    {b}
                  </span>
                ))}
                {card.duration && (
                  <span className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-700">
                    ⏱ {card.duration}
                  </span>
                )}
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

      {/* Body — single column */}
      <section className="py-8 md:py-10">
        <Container>
          <article className="mx-auto max-w-3xl rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur">
            <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
            <p className="mt-2 text-slate-700">{data.overview}</p>

            <h3 className="mt-6 text-base font-semibold text-slate-900">What it is</h3>
            <p className="mt-2 text-slate-700">{data.whatItIs}</p>

            {data.benefits?.length ? (
              <>
                <h3 className="mt-6 text-base font-semibold text-slate-900">Potential benefits</h3>
                <ul className="mt-2 space-y-2 text-slate-700">
                  {data.benefits.map((b) => (
                    <li key={b} className="flex gap-3">
                      <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {data.sessionFlow?.length ? (
              <>
                <h3 className="mt-6 text-base font-semibold text-slate-900">Session flow (what to expect)</h3>
                <ol className="mt-2 list-decimal space-y-2 pl-5 text-slate-700">
                  {data.sessionFlow.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </>
            ) : null}

            {data.safety?.notes?.length ? (
              <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
                <p className="font-semibold">Safety notes</p>
                <ul className="mt-2 list-disc pl-5 text-sm/6">
                  {data.safety.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            {/* Sources */}
            <div className="mt-6">
              <h3 className="text-base font-semibold text-slate-900">Sources & references</h3>
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
                Wellness services are not medical treatment. This page is for general information and is not a
                substitute for professional advice.
              </p>
            </div>
          </article>
        </Container>
      </section>
    </>
  )
}
