import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { learners } from '@/data/learners';
import { openings, employers } from '@/data/mockData';
import { Briefcase, Building2, MapPin, CheckCircle2, AlertTriangle, ArrowRight, UserCheck, Play } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LearnerCareerEngine() {
  const { t } = useTranslation();
  const learner = learners[0];

  // Mock application stages
  const applications = [
    { openingId: 'open-1', stage: 'applied' },
    { openingId: 'open-2', stage: 'shortlisted' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Career Engine"
        subtitle="Match your verified skills with real opportunities in the cooperative sector."
      />

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Profile Sharing Status */}
        <div className="lg:col-span-1 card-elevated p-6 flex flex-col justify-between bg-primary text-white">
          <div>
             <h3 className="font-semibold font-heading mb-2">Employer Visibility</h3>
             <p className="text-sm text-white/80 mb-6">Your profile is currently visible to verified employers matching your skill profile.</p>
             
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success-light" />
                   </div>
                   <div className="text-sm">Skills & Readiness Record</div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-success-light" />
                   </div>
                   <div className="text-sm">Verified Credentials</div>
                </div>
                <div className="flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white/60" />
                   </div>
                   <div className="text-sm text-white/60">Phone number (Hidden until shortlisted)</div>
                </div>
             </div>
          </div>
          <button className="w-full mt-8 py-2 bg-white text-primary font-bold rounded-lg text-sm">
             Manage Privacy Settings
          </button>
        </div>

        {/* Application Tracker */}
        <div className="lg:col-span-2 card-elevated p-6">
           <h3 className="font-semibold font-heading mb-6">Application Tracker</h3>
           <div className="space-y-4">
              {applications.map((app) => {
                 const opening = openings.find(o => o.id === app.openingId);
                 const employer = employers.find(e => e.id === opening?.employerId);
                 if (!opening || !employer) return null;

                 const stages = ['applied', 'shortlisted', 'offered', 'joined', 'retained'];
                 const currentStageIdx = stages.indexOf(app.stage);

                 return (
                    <div key={app.openingId} className="border border-[var(--border)] rounded-xl p-4">
                       <div className="flex justify-between items-start mb-4">
                          <div>
                             <h4 className="font-bold text-lg">{opening.title}</h4>
                             <p className="text-sm text-[var(--muted-foreground)] flex items-center gap-1 mt-1">
                                <Building2 className="w-4 h-4" /> {employer.name}
                             </p>
                          </div>
                          <StatusBadge status={app.stage} />
                       </div>

                       <div className="relative pt-2">
                          <div className="absolute top-5 left-4 right-4 h-0.5 bg-[var(--border)]" />
                          <div className="relative flex justify-between">
                             {['Applied', 'Shortlisted', 'Offered', 'Joined', 'Retained'].map((s, i) => (
                                <div key={s} className="flex flex-col items-center">
                                   <div className={`w-6 h-6 rounded-full flex items-center justify-center z-10 text-xs font-bold ${
                                      i <= currentStageIdx ? 'bg-primary text-white' : 'bg-[var(--card)] border-2 border-[var(--border)] text-[var(--muted-foreground)]'
                                   }`}>
                                      {i <= currentStageIdx ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                                   </div>
                                   <span className={`text-xs mt-2 font-medium ${i <= currentStageIdx ? 'text-primary' : 'text-[var(--muted-foreground)]'}`}>
                                      {s}
                                   </span>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 );
              })}
           </div>
        </div>
      </div>

      {/* Recommended Openings */}
      <h3 className="font-bold font-heading text-xl mb-4">Recommended for You</h3>
      <div className="grid lg:grid-cols-2 gap-6">
         {openings.filter(o => !applications.some(a => a.openingId === o.id)).slice(0, 4).map((opening, i) => {
            const employer = employers.find(e => e.id === opening.employerId);
            return (
               <motion.div 
                  key={opening.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-elevated p-6 flex flex-col"
               >
                  <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-lg leading-tight">{opening.title}</h4>
                     <StatusBadge status={opening.status} size="sm" />
                  </div>
                  <div className="flex items-center gap-4 text-sm text-[var(--muted-foreground)] mb-4">
                     <span className="flex items-center gap-1"><Building2 className="w-4 h-4" /> {employer?.name}</span>
                     <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {opening.location}</span>
                  </div>

                  {/* Match Explanation */}
                  <div className="bg-success/5 border border-success/10 rounded-lg p-3 mb-4">
                     <p className="text-xs font-bold text-success-dark mb-2 flex items-center gap-1">
                        <UserCheck className="w-4 h-4" /> Why this matches you:
                     </p>
                     <ul className="text-xs text-[var(--muted-foreground)] space-y-1 pl-5 list-disc">
                        <li>You have verified skills in <strong>{opening.requiredTasks[0]}</strong>.</li>
                        <li>Your independent exam mode score is high for <strong>{opening.requiredTasks[1]}</strong>.</li>
                        {i % 2 === 0 && (
                           <li className="text-saffron">Missing skill: <strong>{opening.requiredTasks[2]}</strong> (Remedial suggested)</li>
                        )}
                     </ul>
                  </div>

                  <div className="mt-auto pt-4 flex items-center justify-between">
                     <span className="text-xs text-[var(--muted-foreground)]">Closes: {new Date(opening.expiryDate).toLocaleDateString()}</span>
                     <button className="px-4 py-2 bg-[var(--card)] border border-primary text-primary hover:bg-primary hover:text-white transition-colors rounded-lg text-sm font-bold">
                        Review & Apply
                     </button>
                  </div>
               </motion.div>
            );
         })}
      </div>
    </div>
  );
}
