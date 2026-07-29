import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Card from '../common/Card';

/**
 * Shown in place of the form while the AI is generating a cover
 * letter. Generation can take up to ~2 minutes (the backend tries
 * several OpenRouter models with fallback), so this needs to read as
 * "working", not "stuck".
 */
export default function LoadingGenerate() {
  return (
    <Card
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
        className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-white/10 border-t-[var(--color-violet)] border-r-[var(--color-cyan)]"
      >
        <Sparkles aria-hidden="true" className="h-5 w-5 text-[var(--color-cyan)]" />
      </motion.div>
      <div>
        <p className="font-medium">Generating your cover letter…</p>
        <p className="mt-1 text-sm text-[var(--color-muted)]">
          This can take up to a couple of minutes while the AI writes.
        </p>
      </div>
    </Card>
  );
}
