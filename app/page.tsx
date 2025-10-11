import Link from 'next/link'
import Script from 'next/script'
import Container from '@/components/Container'
import services from '@/data/services.json'

export const metadata = {
  title: 'Upgrade Wellness Center',
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

export default function HomePage() {
  const list = (services as Service[]).slice(0, 3)

  // Prefix assets for GitHub Pages subpaths
  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`

  // Assets you should provide in /public/images/
  const HERO = '/images/hero-spa-soft.jpg'
  const MAP  = '/images/map-downtown.png'
  const ENTRANCE = '/images/entrance-thumb.jpg'
  const ASSOC1 = '/images/assoc-1.png'
  const ASSOC2 = '/images/assoc-2.png'

  // Location data (shown statically + small inline script computes "Open now")
  const addressLine = '123 Oak Street, Suite 204, City, ST 12345'
  const phone = '(123) 456-7890'
  const email = 'hello@upgradewellness.com'
  const mapsQuery = encodeURIComponent(addressLine)
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`
  const appleMapsUrl = `https://maps.apple.com/?q=${mapsQuery}`

  // Weekly hours table (24h format for easy comparison client-side)
  const hours = [
    { d: 'Monday',    open: '09:00', close: '19:00' },
    { d: 'Tuesday',   open: '09:00', close: '19:00' },
    { d: 'Wednesday', open: '09:00', close: '19:00' },
    { d: 'Thursday',  open: '09:00', close: '19:00' },
    { d: 'Friday',    open: '09:00', close: '19:00' },
    { d: 'Saturday',  open: '09:00', close: '17:00' },
    { d: 'Sunday',    open: '10:00', close: '16:00' },
  ]

  // Placeholder events (replace with real data or keep as-is)
  const events = [
    { date: 'Nov 02', title: 'Gentle Breath & Recovery', when: 'Sat, 10:00–11:15 AM', cta: '/events/' },
    { date: 'Nov 15', title: 'Hydration & Sleep Basics', when: 'Fri, 6:00–7:00 PM', cta: '/events/' },
  ]

  return (
    <>
      {/* ===== Sticky Header ================================================= */}
      <header
        id="site-header"
        className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 data-[scrolled=true]:shadow-[0_10px_24px_rgba(16,24,40,.08)] data-[scrolled=true]:bg-white/80"
      >
        <Container className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-full bg-emerald-600" aria-hidden />
            <span className="font-semibold text-slate-900">Upgrade Wellness</span>
          </Link>

          {/* Center: Nav (desktop) */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm text-slate-700">
              <li><Link className="hover:text-slate-900" href="/">Home</Link></li>
              <li><Link className="hover:text-slate-900" href="/about/">About</Link></li>
              <li><Link className="hover:text-slate-900" href="/services/">Services</Link></li>
              <li><Link className="hover:text-slate-900" href="/events/">Events</Link></li>
              <li><Link className="hover:text-slate-900" href="/community/">Community</Link></li>
            </ul>
          </nav>

          {/* Right: Contact + CTA (desktop) */}
          <div className="hidden items-center gap-3 md:flex">
            <a href="tel:+11234567890" className="inline-flex items-center gap-2 text-sm font-medium text-slate-800 hover:text-slate-900">
              <PhoneIcon className="h-4 w-4 text-emerald-600" />
              (123) 456-7890
            </a>
            <Link href="/contact/" className="text-sm text-slate-700 hover:text-slate-900">Contact</Link>
            <Link
              href="/contact/"
              className="rounded-[999px] bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
            >
              Book a time
            </Link>
          </div>

          {/* Mobile: menu */}
          <details className="md:hidden">
            <summary className="list-none rounded-lg p-2 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-600/30">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6 text-slate-700" />
            </summary>
            <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-md">
              <nav aria-label="Mobile">
                <ul className="space-y-2 text-sm">
                  {[
                    ['Home', '/'],
                    ['About', '/about/'],
                    ['Services', '/services/'],
                    ['Events', '/events/'],
                    ['Community', '/community/'],
                    ['Contact', '/contact/'],
                  ].map(([label, href]) => (
                    <li key={label}><Link className="block rounded-lg px-2 py-2 hover:bg-slate-50" href={href}>{label}</Link></li>
                  ))}
                </ul>
              </nav>
              <div className="mt-3">
                <Link
                  href="/contact/"
                  className="flex w-full items-center justify-center rounded-[999px] bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500"
                >
                  Book a time
                </Link>
              </div>
            </div>
          </details>
        </Container>
      </header>

      {/* ===== Hero ========================================================== */}
      <section className="relative isolate overflow-hidden">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${asset(HERO)})` }}
          aria-hidden
        />
        {/* Soft gradient for legibility */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900/60 via-slate-900/50 to-slate-900/60" aria-hidden />
        {/* Light emerald aura */}
        <div className="pointer-events-none absolute -left-24 top-[-6rem] h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden />
        <Container className="relative py-20 md:py-28">
          <div className="mx-auto max-w-5xl rounded-[20px] p-[1px] backdrop-blur">
            <div className="rounded-[20px] bg-white/70 p-8 shadow-[0_10px_24px_rgba(16,24,40,.08)] ring-1 ring-white/50 md:p-14">
              <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-700/80">Holistic • Human • Kind</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
                Time for a <span className="text-emerald-600">Recharge</span>
              </h1>
              <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-slate-700">
                Hydration, healing, and the harmony of health—blending nature, innovation, and evidence-informed care.
              </p>
              {/* Trust ticks */}
              <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-700">
                {['Family-friendly', 'Evidence-informed', 'Licensed practitioners'].map((t) => (
                  <li key={t} className="inline-flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-emerald-600" /> {t}
                  </li>
                ))}
              </ul>
              {/* CTAs */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-[999px] bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-600/40"
                >
                  Book a session
                </Link>
                <Link
                  href="/services/"
                  className="inline-flex items-center justify-center rounded-[999px] border border-slate-300 bg-white/80 px-5 py-3 text-sm font-medium text-slate-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-slate-300/60"
                >
                  Explore services
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Social Proof ================================================== */}
      <section className="bg-[var(--surface)] py-10">
        <Container className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <p className="text-center text-sm text-slate-700 md:text-left">
            <span className="mr-2 text-emerald-700">★★★★★</span>
            <span className="font-medium text-slate-900">4.9</span> (320+ reviews)
          </p>
          <div className="flex flex-1 flex-col items-center gap-4 md:flex-row md:justify-center">
            <blockquote className="text-center text-sm text-slate-600 md:text-left">“Calm, caring, and effective.”</blockquote>
            <span className="hidden h-4 w-px bg-slate-300 md:block" aria-hidden />
            <blockquote className="text-center text-sm text-slate-600 md:text-left">“I leave lighter every time.”</blockquote>
          </div>
          <div className="flex items-center gap-6 opacity-70">
            <img src={asset(ASSOC1)} alt="Member association logo 1" className="h-6 w-auto" />
            <img src={asset(ASSOC2)} alt="Member association logo 2" className="h-6 w-auto" />
          </div>
        </Container>
      </section>

      {/* ===== Pillars / Benefits =========================================== */}
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: 'Licensed & evidence-informed', body: 'Care grounded in research and real-world practice.' },
              { title: 'Human-friendly & practical', body: 'Gentle, doable steps that fit your actual life.' },
              { title: 'Supportive community', body: 'Events and groups that help you stay consistent.' },
            ].map((c) => (
              <div
                key={c.title}
                className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-[0_10px_24px_rgba(16,24,40,.08)]"
              >
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-[12px] bg-emerald-50">
                  <LeafIcon className="h-5 w-5 text-emerald-700" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{c.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{c.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== Featured Services ============================================ */}
      <section className="py-16" id="featured-services">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Featured Services</h2>
            <p className="mt-2 text-slate-600">Three simple ways to support recovery and everyday energy.</p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <article
                key={s.id}
                className="group relative overflow-hidden rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(16,24,40,.08)]"
              >
                <div className="relative h-44 w-full overflow-hidden rounded-[16px] ring-1 ring-inset ring-slate-200">
                  <img
                    src={asset(s.image ?? '/images/service-fallback.jpg')}
                    alt={s.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent" aria-hidden />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.tagline ?? 'Support, recovery, and steady energy.'}</p>

                {/* Chips */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.duration && <span className="chip">{s.duration}</span>}
                  {s.intensity && <span className="chip">{s.intensity}</span>}
                  {s.modality && <span className="chip">{s.modality}</span>}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-slate-700">
                    {typeof s.priceFrom === 'number' ? <>From <strong className="text-slate-900">${s.priceFrom}</strong></> : <>&nbsp;</>}
                  </span>
                  <Link
                    href={`/services/#${s.slug}`}
                    className="text-sm font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-4 transition hover:text-emerald-800"
                  >
                    View details
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/services/" className="text-sm font-medium text-slate-800 underline underline-offset-4 hover:text-slate-900">
              Compare services
            </Link>
            <span className="text-slate-400">•</span>
            <Link href="/services/" className="text-sm font-medium text-slate-800 underline underline-offset-4 hover:text-slate-900">
              View all services
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== Location & Hours (Visit Us) ================================== */}
      <section className="bg-[var(--surface)] py-16" id="visit-us">
        <Container>
          <h2 className="text-2xl font-semibold text-slate-900">Visit Us</h2>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            {/* Map card */}
            <div className="relative">
              <div className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-sm">
                <img
                  src={asset(MAP)}
                  alt="Muted static map of the Downtown location"
                  className="h-80 w-full object-cover"
                />
                {/* Hover overlay buttons (desktop visual; always visible on mobile) */}
                <div className="absolute inset-0 hidden items-end justify-between gap-3 p-4 sm:flex">
                  <a
                    className="rounded-[999px] bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 shadow hover:bg-white"
                    href={googleMapsUrl}
                    target="_blank" rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                  <a
                    className="rounded-[999px] bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 shadow hover:bg-white"
                    href={appleMapsUrl}
                    target="_blank" rel="noopener noreferrer"
                  >
                    Open in Apple Maps
                  </a>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3 sm:hidden">
                <a className="flex-1 rounded-[999px] bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 shadow" href={googleMapsUrl} target="_blank" rel="noopener noreferrer">Google Maps</a>
                <a className="flex-1 rounded-[999px] border border-slate-200 bg-white px-4 py-2 text-center text-sm font-medium text-slate-900 shadow" href={appleMapsUrl} target="_blank" rel="noopener noreferrer">Apple Maps</a>
              </div>
            </div>

            {/* Details */}
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Upgrade Wellness Center – Downtown</h3>
              <p className="mt-1 text-sm text-slate-700">{addressLine}</p>

              <div className="mt-3 flex items-center gap-2 text-sm">
                <span id="openStatus" className="inline-flex items-center rounded-[999px] bg-emerald-50 px-2.5 py-1.5 text-emerald-700 ring-1 ring-emerald-100">
                  Checking hours…
                </span>
              </div>

              {/* Hours table */}
              <div className="mt-4 overflow-hidden rounded-[16px] border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {hours.map((h, i) => (
                      <tr key={h.d} className="border-b last:border-b-0">
                        <th className="w-40 px-4 py-2 font-medium text-slate-800">{h.d}</th>
                        <td className="px-4 py-2 text-slate-600">
                          <span className="font-medium text-slate-800">{h.open}</span> – <span className="font-medium text-slate-800">{h.close}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="chip">Parking: Free on-site; street after 6 PM</span>
                <span className="chip">Transit: Green Line – Oak St (3-min walk)</span>
                <span className="chip">Accessibility: Elevator, accessible restroom</span>
              </div>

              <div className="mt-5 flex items-center gap-6 text-sm">
                <a className="inline-flex items-center gap-2 text-slate-800 hover:text-slate-900" href={`tel:+11234567890`}>
                  <PhoneIcon className="h-4 w-4 text-emerald-700" /> {phone}
                </a>
                <a className="inline-flex items-center gap-2 text-slate-800 hover:text-slate-900" href={`mailto:${email}`}>
                  <MailIcon className="h-4 w-4 text-emerald-700" /> {email}
                </a>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <Link href={googleMapsUrl} target="_blank" className="rounded-[999px] bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-500">
                  Get Directions
                </Link>
                <Link href="/contact/" className="rounded-[999px] border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50">
                  Book a Session
                </Link>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <img
                  src={asset(ENTRANCE)}
                  alt="Entrance of Upgrade Wellness Center"
                  className="h-20 w-32 rounded-[12px] object-cover ring-1 ring-inset ring-slate-200"
                />
                <p className="text-xs text-slate-600">Entrance on Oak Street. Take the elevator to Suite 204.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Upcoming Events ============================================== */}
      <section className="py-16">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold text-slate-900">Upcoming Events</h2>
            <p className="mt-2 text-slate-600">Stay consistent with supportive, low-pressure gatherings.</p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {events.map((e) => (
              <article key={e.title} className="flex items-center gap-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex h-16 w-16 flex-col items-center justify-center rounded-[12px] bg-emerald-50 text-emerald-700">
                  <span className="text-xs font-medium">Date</span>
                  <span className="text-sm font-semibold">{e.date}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-slate-900">{e.title}</h3>
                  <p className="mt-0.5 text-sm text-slate-600">{e.when}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Link href={e.cta} className="text-sm font-medium text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-800">
                    Add to Calendar
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/events/" className="text-sm font-medium text-slate-800 underline underline-offset-4 hover:text-slate-900">
              View full calendar
            </Link>
          </div>
        </Container>
      </section>

      {/* ===== Wide CTA Banner ============================================== */}
      <section className="py-16">
        <Container>
          <div className="relative overflow-hidden rounded-[20px] border border-emerald-500/20 bg-gradient-to-br from-[#0C8D69] to-[#19B6AE] text-white shadow-[0_10px_24px_rgba(16,24,40,.08)]">
            <div className="pointer-events-none absolute -top-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" aria-hidden />
            <div className="relative grid gap-6 p-6 md:grid-cols-[1.5fr,1fr] md:p-10">
              <div>
                <h2 className="text-2xl md:text-3xl">Start your upgrade—personalized wellness, one step at a time.</h2>
                <p className="mt-2 text-white/90">A calm, supportive place to recharge.</p>
              </div>
              <div className="flex items-center justify-start gap-3 md:justify-end">
                <Link href="/contact/" className="rounded-[999px] bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white">
                  Book a time
                </Link>
                <Link href="/events/" className="rounded-[999px] border border-white/80 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70">
                  See events
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== Footer ======================================================== */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <Container className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-8 w-8 rounded-full bg-emerald-600" aria-hidden />
              <span className="font-semibold text-slate-900">Upgrade Wellness</span>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Calm, evidence-informed care for everyday life.
            </p>
          </div>

          <nav aria-label="Quick links" className="text-sm">
            <h3 className="mb-3 font-semibold text-slate-900">Quick links</h3>
            <ul className="space-y-2">
              <li><Link className="hover:underline" href="/services/">Services</Link></li>
              <li><Link className="hover:underline" href="/events/">Events</Link></li>
              <li><Link className="hover:underline" href="/about/">About</Link></li>
              <li><Link className="hover:underline" href="/contact/">Contact</Link></li>
              <li><Link className="hover:underline" href="/privacy/">Privacy</Link></li>
            </ul>
          </nav>

          <div className="text-sm">
            <h3 className="mb-3 font-semibold text-slate-900">Visit</h3>
            <p className="text-slate-600">
              123 Oak Street, Suite 204<br />City, ST 12345
            </p>
            <p className="mt-2 text-slate-600"><a className="hover:underline" href="tel:+11234567890">(123) 456-7890</a></p>
            <p className="mt-1 text-slate-600"><a className="hover:underline" href="mailto:hello@upgradewellness.com">hello@upgradewellness.com</a></p>
          </div>

          <form className="text-sm">
            <h3 className="mb-3 font-semibold text-slate-900">Newsletter</h3>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="flex gap-2">
              <input id="email" name="email" type="email" required placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-[999px] border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30" />
              <button type="submit" className="rounded-[999px] bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-500">Sign up</button>
            </div>
          </form>
        </Container>
        <Container>
          <p className="mt-10 text-xs text-slate-500">© {new Date().getFullYear()} Upgrade Wellness Center. All rights reserved.</p>
        </Container>
      </footer>

      {/* ===== Small helpers: header scroll, open/closed status ============== */}
      <Script id="ui-helpers" strategy="afterInteractive">
        {`
          // Header shadow on scroll
          (function () {
            var h = document.getElementById('site-header');
            var onScroll = function(){ if(!h) return; h.dataset.scrolled = (window.scrollY > 4).toString(); };
            onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
          })();

          // Live open/closed (local time)
          (function () {
            var tag = document.getElementById('openStatus'); if (!tag) return;
            var now = new Date();
            var day = now.getDay(); // 0 Sun .. 6 Sat
            // Hours mirror the table above:
            var hours = [
              ['09:00','19:00'], // Mon
              ['09:00','19:00'], // Tue
              ['09:00','19:00'], // Wed
              ['09:00','19:00'], // Thu
              ['09:00','19:00'], // Fri
              ['09:00','17:00'], // Sat
              ['10:00','16:00'], // Sun
            ];
            // Map JS day to our array (Mon=0 .. Sun=6)
            var idx = (day === 0) ? 6 : day - 1;
            function toMin(t){ var p=t.split(':'); return (+p[0])*60 + (+p[1]); }
            var open = toMin(hours[idx][0]), close = toMin(hours[idx][1]);
            var mins = now.getHours()*60 + now.getMinutes();
            var openNow = mins >= open && mins < close;
            tag.textContent = (openNow ? 'Open now' : 'Closed now') + ' — Today: ' + hours[idx][0] + ' – ' + hours[idx][1];
            tag.className = 'inline-flex items-center rounded-[999px] ' + (openNow
              ? 'bg-emerald-50 px-2.5 py-1.5 text-emerald-700 ring-1 ring-emerald-100'
              : 'bg-slate-100 px-2.5 py-1.5 text-slate-700 ring-1 ring-slate-200');
          })();
        `}
      </Script>
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
function PhoneIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.32 1.77.58 2.6a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.48-1.14a2 2 0 0 1 2.11-.45c.83.26 1.7.46 2.6.58A2 2 0 0 1 22 16.92Z" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  )
}
function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
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
function MailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
