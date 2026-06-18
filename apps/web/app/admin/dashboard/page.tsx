'use client';

import type { Metadata } from 'next';
import StatsCard from '@/components/admin/StatsCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStats } from '@/hooks/useStats';
import { useReservations } from '@/hooks/useReservations';

export default function DashboardPage() {
  const { data: stats, isLoading: loadingStats } = useStats();
  const { data: reservations, isLoading: loadingRes } = useReservations();

  const recent = reservations?.slice(0, 10) ?? [];

  const statCards = stats
    ? [
        { label: 'إجمالي الحجوزات', value: stats.totalReservations, color: 'blue' as const, icon: '📅' },
        { label: 'حجوزات اليوم', value: stats.todayReservations, color: 'teal' as const, icon: '🕐' },
        { label: 'قيد الانتظار', value: stats.pendingReservations, color: 'gold' as const, icon: '⏳' },
        { label: 'إجمالي المرضى', value: stats.totalPatients, color: 'green' as const, icon: '👥' },
        { label: 'جلسات مكتملة', value: stats.completedTreatments, color: 'gray' as const, icon: '✅' },
      ]
    : [];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-clinic-dark">لوحة التحكم</h1>

      {loadingStats ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {statCards.map((card) => (
            <StatsCard key={card.label} {...card} />
          ))}
        </div>
      )}

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="font-semibold text-clinic-dark">آخر الحجوزات</h2>
        </div>
        <div className="overflow-x-auto">
          {loadingRes ? (
            <div className="p-8 text-center text-clinic-muted">جاري التحميل…</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-right text-xs font-semibold uppercase text-clinic-muted">
                  <th className="px-6 py-3">الاسم</th>
                  <th className="px-6 py-3">الهاتف</th>
                  <th className="px-6 py-3">العلاج</th>
                  <th className="px-6 py-3">التاريخ</th>
                  <th className="px-6 py-3">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recent.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-clinic-dark">{r.fullName}</td>
                    <td className="px-6 py-3 text-clinic-muted" dir="ltr">{r.phone}</td>
                    <td className="px-6 py-3 text-clinic-muted">{r.treatment}</td>
                    <td className="px-6 py-3 text-clinic-muted">
                      {r.preferredDate ? new Date(r.preferredDate).toLocaleDateString('ar-IQ') : '—'}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
