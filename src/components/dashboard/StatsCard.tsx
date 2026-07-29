import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon, TrendingDown, TrendingUp } from 'lucide-react';
import Card from '../common/Card';
import { cn } from '../../utils/helpers';

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  accent?: 'violet' | 'cyan' | 'success' | 'warning';
  delay?: number;
}

const accentMap = {
  violet: 'from-[var(--color-violet)]/20 to-[var(--color-violet)]/5 text-[var(--color-violet)]',
  cyan: 'from-[var(--color-cyan)]/20 to-[var(--color-cyan)]/5 text-[var(--color-cyan)]',
  success: 'from-[var(--color-success)]/20 to-[var(--color-success)]/5 text-[var(--color-success)]',
  warning: 'from-[var(--color-warning)]/20 to-[var(--color-warning)]/5 text-[var(--color-warning)]',
};

/** Counts up from 0 to a numeric value on mount; renders strings as-is. */
function AnimatedValue({ value }: { value: string | number }) {
  if (typeof value !== 'number') return <>{value}</>;
  return <AnimatedNumber value={value} />;
}

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const durationMs = 600;
    const startTime = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <>{display}</>;
}

export default function StatsCard({
  label,
  value,
  icon: Icon,
  trend,
  accent = 'violet',
  delay = 0,
}: StatsCardProps) {
  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            'flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br',
            accentMap[accent]
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        {typeof trend === 'number' && (
          <span
            className={cn(
              'flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
              trend >= 0
                ? 'bg-[var(--color-success)]/10 text-[var(--color-success)]'
                : 'bg-[var(--color-danger)]/10 text-[var(--color-danger)]'
            )}
          >
            {trend >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {Math.abs(trend)}%
          </span>
        )}
      </div>
      <motion.p
        className="mt-4 font-[var(--font-mono)] text-3xl font-semibold tracking-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.1 }}
      >
        <AnimatedValue value={value} />
      </motion.p>
      <p className="mt-1 text-sm text-[var(--color-muted)]">{label}</p>
    </Card>
  );
}
