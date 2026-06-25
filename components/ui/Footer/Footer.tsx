import FooterBrand from './FooterBrand';
import FooterLegalLinks from './FooterLegalLinks';
import FooterSocialLinks from './FooterSocialLinks';

/**
 * Footer — composes the brand/legal/social columns plus the copyright
 * line. Single Responsibility: layout composition only — each column's
 * actual content lives in its own dedicated file.
 */
export default function Footer() {
  return (
    <footer className="border-t border-glass-border py-12 px-4 text-text-secondary">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-12">
        <FooterBrand />
        <FooterLegalLinks />
        <FooterSocialLinks />
      </div>
      <div className="text-center text-sm border-t border-white/5 pt-8">
        © {new Date().getFullYear()} TITECX. All rights reserved.
      </div>
    </footer>
  );
}
