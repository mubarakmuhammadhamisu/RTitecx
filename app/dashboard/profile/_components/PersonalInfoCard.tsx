import { Mail, MapPin } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { AppUser } from '@/context/auth/AppUser';

/**
 * PersonalInfoCard — name/email/phone/location/bio, switching between
 * read-only display and edit-mode inputs.
 * Single Responsibility: this one card only.
 */
interface PersonalInfoCardProps {
  user: AppUser;
  isEditing: boolean;
  editName: string;
  onNameChange: (v: string) => void;
  editPhone: string;
  onPhoneChange: (v: string) => void;
  editLocation: string;
  onLocationChange: (v: string) => void;
  editBio: string;
  onBioChange: (v: string) => void;
  saveLoading: boolean;
  onCancel: () => void;
  onSave: () => void;
}

const inputClass = (editing: boolean) =>
  `w-full mt-1.5 px-4 py-3 rounded-lg bg-surface-800 border text-text-primary text-sm focus:outline-none transition ${
    editing ? 'border-brand-indigo-500/40 focus:border-brand-indigo-500/70' : 'border-brand-indigo-500/10 cursor-default'
  }`;

export default function PersonalInfoCard({
  user,
  isEditing,
  editName,
  onNameChange,
  editPhone,
  onPhoneChange,
  editLocation,
  onLocationChange,
  editBio,
  onBioChange,
  saveLoading,
  onCancel,
  onSave,
}: PersonalInfoCardProps) {
  return (
    <GlowCard>
      <h2 className="text-lg font-bold text-text-primary mb-5">Personal Information</h2>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-text-muted font-medium">Full Name</label>
          <input
            type="text"
            value={isEditing ? editName : user.name}
            readOnly={!isEditing}
            onChange={(e) => onNameChange(e.target.value)}
            className={inputClass(isEditing)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-text-muted font-medium">Email</label>
            <div className="mt-1.5 px-4 py-3 rounded-lg bg-surface-800 border border-brand-indigo-500/10 text-text-secondary text-sm flex items-center gap-2">
              <Mail size={14} className="text-brand-indigo-400 shrink-0" />
              {user.email}
            </div>
          </div>
          <div>
            <label className="text-xs text-text-muted font-medium">Phone</label>
            <input
              type="text"
              value={isEditing ? editPhone : user.phone || '—'}
              readOnly={!isEditing}
              onChange={(e) => onPhoneChange(e.target.value)}
              className={inputClass(isEditing)}
            />
          </div>
        </div>

        <div>
          <label className="text-xs text-text-muted font-medium">Location</label>
          {isEditing ? (
            <input
              type="text"
              value={editLocation}
              placeholder="City, Country"
              onChange={(e) => onLocationChange(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-lg bg-surface-800 border border-brand-indigo-500/40 focus:border-brand-indigo-500/70 text-text-primary text-sm focus:outline-none transition"
            />
          ) : (
            <div className="mt-1.5 px-4 py-3 rounded-lg bg-surface-800 border border-brand-indigo-500/10 text-text-secondary text-sm flex items-center gap-2">
              <MapPin size={14} className="text-brand-purple-400 shrink-0" />
              {user.location || 'Not set'}
            </div>
          )}
        </div>

        <div>
          <label className="text-xs text-text-muted font-medium">Bio</label>
          <textarea
            readOnly={!isEditing}
            rows={3}
            value={isEditing ? editBio : user.bio || ''}
            onChange={(e) => onBioChange(e.target.value)}
            placeholder={isEditing ? 'Tell us about yourself...' : 'No bio yet'}
            className={`${inputClass(isEditing)} resize-none`}
          />
        </div>

        {isEditing && (
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 py-3 rounded-lg border border-surface-600 text-text-secondary hover:bg-surface-800 text-sm font-medium transition"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={saveLoading}
              className="flex-1 py-3 rounded-lg bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-sm font-semibold transition disabled:opacity-60"
            >
              {saveLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>
    </GlowCard>
  );
}
