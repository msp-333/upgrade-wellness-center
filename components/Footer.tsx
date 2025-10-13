// components/Footer.tsx
import Link from 'next/link'
import Container from '@/components/Container'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-white py-12" aria-labelledby="footer">
      <Container className="grid gap-10 md:grid-cols-4">
        <h2 id="footer" className="sr-only">Site footer</h2>

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-full bg-emerald-600" aria-hidden />
            <span className="font-semibold text-slate-900">Upgrade Wellness</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">
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
            <li><Link className="hover:underline" href="/privacy-policy/">Privacy</Link></li>
          </ul>
        </nav>

        {/* Visit */}
        <div className="text-sm">
          <h3 className="mb-3 font-semibold text-slate-900">Visit</h3>
          <p className="text-slate-600">
            123 Oak Street, Suite 204<br />City, ST 12345
          </p>
          <p className="mt-2 text-slate-600">
            <a className="hover:underline" href="tel:+11234567890">(123) 456-7890</a>
          </p>
          <p className="mt-1 text-slate-600">
            <a className="hover:underline" href="mailto:hello@upgradewellness.com">
              hello@upgradewellness.com
            </a>
          </p>
        </div>

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
        </form>
      </Container>

      <Container>
        <p className="mt-10 text-xs text-slate-500">
          © {year} Upgrade Wellness Center. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
