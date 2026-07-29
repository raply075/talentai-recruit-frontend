import { generateInterview } from '../api/interview';
import type {
  ApiInterviewQuestion,
  GenerateInterviewPayload,
  InterviewDifficulty,
  InterviewQuestion,
} from '../types/interview';

const INTERVIEW_DIFFICULTIES: readonly InterviewDifficulty[] = ['easy', 'medium', 'hard'];

function toInterviewDifficulty(value: string): InterviewDifficulty {
  return (INTERVIEW_DIFFICULTIES as readonly string[]).includes(value)
    ? (value as InterviewDifficulty)
    : 'medium';
}

/**
 * Mapping happens exclusively here (kept local to this service, same
 * decision as coverLetterService.ts, rather than utils/mappers.ts
 * which is scoped to the Resume feature). api/interview.ts returns
 * raw ApiInterviewQuestion[]; this is the only place
 * ApiInterviewQuestion -> InterviewQuestion conversion happens.
 */
function mapQuestionFromApi(apiQuestion: ApiInterviewQuestion): InterviewQuestion {
  return {
    question: apiQuestion.question,
    sampleAnswer: apiQuestion.sample_answer,
    tips: apiQuestion.tips,
  };
}

export const interviewService = {
  async generate(payload: GenerateInterviewPayload): Promise<InterviewQuestion[]> {
    const response = await generateInterview({
      resume_id: Number(payload.resumeId),
      position: payload.position,
      difficulty: toInterviewDifficulty(payload.difficulty),
      question_count: payload.questionCount,
    });
    return response.questions.map(mapQuestionFromApi);
  },
};
