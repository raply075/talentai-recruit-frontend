import { motion } from 'framer-motion';
import { FileText, History } from 'lucide-react';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import { formatRelativeTime } from '../../utils/helpers';
import type { Resume } from '../../types/resume';

export default function ActivityTimeline({ resumes }: { resumes: Resume[] }) {
  const events = [...resumes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 6);

  return (
    <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
      <div className="mb-4 flex items-center gap-2">
        <History className="h-4 w-4 text-[var(--color-violet)]" />
        <h3 className="font-[var(--font-display)] text-base font-semibold">Activity Timeline</h3>
      </div>

      {events.length === 0 ? (
        <EmptyState icon={History} title="No activity yet" description="Your recent activity will show up here." compact />
      ) : (
        <ol className="relative flex flex-col gap-5 pl-5">
          <div className="absolute bottom-1 left-[7px] top-1 w-px bg-white/[0.08]" aria-hidden="true" />
          {events.map((resume, i) => (
            <motion.li
              key={resume.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.3 }}
              className="relative"
            >
              <span className="absolute -left-5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] ring-4 ring-[var(--color-surface)]">
                <FileText className="h-2 w-2 text-white" />
              </span>
              <p className="text-sm text-[var(--color-ink)]">
                Resume <span className="font-medium">{resume.fileName}</span> uploaded
              </p>
              <p className="text-xs text-[var(--color-faint)]">{formatRelativeTime(resume.createdAt)}</p>
            </motion.li>
          ))}
        </ol>
      )}
    </Card>
  );
}
