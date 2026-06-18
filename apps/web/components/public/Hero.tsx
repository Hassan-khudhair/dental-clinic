'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

const STATS = [
  { value: '+١٠', label: 'سنة خبرة' },
  { value: '+٥٠٠', label: 'حالة مكتملة' },
  { value: '٩٨٪', label: 'نسبة النجاح' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 35 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-clinic-dark"
    >
      {/* Three.js background */}
      <HeroCanvas />

      {/* Radial gradient overlays */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,188,212,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_80%,rgba(212,168,83,0.08),transparent)]" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-clinic-dark to-transparent" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-20 pt-36 sm:px-6 lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center text-center"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-teal-light">
              <span className="h-2 w-2 rounded-full bg-teal animate-pulse-glow" />
              متخصص معتمد · البصرة — الزبير
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={item}
            className="mt-7 text-6xl font-black leading-tight tracking-tight text-white sm:text-7xl lg:text-[100px]"
          >
            د. حيدر
            <br />
            <span className="gradient-text">متخصص الجذور</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/55"
          >
            خبرة متخصصة في علاج قنوات الجذر، استخراج الملفات المكسورة،
            والتيجان التركيبية. علاج احترافي بأحدث التقنيات وأقل الإيلام.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={item}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <a
              href="#booking"
              className="group relative overflow-hidden rounded-2xl bg-teal px-9 py-4 text-base font-bold text-white shadow-lg shadow-teal/25 transition-all duration-300 hover:scale-[1.03] hover:shadow-teal/40 hover:shadow-xl"
            >
              <span className="relative z-10">احجز موعدك الآن ←</span>
              <div className="absolute inset-0 bg-linear-to-r from-teal-dark to-teal-light opacity-0 transition-opacity group-hover:opacity-100" />
            </a>
            <a
              href="tel:+9647821487992"
              className="glass glass-hover inline-flex items-center gap-2 rounded-2xl px-9 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-[1.03]"
            >
              <svg className="h-4 w-4 text-teal-light" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.054 15.054 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C9.61 21 3 14.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.24 1.01l-2.21 2.21z" />
              </svg>
              اتصل بنا
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={item}
            className="mt-16 flex flex-wrap justify-center gap-5"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass rounded-2xl px-8 py-5 text-center transition-all duration-300 hover:scale-105"
                style={{ boxShadow: '0 0 20px rgba(0,188,212,0.08)' }}
              >
                <p className="text-3xl font-black text-teal-light">{stat.value}</p>
                <p className="mt-1 text-sm font-medium text-white/50">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
      >
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/15 pt-2">
          <div className="h-2 w-0.5 rounded-full bg-teal-light/70" />
        </div>
      </motion.div>
    </section>
  );
}
