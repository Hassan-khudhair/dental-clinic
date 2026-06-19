'use client';

import { useState } from 'react';
import ReservationsTable from '@/components/admin/ReservationsTable';
import { useReservations } from '@/hooks/useReservations';
import type { ReservationStatus } from '@/types';

const FILTERS: { label: string; value: ReservationStatus | 'ALL' }[] = [
  { label: 'الكل', value: 'ALL' },
  { label: 'قيد الانتظار', value: 'PENDING' },
  { label: 'مؤكد', value: 'CONFIRMED' },
  { label: 'مكتمل', value: 'COMPLETED' },
  { label: 'ملغي', value: 'CANCELLED' },
];

export default function ReservationsPage() {
  const [activeFilter, setActiveFilter] = useState<ReservationStatus | 'ALL'>('ALL');
  const { data: reservations = [], isLoading } = useReservations(
    activeFilter !== 'ALL' ? activeFilter : undefined,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-clinic-dark">الحجوزات</h1>
        <span className="rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">
          {reservations.length} حجز
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActiveFilter(f.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              activeFilter === f.value
                ? 'bg-teal text-gray-200'
                : 'border border-gray-200 bg-white text-clinic-muted hover:border-teal hover:text-teal'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
      ) : (
        <ReservationsTable reservations={reservations} />
      )}
    </div>
  );
}
