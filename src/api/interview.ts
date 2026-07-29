import apiClient, { type ApiEnvelope } from './axios';
import type { ApiInterviewResponse, InterviewDifficulty } from '../types/interview';

/**
 * HTTP layer only. No mapping, no camelCase conversion — returns
 * exactly what Laravel sends (minus the {success, message} envelope).
 * Transformation into the frontend domain model happens in
 * services/interviewService.ts.
 *
 * Endpoint: POST /interview/generate (InterviewController::generate)
 * Existing endpoint — not created or modified for this feature.
 */
export async function generateInterview(payload: {
  resume_id: number;
  position: string;
  difficulty: InterviewDifficulty;
  question_count: number;
}): Promise<ApiInterviewResponse> {
  const response = await apiClient.post<ApiEnvelope<ApiInterviewResponse>>(
    '/interview/generate',
    payload
  );
  return response.data.data;
}
