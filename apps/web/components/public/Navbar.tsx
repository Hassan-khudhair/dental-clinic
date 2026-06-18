'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { label: 'الرئيسية', href: '#hero' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'احجز موعد', href: '#booking' },
  { label: 'تواصل معنا', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/8 bg-clinic-dark/90 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 border border-teal/20 transition-all group-hover:bg-teal/20">
            <span className="text-xl">🦷</span>
          </div>
          <div>
            <p className="text-base font-black text-white leading-none">د. حيدر</p>
            <p className="text-xs text-teal-light">متخصص علاج الجذور</p>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-sm font-semibold text-white/70 transition-colors hover:text-white group"
            >
              {link.label}
              <span className="absolute -bottom-0.5 right-0 h-px w-0 bg-teal-light transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <a
          href="#booking"
          className="hidden rounded-xl bg-teal px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-teal/20 transition-all hover:bg-teal-light hover:shadow-teal/40 md:block"
        >
          احجز موعد
        </a>

        {/* Mobile menu button */}
        <button
          className="flex md:hidden items-center justify-center w-10 h-10 text-white"
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          <motion.div animate={open ? 'open' : 'closed'} className="w-5 flex flex-col gap-1.5">
            <motion.span variants={{ open: { rotate: 45, y: 8 }, closed: { rotate: 0, y: 0 } }} className="block h-0.5 w-full bg-white origin-center" />
            <motion.span variants={{ open: { opacity: 0 }, closed: { opacity: 1 } }} className="block h-0.5 w-full bg-white" />
            <motion.span variants={{ open: { rotate: -45, y: -8 }, closed: { rotate: 0, y: 0 } }} className="block h-0.5 w-full bg-white origin-center" />
          </motion.div>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-white/8 bg-clinic-dark/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-semibold text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#booking"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-xl bg-teal py-3 text-center text-sm font-bold text-white"
              >
                احجز موعد
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
