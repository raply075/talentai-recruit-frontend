import apiClient, { type ApiEnvelope } from './axios';
import type { ApiAuthResponse, ApiUser, LoginPayload, RegisterPayload } from '../types/auth';

/**
 * HTTP layer only. No mapping, no camelCase conversion — this file
 * returns exactly what Laravel sends (minus the {success, message}
 * envelope). Transformation into frontend domain models happens in
 * services/authService.ts via utils/mappers.ts.
 */

export async function loginRequest(payload: LoginPayload): Promise<ApiAuthResponse> {
  const response = await apiClient.post<ApiEnvelope<ApiAuthResponse>>('/login', payload, {
    suppressErrorToast: true,
  });
  return response.data.data;
}

export async function registerRequest(payload: RegisterPayload): Promise<ApiAuthResponse> {
  const response = await apiClient.post<ApiEnvelope<ApiAuthResponse>>(
    '/register',
    {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      // Laravel's `confirmed` validation rule expects this exact key.
      password_confirmation: payload.passwordConfirmation,
    },
    { suppressErrorToast: true }
  );
  return response.data.data;
}

export async function logoutRequest(): Promise<void> {
  await apiClient.post<ApiEnvelope<null>>('/logout');
}

export async function fetchCurrentUser(): Promise<ApiUser> {
  const response = await apiClient.get<ApiEnvelope<ApiUser>>('/me');
  return response.data.data;
}
