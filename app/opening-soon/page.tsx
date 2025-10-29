// app/opening-soon/page.tsx
import Link from 'next/link'
import Container from '@/components/Container'

export const metadata = {
  title: 'Opening Soon | Upgrade Wellness Center',
  description:
    'We’re opening soon. You can pre-pay your membership or send us a message to get on the list.',
}

export default function OpeningSoonPage() {
  // Helper so images work on GitHub Pages subpaths (if you use one)
  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`
  const HERO = '/images/coming-soon.jpg' // optional; place something in /public/images or remove bg below

  return (
    <main className="relative isolate">
      {/* Soft background / optional hero image wash */}
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(60rem_40rem_at_100%_0%,rgba(16,185,129,0.08),transparent),radial-gradient(60rem_40rem_at_0%_100%,rgba(14,165,233,0.08),transparent)]"
        aria-hidden
      />
      <section className="py-16 sm:py-20 md:py-24">
        <Container className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block rounded-full border border-emerald-500/30 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-emerald-700">
            Update
          </span>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
            We’re opening soon
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Thanks for your interest! You can secure your spot by pre-paying for membership, or send us a message and
            we’ll reach out as we get closer to launch.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {/* Primary CTA — Pre-pay membership (scrolls to Membership section on Pricing) */}
            <Link
              href="/pricing#pricing-panel-membership"
              className="rounded-[999px] bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Pre-pay Membership
            </Link>

            {/* Secondary CTA — Contact */}
            <Link
              href="/contact"
              className="rounded-[999px] border border-slate-300 bg-white/90 px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Send us a Message
            </Link>
          </div>

          <p className="mt-4 text-xs text-slate-500">
            No medical claims. Sessions are non-diagnostic and non-medical.
          </p>
        </Container>
      </section>
    </main>
  )
}
