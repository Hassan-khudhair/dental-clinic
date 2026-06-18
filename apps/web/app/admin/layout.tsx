import type { Metadata } from 'next';
import Sidebar from '@/components/admin/Sidebar';

export const metadata: Metadata = {
  title: {
    template: '%s | لوحة التحكم',
    default: 'لوحة التحكم',
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
