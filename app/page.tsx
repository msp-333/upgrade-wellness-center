import Link from 'next/link'
import Container from '@/components/Container'
import services from '@/data/services.json'

export const metadata = {
  title: 'Home',
  description:
    'Feel better, move better, sleep better—sustainable wellness for real life.',
}

export default function HomePage() {
  const svc = (services as any[]).slice(0, 3)

  // Prefix assets for GitHub Pages subpaths
  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`

  // ⇩ Put your hero image under /public/images
  const HERO_BG = '/images/hero.jpg'

  return (
    <>
      {/* ============================ HERO ============================ */}
      <section className="relative isolate overflow-hidden min-h-[76vh]">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset(HERO_BG)})` }}
          aria-hidden
        />

        {/* Dark spa tint for depth */}
        <div
          className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/70"
          aria-hidden
        />

        {/* Soft brand aurora accents */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-28 -right-20 h-80 w-80 rounded-full bg-brand-500/25 blur-3xl" aria-hidden />

        <Container className="relative pt-24 pb-24 md:pt-32 md:pb-32">
          {/* Hairline gradient wrapper */}
          <div className="mx-auto max-w-6xl rounded-[1.5rem] p-[1px] bg-gradient-to-br from-white/40 via-white/20 to-emerald-400/40">
            {/* Glass card */}
            <div className="rounded-[1.45rem] bg-white/75 backdrop-blur-2xl ring-1 ring-white/50 shadow-xl px-6 py-10 md:px-16 md:py-16">
              <div className="max-w-4xl">
                {/* Eyebrow */}
                <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700/70">Holistic • Human • Kind</p>

                {/* Title */}
                <h1 className="mt-2 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                  Time for a <span className="text-emerald-600">Recharge</span>?
                </h1>

                {/* Body copy */}
                <p className="mt-5 text-[15px] leading-relaxed text-slate-700">
                  At Upgrade Wellness, we’re all about hydration, healing, and the harmony of health—
                  because true wellness is both a science and an art. Rebalance, rejuvenate, and recharge
                  with holistic care that blends nature, innovation, and the chemistry of well-being.
                </p>

                {/* Trust points */}
                <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm text-slate-700">
                  {["Family-friendly environment", "Evidence-informed practices"].map((b) => (
                    <li key={b} className="inline-flex items-center gap-2">
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                        <path
                          d="M4 10l3 3 9-9"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-emerald-400"
                        />
                      </svg>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/contact/"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/40 sm:w-auto"
                  >
                    Contact us
                  </Link>
                  <Link
                    href="/events/"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-medium text-slate-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300/60 sm:w-auto"
                  >
                    Upcoming events
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      {/* ========================== /HERO =========================== */}

      {/* ============================ STATS ============================ */}
      <section className="py-14 bg-gradient-to-b from-white to-emerald-50/40">
        <Container>
          <h2 className="text-center text-2xl font-semibold text-slate-900">Upgrade your wellness, upgrade your life</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { kpi: '10+', label: 'Programs & workshops' },
              { kpi: '100%', label: 'Human-friendly & practical' },
              { kpi: 'Community', label: 'Learn together, stay consistent' },
            ].map((s) => (
              <div
                key={s.label}
                className="relative rounded-3xl bg-white p-6 text-center ring-1 ring-inset ring-slate-200 shadow-sm"
              >
                <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-emerald-400/15 via-emerald-400/0 to-brand-500/15 opacity-70" aria-hidden />
                <div className="relative">
                  <div className="text-3xl font-semibold text-emerald-600">{s.kpi}</div>
                  <div className="mt-1 text-sm text-slate-600">{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ======================== SERVICES PREVIEW ===================== */}
      <section id="recharge-renew" className="py-14">
        <Container>
          <div className="mx-auto mb-2 max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Recharge & Renew</h2>
            <p className="mt-2 text-slate-600">
              Three simple ways to support recovery and everyday energy.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {svc.map((s: any) => (
              <Link
                key={s.id}
                href={`/services/#${s.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-lg transition-transform hover:-translate-y-0.5"
              >
                <div className="relative h-44 w-full overflow-hidden rounded-xl ring-1 ring-inset ring-slate-200/70">
                  <img
                    src={asset(s.image)}
                    alt={s.name ?? ''}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" aria-hidden />
                </div>
                <h3 className="mt-4 text-lg font-medium text-slate-900">{s.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.tagline}</p>
                <span className="mt-4 inline-flex items-center text-sm text-emerald-700 transition-transform group-hover:translate-x-0.5">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/services/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-5 py-3 text-sm font-medium text-slate-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300/60"
            >
              Discover all services
            </Link>
          </div>
        </Container>
      </section>

      {/* =============================== CTA =========================== */}
      <section className="py-16">
        <Container>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl">
            {/* Decorative leafy glow */}
            <div className="pointer-events-none absolute -top-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-brand-300/20 blur-3xl" aria-hidden />

            <div className="relative grid gap-6 p-6 md:grid-cols-[1.5fr,1fr] md:p-10">
              <div>
                <h2 className="text-2xl md:text-3xl">Start your upgrade</h2>
                <p className="mt-2 text-white/90">
                  Join an event or reach out for a custom plan. We’ll help you choose the right first step.
                </p>
              </div>
              <div className="flex items-center justify-start gap-3 md:justify-end">
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Book a time
                </Link>
                <Link
                  href="/events/"
                  className="inline-flex items-center justify-center rounded-xl border border-white/80 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
                  See events
                </Link>
              </div>
            </div>
            <div className="relative h-1 w-full bg-gradient-to-r from-white/30 via-white/60 to-white/30" />
          </div>
        </Container>
      </section>
    </>
  )
}
