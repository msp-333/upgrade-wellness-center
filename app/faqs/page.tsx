// app/faqs/page.tsx
import faqs from '@/data/faqs.json';
import FAQsClient from '@/components/FAQsClient';

export const metadata = {
  title: 'FAQs',
  description: 'Common questions about our programs and events.',
};

// Fully static for GitHub Pages
export const dynamic = 'force-static';

type FAQ = { id: string; question: string; answer: string; category?: string };

export default function FAQsPage() {
  const items = (faqs as FAQ[]).map((i) => ({
    ...i,
    category: i.category ?? 'General',
  }));

  return <FAQsClient items={items} />;
}
