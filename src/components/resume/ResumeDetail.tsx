import type { LucideIcon } from 'lucide-react';
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  Link2,
  Globe,
  Briefcase,
  GraduationCap,
  FolderGit2,
  Users,
  Award,
  Trophy,
} from 'lucide-react';
import type { ReactNode } from 'react';
import Card from '../common/Card';
import { ScoreRing } from '../dashboard/ATSCard';
import SkillCard from '../dashboard/SkillCard';
import SuggestionCard from '../dashboard/SuggestionCard';
import type {
  Resume,
  StructuredResumeEducation,
  StructuredResumeExperience,
  StructuredResumeOrganization,
} from '../../types/resume';
import { CAREER_LEVEL_COLOR } from '../../utils/constants';
import { formatDate, formatFileSize, cn } from '../../utils/helpers';

/** Shared row layout for experience / education / organizations — same
 * position+company+period+description shape, rendered once here
 * instead of duplicated three times. */
function TimelineEntry({
  icon: Icon,
  title,
  subtitle,
  period,
  description,
}: {
  icon: LucideIcon;
  title: string | null;
  subtitle: string | null;
  period: string | null;
  description: string | null;
}) {
  if (!title && !subtitle) return null;

  return (
    <div className="relative border-l-2 border-white/10 pl-5">
      <span aria-hidden="true" className="absolute -left-[7px] top-1 flex h-3 w-3 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)]" />
      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
        <p className="font-medium text-[var(--color-ink)]">{title}</p>
        {period && <p className="text-xs text-[var(--color-faint)]">{period}</p>}
      </div>
      {subtitle && (
        <p className="flex items-center gap-1.5 text-sm text-[var(--color-cyan)]">
          <Icon aria-hidden="true" className="h-3.5 w-3.5" /> {subtitle}
        </p>
      )}
      {description && (
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{description}</p>
      )}
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  delay = 0,
  children,
}: {
  title: string;
  icon: LucideIcon;
  delay?: number;
  children: ReactNode;
}) {
  return (
    <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}>
      <div className="mb-5 flex items-center gap-2">
        <Icon aria-hidden="true" className="h-4 w-4 text-[var(--color-cyan)]" />
        <h3 className="font-[var(--font-display)] text-base font-semibold">{title}</h3>
      </div>
      {children}
    </Card>
  );
}

