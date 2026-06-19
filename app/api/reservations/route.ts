import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import type { Status } from '@prisma/client';

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const status = req.nextUrl.searchParams.get('status') as Status | null;
  const reservations = await prisma.reservation.findMany({
    where: status ? { status } : undefined,
    include: { patient: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(reservations);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const reservation = await prisma.reservation.create({
    data: {
      fullName: body.fullName,
      phone: body.phone,
      treatment: body.treatment,
      preferredDate: body.preferredDate ? new Date(body.preferredDate) : null,
      preferredTime: body.preferredTime ?? null,
      notes: body.notes ?? null,
    },
  });
  return NextResponse.json(reservation, { status: 201 });
}
