import { motion } from 'framer-motion';
import { Sparkles, CalendarDays } from 'lucide-react';
import { getInitials, formatDate } from '../../utils/helpers';
import type { UserProfile } from '../../types/profile';

interface ProfileHeroProps {
  profile: UserProfile;
  joinDate: string | null;
}

/**
 * Hero section for the Profile page. Mirrors the visual language of
 * dashboard/WelcomeHero.tsx (glass panel, ambient gradient blobs) but
 * built around identity rather than a greeting.
 */
export default function ProfileHero({ profile, joinDate }: ProfileHeroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass relative mb-6 overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(45vw 45vh at 0% 0%, rgba(124,92,252,0.18), transparent 60%), radial-gradient(35vw 35vh at 100% 100%, rgba(34,211,238,0.14), transparent 60%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-[var(--color-violet)]/20 blur-[80px]"
        animate={{ opacity: [0.5, 0.9, 0.5], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:items-center sm:text-left">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.35, ease: 'easeOut' }}
          className="relative shrink-0"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-2xl font-semibold text-white shadow-[0_0_0_4px_rgba(255,255,255,0.06),0_16px_40px_-12px_rgba(124,92,252,0.65)] sm:h-28 sm:w-28"
          >
            {profile.avatarUrl ? (
              <img src={profile.avatarUrl} alt={profile.name} className="h-full w-full object-cover" />
            ) : (
              getInitials(profile.name)
            )}
          </motion.div>
        </motion.div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <h1 className="truncate font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
              {profile.name}
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-[var(--color-violet)]/30 bg-[var(--color-violet)]/15 px-2.5 py-1 text-[11px] font-medium text-[var(--color-cyan)]">
              <Sparkles className="h-3 w-3" /> AI User
            </span>
          </div>
          <p className="mt-1 truncate text-sm text-[var(--color-muted)]">{profile.email}</p>
          {joinDate && (
            <p className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[var(--color-faint)]">
              <CalendarDays className="h-3.5 w-3.5" /> Joined {formatDate(joinDate)}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
