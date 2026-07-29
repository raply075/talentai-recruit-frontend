/**
 * Raw shape returned by the profile endpoints (snake_case).
 *
 * The backend is intentionally NOT modified for this feature, and its
 * two read shapes are not identical:
 *  - GET  /profile          (ProfileController::me)     returns avatar_url
 *    but no created_at/updated_at.
 *  - PUT  /profile          (ProfileController::update)  returns the raw
 *    `$user->fresh()` model — created_at/updated_at but NO avatar_url.
 *  - POST /profile/avatar   (ProfileController::uploadAvatar) returns only
 *    { avatar, avatar_url }.
 *
 * Every field below is therefore optional except the three that both
 * shapes always carry (id, name, email). Only api/profile.ts should ever
 * import this type — everything else works with UserProfile.
 */
export interface ApiProfile {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  avatar_url?: string | null;
  job_title?: string | null;
  bio?: string | null;
  location?: string | null;
  linkedin_url?: string | null;
  github_url?: string | null;
  website?: string | null;
  created_at?: string;
  updated_at?: string | null;
}

/** Raw `{ avatar, avatar_url }` payload returned by POST /profile/avatar. */
export interface ApiAvatarResponse {
  avatar: string;
  avatar_url: string;
}

/**
 * Frontend domain model (camelCase). This is the ONLY profile shape
 * components/hooks should ever read or render.
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  avatarUrl: string | null;
  jobTitle: string | null;
  bio: string | null;
  location: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  website: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

/** Payload the Personal Information form collects for PUT /profile. */
export interface UpdateProfilePayload {
  name: string;
  jobTitle?: string;
  bio?: string;
  location?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  website?: string;
}

/** Payload the Security form collects for PUT /profile/password. */
export interface ChangePasswordPayload {
  currentPassword: string;
  password: string;
  passwordConfirmation: string;
}
