import { motion } from 'framer-motion';
import { ListChecks } from 'lucide-react';
import Card from '../common/Card';

export default function CompletionCard({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));

  return (
    <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>
      <div className="mb-3 flex items-center gap-2">
        <ListChecks className="h-4 w-4 text-[var(--color-violet)]" />
        <h3 className="font-[var(--font-display)] text-base font-semibold">Resume Completion</h3>
      </div>
      <div className="flex items-baseline justify-between">
        <p className="font-[var(--font-mono)] text-2xl font-semibold">{clamped}%</p>
      </div>
      <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)] shadow-[0_0_12px_rgba(124,92,252,0.6)]"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
      <p className="mt-2.5 text-xs text-[var(--color-muted)]">
        Based on how many sections of your latest resume are filled in.
      </p>
    </Card>
  );
}
