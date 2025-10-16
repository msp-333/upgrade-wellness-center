// app/about/page.tsx
import Link from 'next/link'
import Container from '@/components/Container'
import Reveal from '@/components/Reveal'

export const metadata = {
  title: 'About | Upgrade Wellness Center',
  description: 'Our mission and approach.',
}

export default function AboutPage() {
  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`

  const values = [
    { title: 'Simplicity', body: 'Small steps, real routines.' },
    { title: 'Science-informed', body: 'Grounded, practical, updated.' },
    { title: 'Compassion', body: 'Care that meets you where you are.' },
    { title: 'Consistency', body: 'Tiny wins, repeated.' },
  ]

  const modalities = [
    { title: 'Hydrogen Water', body: 'Hydrate. Refresh.', icon: WaterIcon, href: '/services#hydrogen-water' },
    { title: 'Energy Enhancement', body: 'Unplug. Restore.', icon: EnergyIcon, href: '/services#energy-enhancement' },
    { title: 'Red Light Therapy', body: 'Gentle. Quick.', icon: LightIcon, href: '/services#red-light-therapy' },
  ]

  return (
    <main>
      <Container className="py-14 sm:py-16 md:py-20">
        {/* ===== HERO (single header — no duplicate label) ================ */}
        <section className="relative grid items-center gap-8 md:grid-cols-2">
          {/* soft accents */}
          <div className="pointer-events-none absolute -top-20 -left-24 h-64 w-64 rounded-full bg-[#F3EDFF]/60 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl" />

          <Reveal delay={80}>
            <header aria-labelledby="about-title">
              <p className="text-[11px] font-semibold tracking-[0.14em] text-brand-700">ABOUT UPGRADE</p>
              <h1 id="about-title" className="mt-2 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
                Better feels possible.
              </h1>
              <p className="mt-3 max-w-xl text-base text-text-secondary md:text-lg">
                Calm spaces, clear guidance, and practical routines that fit real life.
              </p>

              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Trust points">
                {['Calm space', 'Evidence-minded', 'Judgment-free'].map((t, i) => (
                  <li
                    key={t}
                    className="inline-flex items-center rounded-pill border border-brand-300/60 bg-white px-3 py-1 text-sm text-brand-800 shadow-soft transition-transform duration-500 hover:-translate-y-0.5"
                    style={{ transitionDelay: `${i * 60}ms` }}
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </header>
          </Reveal>

          {/* Collage */}
          <Reveal delay={140}>
            <div className="relative">
              <img
                src={asset('/images/about-studio.png')}
                alt="The Upgrade Wellness studio lounge area"
                loading="lazy"
                className="h-64 w-full rounded-3xl object-cover shadow-soft ring-1 ring-inset ring-white/60 sm:h-72 md:h-80"
              />
              <img
                src={asset('/images/about-session.png')}
                alt="Quiet session space"
                loading="lazy"
                className="absolute -bottom-6 -left-6 hidden h-32 w-48 rounded-2xl object-cover shadow-soft ring-1 ring-white/70 md:block motion-safe:animate-[float_9s_ease-in-out_infinite]"
                style={{ animationDelay: '300ms' }}
              />
              <img
                src={asset('/images/about-light.png')}
                alt="Red light therapy setup"
                loading="lazy"
                className="absolute -top-6 -right-6 hidden h-28 w-40 rounded-2xl object-cover shadow-soft ring-1 ring-white/70 md:block motion-safe:animate-[float_10s_ease-in-out_infinite]"
              />
            </div>
          </Reveal>
        </section>

        {/* ===== QUICK STATS (tight rhythm, consistent copy) ============== */}
        <section className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { k: '3', v: 'Core modalities' },
            { k: '60–240', v: 'Minute sessions' },
            { k: '1%', v: 'Better each day' },
          ].map((s, i) => (
            <Reveal key={s.v} delay={100 + i * 90}>
              <div className="rounded-card border bg-white p-5 text-center shadow-soft transition-transform duration-500 hover:-translate-y-1 hover:shadow-md">
                <div className="text-3xl font-semibold text-text-primary md:text-4xl">{s.k}</div>
                <div className="mt-1 text-sm text-text-secondary">{s.v}</div>
              </div>
            </Reveal>
          ))}
        </section>

        {/* ===== MODALITIES (cards align with Home aesthetics) ============ */}
        <section className="mt-14 sm:mt-16">
          <SectionHeader
            kicker="What we offer"
            title="Gentle tools for everyday recovery"
            subtitle="Modern modalities, human guidance."
            tone="emerald"
          />

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {modalities.map((m, i) => (
              <Reveal key={m.title} delay={140 + i * 90}>
                <Link
                  href={m.href}
                  className="group block rounded-card border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-brand-300/70 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/60"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700 ring-1 ring-inset ring-brand-300/30 transition-transform duration-300 group-hover:scale-105">
                      <m.icon />
                    </span>
                    <div>
                      <div className="text-base font-semibold text-text-primary">{m.title}</div>
                      <div className="text-sm text-text-secondary">{m.body}</div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={420}>
            <p className="mt-3 text-xs text-text-secondary">
              Wellness modalities are not medical care. Consult your licensed provider for medical concerns.
            </p>
          </Reveal>
        </section>

        {/* ===== VALUES (balanced grid; consistent language) ============== */}
        <section className="mt-14 sm:mt-16">
          <SectionHeader
            kicker="How we operate"
            title="Values that shape every visit"
            subtitle="Simple. Kind. Evidence-informed."
            tone="lavender"
          />

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={140 + i * 80}>
                <div className="rounded-card border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <div className="text-sm font-medium text-brand-700">{v.title}</div>
                  <p className="mt-1 text-sm text-text-secondary">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== CTA (kept concise; spacing harmonized) =================== */}
        <section className="mt-16">
          <Reveal delay={160}>
            <div className="flex flex-col items-start justify-between gap-4 rounded-card border bg-gradient-to-r from-brand-700 to-gradient-end p-6 text-white md:flex-row md:items-center">
              <div>
                <h2 className="text-lg font-semibold md:text-xl">Ready to start?</h2>
                <p className="mt-1 text-sm/relaxed opacity-90">Book a visit or ask a quick question—no pressure.</p>
              </div>
              <div className="grid gap-3 sm:auto-cols-max sm:grid-flow-col">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-pill bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-soft transition hover:-translate-y-0.5 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Contact us
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-pill bg-lavender-600 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/40 transition hover:-translate-y-0.5 hover:bg-lavender-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </Container>
    </main>
  )
}

/* ---------- Reusable headers (matches Home) ---------- */
function SectionHeader({
  kicker,
  title,
  subtitle,
  tone = 'emerald',
  align = 'left',
}: {
  kicker: string
  title: string
  subtitle?: string
  tone?: 'emerald' | 'lavender'
  align?: 'left' | 'center'
}) {
  const alignCls = align === 'center' ? 'mx-auto text-center' : ''
  const pillColor =
    tone === 'lavender'
      ? 'bg-white text-[#7C6FB0] border-[#E4DAFF]'
      : 'bg-white text-emerald-700 border-emerald-600/20'

  return (
    <Reveal delay={80}>
      <header className={`max-w-3xl ${alignCls}`}>
        <span className={`inline-block rounded-full border px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${pillColor}`}>
          {kicker}
        </span>
        <h2 className="mt-3 text-xl font-semibold leading-tight text-text-primary sm:text-2xl md:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-sm leading-relaxed text-text-secondary sm:text-[15px]">{subtitle}</p>}
      </header>
    </Reveal>
  )
}

/* ---------- Icons ---------- */
function EnergyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="opacity-90">
      <path fill="currentColor" d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  )
}
function LightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="opacity-90">
      <path fill="currentColor" d="M12 2a8 8 0 0 0-8 8c0 3 2 5 4 6v2h8v-2c2-1 4-3 4-6a8 8 0 0 0-8-8zM9 20h6v2H9z" />
    </svg>
  )
}
function WaterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="opacity-90">
      <path fill="currentColor" d="M12 2s7 7 7 12a7 7 0 1 1-14 0c0-5 7-12 7-12z" />
    </svg>
  )
}