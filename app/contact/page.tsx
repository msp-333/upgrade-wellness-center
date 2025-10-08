import type { Metadata } from 'next';
import Container from '@/components/Container';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Reach out about events, programs, or partnerships.',
};

export default function ContactPage() {
  return (
    <Container className="py-12 md:py-16">
      <h1>Contact</h1>
      <p className="mt-2 text-slate-600">Send us a message and we’ll get back soon.</p>
      <ContactForm />
    </Container>
  );
}
