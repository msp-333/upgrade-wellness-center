// components/ServiceCard.tsx
import Link from 'next/link'

export type ServiceItem = {
  id: string
  name: string
  slug: string
  tagline?: string
  summary?: string
  duration?: string
  image?: string // used when available; icons are fallback
}

const pill =
  'inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur'

/** Prefix assets so it works on GitHub Pages subpaths if you deploy there */
const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`

export default function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = iconFor(item.slug || item.id)

  // If no image is provided, fall back to a soft, circular icon header
  const hasImage = !!item.image

  // Derive a default image path from the slug/name if not explicitly provided
  const derivedImage =
    item.image ??
    `/images/services/${(item.slug || item.name || 'service')
      .toLowerCase()
      .replace(/\s+/g, '-')}.jpg`

  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl focus-within:ring-2 focus-within:ring-emerald-300/50">
      {/* Media header: photo-first; icon bubble fallback */}
      {hasImage ? (
        <div className="relative overflow-hidden">
          <div className="relative aspect-[4/3] w-full">
            <img
              src={asset(derivedImage)}
              alt={item.name}
              loading="lazy"
              decoding="async"
              sizes="(min-width:1280px) 33vw, (min-width:768px) 50vw, 100vw"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {/* readability gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            {/* over-image chips + title */}
            <div className="absolute inset-x-4 bottom-4 sm:inset-x-5">
              {item.tagline ? (
                <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-slate-700 backdrop-blur">
                  {item.tagline}
                </span>
              ) : item.duration ? (
                <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-slate-700 backdrop-blur">
                  {item.duration}
                </span>
              ) : null}
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white drop-shadow sm:text-[22px]">
                {item.name}
              </h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 p-5 sm:p-6">
          <div className="relative inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-emerald-200/60 bg-emerald-50/70 ring-1 ring-inset ring-white/40">
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 to-transparent"
              aria-hidden
            />
            <Icon className="relative h-8 w-8 text-emerald-700" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-slate-900">{item.name}</h3>
            {item.tagline && (
              <p className="mt-0.5 line-clamp-1 text-sm font-medium text-emerald-700">
                {item.tagline}
              </p>
            )}
            {item.duration && !item.tagline && (
              <span className={`${pill} mt-2`}>{item.duration}</span>
            )}
          </div>
        </div>
      )}

      {/* Body */}
      <div className={`flex flex-1 flex-col ${hasImage ? 'p-5 sm:p-6 pt-4' : 'px-5 pb-5 sm:px-6 sm:pb-6'}`}>
        {item.summary && (
          <p className="text-[15px] leading-relaxed text-slate-700">
            {item.summary}
          </p>
        )}

        {/* Meta + CTA */}
        <div className="mt-4 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {/* If we used tagline on the image, show duration below (if both exist) */}
            {item.duration && hasImage && (
              <span className={pill}>{item.duration}</span>
            )}
          </div>
          <Link
            href={`/services/${item.slug}`}
            className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-3.5 py-2 text-sm font-semibold text-white shadow transition-colors hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
            aria-label={`${item.name} — Learn more`}
          >
            Learn more
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              className="ml-1.5 h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}

/* ---------------- Icons per service (fallback visuals) -------------- */
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
      {[0, 8, 16].flatMap((y) =>
        [4, 12, 20].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y + 4} r="2.4" />),
      )}
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
