import { useMemo, useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../common/Card';
import Input from '../common/Input';
import Button from '../common/Button';
import type { ChangePasswordPayload } from '../../types/profile';

interface SecurityFormProps {
  onChangePassword: (payload: ChangePasswordPayload) => Promise<unknown>;
  isChanging: boolean;
}

interface StrengthResult {
  score: number; // 0-4
  label: string;
  color: string;
}

function evaluateStrength(password: string): StrengthResult {
  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const clamped = Math.min(score, 4);
  const labels = ['Very weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
  const colors = ['#f87171', '#f87171', '#fbbf24', '#22d3ee', '#34d399'];

  return { score: clamped, label: labels[clamped], color: colors[clamped] };
}

export default function SecurityForm({ onChangePassword, isChanging }: SecurityFormProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const strength = useMemo(() => evaluateStrength(password), [password]);

  const validate = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!currentPassword) nextErrors.currentPassword = 'Enter your current password';
    if (!password) nextErrors.password = 'Enter a new password';
    else if (password.length < 8) nextErrors.password = 'Must be at least 8 characters';
    if (password !== confirmPassword) nextErrors.confirmPassword = 'Passwords do not match';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await onChangePassword({
        currentPassword,
        password,
        passwordConfirmation: confirmPassword,
      });
      toast.success('Password updated');
      setCurrentPassword('');
      setPassword('');
      setConfirmPassword('');
      setErrors({});
    } catch {
      toast.error('Could not update your password. Check your current password and try again.');
    }
  };

  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
    >
      <div className="mb-1 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-[var(--color-violet)]" />
        <h3 className="font-[var(--font-display)] text-base font-semibold">Security</h3>
      </div>
      <p className="mb-5 text-sm text-[var(--color-muted)]">Change your password to keep your account safe.</p>

      <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
        <Input
          label="Current password"
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          error={errors.currentPassword}
          disabled={isChanging}
          autoComplete="current-password"
        />
        <div>
          <Input
            label="New password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            disabled={isChanging}
            autoComplete="new-password"
          />
          {password && (
            <div className="mt-2">
              <div className="flex h-1.5 gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.25, delay: i * 0.03 }}
                    className="h-full flex-1 origin-left rounded-full"
                    style={{ backgroundColor: i < strength.score ? strength.color : 'rgba(255,255,255,0.08)' }}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs" style={{ color: strength.color }}>
                {strength.label}
              </p>
            </div>
          )}
        </div>
        <Input
          label="Confirm new password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          disabled={isChanging}
          autoComplete="new-password"
        />
        <Button type="submit" isLoading={isChanging} className="mt-2 w-fit">
          Update password
        </Button>
      </form>
    </Card>
  );
}
