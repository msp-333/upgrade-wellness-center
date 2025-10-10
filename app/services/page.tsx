import Link from 'next/link'
import Container from '@/components/Container'
import ServiceCard from '@/components/ServiceCard'
import services from '@/data/services.json'

type ServiceItem = {
  id: string
  name: string
  slug: string
  tagline?: string
  summary: string
  benefits: string[]
  duration?: string
  image?: string
}

export const metadata = {
  title: 'Services',
  description:
    'Energy Enhancement System, Red Light Therapy, and Hydrogen Water offerings.',
}

export default function ServicesPage() {
  const list = services as ServiceItem[]

  // For GitHub Pages subpaths
  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`

  return (
    <>
      {/* ======================= TOP HERO / INTRO ======================= */}
      <section className="relative isolate">
        {/* Spa glow background */}
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-emerald-50 via-white to-white" aria-hidden />
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-emerald-400/20 blur-3xl -z-10" aria-hidden />
        <div className="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-emerald-300/20 blur-3xl -z-10" aria-hidden />

        <Container className="pt-12 md:pt-16 pb-6">
          <div className="max-w-3xl">
            <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-700/70">Offerings</p>
            <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-slate-900">
              Our Services
            </h1>
            <p className="mt-3 max-w-2xl text-slate-600">
              Gentle, straightforward options to help you recharge. Explore the offerings below, then
              reach out with questions or to book.
            </p>

            {/* Quick jump chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              {list.map((s) => (
                <Link
                  key={s.id}
                  href={`#${s.slug}`}
                  className="inline-flex items-center rounded-full border border-emerald-500/30 bg-white/70 px-3 py-1.5 text-sm text-slate-800 shadow-sm backdrop-blur hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ========================== LIST SECTION ======================== */}
      <section className="py-8 md:py-10">
        <Container>
          <div className="grid gap-8">
            {list.map((s) => (
              <div key={s.id} id={s.slug} className="scroll-mt-24">
                {/* Optional subtle gradient hairline behind cards */}
                <div className="rounded-3xl p-[1px] bg-gradient-to-br from-emerald-400/15 via-transparent to-emerald-400/20">
                  {/* Your ServiceCard handles the main layout */}
                  <div className="rounded-[calc(theme(borderRadius.3xl)-1px)] bg-white/80 backdrop-blur ring-1 ring-slate-200/80 shadow-sm">
                    <ServiceCard item={s} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ========================== HOW TO START ======================== */}
      <section className="pb-12 md:pb-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white shadow-xl">
            {/* Decorative glow */}
            <div className="pointer-events-none absolute -top-16 left-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" aria-hidden />

            <div className="relative grid gap-8 p-6 md:grid-cols-[1.5fr,1fr] md:p-10">
              <div>
                <h2 className="text-2xl md:text-3xl">How to get started</h2>
                <ol className="mt-4 space-y-3 text-white/90">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">1</span>
                    Choose a service that fits your goals.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">2</span>
                    Visit the <a className="underline underline-offset-4 decoration-white/40 hover:text-white" href="/contact/">contact page</a> and send us your preferred times.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">3</span>
                    We’ll confirm availability and answer any questions.
                  </li>
                </ol>
                <p className="mt-4 text-xs text-white/70">
                  This site does not provide medical advice. Sessions are complementary to—not a replacement for—professional care.
                </p>
              </div>
              <div className="flex items-center gap-3 md:justify-end">
                <Link
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-medium text-slate-900 shadow hover:bg-white/95 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Contact us
                </Link>
                <Link
                  href="/events/"
                  className="inline-flex items-center justify-center rounded-xl border border-white/70 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70"
                >
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
