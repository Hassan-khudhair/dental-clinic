'use client';

import { useState } from 'react';
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

export default function BookingForm() {
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

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.post('/reservations', form);
      const msg = encodeURIComponent(
        `مرحباً، أودّ حجز موعد.\nالاسم: ${form.fullName}\nالهاتف: ${form.phone}\nالخدمة: ${form.treatment}\nالتاريخ: ${form.preferredDate || 'غير محدد'}\nالوقت: ${form.preferredTime || 'غير محدد'}`,
      );
      window.open(`https://wa.me/9647821487992?text=${msg}`, '_blank');
    } catch {
      setError('حدث خطأ أثناء الإرسال، يرجى المحاولة مجدداً.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="booking" className="bg-ivory px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black text-clinic-dark sm:text-4xl">احجز موعدك</h2>
          <p className="mt-2 text-clinic-muted">أرسل طلبك وسيتم التواصل معك عبر واتساب</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-8 shadow-sm"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-clinic-dark">
                الاسم الكامل <span className="text-red-500">*</span>
              </label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
                placeholder="أدخل اسمك الكامل"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-clinic-dark placeholder-gray-400 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-clinic-dark">
                رقم الهاتف <span className="text-red-500">*</span>
              </label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                type="tel"
                placeholder="07xxxxxxxxx"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-clinic-dark placeholder-gray-400 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-clinic-dark">
              الخدمة المطلوبة <span className="text-red-500">*</span>
            </label>
            <select
              name="treatment"
              value={form.treatment}
              onChange={handleChange}
              required
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-clinic-dark outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
            >
              <option value="">اختر الخدمة</option>
              {TREATMENTS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-clinic-dark">
                التاريخ المفضل
              </label>
              <input
                name="preferredDate"
                value={form.preferredDate}
                onChange={handleChange}
                type="date"
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-clinic-dark outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-clinic-dark">
                الوقت المفضل
              </label>
              <select
                name="preferredTime"
                value={form.preferredTime}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-clinic-dark outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
              >
                <option value="">اختر الوقت</option>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-clinic-dark">
              ملاحظات إضافية
            </label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              placeholder="صف حالتك أو أي تفاصيل إضافية..."
              className="w-full resize-none rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-clinic-dark placeholder-gray-400 outline-none focus:border-teal focus:ring-2 focus:ring-teal/20"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-teal py-4 text-base font-bold text-white shadow-sm transition-all hover:bg-teal-light disabled:opacity-60"
          >
            {loading ? 'جاري الإرسال...' : 'إرسال الطلب عبر واتساب ✓'}
          </button>
        </form>
      </div>
    </section>
  );
}
