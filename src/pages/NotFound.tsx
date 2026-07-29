import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[var(--color-base)] px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-violet)]/20 to-[var(--color-cyan)]/10"
      >
        <Compass className="h-7 w-7 text-[var(--color-cyan)]" />
      </motion.div>
      <h1 className="font-[var(--font-display)] text-5xl font-semibold text-gradient">404</h1>
      <p className="max-w-sm text-sm text-[var(--color-muted)]">
        This page wandered off your career path. Let&apos;s get you back on track.
      </p>
      <Link
        to="/dashboard"
        className="mt-2 rounded-xl bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)] px-5 py-2.5 text-sm font-medium text-white"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
