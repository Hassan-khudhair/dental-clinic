'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import api from '@/lib/api';
import type { CreateReservationPayload } from '@/types';

const TREATMENTS = [
  'علاج جذور الأسنان',
  'استخراج ملف مكسور',
  'تبييض الأسنان',
  'تيجان وتركيبات',
  'تنظيف وتلميع',
  'أشعة وتشخيص',
];

const TIMES = ['٩:٠٠ ص', '١٠:٠٠ ص', '١١:٠٠ ص', '١٢:٠٠ م', '٢:٠٠ م', '٣:٠٠ م', '٤:٠٠ م', '٥:٠٠ م'];

const inputClass =
  'w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200 focus:border-teal/50 focus:bg-white/8 focus:ring-1 focus:ring-teal/30';

const labelClass = 'mb-2 block text-sm font-semibold text-white/70';

export default function BookingForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const [form, setForm] = useState<CreateReservationPayload>({
    fullName: '',
    phone: '',
    treatment: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/reservations', form);
      setDone(true);
      const msg = encodeURIComponent(
        `مرحباً، أودّ حجز موعد.\nالاسم: ${form.fullName}\nالهاتف: ${form.phone}\nالخدمة: ${form.treatment}\nالتاريخ: ${form.preferredDate || 'غير محدد'}\nالوقت: ${form.preferredTime || 'غير محدد'}`,
      );
      setTimeout(() => {
        window.open(`https://wa.me/9647821487992?text=${msg}`, '_blank');
      }, 800);
    } catch {
      setError('حدث خطأ أثناء الإرسال، يرجى المحاولة مجدداً.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="booking" className="relative overflow-hidden bg-clinic-navy px-4 py-28 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-teal/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 translate-x-1/2 rounded-full bg-gold/8 blur-3xl" />
      </div>

      <div ref={ref} className="relative mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="glass inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-teal-light">
            احجز موعدك
          </span>
          <h2 className="mt-4 text-4xl font-black text-white sm:text-5xl">
            نحن بانتظارك{' '}
            <span className="gradient-text">دائماً</span>
          </h2>
          <p className="mt-3 text-base text-white/50">
            أرسل طلب حجزك وسيتم التواصل معك فوراً عبر واتساب
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {done ? (
            <div className="glass rounded-3xl p-12 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-teal/15 text-4xl"
              >
                ✅
              </motion.div>
              <h3 className="text-2xl font-black text-white">تم إرسال طلبك!</h3>
              <p className="mt-2 text-white/55">سيتم فتح واتساب للتواصل المباشر مع العيادة</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>الاسم الكامل <span className="text-teal-light">*</span></label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="أدخل اسمك الكامل" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>رقم الهاتف <span className="text-teal-light">*</span></label>
                  <input name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="07xxxxxxxxx" className={inputClass} />
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>الخدمة المطلوبة <span className="text-teal-light">*</span></label>
                <select name="treatment" value={form.treatment} onChange={handleChange} required className={inputClass}>
                  <option value="" className="bg-clinic-dark">اختر الخدمة</option>
                  {TREATMENTS.map((t) => <option key={t} value={t} className="bg-clinic-dark">{t}</option>)}
                </select>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>التاريخ المفضل</label>
                  <input name="preferredDate" value={form.preferredDate} onChange={handleChange} type="date" className={`${inputClass} scheme-dark`} />
                </div>
                <div>
                  <label className={labelClass}>الوقت المفضل</label>
                  <select name="preferredTime" value={form.preferredTime} onChange={handleChange} className={inputClass}>
                    <option value="" className="bg-clinic-dark">اختر الوقت</option>
                    {TIMES.map((t) => <option key={t} value={t} className="bg-clinic-dark">{t}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>ملاحظات إضافية</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="صف حالتك أو أي تفاصيل إضافية..." className={`${inputClass} resize-none`} />
              </div>

              {error && (
                <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 border border-red-500/20">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-teal py-4 text-base font-bold text-white shadow-lg shadow-teal/20 transition-all duration-300 hover:shadow-teal/40 hover:shadow-xl disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? <span className="animate-spin">⏳</span> : <span>إرسال الطلب عبر واتساب</span>}
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-teal-dark to-teal-light opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
