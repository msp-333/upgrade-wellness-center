// app/faqs/page.tsx
import Container from '@/components/Container';
import faqs from '@/data/faqs.json';

type FAQ = { id: string; question: string; answer: string };

export const metadata = {
  title: 'FAQs',
  description: 'Common questions about our programs and events.',
};

// Force a static page for static export
export const dynamic = 'force-static';

export default function FAQsPage() {
  const items = faqs as FAQ[];

  return (
    <Container className="section">
      <h1>FAQs</h1>
      <div className="mt-6 space-y-3">
        {items.map((f) => (
          <details key={f.id} className="card p-5">
            <summary className="cursor-pointer text-lg">{f.question}</summary>
            <p className="mt-2 text-ink-700">{f.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
