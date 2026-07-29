import { useState, type FormEvent, type ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, FileText, MessagesSquare, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';
import { ROUTES } from '../utils/constants';

const HIGHLIGHTS = [
  { icon: FileText, text: 'Instant ATS resume scoring' },
  { icon: MessagesSquare, text: 'AI-generated interview practice' },
  { icon: ShieldCheck, text: 'Private, secure, built for speed' },
];

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', passwordConfirmation: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (key: keyof typeof form) => (e: ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = 'Enter your full name';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email';
    if (form.password.length < 6) next.password = 'At least 6 characters';
    if (form.password !== form.passwordConfirmation) next.passwordConfirmation = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await register(form);
      toast.success('Account created');
      navigate(ROUTES.DASHBOARD);
    } catch {
      toast.error('Could not create your account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[var(--color-base)] lg:grid-cols-2">
      {/* Left: brand panel (hidden on mobile) */}
      <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between lg:p-12">
        <BrandPanelBackground />
        <Link to="/" className="relative z-10 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)]">
            <Sparkles className="h-4.5 w-4.5 text-white" />
          </div>
          <span className="font-[var(--font-display)] text-lg font-semibold">CareerAI</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <h2 className="font-[var(--font-display)] text-3xl font-semibold leading-tight">
            Start optimizing
            <br />
            your career today.
          </h2>
          <div className="mt-8 flex flex-col gap-3">
            {HIGHLIGHTS.map((item, i) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08 }}
                className="glass flex items-center gap-3 rounded-xl px-4 py-3"
              >
                <item.icon className="h-4.5 w-4.5 text-[var(--color-cyan)]" />
                <span className="text-sm text-[var(--color-muted)]">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <p className="relative z-10 text-xs text-[var(--color-faint)]">
          © {new Date().getFullYear()} CareerAI. All rights reserved.
        </p>
      </div>

      {/* Right: form panel */}
      <div className="relative flex items-center justify-center overflow-hidden px-4 py-12">
        <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden lg:hidden">
          <MobileBackground />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="glass relative z-10 w-full max-w-md rounded-3xl p-8"
        >
          <div className="mb-8 flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] lg:hidden">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="font-[var(--font-display)] text-2xl font-semibold">Create your account</h1>
            <p className="mt-1 text-sm text-[var(--color-muted)]">Start optimizing your resume with AI</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Full name"
              icon={<User className="h-4 w-4" />}
              placeholder="Jane Doe"
              value={form.name}
              onChange={update('name')}
              error={errors.name}
              autoComplete="name"
              disabled={isSubmitting}
            />
            <Input
              label="Email"
              type="email"
              icon={<Mail className="h-4 w-4" />}
              placeholder="you@example.com"
              value={form.email}
              onChange={update('email')}
              error={errors.email}
              autoComplete="email"
              disabled={isSubmitting}
            />
            <Input
              label="Password"
              type="password"
              icon={<Lock className="h-4 w-4" />}
              placeholder="••••••••"
              value={form.password}
              onChange={update('password')}
              error={errors.password}
              autoComplete="new-password"
              disabled={isSubmitting}
            />
            <Input
              label="Confirm password"
              type="password"
              icon={<Lock className="h-4 w-4" />}
              placeholder="••••••••"
              value={form.passwordConfirmation}
              onChange={update('passwordConfirmation')}
              error={errors.passwordConfirmation}
              autoComplete="new-password"
              disabled={isSubmitting}
            />

            <Button type="submit" fullWidth isLoading={isSubmitting} className="mt-2">
              Create account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--color-muted)]">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[var(--color-cyan)] hover:underline">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function BrandPanelBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-0 overflow-hidden bg-gradient-to-br from-[var(--color-surface)] via-[var(--color-base)] to-[var(--color-surface)]">
      <motion.div
        className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[var(--color-cyan)]/20 blur-[100px]"
        animate={{ x: [0, -24, 0], y: [0, 20, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-[var(--color-violet)]/25 blur-[100px]"
        animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function MobileBackground() {
  return (
    <>
      <motion.div
        className="absolute -right-32 -top-24 h-96 w-96 rounded-full bg-[var(--color-cyan)]/20 blur-[100px]"
        animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-[var(--color-violet)]/25 blur-[100px]"
        animate={{ x: [0, 30, 0], y: [0, -24, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </>
  );
}
