'use client';

import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import api from '@/lib/api';
import type { CreateReservationPayload } from '@clinic/types';

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
      {/* Glows */}
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
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 shadow-2xl"
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    الاسم الكامل <span className="text-teal-light">*</span>
                  </label>
                  <input name="fullName" value={form.fullName} onChange={handleChange} required placeholder="أدخل اسمك الكامل" className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>
                    رقم الهاتف <span className="text-teal-light">*</span>
                  </label>
                  <input name="phone" value={form.phone} onChange={handleChange} required type="tel" placeholder="07xxxxxxxxx" className={inputClass} />
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>
                  الخدمة المطلوبة <span className="text-teal-light">*</span>
                </label>
                <select name="treatment" value={form.treatment} onChange={handleChange} required className={inputClass}>
                  <option value="" className="bg-clinic-dark">اختر الخدمة</option>
                  {TREATMENTS.map((t) => (
                    <option key={t} value={t} className="bg-clinic-dark">{t}</option>
                  ))}
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
                    {TIMES.map((t) => (
                      <option key={t} value={t} className="bg-clinic-dark">{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-5">
                <label className={labelClass}>ملاحظات إضافية</label>
                <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} placeholder="صف حالتك أو أي تفاصيل إضافية..." className={`${inputClass} resize-none`} />
              </div>

              {error && (
                <p className="mt-4 rounded-xl bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400 border border-red-500/20">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group relative mt-6 w-full overflow-hidden rounded-2xl bg-teal py-4 text-base font-bold text-white shadow-lg shadow-teal/20 transition-all duration-300 hover:shadow-teal/40 hover:shadow-xl disabled:opacity-60"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <>
                      <span>إرسال الطلب عبر واتساب</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </>
                  )}
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
