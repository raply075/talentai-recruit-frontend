import { motion } from 'framer-motion';
import { MessagesSquare } from 'lucide-react';
import Card from '../common/Card';
import { Skeleton } from '../common/Loading';

/**
 * Shown in place of the form while the AI is generating interview
 * questions. Generation can take up to ~2 minutes (the backend tries
 * several OpenRouter models with fallback), same as Cover Letter.
 */
export default function LoadingInterview() {
  return (
    <div className="flex flex-col gap-4">
      <Card
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-4 py-12 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-white/10 border-t-[var(--color-violet)] border-r-[var(--color-cyan)]"
        >
          <MessagesSquare aria-hidden="true" className="h-5 w-5 text-[var(--color-cyan)]" />
        </motion.div>
        <div>
          <p className="font-medium">Generating your interview questions…</p>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            This can take up to a couple of minutes while the AI writes.
          </p>
        </div>
      </Card>

      {[0, 1, 2].map((i) => (
        <Card key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 + i * 0.08 }}>
          <div className="flex items-start gap-3">
            <Skeleton className="h-7 w-7 shrink-0 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-2/5" />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Skeleton className="h-7 w-36 rounded-lg" />
            <Skeleton className="h-7 w-24 rounded-lg" />
          </div>
        </Card>
      ))}
    </div>
  );
}
