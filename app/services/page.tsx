// app/services/page.tsx
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
  title: 'Services | Upgrade Wellness Center PR',
  description:
    'Energy Enhancement System, Red Light Therapy (Photobiomodulation), and Hydrogen-Rich Water — with transparent evidence and safety notes.',
  alternates: { canonical: '/services' },
  robots: { index: true, follow: true },
}

const Badge = ({ children, tone = 'emerald' }: { children: React.ReactNode; tone?: 'emerald' | 'slate' | 'amber' | 'sky' }) => {
  const tones: Record<string, string> = {
    emerald:
      'bg-emerald-50 text-emerald-900 ring-emerald-200',
    slate:
      'bg-slate-100 text-slate-800 ring-slate-300',
    amber:
      'bg-amber-50 text-amber-900 ring-amber-200',
    sky:
      'bg-sky-50 text-sky-900 ring-sky-200',
  }
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tones[tone]}`}>
      {children}
    </span>
  )
}

const Callout = ({
  title,
  children,
  tone = 'amber',
  icon = '⚠️',
}: {
  title: string
  children: React.ReactNode
  tone?: 'emerald' | 'amber' | 'slate'
  icon?: string
}) => {
  const styles: Record<string, string> = {
    emerald: 'border-emerald-300 bg-emerald-50 text-emerald-900',
    amber: 'border-amber-300 bg-amber-50 text-amber-900',
    slate: 'border-slate-300 bg-slate-50 text-slate-800',
  }
  return (
    <div role="note" className={`not-prose mt-4 rounded-xl border p-4 ${styles[tone]}`}>
      <div className="flex items-start gap-3">
        <span aria-hidden="true" className="text-lg">{icon}</span>
        <div>
          <p className="font-semibold">{title}</p>
          <div className="mt-1 text-sm/6">{children}</div>
        </div>
      </div>
    </div>
  )
}

const SourceLink = ({
  label,
  href = '#',
}: {
  label: string
  href?: string
}) => (
  <li className="flex items-start gap-2">
    <span aria-hidden className="mt-[0.35rem] inline-block h-1.5 w-1.5 rounded-full bg-slate-400" />
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className="text-slate-700 underline decoration-slate-300 underline-offset-4 hover:text-slate-900"
    >
      {label}
      <span aria-hidden className="ml-1">↗</span>
    </a>
  </li>
)

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

            <Callout title="Important site-wide notice" tone="slate" icon="ℹ️">
              This site does not provide medical advice. Sessions are complementary to—not a replacement for—professional care.
              For any condition, work with a qualified clinician.
            </Callout>
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

      {/* ================= Evidence, Safety & Policy Details ============ */}
      <section aria-labelledby="policy-heading" className="pb-12 md:pb-16">
        <Container>
          <header className="max-w-3xl">
            <h2 id="policy-heading" className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">
              Evidence, Safety &amp; Policy Details
            </h2>
            <p className="mt-2 text-slate-600">
              Clear, plain-language summaries of what each service is, what people commonly report, what the science
              says today, and how we keep things safe. These notes are updated as our understanding evolves.
            </p>
          </header>

          {/* ---------- EES ---------- */}
          <article id="ees" className="mt-8 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-slate-900">1) Energy Enhancement System (EES)</h3>
              <Badge>General Wellness</Badge>
              <Badge tone="slate">Relaxation | Meditation | Unplug</Badge>
            </div>

            <div className="prose prose-slate max-w-none mt-4">
              <h4>What it is</h4>
              <p>
                EES is a relaxation experience in a lounge setting with screens arranged to create a specific electromagnetic
                environment sometimes described by providers as “bio-scalar fields.” Many guests use EES purely for deep rest,
                meditation, or stress reduction. EES is marketed by its creator as a general-wellness technology; it is not
                cleared by the FDA to diagnose, treat, or cure any disease.
              </p>

              <h4>Potential benefits (anecdotal/experiential)</h4>
              <ul>
                <li>Deep relaxation and stress relief</li>
                <li>Quiet space for meditation, breathwork, or reflective rest</li>
                <li>Gentle “unplug” time away from devices</li>
              </ul>

              <h4>What the science says (transparency first)</h4>
              <p>
                Claims around “scalar” energy are not established within mainstream physics/biomedicine, and
                high-quality, peer-reviewed clinical trials in humans are lacking. If you’re exploring EES, treat it
                as a wellness/relaxation session—not a medical therapy.
              </p>

              <details className="mt-3">
                <summary className="cursor-pointer font-medium text-slate-800">Session flow (what to expect)</summary>
                <ol className="mt-2">
                  <li>Arrive 10 minutes early; store belongings.</li>
                  <li>Set an intention (relaxation, meditation, breathwork).</li>
                  <li>Recline in a quiet room; soft eye mask and blanket available.</li>
                  <li>Optional: hydrate before/after with hydrogen-rich water.</li>
                  <li>Leave slowly; notice how you feel the rest of the day.</li>
                </ol>
              </details>

              <h4>Who should skip or check first</h4>
              <ul>
                <li>Implanted electronic devices: consult your clinician first.</li>
                <li>Pregnancy: discuss any new wellness practice with your OB provider.</li>
              </ul>

              <Callout title="Important disclaimer" tone="amber">
                EES at our studio is offered only for general wellness (relaxation, stress management). We do not make medical claims.
                For any condition, work with a qualified health professional.
              </Callout>

              <h4 className="mt-6">Sources</h4>
              <ul className="mt-2">
                {/* TODO: Replace # with the actual source URLs */}
                <SourceLink label="U.S. Food and Drug Administration – General Wellness guidance" />
                <SourceLink label="Hilaris Publishing SRL – critical discussion referenced in transparency notes" />
              </ul>
            </div>
          </article>

          {/* ---------- Red Light Therapy (PBM) ---------- */}
          <article id="red-light-therapy" className="mt-8 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-slate-900">2) Red Light Therapy (Photobiomodulation)</h3>
              <Badge tone="emerald">Evidence varies by use</Badge>
              <Badge tone="slate">630–850 nm | Red/NIR</Badge>
            </div>

            <div className="prose prose-slate max-w-none mt-4">
              <h4>What it is</h4>
              <p>
                Photobiomodulation (PBM) uses low-level red and near-infrared light—commonly ~630–850 nm—to interact with
                cellular photoacceptors (notably cytochrome-c oxidase), supporting cellular energy processes and local
                circulation without heat or UV.
              </p>

              <h4>Evidence-supported areas (growing but condition-specific)</h4>
              <ul>
                <li><strong>Joint &amp; soft-tissue comfort:</strong> Meta-analyses report reductions in pain and improved function in some conditions (e.g., knee OA) when PBM is properly dosed and used as directed.</li>
                <li><strong>Dermatology &amp; aesthetics:</strong> Many PBM devices are regulated as Class II medical devices in the U.S. with 510(k) clearance for specific dermatologic/aesthetic uses. (Clearance ≠ “approval.”)</li>
                <li><strong>General mechanisms:</strong> Research explores mitochondrial/NO signaling and wavelength-dependent penetration within the red/NIR “optical window.”</li>
              </ul>

              <h4>What results feel like</h4>
              <p>Many people describe gentle warmth on the skin and a sense of looseness in the treated area. Effects are usually gradual and cumulative across sessions.</p>

              <details className="mt-3">
                <summary className="cursor-pointer font-medium text-slate-800">Session flow (what to expect)</summary>
                <ol className="mt-2">
                  <li>Target area selection (skin, joints, scalp).</li>
                  <li>Clean skin; remove makeup/sunscreen on target area.</li>
                  <li>10–20 minutes under the panel at a measured distance.</li>
                  <li>Post-care: normal activity; hydrate.</li>
                </ol>
              </details>

              <h4>Safety &amp; who should check first</h4>
              <ul>
                <li>Avoid shining directly into eyes; goggles are provided.</li>
                <li>Photosensitive conditions/medications, active cancer under treatment, pregnancy, or recent injectable/laser procedures: consult your clinician.</li>
                <li>Devices can be FDA-cleared for specific indications; ask us about our device’s status and labeling.</li>
              </ul>

              <h4 className="mt-6">Sources</h4>
              <ul className="mt-2">
                {/* TODO: Replace # with the actual source URLs */}
                <SourceLink label="OUP Academic – meta-analyses on PBM for musculoskeletal pain" />
                <SourceLink label="U.S. Food and Drug Administration – 510(k) device database" />
                <SourceLink label="ScienceDirect – PBM mechanisms and optical window reviews" />
              </ul>
            </div>
          </article>

          {/* ---------- Hydrogen-Rich Water (HRW) ---------- */}
          <article id="hydrogen-water" className="mt-8 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-sm backdrop-blur">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-semibold text-slate-900">3) Hydrogen-Rich Water (HRW)</h3>
              <Badge tone="sky">Early clinical research</Badge>
              <Badge tone="slate">H₂ dissolved | 250–500 mL</Badge>
            </div>

            <div className="prose prose-slate max-w-none mt-4">
              <h4>What it is</h4>
              <p>
                Hydrogen-rich water contains dissolved molecular hydrogen (H₂). Early clinical research (often small RCTs)
                explores effects on exercise-related fatigue, markers of oxidative stress, metabolic health, liver enzymes,
                and symptom scores in specific populations. Findings are mixed and still emerging.
              </p>

              <h4>Potential benefits (emerging research)</h4>
              <ul>
                <li>May modestly improve exercise fatigue and perceived exertion in active adults (short-term).</li>
                <li>Some trials in metabolic syndrome report small improvements in select markers; replication quality varies.</li>
              </ul>

              <h4>How we serve it</h4>
              <ul>
                <li>Freshly prepared HRW at the lounge; typical serving 250–500 mL.</li>
                <li>Pair with your session or take a bottle to go.</li>
              </ul>

              <h4>Safety notes</h4>
              <p>
                Generally regarded as safe in studies to date; however, HRW is not a treatment for medical conditions.
                If you have a diagnosed condition or take medications, consult your clinician. Evidence remains preliminary.
              </p>

              <h4 className="mt-6">Sources</h4>
              <ul className="mt-2">
                {/* TODO: Replace # with the actual source URLs */}
                <SourceLink label="Frontiers – HRW randomized and pilot trials" />
                <SourceLink label="ScienceDirect – reviews on oxidative stress/biomarkers" />
              </ul>
            </div>
          </article>

          {/* ---------- Global policy footer ---------- */}
          <Callout title="Regulatory & policy notes" tone="slate" icon="📎">
            <ul className="list-disc pl-5">
              <li>General-wellness products may only be marketed with low-risk, lifestyle claims and must avoid disease-treatment claims (we follow this strictly).</li>
              <li>Where devices are FDA-cleared, clearance applies to specific indications and labeling; clearance is not the same as “approval.”</li>
              <li>We continuously refine these pages to reflect evidence and best-practice safety guidance.</li>
            </ul>
          </Callout>
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
                <p className="mt-4 text-xs text-white/80">
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

