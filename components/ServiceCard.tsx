// components/ServiceCard.tsx
import Link from 'next/link'

type Props = {
  item: {
    id: string
    name: string
    slug: string
    tagline?: string
    summary: string
    duration?: string
    image?: string
  }
}

export default function ServiceCard({ item }: Props) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Media + title */}
      <div className="grid grid-cols-[92px,1fr] gap-4">
        <div className="flex h-[92px] w-[92px] items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50/60">
          {/* icon/image slot (kept minimal for alignment) */}
          <div className="h-[56px] w-[56px] rounded-xl bg-emerald-900/90" />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-emerald-700">{item.name}</h3>
          {item.tagline && (
            <p className="mt-0.5 text-sm text-emerald-700/80">{item.tagline}</p>
          )}
        </div>
      </div>

      {/* Summary — fixed line area to normalize heights */}
      <p className="mt-3 text-sm text-slate-700 [display:-webkit-box] [-webkit-line-clamp:3] [-webkit-box-orient:vertical] overflow-hidden">
        {item.summary}
      </p>

      {/* Actions pinned to bottom */}
      <div className="mt-auto flex items-center gap-3 pt-4">
        {item.duration && (
          <span className="inline-flex items-center rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-700">
            <span aria-hidden className="mr-1">🕒</span> {item.duration}
          </span>
        )}
        <Link
          href={`/services/${item.slug}`}
          className="ml-auto inline-flex items-center justify-center rounded-lg bg-emerald-600 px-3 py-2 text-xs font-semibold text-white hover:bg-emerald-700"
        >
          Learn more <span aria-hidden className="ml-1">→</span>
        </Link>
      </div>
    </article>
  )
}
