'use client';

import PatientsTable from '@/components/admin/PatientsTable';
import { usePatients } from '@/hooks/usePatients';

export default function PatientsPage() {
  const { data: patients = [], isLoading } = usePatients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-clinic-dark">المرضى</h1>
        <span className="rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">
          {patients.length} مريض
        </span>
      </div>

      {isLoading ? (
        <div className="h-64 animate-pulse rounded-xl bg-gray-200" />
      ) : (
        <PatientsTable patients={patients} />
      )}
    </div>
  );
}
