import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, Sparkles, Lightbulb } from 'lucide-react';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import { scoreToColor, scoreToLabel } from '../../utils/helpers';
import type { CareerLevel } from '../../types/resume';

interface InsightsCardProps {
  careerLevel: CareerLevel;
  atsScore: number;
  topSkills: string[];
  improvementCount: number;
}

export default function InsightsCard({ careerLevel, atsScore, topSkills, improvementCount }: InsightsCardProps) {
  const hasData = careerLevel !== 'Unknown' || topSkills.length > 0;

  return (
    <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)]">
          <BrainCircuit className="h-4 w-4 text-white" />
        </div>
        <h3 className="font-[var(--font-display)] text-base font-semibold">AI Career Insights</h3>
      </div>

      {!hasData ? (
        <EmptyState
          icon={Sparkles}
          title="No insights yet"
          description="Upload a resume to unlock AI-powered career insights."
          compact
        />
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-faint)]">Career Level</p>
            <p className="mt-1 font-[var(--font-display)] text-lg font-semibold">{careerLevel}</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
            <p className="text-[10px] font-medium uppercase tracking-wide text-[var(--color-faint)]">Resume Quality</p>
            <p className="mt-1 font-[var(--font-display)] text-lg font-semibold" style={{ color: scoreToColor(atsScore) }}>
              {scoreToLabel(atsScore)}
            </p>
          </div>
          <div className="col-span-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
            <p className="mb-2 flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-wide text-[var(--color-faint)]">
              <TrendingUp className="h-3 w-3" /> Top Skills
            </p>
            {topSkills.length === 0 ? (
              <p className="text-xs text-[var(--color-faint)]">No skills detected yet.</p>
            ) : (
              <div className="flex flex-wrap gap-1.5">
                {topSkills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.04 * i }}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-[var(--color-ink)]"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-2 flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
            <Lightbulb className="h-3.5 w-3.5 shrink-0 text-[var(--color-warning)]" />
            <p className="text-xs text-[var(--color-muted)]">
              <span className="font-semibold text-[var(--color-ink)]">{improvementCount}</span>{' '}
              improvement{improvementCount === 1 ? '' : 's'} suggested for your latest resume.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
