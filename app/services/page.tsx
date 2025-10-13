// app/services/page.tsx
import Link from 'next/link'
import Container from '@/components/Container'
import services from '@/data/services.json'

type ServiceItem = {
  id: string
  name: string
  slug: string
  tagline?: string
  summary: string
  duration?: string
  image?: string
}

export const metadata = {
  title: 'Services | Upgrade Wellness Center PR',
  description:
    'Energy Enhancement System, Red Light Therapy (Photobiomodulation), and Hydrogen-Rich Water.',
  alternates: { canonical: '/services' },
  robots: { index: true, follow: true },
}

// Credible, non-promotional sources per service.
// Update the keys to match your services.json slugs.
const SOURCES: Record<
  string,
  { label: string; href: string; note?: string }[]
> = {
  // Red Light Therapy / Photobiomodulation
  'red-light-therapy': [
    {
      label: 'Cleveland Clinic — Red Light Therapy overview',
      href: 'https://my.clevelandclinic.org/health/articles/22114-red-light-therapy',
      note: 'General benefits/risks overview (skin, pain, wound care).',
    },
    {
      label:
        'JAAD (2025) — Evidence-based consensus on clinical use of PBM (dermatology)',
      href: 'https://www.sciencedirect.com/science/article/pii/S0190962225006590',
      note: 'Expert consensus; emphasizes indications and parameters are still being refined.',
    },
    {
      label:
        'Mass General (Harvard) Psych News — PBM clinic & research focus',
      href: 'https://mghpsychnews.org/photobiomodulatineuromodulation-approaches-like-transcranial-photobiomodulation-are-emerging-as-critical-areas-of-study-potentially-revolutionizing-the-care-for-patients-with-treatment-resistant-psyc/',
      note: 'Research on near-infrared PBM for mood/anxiety; investigational.',
    },
  ],

  // Hydrogen-Rich Water
  'hydrogen-water': [
    {
      label:
        'PubMed (2024) — Hydrogen water: systematic review of potential benefits',
      href: 'https://pubmed.ncbi.nlm.nih.gov/38256045/',
      note: 'Includes 25 studies; evidence varies by outcome and study quality.',
    },
    {
      label:
        'Pharmaceuticals (2023) — SR/Meta-analysis: HRW and blood lipid profiles',
      href: 'https://www.mdpi.com/1424-8247/16/2/142',
      note: 'Clinical populations; small studies—interpret cautiously.',
    },
  ],

  // Energy Enhancement System (EES) — neutral, compliance-focused links
  'energy-enhancement-system': [
    {
      label: 'FDA — About Warning & Close-Out Letters',
      href: 'https://www.fda.gov/inspections-compliance-enforcement-and-criminal-investigations/warning-letters/about-warning-and-close-out-letters',
      note: 'How the FDA evaluates health claims and enforces compliance.',
    },
    {
      label: 'FTC — About Warning Letters & health advertising claims',
      href: 'https://www.ftc.gov/news-events/topics/truth-advertising/about-ftc-warning-letters',
      note: 'General guidance on truthful, non-misleading wellness claims.',
    },
  ],
}

export default function ServicesPage() {
  const list = services as ServiceItem[]

  return (
    <>
      {/* Hero / Intro (no images) */}
      <section className="relative isolate">
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white"
          aria-hidden
        />
        <Container className="pt-12 md:pt-16 pb-6">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700/70">
              Offerings
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
              Our Services
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Gentle, straightforward options to help you recharge. Read what to
              expect, see session details, and review independent sources.
            </p>
          </div>
        </Container>
      </section>

      {/* One-column cards (no pictures) */}
      <section className="py-8 md:py-10">
        <Container>
          <div className="mx-auto max-w-3xl space-y-6">
            {list.map((s) => {
              const src = SOURCES[s.slug] ?? []
              return (
                <article
                  key={s.id}
                  className="rounded-2xl border border-emerald-200/60 bg-white p-6 shadow-sm"
                >
                  <header>
                    <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
                      {s.name}
                    </h2>
                    {s.tagline && (
                      <p className="mt-1 text-emerald-800/80">{s.tagline}</p>
                    )}
                    {s.duration && (
                      <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                        {s.duration}
                      </p>
                    )}
                  </header>

                  <p className="mt-4 text-slate-700">{s.summary}</p>

                  {/* Evidence / Sources */}
                  <div className="mt-5 rounded-xl bg-emerald-50/60 p-4">
                    <h3 className="text-sm font-semibold text-emerald-900">
                      Sources
                    </h3>
                    {s.slug === 'energy-enhancement-system' && (
                      <p className="mt-1 text-[13px] text-slate-600">
                        Independent, peer-reviewed clinical evidence specific to
                        EES is limited. Review general FDA/FTC guidance on
                        health claims and talk with your clinician before trying
                        new modalities.
                      </p>
                    )}
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] text-slate-700">
                      {src.map((r, i) => (
                        <li key={i}>
                          <a
                            href={r.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-emerald-400 underline-offset-2 hover:text-emerald-800"
                          >
                            {r.label}
                          </a>
                          {r.note ? (
                            <span className="text-slate-500"> — {r.note}</span>
                          ) : null}
                        </li>
                      ))}
                      {src.length === 0 && (
                        <li className="text-slate-500">
                          We’ll add independent sources here soon.
                        </li>
                      )}
                    </ul>
                    <p className="mt-3 text-[12px] text-slate-500">
                      Wellness services are not medical treatment. This page is
                      for general information and is not a substitute for
                      professional advice.
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/services/${s.slug}`}
                      className="inline-flex items-center justify-center rounded-full border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
                    >
                      Learn more
                    </Link>
                    <Link
                      href="/contact/"
                      className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                      Contact us
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Footer CTA */}
      <section className="pb-12 md:pb-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl">
            <div
              className="pointer-events-none absolute -top-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl"
              aria-hidden
            />
            <div className="relative grid gap-6 p-6 md:grid-cols-[1.5fr,auto] md:p-10">
              <div>
                <h2 className="text-2xl md:text-3xl">Ready to get started?</h2>
                <p className="mt-2 text-white/90">
                  Send your preferred times and any questions—we’ll help you
                  plan your first visit.
                </p>
              </div>
              <div className="flex items-center gap-3 md:justify-end">
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Contact us
                </Link>
                <Link
                  href="/events/"
                  className="inline-flex items-center justify-center rounded-xl border border-white/70 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  See events
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
