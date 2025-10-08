import Container from '@/components/Container';

export const metadata = {
  title: 'About',
  description: 'Our mission and approach.',
};

export default function AboutPage() {
  return (
    <Container className="py-12 md:py-16">
      <h1>About Upgrade Wellness</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="card p-6">
          <h2>Mission</h2>
          <p className="mt-3 text-slate-600">
            Help people feel and perform better through simple, science‑informed programs that fit real life.
          </p>
        </div>
        <div className="card p-6">
          <h2>Approach</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-600">
            <li>Start small and build momentum.</li>
            <li>Focus on core pillars: sleep, stress, nutrition, and movement.</li>
            <li>Create accountability and community support.</li>
            <li>Measure what matters and iterate.</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}
