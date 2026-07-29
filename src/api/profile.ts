import apiClient, { type ApiEnvelope } from './axios';
import type { ApiAvatarResponse, ApiProfile, UpdateProfilePayload } from '../types/profile';
import type { UploadProgressEvent } from '../types/resume';

/**
 * HTTP layer only. No mapping, no camelCase conversion — this file
 * returns exactly what Laravel sends (minus the {success, message}
 * envelope). Transformation into the frontend UserProfile domain
 * model happens in services/profileService.ts via utils/mappers.ts.
 *
 * All five endpoints already exist on the backend and are used as-is:
 * GET /profile, PUT /profile, POST /profile/avatar, DELETE /profile/avatar,
 * PUT /profile/password.
 */

export async function fetchProfile(): Promise<ApiProfile> {
  const response = await apiClient.get<ApiEnvelope<ApiProfile>>('/profile');
  return response.data.data;
}

export async function updateProfileRequest(payload: UpdateProfilePayload): Promise<ApiProfile> {
  const response = await apiClient.put<ApiEnvelope<ApiProfile>>('/profile', {
    name: payload.name,
    job_title: payload.jobTitle || null,
    bio: payload.bio || null,
    location: payload.location || null,
    linkedin_url: payload.linkedinUrl || null,
    github_url: payload.githubUrl || null,
    website: payload.website || null,
  });
  return response.data.data;
}

export async function uploadAvatarRequest(
  file: File,
  onProgress?: (event: UploadProgressEvent) => void,
): Promise<ApiAvatarResponse> {
  const formData = new FormData();
  formData.append('avatar', file);

  const response = await apiClient.post<ApiEnvelope<ApiAvatarResponse>>(
    '/profile/avatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (evt) => {
        if (onProgress && evt.total) {
          onProgress({ loaded: evt.loaded, total: evt.total });
        }
      },
    },
  );

  return response.data.data;
}

export async function deleteAvatarRequest(): Promise<void> {
  await apiClient.delete<ApiEnvelope<null>>('/profile/avatar');
}

export async function changePasswordRequest(payload: {
  current_password: string;
  password: string;
  password_confirmation: string;
}): Promise<void> {
  await apiClient.put<ApiEnvelope<null>>('/profile/password', payload);
}
