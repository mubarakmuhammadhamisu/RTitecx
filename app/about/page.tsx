import Navbar from '@/components/ui/Navbar/Navbar';
import Footer from '@/components/ui/Footer/Footer';
import AboutHeroSection from './_sections/AboutHeroSection';
import MissionSection from './_sections/MissionSection';
import AudienceSection from './_sections/AudienceSection';
import DifferenceSection from './_sections/DifferenceSection';
import ContactSection from './_sections/ContactSection';
import AboutCtaSection from './_sections/AboutCtaSection';

/**
 * /about — static info page. Composes section components; each
 * section's markup lives in its own file under _sections/.
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-surface-950 text-text-secondary">
      <Navbar />
      <AboutHeroSection />
      <MissionSection />
      <AudienceSection />
      <DifferenceSection />
      <ContactSection />
      <AboutCtaSection />
      <Footer />
    </main>
  );
}
