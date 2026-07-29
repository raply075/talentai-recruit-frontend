/**
 * Raw shape returned directly by the Laravel API (snake_case).
 * Only api/auth.ts should ever see this type.
 */
export interface ApiUser {
  id: number;
  name: string;
  email: string;
  avatar_url?: string | null;
  job_title?: string | null;
  created_at: string;
  updated_at?: string | null;
}

/** Raw `{ token, user }` payload as returned by /login and /register. */
export interface ApiAuthResponse {
  token: string;
  user: ApiUser;
}

/**
 * Frontend domain model (camelCase).
 * Every component and hook in the app works with this shape only —
 * never with ApiUser directly.
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  jobTitle?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

/** Frontend-facing auth result, already mapped to domain models. */
export interface AuthResponse {
  token: string;
  user: User;
}
