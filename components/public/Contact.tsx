'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const CARDS = [
  {
    icon: '📍',
    label: 'العنوان',
    value: 'ذي قار — الناصرية - مقابل مستشفى الأزهر',
    sub: 'العراق',
    href: '#',
    color: 'hover:border-teal/40',
  },
  {
    icon: '📱',
    label: 'الهاتف',
    value: '٠٧٨٢١٤٨٧٩٩٢',
    sub: '+964',
    href: 'tel:+9647821487992',
    color: 'hover:border-green-400/40',
  },
  {
    icon: '🕐',
    label: 'أوقات العمل',
    value: 'السبت — الخميس',
    sub: '٩ صباحاً — ٦ مساءً',
    href: '#',
    color: 'hover:border-gold/40',
  },
  {
    icon: '📸',
    label: 'إنستغرام',
    value: '@dr.haidar.khudhair',
    sub: 'تابعنا',
    href: 'https://instagram.com/dr.haidar.khudhair',
    color: 'hover:border-purple-400/40',
  },
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" className="relative overflow-hidden bg-clinic-dark px-4 py-28 sm:px-6 lg:px-8">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-teal/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gold/5 blur-3xl" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-light">
            تواصل معنا
          </span>
          <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            نحن هنا{' '}
            <span className="gradient-text">لمساعدتك</span>
          </h2>
        </motion.div>

        {/* Info cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CARDS.map((card, i) => (
            <motion.a
              key={card.label}
              href={card.href}
              target={card.href.startsWith('http') ? '_blank' : undefined}
              rel={card.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
              className={`glass group rounded-2xl p-6 text-center transition-all duration-300 hover:scale-[1.03] hover:shadow-lg ${card.color} border border-white/8`}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 text-2xl transition-transform duration-300 group-hover:scale-110">
                {card.icon}
              </div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-white/35">{card.label}</p>
              <p className="font-bold text-white">{card.value}</p>
              <p className="mt-0.5 text-sm text-white/45">{card.sub}</p>
            </motion.a>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-12 text-center"
        >
          <a
            href="https://wa.me/9647821487992"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-2xl bg-green-500 px-10 py-4 text-base font-bold text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:scale-[1.03] hover:bg-green-400 hover:shadow-green-500/40 hover:shadow-xl"
          >
            <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            تواصل معنا عبر واتساب
          </a>
        </motion.div>

        {/* Footer strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-20 border-t border-white/8 pt-8 text-center text-sm text-white/25"
        >
          © {new Date().getFullYear()} عيادة د. حيدر لطب الأسنان — ذي قار، العراق
        </motion.div>
      </div>
    </section>
  );
}
