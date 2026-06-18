import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | لوحة التحكم',
    default: 'لوحة التحكم',
  },
};

// Minimal wrapper — login page only gets this (no sidebar).
// Dashboard pages are nested inside (dashboard)/layout.tsx which adds the sidebar.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
