import { motion } from 'framer-motion';
import { Settings, Lock, Sparkles, LayoutGrid } from 'lucide-react';
import { PageHeader } from './SharedComponents';

export default function ModulePlaceholder({ title, description = "This module is part of the expanded KaushalyaConnect ERP suite." }: { title: string, description?: string }) {
  return (
    <div className="max-w-4xl mx-auto h-full flex flex-col">
      <PageHeader 
        title={title} 
        subtitle="Expanded ERP Module" 
      />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8 mt-12 bg-[var(--card)] rounded-2xl border border-[var(--border)] shadow-sm relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-saffron to-success opacity-50" />
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-saffron/5 rounded-full blur-3xl" />

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-[var(--muted)] rounded-2xl flex items-center justify-center mb-6 shadow-inner"
        >
          <LayoutGrid className="w-12 h-12 text-[var(--muted-foreground)]" />
        </motion.div>

        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl font-bold font-heading mb-3"
        >
          {title}
        </motion.h2>

        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[var(--muted-foreground)] max-w-md mb-8"
        >
          {description} This section is currently locked in the interactive demo mode, but represents a fully scoped feature in the production architecture.
        </motion.p>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl"
        >
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] text-left flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-saffron shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">AI-Ready</h4>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Designed for ML integration.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] text-left flex items-start gap-3">
            <Lock className="w-5 h-5 text-success shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Role-Gated</h4>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Access control enforced.</p>
            </div>
          </div>
          <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] text-left flex items-start gap-3">
            <Settings className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm">Integrated</h4>
              <p className="text-xs text-[var(--muted-foreground)] mt-1">Shares central state.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
