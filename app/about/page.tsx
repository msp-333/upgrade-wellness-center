import Link from 'next/link';
import Container from '@/components/Container';

export const metadata = {
  title: 'About',
  description: 'Our mission and approach.',
};

export default function AboutPage() {
  // Prefix assets so it works on GitHub Pages subpaths
  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`;

  const values = [
    { title: 'Simplicity', body: 'Small steps, real routines.' },
    { title: 'Science-informed', body: 'Grounded, practical, updated.' },
    { title: 'Compassion', body: 'Care that meets you where you are.' },
    { title: 'Consistency', body: 'Tiny wins, repeated.' },
  ];

  const modalities = [
    { title: 'Hydrogen Water', body: 'Hydrate. Refresh.', icon: WaterIcon, href: '/services#hydrogen-water' },
    { title: 'Energy Enhancement', body: 'Unplug. Restore.', icon: EnergyIcon, href: '/services#energy-enhancement' },
    { title: 'Red Light Therapy', body: 'Gentle. Quick.', icon: LightIcon, href: '/services#red-light-therapy' },
  ];

  return (
    <Container className="py-12 md:py-16">
      {/* HERO — single image (no overlays), generous bottom margin */}
      <section className="grid items-center gap-8 md:grid-cols-2 mb-12 md:mb-16">
        <div>
          <p className="text-xs font-semibold tracking-[0.14em] text-brand-700">ABOUT UPGRADE</p>
          <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-text-primary">
            Better feels possible.
          </h1>
          <p className="mt-3 max-w-xl text-base md:text-lg text-text-secondary">
            Calm spaces, clear guidance, and practical routines that fit real life.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {['Calm space', 'Evidence-minded', 'Judgment-free'].map((t) => (
              <span
                key={t}
                className="inline-flex items-center rounded-pill border border-brand-300/60 bg-white px-3 py-1 text-sm text-brand-800 shadow-soft"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* One clean hero image */}
        <div>
          <img
            src={asset('/images/about-studio.png')}
            alt="Upgrade Wellness studio"
            loading="lazy"
            className="h-80 w-full rounded-3xl object-cover shadow-soft md:h-[22rem]"
          />
        </div>
      </section>

      {/* QUICK STATS — balanced spacing */}
      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { k: '3', v: 'Core modalities' },
          { k: '60–240', v: 'Minute sessions' },
          { k: '1%', v: 'Better each day' },
        ].map((s) => (
          <div key={s.v} className="rounded-card border bg-white p-5 text-center shadow-soft">
            <div className="text-3xl md:text-4xl font-semibold text-text-primary">{s.k}</div>
            <div className="mt-1 text-sm text-text-secondary">{s.v}</div>
          </div>
        ))}
      </section>

      {/* SPOTLIGHTS — Energy Enhancement & Red Light Therapy */}
      <section className="mt-12 md:mt-14 space-y-8">
        {/* Energy Enhancement */}
        <div className="grid items-center gap-6 rounded-3xl border bg-white p-6 shadow-soft md:grid-cols-2">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-text-primary">Energy Enhancement</h2>
            <p className="mt-2 text-text-secondary">
              A quiet, restorative room designed to help you unplug and recharge. Arrive as you are—rest, breathe, and
              take a pause from busy.
            </p>
            <div className="mt-4">
              <Link
                href="/services#energy-enhancement"
                className="inline-flex items-center rounded-pill bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
              >
                Learn more
              </Link>
            </div>
          </div>
          <img
            src={asset('/images/about-session.png')}
            alt="Energy Enhancement room"
            loading="lazy"
            className="h-56 w-full rounded-2xl object-cover md:h-64"
          />
        </div>

        {/* Red Light Therapy */}
        <div className="grid items-center gap-6 rounded-3xl border bg-white p-6 shadow-soft md:grid-cols-2">
          <img
            src={asset('/images/about-light.png')}
            alt="Red light therapy lamp"
            loading="lazy"
            className="order-last h-56 w-full rounded-2xl object-cover md:order-first md:h-64"
          />
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-text-primary">Red Light Therapy</h2>
            <p className="mt-2 text-text-secondary">
              Short, comfortable sessions using visible red and near-infrared light—easy to stack with your routine.
            </p>
            <div className="mt-4">
              <Link
                href="/services#red-light-therapy"
                className="inline-flex items-center rounded-pill bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 transition"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODALITIES — compact grid */}
      <section className="mt-12">
        <h3 className="text-lg md:text-xl font-semibold text-text-primary">What we offer</h3>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {modalities.map((m) => (
            <Link
              key={m.title}
              href={m.href}
              className="group rounded-card border bg-white p-5 shadow-soft transition hover:border-brand-300/70"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                  <m.icon />
                </span>
                <div>
                  <div className="text-base font-semibold text-text-primary">{m.title}</div>
                  <div className="text-sm text-text-secondary">{m.body}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-3 text-xs text-text-secondary">
          Wellness modalities are not medical care. Consult your licensed provider for medical concerns.
        </p>
      </section>

      {/* VALUES — breathable grid */}
      <section className="mt-12">
        <h3 className="text-lg md:text-xl font-semibold text-text-primary">How we operate</h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-card border bg-white p-5 shadow-soft">
              <div className="text-sm font-medium text-brand-700">{v.title}</div>
              <p className="mt-1 text-sm text-text-secondary">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — concise */}
      <section className="mt-14">
        <div className="flex flex-col items-start justify-between gap-4 rounded-card border bg-gradient-to-r from-brand-700 to-gradient-end p-6 text-white md:flex-row md:items-center">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">Ready to start?</h3>
            <p className="mt-1 text-sm/relaxed opacity-90">Book a visit or ask a quick question—no pressure.</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-pill bg-white px-4 py-2 text-sm font-semibold text-brand-800 shadow-soft transition hover:opacity-90"
            >
              Contact us
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-pill bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/40 transition hover:bg-white/15"
            >
              Explore services
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}

/* --------- icons (clean, lightweight) --------- */
function EnergyIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="opacity-90">
      <path fill="currentColor" d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}
function LightIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="opacity-90">
      <path fill="currentColor" d="M12 2a8 8 0 0 0-8 8c0 3 2 5 4 6v2h8v-2c2-1 4-3 4-6a8 8 0 0 0-8-8zM9 20h6v2H9z" />
    </svg>
  );
}
function WaterIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className="opacity-90">
      <path fill="currentColor" d="M12 2s7 7 7 12a7 7 0 1 1-14 0c0-5 7-12 7-12z" />
    </svg>
  );
}
