import { useCallback, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../components/layout/MainLayout';
import { Skeleton, SkeletonCard } from '../components/common/Loading';
import ProfileHero from '../components/profile/ProfileHero';
import AvatarCard from '../components/profile/AvatarCard';
import PersonalInfoForm from '../components/profile/PersonalInfoForm';
import SecurityForm from '../components/profile/SecurityForm';
import AccountInfoCard from '../components/profile/AccountInfoCard';
import ProfileActivityTimeline, { type ProfileEvent } from '../components/profile/ProfileActivityTimeline';
import { useAuth } from '../hooks/useAuth';
import { useProfile } from '../hooks/useProfile';
import { useResumeList } from '../hooks/useResume';

function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="glass rounded-3xl p-8">
        <div className="flex items-center gap-5">
          <Skeleton className="h-28 w-28 shrink-0 rounded-full" />
          <div className="flex-1">
            <Skeleton className="mb-3 h-7 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <SkeletonCard />
        <div className="lg:col-span-2">
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const {
    profile,
    isLoading,
    error,
    update,
    isSaving,
    uploadAvatar,
    isUploadingAvatar,
    avatarProgress,
    deleteAvatar,
    isDeletingAvatar,
    changePassword,
    isChangingPassword,
  } = useProfile();
  const { resumes } = useResumeList();
  const [events, setEvents] = useState<ProfileEvent[]>([]);

  const logEvent = useCallback((kind: ProfileEvent['kind'], label: string) => {
    setEvents((prev) => [{ id: `${kind}-${Date.now()}`, kind, label, timestamp: new Date().toISOString() }, ...prev]);
  }, []);

  const stats = useMemo(() => {
    const sorted = [...resumes].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    return {
      total: resumes.length,
      careerLevel: sorted[0]?.careerLevel ?? null,
    };
  }, [resumes]);

  if (isLoading || !profile) {
    return (
      <MainLayout>
        <h1 className="mb-6 font-[var(--font-display)] text-2xl font-semibold">Profile</h1>
        {error ? (
          <p className="text-sm text-[var(--color-danger)]">{error}</p>
        ) : (
          <ProfileSkeleton />
        )}
      </MainLayout>
    );
  }

  const joinDate = profile.createdAt ?? user?.createdAt ?? null;

  return (
    <MainLayout>
      <motion.h1
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 font-[var(--font-display)] text-2xl font-semibold"
      >
        Profile
      </motion.h1>

      <ProfileHero profile={profile} joinDate={joinDate} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-1">
          <AvatarCard
            name={profile.name}
            avatarUrl={profile.avatarUrl}
            isUploading={isUploadingAvatar}
            isDeleting={isDeletingAvatar}
            progress={avatarProgress}
            onUpload={async (file) => {
              const result = await uploadAvatar(file);
              logEvent('avatar', 'Profile photo updated');
              return result;
            }}
            onDelete={async () => {
              const result = await deleteAvatar();
              logEvent('avatar', 'Profile photo removed');
              return result;
            }}
          />
          <AccountInfoCard
            userId={profile.id}
            email={profile.email}
            joinDate={joinDate}
            totalResumes={stats.total}
            careerLevel={stats.careerLevel}
          />
        </div>

        <div className="flex flex-col gap-6 lg:col-span-2">
          <PersonalInfoForm
            profile={profile}
            isSaving={isSaving}
            onSave={async (payload) => {
              const result = await update(payload);
              logEvent('info', 'Personal information updated');
              return result;
            }}
          />
          <SecurityForm
            isChanging={isChangingPassword}
            onChangePassword={async (payload) => {
              const result = await changePassword(payload);
              logEvent('password', 'Password changed');
              return result;
            }}
          />
          <ProfileActivityTimeline resumes={resumes} events={events} />
        </div>
      </div>
    </MainLayout>
  );
}
