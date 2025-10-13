// app/pricing/page.tsx
import PricingClient, { PricingData } from '@/components/PricingClient';
import raw from '@/data/pricing.json';

export const metadata = {
  title: 'Pricing',
  description: 'Transparent pricing for memberships, sessions, overnights, and value packages.',
};

// Force static HTML for GitHub Pages export
export const dynamic = 'force-static';

// Define Tone locally so we don't need to import it
type Tone = 'brand' | 'premium' | 'special';

function toTone(v: unknown): Tone | undefined {
  return v === 'brand' || v === 'premium' || v === 'special' ? v : undefined;
}

function normalize(data: any): PricingData {
  const mapArr = (arr: any[]) =>
    (arr ?? []).map((i) => ({ ...i, tone: toTone(i?.tone) }));

  return {
    membership: mapArr(data?.membership),
    sessions: mapArr(data?.sessions),
    overnight: mapArr(data?.overnight),
    packages: mapArr(data?.packages),
  };
}

export default function PricingPage() {
  const data = normalize(raw);
  return <PricingClient data={data} />;
}
