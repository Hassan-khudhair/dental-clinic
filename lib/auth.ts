import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from './prisma';

export const auth = betterAuth({
  basePath: '/api/auth',
  secret: process.env.BETTER_AUTH_SECRET!,
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  emailAndPassword: { enabled: true, autoSignIn: true },
  trustedOrigins: [process.env.BETTER_AUTH_URL || 'http://localhost:3000'],
  advanced: {
    defaultCookieAttributes: { sameSite: 'lax', httpOnly: true },
  },
});
