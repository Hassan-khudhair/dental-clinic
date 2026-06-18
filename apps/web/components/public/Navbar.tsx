'use client';

import { useState } from 'react';

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'احجز موعد', href: '#booking' },
  { label: 'تواصل معنا', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-teal/20 bg-teal/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#hero" className="flex items-center gap-2">
          <span className="text-2xl">🦷</span>
          <div>
            <p className="text-sm font-bold leading-none text-white">د. حيدر</p>
            <p className="text-xs text-teal-light">متخصص علاج الجذور</p>
          </div>
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white/80 transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#booking"
          className="hidden rounded-lg bg-gold px-5 py-2 text-sm font-bold text-white transition-colors hover:bg-gold-light md:block"
        >
          احجز موعد
        </a>

        <button
          className="flex md:hidden items-center justify-center text-white"
          onClick={() => setOpen(!open)}
          aria-label="قائمة التنقل"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-teal-light/20 bg-teal px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-semibold text-white/80 hover:text-gold"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </nav>
  );
}
