'use client'

import Link from 'next/link'
import Container from '@/components/Container'
import services from '@/data/services.json'

export const metadata = {
  title: 'Home | Upgrade Wellness Center',
  description:
    'Hydration, healing, and the harmony of health—calm, evidence-informed care that fits real life.',
}

type Service = {
  id: string
  name: string
  slug: string
  tagline?: string
  summary?: string
  duration?: string
  intensity?: 'Gentle' | 'Moderate' | 'Focused'
  modality?: string
  priceFrom?: number
  image?: string
}

export default function AboutPage() {
  const list = (services as Service[]).slice(0, 3)
  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`

  // Assets (hero unchanged)
  const HERO = '/images/about-hero.png'
  const MAP = '/images/map-downtown.jpg'

  const addressLine = '123 Oak Street, Suite 204, City, PR 12345'
  const phone = '(123) 456-7890'
  const email = 'hello@upgradewellness.com'
  const mapsQuery = encodeURIComponent(addressLine)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
  const appleMapsUrl = `https://maps.apple.com/?q=${mapsQuery}`

  const pill =
    'inline-flex items-center gap-2 rounded-[999px] border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur'

  // EE System benefits (no images; inline SVG icons)
  const eeBenefits: { id: string; label: string; Icon: (p: React.SVGProps<SVGSVGElement>) => JSX.Element }[] = [
    { id: 'regen',       label: 'Cells Regenerate',                          Icon: SparkleIcon },
    { id: 'oxygen',      label: 'Oxygenates Blood\n& Improves Circulation',  Icon: DropO2Icon },
    { id: 'alkaline',    label: 'Balances Alkalinity (pH)',                  Icon: BalancePHIcon },
    { id: 'detox',       label: 'Eliminates Toxins',                         Icon: DetoxIcon },
    { id: 'mental',      label: 'Improved Mental Health\n& Elevated Mood',   Icon: SmileIcon },
    { id: 'focus',       label: 'Improved Concentration\nAnd Focus',         Icon: FocusIcon },
    { id: 'inflam',      label: 'Reduces Inflammation',                      Icon: InflammationIcon },
    { id: 'cell-reg',    label: 'Stimulates Cell Regeneration',              Icon: CellIcon },
    { id: 'immune',      label: 'Improves Immune Function',                  Icon: ShieldIcon },
    { id: 'pain',        label: 'Relieves Pain',                             Icon: ReliefIcon },
    { id: 'stress',      label: 'Alleviates Stress',                         Icon: StressIcon },
    { id: 'sleep',       label: 'Improves Sleep',                            Icon: MoonIcon },
    { id: 'homeostasis', label: 'Dynamic Homeostasis',                       Icon: HomeostasisIcon },
    // telomeres removed per request
    { id: 'stem',        label: 'Mobilizes Stem Cells',                      Icon: StemIcon },
    { id: 'brain',       label: 'Brain Hemisphere Synchronization',          Icon: BrainIcon },
    { id: 'energy',      label: 'Increases Energy\n& Physical Stamina',      Icon: BoltIcon },
  ]

  // Static variant classes so Tailwind keeps them (used to softly vary icon pods)
  const iconBgVariants = [
    'bg-emerald-50 ring-emerald-600/10',
    'bg-teal-50 ring-teal-600/10',
    'bg-emerald-50 ring-emerald-600/10',
    'bg-teal-50 ring-teal-600/10',
  ] as const

  return (
    <>
      {/* ===== Hero (UNCHANGED) ========================================== */}
      <section className="relative isolate" aria-labelledby="about-hero-title">
        <img
          src={asset(HERO)}
          alt="Soft, calming wellness environment"
          className="absolute inset-0 -z-30 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-900/55 via-slate-900/25 to-white/0" aria-hidden />
        <div
          className="pointer-events-none absolute inset-0 -z-10 motion-safe:animate-pulse"
          aria-hidden
          style={{
            background:
              'radial-gradient(60% 50% at 50% -10%, rgba(236,253,245,.70) 0%, rgba(249,250,248,.35) 42%, rgba(249,250,248,0) 100%)',
            animationDuration: '7s',
          }}
        />

        <Container className="relative py-24 md:py-32">
          <div className="mx-auto max-w-5xl rounded-[24px] p-[1px] shadow-[0_12px_32px_rgba(16,24,40,.18)] ring-1 ring-white/40 backdrop-blur [animation:fade-in_0.8s_ease-out_0.12s_both]">
            <div className="rounded-[24px] bg-white/75 p-8 md:p-14 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-800/80">Holistic • Human • Kind</p>
              <h1 id="about-hero-title" className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Time for a{' '}
                <span className="bg-gradient-to-r from-[#0C8D69] via-emerald-500 to-[#19B6AE] bg-clip-text text-transparent">
                  Recharge
                </span>
              </h1>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-700">
                Hydration, healing, and the harmony of health—blending nature, innovation, and evidence-informed care.
              </p>
              <ul aria-label="Trust points" className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-700">
                {['Family-friendly', 'Evidence-informed', 'Licensed practitioners'].map((t, i) => (
                  <li key={t} className="inline-flex items-center gap-2 transition-transform duration-700 hover:-translate-y-0.5"
                      style={{ transitionDelay: `${i * 60}ms` }}>
                    <CheckIcon className="h-4 w-4 text-emerald-600" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact/" className="inline-flex items-center justify-center rounded-[999px] bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40">
                  Contact Us
                </Link>
                <Link href="/services/" className="inline-flex items-center justify-center rounded-[999px] border border-slate-300 bg-white/80 px-5 py-3 text-sm font-medium text-slate-800 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300/60">
                  Explore services
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Quote strip (thin pattern + divider) ======================= */}
      <section className="relative py-10" aria-labelledby="quotes">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(40rem_20rem_at_50%_-10%,rgba(129,177,230,0.08),transparent_60%)]" />
        <Container className="[animation:fade-in_0.8s_ease-out_0.2s_both]">
          <h2 id="quotes" className="sr-only">What clients say</h2>
          <div className="mx-auto max-w-3xl text-center">
            <div className="flex items-center justify-center gap-6 text-sm text-slate-600">
              <blockquote>“Calm, caring, and effective.”</blockquote>
              <span className="h-4 w-px bg-slate-300" aria-hidden />
              <blockquote>“I leave lighter every time.”</blockquote>
            </div>
            <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-emerald-500/40 via-slate-300 to-emerald-500/40" />
          </div>
        </Container>
      </section>

      {/* ===== Pillars (soft blobs for distinction) ======================= */}
      <section className="relative overflow-hidden py-16" aria-labelledby="pillars">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-teal-100/50 blur-3xl" />
        <Container className="[animation:fade-in-up_0.8s_cubic-bezier(0.22,1,0.36,1)_0.25s_both]">
          <h2 id="pillars" className="mx-auto mb-6 max-w-3xl text-center text-2xl font-semibold text-slate-900">
            Care that’s practical, kind, and grounded
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Licensed & evidence-informed', body: 'Care grounded in research and real-world practice.' },
              { title: 'Human-friendly & practical', body: 'Gentle, doable steps that fit your actual life.' },
              { title: 'Supportive community', body: 'Events and groups that help you stay consistent.' },
            ].map((c, i) => (
              <div
                key={c.title}
                className="group relative rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(16,24,40,.10)] [animation:fade-in_0.7s_ease-out_both]"
                style={{ animationDelay: `${0.15 + i * 0.08}s` }}
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/30 via-transparent to-emerald-500/30" />
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-[12px] bg-emerald-50">
                  <LeafIcon className="h-5 w-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-semibold leading-snug text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== EE System – ENHANCED SQUARE TILE GRID ===================== */}
      <section className="relative bg-[var(--surface)] py-16" id="ee-environment" aria-labelledby="ee-title">
        {/* subtle grid pattern behind */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:28px_28px]" />
        <Container>
          <div className="mx-auto max-w-3xl text-center [animation:fade-in_0.8s_ease-out_0.2s_both]">
            <span className="mx-auto inline-block rounded-full border border-emerald-600/20 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-emerald-700">
              EE System Benefits
            </span>
            <h2 id="ee-title" className="mt-3 text-2xl font-semibold text-slate-900">
              The EE System Creates an Environment Where Health Can Flourish
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Big, cohesive tiles with layered borders, conic halos, and animated sheen—CSS-only.
            </p>
          </div>

          {/* gradient micro-border frame */}
          <div className="mt-8 rounded-[28px] p-[1px] bg-gradient-to-br from-emerald-200/70 via-teal-200/60 to-emerald-100/60 shadow-[0_10px_26px_rgba(16,24,40,.10)] [animation:fade-in_0.8s_ease-out_0.28s_both]">
            <div className="rounded-[27px] border border-emerald-600/10 bg-white p-5">
              <ul role="list" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {eeBenefits.map((b, i) => {
                  const iconVariant = iconBgVariants[i % iconBgVariants.length]
                  return (
                    <li
                      key={b.id}
                      tabIndex={0}
                      role="group"
                      className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm outline-none transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(16,24,40,.08)] focus-visible:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-emerald-500/40"
                      style={{ animationDelay: `${0.18 + (i % 8) * 0.05}s` }}
                    >
                      {/* conic halo (very soft) */}
                      <div className="pointer-events-none absolute -inset-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="absolute inset-0 rounded-[20px] [background:conic-gradient(from_180deg_at_50%_50%,rgba(16,185,129,0.10),rgba(45,212,191,0.10),rgba(16,185,129,0.10))] [mask-image:radial-gradient(70%_70%_at_50%_50%,#000_0,transparent_70%)] [animation:spin-slower_14s_linear_infinite]" />
                      </div>

                      {/* inner radial light */}
                      <div className="pointer-events-none absolute inset-0 rounded-[20px] bg-[radial-gradient(60%_40%_at_50%_30%,rgba(16,185,129,0.10),transparent_60%)]" aria-hidden />

                      {/* content */}
                      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center [animation:fade-in-up_0.6s_cubic-bezier(0.22,1,0.36,1)_both]">
                        <div className={`mb-4 inline-flex h-24 w-24 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-[1.06] ${iconVariant}`}>
                          <b.Icon className="h-12 w-12 text-emerald-700" />
                        </div>
                        <p className="whitespace-pre-line text-[15.5px] font-medium leading-snug text-slate-800">
                          {b.label}
                        </p>
                      </div>

                      {/* animated sheen */}
                      <span className="pointer-events-none absolute -inset-[1px] rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-30 [background:linear-gradient(100deg,transparent,rgba(255,255,255,0.5),transparent)] [animation:none] group-hover:[animation:sheen_800ms_ease-out]"></span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Featured Services (split background) ======================= */}
      <section className="relative py-16" id="featured-services" aria-labelledby="featured">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 -z-10 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-[radial-gradient(60rem_40rem_at_100%_100%,rgba(12,141,105,0.10),transparent_60%)]" />
        <Container>
          <div className="mx-auto max-w-2xl text-center [animation:fade-in_0.8s_ease-out_0.18s_both]">
            <span className="mx-auto inline-block rounded-full border border-slate-300 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-700">
              Featured
            </span>
            <h2 id="featured" className="mt-3 text-2xl font-semibold text-slate-900">Featured Services</h2>
            <p className="mt-2 text-slate-600">Three simple ways to support recovery and everyday energy.</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Service cards">
            {list.map((s, i) => {
              const headingId = `svc-${s.slug}-title`
              return (
                <article
                  key={s.id}
                  aria-labelledby={headingId}
                  className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(16,24,40,.10)] [animation:fade-in_0.7s_ease-out_both]"
                  style={{ animationDelay: `${0.2 + i * 0.08}s` }}
                >
                  <div className="relative h-44 w-full overflow-hidden rounded-[16px] ring-1 ring-inset ring-slate-200">
                    <img
                      src={asset(s.image ?? '/images/service-fallback.jpg')}
                      alt={s.name}
                      loading="lazy"
                      decoding="async"
                      sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" aria-hidden />
                  </div>

                  <h3 id={headingId} className="mt-4 text-lg font-semibold text-slate-900">{s.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">{s.tagline ?? 'Support, recovery, and steady energy.'}</p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.duration && <span className={pill}>{s.duration}</span>}
                    {s.intensity && <span className={pill}>{s.intensity}</span>}
                    {s.modality && <span className={pill}>{s.modality}</span>}
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-slate-700">
                      {typeof s.priceFrom === 'number' ? <>From <strong className="text-slate-900">${s.priceFrom}</strong></> : <>&nbsp;</>}
                    </span>
                    <Link href={`/services/#${s.slug}`} className="text-sm font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-4 transition-colors hover:text-emerald-800">
                      View details
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4 [animation:fade-in_0.8s_ease-out_0.36s_both]">
            <Link href="/services/" className="text-sm font-medium text-slate-800 underline underline-offset-4 hover:text-slate-900">
              Compare services
            </Link>
            <span className="text-slate-400" aria-hidden>•</span>
            <Link href="/services/" className="text-sm font-medium text-slate-800 underline underline-offset-4 hover:text-slate-900">
              View all services
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== Visit Us (two-card scene) ================================= */}
      <section className="relative bg-[var(--surface)] py-16" id="visit-us" aria-labelledby="visit">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80rem_40rem_at_0%_100%,rgba(25,182,174,0.10),transparent_60%)]" />
        <Container>
          <h2 id="visit" className="text-center text-2xl font-semibold text-slate-900 [animation:fade-in_0.8s_ease-out_0.18s_both]">
            Visit Us
          </h2>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {/* Map Card */}
            <div className="relative [animation:fade-in-up_0.7s_cubic-bezier(0.22,1,0.36,1)_0.22s_both]">
              <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(16,24,40,.10)]">
                <img
                  src={asset(MAP)}
                  width="960"
                  height="640"
                  alt="Map near 123 Oak Street Downtown"
                  className="h-80 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 hidden items-end justify-between gap-3 p-4 sm:flex">
                  <a className="rounded-[999px] bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 shadow transition-colors hover:bg-white" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                  </a>
                  <a className="rounded-[999px] bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 shadow transition-colors hover:bg-white" href={appleMapsUrl} target="_blank" rel="noopener noreferrer">
                    Open in Apple Maps
                  </a>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 sm:hidden">
                <a className="flex-1 rounded-[999px] bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 shadow" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  Google Maps
                </a>
                <a className="flex-1 rounded-[999px] border border-slate-200 bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 shadow" href={appleMapsUrl} target="_blank" rel="noopener noreferrer">
                  Apple Maps
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="[animation:fade-in-up_0.7s_cubic-bezier(0.22,1,0.36,1)_0.28s_both]">
              <div className="relative overflow-hidden rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="pointer-events-none absolute -top-16 -right-12 h-40 w-40 rounded-full bg-emerald-50 blur-3xl" />
                <h3 className="text-lg font-semibold text-slate-900">Upgrade Wellness Center – Downtown</h3>
                <p className="mt-1 text-sm text-slate-700">{addressLine}</p>

                <div className="mt-5 flex items-center gap-6 text-sm">
                  <a className="inline-flex items-center gap-2 text-slate-800 transition-colors hover:text-slate-900" href={`tel:+11234567890`}>
                    <PhoneIcon className="h-4 w-4 text-emerald-700" /> {phone}
                  </a>
                  <a className="inline-flex items-center gap-2 text-slate-800 transition-colors hover:text-slate-900" href={`mailto:${email}`}>
                    <MailIcon className="h-4 w-4 text-emerald-700" /> {email}
                  </a>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-[999px] bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-emerald-500">
                    Get Directions
                  </a>
                  <Link href="/contact/" className="rounded-[999px] bg-emerald-700 px-4 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-emerald-600">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== CTA ======================================================== */}
      <section className="py-16" aria-labelledby="cta">
        <Container>
          <div className="relative overflow-hidden rounded-[22px] border border-emerald-500/20 bg-gradient-to-br from-[#0C8D69] to-[#19B6AE] text-white shadow-[0_10px_24px_rgba(16,24,40,.08)] [animation:fade-in_0.8s_ease-out_0.2s_both]">
            <div className="pointer-events-none absolute -top-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl motion-safe:animate-pulse" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl motion-safe:animate-pulse" aria-hidden />
            <div className="relative grid gap-6 p-6 md:grid-cols-[1.5fr,1fr] md:p-10">
              <div>
                <h2 id="cta" className="text-2xl md:text-3xl">Start your upgrade—personalized wellness, one step at a time.</h2>
                <p className="mt-2 text-white/90">A calm, supportive place to recharge.</p>
              </div>
              <div className="flex items-center justify-start gap-3 md:justify-end">
                <Link href="/contact/" className="rounded-[999px] bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white">
                  Book a time
                </Link>
                <Link href="/events/" className="rounded-[999px] border border-white/80 px-4 py-2 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70">
                  See events
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Lightweight keyframes (CSS-only, no libs) ------------------ */}
      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0 } to { opacity: 1 } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes spin-slower { to { transform: rotate(360deg) } }
        @keyframes sheen { 0% { transform: translateX(-120%) } 100% { transform: translateX(120%) } }
        @media (prefers-reduced-motion: reduce) {
          [animation] { animation: none !important; }
        }
      `}</style>
    </>
  )
}

/* ------------------------------ Icons ------------------------------ */
function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden {...props}>
      <path d="M4 10l3 3 9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M3 21s3-9 12-9 6 9 6 9H3Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 12c0-4 2-7 6-9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.58 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.14a2 2 0 0 1 2.11-.45c.83.26 1.7.46 2.6.58A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

/* ------- EE Grid Icons (inline SVG – lightweight) --------- */
function SparkleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 3l1.8 4.5L18 9l-4.2 1.5L12 15l-1.8-4.5L6 9l4.2-1.5L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
function DropO2Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 3s6 6 6 10a6 6 0 1 1-12 0c0-4 6-10 6-10Z" stroke="currentColor" strokeWidth="1.5"/>
      <text x="12" y="15" textAnchor="middle" fontSize="7" fill="currentColor">O₂</text>
    </svg>
  )
}
function BalancePHIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="8" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="16" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function DetoxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="6" y="4" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 9h6M9 13h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
function SmileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 10h.01M15.5 10h.01M8 14c1.2 1 2.8 1.5 4 1.5S14.8 15 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function FocusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <rect x="5" y="5" width="14" height="14" rx="3" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function InflammationIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 4c3 3 5 5.5 5 8a5 5 0 1 1-10 0c0-2.5 2-5 5-8Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 9v6" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function CellIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="9" cy="11" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="14.5" cy="14" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function ShieldIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function ReliefIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M7 12h10M7 12a5 5 0 1 1 10 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function StressIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M8 15c2-1 6-1 8 0" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M9 9l2 2M15 9l-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M20 12.5A8 8 0 1 1 11.5 4 6.5 6.5 0 0 0 20 12.5Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function HomeostasisIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M6 12h12M8 8h8M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="6" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="18" cy="12" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function StemIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 21V8c0-2.2 1.8-4 4-4M12 21V8c0-2.2-1.8-4-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="8" cy="4" r="2" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function BrainIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M9 7a3 3 0 1 0-3 3v4a3 3 0 1 0 3 3M15 7a3 3 0 1 1 3 3v4a3 3 0 1 1-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
function BoltIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M13 2L6 14h5l-1 8 7-12h-5l1-8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  )
}
