/**
 * Valid tone values, exactly matching CoverLetterRequest's `in:` rule
 * on the backend (case-sensitive, lowercase). Sending anything else
 * results in a 422 validation error.
 */
export type CoverLetterTone = 'professional' | 'friendly' | 'formal' | 'confident';

/**
 * Raw shape returned directly by the Laravel API (snake_case) — the
 * CoverLetter model as returned by POST /cover-letters/generate.
 * Only api/coverLetter.ts should ever import this type.
 */
export interface ApiCoverLetter {
  id: number;
  user_id: number;
  resume_id: number;
  company: string;
  position: string;
  tone: string;
  content: string;
  created_at: string;
  updated_at: string;
}

/**
 * Frontend domain model (camelCase). This is the ONLY cover letter
 * shape React components should ever import, render, or receive as
 * props.
 */
export interface CoverLetter {
  id: string;
  resumeId: string;
  company: string;
  position: string;
  tone: CoverLetterTone;
  content: string;
  createdAt: string;
}

/** Payload the frontend form collects to request a generation. */
export interface GenerateCoverLetterPayload {
  resumeId: string;
  company: string;
  position: string;
  tone: CoverLetterTone;
}
