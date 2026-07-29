import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import type { UpdateProfilePayload, UserProfile } from '../../types/profile';

interface PersonalInfoFormProps {
  profile: UserProfile;
  onSave: (payload: UpdateProfilePayload) => Promise<unknown>;
  isSaving: boolean;
}

const URL_FIELDS = ['linkedinUrl', 'githubUrl', 'website'] as const;

function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export default function PersonalInfoForm({ profile, onSave, isSaving }: PersonalInfoFormProps) {
  const [name, setName] = useState(profile.name);
  const [jobTitle, setJobTitle] = useState(profile.jobTitle ?? '');
  const [bio, setBio] = useState(profile.bio ?? '');
  const [location, setLocation] = useState(profile.location ?? '');
  const [linkedinUrl, setLinkedinUrl] = useState(profile.linkedinUrl ?? '');
  const [githubUrl, setGithubUrl] = useState(profile.githubUrl ?? '');
  const [website, setWebsite] = useState(profile.website ?? '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const urlValues: Record<(typeof URL_FIELDS)[number], string> = {
    linkedinUrl,
    githubUrl,
    website,
  };

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!name.trim()) {
      nextErrors.name = 'Name is required';
    }
    for (const field of URL_FIELDS) {
      const value = urlValues[field];
      if (value.trim() && !isValidUrl(value.trim())) {
        nextErrors[field] = 'Enter a valid URL';
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onSave({
        name: name.trim(),
        jobTitle: jobTitle.trim(),
        bio: bio.trim(),
        location: location.trim(),
        linkedinUrl: linkedinUrl.trim(),
        githubUrl: githubUrl.trim(),
        website: website.trim(),
      });
      toast.success('Profile updated');
    } catch {
      toast.error('Could not save your changes. Please try again.');
    }
  };

  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h3 className="mb-1 font-[var(--font-display)] text-base font-semibold">Personal information</h3>
      <p className="mb-5 text-sm text-[var(--color-muted)]">
        Update your name and public details.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            disabled={isSaving}
          />
          <Input label="Email" value={profile.email} disabled />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="Job title"
            placeholder="e.g. Senior Product Designer"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            disabled={isSaving}
          />
          <Input
            label="Location"
            placeholder="e.g. Jakarta, Indonesia"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={isSaving}
          />
        </div>

        <div className="w-full">
          <label htmlFor="bio" className="mb-1.5 block text-sm font-medium text-[var(--color-muted)]">
            Bio
          </label>
          <textarea
            id="bio"
            rows={3}
            maxLength={1000}
            placeholder="A short introduction about yourself"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={isSaving}
            className="focus-ring w-full resize-none rounded-xl border border-[var(--color-border)] bg-white/[0.03] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-faint)] transition-colors hover:border-white/20 focus:border-[var(--color-violet)]/60 disabled:cursor-not-allowed disabled:opacity-50"
          />
          <p className="mt-1 text-right text-xs text-[var(--color-faint)]">{bio.length}/1000</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            label="LinkedIn"
            placeholder="https://linkedin.com/in/you"
            value={linkedinUrl}
            onChange={(e) => setLinkedinUrl(e.target.value)}
            error={errors.linkedinUrl}
            disabled={isSaving}
          />
          <Input
            label="GitHub"
            placeholder="https://github.com/you"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
            error={errors.githubUrl}
            disabled={isSaving}
          />
        </div>

        <Input
          label="Website"
          placeholder="https://your-site.com"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          error={errors.website}
          disabled={isSaving}
        />

        <Button type="submit" isLoading={isSaving} className="mt-2 w-fit">
          Save changes
        </Button>
      </form>
    </Card>
  );
}
