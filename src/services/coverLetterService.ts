import { generateCoverLetter } from '../api/coverLetter';
import type { ApiCoverLetter, CoverLetter, CoverLetterTone, GenerateCoverLetterPayload } from '../types/coverLetter';

const COVER_LETTER_TONES: readonly CoverLetterTone[] = ['professional', 'friendly', 'formal', 'confident'];

function toCoverLetterTone(value: string): CoverLetterTone {
  return (COVER_LETTER_TONES as readonly string[]).includes(value) ? (value as CoverLetterTone) : 'professional';
}

/**
 * Mapping happens exclusively here (kept local to this service rather
 * than utils/mappers.ts, which is scoped to the Resume feature).
 * api/coverLetter.ts returns raw ApiCoverLetter; this is the only
 * place ApiCoverLetter -> CoverLetter conversion happens.
 */
function mapCoverLetterFromApi(apiCoverLetter: ApiCoverLetter): CoverLetter {
  return {
    id: String(apiCoverLetter.id),
    resumeId: String(apiCoverLetter.resume_id),
    company: apiCoverLetter.company,
    position: apiCoverLetter.position,
    tone: toCoverLetterTone(apiCoverLetter.tone),
    content: apiCoverLetter.content,
    createdAt: apiCoverLetter.created_at,
  };
}

export const coverLetterService = {
  async generate(payload: GenerateCoverLetterPayload): Promise<CoverLetter> {
    const apiCoverLetter = await generateCoverLetter({
      resume_id: Number(payload.resumeId),
      company: payload.company,
      position: payload.position,
      tone: payload.tone,
    });
    return mapCoverLetterFromApi(apiCoverLetter);
  },
};
