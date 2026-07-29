import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function MainLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[var(--color-base)]">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-60"
        style={{
          background:
            'radial-gradient(60vw 60vh at 12% -10%, rgba(124,92,252,0.16), transparent 60%), radial-gradient(50vw 50vh at 100% 0%, rgba(34,211,238,0.10), transparent 60%)',
        }}
      />
      <Sidebar isMobileOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
        <motion.main
          key={typeof window !== 'undefined' ? window.location.pathname : 'main'}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex-1 px-5 py-6 md:px-8 md:py-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
}
