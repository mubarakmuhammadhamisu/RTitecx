import Image from 'next/image';
import { Save, Edit2, LogOut, Camera, CheckCircle2 } from 'lucide-react';
import GlowCardHero from '@/components/ui/GlowCardHero';
import type { AppUser } from '@/context/auth/AppUser';

/**
 * ProfileHeroSection — avatar (with upload), name/role, edit/save and
 * logout buttons, plus inline save/avatar status messages.
 *
 * Single Responsibility: this one hero section only. All state (editing
 * mode, avatar upload) is owned by the parent page and passed in —
 * this component is purely presentational + event delegation.
 */
interface ProfileHeroSectionProps {
  user: AppUser;
  isEditing: boolean;
  saveLoading: boolean;
  saveSuccess: boolean;
  saveError: string;
  avatarLoading: boolean;
  avatarError: string;
  onStartEditing: () => void;
  onSaveProfile: () => void;
  onLogout: () => void;
  onAvatarButtonClick: () => void;
  onAvatarFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  avatarInputRef: React.RefObject<HTMLInputElement | null>;
}

export default function ProfileHeroSection({
  user,
  isEditing,
  saveLoading,
  saveSuccess,
  saveError,
  avatarLoading,
  avatarError,
  onStartEditing,
  onSaveProfile,
  onLogout,
  onAvatarButtonClick,
  onAvatarFileChange,
  avatarInputRef,
}: ProfileHeroSectionProps) {
  return (
    <GlowCardHero>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="w-16 h-16 rounded-full bg-gradient-cta flex items-center justify-center font-bold text-2xl text-white shadow-lg shadow-brand-indigo-500/50 overflow-hidden">
              {user.avatarUrl ? (
                <Image src={user.avatarUrl} alt="Avatar" fill sizes="64px" className="object-cover" />
              ) : (
                user.avatar
              )}
            </div>
            <button
              onClick={onAvatarButtonClick}
              disabled={avatarLoading}
              className="absolute inset-0 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer"
            >
              {avatarLoading ? (
                <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Camera size={16} className="text-white" />
              )}
            </button>
            <button
              onClick={onAvatarButtonClick}
              disabled={avatarLoading}
              aria-label="Upload profile picture"
              className="absolute bottom-0 right-0 w-5 h-5 rounded-full bg-brand-indigo-600 border-2 border-surface-950 flex items-center justify-center shadow-md hover:bg-brand-indigo-500 transition group-hover:opacity-0"
            >
              {avatarLoading ? (
                <div className="w-2.5 h-2.5 border border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Camera size={9} className="text-white" />
              )}
            </button>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onAvatarFileChange}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{user.name}</h1>
            <p className="text-brand-indigo-300 text-sm">{user.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <button
              onClick={onSaveProfile}
              disabled={saveLoading}
              className="p-2.5 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 border border-brand-indigo-500 text-white transition disabled:opacity-60"
            >
              <Save size={18} />
            </button>
          ) : (
            <button
              onClick={onStartEditing}
              className="p-2.5 rounded-xl bg-surface-900/60 border border-brand-indigo-500/30 hover:border-brand-indigo-500/60 text-text-primary transition"
            >
              <Edit2 size={18} />
            </button>
          )}
          <button
            onClick={onLogout}
            className="p-2.5 rounded-xl bg-surface-900/60 border border-danger/20 hover:border-danger/50 text-danger transition"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="mt-4 flex items-center gap-2 text-sm text-success bg-success/10 border border-success/20 px-3 py-2 rounded-lg">
          <CheckCircle2 size={15} />
          Profile saved!
        </div>
      )}
      {saveError && (
        <div className="mt-4 text-sm text-danger bg-danger/10 border border-danger/20 px-3 py-2 rounded-lg">{saveError}</div>
      )}
      {avatarLoading && <div className="mt-3 text-xs text-brand-indigo-400">Uploading avatar...</div>}
      {avatarError && (
        <div className="mt-3 text-xs text-danger bg-danger/10 border border-danger/20 px-3 py-2 rounded-lg">{avatarError}</div>
      )}
    </GlowCardHero>
  );
}
