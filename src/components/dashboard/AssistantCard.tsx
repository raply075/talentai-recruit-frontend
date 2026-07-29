import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AssistantCard({ suggestion }: { suggestion?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.05 }}
      className="glass relative overflow-hidden rounded-2xl p-5"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(35vw 25vh at 100% 0%, rgba(124,92,252,0.14), transparent 60%)',
        }}
      />
      <div className="relative flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] shadow-[0_0_20px_-4px_rgba(124,92,252,0.6)]">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-[var(--color-cyan)]">AI Assistant</p>
          <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]">
            {suggestion
              ? suggestion
              : 'Upload a resume and I\u2019ll suggest concrete ways to raise your ATS score.'}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
