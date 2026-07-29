import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/helpers';
import type { ReactNode } from 'react';

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export default function Card({
  children,
  hover = false,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      className={cn(
        'glass rounded-2xl',
        paddingClasses[padding],
        hover && 'transition-transform duration-300 hover:-translate-y-1 hover:border-white/15',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
