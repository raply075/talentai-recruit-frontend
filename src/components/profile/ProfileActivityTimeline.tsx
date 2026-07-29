import { motion } from 'framer-motion';
import { History, FileText, UserCog, KeyRound, ImageUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import { formatRelativeTime } from '../../utils/helpers';
import type { Resume } from '../../types/resume';

export type ProfileEventKind = 'avatar' | 'info' | 'password';

export interface ProfileEvent {
  id: string;
  kind: ProfileEventKind;
  label: string;
  timestamp: string;
}

const EVENT_ICONS: Record<ProfileEventKind, LucideIcon> = {
  avatar: ImageUp,
  info: UserCog,
  password: KeyRound,
};

interface TimelineEntry {
  id: string;
  icon: LucideIcon;
  label: string;
  timestamp: string;
}

interface ProfileActivityTimelineProps {
  resumes: Resume[];
  events: ProfileEvent[];
}

export default function ProfileActivityTimeline({ resumes, events }: ProfileActivityTimelineProps) {
  const resumeEntries: TimelineEntry[] = [...resumes]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3)
    .map((resume) => ({
      id: `resume-${resume.id}`,
      icon: FileText,
      label: `Resume "${resume.fileName}" uploaded`,
      timestamp: resume.createdAt,
    }));

  const sessionEntries: TimelineEntry[] = events.map((event) => ({
    id: event.id,
    icon: EVENT_ICONS[event.kind],
    label: event.label,
    timestamp: event.timestamp,
  }));

  const entries = [...sessionEntries, ...resumeEntries]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 6);

  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
    >
      <div className="mb-4 flex items-center gap-2">
        <History className="h-4 w-4 text-[var(--color-violet)]" />
        <h3 className="font-[var(--font-display)] text-base font-semibold">Activity</h3>
      </div>

      {entries.length === 0 ? (
        <EmptyState icon={History} title="No activity yet" description="Changes you make will show up here." compact />
      ) : (
        <ol className="relative flex flex-col gap-5 pl-5">
          <div className="absolute bottom-1 left-[7px] top-1 w-px bg-white/[0.08]" aria-hidden="true" />
          {entries.map((entry, i) => (
            <motion.li
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.06 * i, duration: 0.3 }}
              className="relative"
            >
              <span className="absolute -left-5 top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] ring-4 ring-[var(--color-surface)]">
                <entry.icon className="h-2 w-2 text-white" />
              </span>
              <p className="text-sm text-[var(--color-ink)]">{entry.label}</p>
              <p className="text-xs text-[var(--color-faint)]">{formatRelativeTime(entry.timestamp)}</p>
            </motion.li>
          ))}
        </ol>
      )}
    </Card>
  );
}
