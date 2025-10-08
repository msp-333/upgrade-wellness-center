import Container from '@/components/Container';
import EventCard from '@/components/EventCard';
import events from '@/data/events.json';

type EventItem = {
  id: string;
  title: string;
  date: string;
  location: string;
  description?: string;
  ctaUrl?: string;
};

export const metadata = {
  title: 'Events',
  description: 'Browse upcoming and past events.',
};

function splitEvents(items: EventItem[]) {
  const now = new Date();
  const upcoming = items
    .filter((e) => new Date(e.date) >= now)
    .sort((a, b) => +new Date(a.date) - +new Date(b.date));
  const past = items
    .filter((e) => new Date(e.date) < now)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return { upcoming, past };
}

export default function EventsPage() {
  const { upcoming, past } = splitEvents(events as EventItem[]);

  return (
    <Container className="section">
      <h1>Events</h1>

      <section className="mt-6">
        <h2 className="text-xl">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="mt-3 text-ink-700">No upcoming events right now—check back soon!</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} item={e} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-xl">Past</h2>
        {past.length === 0 ? (
          <p className="mt-3 text-ink-700">No past events yet.</p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => (
              <EventCard key={e.id} item={e} />
            ))}
          </div>
        )}
      </section>
    </Container>
  );
}
