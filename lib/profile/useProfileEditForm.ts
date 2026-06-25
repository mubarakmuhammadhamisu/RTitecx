'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

/**
 * lib/profile/useProfileEditForm.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the personal-info edit form's state machine —
 * editing mode toggle, field values, save/error/success state. Extracted
 * from the page component so the page only orchestrates UI, not form logic.
 */
export function useProfileEditForm() {
  const { user, updateProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editBio, setEditBio] = useState('');
  const [editLocation, setEditLocation] = useState('');
  const [saveLoading, setSaveLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');

  const startEditing = () => {
    if (!user) return;
    setEditName(user.name);
    setEditPhone(user.phone);
    setEditBio(user.bio);
    setEditLocation(user.location);
    setSaveSuccess(false);
    setSaveError('');
    setIsEditing(true);
  };

  const cancelEditing = () => setIsEditing(false);

  const handleSaveProfile = async () => {
    setSaveLoading(true);
    setSaveError('');
    const result = await updateProfile({
      name: editName.trim(),
      phone: editPhone.trim(),
      bio: editBio.trim(),
      location: editLocation.trim(),
    });
    setSaveLoading(false);
    if (result.error) {
      setSaveError(result.error);
    } else {
      setSaveSuccess(true);
      setIsEditing(false);
    }
  };

  return {
    isEditing,
    editName,
    setEditName,
    editPhone,
    setEditPhone,
    editBio,
    setEditBio,
    editLocation,
    setEditLocation,
    saveLoading,
    saveSuccess,
    saveError,
    startEditing,
    cancelEditing,
    handleSaveProfile,
  };
}
