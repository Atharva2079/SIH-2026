import { Outlet } from 'react-router-dom';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { useAppStore } from '@/store/useAppStore';
import { cn } from '@/lib/utils';
import { ControlPanel } from '@/components/demo/ControlPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export function DashboardLayout() {
  const { sidebarOpen, showPrototypeRibbon } = useAppStore();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <TopBar />
      <Sidebar />

      {showPrototypeRibbon && (
        <div className="prototype-ribbon" title="Aadhaar and DigiLocker are sandbox/mock integrations in this prototype. Demo data is synthetic.">
          Prototype
        </div>
      )}

      <main
        className={cn(
          'pt-[var(--topbar-height)] transition-all duration-300 min-h-screen',
          sidebarOpen ? 'ml-[var(--sidebar-width)]' : 'ml-16'
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="p-6"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <ControlPanel />
    </div>
  );
}

export function PublicLayout() {
  const { showPrototypeRibbon } = useAppStore();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <TopBar />

      {showPrototypeRibbon && (
        <div className="prototype-ribbon" title="Aadhaar and DigiLocker are sandbox/mock integrations in this prototype. Demo data is synthetic.">
          Prototype
        </div>
      )}

      <main className="pt-[var(--topbar-height)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <ControlPanel />
    </div>
  );
}
