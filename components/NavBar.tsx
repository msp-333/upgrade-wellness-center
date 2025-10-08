'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from './Container';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About Us' },
  { href: '/services/', label: 'Services' },
  { href: '/faqs/', label: 'FAQs' },
];

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 border-b border-lavender-400/40 bg-white/75 backdrop-blur supports-[backdrop-filter]:bg-white/75',
        elevated && 'shadow-soft'
      )}
    >
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Upgrade Wellness home" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Upgrade Wellness" width={128} height={32} priority />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500',
                  active
                    // Soft lavender pill highlight (no underline)
                    ? 'text-slate-900 bg-lavender-400/30'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA — lavender button that pops */}
        <div className="hidden md:block">
          <Link
            href="/contact/"
            className="btn btn-accent shadow-soft hover:shadow-lg"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500"
          onClick={() => setOpen((o) => !o)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M3 6h18" />
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M3 12h18" />
                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" d="M3 18h18" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile drawer */}
      <div
        className={clsx(
          'md:hidden border-t border-lavender-400/40 bg-white/95 transition-all duration-150 overflow-hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <Container className={clsx('py-3', open ? 'block' : 'hidden')}>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'rounded-lg px-3 py-2 text-base',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500',
                    active ? 'bg-lavender-400/30 text-slate-900' : 'text-slate-700 hover:bg-slate-100'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/contact/"
              className="btn btn-accent mt-2 w-full shadow-soft hover:shadow-lg"
            >
              Contact Us
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
