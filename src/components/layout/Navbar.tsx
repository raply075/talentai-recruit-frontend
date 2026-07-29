import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Moon, Sun, ChevronDown, LogOut, User as UserIcon, Settings, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { getInitials } from '../../utils/helpers';

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="glass sticky top-0 z-30 flex h-16 items-center justify-between gap-4 rounded-none border-x-0 border-t-0 px-5"
    >
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)] lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="relative hidden max-w-sm flex-1 md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--color-faint)]" />
        <input
          type="text"
          placeholder="Search resumes, skills…"
          className="focus-ring h-10 w-full rounded-xl border border-[var(--color-border)] bg-white/[0.03] pl-9 pr-4 text-sm placeholder:text-[var(--color-faint)] hover:border-white/20 focus:border-[var(--color-violet)]/60"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleTheme}
          className="focus-ring flex h-10 w-10 items-center justify-center rounded-xl text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          className="focus-ring relative flex h-10 w-10 items-center justify-center rounded-xl text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]"
          aria-label="Notifications"
        >
          <Bell className="h-4.5 w-4.5" />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[var(--color-cyan)]" />
        </motion.button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((p) => !p)}
            className="focus-ring flex items-center gap-2 rounded-xl py-1 pl-1 pr-2 hover:bg-white/5"
          >
            <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[var(--color-violet)] to-[var(--color-cyan)] text-xs font-semibold text-white">
              {user?.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                user ? getInitials(user.name) : '—'
              )}
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-[var(--color-faint)]" />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="glass absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl p-1.5"
                >
                  <p className="truncate px-3 py-2 text-xs text-[var(--color-faint)]">{user?.email}</p>
                  <Link
                    to="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]"
                  >
                    <UserIcon className="h-4 w-4" /> Profile
                  </Link>
                  <Link
                    to="/settings"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--color-muted)] hover:bg-white/5 hover:text-[var(--color-ink)]"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--color-danger)] hover:bg-[var(--color-danger)]/10"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.header>
  );
}
