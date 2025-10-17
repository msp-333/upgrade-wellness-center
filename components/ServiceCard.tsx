// components/ServiceCard.tsx
import Link from 'next/link'

export type ServiceItem = {
  id: string
  name: string
  slug: string
  tagline?: string
  summary?: string
  duration?: string
  image?: string // ignored here, we’re using icons
}

const pill =
  'inline-flex items-center gap-2 rounded-[999px] border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur'

export default function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = iconFor(item.slug || item.id)

  return (
    <article className="group relative h-full overflow-hidden rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-400 hover:-translate-y-0.5 hover:shadow-[0_12px_24px_rgba(16,24,40,.08)] focus-within:ring-2 focus-within:ring-emerald-300/50">
      {/* Header with square icon tile */}
      <div className="flex items-start gap-4">
        <div className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-emerald-200/60 bg-emerald-50/60 ring-1 ring-inset ring-white/40">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 to-transparent" aria-hidden />
          <Icon className="relative h-8 w-8 text-emerald-700" />
        </div>
        <div>
          {/* Name in dark gray */}
          <h3 className="text-base font-semibold text-slate-900 sm:text-lg">{item.name}</h3>
          {item.tagline && (
            <p className="mt-0.5 text-sm font-medium text-emerald-700">{item.tagline}</p>
          )}
        </div>
      </div>

      {/* Summary */}
      {item.summary && (
        <p className="mt-3 text-sm leading-relaxed text-slate-700">{item.summary}</p>
      )}

      {/* Meta + CTA */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {item.duration && <span className={pill}>{item.duration}</span>}
        </div>
        <Link
          href={`/services/#${item.slug}`}
          className="inline-flex items-center justify-center rounded-[999px] bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Learn more →
        </Link>
      </div>
    </article>
  )
}

/* ---------------- Icons per service ---------------- */
function iconFor(key?: string) {
  switch ((key ?? '').toLowerCase()) {
    case 'ees':
    case 'energy-enhancement':
    case 'energy-enhancement-system':
      return ConcentricIcon
    case 'red-light':
    case 'red-light-therapy':
      return DotsGridIcon
    case 'hydrogen-water':
      return BubblesIcon
    default:
      return LeafIcon
  }
}

function ConcentricIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" opacity=".35" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" opacity=".6" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  )
}
function DotsGridIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      {[0,8,16].flatMap(y => [4,12,20].map(x => <circle key={`${x}-${y}`} cx={x} cy={y+4} r="2.4" />))}
    </svg>
  )
}
function BubblesIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="8" cy="14" r="4.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="16.5" cy="8" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="18.8" cy="16.5" r="1.8" fill="currentColor" />
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
