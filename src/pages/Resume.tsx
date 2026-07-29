import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import MainLayout from '../components/layout/MainLayout';
import ResumeTable from '../components/resume/ResumeTable';
import ResumeDetail from '../components/resume/ResumeDetail';
import { FullPageLoader } from '../components/common/Loading';
import Button from '../components/common/Button';
import { useResumeList } from '../hooks/useResume';
import { resumeService } from '../services/resumeService';
import type { CareerLevel } from '../types/resume';
import type { Resume as ResumeType } from '../types/resume';
import { NATIVE_SELECT_CLASSNAME, cn } from '../utils/helpers';

export default function Resume() {
  const { id } = useParams<{ id: string }>();
  return id ? <ResumeDetailView id={id} /> : <ResumeListView />;
}

const PAGE_SIZE = 6;
const CAREER_LEVEL_FILTERS: Array<CareerLevel | 'all'> = [
  'all',
  'Intern',
  'Junior',
  'Mid',
  'Senior',
  'Lead',
  'Unknown',
];

function ResumeListView() {
  const { resumes, isLoading, error, remove } = useResumeList();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<CareerLevel | 'all'>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return resumes.filter((resume) => {
      const matchesSearch = query === '' || resume.fileName.toLowerCase().includes(query);
      const matchesLevel = levelFilter === 'all' || resume.careerLevel === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [resumes, search, levelFilter]);

  // Page resets to 1 directly in the search/filter change handlers below
  // (avoids a set-state-in-effect cascade).

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const isFiltered = search.trim() !== '' || levelFilter !== 'all';

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
      toast.success('Resume deleted');
    } catch {
      toast.error('Could not delete resume');
    }
  };

  return (
    <MainLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold">Your Resumes</h1>
          <p className="mt-1 text-sm text-[var(--color-muted)]">
            Manage and review every resume you&apos;ve analyzed.
          </p>
        </div>
        <Link to="/upload">
          <Button icon={<Plus className="h-4 w-4" />}>Upload Resume</Button>
        </Link>
      </div>

      {!error && resumes.length > 0 && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-faint)]" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search by file name…"
              className="focus-ring h-11 w-full rounded-xl border border-[var(--color-border)] bg-white/[0.03] pl-10 pr-4 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-faint)] transition-colors hover:border-white/20 focus:border-[var(--color-violet)]/60"
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => {
              setLevelFilter(e.target.value as CareerLevel | 'all');
              setPage(1);
            }}
            className={cn(NATIVE_SELECT_CLASSNAME, 'sm:w-48')}
          >
            {CAREER_LEVEL_FILTERS.map((level) => (
              <option key={level} value={level}>
                {level === 'all' ? 'All levels' : level}
              </option>
            ))}
          </select>
        </div>
      )}

      {error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-2xl p-8 text-center text-sm text-[var(--color-danger)]"
        >
          {error}
        </motion.div>
      ) : (
        <>
          <ResumeTable resumes={paginated} isLoading={isLoading} isFiltered={isFiltered} onDelete={handleDelete} />

          {!isLoading && filtered.length > PAGE_SIZE && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs text-[var(--color-faint)]">
                Page {page} of {totalPages}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  aria-label="Previous page"
                  className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] transition-colors hover:border-white/20 hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  aria-label="Next page"
                  className="focus-ring flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-muted)] transition-colors hover:border-white/20 hover:text-[var(--color-ink)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}

function ResumeDetailView({ id }: { id: string }) {
  const navigate = useNavigate();
  const [resume, setResume] = useState<ResumeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional reset when id param changes
    setIsLoading(true);
    resumeService
      .get(id)
      .then((data) => {
        if (!cancelled) setResume(data);
      })
      .catch(() => {
        if (!cancelled) setError('Resume not found');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  return (
    <MainLayout>
      <button
        onClick={() => navigate('/resume')}
        className="focus-ring mb-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-ink)]"
      >
        <ArrowLeft className="h-4 w-4" /> Back to resumes
      </button>

      {isLoading && <FullPageLoader label="Loading resume" />}
      {!isLoading && error && (
        <div className="glass rounded-2xl p-8 text-center text-sm text-[var(--color-danger)]">{error}</div>
      )}
      {!isLoading && resume && <ResumeDetail resume={resume} />}
    </MainLayout>
  );
}
