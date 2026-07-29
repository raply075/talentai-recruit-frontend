import { useMemo } from 'react';
import { FileText, Target, Layers, TrendingUp } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import WelcomeHero from '../components/dashboard/WelcomeHero';
import QuickGeneratePanel from '../components/dashboard/QuickGeneratePanel';
import StatsCard from '../components/dashboard/StatsCard';
import ATSCard from '../components/dashboard/ATSCard';
import SkillCard from '../components/dashboard/SkillCard';
import SuggestionCard from '../components/dashboard/SuggestionCard';
import InsightsCard from '../components/dashboard/InsightsCard';
import AssistantCard from '../components/dashboard/AssistantCard';
import CompletionCard from '../components/dashboard/CompletionCard';
import WeeklyActivityChart from '../components/dashboard/WeeklyActivityChart';
import StreakCard from '../components/dashboard/StreakCard';
import ActivityTimeline from '../components/dashboard/ActivityTimeline';
import ResumeHistory from '../components/dashboard/ResumeHistory';
import { SkeletonCard } from '../components/common/Loading';
import { useResumeList } from '../hooks/useResume';
import { useAuth } from '../hooks/useAuth';
import type { Resume } from '../types/resume';

/** How many of the 9 structured-resume sections are non-empty, as a 0-100 percentage. */
function completionPercentFor(resume?: Resume): number {
  if (!resume?.structuredResume) return 0;
  const s = resume.structuredResume;
  const sections = [
    Object.values(s.personal).some(Boolean),
    Boolean(s.profile),
    s.education.length > 0,
    s.experience.length > 0,
    s.projects.length > 0,
    s.skills.length > 0,
    s.organizations.length > 0,
    s.certifications.length > 0,
    s.achievements.length > 0,
  ];
  const filled = sections.filter(Boolean).length;
  return Math.round((filled / sections.length) * 100);
}

/** Resume uploads per day for the last 7 days (today inclusive), oldest first. */
function weeklyActivityFor(resumes: Resume[]) {
  const days: { label: string; count: number; key: string }[] = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    days.push({ label: d.toLocaleDateString('en-US', { weekday: 'short' }), count: 0, key: d.toDateString() });
  }
  for (const r of resumes) {
    const key = new Date(r.createdAt).toDateString();
    const day = days.find((d) => d.key === key);
    if (day) day.count += 1;
  }
  return days.map(({ label, count }) => ({ label, count }));
}

/** Consecutive days (ending today or yesterday) with at least one resume upload. */
function streakFor(resumes: Resume[]): number {
  if (resumes.length === 0) return 0;
  const uploadDays = new Set(resumes.map((r) => new Date(r.createdAt).toDateString()));
  const cursor = new Date();
  // If nothing uploaded today, the streak can still count from yesterday.
  if (!uploadDays.has(cursor.toDateString())) {
    cursor.setDate(cursor.getDate() - 1);
    if (!uploadDays.has(cursor.toDateString())) return 0;
  }
  let streak = 0;
  while (uploadDays.has(cursor.toDateString())) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { resumes, isLoading } = useResumeList();

  const sorted = useMemo(
    () => [...resumes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [resumes]
  );
  const latest = sorted[0];

  const stats = useMemo(() => {
    if (resumes.length === 0) return null;
    const avgScore = Math.round(resumes.reduce((sum, r) => sum + (r.atsScore ?? 0), 0) / resumes.length);
    const uniqueSkills = new Set(resumes.flatMap((r) => r.skills ?? [])).size;

    let trend: number | undefined;
    if (resumes.length > 1 && latest) {
      const rest = resumes.filter((r) => r.id !== latest.id);
      const restAvg = rest.reduce((sum, r) => sum + (r.atsScore ?? 0), 0) / rest.length;
      if (restAvg > 0) trend = Math.round(((latest.atsScore - restAvg) / restAvg) * 100);
    }

    return { total: resumes.length, avgScore, uniqueSkills, trend };
  }, [resumes, latest]);

  const completionPercent = useMemo(() => completionPercentFor(latest), [latest]);
  const weeklyActivity = useMemo(() => weeklyActivityFor(resumes), [resumes]);
  const streakDays = useMemo(() => streakFor(resumes), [resumes]);

  return (
    <MainLayout>
      {/* 1. Welcome hero */}
      <WelcomeHero name={user?.name} />

      {/* 2. Quick generate panel */}
      <QuickGeneratePanel />

      {/* 3. Key stats */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
        ) : (
          <>
            <StatsCard label="Resumes uploaded" value={stats?.total ?? 0} icon={FileText} accent="violet" delay={0} />
            <StatsCard
              label="Average ATS score"
              value={stats?.avgScore ?? 0}
              icon={Target}
              accent="cyan"
              trend={stats?.trend}
              delay={0.05}
            />
            <StatsCard label="Skills identified" value={stats?.uniqueSkills ?? 0} icon={Layers} accent="success" delay={0.1} />
            <StatsCard label="Career level" value={latest?.careerLevel ?? '—'} icon={TrendingUp} accent="warning" delay={0.15} />
          </>
        )}
      </div>

      {!isLoading && (
        <>
          {/* AI assistant highlight */}
          <div className="mt-8">
            <AssistantCard suggestion={latest?.suggestions[0]} />
          </div>

          {/* 4. AI Career Insights + latest ATS / Skills / Suggestions */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <InsightsCard
              careerLevel={latest?.careerLevel ?? 'Unknown'}
              atsScore={latest?.atsScore ?? 0}
              topSkills={(latest?.skills ?? []).slice(0, 6)}
              improvementCount={latest?.suggestions.length ?? 0}
            />
            {latest ? (
              <>
                <ATSCard score={latest.atsScore} targetRole={latest.targetRole || undefined} />
                <SkillCard skills={latest.skills} />
              </>
            ) : (
              <div className="lg:col-span-2">
                <SuggestionCard suggestions={[]} />
              </div>
            )}
          </div>

          {/* 5. Data visualization */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <CompletionCard percent={completionPercent} />
            <div className="lg:col-span-2">
              <WeeklyActivityChart days={weeklyActivity} />
            </div>
          </div>

          {/* 6. User progress: streak + suggestions */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
            <StreakCard days={streakDays} />
            <div className="lg:col-span-2">
              <SuggestionCard suggestions={latest?.suggestions ?? []} />
            </div>
          </div>

          {/* 7. Resume history */}
          <div className="mt-8">
            <ResumeHistory resumes={sorted} />
          </div>

          {/* 9. Activity timeline */}
          <div className="mt-8">
            <ActivityTimeline resumes={sorted} />
          </div>
        </>
      )}
    </MainLayout>
  );
}
