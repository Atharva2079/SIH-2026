import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { ShieldCheck, PlayCircle, HelpCircle, AlertTriangle, CheckCircle2, User, Clock, FileCheck } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function TrainerAssessment() {
  const { t } = useTranslation();

  const [decision, setDecision] = useState<'approve' | 'reject' | 'remedial' | null>(null);

  // Mock timeline data for a practical attempt
  const timelineEvents = [
    { time: '14:02:15', type: 'system', desc: 'Attempt started (Independent Mode)', icon: PlayCircle, color: 'text-primary bg-primary/10' },
    { time: '14:02:45', type: 'sensor', desc: 'Tare weight placed. Load cell reading: 0.40kg', value: 0.4, icon: ShieldCheck, color: 'text-blue-500 bg-blue-500/10' },
    { time: '14:04:10', type: 'sensor', desc: 'Gross weight placed. Load cell reading: 2.41kg', value: 2.41, icon: ShieldCheck, color: 'text-blue-500 bg-blue-500/10' },
    { time: '14:05:05', type: 'user', desc: 'Learner entered Net Weight: 2.00kg', icon: User, color: 'text-purple-500 bg-purple-500/10' },
    { time: '14:05:06', type: 'system', desc: 'System matched calculation. Margin of error acceptable (0.01kg).', icon: CheckCircle2, color: 'text-success bg-success/10' },
    { time: '14:05:30', type: 'system', desc: 'Attempt completed successfully.', icon: FileCheck, color: 'text-success bg-success/10' },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Practical Assessment Review"
        subtitle="Review objective sensor data and system logs before signing off on competencies."
        actions={
          <button className="px-4 py-2 bg-[var(--muted)] rounded-lg text-sm font-medium hover:bg-[var(--border)] transition-colors">
            Back to Queue
          </button>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
         {/* Context Column */}
         <div className="lg:col-span-1 space-y-6">
            <div className="card-elevated p-6">
               <h3 className="font-bold font-heading mb-4 text-lg">Learner Context</h3>
               <div className="space-y-4">
                  <div>
                     <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Name</p>
                     <p className="font-medium flex items-center gap-2">Ravi Kumar <StatusBadge status="verified" size="sm" /></p>
                     <p className="text-xs text-[var(--muted-foreground)] mt-0.5">ID verified via Face (99.8% match) at start of session.</p>
                  </div>
                  <div>
                     <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Task</p>
                     <p className="font-medium">Goods Receiving (Weighing)</p>
                  </div>
                  <div>
                     <p className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider mb-1">Mode</p>
                     <StatusBadge status="independent" />
                  </div>
               </div>
            </div>

            <div className="card-elevated p-6 bg-success/5 border-success/20">
               <h3 className="font-bold text-success-dark flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5" /> Auto-Evaluation
               </h3>
               <p className="text-sm text-success-dark/80">System marked attempt as successful. Calculations matched sensor readings.</p>
            </div>
         </div>

         {/* Timeline Column */}
         <div className="lg:col-span-2">
            <div className="card-elevated p-6">
               <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold font-heading text-lg flex items-center gap-2">
                     <Clock className="w-5 h-5 text-primary" /> Attempt Event Log
                  </h3>
                  <span className="text-xs font-medium bg-[var(--muted)] px-3 py-1 rounded-full">Duration: 3m 15s</span>
               </div>

               <div className="relative border-l-2 border-[var(--border)] ml-4 space-y-8 pb-4">
                  {timelineEvents.map((ev, i) => {
                     const Icon = ev.icon;
                     return (
                        <motion.div 
                           key={i} 
                           initial={{ opacity: 0, x: 20 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.1 }}
                           className="relative pl-6"
                        >
                           <div className={cn("absolute -left-[17px] top-0 w-8 h-8 rounded-full border-4 border-[var(--card)] flex items-center justify-center", ev.color)}>
                              <Icon className="w-4 h-4" />
                           </div>
                           <div className="bg-[var(--muted)]/50 rounded-xl p-4 border border-[var(--border)]">
                              <span className="text-xs font-mono text-[var(--muted-foreground)] block mb-1">{ev.time}</span>
                              <p className="text-sm font-medium">{ev.desc}</p>
                              {ev.value !== undefined && (
                                 <div className="mt-2 p-2 bg-white dark:bg-gray-800 rounded flex justify-between items-center max-w-[200px] border border-[var(--border)] shadow-sm">
                                    <span className="text-xs text-[var(--muted-foreground)]">Sensor Value</span>
                                    <span className="font-mono font-bold text-primary">{ev.value} kg</span>
                                 </div>
                              )}
                           </div>
                        </motion.div>
                     );
                  })}
               </div>
            </div>

            {/* Assessor Decision */}
            <div className="mt-6 card-elevated p-6">
               <h3 className="font-bold font-heading text-lg mb-4">Assessor Sign-off</h3>
               <p className="text-sm text-[var(--muted-foreground)] mb-4">Based on the objective data above, do you confirm this learner is competent in this task?</p>
               
               <div className="flex gap-4 mb-6">
                  <button 
                     onClick={() => setDecision('approve')}
                     className={cn("flex-1 py-3 border-2 rounded-xl font-bold transition-all", decision === 'approve' ? "border-success bg-success/10 text-success-dark" : "border-[var(--border)] hover:border-success/50")}
                  >
                     Approve & Certify
                  </button>
                  <button 
                     onClick={() => setDecision('remedial')}
                     className={cn("flex-1 py-3 border-2 rounded-xl font-bold transition-all", decision === 'remedial' ? "border-warning bg-warning/10 text-warning-dark" : "border-[var(--border)] hover:border-warning/50")}
                  >
                     Require Remedial
                  </button>
                  <button 
                     onClick={() => setDecision('reject')}
                     className={cn("flex-1 py-3 border-2 rounded-xl font-bold transition-all", decision === 'reject' ? "border-error bg-error/10 text-error-dark" : "border-[var(--border)] hover:border-error/50")}
                  >
                     Reject Attempt
                  </button>
               </div>

               {decision && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                     <div>
                        <label className="block text-sm font-medium mb-1">Assessor Notes (Optional, visible to NCCT)</label>
                        <textarea className="w-full h-20 p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] resize-none text-sm" placeholder="Add any specific observations..."></textarea>
                     </div>
                     <button className="w-full py-3 bg-primary text-white font-bold rounded-xl shadow-md">
                        Submit Final Decision
                     </button>
                  </motion.div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
}
