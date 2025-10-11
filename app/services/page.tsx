// app/services/page.tsx
import Link from 'next/link'
import Container from '@/components/Container'
import ServiceCard from '@/components/ServiceCard'
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

export default function ServicesPage() {
  const list = services as ServiceItem[]

  return (
    <>
      {/* Hero / Intro */}
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
              Gentle, straightforward options to help you recharge. Tap a card
              to see details, safety notes, and what to expect.
            </p>
          </div>
        </Container>
      </section>

      {/* Cards */}
      <section className="py-8 md:py-10">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {list.map((s) => (
              <ServiceCard key={s.id} item={s} />
            ))}
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
                  Send your preferred times and any questions—we’ll help you plan
                  your first visit.
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
