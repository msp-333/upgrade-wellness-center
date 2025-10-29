'use client';

import Link from 'next/link';
import Container from './Container';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import clsx from 'clsx';

const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About Us' },
  { href: '/services/', label: 'Services' },
  { href: '/pricing/', label: 'Pricing' },
  { href: '/faqs/', label: 'FAQs' },
];

// Larger type, no shadow, neutral focus ring
const CTA_BTN =
  'inline-flex items-center justify-center rounded-pill px-5 md:px-6 py-2.5 md:py-3 text-base md:text-lg font-semibold text-white ' +
  'bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-500 hover:to-cyan-400 ' +
  'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 active:scale-[.98]';

export default function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}${p}`;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  const normPath =
    base && pathname.startsWith(base) ? pathname.slice(base.length) || '/' : pathname;

  useEffect(() => setOpen(false), [normPath]);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? normPath === '/' : normPath.startsWith(href);

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80',
        'border-b border-slate-200',
        elevated && 'shadow-soft'
      )}
    >
      {/* Skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-pill focus:bg-white focus:px-3 focus:py-2 focus:text-sm focus:shadow-soft"
      >
        Skip to content
      </a>

      <Container
        className={clsx(
          'flex items-center justify-between transition-[min-height] duration-300',
          elevated ? 'min-h-[72px] md:min-h-[84px]' : 'min-h-[88px] md:min-h-[104px]'
        )}
      >
        {/* Logo (drives scale for nav + CTA) */}
        <Link href="/" aria-label="Upgrade Wellness home" className="flex items-center gap-2">
          <img
            src={asset('/images/logo.png')}
            alt="Upgrade Wellness"
            width={240}
            height={90}
            className={clsx(
              'w-auto transition-[height] duration-300 ease-out will-change-[height]',
              elevated ? 'h-12 md:h-14' : 'h-[60px] md:h-16'
            )}
            loading="eager"
            fetchPriority="high"
          />
        </Link>

        {/* Desktop nav — underline highlight, no pill */}
        <nav aria-label="Primary" className="hidden items-stretch md:flex">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={clsx(
                  // layout
                  'relative inline-flex items-center px-3 md:px-4',
                  // height and typography
                  'h-12 md:h-14 text-base md:text-lg font-medium',
                  // colors
                  active ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900',
                  // underline indicator (bottom border)
                  'border-b-2',
                  active ? 'border-slate-900' : 'border-transparent hover:border-slate-300',
                  // a11y focus
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded-sm'
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop CTA (no shadow) */}
        <div className="hidden md:block">
          <Link href="/contact/" className={CTA_BTN}>
            Contact Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 md:hidden"
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
          'md:hidden border-t border-slate-200 bg-white/95 transition-all duration-200 overflow-hidden',
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <Container className={clsx('py-3', open ? 'block' : 'hidden')}>
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center justify-between px-2 py-3 text-lg',
                    active ? 'text-slate-900' : 'text-slate-700 hover:text-slate-900',
                    'border-b border-slate-200 last:border-0'
                  )}
                >
                  {item.label}
                  {active && <span className="ml-3 h-1 w-10 shrink-0 rounded bg-slate-900" />}
                </Link>
              );
            })}

            {/* Mobile CTA (no shadow) */}
            <Link href="/contact/" className={clsx('mt-3 w-full', CTA_BTN)}>
              Contact Us
            </Link>
          </nav>
        </Container>
      </div>
    </header>
  );
}
