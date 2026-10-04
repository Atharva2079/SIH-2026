import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { learners } from '@/data/learners';
import { ShieldCheck, MapPin, Award, CheckCircle2, AlertTriangle, DownloadCloud, Phone } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function EmployerCandidates() {
  const { t } = useTranslation();
  // Using the first learner as the selected candidate
  const candidate = learners[0];

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Candidate Profile"
        subtitle="Review verified skills and credentials. What you see is what they can actually do."
      />

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
         <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
         <div>
            <h4 className="text-sm font-bold text-primary">Trustworthy Profiles</h4>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
               Unlike standard CVs, all skills listed here have been demonstrated practically and verified by an assessor. Independent exams mean the candidate received no hints during assessment.
            </p>
         </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
         {/* Left Col: Overview */}
         <div className="lg:col-span-1 space-y-6">
            <div className="card-elevated p-6 text-center">
               <div className="w-24 h-24 rounded-full bg-[var(--muted)] mx-auto mb-4 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center">
                  <span className="text-3xl font-bold text-[var(--muted-foreground)]">{candidate.name.charAt(0)}</span>
               </div>
               <h2 className="text-2xl font-bold font-heading">{candidate.name}</h2>
               <p className="text-sm text-[var(--muted-foreground)] mt-1 flex items-center justify-center gap-1">
                  <MapPin className="w-4 h-4" /> {candidate.state}
               </p>
               
               <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-3">
                  <button className="w-full py-2 bg-primary text-white font-bold rounded-lg text-sm shadow-sm hover:bg-primary-light transition-colors">
                     Shortlist Candidate
                  </button>
                  <button className="w-full py-2 bg-[var(--card)] border border-[var(--border)] font-bold rounded-lg text-sm hover:bg-[var(--muted)] transition-colors">
                     Reject
                  </button>
               </div>
            </div>

            <div className="card-elevated p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
               <h3 className="font-bold text-success-dark flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5" /> 92% Match Score
               </h3>
               <p className="text-xs text-success-dark/80 mb-4">Matches your opening: <strong>Warehouse Manager</strong></p>
               
               <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                     <span>Inventory Workflow</span>
                     <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex justify-between items-center">
                     <span>Goods Receiving</span>
                     <CheckCircle2 className="w-4 h-4 text-success" />
                  </div>
                  <div className="flex justify-between items-center">
                     <span>Quality Check SOP</span>
                     <AlertTriangle className="w-4 h-4 text-warning" />
                  </div>
               </div>
            </div>

            <div className="card-elevated p-6">
               <h3 className="font-bold mb-4 font-heading text-lg">Contact Info</h3>
               <div className="flex items-center gap-3 p-3 bg-[var(--muted)]/50 rounded-lg border border-[var(--border)] border-dashed">
                  <Phone className="w-5 h-5 text-[var(--muted-foreground)]" />
                  <div>
                     <p className="text-sm font-medium blur-sm select-none">+91 98765 43210</p>
                     <p className="text-xs text-[var(--muted-foreground)]">Visible after shortlisting</p>
                  </div>
               </div>
            </div>
         </div>

         {/* Right Col: Details */}
         <div className="lg:col-span-2 space-y-6">
            
            {/* Work Readiness */}
            <div className="card-elevated p-6">
               <h3 className="font-bold mb-4 font-heading text-xl">Verified Task Readiness</h3>
               <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                     <thead className="bg-[var(--muted)]">
                        <tr>
                           <th className="p-3 font-semibold">Task</th>
                           <th className="p-3 font-semibold text-center">Exam Mode</th>
                           <th className="p-3 font-semibold text-center">Guided Helps</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-[var(--border)]">
                        {candidate.workReadiness.map((wr, i) => (
                           <tr key={wr.id} className="hover:bg-[var(--muted)]/30 transition-colors">
                              <td className="p-3 font-medium">{wr.task}</td>
                              <td className="p-3 text-center">
                                 <StatusBadge status={wr.examMode} size="sm" />
                              </td>
                              <td className="p-3 text-center">
                                 {wr.helpNeeded ? (
                                    <span className="text-xs font-medium text-saffron bg-saffron/10 px-2 py-1 rounded-full">Used 2 hints</span>
                                 ) : (
                                    <span className="text-xs font-medium text-[var(--muted-foreground)]">None</span>
                                 )}
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>

            {/* Credentials */}
            <div className="card-elevated p-6">
               <h3 className="font-bold mb-4 font-heading text-xl">Digital Credentials</h3>
               <div className="grid sm:grid-cols-2 gap-4">
                  {candidate.credentials.map((cred) => (
                     <div key={cred.id} className="border border-[var(--border)] rounded-xl p-4 flex flex-col h-full hover:border-primary/30 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                           <Award className="w-8 h-8 text-primary" />
                           <StatusBadge status="verified" size="sm" />
                        </div>
                        <h4 className="font-bold mb-1">{cred.title}</h4>
                        <p className="text-xs text-[var(--muted-foreground)] mb-4">{cred.issuer}</p>
                        
                        <div className="mt-auto pt-3 border-t border-[var(--border)] flex justify-between items-center">
                           <span className="text-xs font-mono text-[var(--muted-foreground)]">{cred.id}</span>
                           <button className="text-primary hover:bg-primary/10 p-1.5 rounded transition-colors" title="Download PDF">
                              <DownloadCloud className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