export default function ResumeDetail({ resume }: { resume: Resume }) {
  const personal = resume.structuredResume?.personal ?? null;
  const hasContactInfo = Boolean(
    personal &&
      (personal.name ||
        personal.email ||
        personal.phone ||
        personal.location ||
        personal.linkedin ||
        personal.github ||
        personal.portfolio)
  );

  const education = resume.structuredResume?.education ?? [];
  const experience = resume.structuredResume?.experience ?? [];
  const projects = resume.structuredResume?.projects ?? [];
  const organizations = resume.structuredResume?.organizations ?? [];
  const certifications = resume.structuredResume?.certifications ?? [];
  const achievements = resume.structuredResume?.achievements ?? [];

  return (
    <div className="flex flex-col gap-6">
      {/* File meta bar */}
      <Card initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.04]">
          <FileText aria-hidden="true" className="h-5 w-5 text-[var(--color-muted)]" />
        </div>
        <div className="min-w-0">
          <h2 className="truncate font-[var(--font-display)] text-lg font-semibold">{resume.fileName}</h2>
          <p className="text-sm text-[var(--color-muted)]">
            {formatDate(resume.uploadedAt)} · {formatFileSize(resume.fileSize)}
          </p>
        </div>
      </Card>

      {/* Header: personal information */}
      {hasContactInfo && personal && (
        <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          {personal.name && (
            <h2 className="mb-3 font-[var(--font-display)] text-2xl font-semibold">{personal.name}</h2>
          )}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--color-muted)]">
            {personal.email && (
              <span className="flex items-center gap-1.5">
                <Mail aria-hidden="true" className="h-4 w-4 text-[var(--color-faint)]" /> {personal.email}
              </span>
            )}
            {personal.phone && (
              <span className="flex items-center gap-1.5">
                <Phone aria-hidden="true" className="h-4 w-4 text-[var(--color-faint)]" /> {personal.phone}
              </span>
            )}
            {personal.location && (
              <span className="flex items-center gap-1.5">
                <MapPin aria-hidden="true" className="h-4 w-4 text-[var(--color-faint)]" /> {personal.location}
              </span>
            )}
            {personal.linkedin && (
              <span className="flex items-center gap-1.5">
                <Link2 aria-hidden="true" className="h-4 w-4 text-[var(--color-faint)]" /> {personal.linkedin}
              </span>
            )}
            {personal.github && (
              <span className="flex items-center gap-1.5">
                <Link2 aria-hidden="true" className="h-4 w-4 text-[var(--color-faint)]" /> {personal.github}
              </span>
            )}
            {personal.portfolio && (
              <span className="flex items-center gap-1.5">
                <Globe aria-hidden="true" className="h-4 w-4 text-[var(--color-faint)]" /> {personal.portfolio}
              </span>
            )}
          </div>
        </Card>
      )}

      {/* ATS Score + Career Level */}
      <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <h3 className="font-[var(--font-display)] text-base font-semibold">ATS Score</h3>
            <p className="text-sm text-[var(--color-muted)]">Overall resume compatibility</p>
          </div>
          <ScoreRing score={resume.atsScore} />
          <span
            className={cn(
              'w-fit rounded-full bg-gradient-to-r px-4 py-1.5 text-sm font-medium text-white',
              CAREER_LEVEL_COLOR[resume.careerLevel]
            )}
          >
            {resume.careerLevel} Level
          </span>
        </div>
      </Card>

      {/* Profile */}
      {resume.structuredResume?.profile && (
        <SectionCard title="Profile" icon={FileText} delay={0.1}>
          <p className="leading-7 text-[var(--color-muted)]">{resume.structuredResume.profile}</p>
        </SectionCard>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <SectionCard title="Experience" icon={Briefcase} delay={0.12}>
          <div className="flex flex-col gap-6">
            {experience.map((exp: StructuredResumeExperience, i) => (
              <TimelineEntry
                key={i}
                icon={Briefcase}
                title={exp.position}
                subtitle={exp.company}
                period={exp.period}
                description={exp.description}
              />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Education */}
      {education.length > 0 && (
        <SectionCard title="Education" icon={GraduationCap} delay={0.14}>
          <div className="flex flex-col gap-6">
            {education.map((edu: StructuredResumeEducation, i) => (
              <TimelineEntry
                key={i}
                icon={GraduationCap}
                title={edu.degree}
                subtitle={edu.institution}
                period={edu.period}
                description={edu.description}
              />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <SectionCard title="Projects" icon={FolderGit2} delay={0.16}>
          <div className="flex flex-col gap-6">
            {projects.map((project, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  {project.name && <p className="font-medium text-[var(--color-ink)]">{project.name}</p>}
                  {project.period && <p className="text-xs text-[var(--color-faint)]">{project.period}</p>}
                </div>
                {project.description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {project.description}
                  </p>
                )}
                {project.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-white/10 bg-gradient-to-br from-[var(--color-violet)]/15 to-[var(--color-cyan)]/10 px-2.5 py-1 text-xs font-medium text-[var(--color-ink)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Organizations */}
      {organizations.length > 0 && (
        <SectionCard title="Organizations" icon={Users} delay={0.18}>
          <div className="flex flex-col gap-6">
            {organizations.map((org: StructuredResumeOrganization, i) => (
              <TimelineEntry
                key={i}
                icon={Users}
                title={org.name}
                subtitle={org.position}
                period={org.period}
                description={org.description}
              />
            ))}
          </div>
        </SectionCard>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <SectionCard title="Certifications" icon={Award} delay={0.2}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {certifications.map((cert, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                {cert.name && <p className="font-medium text-[var(--color-ink)]">{cert.name}</p>}
                {cert.issuer && <p className="text-sm text-[var(--color-cyan)]">{cert.issuer}</p>}
                {cert.year && <p className="mt-1 text-xs text-[var(--color-faint)]">{cert.year}</p>}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <SectionCard title="Achievements" icon={Trophy} delay={0.22}>
          <div className="flex flex-col gap-4">
            {achievements.map((achievement, i) => (
              <div key={i} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  {achievement.title && (
                    <p className="font-medium text-[var(--color-ink)]">{achievement.title}</p>
                  )}
                  {achievement.year && <p className="text-xs text-[var(--color-faint)]">{achievement.year}</p>}
                </div>
                {achievement.description && (
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">
                    {achievement.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Skills + AI Suggestions */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SkillCard skills={resume.skills} />
        <SuggestionCard suggestions={resume.suggestions} />
      </div>
    </div>
  );
}
