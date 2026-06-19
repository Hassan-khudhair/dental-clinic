'use client';

import { useState } from 'react';
import type { Reservation, ReservationStatus } from '@/types';
import StatusBadge from './StatusBadge';
import { useUpdateReservation, useDeleteReservation } from '@/hooks/useReservations';

const STATUSES: ReservationStatus[] = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];

const STATUS_LABELS: Record<ReservationStatus, string> = {
  PENDING: 'قيد الانتظار',
  CONFIRMED: 'مؤكد',
  COMPLETED: 'مكتمل',
  CANCELLED: 'ملغي',
};

export default function ReservationsTable({ reservations }: { reservations: Reservation[] }) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const update = useUpdateReservation();
  const remove = useDeleteReservation();

  function confirmDelete() {
    if (!deleteId) return;
    remove.mutate(deleteId, { onSuccess: () => setDeleteId(null) });
  }

  if (reservations.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl bg-white text-clinic-muted shadow-sm">
        لا توجد حجوزات
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-100 bg-gray-50">
            <tr>
              {['الاسم', 'الهاتف', 'الخدمة', 'التاريخ', 'الوقت', 'الحالة', ''].map((h) => (
                <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-clinic-muted">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reservations.map((r) => (
              <tr key={r.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-semibold text-clinic-dark">{r.fullName}</td>
                <td className="px-4 py-3 text-clinic-muted" dir="ltr">{r.phone}</td>
                <td className="px-4 py-3 text-clinic-dark">{r.treatment}</td>
                <td className="px-4 py-3 text-clinic-muted">{r.preferredDate ?? '—'}</td>
                <td className="px-4 py-3 text-clinic-muted">{r.preferredTime ?? '—'}</td>
                <td className="px-4 py-3">
                  <select
                    value={r.status}
                    onChange={(e) =>
                      update.mutate({ id: r.id, status: e.target.value as ReservationStatus })
                    }
                    className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs outline-none focus:border-teal"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                    ))}
                  </select>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setDeleteId(r.id)}
                    className="text-red-400 transition-colors hover:text-red-600"
                    title="حذف"
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-80 rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="mb-2 text-base font-bold text-clinic-dark">تأكيد الحذف</h3>
            <p className="mb-6 text-sm text-clinic-muted">هل أنت متأكد من حذف هذا الحجز؟</p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
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
    </>
  );
}
