import { motion } from 'framer-motion';
import { Fingerprint, Mail, CalendarDays, FileText, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import Card from '../common/Card';
import { formatDate } from '../../utils/helpers';

interface InfoRow {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface AccountInfoCardProps {
  userId: string;
  email: string;
  joinDate: string | null;
  totalResumes: number;
  careerLevel: string | null;
}

export default function AccountInfoCard({
  userId,
  email,
  joinDate,
  totalResumes,
  careerLevel,
}: AccountInfoCardProps) {
  const rows: InfoRow[] = [
    { icon: Fingerprint, label: 'User ID', value: userId },
    { icon: Mail, label: 'Email', value: email },
    { icon: CalendarDays, label: 'Joined', value: joinDate ? formatDate(joinDate) : '—' },
    { icon: FileText, label: 'Total resumes', value: String(totalResumes) },
    { icon: TrendingUp, label: 'Career level', value: careerLevel ?? '—' },
  ];

  return (
    <Card
      hover
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <h3 className="mb-4 font-[var(--font-display)] text-base font-semibold">Account information</h3>
      <div className="flex flex-col divide-y divide-white/[0.05]">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.3 }}
            className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
          >
            <div className="flex items-center gap-2.5 text-[var(--color-muted)]">
              <row.icon className="h-4 w-4 shrink-0 text-[var(--color-faint)]" />
              <span className="text-sm">{row.label}</span>
            </div>
            <span className="truncate text-right text-sm font-medium text-[var(--color-ink)]" title={row.value}>
              {row.value}
            </span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
