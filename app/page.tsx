// app/about/page.tsx
import Link from 'next/link'
import Container from '@/components/Container'
import services from '@/data/services.json'

export const metadata = {
  title: 'About | Upgrade Wellness Center',
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

  // Prefix assets so it works on GitHub Pages subpaths
  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`

  // Assets
  const HERO = 'public/images/about-hero.jpg' // ← put your hero photo here
  const MAP = 'public/images/map-downtown.png'

  const addressLine = '123 Oak Street, Suite 204, City, PR 12345'
  const phone = '(123) 456-7890'
  const email = 'hello@upgradewellness.com'
  const mapsQuery = encodeURIComponent(addressLine)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
  const appleMapsUrl = `https://maps.apple.com/?q=${mapsQuery}`

  const pill =
    'inline-flex items-center gap-2 rounded-[999px] border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur'

  return (
    <>
      {/* ===== Hero with background image ================================= */}
      <section className="relative isolate" aria-labelledby="about-hero-title">
        {/* Background image */}
        <img
          src={asset(HERO)}
          alt="Soft, calming wellness environment"
          className="absolute inset-0 -z-30 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Dark-to-transparent overlay for legibility */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-900/50 via-slate-900/25 to-white/0" aria-hidden />
        {/* Subtle tint + radial glow */}
        <div
          className="absolute inset-0 -z-10"
          aria-hidden
          style={{
            background:
              'radial-gradient(60% 50% at 50% -10%, rgba(236,253,245,.75) 0%, rgba(249,250,248,.35) 40%, rgba(249,250,248,0) 100%)',
          }}
        />

        <Container className="relative py-24 md:py-32">
          {/* Glass card */}
          <div className="mx-auto max-w-5xl rounded-[22px] p-[1px] shadow-[0_10px_28px_rgba(16,24,40,.18)] ring-1 ring-white/40 backdrop-blur">
            <div className="rounded-[22px] bg-white/70 p-8 md:p-14 backdrop-blur">
              <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-800/80">
                Holistic • Human • Kind
              </p>

              <h1
                id="about-hero-title"
                className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl"
              >
                Time for a{' '}
                <span className="bg-gradient-to-r from-[#0C8D69] via-emerald-500 to-[#19B6AE] bg-clip-text text-transparent">
                  Recharge
                </span>
              </h1>

              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-700">
                Hydration, healing, and the harmony of health—blending nature, innovation, and evidence-informed care.
              </p>

              <ul aria-label="Trust points" className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-700">
                {['Family-friendly', 'Evidence-informed', 'Licensed practitioners'].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-emerald-600" /> {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-[999px] bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow transition-colors hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                >
                  Contact Us
                </Link>
                <Link
                  href="/services/"
                  className="inline-flex items-center justify-center rounded-[999px] border border-slate-300 bg-white/90 px-5 py-3 text-sm font-medium text-slate-800 transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300/60"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Quote strip =============================================== */}
      <section className="bg-[var(--surface)] py-10" aria-labelledby="quotes">
        <Container className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
          <h2 id="quotes" className="sr-only">What clients say</h2>
          <blockquote className="text-center text-sm text-slate-600 md:text-left">“Calm, caring, and effective.”</blockquote>
          <span className="hidden h-4 w-px bg-slate-300 md:block" aria-hidden />
          <blockquote className="text-center text-sm text-slate-600 md:text-left">“I leave lighter every time.”</blockquote>
        </Container>
      </section>

      {/* ===== Pillars ==================================================== */}
      <section className="py-16" aria-labelledby="pillars">
        <Container>
          <h2 id="pillars" className="sr-only">Why choose us</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Licensed & evidence-informed', body: 'Care grounded in research and real-world practice.' },
              { title: 'Human-friendly & practical', body: 'Gentle, doable steps that fit your actual life.' },
              { title: 'Supportive community', body: 'Events and groups that help you stay consistent.' },
            ].map((c) => (
              <div
                key={c.title}
                className="relative rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(16,24,40,.08)]"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-emerald-500/30 via-transparent to-emerald-500/30" />
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-emerald-50">
                  <LeafIcon className="h-5 w-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-semibold leading-snug text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Featured Services ========================================= */}
      <section className="py-16" id="featured-services" aria-labelledby="featured">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="featured" className="text-2xl font-semibold text-slate-900">Featured Services</h2>
            <p className="mt-2 text-slate-600">Three simple ways to support recovery and everyday energy.</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="list" aria-label="Service cards">
            {list.map((s) => {
              const headingId = `svc-${s.slug}-title`
              return (
                <article
                  key={s.id}
                  aria-labelledby={headingId}
                  className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(16,24,40,.08)]"
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

          <div className="mt-8 flex items-center justify-center gap-4">
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

      {/* ===== Visit Us (chips + entrance image removed) ================== */}
      <section className="bg-[var(--surface)] py-16" id="visit-us" aria-labelledby="visit">
        <Container>
          <h2 id="visit" className="text-2xl font-semibold text-slate-900">Visit Us</h2>

          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <div className="relative">
              <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
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

            <div>
              <h3 className="text-lg font-semibold text-slate-900">Upgrade Wellness Center – Downtown</h3>
              <p className="mt-1 text-sm text-slate-700">{addressLine}</p>

              {/* Removed: parking/transit/accessibility chips */}

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

              {/* Removed: entrance image + caption */}
            </div>
          </div>
        </Container>
      </section>

      {/* ===== CTA ======================================================== */}
      <section className="py-16" aria-labelledby="cta">
        <Container>
          <div className="relative overflow-hidden rounded-[20px] border border-emerald-500/20 bg-gradient-to-br from-[#0C8D69] to-[#19B6AE] text-white shadow-[0_10px_24px_rgba(16,24,40,.08)]">
            <div className="pointer-events-none absolute -top-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="relative grid gap-6 p-6 md:grid-cols-[1.5fr,1fr] md:p-10">
              <div>
                <h2 id="cta" className="text-2xl md:text-3xl">Start your upgrade—personalized wellness, one step at a time.</h2>
                <p className="mt-2 text-white/90">A calm, supportive place to recharge.</p>
              </div>
              <div className="flex items-center justify-start gap-3 md:justify-end">
                <Link href="/contact/" className="rounded-[999px] bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white">
                  Book a time
                </Link>
                <Link href="/events/" className="rounded-[999px] border border-white/80 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70">
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
