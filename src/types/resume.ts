export type CareerLevel = "Intern" | "Junior" | "Mid" | "Senior" | "Lead" | "Unknown";
export type ResumeStatus = "processing" | "ready" | "failed";

export interface UploadProgressEvent {
  loaded: number;
  total: number;
}

/**
 * Structured resume produced by ResumeStructureService (AI parser).
 * This shape is dictated entirely by the prompt in the backend and
 * mirrors it field-for-field — do not rename or restructure this.
 */
export interface StructuredResumePersonal {
  name: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  linkedin: string | null;
  github: string | null;
  portfolio: string | null;
}

export interface StructuredResumeEducation {
  degree: string | null;
  institution: string | null;
  period: string | null;
  description: string | null;
}

export interface StructuredResumeExperience {
  position: string | null;
  company: string | null;
  period: string | null;
  description: string | null;
}

export interface StructuredResumeProject {
  name: string | null;
  description: string | null;
  technologies: string[];
  period: string | null;
}

export interface StructuredResumeOrganization {
  name: string | null;
  position: string | null;
  period: string | null;
  description: string | null;
}

export interface StructuredResumeCertification {
  name: string | null;
  issuer: string | null;
  year: string | null;
}

export interface StructuredResumeAchievement {
  title: string | null;
  description: string | null;
  year: string | null;
}

export interface StructuredResume {
  personal: StructuredResumePersonal;
  profile: string | null;
  education: StructuredResumeEducation[];
  experience: StructuredResumeExperience[];
  projects: StructuredResumeProject[];
  skills: string[];
  organizations: StructuredResumeOrganization[];
  certifications: StructuredResumeCertification[];
  achievements: StructuredResumeAchievement[];
}

/**
 * Raw shape returned directly by the Laravel API (snake_case).
 * Only api/resume.ts should ever import this type.
 *
 * Every field besides `id` is optional on purpose: the AI analysis
 * pipeline is still evolving on the backend, and new fields can land
 * there over time without this contract — or the mapper that reads
 * it — ever needing to change in a breaking way.
 *
 * `skills` and `suggestions` are plain string arrays — the backend's
 * AI prompt (ResumeAnalysisService) never returns objects with
 * matched/weight/priority metadata, so this type does not model any.
 */
export interface ApiResume {
  id: number;
  title?: string | null;
  original_name?: string | null;
  file_path?: string | null;
  file_size?: number | null;
  ats_score?: number | string | null;
  career_level?: string | null;
  status?: string | null;
  skills?: string[] | null;
  suggestions?: string[] | null;
  created_at?: string | null;
  updated_at?: string | null;
  structured_resume?: StructuredResume | null;
}

/**
 * Frontend domain model (camelCase). This is the ONLY resume shape
 * React components should ever import, render, or receive as props.
 * The mapper guarantees every field below is always defined — no
 * `undefined` from a not-yet-implemented backend field ever reaches
 * the UI.
 */
export interface Resume {
  id: string;
  title: string;
  originalName: string;
  filePath: string;
  fileSize: number;
  atsScore: number;
  careerLevel: CareerLevel;
  status: ResumeStatus;
  createdAt: string;
  updatedAt: string;

  /**
   * Aliases kept for the existing UI components (ResumeTable,
   * ResumeHistory, ResumeDetail), which read `fileName` / `uploadedAt`.
   * Always mirrors originalName / createdAt — never set independently.
   */
  fileName: string;
  uploadedAt: string;

  /**
   * AI analysis output straight from the backend — plain strings,
   * exactly as ResumeAnalysisService returns them. No matched/weight/
   * priority/title metadata is invented on top of these.
   */
  skills: string[];
  suggestions: string[];

  /**
   * Full structured resume from ResumeStructureService, used as the
   * primary data source for Resume Detail. `null` until the backend
   * sends it.
   */
  structuredResume: StructuredResume | null;

  /**
   * Future-ready fields: not sent by the backend today (confirmed —
   * not merely unfilled), but kept on the model per product decision
   * so that no breaking change is required when the backend adds
   * job-matching support later. Always default to "" / [] via the
   * mapper; no component currently renders these.
   */
  targetRole: string;
  matchedSkills: string[];
  keywords: string[];
}
