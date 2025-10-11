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

  // close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // header elevation on scroll
  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close on Esc
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/70',
        'border-b border-lavender-400/30',
        // subtle top gradient hairline
        'relative before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-lavender-500/40 before:to-transparent',
        elevated && 'shadow-soft'
      )}
    >
      {/* Skip link for a11y */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-pill focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow-soft"
      >
        Skip to content
      </a>

      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Upgrade Wellness home" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Upgrade Wellness" width={128} height={32} priority />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  'relative rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500',
                  // underline micro-interaction
                  'after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-lavender-500 after:transition-transform after:duration-200 after:content-[""]',
                  active
                    ? 'text-slate-900 bg-lavender-400/30 after:scale-x-100'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100 hover:after:scale-x-100'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA — lavender/purple */}
        <div className="hidden md:block">
          <Link
            href="/contact/"
            className={clsx(
              'inline-flex items-center justify-center rounded-pill px-4 py-2 text-sm font-semibold text-white',
              'bg-lavender-600 hover:bg-lavender-500',
              'shadow-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500'
            )}
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500 md:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden>
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
        id="mobile-menu"
        className={clsx(
          'md:hidden border-t border-lavender-400/30 bg-white/95 transition-all duration-200 overflow-hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <Container className={clsx('py-3', open ? 'block' : 'hidden')}>
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'relative rounded-lg px-3 py-2 text-base transition-colors',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500',
                    'after:absolute after:left-3 after:right-3 after:-bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:bg-lavender-500 after:transition-transform after:duration-200 after:content-[""]',
                    active
                      ? 'bg-lavender-400/30 text-slate-900 after:scale-x-100'
                      : 'text-slate-700 hover:bg-slate-100 hover:after:scale-x-100'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Link
              href="/contact/"
              className={clsx(
                'mt-2 inline-flex w-full items-center justify-center rounded-pill px-4 py-2 text-sm font-semibold text-white',
                'bg-lavender-600 hover:bg-lavender-500',
                'shadow-soft transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-lavender-500'
              )}
            >
              Contact Us
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
