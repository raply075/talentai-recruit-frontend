import { motion } from 'framer-motion';
import { FileText, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SkeletonCard } from '../common/Loading';
import EmptyState from '../common/EmptyState';
import Button from '../common/Button';
import type { Resume } from '../../types/resume';
import { formatDate, formatFileSize, scoreToColor } from '../../utils/helpers';

interface ResumeTableProps {
  resumes: Resume[];
  isLoading: boolean;
  isFiltered?: boolean;
  onDelete: (id: string) => void;
}

export default function ResumeTable({ resumes, isLoading, isFiltered = false, onDelete }: ResumeTableProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="glass rounded-2xl">
        <EmptyState
          icon={FileText}
          title={isFiltered ? 'No resumes match your search' : 'No resumes yet'}
          description={
            isFiltered
              ? 'Try a different keyword or clear your filters.'
              : 'Upload your first resume to get an ATS score and personalized suggestions.'
          }
          action={
            !isFiltered && (
              <Link to="/upload">
                <Button size="sm">Upload Resume</Button>
              </Link>
            )
          }
        />
      </div>
    );
  }

  return (
    <div className="glass overflow-hidden rounded-2xl">
      <div className="hidden grid-cols-[1fr_120px_120px_100px_90px] gap-4 border-b border-white/[0.06] px-5 py-3 text-xs font-medium uppercase tracking-wider text-[var(--color-faint)] md:grid">
        <span>File</span>
        <span>Uploaded</span>
        <span>Size</span>
        <span>ATS Score</span>
        <span className="text-right">Actions</span>
      </div>
      <div className="flex flex-col gap-3 p-3 md:block md:gap-0 md:divide-y md:divide-white/[0.05] md:p-0">
        {resumes.map((resume, i) => (
          <motion.div
            key={resume.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            className="grid grid-cols-1 gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-4 transition-colors hover:bg-white/[0.04] md:grid-cols-[1fr_120px_120px_100px_90px] md:items-center md:gap-4 md:rounded-none md:border-x-0 md:border-t-0 md:border-b-0 md:bg-transparent md:px-5 md:hover:bg-white/[0.02]"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.04]">
                <FileText className="h-4 w-4 text-[var(--color-muted)]" />
              </div>
              <span className="truncate text-sm font-medium">{resume.fileName}</span>
            </div>
            <span className="text-sm text-[var(--color-muted)]">{formatDate(resume.uploadedAt)}</span>
            <span className="text-sm text-[var(--color-muted)]">{formatFileSize(resume.fileSize)}</span>
            <span className="font-[var(--font-mono)] text-sm font-semibold" style={{ color: scoreToColor(resume.atsScore) }}>
              {resume.atsScore}
            </span>
            <div className="flex items-center justify-start gap-1 md:justify-end">
              <Link
                to={`/resume/${resume.id}`}
                className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]"
                aria-label="View resume"
              >
                <Eye className="h-4 w-4" />
              </Link>
              <button
                onClick={() => onDelete(resume.id)}
                className="focus-ring flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-muted)] hover:bg-[var(--color-danger)]/10 hover:text-[var(--color-danger)]"
                aria-label="Delete resume"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
