export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.round(diffMs / 60000);
  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.round(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.round(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  return formatDate(dateString);
}

export function scoreToLabel(score: number): string {
  if (score >= 85) return 'Excellent';
  if (score >= 70) return 'Strong';
  if (score >= 50) return 'Fair';
  return 'Needs Work';
}

export function scoreToColor(score: number): string {
  if (score >= 85) return '#34D399';
  if (score >= 70) return '#22D3EE';
  if (score >= 50) return '#FBBF24';
  return '#F87171';
}

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

/**
 * Shared style for native <select> elements, matching the visual
 * language of the <Input /> component (which only supports <input>).
 * Combine with cn() for any extra per-usage classes.
 */
export const NATIVE_SELECT_CLASSNAME =
  'focus-ring h-11 w-full rounded-xl border border-[var(--color-border)] bg-white/[0.03] px-4 text-sm text-[var(--color-ink)] transition-colors hover:border-white/20 focus:border-[var(--color-violet)]/60 disabled:cursor-not-allowed disabled:opacity-50';
