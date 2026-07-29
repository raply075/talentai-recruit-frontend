import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';
import Card from '../common/Card';

/**
 * Suggestions come straight from the backend as a plain string[]
 * (ResumeAnalysisService). There is no title/priority metadata — the
 * AI prompt never returns any — so each item is rendered as-is with
 * a visual index instead of a fabricated label or severity badge.
 */
export default function SuggestionCard({ suggestions }: { suggestions: string[] }) {
  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-4 w-4 text-[var(--color-cyan)]" />
        <h3 className="font-[var(--font-display)] text-base font-semibold">AI Suggestions</h3>
      </div>

      {suggestions.length === 0 ? (
        <p className="text-sm text-[var(--color-faint)]">No suggestions yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {suggestions.map((suggestion, i) => (
            <motion.div
              key={suggestion}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i }}
              className="flex items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] font-[var(--font-mono)] text-[11px] font-semibold text-white">
                {i + 1}
              </span>
              <p className="text-sm leading-relaxed text-[var(--color-muted)]">{suggestion}</p>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}
