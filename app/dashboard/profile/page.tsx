'use client';

import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { useProfileEditForm } from '@/lib/profile/useProfileEditForm';
import { useAvatarUpload } from '@/lib/profile/useAvatarUpload';
import { useChangePasswordForm } from '@/lib/profile/useChangePasswordForm';
import { usePreferencesToggle } from '@/lib/profile/usePreferencesToggle';
import { computeProfileStats } from '@/lib/profile/computeProfileStats';
import DeleteAccountModal from './_components/DeleteAccountModal';
import ProfileHeroSection from './_components/ProfileHeroSection';
import PersonalInfoCard from './_components/PersonalInfoCard';
import ChangePasswordCard from './_components/ChangePasswordCard';
import LearningStatsCard from './_components/LearningStatsCard';
import PreferencesCard from './_components/PreferencesCard';
import DangerZoneCard from './_components/DangerZoneCard';

/**
 * /dashboard/profile — full account management page. Composes section
 * components; all form/state logic is delegated to dedicated hooks in
 * lib/profile/.
 */
export default function ProfilePage() {
  const { user, logout, deleteAccount } = useAuth();
  const { enrolledCourses } = useCourses();

  const editForm = useProfileEditForm();
  const avatarUpload = useAvatarUpload();
  const passwordForm = useChangePasswordForm();
  const { prefError, handlePrefChange } = usePreferencesToggle();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pwVisibility, setPwVisibility] = useState({ current: false, new: false, confirm: false });
  const avatarInputRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const stats = computeProfileStats(enrolledCourses);

  return (
    <>
      {showDeleteModal && (
        <DeleteAccountModal onClose={() => setShowDeleteModal(false)} onConfirm={deleteAccount} />
      )}

      <div className="space-y-6">
        <ProfileHeroSection
          user={user}
          isEditing={editForm.isEditing}
          saveLoading={editForm.saveLoading}
          saveSuccess={editForm.saveSuccess}
          saveError={editForm.saveError}
          avatarLoading={avatarUpload.avatarLoading}
          avatarError={avatarUpload.avatarError}
          onStartEditing={editForm.startEditing}
          onSaveProfile={editForm.handleSaveProfile}
          onLogout={logout}
          onAvatarButtonClick={() => avatarInputRef.current?.click()}
          onAvatarFileChange={avatarUpload.handleAvatarChange}
          avatarInputRef={avatarInputRef}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <PersonalInfoCard
              user={user}
              isEditing={editForm.isEditing}
              editName={editForm.editName}
              onNameChange={editForm.setEditName}
              editPhone={editForm.editPhone}
              onPhoneChange={editForm.setEditPhone}
              editLocation={editForm.editLocation}
              onLocationChange={editForm.setEditLocation}
              editBio={editForm.editBio}
              onBioChange={editForm.setEditBio}
              saveLoading={editForm.saveLoading}
              onCancel={editForm.cancelEditing}
              onSave={editForm.handleSaveProfile}
            />

            <ChangePasswordCard
              pwForm={passwordForm.pwForm}
              onFieldChange={passwordForm.setField}
              pwError={passwordForm.pwError}
              pwSuccess={passwordForm.pwSuccess}
              pwLoading={passwordForm.pwLoading}
              onSubmit={passwordForm.handlePasswordSubmit}
              visibility={pwVisibility}
              onToggleVisibility={(key) => setPwVisibility((v) => ({ ...v, [key]: !v[key] }))}
            />
          </div>

          <div className="space-y-4">
            <LearningStatsCard stats={stats} />
            <PreferencesCard
              preferences={user.preferences}
              prefError={prefError}
              onToggle={(key, value) => handlePrefChange(user.preferences, key, value)}
            />
            <DangerZoneCard onDeleteClick={() => setShowDeleteModal(true)} />
          </div>
        </div>
      </div>
    </>
  );
}
