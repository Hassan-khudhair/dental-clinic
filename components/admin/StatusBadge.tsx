import type { ReservationStatus } from '@/types';

const CONFIG: Record<ReservationStatus, { label: string; classes: string }> = {
  PENDING: { label: 'قيد الانتظار', classes: 'bg-yellow-100 text-yellow-800' },
  CONFIRMED: { label: 'مؤكد', classes: 'bg-blue-100 text-blue-800' },
  COMPLETED: { label: 'مكتمل', classes: 'bg-green-100 text-green-800' },
  CANCELLED: { label: 'ملغي', classes: 'bg-red-100 text-red-800' },
};

export default function StatusBadge({ status }: { status: ReservationStatus }) {
  const { label, classes } = CONFIG[status] ?? CONFIG.PENDING;
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${classes}`}>
      {label}
    </span>
  );
}
