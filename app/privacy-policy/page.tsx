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
    <Container className="py-12 md:py-16">
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        {/* Sticky in-page nav on large screens */}
        <nav
          aria-label="On this page"
          className="hidden lg:block lg:sticky lg:top-24 self-start"
        >
          <div className="rounded-2xl border border-slate-200/70 bg-white/70 p-4 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              On this page
            </p>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
              <li><a href="#who-we-are" className="hover:underline">1) Who We Are & Scope</a></li>
              <li><a href="#info-we-collect" className="hover:underline">2) Information We Collect</a></li>
              <li><a href="#sensitive-info" className="hover:underline">3) Sensitive & Health Info</a></li>
              <li><a href="#why-we-use" className="hover:underline">4) Why We Use Your Information</a></li>
              <li><a href="#cookies" className="hover:underline">5) Cookies & Tracking</a></li>
              <li><a href="#payments" className="hover:underline">6) Payments</a></li>
              <li><a href="#sharing" className="hover:underline">7) How We Share Information</a></li>
              <li><a href="#hosting" className="hover:underline">8) Data Hosting & Transfers</a></li>
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
        <article className="prose prose-slate max-w-none prose-headings:scroll-mt-24 dark:prose-invert">
          <header className="not-prose">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Privacy &amp; Data Protection Policy</h1>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-medium">Effective date:</span>{' '}
              <time dateTime="2025-10-11">October 11, 2025</time>
            </p>

            {/* Important callout */}
            <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
              <p className="text-sm">
                <strong>Important:</strong> This Policy is intended to be clear and practical, but it is not legal
                advice. Depending on your location and how you use our Services, additional notices or terms may apply.
              </p>
            </div>

            {/* Quick summary card */}
            <details className="mt-4 group rounded-xl border border-emerald-200 bg-emerald-50 p-4 open:bg-emerald-50/70">
              <summary className="cursor-pointer text-sm font-semibold text-emerald-900">
                Quick summary (tap to expand)
              </summary>
              <ul className="mt-2 list-disc pl-5 text-sm text-emerald-900">
                <li>We collect information you provide, information collected automatically, and information from third parties.</li>
                <li>We use your information to provide Services, support you, process payments, improve our offerings, and comply with law.</li>
                <li>We share information with service providers and others only as necessary and do not sell your personal information.</li>
                <li>You have choices and, depending on your location, legal rights over your information.</li>
                <li>Contact us to exercise your rights or ask questions.</li>
              </ul>
            </details>
          </header>

          <hr className="my-6" />

          <section id="who-we-are">
            <h2>1) Who We Are &amp; Scope</h2>
            <p>
              Upgrade Wellness Center Puerto Rico ("Upgrade Wellness Center PR," "we," "us," or "our") respects your
              privacy. This Privacy &amp; Data Protection Policy explains what personal information we collect when you
              use our website, products, and services (collectively, the "Services"), how we use and share it, and the
              choices and rights available to you.
            </p>
            <p>
              This Policy applies to Upgrade Wellness Center Puerto Rico as the data controller for personal
              information processed through our website and any related online properties we operate. It also applies to
              information we process in connection with appointments, workshops, events, purchases, and customer support.
            </p>
            <p>
              Our Services are primarily directed to individuals located in Puerto Rico and the United States. If you
              are located in the European Economic Area (EEA), the United Kingdom (UK), or other jurisdictions with
              specific privacy laws, see the <a href="#rights">Your Privacy Rights</a> section below for additional
              information.
            </p>
          </section>

          <section id="info-we-collect">
            <h2>2) Information We Collect</h2>
            <p>We collect information in three main ways: (A) you provide it to us, (B) we collect it automatically, and (C) we receive it from third parties.</p>
            <h3 id="collect-a">A. Information You Provide</h3>
            <ul>
              <li><strong>Contact details</strong> (e.g., name, email address, phone number, billing/shipping address).</li>
              <li><strong>Account and profile information</strong> (e.g., username, password, preferences).</li>
              <li><strong>Appointment and service details</strong> (e.g., selected services, dates, notes you choose to share with us).</li>
              <li><strong>Communications</strong> (e.g., inquiries, survey responses, reviews, testimonials, and other messages you send us).</li>
              <li><strong>Payment-related information</strong> (e.g., transaction amount, date, last four digits of payment card; <em>we do not store full payment card numbers</em>—see <a href="#payments">Payments</a>).</li>
              <li><strong>Wellness/health-related details you choose to provide</strong> in connection with our Services. We treat such information as sensitive and protect it accordingly. (See <a href="#sensitive-info">Sensitive Information &amp; Health Information</a>.)</li>
            </ul>

            <h3 id="collect-b">B. Information Collected Automatically</h3>
            <ul>
              <li><strong>Device and usage data</strong> (e.g., IP address, device type, operating system, browser type, referring/exit pages, pages viewed, links clicked, approximate location based on IP, and timestamps).</li>
              <li><strong>Session metrics</strong> (e.g., page response times, download errors, length of visits, and page interaction information).</li>
              <li><strong>Cookies and similar technologies</strong> that help us operate and improve the Services, remember your preferences, and perform analytics and advertising (see <a href="#cookies">Cookies &amp; Tracking</a>).</li>
            </ul>

            <h3 id="collect-c">C. Information from Third Parties</h3>
            <ul>
              <li><strong>Payment processors</strong> (confirmation of payment status—no full card numbers).</li>
              <li><strong>Appointment/booking platforms</strong> we use to schedule services.</li>
              <li><strong>Marketing and analytics providers</strong> that help us understand and improve our Services.</li>
              <li><strong>Social media platforms</strong> if you interact with us there (subject to the platform’s terms and your settings).</li>
            </ul>
            <p><strong>Do not provide information you are not comfortable sharing.</strong> If you submit information about others, you must have the legal right to do so.</p>
          </section>

          <section id="sensitive-info">
            <h2>3) Sensitive Information &amp; Health Information</h2>
            <p>
              We are a wellness center and may receive wellness-related details that you choose to share (for example,
              goals, preferences, or relevant history). We handle such information with heightened care and restrict
              access to personnel who need it for Service delivery. <strong>We are not a medical clinic</strong> and,
              unless otherwise expressly stated, we are <strong>not a HIPAA-covered entity</strong>. If we act as a
              business associate to a covered entity, we will comply with applicable obligations under a Business
              Associate Agreement.
            </p>
          </section>

          <section id="why-we-use">
            <h2>4) Why We Use Your Information</h2>
            <ul>
              <li><strong>Provide and operate the Services</strong>, including scheduling, delivering, and personalizing services;</li>
              <li><strong>Customer support</strong>, including responding to inquiries and resolving issues;</li>
              <li><strong>Payments and order fulfillment</strong>;</li>
              <li><strong>Communications</strong>, including service-related notices, policy updates, and—with your consent where required—marketing messages;</li>
              <li><strong>Safety, security, and fraud prevention</strong>, including protecting the Services and our users;</li>
              <li><strong>Analytics and service improvement</strong>, including aggregated statistics to improve our offerings;</li>
              <li><strong>Legal compliance</strong>, including tax, accounting, and responding to lawful requests.</li>
            </ul>
            <h3>Legal Bases (for EEA/UK users)</h3>
            <p>
              Where GDPR/UK GDPR applies, we rely on one or more of the following legal bases: <strong>contract</strong> (to provide the Services you request), <strong>consent</strong> (for certain marketing/optional cookies), <strong>legitimate interests</strong> (to secure, improve, and market our Services in ways that are not overridden by your interests or rights), and <strong>legal obligations</strong>.
            </p>
          </section>

          <section id="cookies">
            <h2>5) Cookies &amp; Tracking</h2>
            <p>We use cookies, pixels, and similar technologies:</p>
            <ul>
              <li><strong>Essential cookies</strong> to run the site and keep you signed in;</li>
              <li><strong>Analytics cookies</strong> to understand use and improve performance;</li>
              <li><strong>Marketing cookies</strong> (where used) to measure campaigns and offer relevant content.</li>
            </ul>
            <p>
              <strong>Your choices:</strong> Most browsers let you block or delete cookies. Some features may not work
              without essential cookies. Where required by law, we request your consent before setting non-essential
              cookies.
            </p>
          </section>

          <section id="payments">
            <h2>6) Payments</h2>
            <p>
              We use trusted <strong>third-party payment processors</strong> (e.g., WordPress.com/Automattic payments,
              Stripe, PayPal, or similar) to process payments. These providers collect your payment card details directly
              and <strong>we do not store full card numbers</strong>. Payment processors are responsible for securing
              card data and for compliance with applicable card network rules (e.g., PCI DSS).
            </p>
          </section>

          <section id="sharing">
            <h2>7) How We Share Information</h2>
            <p>We do <strong>not</strong> sell or rent your personal information. We share information only with:</p>
            <ul>
              <li><strong>Service providers</strong> that host, support, and operate the Services (e.g., website hosting, appointment systems, analytics, email delivery, payment processing). These providers may access information only to perform services for us and must protect it.</li>
              <li><strong>Professional advisors</strong> (e.g., lawyers, accountants) under confidentiality obligations.</li>
              <li><strong>Legal, safety, and compliance</strong> purposes (e.g., to comply with law, enforce terms, protect rights and security, or respond to lawful requests).</li>
              <li><strong>Business transfers</strong> (e.g., financing, merger, acquisition, or sale of assets), subject to appropriate safeguards.</li>
            </ul>
          </section>

          <section id="hosting">
            <h2>8) Data Hosting &amp; International Transfers</h2>
            <p>
              Our website is hosted on <strong>WordPress.com</strong> (Automattic) or similar providers, and information
              may be stored on servers located in the United States or other countries. When transferring personal
              information internationally, we use appropriate safeguards permitted by applicable law (for example,
              Standard Contractual Clauses where required).
            </p>
          </section>

          <section id="retention">
            <h2>9) Data Retention</h2>
            <p>
              We retain personal information for as long as needed to provide the Services, comply with legal
              obligations, resolve disputes, and enforce agreements. When retention is no longer necessary, we will
              delete or de-identify information in accordance with our data retention practices.
            </p>
          </section>

          <section id="security">
            <h2>10) Security</h2>
            <p>
              We implement administrative, technical, and physical safeguards designed to protect personal information
              against unauthorized access, disclosure, alteration, or loss. However, <strong>no method of transmission
              or storage is 100% secure</strong>, and we cannot guarantee absolute security.
            </p>
          </section>

          <section id="rights">
            <h2>11) Your Privacy Rights &amp; Choices</h2>
            <h3>General Choices</h3>
            <ul>
              <li><strong>Marketing communications:</strong> You can opt out of marketing emails by following the unsubscribe link in the message. We may still send you service-related communications.</li>
              <li><strong>Access, correction, deletion:</strong> You may request access to, correction of, or deletion of your personal information, subject to applicable law.</li>
              <li><strong>Cookies/Tracking:</strong> See <a href="#cookies">Cookies &amp; Tracking</a> for browser-level choices.</li>
            </ul>

            <h3>EEA/UK (GDPR/UK GDPR)</h3>
            <p>
              If you are in the EEA or UK, you may have rights to: access; rectify; erase; restrict or object to
              processing; and data portability. Where processing is based on consent, you may withdraw consent at any
              time (this does not affect prior processing). You also have the right to lodge a complaint with your local
              supervisory authority.
            </p>

            <h3>California (CCPA/CPRA)</h3>
            <p>
              If you are a California resident, you may have rights to: know/access specific pieces and categories of
              personal information, correct inaccuracies, delete information, and opt out of certain data “sales” or
              “sharing” (as defined by law). We do not knowingly sell personal information. We will honor verifiable
              requests consistent with applicable law.
            </p>

            <h3>Puerto Rico Residents</h3>
            <p>
              We follow applicable Puerto Rico and U.S. laws regarding privacy and security. In the event of a data
              breach affecting Puerto Rico residents, we will provide notices in accordance with applicable
              breach-notification requirements.
            </p>
            <p>To exercise rights, contact us using the details in <a href="#contact">Contact Us</a>. We may need to verify your identity and location before responding.</p>
          </section>

          <section id="children">
            <h2>12) Children’s Privacy</h2>
            <p>
              Our Services are not directed to children under 13, and we do not knowingly collect personal information
              from them. If you believe a child has provided personal information, please contact us so we can take
              appropriate action.
            </p>
          </section>

          <section id="third-party">
            <h2>13) Third-Party Links &amp; Features</h2>
            <p>
              The Services may link to third-party websites, apps, or features. We are not responsible for the privacy
              practices of those third parties. Review their policies to understand how they handle your information.
            </p>
          </section>

          <section id="changes">
            <h2>14) Changes to This Policy</h2>
            <p>
              We may update this Policy from time to time. The updated version will be indicated by an updated
              “Effective date” and will be effective when posted. If we make material changes, we will take additional
              steps to notify you as required by law (e.g., by posting a notice or sending an email).
            </p>
          </section>

          <section id="contact">
            <h2>15) Contact Us</h2>
            <p>If you have questions, concerns, or requests about this Policy or our data practices, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:privacy@upgradewellnesspr.com">privacy@upgradewellnesspr.com</a> <em>(replace with your official email if different)</em></li>
              <li><strong>Postal Mail:</strong> Upgrade Wellness Center Puerto Rico, [Insert mailing address], Puerto Rico, USA <em>(replace with your official address)</em></li>
            </ul>
          </section>

          <section id="additional">
            <h2>16) Additional Notices</h2>
            <ul>
              <li><strong>GDPR Notice:</strong> Where we rely on consent for processing, you may withdraw consent at any time. Where we rely on legitimate interests, you may object to processing for direct marketing at any time.</li>
              <li><strong>Do Not Track:</strong> Our Services do not currently respond to browser “Do Not Track” signals.</li>
            </ul>
          </section>

          <section id="summary">
            <h2>Summary of Key Points</h2>
            <ul>
              <li>We collect information you provide, information collected automatically, and information from third parties.</li>
              <li>We use your information to provide Services, support you, process payments, improve our offerings, and comply with law.</li>
              <li>We share information with service providers and others only as necessary and do not sell your personal information.</li>
              <li>You have choices and, depending on your location, legal rights over your information.</li>
              <li>Contact us to exercise your rights or ask questions.</li>
            </ul>
          </section>

          <div className="mt-10">
            <a href="#top" className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-600">
              ↑ Back to top
            </a>
          </div>
        </article>
      </div>
    </Container>
  );
}

