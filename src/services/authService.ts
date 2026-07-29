import { loginRequest, registerRequest, logoutRequest, fetchCurrentUser } from '../api/auth';
import { mapUserFromApi } from '../utils/mappers';
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from '../utils/constants';
import type { ApiAuthResponse, LoginPayload, RegisterPayload, User } from '../types/auth';

/**
 * Mapping happens exclusively here. api/auth.ts returns raw
 * ApiUser/ApiAuthResponse; every function below returns the
 * frontend User domain model, and everything stored in
 * localStorage is already-mapped, camelCase User data.
 */

function persistSession(auth: ApiAuthResponse): User {
  const user = mapUserFromApi(auth.user);
  localStorage.setItem(TOKEN_STORAGE_KEY, auth.token);
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  return user;
}

export const authService = {
  async login(payload: LoginPayload): Promise<User> {
    const auth = await loginRequest(payload);
    return persistSession(auth);
  },

  async register(payload: RegisterPayload): Promise<User> {
    const auth = await registerRequest(payload);
    return persistSession(auth);
  },

  async logout(): Promise<void> {
    try {
      await logoutRequest();
    } finally {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  },

  async getCurrentUser(): Promise<User> {
    const apiUser = await fetchCurrentUser();
    const user = mapUserFromApi(apiUser);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  getStoredUser(): User | null {
    const raw = localStorage.getItem(USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem(TOKEN_STORAGE_KEY));
  },
};
