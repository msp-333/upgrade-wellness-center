import Container from './Container';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white/60">
      <Container className="py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-sm text-ink-700">
            © {new Date().getFullYear()} Upgrade Wellness Center. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacy-policy/" className="text-ink-700 hover:text-ink-900">Privacy Policy</Link>
            <a href="mailto:hello@upgradewellness.example" className="text-ink-700 hover:text-ink-900">Email us</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
