import { useCallback, useState } from 'react';
import { coverLetterService } from '../services/coverLetterService';
import type { CoverLetter, GenerateCoverLetterPayload } from '../types/coverLetter';

/**
 * Mirrors the useResumeUpload() pattern: encapsulates the loading
 * state for a single AI-generation action.
 */
export function useCoverLetterGenerate() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = useCallback(async (payload: GenerateCoverLetterPayload): Promise<CoverLetter> => {
    setIsGenerating(true);
    try {
      return await coverLetterService.generate(payload);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generate, isGenerating };
}
