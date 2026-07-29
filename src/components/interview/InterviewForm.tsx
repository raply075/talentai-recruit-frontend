import { useState, type FormEvent } from 'react';
import { Briefcase, FileText, Gauge, ListOrdered, Wand2 } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { cn, NATIVE_SELECT_CLASSNAME } from '../../utils/helpers';
import type { Resume } from '../../types/resume';
import type { GenerateInterviewPayload, InterviewDifficulty } from '../../types/interview';

interface InterviewFormProps {
  resumes: Resume[];
  resumesLoading: boolean;
  isGenerating: boolean;
  onGenerate: (payload: GenerateInterviewPayload) => void;
}

const DIFFICULTY_OPTIONS: { value: InterviewDifficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

const MIN_QUESTIONS = 5;
const MAX_QUESTIONS = 20;

export default function InterviewForm({
  resumes,
  resumesLoading,
  isGenerating,
  onGenerate,
}: InterviewFormProps) {
  const [resumeId, setResumeId] = useState('');
  const [position, setPosition] = useState('');
  const [difficulty, setDifficulty] = useState<InterviewDifficulty>('medium');
  const [questionCount, setQuestionCount] = useState(10);
  const [errors, setErrors] = useState<{ resumeId?: string; position?: string; questionCount?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!resumeId) nextErrors.resumeId = 'Select a resume';
    if (!position.trim()) nextErrors.position = 'Position is required';
    if (questionCount < MIN_QUESTIONS || questionCount > MAX_QUESTIONS) {
      nextErrors.questionCount = `Must be between ${MIN_QUESTIONS} and ${MAX_QUESTIONS}`;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onGenerate({ resumeId, position: position.trim(), difficulty, questionCount });
  };

  return (
    <Card initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="interview-resume" className="mb-1.5 block text-sm font-medium text-[var(--color-muted)]">
            Resume
          </label>
          <div className="relative">
            <FileText aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-faint)]" />
            <select
              id="interview-resume"
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              disabled={resumesLoading || isGenerating}
              className={cn(NATIVE_SELECT_CLASSNAME, 'appearance-none pl-10')}
            >
              <option value="" disabled>
                {resumesLoading ? 'Loading resumes…' : 'Select a resume'}
              </option>
              {resumes.map((resume) => (
                <option key={resume.id} value={resume.id}>
                  {resume.fileName}
                </option>
              ))}
            </select>
          </div>
          {!resumesLoading && resumes.length === 0 && (
            <p className="mt-1.5 text-xs text-[var(--color-faint)]">
              Upload a resume first to generate interview questions.
            </p>
          )}
          {errors.resumeId && <p className="mt-1.5 text-xs text-[var(--color-danger)]">{errors.resumeId}</p>}
        </div>

        <Input
          label="Position"
          icon={<Briefcase className="h-4 w-4" />}
          placeholder="e.g. Frontend Engineer"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          error={errors.position}
          disabled={isGenerating}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="interview-difficulty" className="mb-1.5 block text-sm font-medium text-[var(--color-muted)]">
              Difficulty
            </label>
            <div className="relative">
              <Gauge aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-faint)]" />
              <select
                id="interview-difficulty"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as InterviewDifficulty)}
                disabled={isGenerating}
                className={cn(NATIVE_SELECT_CLASSNAME, 'appearance-none pl-10')}
              >
                {DIFFICULTY_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <Input
            label="Question Count"
            type="number"
            icon={<ListOrdered className="h-4 w-4" />}
            min={MIN_QUESTIONS}
            max={MAX_QUESTIONS}
            value={questionCount}
            onChange={(e) => setQuestionCount(Number(e.target.value))}
            error={errors.questionCount}
            disabled={isGenerating}
          />
        </div>

        <Button type="submit" fullWidth isLoading={isGenerating} icon={<Wand2 aria-hidden="true" className="h-4 w-4" />} className="mt-2">
          Generate Interview
        </Button>
      </form>
    </Card>
  );
}
