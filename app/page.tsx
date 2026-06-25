import type { Metadata } from 'next';
import Navbar from '@/components/ui/Navbar/Navbar';
import Footer from '@/components/ui/Footer/Footer';
import HeroSection from './_landing-sections/HeroSection';
import FeaturesSection from './_landing-sections/FeaturesSection';
import CoursePreviewSection from './_landing-sections/CoursePreviewSection';
import FinalCtaSection from './_landing-sections/FinalCtaSection';

// Metadata wording preserved exactly from the original codebase.
export const metadata: Metadata = {
  title: 'TITECX — Learn Real-World Tech Skills',
  description:
    'High-quality courses built for Nigerian learners. Master in-demand tech skills and get certified.',
  openGraph: {
    title: 'TITECX FORGE — Learn Real-World Tech Skills',
    description:
      'High-quality courses built for Nigerian learners. Master in-demand tech skills and get certified.',
    type: 'website',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'TITECX FORGE — Learn Real-World Tech Skills',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TITECX FORGE — Learn Real-World Tech Skills',
    description:
      'High-quality courses built for Nigerian learners. Master in-demand tech skills and get certified.',
    images: ['/og-default.png'],
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-surface-950 text-text-secondary">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CoursePreviewSection />
      <FinalCtaSection />
      <Footer />
    </main>
  );
}
