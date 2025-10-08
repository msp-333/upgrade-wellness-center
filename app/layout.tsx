import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

const siteName = 'Upgrade Wellness Center';
const siteDescription = 'Calm spaces, caring guidance, and practical options to recharge your wellness.';

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: '%s · ' + siteName,
  },
  description: siteDescription,
  openGraph: {
    title: siteName,
    description: siteDescription,
    type: 'website',
  },
  icons: {
    icon: '/logo.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
