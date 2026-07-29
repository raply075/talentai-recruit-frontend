import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/helpers';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
}

/**
 * Shared empty-state pattern: icon + title + description + optional
 * action. Used wherever a list/result can legitimately be empty
 * (Dashboard, Resume list, Interview results, ...).
 */
export default function EmptyState({ icon: Icon, title, description, action, className, compact = false }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-center',
        compact ? 'py-10' : 'py-16',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-violet)]/15 to-[var(--color-cyan)]/10">
        <Icon aria-hidden="true" className="h-6 w-6 text-[var(--color-faint)]" />
      </div>
      <div>
        <p className="font-medium text-[var(--color-ink)]">{title}</p>
        {description && <p className="mt-1 max-w-xs text-sm text-[var(--color-muted)]">{description}</p>}
      </div>
      {action}
    </motion.div>
  );
}
