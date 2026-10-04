import { useTranslation } from 'react-i18next';
import { PageHeader, KPICard, StatusBadge } from '@/components/ui/SharedComponents';
import { BookOpen, Users, PlayCircle, AlertTriangle, Calendar, Clock, MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TrainerDashboard() {
  const { t } = useTranslation();

  const schedule = [
    { id: 1, title: 'ERP Basics (Module 1)', time: '09:00 AM - 10:30 AM', type: 'theory', location: 'Classroom 2', status: 'completed' },
    { id: 2, title: 'Inventory Management', time: '11:00 AM - 12:30 PM', type: 'practical', location: 'Lab 3 (AR)', status: 'active' },
    { id: 3, title: 'Goods Receiving', time: '02:00 PM - 04:00 PM', type: 'assessment', location: 'Workbench B', status: 'upcoming' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Trainer Dashboard"
        subtitle="Manage your cohorts, deliver sessions, and assess practical skills fairly."
        actions={
          <div className="flex bg-[var(--muted)] rounded-lg p-1">
            <button className="px-4 py-1.5 bg-[var(--card)] shadow-sm rounded-md text-sm font-medium">Today</button>
            <button className="px-4 py-1.5 text-[var(--muted-foreground)] rounded-md text-sm font-medium hover:text-[var(--foreground)] transition-colors">Week</button>
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <KPICard title="Today's Sessions" value={3} icon={<Calendar className="w-5 h-5" />} color="primary" />
        <KPICard title="Cohort Attendance" value="94%" icon={<Users className="w-5 h-5" />} color="success" />
        <KPICard title="Assessments Due" value={12} icon={<BookOpen className="w-5 h-5" />} color="warning" />
        <KPICard title="Kit Alerts" value={1} icon={<AlertTriangle className="w-5 h-5" />} color="error" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Col: Today's Schedule */}
        <div className="lg:col-span-2">
           <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold font-heading text-lg">Today's Schedule</h3>
              <button className="text-sm text-primary font-medium hover:underline">View Auto-Timetable</button>
           </div>
           
           <div className="space-y-4">
              {schedule.map((session, i) => (
                 <motion.div 
                    key={session.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`card-elevated p-5 border-l-4 ${
                       session.status === 'completed' ? 'border-success opacity-75' :
                       session.status === 'active' ? 'border-primary ring-1 ring-primary/20' :
                       'border-[var(--muted-foreground)]'
                    }`}
                 >
                    <div className="flex justify-between items-start mb-3">
                       <div>
                          <div className="flex items-center gap-2 mb-1">
                             <StatusBadge status={session.type} size="sm" />
                             {session.status === 'active' && (
                                <span className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full animate-pulse">
                                   <PlayCircle className="w-3 h-3" /> LIVE NOW
                                </span>
                             )}
                          </div>
                          <h4 className="font-bold text-lg">{session.title}</h4>
                       </div>
                       <div className="text-right">
                          <p className="text-sm font-medium flex items-center gap-1 justify-end">
                             <Clock className="w-4 h-4 text-[var(--muted-foreground)]" /> {session.time}
                          </p>
                          <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 justify-end mt-1">
                             <MapPin className="w-3 h-3" /> {session.location}
                          </p>
                       </div>
                    </div>
                    
                    <div className="pt-4 border-t border-[var(--border)] flex justify-between items-center">
                       <span className="text-xs text-[var(--muted-foreground)]">Cohort: Batch 4 (PACS ERP)</span>
                       {session.status === 'active' ? (
                          <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold flex items-center gap-2">
                             Enter Session <PlayCircle className="w-4 h-4" />
                          </button>
                       ) : session.status === 'upcoming' ? (
                          <button className="px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--border)] transition-colors">
                             Prepare Materials
                          </button>
                       ) : (
                          <button className="px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--border)] transition-colors">
                             View Summary
                          </button>
                       )}
                    </div>
                 </motion.div>
              ))}
           </div>
        </div>

        {/* Right Col: Actions & Alerts */}
        <div className="space-y-6">
           <div className="card-elevated p-6 bg-saffron/10 border-saffron/20">
              <h3 className="font-bold text-saffron-dark font-heading flex items-center gap-2 mb-3">
                 <AlertTriangle className="w-5 h-5" /> Action Required
              </h3>
              <div className="space-y-3">
                 <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <p className="text-sm font-medium">Pending Approvals</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">12 practical attempts awaiting your final sign-off.</p>
                    <button className="mt-2 text-xs font-bold text-primary">Review Now &rarr;</button>
                 </div>
                 <div className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <p className="text-sm font-medium">Workbench B Offline</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-1">Load cell drift detected. Retest required.</p>
                    <button className="mt-2 text-xs font-bold text-primary">Log Maintenance Ticket &rarr;</button>
                 </div>
              </div>
           </div>

           <div className="card-elevated p-6">
              <h3 className="font-bold font-heading mb-4">Quick Search</h3>
              <div className="relative">
                 <Search className="w-4 h-4 absolute left-3 top-3 text-[var(--muted-foreground)]" />
                 <input 
                    type="text" 
                    placeholder="Search learner by ID or name..." 
                    className="w-full pl-9 pr-4 py-2.5 bg-[var(--muted)] rounded-lg text-sm border border-transparent focus:border-primary focus:outline-none transition-colors"
                 />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
