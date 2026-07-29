import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

export function Spinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-[var(--color-cyan)]',
        className
      )}
    />
  );
}

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-gradient-to-r from-white/[0.04] via-white/[0.08] to-white/[0.04] bg-[length:200%_100%]',
        className
      )}
      style={{ animation: 'shimmer 1.8s ease-in-out infinite' }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-6">
      <Skeleton className="mb-4 h-4 w-24" />
      <Skeleton className="mb-2 h-8 w-32" />
      <Skeleton className="h-3 w-20" />
    </div>
  );
}

export function FullPageLoader({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        className="h-10 w-10 rounded-full border-2 border-white/10 border-t-[var(--color-violet)] border-r-[var(--color-cyan)]"
      />
      <p className="text-sm text-[var(--color-muted)]">{label}…</p>
    </div>
  );
}
