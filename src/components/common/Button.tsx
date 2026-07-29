import { motion, type HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers';
import type { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.08),0_8px_24px_-8px_rgba(124,92,252,0.6)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.12),0_12px_32px_-8px_rgba(124,92,252,0.75)]',
  secondary:
    'bg-[var(--color-elevated)] text-[var(--color-ink)] border border-[var(--color-border)] hover:bg-[var(--color-elevated-hover)]',
  ghost: 'bg-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)] hover:bg-white/5',
  danger: 'bg-[var(--color-danger)]/15 text-[var(--color-danger)] border border-[var(--color-danger)]/30 hover:bg-[var(--color-danger)]/25',
};

const sizeClasses: Record<Size, string> = {
  sm: 'h-9 px-3.5 text-sm gap-1.5',
  md: 'h-11 px-5 text-sm gap-2',
  lg: 'h-13 px-7 text-base gap-2.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  icon,
  children,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.015 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      disabled={disabled || isLoading}
      className={cn(
        'focus-ring inline-flex items-center justify-center rounded-xl font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </motion.button>
  );
}
