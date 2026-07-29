import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  UploadCloud,
  Mail,
  MessagesSquare,
  User,
  Settings,
  LogOut,
  Sparkles,
  X,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/helpers';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/resume', label: 'Resume', icon: FileText },
  { to: '/upload', label: 'Upload Resume', icon: UploadCloud },
  { to: '/cover-letter', label: 'AI Cover Letter', icon: Mail },
  { to: '/interview', label: 'AI Interview', icon: MessagesSquare },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
];

interface SidebarProps {
  isMobileOpen: boolean;
  onClose: () => void;
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { logout } = useAuth();

  return (
    <>
      <div>
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-[var(--font-display)] text-lg font-semibold tracking-tight">
            CareerAI
          </span>
        </div>

        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              className={({ isActive }) =>
                cn(
                  'focus-ring group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors lg:py-2.5',
                  isActive
                    ? 'text-[var(--color-ink)]'
                    : 'text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--color-violet)]/20 to-[var(--color-cyan)]/10 ring-1 ring-white/10"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <item.icon className="relative h-5 w-5 lg:h-4.5 lg:w-4.5" />
                  <span className="relative">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      <button
        onClick={() => logout()}
        className="focus-ring flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-[var(--color-muted)] transition-colors hover:bg-[var(--color-danger)]/10 hover:text-[var(--color-danger)] lg:py-2.5"
      >
        <LogOut className="h-5 w-5 lg:h-4.5 lg:w-4.5" />
        Logout
      </button>
    </>
  );
}

export default function Sidebar({ isMobileOpen, onClose }: SidebarProps) {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    drawerRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileOpen, onClose]);

  return (
    <>
      {/* Desktop: static sidebar */}
      <motion.aside
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="glass sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between rounded-none border-y-0 border-l-0 p-5 lg:flex"
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile: drawer + overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
              tabIndex={-1}
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="focus:outline-none glass fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between rounded-none border-y-0 border-l-0 p-5 lg:hidden"
            >
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="focus-ring absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]"
              >
                <X className="h-4 w-4" />
              </button>
              <SidebarContent onNavigate={onClose} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
