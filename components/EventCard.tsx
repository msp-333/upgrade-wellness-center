type EventItem = {
  id: string;
  title: string;
  date: string; // ISO date string
  location: string;
  description?: string;
  ctaUrl?: string;
};

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function EventCard({ item }: { item: EventItem }) {
  return (
    <article className="card card-hover p-5 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="mt-2 text-sm text-ink-700">
          <time dateTime={item.date}>{formatDate(item.date)}</time> · {item.location}
        </p>
        {item.description ? (
          <p className="mt-3 text-sm text-ink-700">{item.description}</p>
        ) : null}
      </div>
      {item.ctaUrl ? (
        <a
          href={item.ctaUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 btn btn-ghost text-center"
        >
          Learn more
        </a>
      ) : null}
    </article>
  );
}
