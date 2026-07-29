import {
  fetchProfile,
  updateProfileRequest,
  uploadAvatarRequest,
  deleteAvatarRequest,
  changePasswordRequest,
} from '../api/profile';
import { mapProfileFromApi } from '../utils/mappers';
import type { ChangePasswordPayload, UpdateProfilePayload, UserProfile } from '../types/profile';
import type { UploadProgressEvent } from '../types/resume';

/**
 * Mapping happens exclusively here. api/profile.ts returns raw
 * ApiProfile/ApiAvatarResponse; every function below returns the
 * frontend UserProfile domain model. Components never see ApiProfile.
 *
 * `update` and `uploadAvatar` merge the backend response into the
 * previously known profile: PUT /profile never returns avatar_url and
 * POST /profile/avatar only ever returns { avatar, avatar_url } —
 * merging keeps whichever fields a given response doesn't carry.
 */
export const profileService = {
  async get(): Promise<UserProfile> {
    const apiProfile = await fetchProfile();
    return mapProfileFromApi(apiProfile);
  },

  async update(previous: UserProfile, payload: UpdateProfilePayload): Promise<UserProfile> {
    const apiProfile = await updateProfileRequest(payload);
    const mapped = mapProfileFromApi(apiProfile);
    return {
      ...previous,
      ...mapped,
      avatar: mapped.avatar ?? previous.avatar,
      avatarUrl: mapped.avatarUrl ?? previous.avatarUrl,
      createdAt: mapped.createdAt ?? previous.createdAt,
    };
  },

  async uploadAvatar(
    previous: UserProfile,
    file: File,
    onProgress?: (e: UploadProgressEvent) => void,
  ): Promise<UserProfile> {
    const { avatar, avatar_url: avatarUrl } = await uploadAvatarRequest(file, onProgress);
    return { ...previous, avatar, avatarUrl };
  },

  async deleteAvatar(previous: UserProfile): Promise<UserProfile> {
    await deleteAvatarRequest();
    return { ...previous, avatar: null, avatarUrl: null };
  },

  changePassword(payload: ChangePasswordPayload): Promise<void> {
    return changePasswordRequest({
      current_password: payload.currentPassword,
      password: payload.password,
      password_confirmation: payload.passwordConfirmation,
    });
  },
};
