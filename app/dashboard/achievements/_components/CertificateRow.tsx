import { Award, Share2, Download, CheckCircle2 } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { Certificate } from '@/lib/achievements/buildCertificates';

/**
 * CertificateRow — one certificate row with share/download actions.
 * Single Responsibility: this one row only; share/download logic is
 * delegated via props (owned by useCertificateActions in the parent).
 */
interface CertificateRowProps {
  cert: Certificate;
  isCopied: boolean;
  onShare: () => void;
  onDownload: () => void;
}

export default function CertificateRow({ cert, isCopied, onShare, onDownload }: CertificateRowProps) {
  return (
    <GlowCard className="group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-cta flex items-center justify-center shadow-lg shadow-brand-indigo-500/50">
            <Award className="text-white" size={22} />
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-sm">{cert.title}</h3>
            <p className="text-text-muted text-xs">
              {cert.issuer} · {cert.date}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={onShare}
              title="Copy certificate link"
              className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 border border-brand-indigo-500/20 hover:border-brand-indigo-500/60 transition"
            >
              {isCopied ? (
                <CheckCircle2 size={16} className="text-success" />
              ) : (
                <Share2 size={16} className="text-brand-indigo-400" />
              )}
            </button>
            {isCopied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs bg-surface-700 text-success px-2 py-1 rounded-lg">
                Link copied!
              </span>
            )}
          </div>
          <button
            onClick={onDownload}
            title="Download certificate as PDF"
            className="p-2 rounded-lg bg-surface-800 hover:bg-surface-700 border border-brand-purple-500/20 hover:border-brand-purple-500/60 transition"
          >
            <Download size={16} className="text-brand-purple-400" />
          </button>
        </div>
      </div>
    </GlowCard>
  );
}
