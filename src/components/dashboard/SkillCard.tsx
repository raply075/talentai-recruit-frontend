import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Card from '../common/Card';

/**
 * Skills come straight from the backend as a plain string[]
 * (ResumeAnalysisService). There is no "matched" concept — the
 * backend has no job description to match against — so this card
 * only ever renders the skills themselves, as tags.
 */
export default function SkillCard({ skills }: { skills: string[] }) {
  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[var(--color-violet)]" />
          <h3 className="font-[var(--font-display)] text-base font-semibold">Skills</h3>
        </div>
        <span className="font-[var(--font-mono)] text-sm text-[var(--color-muted)]">{skills.length}</span>
      </div>

      {skills.length === 0 ? (
        <p className="text-sm text-[var(--color-faint)]">No skills detected yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.04 * i }}
              whileHover={{ y: -2 }}
              className="inline-flex items-center rounded-full border border-white/10 bg-gradient-to-br from-[var(--color-violet)]/15 to-[var(--color-cyan)]/10 px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] transition-colors hover:border-[var(--color-cyan)]/40"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      )}
    </Card>
  );
}
