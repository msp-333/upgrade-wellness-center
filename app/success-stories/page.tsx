import Container from '@/components/Container';
import testimonials from '@/data/testimonials.json';

type Testimonial = {
  id: string;
  name: string;
  role?: string;
  quote: string;
};

export const metadata = {
  title: 'Success Stories',
  description: 'What participants say about our programs.',
};

export default function SuccessStoriesPage() {
  const list = testimonials as Testimonial[];
  return (
    <Container className="section">
      <h1>Success Stories</h1>
      <p className="mt-3 text-ink-700">A few words from our community.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((t) => (
          <figure key={t.id} className="card p-6">
            <blockquote className="leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-ink-700">
              — {t.name}{t.role ? `, ${t.role}` : ''}
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  );
}
