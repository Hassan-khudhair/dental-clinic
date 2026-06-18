'use client';

import { useState } from 'react';
import type { Patient } from '@clinic/types';
import StatusBadge from './StatusBadge';

export default function PatientsTable({ patients }: { patients: Patient[] }) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (patients.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-xl bg-white text-clinic-muted shadow-sm">
        لا يوجد مرضى
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead className="border-b border-gray-100 bg-gray-50">
          <tr>
            {['الاسم', 'الهاتف', 'العمر', 'الحجوزات', 'العلاجات', ''].map((h) => (
              <th key={h} className="px-4 py-3 text-right text-xs font-semibold text-clinic-muted">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {patients.map((p) => (
            <>
              <tr key={p.id} className="hover:bg-gray-50/50">
                <td className="px-4 py-3 font-semibold text-clinic-dark">{p.fullName}</td>
                <td className="px-4 py-3 text-clinic-muted" dir="ltr">{p.phone}</td>
                <td className="px-4 py-3 text-clinic-muted">{p.age ?? '—'}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">
                    {p.reservations?.length ?? 0}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    {p.treatments?.length ?? 0}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => setExpanded(expanded === p.id ? null : p.id)}
                    className="text-xs font-semibold text-teal hover:underline"
                  >
                    {expanded === p.id ? 'إخفاء' : 'التفاصيل'}
                  </button>
                </td>
              </tr>

              {expanded === p.id && (
                <tr key={`${p.id}-detail`}>
                  <td colSpan={6} className="bg-gray-50 px-6 py-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-clinic-muted">
                          الحجوزات
                        </p>
                        {p.reservations?.length ? (
                          <div className="space-y-1.5">
                            {p.reservations.map((r) => (
                              <div
                                key={r.id}
                                className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-xs shadow-sm"
                              >
                                <span className="font-medium text-clinic-dark">{r.treatment}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-clinic-muted">{r.preferredDate ?? '—'}</span>
                                  <StatusBadge status={r.status} />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-clinic-muted">لا توجد حجوزات</p>
                        )}
                      </div>
                      <div>
                        <p className="mb-2 text-xs font-bold uppercase tracking-wider text-clinic-muted">
                          العلاجات
                        </p>
                        {p.treatments?.length ? (
                          <div className="space-y-1.5">
                            {p.treatments.map((t) => (
                              <div
                                key={t.id}
                                className="rounded-lg bg-white px-3 py-2 text-xs shadow-sm"
                              >
                                <p className="font-medium text-clinic-dark">{t.procedureName}</p>
                                <p className="mt-0.5 text-clinic-muted">{t.treatmentDate}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-clinic-muted">لا توجد علاجات</p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
