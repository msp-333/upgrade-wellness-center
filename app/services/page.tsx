// app/services/page.tsx
import Link from 'next/link'
import Container from '@/components/Container'
import ServiceCard from '@/components/ServiceCard'
import services from '@/data/services.json'
import Reveal from '@/components/Reveal'

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

export default function ServicesPage() {
  const list = services as ServiceItem[]

  return (
    <main>
      {/* ===== Intro Hero (harmonized with site) ======================= */}
      <section className="relative isolate">
        {/* soft wash + subtle grid for depth */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-emerald-50 via-white to-white" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:24px_24px] md:bg-[size:28px_28px]" aria-hidden />

        <Container className="pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8">
          <Reveal delay={80}>
            <header className="max-w-3xl">
              <span className="inline-block rounded-full border border-emerald-600/20 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                Offerings
              </span>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Our Services
              </h1>
              <p className="mt-3 max-w-2xl text-slate-700">
                Gentle, straightforward options to help you recharge. Tap a card to see details, safety notes, and what to expect.
              </p>
            </header>
          </Reveal>

          {/* micro filters (non-interactive, purely visual to anchor the section) */}
          <Reveal delay={150}>
            <div className="mt-5 flex flex-wrap gap-2">
              {['All', 'EE System', 'Red Light', 'Hydrogen Water'].map((t, i) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm transition-transform duration-500 hover:-translate-y-0.5"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== Divider =================================================== */}
      <SectionDivider label="Choose a modality" tone="lavender" />

      {/* ===== Cards Grid =============================================== */}
      <section className="py-10 sm:py-12 md:py-16" aria-labelledby="services-heading">
        <Container>
          <h2 id="services-heading" className="sr-only">All services</h2>

          {/* Equal-height grid: every child stretches */}
          <ul
            role="list"
            className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7"
          >
            {list.map((s, i) => (
              <Reveal key={s.id} delay={120 + (i % 6) * 70}>
                <li className="h-full">
                  {/* ServiceCard already handles its own image/content */}
                  <ServiceCard item={s} />
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ===== Info strip (small reassurance + policy note) ============== */}
      <section className="pb-8">
        <Container>
          <Reveal delay={120}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-[#E4DAFF] bg-[#F8F5FF] px-4 py-3 text-center text-sm text-slate-700">
              Sessions are non-diagnostic and non-medical. For medical concerns, please consult your licensed provider.
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== Footer CTA (gradient, animated accents) =================== */}
      <section className="pb-14 sm:pb-16 md:pb-20">
        <Container>
          <Reveal delay={160}>
            <div className="relative overflow-hidden rounded-3xl border border-[#7C6FB0]/25 bg-[linear-gradient(135deg,#0C8D69,#19B6AE_55%,#7C6FB0)] text-white shadow-[0_10px_24px_rgba(16,24,40,.08)]">
              <div className="pointer-events-none absolute -top-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl motion-safe:animate-pulse" aria-hidden />
              <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl motion-safe:animate-pulse" aria-hidden />
              <div className="relative grid gap-6 p-6 md:grid-cols-[1.5fr,auto] md:p-10 lg:gap-8">
                <div>
                  <h2 className="text-2xl md:text-3xl">Ready to get started?</h2>
                  <p className="mt-2 text-white/90">Send your preferred times and any questions—we’ll help you plan your first visit.</p>
                </div>
                <div className="grid gap-3 sm:auto-cols-max sm:grid-flow-col md:justify-end">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center justify-center rounded-[999px] bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow transition-all hover:-translate-y-0.5 hover:bg-white/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Contact us
                  </Link>
                  <Link
                    href="/events/"
                    className="inline-flex items-center justify-center rounded-[999px] border border-white/70 px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    See events
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </main>
  )
}

/* ------------------------------ Divider helper (matches other pages) ------------------------------ */
function SectionDivider({ label, tone = 'emerald' }: { label: string; tone?: 'emerald' | 'lavender' }) {
  const line =
    tone === 'lavender'
      ? 'from-[#7C6FB0]/30 via-transparent to-[#7C6FB0]/30'
      : 'from-emerald-500/30 via-transparent to-emerald-500/30'
  return (
    <div className="py-6 sm:py-8">
      <Container>
        <div className="mx-auto flex max-w-3xl items-center gap-3 sm:gap-4 px-1">
          <span className={`hidden sm:block h-px w-10 bg-gradient-to-r ${line}`} />
          <span className="text-[10px] sm:text-xs font-medium uppercase tracking-widest text-slate-500">{label}</span>
          <span className={`h-px flex-1 bg-gradient-to-r ${line}`} />
        </div>
      </Container>
    </div>
  )
}