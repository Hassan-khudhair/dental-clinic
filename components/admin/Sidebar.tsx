'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const LINKS = [
  { href: '/admin/dashboard', icon: '📊', label: 'لوحة التحكم' },
  { href: '/admin/reservations', icon: '📅', label: 'الحجوزات' },
  { href: '/admin/patients', icon: '👥', label: 'المرضى' },
  { href: '/admin/treatments', icon: '🦷', label: 'العلاجات' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await authClient.signOut();
    router.push('/admin/login');
  }

  return (
    <aside className="flex h-screen w-64 flex-col border-l border-gray-200 bg-white">
      <div className="flex h-16 items-center border-b border-gray-200 px-5">
        <span className="text-xl">🦷</span>
        <div className="mr-2">
          <p className="text-sm font-bold text-clinic-dark">د. حيدر</p>
          <p className="text-xs text-clinic-muted">لوحة الإدارة</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {LINKS.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-teal/10 text-teal'
                  : 'text-clinic-muted hover:bg-gray-50 hover:text-clinic-dark'
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-red-500 transition-colors hover:bg-red-50"
        >
          <span>🚪</span>
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </aside>
  );
}
