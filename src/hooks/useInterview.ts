import { useCallback, useState } from 'react';
import { interviewService } from '../services/interviewService';
import type { GenerateInterviewPayload, InterviewQuestion } from '../types/interview';

/**
 * Mirrors the useCoverLetterGenerate() pattern: encapsulates the
 * loading state for a single AI-generation action.
 */
export function useInterviewGenerate() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generate = useCallback(async (payload: GenerateInterviewPayload): Promise<InterviewQuestion[]> => {
    setIsGenerating(true);
    try {
      return await interviewService.generate(payload);
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return { generate, isGenerating };
}
