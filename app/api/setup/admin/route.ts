import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const existing = await prisma.user.findFirst();
  if (existing) {
    return NextResponse.json({ error: 'Admin already exists' }, { status: 403 });
  }

  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'name, email and password are required' }, { status: 400 });
  }

  const result = await auth.api.signUpEmail({ body: { name, email, password } });
  return NextResponse.json(
    { message: 'Admin account created', email: result.user.email },
    { status: 201 },
  );
}
