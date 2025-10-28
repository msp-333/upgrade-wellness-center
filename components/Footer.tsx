// components/Footer.tsx
import Link from 'next/link'
import Container from '@/components/Container'

export default function Footer() {
  const year = new Date().getFullYear()

  // Helper so images work on GitHub Pages subpaths
  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`
  const LOGO = '/images/logo.png'

  return (
    <footer className="border-t border-slate-200 bg-white" aria-labelledby="footer-title">
      {/* Top: columns */}
      <section className="py-12">
        <Container className="grid gap-10 md:grid-cols-4">
          <h2 id="footer-title" className="sr-only">Site footer</h2>

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <img
                src={asset(LOGO)}
                alt="Upgrade Wellness Center logo"
                width={500}
                height={500}
                decoding="async"
                loading="lazy"
                className="h-14 w-14 sm:h-16 sm:w-16 object-contain"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-600">
              Calm, evidence-informed care for everyday life.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links" className="text-sm">
            <h3 className="mb-3 font-semibold text-slate-900">Quick links</h3>
            <ul className="space-y-2">
              <li><Link className="hover:underline" href="/services/">Services</Link></li>
              <li><Link className="hover:underline" href="/events/">Events</Link></li>
              <li><Link className="hover:underline" href="/about/">About</Link></li>
              <li><Link className="hover:underline" href="/contact/">Contact</Link></li>
              <li><Link className="hover:underline" href="/privacy-policy/">Privacy Policy</Link></li>
            </ul>
          </nav>

          {/* Visit */}
          <address className="not-italic text-sm">
            <h3 className="mb-3 font-semibold text-slate-900">Visit</h3>
            <p className="text-slate-600">
              123 Oak Street, Suite 204<br />
              City, ST 12345
            </p>
            <p className="mt-2 text-slate-600">
              <a className="hover:underline" href="tel:+11234567890">(123) 456-7890</a>
            </p>
            <p className="mt-1 text-slate-600">
              <a className="hover:underline" href="mailto:hello@upgradewellness.com">
                hello@upgradewellness.com
              </a>
            </p>
          </address>

          {/* Newsletter */}
          <form className="text-sm" aria-label="Newsletter signup">
            <h3 className="mb-3 font-semibold text-slate-900">Newsletter</h3>
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-[999px] border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-600/30"
              />
              <button
                type="submit"
                className="rounded-[999px] bg-emerald-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                Sign up
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              By subscribing, you consent to receive updates from us.
            </p>
          </form>
        </Container>
      </section>

      {/* Middle: fine print row */}
      <section className="border-t border-slate-200 py-6">
        <Container className="flex flex-col items-start justify-between gap-3 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {year} Upgrade Wellness Center. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
            <li><Link href="/privacy-policy/" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:underline">Terms</Link></li>
            <li><a href="mailto:hello@upgradewellness.com" className="hover:underline">Contact Support</a></li>
          </ul>
        </Container>
      </section>

      {/* Bottom: Disclaimer — darker, compact spacing */}
      <section
        className="border-t border-slate-100 bg-slate-100 py-6 sm:py-7"
        aria-labelledby="site-disclaimer"
      >
        <Container className="text-center">
          <h3 id="site-disclaimer" className="mb-2 text-sm font-semibold text-slate-900">
            Disclaimer
          </h3>
          <p className="mx-auto w-full text-xs leading-snug text-slate-800 sm:text-sm sm:leading-normal">
            The content on this website—including text, graphics, PDFs, images, and videos—is for informational purposes only
            and does not constitute professional advice, diagnosis, or treatment. We do not claim to diagnose, treat, cure, or
            prevent any disease or condition. Always seek the advice of a qualified professional regarding questions about your
            health. Never disregard professional advice or delay seeking it because of something you read here. If you think you
            may be experiencing an emergency, call your local emergency number immediately.
          </p>
        </Container>
      </section>
    </footer>
  )
}
