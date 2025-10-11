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
  heroImage?: string
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

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const data = findDetail(params.slug)
  const card = allCards.find((c) => c.slug === params.slug)
  if (!data || !card) return notFound()

  // Prefix assets for GitHub Pages subpaths
  const asset = (p?: string) =>
    p ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}` : undefined

  return (
    <>
      {/* Header / hero */}
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white" />
        <Container className="pt-12 md:pt-16 pb-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border bg-white">
                {card.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={asset(card.image)}
                    alt=""
                    className="h-10 w-10 object-contain"
                  />
                ) : null}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700/70">
                  Service
                </p>
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
            </div>

            <div className="md:ml-auto flex gap-3">
              <Link
                href="/services"
                className="inline-flex items-center rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 hover:bg-white"
              >
                ← Back to services
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <section className="py-8 md:py-10">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1.5fr,1fr]">
            {/* Main content */}
            <article className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-sm backdrop-blur">
              <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
              <p className="mt-2 text-slate-700">{data.overview}</p>

              <h3 className="mt-6 text-base font-semibold text-slate-900">
                What it is
              </h3>
              <p className="mt-2 text-slate-700">{data.whatItIs}</p>

              {data.benefits?.length ? (
                <>
                  <h3 className="mt-6 text-base font-semibold text-slate-900">
                    Potential benefits
                  </h3>
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
                  <h3 className="mt-6 text-base font-semibold text-slate-900">
                    Session flow (what to expect)
                  </h3>
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

              {data.sources?.length ? (
                <>
                  <h3 className="mt-6 text-base font-semibold text-slate-900">
                    Sources & references
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {data.sources.map((s) => (
                      <li key={s.label} className="flex items-start gap-2">
                        <span
                          aria-hidden
                          className="mt-[0.35rem] inline-block h-1.5 w-1.5 rounded-full bg-slate-400"
                        />
                        <a
                          href={s.href || '#'}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
                        >
                          {s.label}
                          <span aria-hidden className="ml-1">↗</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </article>

            {/* Side card */}
            <aside className="grid gap-4">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-emerald-900">
                <p className="font-semibold">How to book</p>
                <p className="mt-1 text-sm/6">
                  Message us your preferred times and we’ll confirm availability.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center rounded-lg bg-emerald-700 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-800"
                >
                  Contact us
                </Link>
              </div>

              {card.image ? (
                <div className="rounded-2xl border bg-white p-5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(card.image)}
                    alt=""
                    className="mx-auto h-24 w-24 object-contain"
                    loading="lazy"
                  />
                </div>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>
    </>
  )
}
