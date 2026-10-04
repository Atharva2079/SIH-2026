import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { FileQuestion, AlertTriangle, CalendarCheck, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function LearnerFollowUp() {
  const { t } = useTranslation();
  
  const [reportMode, setReportMode] = useState<false | 'survey' | 'blocker'>(false);
  const [blockerCategory, setBlockerCategory] = useState('');

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Post-Training Follow-Up"
        subtitle="We track your progress even after you complete the programme to ensure you get the support you need."
      />

      <div className="grid md:grid-cols-2 gap-6 mb-8">
         <div className="card-elevated p-6 bg-gradient-to-br from-primary to-primary-light text-white">
            <h3 className="font-bold text-xl font-heading mb-2">30-Day Check-in</h3>
            <p className="text-sm text-white/80 mb-6">Your 30-day post-training survey is due. Let us know if you found employment or are facing challenges.</p>
            
            <button 
               onClick={() => setReportMode('survey')}
               className="w-full py-2.5 bg-white text-primary font-bold rounded-lg transition-transform hover:scale-[1.02]"
            >
               Complete Survey
            </button>
         </div>

         <div className="card-elevated p-6 border-l-4 border-l-saffron">
            <h3 className="font-bold text-xl font-heading mb-2">Report a Blocker</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-6">Are you facing a specific issue preventing you from finding or keeping a job? Let the NCCT coordination team know.</p>
            
            <button 
               onClick={() => setReportMode('blocker')}
               className="w-full py-2.5 bg-saffron text-white font-bold rounded-lg transition-transform hover:scale-[1.02]"
            >
               Report Blocker
            </button>
         </div>
      </div>

      <h3 className="font-bold font-heading text-xl mb-4">Past Follow-ups & Blockers</h3>
      
      <div className="space-y-4">
         <div className="card-elevated p-5">
            <div className="flex items-start justify-between">
               <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--muted)] flex items-center justify-center shrink-0">
                     <AlertTriangle className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                     <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold">System Access Blocker</h4>
                        <StatusBadge status="resolved" size="sm" />
                     </div>
                     <p className="text-sm text-[var(--muted-foreground)]">Reported: Oct 1, 2026</p>
                     <p className="text-sm mt-2">Could not access DigiLocker account due to Aadhaar phone number mismatch.</p>
                     <div className="mt-3 p-3 bg-success/5 border border-success/20 rounded-lg text-sm text-success-dark">
                        <strong>Resolution:</strong> Issue escalated to local CSC. Mobile number updated and credential pushed successfully.
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Modals/Drawers simulated inline for demo */}
      {reportMode === 'blocker' && (
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-[var(--card)] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
               <div className="p-5 border-b border-[var(--border)] flex justify-between items-center">
                  <h3 className="font-bold text-lg">Report a Blocker</h3>
                  <button onClick={() => setReportMode(false)} className="text-2xl leading-none px-2">&times;</button>
               </div>
               <div className="p-6 space-y-4">
                  <div>
                     <label className="block text-sm font-medium mb-2">What kind of issue are you facing?</label>
                     <div className="grid grid-cols-2 gap-3">
                        {['Skill Gap', 'Equipment/Kit', 'System Access', 'No Opportunity'].map(cat => (
                           <button 
                              key={cat} 
                              onClick={() => setBlockerCategory(cat)}
                              className={cn(
                                 "p-3 rounded-lg text-sm text-left border transition-colors",
                                 blockerCategory === cat ? "border-primary bg-primary/5 font-bold" : "border-[var(--border)] hover:bg-[var(--muted)]"
                              )}
                           >
                              {cat}
                           </button>
                        ))}
                     </div>
                  </div>
                  <div>
                     <label className="block text-sm font-medium mb-2">Description</label>
                     <textarea className="w-full h-24 p-3 rounded-lg bg-[var(--muted)] border border-[var(--border)] resize-none" placeholder="Please provide details..."></textarea>
                  </div>
                  <button className="w-full py-3 bg-primary text-white font-bold rounded-xl mt-4">
                     Submit Report
                  </button>
               </div>
            </div>
         </motion.div>
      )}

      {reportMode === 'survey' && (
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-[var(--card)] rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
               <div className="p-5 border-b border-[var(--border)] flex justify-between items-center">
                  <h3 className="font-bold text-lg">30-Day Follow Up</h3>
                  <button onClick={() => setReportMode(false)} className="text-2xl leading-none px-2">&times;</button>
               </div>
               <div className="p-6 text-center">
                  <CalendarCheck className="w-16 h-16 text-primary mx-auto mb-4" />
                  <p className="text-lg font-medium mb-6">Have you secured employment or started an enterprise since completing your training?</p>
                  
                  <div className="space-y-3">
                     <button className="w-full py-3 bg-[var(--muted)] hover:bg-success/10 hover:text-success border border-[var(--border)] hover:border-success/30 font-medium rounded-xl transition-colors">
                        Yes, I am employed
                     </button>
                     <button className="w-full py-3 bg-[var(--muted)] hover:bg-primary/10 hover:text-primary border border-[var(--border)] hover:border-primary/30 font-medium rounded-xl transition-colors">
                        Yes, I started an enterprise (SHG/FPO)
                     </button>
                     <button className="w-full py-3 bg-[var(--muted)] hover:bg-error/10 hover:text-error border border-[var(--border)] hover:border-error/30 font-medium rounded-xl transition-colors">
                        No, I am still looking
                     </button>
                  </div>
               </div>
            </div>
         </motion.div>
      )}
    </div>
  );
}
