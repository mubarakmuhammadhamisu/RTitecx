import { Twitter, Youtube, Linkedin, Github } from 'lucide-react';

/**
 * FooterSocialLinks — social icon links column.
 * Single Responsibility: social link icons only.
 *
 * NOTE: href values are placeholders ("#") carried over from the
 * original codebase — update with real profile URLs before launch.
 */
export default function FooterSocialLinks() {
  return (
    <div>
      <h4 className="text-text-primary font-semibold mb-4">Social</h4>
      <div className="flex gap-4">
        <a href="#" className="hover:text-brand-indigo-400 transition-colors" aria-label="Twitter">
          <Twitter size={20} />
        </a>
        <a href="#" className="hover:text-danger transition-colors" aria-label="YouTube">
          <Youtube size={20} />
        </a>
        <a href="#" className="hover:text-info transition-colors" aria-label="LinkedIn">
          <Linkedin size={20} />
        </a>
        <a href="#" className="hover:text-text-primary transition-colors" aria-label="GitHub">
          <Github size={20} />
        </a>
      </div>
    </div>
  );
}
