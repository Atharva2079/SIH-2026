import { useTranslation } from 'react-i18next';
import { PageHeader, KPICard, StatusBadge } from '@/components/ui/SharedComponents';
import { employers, openings } from '@/data/mockData';
import { learners } from '@/data/learners';
import { Briefcase, Users, FileCheck, Star, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmployerDashboard() {
  const { t } = useTranslation();
  const employer = employers[0];
  const myOpenings = openings.filter(o => o.employerId === employer.id);
  
  // Mock candidates applied
  const candidates = [
    { learnerId: 'lnr-1', name: learners[0].name, matchScore: 92, status: 'shortlisted', appliedFor: 'Warehouse Manager' },
    { learnerId: 'lnr-2', name: 'Ravi Kumar', matchScore: 85, status: 'applied', appliedFor: 'Warehouse Manager' },
    { learnerId: 'lnr-3', name: 'Sunita Sharma', matchScore: 88, status: 'offered', appliedFor: 'Dairy Tech' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title={`Welcome, ${employer.name}`}
        subtitle="Manage your cooperative openings and review verified candidates."
        actions={
          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-light transition-colors shadow-sm">
            Post New Opening
          </button>
        }
      />

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <KPICard title="Active Openings" value={myOpenings.length} icon={<Briefcase className="w-5 h-5" />} color="primary" />
        <KPICard title="New Applicants" value={12} icon={<Users className="w-5 h-5" />} color="saffron" trend={{ value: 4, positive: true }} />
        <KPICard title="Shortlisted" value={3} icon={<Star className="w-5 h-5" />} color="success" />
        <KPICard title="Hired (YTD)" value={8} icon={<FileCheck className="w-5 h-5" />} color="primary" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Openings */}
        <div className="lg:col-span-2">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold font-heading text-lg">Your Active Openings</h3>
              <button className="text-sm text-primary font-medium hover:underline">View All</button>
           </div>
           <div className="space-y-4">
              {myOpenings.map(opening => (
                 <div key={opening.id} className="card-elevated p-5 flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer">
                    <div>
                       <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-bold text-lg">{opening.title}</h4>
                          <StatusBadge status={opening.status} size="sm" />
                       </div>
                       <p className="text-sm text-[var(--muted-foreground)] flex items-center gap-1 mb-3">
                          <MapPin className="w-4 h-4" /> {opening.location} • Closes {new Date(opening.expiryDate).toLocaleDateString()}
                       </p>
                       <div className="flex flex-wrap gap-2">
                          {opening.requiredTasks.map(task => (
                             <span key={task} className="px-2 py-1 rounded bg-[var(--muted)] text-xs font-medium">
                                {task}
                             </span>
                          ))}
                       </div>
                    </div>
                    <div className="text-right">
                       <div className="text-3xl font-bold font-heading text-primary">{opening.matchedCandidates}</div>
                       <p className="text-xs text-[var(--muted-foreground)]">Matches</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* Recent Pipeline Activity */}
        <div className="lg:col-span-1">
           <h3 className="font-bold font-heading text-lg mb-4">Pipeline Activity</h3>
           <div className="card-elevated p-0 overflow-hidden">
              <div className="divide-y divide-[var(--border)]">
                 {candidates.map((candidate, i) => (
                    <motion.div 
                       key={i} 
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: i * 0.1 }}
                       className="p-4 hover:bg-[var(--muted)]/30 transition-colors"
                    >
                       <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{candidate.name}</h4>
                          <div className="flex items-center gap-1 text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded-full">
                             <Star className="w-3 h-3" /> {candidate.matchScore}% Match
                          </div>
                       </div>
                       <p className="text-xs text-[var(--muted-foreground)] mb-2">Applied for: {candidate.appliedFor}</p>
                       <StatusBadge status={candidate.status} size="sm" />
                    </motion.div>
                 ))}
              </div>
              <div className="p-3 bg-[var(--muted)]/50 text-center border-t border-[var(--border)]">
                 <button className="text-xs font-medium text-primary">View Full Pipeline</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
