import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { UploadCloud, Mail, MessagesSquare, FileText, ArrowRight, type LucideIcon } from 'lucide-react';
import Card from '../common/Card';

interface QuickAction {
  to: string;
  icon: LucideIcon;
  title: string;
  description: string;
}

const ACTIONS: QuickAction[] = [
  {
    to: '/upload',
    icon: UploadCloud,
    title: 'Upload Resume',
    description: 'Add a new resume for AI analysis.',
  },
  {
    to: '/cover-letter',
    icon: Mail,
    title: 'AI Cover Letter',
    description: 'Generate a tailored cover letter.',
  },
  {
    to: '/interview',
    icon: MessagesSquare,
    title: 'AI Interview',
    description: 'Practice questions from your resume.',
  },
  {
    to: '/resume',
    icon: FileText,
    title: 'View Resumes',
    description: 'Browse your resume history.',
  },
];

export default function QuickGeneratePanel() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {ACTIONS.map((action, i) => (
        <motion.div
          key={action.to}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: i * 0.06, ease: 'easeOut' }}
        >
          <Link to={action.to} className="focus-ring block h-full rounded-2xl">
            <Card
              hover
              className="group flex h-full flex-col gap-3 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-violet)]/40 hover:shadow-[0_16px_40px_-18px_rgba(124,92,252,0.4)]"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--color-violet)]/20 to-[var(--color-cyan)]/10 text-[var(--color-cyan)] transition-transform duration-300 group-hover:scale-110">
                <action.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-[var(--font-display)] text-sm font-semibold">{action.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-muted)]">{action.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-[var(--color-faint)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-cyan)]" />
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
