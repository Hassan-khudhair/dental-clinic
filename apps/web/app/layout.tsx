import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';
import Providers from './providers';

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cairo',
});

export const metadata: Metadata = {
  title: {
    template: '%s | د. حيدر — متخصص علاج الجذور',
    default: 'د. حيدر | متخصص علاج جذور الأسنان',
  },
  description: 'عيادة د. حيدر — متخصص في علاج جذور الأسنان في البصرة، الزبير',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen bg-white text-clinic-dark antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
