import type { CareerLevel } from "../types/resume";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export const TOKEN_STORAGE_KEY = "careerai_token";
export const USER_STORAGE_KEY = "careerai_user";
export const THEME_STORAGE_KEY = "careerai_theme";

// dst...

export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  RESUME: "/resume",
  RESUME_DETAIL: (id: string) => `/resume/${id}`,
  UPLOAD: "/upload",
  COVER_LETTER: "/cover-letter",
  INTERVIEW: "/interview",
  PROFILE: "/profile",
  SETTINGS: "/settings",
} as const;

/**
 * Keyed by the CareerLevel values ResumeAnalysisService actually
 * returns: Intern | Junior | Mid | Senior | Lead | Unknown.
 */
export const CAREER_LEVEL_COLOR: Record<CareerLevel, string> = {
  Intern: "from-sky-400 to-sky-600",
  Junior: "from-emerald-400 to-emerald-600",
  Mid: "from-violet-400 to-violet-600",
  Senior: "from-fuchsia-400 to-fuchsia-600",
  Lead: "from-amber-400 to-amber-600",
  Unknown: "from-slate-400 to-slate-600",
};

export const MAX_UPLOAD_SIZE_MB = 10;
export const ACCEPTED_RESUME_TYPES = [".pdf", ".doc", ".docx"];
