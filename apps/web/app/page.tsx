import type { Metadata } from 'next';
import Navbar from '@/components/public/Navbar';
import Hero from '@/components/public/Hero';
import Services from '@/components/public/Services';
import BookingForm from '@/components/public/BookingForm';
import Contact from '@/components/public/Contact';

export const metadata: Metadata = {
  title: {
    absolute: 'د. حيدر | متخصص علاج جذور الأسنان — البصرة',
  },
};

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Services />
        <BookingForm />
        <Contact />
      </main>
    </>
  );
}
