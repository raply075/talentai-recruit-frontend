import { useState } from 'react';
import toast from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';
import CoverLetterForm from '../components/coverLetter/CoverLetterForm';
import CoverLetterResult from '../components/coverLetter/CoverLetterResult';
import LoadingGenerate from '../components/coverLetter/LoadingGenerate';
import { useResumeList } from '../hooks/useResume';
import { useCoverLetterGenerate } from '../hooks/useCoverLetter';
import type { CoverLetter, GenerateCoverLetterPayload } from '../types/coverLetter';

export default function CoverLetterPage() {
  const { resumes, isLoading: resumesLoading } = useResumeList();
  const { generate, isGenerating } = useCoverLetterGenerate();
  const [result, setResult] = useState<CoverLetter | null>(null);

  const handleGenerate = async (payload: GenerateCoverLetterPayload) => {
    try {
      const coverLetter = await generate(payload);
      setResult(coverLetter);
      toast.success('Cover letter generated');
    } catch {
      toast.error('Could not generate the cover letter. Please try again.');
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <div className="text-center">
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">AI Cover Letter</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Generate a tailored cover letter from one of your analyzed resumes.
          </p>
        </div>

        {!result && (
          <CoverLetterForm
            resumes={resumes}
            resumesLoading={resumesLoading}
            isGenerating={isGenerating}
            onGenerate={handleGenerate}
          />
        )}

        {isGenerating && <LoadingGenerate />}
        {!isGenerating && result && (
          <CoverLetterResult coverLetter={result} onGenerateAgain={() => setResult(null)} />
        )}
      </div>
    </MainLayout>
  );
}
