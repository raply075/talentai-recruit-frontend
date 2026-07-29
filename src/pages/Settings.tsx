import { motion } from 'framer-motion';
import { Moon, Sun, Bell, Shield } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Card from '../components/common/Card';
import { useTheme } from '../hooks/useTheme';

function ToggleRow({
  icon: Icon,
  title,
  description,
  checked,
  onChange,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
          <Icon className="h-4.5 w-4.5 text-[var(--color-muted)]" />
        </div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-[var(--color-muted)]">{description}</p>
        </div>
      </div>
      <button
        onClick={onChange}
        className={`focus-ring relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? 'bg-gradient-to-r from-[var(--color-violet)] to-[var(--color-cyan)]' : 'bg-white/10'
        }`}
        aria-pressed={checked}
      >
        <motion.span
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className="absolute top-0.5 h-5 w-5 rounded-full bg-white shadow"
          style={{ left: checked ? 22 : 2 }}
        />
      </button>
    </div>
  );
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme();

  return (
    <MainLayout>
      <h1 className="mb-6 font-[var(--font-display)] text-2xl font-semibold">Settings</h1>

      <div className="flex max-w-2xl flex-col gap-6">
        <div>
          <p className="mb-3 px-1 text-xs font-medium uppercase tracking-wider text-[var(--color-faint)]">
            Preferences
          </p>
          <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="divide-y divide-white/[0.05]">
            <ToggleRow
              icon={theme === 'dark' ? Moon : Sun}
              title="Dark mode"
              description="Switch between light and dark theme"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <ToggleRow
              icon={Bell}
              title="Email notifications"
              description="Get notified when your resume analysis is ready"
              checked
              onChange={() => {}}
            />
          </Card>
        </div>

        <div>
          <p className="mb-3 px-1 text-xs font-medium uppercase tracking-wider text-[var(--color-faint)]">
            Security
          </p>
          <Card hover initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <ToggleRow
              icon={Shield}
              title="Two-factor authentication"
              description="Add an extra layer of security to your account"
              checked={false}
              onChange={() => {}}
            />
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
