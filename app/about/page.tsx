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
    {
      title: 'Energy Enhancement',
      body: 'Unplug. Restore.',
      icon: EnergyIcon,
    },
    {
      title: 'Red Light Therapy',
      body: 'Gentle. Quick.',
      icon: LightIcon,
    },
    {
      title: 'Hydrogen Water',
      body: 'Hydrate. Refresh.',
      icon: WaterIcon,
    },
  ];

  const gallery = [
    { src: asset('/images/about-studio.png'), alt: 'Studio lounge' },
    { src: asset('/images/about-session.png'), alt: 'Quiet session' },
    { src: asset('/images/about-light.png'), alt: 'Red light setup' },
    { src: asset('/images/about-people.jpg'), alt: 'Welcoming space' },
    { src: asset('/images/about-lounge.jpg'), alt: 'Calm corner' },
  ];

  return (
    <Container className="py-12 md:py-16">
      {/* HERO — split with images */}
      <section className="grid items-center gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold tracking-wide text-brand-700">ABOUT UPGRADE</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary md:text-5xl">
            Better feels possible.
          </h1>
          <p className="mt-3 max-w-xl text-base text-text-secondary md:text-lg">
            We keep wellness simple—calm spaces, clear guidance, and practical
            routines that fit real life.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
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

        {/* Collage */}
        <div className="relative">
          <img
            src={asset('/images/about-studio.png')}
            alt="Studio"
            loading="lazy"
            className="h-72 w-full rounded-3xl object-cover shadow-soft md:h-80"
          />
          <img
            src={asset('/images/about-session.png')}
            alt="Session"
            loading="lazy"
            className="absolute -bottom-6 -left-6 hidden h-40 w-56 rounded-2xl object-cover shadow-soft md:block"
          />
          <img
            src={asset('/images/about-light.png')}
            alt="Red light"
            loading="lazy"
            className="absolute -top-6 -right-6 hidden h-32 w-44 rounded-2xl object-cover shadow-soft md:block"
          />
        </div>
      </section>

      {/* QUICK STATS — minimal copy, big type */}
      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { k: '3', v: 'Core modalities' },
          { k: '60–240', v: 'Minute sessions' },
          { k: '1%', v: 'Better each day' },
        ].map((s) => (
          <div
            key={s.v}
            className="rounded-card border bg-white p-5 text-center shadow-soft"
          >
            <div className="text-3xl font-semibold text-text-primary md:text-4xl">{s.k}</div>
            <div className="mt-1 text-sm text-text-secondary">{s.v}</div>
          </div>
        ))}
      </section>

      {/* MODALITIES — icon cards, short lines */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-text-primary md:text-2xl">
          What we offer
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {modalities.map((m) => (
            <div
              key={m.title}
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
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-text-secondary">
          Wellness modalities are not medical care. Consult your licensed provider for medical concerns.
        </p>
      </section>

      {/* VALUES — tight, varied sizes */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-text-primary md:text-2xl">How we operate</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div key={v.title} className="rounded-card border bg-white p-5 shadow-soft">
              <div className="text-sm font-medium text-brand-700">{v.title}</div>
              <p className="mt-1 text-sm text-text-secondary">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY — mosaic, low text */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-text-primary md:text-2xl">Studio & sessions</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {/* big lead image */}
          <img
            src={gallery[0].src}
            alt={gallery[0].alt}
            loading="lazy"
            className="col-span-2 h-56 w-full rounded-2xl object-cover shadow-soft md:h-72"
          />
          {/* smalls */}
          {gallery.slice(1).map((g) => (
            <img
              key={g.src}
              src={g.src}
              alt={g.alt}
              loading="lazy"
              className="h-40 w-full rounded-2xl object-cover shadow-soft md:h-48"
            />
          ))}
        </div>
      </section>

      {/* CTA — concise */}
      <section className="mt-12">
        <div className="flex flex-col items-start justify-between gap-4 rounded-card border bg-gradient-to-r from-brand-700 to-gradient-end p-6 text-white md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-semibold md:text-xl">Ready to start?</h3>
            <p className="mt-1 text-sm/relaxed opacity-90">
              Book a visit or ask a quick question—no pressure.
            </p>
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
