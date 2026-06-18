'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SERVICES = [
  {
    icon: '🔬',
    title: 'علاج جذور الأسنان',
    desc: 'علاج متخصص لقنوات الجذر بأحدث التقنيات وأقل الإيلام',
    price: 'ابتداءً من ٥٠,٠٠٠ د.ع',
    color: 'from-teal/15 to-teal-dark/5',
    border: 'hover:border-teal/40',
    glow: 'hover:shadow-teal/15',
    tag: 'الأكثر طلباً',
  },
  {
    icon: '⚡',
    title: 'استخراج ملف مكسور',
    desc: 'إزالة الملفات المكسورة داخل القناة بدقة عالية وخبرة متخصصة',
    price: 'حسب الحالة',
    color: 'from-gold/15 to-gold/5',
    border: 'hover:border-gold/40',
    glow: 'hover:shadow-gold/15',
    tag: 'تخصصي',
  },
  {
    icon: '✨',
    title: 'تبييض الأسنان',
    desc: 'جلسات تبييض احترافية تمنحك ابتسامة مشرقة وناصعة',
    price: 'ابتداءً من ٨٠,٠٠٠ د.ع',
    color: 'from-blue-500/10 to-blue-600/5',
    border: 'hover:border-blue-400/30',
    glow: 'hover:shadow-blue-500/10',
    tag: null,
  },
  {
    icon: '🛡️',
    title: 'تيجان وتركيبات',
    desc: 'تيجان خزفية وتركيبات ثابتة تحاكي شكل ولون الأسنان الطبيعية',
    price: 'ابتداءً من ١٥٠,٠٠٠ د.ع',
    color: 'from-purple-500/10 to-purple-600/5',
    border: 'hover:border-purple-400/30',
    glow: 'hover:shadow-purple-500/10',
    tag: null,
  },
  {
    icon: '🧹',
    title: 'تنظيف وتلميع',
    desc: 'تنظيف احترافي لإزالة الجير والترسبات والحفاظ على صحة اللثة',
    price: '٢٥,٠٠٠ د.ع',
    color: 'from-green-500/10 to-green-600/5',
    border: 'hover:border-green-400/30',
    glow: 'hover:shadow-green-500/10',
    tag: null,
  },
  {
    icon: '📸',
    title: 'أشعة وتشخيص',
    desc: 'أشعة رقمية دقيقة وتشخيص شامل لوضع خطة علاجية مثالية',
    price: '١٥,٠٠٠ د.ع',
    color: 'from-orange-500/10 to-orange-600/5',
    border: 'hover:border-orange-400/30',
    glow: 'hover:shadow-orange-500/10',
    tag: null,
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
      className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-linear-to-br ${service.color} p-6 backdrop-blur-sm transition-all duration-400 hover:scale-[1.02] hover:shadow-xl ${service.border} ${service.glow}`}
    >
      {service.tag && (
        <span className="absolute left-4 top-4 rounded-full bg-teal/20 px-3 py-0.5 text-xs font-bold text-teal-light">
          {service.tag}
        </span>
      )}

      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/8 text-2xl transition-transform duration-300 group-hover:scale-110">
        {service.icon}
      </div>

      <h3 className="mb-2 text-lg font-bold text-white">{service.title}</h3>
      <p className="mb-5 text-sm leading-relaxed text-white/55">{service.desc}</p>

      <div className="flex items-center justify-between border-t border-white/8 pt-4">
        <span className="text-sm font-bold text-teal-light">{service.price}</span>
        <span className="text-white/25 transition-colors group-hover:text-teal-light">←</span>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, margin: '-80px' });

  return (
    <section id="services" className="relative bg-clinic-dark px-4 py-28 sm:px-6 lg:px-8">
      {/* Section glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(0,188,212,0.05),transparent)]" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          ref={headRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-light">
            خدماتنا
          </span>
          <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            رعاية متخصصة{' '}
            <span className="gradient-text">لكل حالة</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/50">
            نقدم مجموعة شاملة من خدمات طب الأسنان المتخصصة بأعلى معايير الجودة
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
