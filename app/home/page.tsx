// app/home/page.tsx
import Link from 'next/link'
import Container from '@/components/Container'
import services from '@/data/services.json'
import Reveal from '@/components/Reveal'

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

  // Shared vertical spacing to keep sections aligned
  const sectionY = 'py-16 sm:py-20 md:py-24'

  // Hero background video (under /public)
  const HERO_MP4 = '/videos/home-hero.mp4'
  const HERO_POSTER = '/images/home-hero-poster.png'

  // Other assets
  const MAP = '/images/map-downtown.jpg'

  // Background video for "Why Upgrade"
  const VIDEO_MP4 = '/videos/ees.mp4'
  const VIDEO_POSTER = '/images/home-ees.jpg'

  // YouTube video IDs (swap with your own)
  const YT_IDS = ['dQHg_k9hNfU', 'iCHI28vZ7kA', 'QBznjFbkDE4'] as const

  const addressLine = '123 Oak Street, Suite 204, City, PR 12345'
  const phone = '(123) 456-7890'
  const email = 'hello@upgradewellness.com'
  const mapsQuery = encodeURIComponent(addressLine)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
  const appleMapsUrl = `https://maps.apple.com/?q=${mapsQuery}`

  const pill =
    'inline-flex items-center gap-2 rounded-[999px] border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur'

  // EE benefits (same list as before)
  const eeBenefits: { id: string; label: string; Icon: (p: React.SVGProps<SVGSVGElement>) => JSX.Element }[] = [
    { id: 'regen',       label: 'Detoxification\nof the Body',               Icon: SparkleIcon },
    { id: 'inflam',      label: 'Reduces Inflammation',                      Icon: InflammationIcon },
    { id: 'sleep',       label: 'Improved\nSleep Quality',                   Icon: MoonIcon },
    { id: 'immune',      label: 'Better Immune Efficiency',                  Icon: ShieldIcon },
    { id: 'pain',        label: 'Relief from Pain',                          Icon: ReliefIcon },
    { id: 'oxygen',      label: 'Oxygenates Blood\n& Improves Circulation',  Icon: DropO2Icon },
    { id: 'cell-reg',    label: 'Stimulates Cell Regeneration',              Icon: CellIcon },
    { id: 'focus',       label: 'Improved Concentration\nAnd Focus',         Icon: FocusIcon },
    { id: 'energy',      label: 'Increases Energy\n& Physical Stamina',      Icon: BoltIcon },
    { id: 'mental',      label: 'Improved Mental Health\n& Elevated Mood',   Icon: SmileIcon },
    { id: 'homeostasis', label: 'Faster Injury Recovery',                    Icon: HomeostasisIcon },
    { id: 'stress',      label: 'Reduction in\nStress',                      Icon: StressIcon },
    { id: 'alkaline',    label: 'Balances Alkalinity (pH)',                  Icon: BalancePHIcon },
    { id: 'detox',       label: 'Skin Condition Relief',                     Icon: DetoxIcon },
    { id: 'stem',        label: 'Mobilizes Stem Cells',                      Icon: StemIcon },
    { id: 'brain',       label: 'Improved Self-Awareness',                   Icon: BrainIcon },
  ]

  // (Restored) square-tile variant backgrounds
  const iconBgVariants = [
    'bg-emerald-50 ring-emerald-600/10',
    'bg-[#F3EDFF] ring-[#7C6FB0]/10',
    'bg-teal-50 ring-teal-600/10',
    'bg-[#F3EDFF] ring-[#7C6FB0]/10',
  ] as const

  return (
    <>
    <section className="relative isolate min-h-[68vh] sm:min-h-[72vh] md:min-h-[78vh]" aria-labelledby="about-hero-title">
      {/* Video layer */}
      <div className="absolute inset-0 -z-30 pointer-events-none">
        <video
          className="h-full w-full object-cover motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={asset(HERO_POSTER)}
          aria-hidden
        >
          <source src={asset(HERO_MP4)} type="video/mp4" />
        </video>

        {/* Static poster for reduced-motion users */}
        <img
          src={asset(HERO_POSTER)}
          alt=""
          className="hidden h-full w-full object-cover motion-reduce:block"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Light scrims so the footage pops but text stays readable */}
      <div className="absolute inset-0 -z-20 bg-slate-950/25" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-950/25 via-slate-900/10 to-transparent" aria-hidden />

      <Container className="relative py-24 sm:py-28 md:py-36">
        <Reveal delay={90}>
          {/* Larger glass card */}
          <div className="mx-auto max-w-6xl rounded-[32px] bg-white/82 p-6 sm:p-10 md:p-14 shadow-[0_18px_52px_rgba(2,6,23,.22)] ring-1 ring-black/10 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-900/80">
              Holistic • Human • Kind
            </p>

            <h1
              id="about-hero-title"
              className="mt-3 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900"
            >
              Time for a{' '}
              <span
                className="
                  bg-[linear-gradient(90deg,#34D399_0%,#10B981_45%,#06B6D4_100%)]
                  bg-clip-text text-transparent
                  [text-shadow:0_2px_12px_rgba(6,182,212,.25)]
                "
              >
                Recharge
              </span>
            </h1>

            <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-800">
              Hydration, healing, and the harmony of health—blending nature, innovation, and evidence-informed care.
            </p>

            <ul aria-label="Trust points" className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-800">
              {['Family-friendly', 'Evidence-informed', 'Licensed practitioners'].map((t, i) => (
                <li
                  key={t}
                  className="inline-flex items-center gap-2 transition-transform duration-700 hover:-translate-y-0.5"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <CheckIcon className="h-4 w-4 text-emerald-600" /> {t}
                </li>
              ))}
            </ul>

            <div className="mt-8 grid gap-3 sm:auto-cols-max sm:grid-flow-col">
              <Link
                href="/contact/"
                className="inline-flex items-center justify-center rounded-[999px] bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow transition-all hover:-translate-y-0.5 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900/40"
              >
                Contact Us
              </Link>
              <Link
                href="/services/"
                className="inline-flex items-center justify-center rounded-[999px] border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition-all hover:-translate-y-0.5 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300/60"
              >
                Explore services
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>



      {/* ===== HOW YOUR SESSION FLOWS ==================================== */}
      <section className={`relative ${sectionY}`} aria-labelledby="how-title">
        <Container>
          <Reveal delay={110}>
            <SectionHeader
              kicker="Getting Started"
              title="How your session flows"
              subtitle="Simple steps that keep things clear and calm."
              tone="emerald"
              align="center"
            />
          </Reveal>

          <div className="mt-8 grid gap-5 sm:gap-6 md:grid-cols-3">
            {[
              { step: '1', title: 'Arrive & settle', body: 'Check in, sip water, and set a gentle intention for your time here.' },
              { step: '2', title: 'Restore', body: 'Unwind while your body does its best healing work—no effort required.' },
              { step: '3', title: 'Integrate', body: 'Leave with one or two doable actions to extend benefits into your week.' },
            ].map((card, i) => (
              <Reveal key={card.step} delay={150 + i * 90}>
                <div className="relative overflow-hidden rounded-[18px] sm:rounded-[22px] border border-[#E4DAFF] bg-[linear-gradient(135deg,#FCFBFF,#F3EDFF)] p-5 sm:p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(16,24,40,.10)]">
                  <div className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full bg-[#EADFFF] blur-3xl" />
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-white text-xs sm:text-sm font-semibold text-[#7C6FB0] ring-1 ring-[#7C6FB0]/20">
                      {card.step}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900">{card.title}</h3>
                  </div>
                  <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-slate-700">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== WHY UPGRADE — section with background video ============== */}
      <section className={`relative overflow-hidden ${sectionY}`} aria-labelledby="pillars">
        <div className="absolute inset-0 -z-20 pointer-events-none">
          <img
            src={asset(VIDEO_POSTER)}
            alt=""
            aria-hidden
            className="hidden h-full w-full object-cover motion-reduce:block"
          />
          <video
            key="why-upgrade-bg"
            className="h-full w-full object-cover motion-reduce:hidden"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={asset(VIDEO_POSTER)}
            aria-hidden
          >
            <source src={asset(VIDEO_MP4)} type="video/mp4" />
          </video>
        </div>

        {/* Lightened scrim so footage reads, content stays legible */}
        <div className="absolute inset-0 -z-10" aria-hidden>
          <div className="absolute inset-0 bg-slate-950/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-900/15 to-slate-950/30" />
          <div className="absolute inset-0 bg-black/10 [mask-image:radial-gradient(120%_90%_at_50%_40%,#000_40%,transparent_85%)]" />
        </div>

        {/* Soft accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-[#F3EDFF]/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-emerald-100/40 blur-3xl" />

        <Container>
          <Reveal delay={120}>
            <SectionHeader
              kicker="Our Approach"
              title="Care that’s practical, kind, and grounded"
              subtitle="Evidence-led methods, human-friendly guidance, and community that helps you stay consistent."
              tone="lavender"
              align="left"
              onDark
            />
          </Reveal>

          <div className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
            {[
              { title: 'Licensed & evidence-informed', body: 'Every recommendation is rooted in research and refined by practice.' },
              { title: 'Human-friendly & doable', body: 'Tiny steps that fit your day—no overwhelm, just steady progress.' },
              { title: 'Community & accountability', body: 'Events, groups, and gentle check-ins to keep momentum going.' },
            ].map((c, i) => (
              <Reveal key={c.title} delay={160 + i * 90}>
                <div className="group relative rounded-[18px] border border-white/20 bg-white/85 backdrop-blur-md p-5 sm:p-6 shadow-[0_14px_28px_rgba(2,6,23,0.25)] transition-all duration-500 hover:-translate-y-1">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-[#7C6FB0]/40 via-transparent to-emerald-400/40" />
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-[10px] bg-[#F3EDFF] ring-1 ring-[#7C6FB0]/25">
                    <LeafIcon className="h-5 w-5 text-[#7C6FB0]" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-900">{c.title}</h3>
                  <p className="mt-1 text-sm text-slate-700">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>


      {/* ===== EE SYSTEM BENEFITS ======================================== */}
      <section
        className="relative bg-[var(--surface)] py-14 sm:py-16 md:py-20"
        id="ee-environment"
        aria-labelledby="ee-title"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:24px_24px] sm:bg-[size:28px_28px]" />
        <Container>
          <Reveal delay={110}>
            <SectionHeader
              kicker="EE System"
              title="What the EE System supports"
              subtitle="A multi-wave environment designed to encourage whole-body restoration."
              tone="lavender"
              align="center"
            />
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-6 sm:mt-8 rounded-[24px] sm:rounded-[28px] p-[1px] bg-[linear-gradient(135deg,#E9FDF4,#F3EDFF)] shadow-[0_8px_22px_rgba(16,24,40,.10)]">
              <div className="rounded-[23px] sm:rounded-[27px] border border-emerald-600/10 bg-white p-3 sm:p-5">
                <ul role="list" className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
                  {eeBenefits.map((b, i) => (
                    <Reveal key={b.id} delay={140 + (i % 8) * 70}>
                      <li
                        tabIndex={0}
                        role="group"
                        className="group relative flex flex-col items-center justify-center gap-2 sm:gap-3 rounded-xl p-2 sm:p-3 outline-none transition-transform duration-300 hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-[#7C6FB0]/30"
                      >
                        {/* Bigger icon, no background tile */}
                        <b.Icon
                          aria-hidden
                          className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 text-emerald-700 transition-transform duration-300 group-hover:scale-[1.06] group-hover:drop-shadow"
                        />
                        <p className="whitespace-pre-line text-center text-[13.5px] sm:text-[14.5px] md:text-[15.5px] font-medium leading-snug text-slate-800">
                          {b.label}
                        </p>
                      </li>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== FEATURED SERVICES ========================================= */}
      <section className={`relative ${sectionY}`} id="featured-services" aria-labelledby="featured">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 -z-10 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 -z-10 bg-[radial-gradient(50rem_30rem_at_100%_100%,rgba(124,111,176,0.10),transparent_60%)]" />
        <Container>
          <Reveal delay={110}>
            <SectionHeader
              kicker="Featured"
              title="Popular ways to restore"
              subtitle="Three simple paths to support recovery and everyday energy."
              tone="lavender"
              align="center"
            />
          </Reveal>

          <div className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Service cards">
            {list.map((s, i) => {
              const headingId = `svc-${s.slug}-title`
              return (
                <Reveal key={s.id} delay={150 + i * 90}>
                  <article
                    aria-labelledby={headingId}
                    className="group relative overflow-hidden rounded-[18px] sm:rounded-[20px] border border-slate-200 bg-white p-4 sm:p-5 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(16,24,40,.10)]"
                  >
                    <div className="relative h-36 sm:h-44 w-full overflow-hidden rounded-[14px] sm:rounded-[16px] ring-1 ring-inset ring-slate-200">
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

                    <h3 id={headingId} className="mt-4 text-base sm:text-lg font-semibold text-slate-900">{s.name}</h3>
                    <p className="mt-1 text-sm text-slate-700">{s.tagline ?? 'Support, recovery, and steady energy.'}</p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {s.duration && <span className={pill}>{s.duration}</span>}
                      {s.intensity && <span className={pill}>{s.intensity}</span>}
                      {s.modality && <span className={pill}>{s.modality}</span>}
                    </div>

                    <div className="mt-4 grid grid-cols-2 items-center gap-3 sm:flex sm:justify-between">
                      <span className="text-sm text-slate-700">
                        {typeof s.priceFrom === 'number' ? <>From <strong className="text-slate-900">${s.priceFrom}</strong></> : <>&nbsp;</>}
                      </span>
                      <Link href={`/services/#${s.slug}`} className="justify-self-end text-sm font-medium text-[#7C6FB0] underline decoration-[#E4DAFF] underline-offset-4 transition-colors hover:text-[#6a60a0]">
                        View details
                      </Link>
                    </div>
                  </article>
                </Reveal>
              )
            })}
          </div>

          <Reveal delay={340}>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link href="/services/" className="w-full sm:w-auto rounded-[999px] bg-white px-4 py-2 text-center text-sm font-medium text-slate-800 ring-1 ring-slate-200 transition-colors hover:bg-slate-50">
                Compare services
              </Link>
              <Link href="/services/" className="w-full sm:w-auto rounded-[999px] bg-[#7C6FB0] px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-[#6a60a0]">
                View all services
              </Link>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ===== VISIT US =================================================== */}
      <section className={`relative bg-[var(--surface)] ${sectionY}`} id="visit-us" aria-labelledby="visit">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70rem_30rem_at_0%_100%,rgba(25,182,174,0.10),transparent_60%)]" />
        <Container>
          <Reveal delay={110}>
            <SectionHeader
              kicker="Downtown"
              title="Visit Us"
              subtitle="Easy to reach, simple to settle in."
              tone="emerald"
              align="center"
            />
          </Reveal>

          <div className="mt-8 grid gap-6 sm:gap-8 md:grid-cols-2">
            <Reveal delay={150}>
              <div className="relative overflow-hidden rounded-[18px] sm:rounded-[20px] border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_14px_28px_rgba(16,24,40,.10)]">
                <img
                  src={asset(MAP)}
                  width="960"
                  height="640"
                  alt="Map near 123 Oak Street Downtown"
                  className="h-56 sm:h-72 md:h-80 w-full object-cover"
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
            </Reveal>

            <Reveal delay={210}>
              <div className="relative overflow-hidden rounded-[18px] sm:rounded-[20px] border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
                <div className="pointer-events-none absolute -top-16 -right-12 h-36 w-36 rounded-full bg-[#EAFBF4] blur-3xl" />
                <h3 className="text-base sm:text-lg font-semibold text-slate-900">Upgrade Wellness Center – Downtown</h3>
                <p className="mt-1 text-sm text-slate-700">{addressLine}</p>

                <div className="mt-4 sm:mt-5 grid gap-3 text-sm sm:flex sm:items-center sm:gap-6">
                  <a className="inline-flex items-center gap-2 text-slate-800 transition-colors hover:text-slate-900" href={`tel:+11234567890`}>
                    <PhoneIcon className="h-4 w-4 text-emerald-700" /> {phone}
                  </a>
                  <a className="inline-flex items-center gap-2 text-slate-800 transition-colors hover:text-slate-900" href={`mailto:${email}`}>
                    <MailIcon className="h-4 w-4 text-emerald-700" /> {email}
                  </a>
                </div>

                <div className="mt-4 sm:mt-5 grid gap-3 sm:flex sm:items-center">
                  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto rounded-[999px] bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white shadow transition-colors hover:bg-emerald-500">
                    Get Directions
                  </a>
                  <Link href="/contact/" className="w-full sm:w-auto rounded-[999px] bg-[#7C6FB0] px-4 py-2 text-center text-sm font-semibold text-white shadow transition-colors hover:bg-[#6a60a0]">
                    Contact Us
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ===== YouTube Embeds — before the final CTA ===================== */}
      <section className={`relative ${sectionY}`} aria-labelledby="yt-title">
        <Container>
          <Reveal delay={110}>
            <SectionHeader
              kicker="Videos"
              title="Learn more on YouTube"
              subtitle="Quick tours, how-tos, and community stories."
              tone="lavender"
              align="center"
            />
          </Reveal>

          <div className="mt-8 grid gap-5 sm:gap-6 lg:grid-cols-3">
            {YT_IDS.map((id, i) => (
              <Reveal key={id} delay={140 + i * 90}>
                <article className="overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-sm">
                  <div className="relative aspect-[16/9]">
                    <YouTubeFrame id={id} title={`YouTube video ${i + 1}`} />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== CTA ======================================================== */}
      <section className={`${sectionY}`} aria-labelledby="cta">
        <Container>
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-[20px] sm:rounded-[22px] border border-[#7C6FB0]/25 bg-[linear-gradient(135deg,#0C8D69,#19B6AE_55%,#7C6FB0)] text-white shadow-[0_8px_22px_rgba(16,24,40,.08)]">
              <div className="pointer-events-none absolute -top-16 left-10 h-36 w-36 rounded-full bg-white/10 blur-2xl motion-safe:animate-pulse" aria-hidden />
              <div className="pointer-events-none absolute -bottom-24 right-10 h-52 w-52 rounded-full bg-white/10 blur-3xl motion-safe:animate-pulse" aria-hidden />
              <div className="relative grid gap-4 p-5 sm:grid-cols-[1.5fr,1fr] sm:p-8">
                <div>
                  <h2 id="cta" className="text-xl sm:text-2xl md:text-3xl">Start your upgrade—personalized wellness, one step at a time.</h2>
                  <p className="mt-2 text-white/90">A calm, supportive place to recharge.</p>
                </div>
                <div className="grid gap-3 sm:justify-end sm:self-center sm:grid-flow-col sm:auto-cols-max">
                  <Link href="/contact/" className="rounded-[999px] bg-white px-4 py-2 text-center text-sm font-semibold text-slate-900 transition-all hover:-translate-y-0.5 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white">
                    Book a time
                  </Link>
                  <Link href="/events/" className="rounded-[999px] border border-white/80 px-4 py-2 text-center text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70">
                    See events
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  )
}

/* ------------------------------ Section helpers ------------------------------ */
function SectionHeader({
  kicker,
  title,
  subtitle,
  tone = 'emerald',
  align = 'left',
  onDark = false,
}: {
  kicker: string
  title: string
  subtitle?: string
  tone?: 'emerald' | 'lavender'
  align?: 'left' | 'center'
  onDark?: boolean
}) {
  const alignCls = align === 'center' ? 'text-center mx-auto' : ''

  const pillColor = (() => {
    if (onDark) return 'bg-white/10 text-white border-white/30'
    return tone === 'lavender'
      ? 'bg-white text-[#7C6FB0] border-[#E4DAFF]'
      : 'bg-white text-emerald-700 border-emerald-600/20'
  })()

  const titleColor = onDark ? 'text-white' : 'text-slate-900'
  const subColor = onDark ? 'text-white/80' : 'text-slate-700'

  return (
    <div className={`max-w-3xl ${alignCls}`}>
      <span className={`inline-block rounded-full border px-3 py-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider ${pillColor}`}>
        {kicker}
      </span>
      <h2 className={`mt-3 text-xl sm:text-2xl md:text-3xl font-semibold leading-tight ${titleColor}`}>{title}</h2>
      {subtitle && <p className={`mt-2 text-sm sm:text-[15px] leading-relaxed ${subColor}`}>{subtitle}</p>}
    </div>
  )
}

function SectionDivider({ label, tone = 'emerald' }: { label: string; tone?: 'emerald' | 'lavender' }) {
  const line =
    tone === 'lavender'
      ? 'from-[#7C6FB0]/30 via-transparent to-[#7C6FB0]/30'
      : 'from-emerald-500/30 via-transparent to-emerald-500/30'
  return (
    <div className="py-8">
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

/* ------------------------------ YouTube helper ------------------------------ */
function YouTubeFrame({ id, title }: { id: string; title: string }) {
  return (
    <iframe
      className="absolute inset-0 h-full w-full"
      src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
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
