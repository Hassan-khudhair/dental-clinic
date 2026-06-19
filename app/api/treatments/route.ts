import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const patientId = req.nextUrl.searchParams.get('patientId') ?? undefined;
  const treatments = await prisma.treatment.findMany({
    where: patientId ? { patientId } : undefined,
    include: { patient: true },
    orderBy: { treatmentDate: 'desc' },
  });
  return NextResponse.json(treatments);
}

export async function POST(req: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const treatment = await prisma.treatment.create({
    data: { ...body, treatmentDate: new Date(body.treatmentDate) },
    include: { patient: true },
  });
  return NextResponse.json(treatment, { status: 201 });
}
