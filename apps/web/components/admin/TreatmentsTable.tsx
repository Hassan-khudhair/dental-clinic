'use client';

import { useState } from 'react';
import type { Treatment } from '@clinic/types';
import { useCreateTreatment, useDeleteTreatment } from '@/hooks/useTreatments';
import { usePatients } from '@/hooks/usePatients';

export default function TreatmentsTable({ treatments }: { treatments: Treatment[] }) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ patientId: '', procedureName: '', treatmentDate: '', doctorNotes: '' });

  const { data: patients = [] } = usePatients();
  const create = useCreateTreatment();
  const remove = useDeleteTreatment();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    create.mutate(form as any, {
      onSuccess: () => {
        setShowAdd(false);
        setForm({ patientId: '', procedureName: '', treatmentDate: '', doctorNotes: '' });
      },
    });
  }

  return (
    <>
      <div className="mb-4 flex justify-end">
        <button
          onClick={() => setShowAdd(true)}
          className="rounded-lg bg-teal px-4 py-2 text-sm font-bold text-white hover:bg-teal-light"
        >
          + إضافة علاج
        </button>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        {treatments.length === 0 ? (
          <div className="flex h-40 items-center justify-center text-clinic-muted">لا توجد علاجات</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-gray-100 bg-gray-50">
              <tr>
                {['المريض', 'الإجراء', 'التاريخ', 'ملاحظات الطبيب', ''].map((h) => (
                  <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-clinic-muted">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {treatments.map((t) => (
                <tr key={t.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3 font-semibold text-clinic-dark">{t.patient?.fullName ?? '—'}</td>
                  <td className="px-4 py-3 text-clinic-dark">{t.procedureName}</td>
                  <td className="px-4 py-3 text-clinic-muted">{t.treatmentDate}</td>
                  <td className="px-4 py-3 text-clinic-muted">{t.doctorNotes ?? '—'}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => setDeleteId(t.id)}
                      className="text-red-400 hover:text-red-600"
                      title="حذف"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-base font-bold text-clinic-dark">تأكيد الحذف</h3>
            <p className="mb-6 text-sm text-clinic-muted">هل أنت متأكد من حذف هذا العلاج؟</p>
            <div className="flex gap-3">
              <button
                onClick={() => remove.mutate(deleteId, { onSuccess: () => setDeleteId(null) })}
                disabled={remove.isPending}
                className="flex-1 rounded-lg bg-red-500 py-2 text-sm font-bold text-white hover:bg-red-600 disabled:opacity-60"
              >
                {remove.isPending ? '...' : 'حذف'}
              </button>
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 rounded-lg border border-gray-200 py-2 text-sm font-bold text-clinic-dark hover:bg-gray-50"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <form
            onSubmit={handleAdd}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
          >
            <h3 className="mb-4 text-base font-bold text-clinic-dark">إضافة علاج جديد</h3>
            <div className="space-y-3">
              <select
                name="patientId"
                value={form.patientId}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-teal"
              >
                <option value="">اختر المريض</option>
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.fullName}</option>
                ))}
              </select>
              <input
                name="procedureName"
                value={form.procedureName}
                onChange={handleChange}
                required
                placeholder="اسم الإجراء"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-teal"
              />
              <input
                name="treatmentDate"
                value={form.treatmentDate}
                onChange={handleChange}
                required
                type="date"
                className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-teal"
              />
              <textarea
                name="doctorNotes"
                value={form.doctorNotes}
                onChange={handleChange}
                rows={3}
                placeholder="ملاحظات الطبيب (اختياري)"
                className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-teal"
              />
            </div>
            <div className="mt-4 flex gap-3">
              <button
                type="submit"
                disabled={create.isPending}
                className="flex-1 rounded-lg bg-teal py-2.5 text-sm font-bold text-white hover:bg-teal-light disabled:opacity-60"
              >
                {create.isPending ? '...' : 'إضافة'}
              </button>
              <button
                type="button"
                onClick={() => setShowAdd(false)}
                className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-bold text-clinic-dark hover:bg-gray-50"
              >
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
