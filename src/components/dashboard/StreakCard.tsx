import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import Card from '../common/Card';

export default function StreakCard({ days }: { days: number }) {
  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="flex flex-col items-center justify-center text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-warning)]/25 to-[var(--color-danger)]/10"
      >
        <Flame className="h-6 w-6 text-[var(--color-warning)]" />
      </motion.div>
      <p className="mt-3 font-[var(--font-mono)] text-2xl font-semibold">{days}</p>
      <p className="text-xs text-[var(--color-muted)]">Day{days === 1 ? '' : 's'} active streak</p>
      <p className="mt-1 text-[10px] text-[var(--color-faint)]">Based on your resume upload activity</p>
    </Card>
  );
}
