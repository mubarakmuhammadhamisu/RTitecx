import { Award } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import CertificateRow from './CertificateRow';
import type { Certificate } from '@/lib/achievements/buildCertificates';

/**
 * CertificatesSection — "Your Certificates" section. Single
 * Responsibility: section composition; row rendering delegated to
 * CertificateRow.
 */
interface CertificatesSectionProps {
  certificates: Certificate[];
  copiedId: number | null;
  onShare: (cert: Certificate) => void;
  onDownload: (cert: Certificate) => void;
}

export default function CertificatesSection({
  certificates,
  copiedId,
  onShare,
  onDownload,
}: CertificatesSectionProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-4">Your Certificates</h2>
      {certificates.length === 0 ? (
        <GlowCard className="text-center py-10">
          <Award className="mx-auto mb-3 text-text-faint" size={40} />
          <p className="text-text-muted text-sm">Complete a course to earn your first certificate.</p>
        </GlowCard>
      ) : (
        <div className="space-y-3">
          {certificates.map((cert) => (
            <CertificateRow
              key={cert.id}
              cert={cert}
              isCopied={copiedId === cert.id}
              onShare={() => onShare(cert)}
              onDownload={() => onDownload(cert)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
