import { useCallback, useEffect, useState } from 'react';
import { profileService } from '../services/profileService';
import { useAuth } from './useAuth';
import type {
  ChangePasswordPayload,
  UpdateProfilePayload,
  UserProfile,
} from '../types/profile';
import type { UploadProgressEvent } from '../types/resume';

export function useProfile() {
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isDeletingAvatar, setIsDeletingAvatar] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [avatarProgress, setAvatarProgress] = useState(0);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await profileService.get();
      setProfile(data);
    } catch {
      setError('Could not load your profile. Try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional initial fetch on mount
    refresh();
  }, [refresh]);

  const update = useCallback(
    async (payload: UpdateProfilePayload) => {
      if (!profile) throw new Error('Profile not loaded yet');
      setIsSaving(true);
      try {
        const updated = await profileService.update(profile, payload);
        setProfile(updated);
        updateUser({ name: updated.name, jobTitle: updated.jobTitle ?? undefined });
        return updated;
      } finally {
        setIsSaving(false);
      }
    },
    [profile, updateUser],
  );

  const uploadAvatar = useCallback(
    async (file: File) => {
      if (!profile) throw new Error('Profile not loaded yet');
      setIsUploadingAvatar(true);
      setAvatarProgress(0);
      try {
        const updated = await profileService.uploadAvatar(profile, file, (e: UploadProgressEvent) => {
          setAvatarProgress(Math.round((e.loaded / e.total) * 100));
        });
        setProfile(updated);
        updateUser({ avatarUrl: updated.avatarUrl ?? undefined });
        return updated;
      } finally {
        setIsUploadingAvatar(false);
      }
    },
    [profile, updateUser],
  );

  const deleteAvatar = useCallback(async () => {
    if (!profile) throw new Error('Profile not loaded yet');
    setIsDeletingAvatar(true);
    try {
      const updated = await profileService.deleteAvatar(profile);
      setProfile(updated);
      updateUser({ avatarUrl: undefined });
      return updated;
    } finally {
      setIsDeletingAvatar(false);
    }
  }, [profile, updateUser]);

  const changePassword = useCallback(async (payload: ChangePasswordPayload) => {
    setIsChangingPassword(true);
    try {
      await profileService.changePassword(payload);
    } finally {
      setIsChangingPassword(false);
    }
  }, []);

  return {
    profile,
    isLoading,
    error,
    refresh,
    update,
    isSaving,
    uploadAvatar,
    isUploadingAvatar,
    avatarProgress,
    deleteAvatar,
    isDeletingAvatar,
    changePassword,
    isChangingPassword,
  };
}
