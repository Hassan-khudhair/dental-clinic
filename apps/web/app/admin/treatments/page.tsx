'use client';

import TreatmentsTable from '@/components/admin/TreatmentsTable';
import { useTreatments } from '@/hooks/useTreatments';

export default function TreatmentsPage() {
  const { data: treatments = [], isLoading } = useTreatments();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-clinic-dark">سجل العلاجات</h1>
        <span className="rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">
          {treatments.length} جلسة
        </span>
      </div>

      {isLoading ? (
        <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
      ) : (
        <TreatmentsTable treatments={treatments} />
      )}
    </div>
  );
}
