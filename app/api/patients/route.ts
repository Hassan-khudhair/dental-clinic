import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const patients = await prisma.patient.findMany({
    include: {
      reservations: { orderBy: { createdAt: 'desc' } },
      treatments: { orderBy: { treatmentDate: 'desc' } },
    },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(patients);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const patient = await prisma.patient.create({ data: body });
  return NextResponse.json(patient, { status: 201 });
}
