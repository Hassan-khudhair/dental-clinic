import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const [totalReservations, todayReservations, pendingReservations, totalPatients, completedTreatments] =
    await Promise.all([
      prisma.reservation.count(),
      prisma.reservation.count({ where: { createdAt: { gte: today, lt: tomorrow } } }),
      prisma.reservation.count({ where: { status: 'PENDING' } }),
      prisma.patient.count(),
      prisma.reservation.count({ where: { status: 'COMPLETED' } }),
    ]);

  return NextResponse.json({
    totalReservations,
    todayReservations,
    pendingReservations,
    totalPatients,
    completedTreatments,
  });
}
