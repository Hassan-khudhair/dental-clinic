import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

type Params = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const patient = await prisma.patient.findUnique({
    where: { id },
    include: {
      reservations: { orderBy: { createdAt: 'desc' } },
      treatments: { orderBy: { treatmentDate: 'desc' } },
    },
  });
  if (!patient) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(patient);
}

export async function PATCH(req: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const exists = await prisma.patient.findUnique({ where: { id } });
  if (!exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updated = await prisma.patient.update({ where: { id }, data: body });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const exists = await prisma.patient.findUnique({ where: { id } });
  if (!exists) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  await prisma.patient.delete({ where: { id } });
  return NextResponse.json({ message: 'Deleted' });
}
