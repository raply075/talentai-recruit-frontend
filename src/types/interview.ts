/**
 * Valid difficulty values, exactly matching InterviewRequest's `in:`
 * rule on the backend (case-sensitive, lowercase).
 */
export type InterviewDifficulty = 'easy' | 'medium' | 'hard';

/**
 * Raw shape of a single question returned directly by the Laravel
 * API (InterviewService's AI prompt guarantees these 3 fields).
 * Only api/interview.ts should ever import this type.
 */
export interface ApiInterviewQuestion {
  question: string;
  sample_answer: string;
  tips: string;
}

/** Raw `{ questions: [...] }` payload returned by POST /interview/generate. */
export interface ApiInterviewResponse {
  questions: ApiInterviewQuestion[];
}

/**
 * Frontend domain model (camelCase). This is the ONLY question shape
 * React components should ever import, render, or receive as props.
 */
export interface InterviewQuestion {
  question: string;
  sampleAnswer: string;
  tips: string;
}

/** Payload the frontend form collects to request a generation. */
export interface GenerateInterviewPayload {
  resumeId: string;
  position: string;
  difficulty: InterviewDifficulty;
  questionCount: number;
}
