import type { ApiUser, User } from "../types/auth";
import type { ApiResume, Resume, CareerLevel, ResumeStatus } from "../types/resume";
import type { ApiProfile, UserProfile } from "../types/profile";

const CAREER_LEVELS: readonly CareerLevel[] = ["Intern", "Junior", "Mid", "Senior", "Lead", "Unknown"];
const RESUME_STATUSES: readonly ResumeStatus[] = ["processing", "ready", "failed"];

function toCareerLevel(value: string | null | undefined): CareerLevel {
  return (CAREER_LEVELS as readonly string[]).includes(value ?? "") ? (value as CareerLevel) : "Unknown";
}

function toResumeStatus(value: string | null | undefined): ResumeStatus {
  return (RESUME_STATUSES as readonly string[]).includes(value ?? "") ? (value as ResumeStatus) : "ready";
}

/**
 * ApiUser -> User
 */
export function mapUserFromApi(apiUser: ApiUser): User {
  return {
    id: String(apiUser.id),
    name: apiUser.name,
    email: apiUser.email,
    avatarUrl: apiUser.avatar_url ?? undefined,
    jobTitle: apiUser.job_title ?? undefined,
    createdAt: apiUser.created_at,
    updatedAt: apiUser.updated_at ?? apiUser.created_at,
  };
}

/**
 * ApiResume -> Resume
 *
 * Only reshapes data the backend actually sends (snake_case ->
 * camelCase, string/number coercion for `ats_score`). Never invents
 * fields like `matched`, `weight`, `priority`, or per-item `title`
 * that ResumeAnalysisService / ResumeStructureService do not return.
 */
export function mapResumeFromApi(apiResume: ApiResume): Resume {
  const originalName = apiResume.original_name ?? apiResume.title ?? "Untitled resume";
  const createdAt = apiResume.created_at ?? new Date().toISOString();

  return {
    id: String(apiResume.id),

    title: apiResume.title ?? originalName,
    originalName,

    filePath: apiResume.file_path ?? "",
    fileSize: apiResume.file_size ?? 0,

    atsScore: Number(apiResume.ats_score ?? 0),

    careerLevel: toCareerLevel(apiResume.career_level),
    status: toResumeStatus(apiResume.status),

    createdAt,
    updatedAt: apiResume.updated_at ?? createdAt,

    // Compatibility aliases for the existing UI components.
    fileName: originalName,
    uploadedAt: createdAt,

    // Passed through exactly as the backend sends them — plain
    // strings, no fabricated metadata.
    skills: Array.isArray(apiResume.skills) ? apiResume.skills : [],
    suggestions: Array.isArray(apiResume.suggestions) ? apiResume.suggestions : [],

    structuredResume: apiResume.structured_resume ?? null,

    // Future-ready fields — not sent by the backend today. Safe
    // defaults only, kept on the model per product decision.
    targetRole: "",
    matchedSkills: [],
    keywords: [],
  };
}

/**
 * ApiResume[] -> Resume[]
 */
export function mapResumeList(apiResumes: ApiResume[]): Resume[] {
  return apiResumes.map(mapResumeFromApi);
}

/**
 * ApiProfile -> UserProfile
 *
 * GET /profile and PUT /profile return slightly different field sets
 * (see types/profile.ts for why) — every field here is read
 * defensively so either response shape maps cleanly. profileService
 * merges the result with the previously known profile so fields
 * omitted by a given response (e.g. avatar_url on PUT) don't get
 * wiped out.
 */
export function mapProfileFromApi(apiProfile: ApiProfile): UserProfile {
  return {
    id: String(apiProfile.id),
    name: apiProfile.name,
    email: apiProfile.email,
    avatar: apiProfile.avatar ?? null,
    avatarUrl: apiProfile.avatar_url ?? null,
    jobTitle: apiProfile.job_title ?? null,
    bio: apiProfile.bio ?? null,
    location: apiProfile.location ?? null,
    linkedinUrl: apiProfile.linkedin_url ?? null,
    githubUrl: apiProfile.github_url ?? null,
    website: apiProfile.website ?? null,
    createdAt: apiProfile.created_at ?? null,
    updatedAt: apiProfile.updated_at ?? null,
  };
}
