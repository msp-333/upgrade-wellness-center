// app/faqs/page.tsx
import faqs from '@/data/faqs.json';

type FAQ = {
  id: string;
  question: string;
  answer: string;
  category?: string; // optional; falls back to "General"
};

export const metadata = {
  title: 'FAQs',
  description: 'Common questions about our programs and events.',
};

// Force a static page for GitHub Pages static export
export const dynamic = 'force-static';

import FAQsClient from '@/components/FAQsClient';

export default function FAQsPage() {
  const items = (faqs as FAQ[]).map((f) => ({
    ...f,
    category: f.category ?? 'General',
  }));

  return <FAQsClient items={items} />;
}
