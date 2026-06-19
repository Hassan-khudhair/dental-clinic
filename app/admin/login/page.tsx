'use client';

import { useState, FormEvent } from 'react';
import { authClient } from '@/lib/auth-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { error: authError } = await authClient.signIn.email({ email, password });
      if (authError) {
        setError('بريد إلكتروني أو كلمة مرور غير صحيحة');
        return;
      }
      window.location.href = '/admin/dashboard';
    } catch {
      setError('حدث خطأ أثناء تسجيل الدخول');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-teal px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <span className="text-5xl">🦷</span>
          <h1 className="mt-3 text-2xl font-bold text-clinic-dark">تسجيل الدخول</h1>
          <p className="mt-1 text-sm text-clinic-muted">لوحة تحكم د. حيدر</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-2.5 text-right focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              placeholder="admin@clinic.com"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-gray-700">كلمة المرور</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-lg border border-gray-300 text-gray-600 px-4 py-2.5 text-right focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-2 text-center text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-teal py-3 font-bold text-white transition-colors hover:bg-teal-light disabled:opacity-60"
          >
            {loading ? 'جاري الدخول…' : 'دخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
