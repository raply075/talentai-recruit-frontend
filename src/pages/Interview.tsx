import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessagesSquare, RotateCcw } from 'lucide-react';
import toast from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';
import InterviewForm from '../components/interview/InterviewForm';
import InterviewCard from '../components/interview/InterviewCard';
import LoadingInterview from '../components/interview/LoadingInterview';
import EmptyState from '../components/common/EmptyState';
import Button from '../components/common/Button';
import { useResumeList } from '../hooks/useResume';
import { useInterviewGenerate } from '../hooks/useInterview';
import type { GenerateInterviewPayload, InterviewQuestion } from '../types/interview';

export default function InterviewPage() {
  const { resumes, isLoading: resumesLoading } = useResumeList();
  const { generate, isGenerating } = useInterviewGenerate();
  const [questions, setQuestions] = useState<InterviewQuestion[] | null>(null);

  const handleGenerate = async (payload: GenerateInterviewPayload) => {
    try {
      const result = await generate(payload);
      setQuestions(result);
      toast.success('Interview questions generated');
    } catch {
      toast.error('Could not generate interview questions. Please try again.');
    }
  };

  const hasResult = !isGenerating && questions !== null;

  return (
    <MainLayout>
      <div className={`mx-auto flex flex-col gap-6 ${hasResult ? 'max-w-3xl' : 'max-w-2xl'}`}>
        <div className="text-center">
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">AI Interview</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Generate practice interview questions from one of your analyzed resumes.
          </p>
        </div>

        {!questions && (
          <InterviewForm
            resumes={resumes}
            resumesLoading={resumesLoading}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
          />
        )}

        {isGenerating && <LoadingInterview />}

        {!isGenerating && questions && questions.length === 0 && (
          <div className="glass rounded-2xl">
            <EmptyState
              icon={MessagesSquare}
              title="No questions were generated"
              description="Try again with a different position or difficulty."
              action={
                <Button size="sm" icon={<RotateCcw className="h-3.5 w-3.5" />} onClick={() => setQuestions(null)}>
                  Try Again
                </Button>
              }
            />
          </div>
        )}

        {!isGenerating && questions && questions.length > 0 && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-between"
            >
              <p className="text-sm text-[var(--color-muted)]">
                {questions.length} question{questions.length === 1 ? '' : 's'} generated
              </p>
              <Button
                variant="ghost"
                size="sm"
                icon={<RotateCcw className="h-3.5 w-3.5" />}
                onClick={() => setQuestions(null)}
              >
                Generate Again
              </Button>
            </motion.div>

            <div className="flex flex-col gap-4">
              {questions.map((question, index) => (
                <InterviewCard key={index} question={question} index={index} />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
