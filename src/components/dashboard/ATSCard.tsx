import { motion } from 'framer-motion';
import Card from '../common/Card';
import { scoreToColor, scoreToLabel } from '../../utils/helpers';

interface ScoreRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ScoreRing({ score, size = 128, strokeWidth = 10 }: ScoreRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = scoreToColor(score);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none stroke-white/[0.06]"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          stroke={color}
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-[var(--font-mono)] text-2xl font-semibold">{score}</span>
        <span className="text-[10px] uppercase tracking-wider text-[var(--color-faint)]">/ 100</span>
      </div>
    </div>
  );
}

interface ATSCardProps {
  score: number;
  targetRole?: string;
}

export default function ATSCard({ score, targetRole }: ATSCardProps) {
  return (
    <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <h3 className="mb-1 font-[var(--font-display)] text-base font-semibold">ATS Score</h3>
      <p className="mb-5 text-sm text-[var(--color-muted)]">
        {targetRole ? `Match for ${targetRole}` : 'Overall resume compatibility'}
      </p>
      <div className="flex items-center justify-center">
        <ScoreRing score={score} />
      </div>
      <p className="mt-5 text-center text-sm font-medium" style={{ color: scoreToColor(score) }}>
        {scoreToLabel(score)}
      </p>
    </Card>
  );
}
