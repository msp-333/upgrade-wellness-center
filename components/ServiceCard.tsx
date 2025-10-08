type ServiceItem = {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  summary: string;
  benefits: string[];
  duration?: string;
  image?: string; // url under /public
};

export default function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <article className="card card-hover p-6 flex flex-col md:flex-row gap-5">
      <div className="shrink-0">
        <div className="h-28 w-28 rounded-xl2 overflow-hidden border border-slate-200/80 bg-white">
          {item.image ? (
            <img src={item.image} alt="" className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(52,211,153,0.35),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(52,211,153,0.25),transparent_45%)]" />
          )}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        {item.tagline && <p className="mt-1 text-sm text-emerald-200/80">{item.tagline}</p>}
        <p className="mt-3 text-sm text-slate-600">{item.summary}</p>
        <ul className="mt-3 grid gap-1 text-sm text-emerald-100/90 sm:grid-cols-2">
          {item.benefits.map((b) => (
            <li key={b} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-3">
          <a href={`/services/#${item.slug}`} className="btn btn-ghost">Learn more</a>
          {item.duration && <span className="text-xs text-slate-500">Typical duration: {item.duration}</span>}
        </div>
      </div>
    </article>
  );
}
