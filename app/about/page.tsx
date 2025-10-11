// app/about/page.tsx
import Link from 'next/link';
import Container from '@/components/Container';

export const metadata = {
  title: 'About',
  description: 'Our mission and approach.',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Simplicity',
      body: 'Tiny steps, clear actions, and routines that fit real life.',
    },
    {
      title: 'Science-informed',
      body: 'Decisions guided by current evidence and practical experience.',
    },
    {
      title: 'Compassion',
      body: 'Supportive, judgment-free coaching and studio culture.',
    },
    {
      title: 'Consistency',
      body: 'Build momentum with trackable habits and gentle accountability.',
    },
  ];

  const modalities = [
    {
      title: 'Energy Enhancement System',
      body:
        'A calm, restorative environment designed to help you unplug and recharge.',
    },
    {
      title: 'Red Light Therapy',
      body:
        'Low-level light sessions that are comfortable, quick, and easy to stack with your day.',
    },
    {
      title: 'Hydrogen Water',
      body:
        'Refreshing, hydrogen-rich water offered as a simple hydration upgrade.',
    },
  ];

  return (
    <Container className="py-12 md:py-16">
      {/* Hero / Intro */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-emerald-700/10 via-teal-500/10 to-emerald-700/5 p-8 md:p-12">
        <div className="pointer-events-none absolute -top-16 -right-16 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
          About Upgrade Wellness
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          We help people feel and perform better through simple, science-informed
          programs that respect your time and energy.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {['Start small', 'Measure what matters', 'Build momentum'].map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-emerald-200 bg-white/60 px-3 py-1 text-sm text-emerald-700 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Mission & Approach */}
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <h2 className="text-xl font-semibold text-slate-900">Mission</h2>
          <p className="mt-3 text-slate-600">
            Help people feel and perform better through simple, science-informed
            programs that fit real life.
          </p>
        </div>

        <div className="rounded-2xl border bg-white/70 p-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <h2 className="text-xl font-semibold text-slate-900">Approach</h2>
          <ul className="mt-3 space-y-2 text-slate-600">
            {[
              'Start small and build momentum.',
              'Focus on core pillars: sleep, stress, nutrition, and movement.',
              'Create accountability and community support.',
              'Measure what matters and iterate.',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-1 inline-block h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">What we value</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="text-sm font-medium text-emerald-700">{v.title}</div>
              <p className="mt-2 text-sm text-slate-600">{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Modalities */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold text-slate-900">
          Modalities we offer
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          These are wellness modalities and are not intended to diagnose, treat, cure,
          or prevent disease. Always consult your licensed healthcare provider for
          medical concerns.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {modalities.map((m) => (
            <div
              key={m.title}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <div className="text-base font-medium text-slate-900">{m.title}</div>
              <p className="mt-2 text-sm text-slate-600">{m.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-12">
        <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border bg-gradient-to-r from-emerald-600 to-teal-500 p-6 text-white md:flex-row md:items-center">
          <div>
            <h3 className="text-lg font-semibold">Ready to start your upgrade?</h3>
            <p className="mt-1 text-sm/relaxed opacity-90">
              Reach out with questions or book a visit—we’re happy to help you plan
              your first step.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm transition hover:opacity-90"
            >
              Contact us
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/40 transition hover:bg-white/15"
            >
              See services
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
}
