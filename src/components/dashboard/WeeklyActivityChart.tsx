import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import Card from '../common/Card';

interface DayCount {
  label: string;
  count: number;
}

export default function WeeklyActivityChart({ days }: { days: DayCount[] }) {
  const max = Math.max(1, ...days.map((d) => d.count));

  return (
    <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
      <div className="mb-4 flex items-center gap-2">
        <Activity className="h-4 w-4 text-[var(--color-cyan)]" />
        <h3 className="font-[var(--font-display)] text-base font-semibold">Weekly Activity</h3>
      </div>
      <div className="flex h-28 items-end justify-between gap-2">
        {days.map((day, i) => (
          <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex h-20 w-full items-end justify-center">
              <motion.div
                className="w-full max-w-[22px] rounded-t-md bg-gradient-to-t from-[var(--color-violet)]/70 to-[var(--color-cyan)]/70"
                initial={{ height: 0 }}
                animate={{ height: `${(day.count / max) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                style={{ minHeight: day.count > 0 ? 4 : 0 }}
              />
            </div>
            <span className="text-[10px] text-[var(--color-faint)]">{day.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-[var(--color-muted)]">Resumes uploaded per day, last 7 days.</p>
    </Card>
  );
}
