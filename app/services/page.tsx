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
      {/* ===== Intro Hero (clean, no grid background) =================== */}
      <section className="relative isolate">
        {/* soft washes only */}
        <div className="pointer-events-none absolute inset-0 -z-20 bg-gradient-to-b from-emerald-50 via-white to-white" />
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#F3EDFF]/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-100/70 blur-3xl" />

        <Container className="pt-14 sm:pt-16 md:pt-20 pb-6 sm:pb-8">
          <Reveal delay={80}>
            <header className="max-w-3xl">
              <span className="inline-block rounded-full border border-emerald-600/20 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
                Offerings
              </span>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                Our Services
              </h1>
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-700">
                Gentle, straightforward options to help you recharge. Tap a card to see details, safety notes, and what to expect.
              </p>
            </header>
          </Reveal>

          {/* chips moved into a subtle glass bar under the header */}
          <Reveal delay={140}>
            <div className="mt-5 rounded-[16px] border border-slate-200/70 bg-white/70 p-2 shadow-sm backdrop-blur">
              <div className="flex flex-wrap gap-2">
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
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== Cards Grid (pulled up closer; no extra divider text) ====== */}
      <section className="pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-20" aria-labelledby="services-heading">
        <Container>
          <h2 id="services-heading" className="sr-only">All services</h2>

          <ul
            role="list"
            className="mx-auto grid max-w-6xl grid-cols-1 items-stretch gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7"
          >
            {list.map((s, i) => (
              <Reveal key={s.id} delay={100 + (i % 6) * 70}>
                <li className="h-full">
                  <ServiceCard item={s} />
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ===== Footer CTA (unchanged style, harmonized colors) ========== */}
      <section className="pb-14 sm:pb-16 md:pb-20">
        <Container>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-[#7C6FB0]/25 bg-[linear-gradient(135deg,#0C8D69,#19B6AE_55%,#7C6FB0)] text-white shadow-[0_10px_24px_rgba(16,24,40,.08)]">
              <div className="pointer-events-none absolute -top-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl motion-safe:animate-pulse" />
              <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl motion-safe:animate-pulse" />
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
