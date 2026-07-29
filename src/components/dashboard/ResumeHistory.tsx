import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ChevronRight, UploadCloud, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import type { Resume } from '../../types/resume';
import { formatRelativeTime, scoreToColor } from '../../utils/helpers';

export default function ResumeHistory({ resumes }: { resumes: Resume[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return resumes;
    return resumes.filter((r) => r.fileName.toLowerCase().includes(q));
  }, [resumes, query]);

  return (
    <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-[var(--font-display)] text-base font-semibold">Recent Resume History</h3>
        <Link to="/resume" className="text-xs font-medium text-[var(--color-cyan)] hover:underline">
          View all
        </Link>
      </div>

      {resumes.length > 0 && (
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--color-faint)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resumes by file name…"
            className="focus-ring h-9 w-full rounded-lg border border-[var(--color-border)] bg-white/[0.03] pl-9 pr-3 text-xs text-[var(--color-ink)] placeholder:text-[var(--color-faint)] transition-colors hover:border-white/20 focus:border-[var(--color-violet)]/60"
          />
        </div>
      )}

      {resumes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No resumes uploaded yet"
          description="Upload your first resume to see it here."
          compact
          action={
            <Link to="/upload">
              <Button size="sm" icon={<UploadCloud className="h-3.5 w-3.5" />}>
                Upload Resume
              </Button>
            </Link>
          }
        />
      ) : filtered.length === 0 ? (
        <EmptyState icon={Search} title="No matches" description="Try a different search term." compact />
      ) : (
        <div className="flex flex-col divide-y divide-white/[0.05]">
          {filtered.slice(0, 5).map((resume, i) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 * i }}
            >
              <Link
                to={`/resume/${resume.id}`}
                className="focus-ring group flex items-center gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                  <FileText className="h-4 w-4 text-[var(--color-muted)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium group-hover:text-[var(--color-cyan)]">
                    {resume.fileName}
                  </p>
                  <p className="text-xs text-[var(--color-faint)]">{formatRelativeTime(resume.uploadedAt)}</p>
                </div>
                <span
                  className="font-[var(--font-mono)] text-sm font-semibold"
                  style={{ color: scoreToColor(resume.atsScore) }}
                >
                  {resume.atsScore}
                </span>
                <ChevronRight className="h-4 w-4 text-[var(--color-faint)] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </Card>
  );
}
