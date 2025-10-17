// app/privacy/page.tsx
import Container from '@/components/Container';

export const metadata = {
  title: 'Privacy & Data Protection Policy | Upgrade Wellness Center PR',
  description:
    'How Upgrade Wellness Center Puerto Rico collects, uses, and protects your information — plus your choices and rights.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy & Data Protection Policy',
    description:
      'How Upgrade Wellness Center Puerto Rico collects, uses, and protects your information — plus your choices and rights.',
    type: 'article',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'PrivacyPolicy',
  name: 'Privacy & Data Protection Policy',
  inLanguage: 'en',
  datePublished: '2025-10-11',
  dateModified: '2025-10-11',
  publisher: {
    '@type': 'Organization',
    name: 'Upgrade Wellness Center Puerto Rico',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <Container id="top" className="py-14 md:py-20">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Page header / hero */}
      <header className="mb-8 rounded-2xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-white px-5 py-6 shadow-sm md:mb-10 md:px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Privacy &amp; Data Protection Policy
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium">Effective date:</span>{' '}
              <time dateTime="2025-10-11">October 11, 2025</time>
            </p>
          </div>
          <span
            aria-hidden
            className="hidden h-10 w-10 shrink-0 rounded-xl border border-emerald-200/70 bg-white/80 shadow-sm md:grid place-items-center"
            title="Privacy"
          >
            🔒
          </span>
        </div>

        {/* Quick summary collapsible */}
        <details className="group mt-5 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-4 open:bg-emerald-50">
          <summary className="cursor-pointer select-none text-sm font-semibold text-emerald-900">
            Quick summary (tap to expand)
          </summary>
          <ul className="mt-2 list-disc pl-5 text-sm text-emerald-900">
            <li>We collect information you provide, automatic data, and info from third parties.</li>
            <li>We use it to operate our Services, support you, process payments, improve, and comply with law.</li>
            <li>We share only as needed (service providers, legal, safety); we don’t sell personal information.</li>
            <li>You have choices and legal rights depending on your location.</li>
            <li>Contact us to exercise rights or ask questions.</li>
          </ul>
        </details>

        {/* Important callout */}
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
          <p className="text-sm">
            <strong>Important:</strong> This Policy is intended to be clear and practical, but it is not legal advice.
            Depending on your location and how you use our Services, additional notices or terms may apply.
          </p>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[18rem_minmax(0,1fr)]">
        {/* Sticky in-page nav on large screens */}
        <nav
          aria-label="On this page"
          className="hidden self-start lg:sticky lg:top-24 lg:block print:hidden"
        >
          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              On this page
            </p>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li><a href="#who-we-are" className="hover:underline">1) Who We Are &amp; Scope</a></li>
              <li><a href="#info-we-collect" className="hover:underline">2) Information We Collect</a></li>
              <li><a href="#sensitive-info" className="hover:underline">3) Sensitive &amp; Health Info</a></li>
              <li><a href="#why-we-use" className="hover:underline">4) Why We Use Your Information</a></li>
              <li><a href="#cookies" className="hover:underline">5) Cookies &amp; Tracking</a></li>
              <li><a href="#payments" className="hover:underline">6) Payments</a></li>
              <li><a href="#sharing" className="hover:underline">7) How We Share Information</a></li>
              <li><a href="#hosting" className="hover:underline">8) Data Hosting &amp; Transfers</a></li>
              <li><a href="#retention" className="hover:underline">9) Data Retention</a></li>
              <li><a href="#security" className="hover:underline">10) Security</a></li>
              <li><a href="#rights" className="hover:underline">11) Your Privacy Rights</a></li>
              <li><a href="#children" className="hover:underline">12) Children’s Privacy</a></li>
              <li><a href="#third-party" className="hover:underline">13) Third-Party Links</a></li>
              <li><a href="#changes" className="hover:underline">14) Changes to This Policy</a></li>
              <li><a href="#contact" className="hover:underline">15) Contact Us</a></li>
              <li><a href="#additional" className="hover:underline">16) Additional Notices</a></li>
              <li><a href="#summary" className="hover:underline">Summary of Key Points</a></li>
            </ol>
          </div>
        </nav>

        {/* Main content */}
        {/* prose: tighter line-length, consistent vertical rhythm, nice heading offsets */}
        <article className="prose prose-slate max-w-none prose-headings:scroll-mt-28 prose-h2:mt-12 prose-h2:mb-3 prose-h3:mt-6 prose-h3:mb-2 prose-p:leading-relaxed prose-li:leading-relaxed dark:prose-invert print:prose-lg">
          {/* Divider before content for visual separation on desktop */}
          <hr className="my-0 hidden lg:block border-transparent" />

          <section id="who-we-are" className="scroll-mt-28">
            <h2>1) Who We Are &amp; Scope</h2>
            <p>
              Upgrade Wellness Center Puerto Rico (“Upgrade Wellness Center PR,” “we,” “us,” or “our”) respects your
              privacy. This Privacy &amp; Data Protection Policy explains what personal information we collect when you
              use our website, products, and services (collectively, the “Services”), how we use and share it, and the
              choices and rights available to you.
            </p>
            <p>
              This Policy applies to Upgrade Wellness Center Puerto Rico as the data controller for personal information
              processed through our website and any related online properties we operate. It also applies to information
              we process in connection with appointments, workshops, events, purchases, and customer support.
            </p>
            <p>
              Our Services are primarily directed to individuals located in Puerto Rico and the United States. If you
              are located in the European Economic Area (EEA), the United Kingdom (UK), or other jurisdictions with
              specific privacy laws, see the <a href="#rights">Your Privacy Rights</a> section below for additional info.
            </p>
          </section>

          <section id="info-we-collect" className="scroll-mt-28">
            <h2>2) Information We Collect</h2>
            <p>We collect information in three main ways: (A) you provide it to us, (B) we collect it automatically, and (C) we receive it from third parties.</p>
            <h3 id="collect-a">A. Information You Provide</h3>
            <ul>
              <li><strong>Contact details</strong> (e.g., name, email, phone, billing/shipping address).</li>
              <li><strong>Account and profile information</strong> (e.g., username, password, preferences).</li>
              <li><strong>Appointment and service details</strong> (e.g., selected services, dates, notes you add).</li>
              <li><strong>Communications</strong> (e.g., inquiries, survey responses, reviews, testimonials).</li>
              <li><strong>Payment-related information</strong> (amount, date, last four digits; <em>we don’t store full card numbers</em> — see <a href="#payments">Payments</a>).</li>
              <li><strong>Wellness/health-related details you choose to provide</strong> (see <a href="#sensitive-info">Sensitive Information</a>).</li>
            </ul>

            <h3 id="collect-b">B. Information Collected Automatically</h3>
            <ul>
              <li><strong>Device and usage</strong> (IP, device, OS, browser, referrer, pages, clicks, approximate location, timestamps).</li>
              <li><strong>Session metrics</strong> (response times, errors, visit length, interactions).</li>
              <li><strong>Cookies &amp; similar tech</strong> to operate, remember preferences, analytics/ads (see <a href="#cookies">Cookies</a>).</li>
            </ul>

            <h3 id="collect-c">C. Information from Third Parties</h3>
            <ul>
              <li><strong>Payment processors</strong> (status confirmations — never full card numbers).</li>
              <li><strong>Booking platforms</strong> used to schedule services.</li>
              <li><strong>Marketing/analytics providers</strong> to help improve the Services.</li>
              <li><strong>Social media platforms</strong> if you interact with us there.</li>
            </ul>
            <p><strong>Only share what you’re comfortable with.</strong> If you submit info about others, you must have the legal right to do so.</p>
          </section>

          <section id="sensitive-info" className="scroll-mt-28">
            <h2>3) Sensitive Information &amp; Health Information</h2>
            <p>
              We are a wellness center and may receive wellness-related details you choose to share (e.g., goals,
              preferences, relevant history). We handle such information with heightened care and restrict access to
              personnel who need it for Service delivery. <strong>We are not a medical clinic</strong> and, unless
              otherwise stated, <strong>not a HIPAA-covered entity</strong>. If we act as a business associate to a
              covered entity, we will comply with applicable obligations under a Business Associate Agreement.
            </p>
          </section>

          <section id="why-we-use" className="scroll-mt-28">
            <h2>4) Why We Use Your Information</h2>
            <ul className="space-y-1">
              <li><strong>Provide and operate</strong> the Services (scheduling, delivery, personalization).</li>
              <li><strong>Customer support</strong> and resolving issues.</li>
              <li><strong>Payments</strong> and order fulfillment.</li>
              <li><strong>Communications</strong> (service notices, policy updates, and — with consent where required — marketing).</li>
              <li><strong>Safety, security, fraud prevention</strong>.</li>
              <li><strong>Analytics &amp; improvement</strong> (aggregated statistics).</li>
              <li><strong>Legal compliance</strong> (tax, accounting, lawful requests).</li>
            </ul>
            <h3>Legal Bases (for EEA/UK users)</h3>
            <p>
              Where GDPR/UK GDPR applies, we rely on: <strong>contract</strong>, <strong>consent</strong> (for certain
              marketing/optional cookies), <strong>legitimate interests</strong> (security, improvement, marketing that
              isn’t overridden by your rights), and <strong>legal obligations</strong>.
            </p>
          </section>

          <section id="cookies" className="scroll-mt-28">
            <h2>5) Cookies &amp; Tracking</h2>
            <p>We use cookies, pixels, and similar technologies:</p>
            <ul>
              <li><strong>Essential</strong> — run the site, keep sessions.</li>
              <li><strong>Analytics</strong> — understand usage, improve performance.</li>
              <li><strong>Marketing</strong> — measure campaigns, offer relevant content.</li>
            </ul>
            <p>
              <strong>Your choices:</strong> Most browsers let you block/delete cookies. Some features need essentials.
              Where required by law, we ask consent before non-essential cookies.
            </p>
          </section>

          <section id="payments" className="scroll-mt-28">
            <h2>6) Payments</h2>
            <p>
              We use trusted <strong>third-party payment processors</strong> (e.g., WordPress.com/Automattic payments,
              Stripe, PayPal, or similar). They collect your card details directly; <strong>we do not store full card
              numbers</strong>. They are responsible for card security and compliance (e.g., PCI DSS).
            </p>
          </section>

          <section id="sharing" className="scroll-mt-28">
            <h2>7) How We Share Information</h2>
            <p>We do <strong>not</strong> sell or rent personal information. We share only with:</p>
            <ul>
              <li><strong>Service providers</strong> (hosting, booking, analytics, email, payments) under strict duties.</li>
              <li><strong>Professional advisors</strong> (lawyers, accountants) under confidentiality.</li>
              <li><strong>Legal/safety</strong> (comply with law, enforce terms, protect rights/security).</li>
              <li><strong>Business transfers</strong> (financing, merger, acquisition, sale) with safeguards.</li>
            </ul>
          </section>

          <section id="hosting" className="scroll-mt-28">
            <h2>8) Data Hosting &amp; International Transfers</h2>
            <p>
              Our site may be hosted on <strong>WordPress.com</strong> (Automattic) or similar; data may be stored in
              the United States or other countries. For international transfers, we use legally permitted safeguards
              (e.g., Standard Contractual Clauses where required).
            </p>
          </section>

          <section id="retention" className="scroll-mt-28">
            <h2>9) Data Retention</h2>
            <p>
              We keep personal information as long as needed to provide Services, meet legal obligations, resolve
              disputes, and enforce agreements. When no longer needed, we delete or de-identify it per our practices.
            </p>
          </section>

          <section id="security" className="scroll-mt-28">
            <h2>10) Security</h2>
            <p>
              We implement administrative, technical, and physical safeguards to protect personal information. However,
              <strong> no method of transmission or storage is 100% secure</strong>, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section id="rights" className="scroll-mt-28">
            <h2>11) Your Privacy Rights &amp; Choices</h2>
            <h3>General Choices</h3>
            <ul>
              <li><strong>Marketing emails:</strong> use the unsubscribe link; we may still send service emails.</li>
              <li><strong>Access/correction/deletion:</strong> you can request these, subject to law.</li>
              <li><strong>Cookies:</strong> see <a href="#cookies">Cookies &amp; Tracking</a> for browser options.</li>
            </ul>

            <h3>EEA/UK (GDPR/UK GDPR)</h3>
            <p>
              You may have rights to access, rectify, erase, restrict/object, and data portability. If based on consent,
              you can withdraw it anytime (doesn’t affect prior processing). You can also complain to your authority.
            </p>

            <h3>California (CCPA/CPRA)</h3>
            <p>
              You may have rights to know/access, correct, delete, and opt out of certain “sales”/“sharing.” We do not
              knowingly sell personal information. We honor verifiable requests per law.
            </p>

            <h3>Puerto Rico Residents</h3>
            <p>
              We follow applicable Puerto Rico and U.S. privacy/security laws. If a breach affects Puerto Rico
              residents, we’ll notify consistent with applicable requirements.
            </p>
            <p>To exercise rights, contact us (see <a href="#contact">Contact Us</a>). We may verify identity/location.</p>
          </section>

          <section id="children" className="scroll-mt-28">
            <h2>12) Children’s Privacy</h2>
            <p>
              Our Services are not directed to children under 13, and we do not knowingly collect personal information
              from them. If you believe a child provided personal information, contact us so we can act.
            </p>
          </section>

          <section id="third-party" className="scroll-mt-28">
            <h2>13) Third-Party Links &amp; Features</h2>
            <p>
              The Services may link to third-party websites, apps, or features. We are not responsible for their
              privacy practices. Review their policies to understand how they handle your information.
            </p>
          </section>

          <section id="changes" className="scroll-mt-28">
            <h2>14) Changes to This Policy</h2>
            <p>
              We may update this Policy. The updated version will be indicated by an updated “Effective date” and is
              effective when posted. If we make material changes, we’ll take additional steps as required by law.
            </p>
          </section>

          <section id="contact" className="scroll-mt-28">
            <h2>15) Contact Us</h2>
            <p>If you have questions, concerns, or requests about this Policy or our data practices, contact us:</p>
            <ul>
              <li>
                <strong>Email:</strong>{' '}
                <a href="mailto:privacy@upgradewellnesspr.com">privacy@upgradewellnesspr.com</a>{' '}
                <em>(replace with your official email if different)</em>
              </li>
              <li>
                <strong>Postal Mail:</strong> Upgrade Wellness Center Puerto Rico, [Insert mailing address], Puerto
                Rico, USA <em>(replace with your official address)</em>
              </li>
            </ul>
          </section>

          <section id="additional" className="scroll-mt-28">
            <h2>16) Additional Notices</h2>
            <ul>
              <li><strong>GDPR Notice:</strong> Where we rely on consent, you may withdraw anytime. For legitimate interests, you may object to direct marketing.</li>
              <li><strong>Do Not Track:</strong> Our Services don’t currently respond to DNT signals.</li>
            </ul>
          </section>

          <section id="summary" className="scroll-mt-28">
            <h2>Summary of Key Points</h2>
            <ul>
              <li>We collect info you provide, automatic data, and third-party info.</li>
              <li>We use it to operate Services, support you, process payments, improve, and comply with law.</li>
              <li>We share only as necessary; we don’t sell personal information.</li>
              <li>You have choices and legal rights depending on location.</li>
              <li>Contact us to exercise rights or ask questions.</li>
            </ul>
          </section>

          {/* Footer actions */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#top"
              className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              ↑ Back to top
            </a>
            <a
              href="#contact"
              className="inline-flex items-center rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              Contact privacy team
            </a>
          </div>
        </article>
      </div>
    </Container>
  );
}
