// app/events/page.tsx
import Link from 'next/link'
import Container from '@/components/Container'

export const metadata = {
  title: 'Opening',
  description: 'Grand Opening — pre-pay membership or subscribe for updates.',
}

export default function EventsPage() {
  // Update these hrefs to match your site routes if needed
  const membershipHref = '/services#membership'
  const subscribeHref = '/subscribe' // or '/contact' if you don't have a subscribe page

  return (
    <section className="relative isolate">
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-50 via-white to-white"
        aria-hidden
      />
      <Container className="pt-16 md:pt-24 pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.25em] text-emerald-700/70">
            Opening
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
            Grand Opening — Coming Soon
          </h1>

          <p className="mt-4 text-slate-700">
            We’re preparing the space and schedule. There are currently <strong>no events</strong>.
            If you’d like to be part of day one, you can pre-pay your membership now or subscribe for opening updates.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href={membershipHref}
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              Pre-pay Membership
            </Link>
            <Link
              href={subscribeHref}
              className="inline-flex items-center justify-center rounded-full border border-emerald-300 bg-white px-5 py-3 text-sm font-medium text-emerald-800 hover:bg-emerald-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            >
              Subscribe for Updates
            </Link>
          </div>

          <div className="mt-10 text-left">
            <div className="rounded-2xl border border-emerald-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Be part of day one</h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-700">
                <li>
                  <span className="font-medium">Pre-pay membership:</span> We’ll notify you as soon as booking opens and send your activation steps.
                </li>
                <li>
                  <span className="font-medium">Just want updates?</span> Subscribe and we’ll email the opening date and the sign-up link.
                </li>
              </ul>
              <p className="mt-4 text-sm text-slate-500">
                Questions? <Link href="/contact" className="underline decoration-emerald-300 underline-offset-2 hover:text-emerald-800">Contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
