import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, UploadCloud, Mail, MessagesSquare, UserCircle2 } from 'lucide-react';

const MOTIVATIONAL_LINES = [
  'Small resume tweaks compound into big interview wins.',
  'Every upload gets you closer to your next offer.',
  'Consistency beats perfection — keep refining.',
  'Your next opportunity starts with today\u2019s edit.',
];

function greetingForHour(hour: number): string {
  if (hour < 5) return 'Still up';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

const QUICK_ACTIONS = [
  { to: '/upload', icon: UploadCloud, label: 'Upload Resume' },
  { to: '/cover-letter', icon: Mail, label: 'Cover Letter' },
  { to: '/interview', icon: MessagesSquare, label: 'AI Interview' },
  { to: '/profile', icon: UserCircle2, label: 'View Profile' },
];

export default function WelcomeHero({ name }: { name?: string }) {
  const now = new Date();
  const greeting = greetingForHour(now.getHours());
  const line = MOTIVATIONAL_LINES[now.getDate() % MOTIVATIONAL_LINES.length];
  const dateLabel = now.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass relative mb-8 overflow-hidden rounded-2xl p-6 sm:p-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(40vw 40vh at 0% 0%, rgba(124,92,252,0.16), transparent 60%), radial-gradient(30vw 30vh at 100% 100%, rgba(34,211,238,0.12), transparent 60%)',
        }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--color-violet)]/20 blur-[70px]"
        animate={{ opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-[var(--color-cyan)]">
            <Sparkles className="h-3.5 w-3.5" /> {dateLabel}
          </div>
          <h1 className="mt-2 font-[var(--font-display)] text-2xl font-semibold sm:text-3xl">
            {greeting}
            {name ? `, ${name.split(' ')[0]}` : ''}
          </h1>
          <p className="mt-1.5 max-w-md text-sm text-[var(--color-muted)]">{line}</p>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
          {QUICK_ACTIONS.map((action, i) => (
            <motion.div
              key={action.to}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
            >
              <Link
                to={action.to}
                className="focus-ring group flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-xs font-medium text-[var(--color-ink)] transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-violet)]/40 hover:bg-white/[0.06]"
              >
                <action.icon className="h-3.5 w-3.5 text-[var(--color-cyan)] transition-transform group-hover:scale-110" />
                <span className="whitespace-nowrap">{action.label}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
