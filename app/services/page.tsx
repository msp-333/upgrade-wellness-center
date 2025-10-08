import Container from '@/components/Container';
import ServiceCard from '@/components/ServiceCard';
import services from '@/data/services.json';

type ServiceItem = {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  summary: string;
  benefits: string[];
  duration?: string;
  image?: string;
};

export const metadata = {
  title: 'Services',
  description: 'Energy Enhancement System, Red Light Therapy, and Hydrogen Water offerings.',
};

export default function ServicesPage() {
  const list = services as ServiceItem[];

  return (
    <Container className="py-12 md:py-16">
      <h1>Our Services</h1>
      <p className="mt-3 max-w-2xl text-slate-600">
        Gentle, straightforward options to help you recharge. Explore the offerings below, then reach out with questions or to book.
      </p>

      <div className="mt-8 grid gap-6">
        {list.map((s) => (
          <div key={s.id} id={s.slug}>
            <ServiceCard item={s} />
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="card p-6">
          <h2 className="text-xl">How to get started</h2>
          <ol className="mt-3 list-decimal pl-6 space-y-1 text-slate-600">
            <li>Choose a service that fits your goals.</li>
            <li>Visit the <a href="/contact/">contact page</a> and send us your preferred times.</li>
            <li>We’ll confirm availability and answer any questions.</li>
          </ol>
          <p className="mt-3 text-xs text-slate-500">
            This site does not provide medical advice. Sessions are complementary to—not a replacement for—professional care.
          </p>
        </div>
      </div>
    </Container>
  );
}
