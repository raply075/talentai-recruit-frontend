import { useState, type FormEvent } from 'react';
import { Building2, Briefcase, FileText, Wand2 } from 'lucide-react';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import { cn } from '../../utils/helpers';
import type { Resume } from '../../types/resume';
import type { CoverLetterTone, GenerateCoverLetterPayload } from '../../types/coverLetter';

interface CoverLetterFormProps {
  resumes: Resume[];
  resumesLoading: boolean;
  isGenerating: boolean;
  onGenerate: (payload: GenerateCoverLetterPayload) => void;
}

const TONE_OPTIONS: { value: CoverLetterTone; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'confident', label: 'Confident' },
];

const selectClassName = cn(
  'focus-ring h-11 w-full rounded-xl border border-[var(--color-border)] bg-white/[0.03] px-4 text-sm text-[var(--color-ink)] transition-colors',
  'hover:border-white/20 focus:border-[var(--color-violet)]/60',
  'disabled:cursor-not-allowed disabled:opacity-50'
);

export default function CoverLetterForm({
  resumes,
  resumesLoading,
  isGenerating,
  onGenerate,
}: CoverLetterFormProps) {
  const [resumeId, setResumeId] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [tone, setTone] = useState<CoverLetterTone>('professional');
  const [errors, setErrors] = useState<{ resumeId?: string; company?: string; position?: string }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const nextErrors: typeof errors = {};
    if (!resumeId) nextErrors.resumeId = 'Select a resume';
    if (!company.trim()) nextErrors.company = 'Company name is required';
    if (!position.trim()) nextErrors.position = 'Position is required';
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    onGenerate({ resumeId, company: company.trim(), position: position.trim(), tone });
  };

  return (
    <Card initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="cover-letter-resume" className="mb-1.5 block text-sm font-medium text-[var(--color-muted)]">
            Resume
          </label>
          <div className="relative">
            <FileText aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-faint)]" />
            <select
              id="cover-letter-resume"
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              disabled={resumesLoading || isGenerating}
              className={cn(selectClassName, 'appearance-none pl-10')}
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
              Upload a resume first to generate a cover letter.
            </p>
          )}
          {errors.resumeId && <p className="mt-1.5 text-xs text-[var(--color-danger)]">{errors.resumeId}</p>}
        </div>

        <Input
          label="Company"
          icon={<Building2 className="h-4 w-4" />}
          placeholder="e.g. Acme Corp"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          error={errors.company}
          disabled={isGenerating}
        />

        <Input
          label="Position"
          icon={<Briefcase className="h-4 w-4" />}
          placeholder="e.g. Frontend Engineer"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          error={errors.position}
          disabled={isGenerating}
        />

        <div>
          <label htmlFor="cover-letter-tone" className="mb-1.5 block text-sm font-medium text-[var(--color-muted)]">
            Tone
          </label>
          <select
            id="cover-letter-tone"
            value={tone}
            onChange={(e) => setTone(e.target.value as CoverLetterTone)}
            disabled={isGenerating}
            className={selectClassName}
          >
            {TONE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <Button type="submit" fullWidth isLoading={isGenerating} icon={<Wand2 aria-hidden="true" className="h-4 w-4" />} className="mt-2">
          Generate Cover Letter
        </Button>
      </form>
    </Card>
  );
}
