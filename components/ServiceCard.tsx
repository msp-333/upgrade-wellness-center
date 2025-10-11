// components/ServiceCard.tsx
import Link from 'next/link'

type CardItem = {
  id: string
  name: string
  slug: string
  tagline?: string
  summary: string
  duration?: string
  image?: string
}

export default function ServiceCard({ item }: { item: CardItem }) {
  // Prefix assets for GitHub Pages subpaths
  const asset = (p?: string) =>
    p ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}` : undefined

  return (
    <article className="group grid grid-cols-[auto,1fr] items-center gap-4 rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur transition hover:shadow-md md:grid-cols-[120px,1fr]">
      {/* Thumb */}
      <div className="flex h-20 w-20 items-center justify-center rounded-xl border bg-white md:h-[120px] md:w-[120px]">
        {item.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset(item.image)}
            alt=""
            className="h-14 w-14 object-contain md:h-20 md:w-20"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="h-8 w-8 rounded bg-slate-200" />
        )}
      </div>

      {/* Copy */}
      <div className="min-w-0">
        <h3 className="text-lg font-semibold text-slate-900">
          <Link href={`/services/${item.slug}`} className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden />
            {item.name}
          </Link>
        </h3>
        {item.tagline && (
          <p className="mt-1 text-sm text-emerald-700/80">{item.tagline}</p>
        )}
        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
          {item.summary}
        </p>

        <div className="mt-3 flex items-center gap-3">
          {item.duration && (
            <span className="inline-flex items-center rounded-full border border-slate-200 px-2.5 py-1 text-xs text-slate-700">
              ⏱ {item.duration}
            </span>
          )}

          <Link
            href={`/services/${item.slug}`}
            className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700"
          >
            Learn more <span aria-hidden className="ml-1">→</span>
          </Link>
        </div>
      </div>
    </article>
  )
}
