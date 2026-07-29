import apiClient, { type ApiEnvelope } from './axios';
import type { ApiCoverLetter, CoverLetterTone } from '../types/coverLetter';

/**
 * HTTP layer only. No mapping, no camelCase conversion — returns
 * exactly what Laravel sends (minus the {success, message} envelope).
 * Transformation into the frontend domain model happens in
 * services/coverLetterService.ts.
 *
 * Endpoint: POST /cover-letters/generate (CoverLetterController::generate)
 * Existing endpoint — not created or modified for this feature.
 */
export async function generateCoverLetter(payload: {
  resume_id: number;
  company: string;
  position: string;
  tone: CoverLetterTone;
}): Promise<ApiCoverLetter> {
  const response = await apiClient.post<ApiEnvelope<ApiCoverLetter>>(
    '/cover-letters/generate',
    payload
  );
  return response.data.data;
}
