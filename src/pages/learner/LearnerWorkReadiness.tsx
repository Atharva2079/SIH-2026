import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { learners } from '@/data/learners';
import { CheckCircle2, Circle, AlertCircle, HelpCircle, FileCheck, ShieldAlert, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function LearnerWorkReadiness() {
  const { t } = useTranslation();
  const learner = learners[0];

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Work Readiness Record"
        subtitle="Your verified skills profile built continuously throughout your journey. Used for matching with employers."
        actions={
          <button className="px-4 py-2 bg-[var(--muted)] text-[var(--foreground)] rounded-lg text-sm font-medium hover:bg-[var(--border)] transition-colors">
            Download PDF
          </button>
        }
      />

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-primary shrink-0 mt-0.5" />
        <div>
          <h4 className="text-sm font-bold text-primary">Never collapsed into a single score</h4>
          <p className="text-xs text-[var(--muted-foreground)] mt-1">
            Employers see exactly what tasks you have demonstrated, under what conditions, and whether you needed help. This creates a trustworthy, nuanced profile of your abilities.
          </p>
        </div>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-[var(--muted)]">
              <tr>
                <th className="p-4 font-semibold w-1/3">Task Demonstrated</th>
                <th className="p-4 font-semibold text-center">Exam Mode</th>
                <th className="p-4 font-semibold text-center">Help Needed</th>
                <th className="p-4 font-semibold text-center">Assessor</th>
                <th className="p-4 font-semibold">Current Status</th>
              </tr>
            </thead>
            <tbody>
              {learner.workReadiness.map((wr, i) => (
                <motion.tr 
                  key={wr.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-t border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors"
                >
                  <td className="p-4 font-medium">{wr.task}</td>
                  <td className="p-4 text-center">
                    <StatusBadge status={wr.examMode} size="sm" />
                  </td>
                  <td className="p-4 text-center">
                    {wr.helpNeeded ? (
                      <span className="inline-flex items-center gap-1 text-saffron text-xs font-medium">
                        <HelpCircle className="w-4 h-4" /> Yes
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[var(--muted-foreground)] text-xs font-medium">
                        <CheckCircle2 className="w-4 h-4" /> No
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {wr.assessorApproval ? (
                      <span className="inline-flex items-center justify-center p-1.5 rounded-full bg-success/10 text-success" title="Approved by Assessor">
                        <BadgeCheck className="w-5 h-5" />
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center p-1.5 rounded-full bg-warning/10 text-warning" title="Pending Assessor Review">
                        <Circle className="w-5 h-5" />
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={wr.status} />
                  </td>
                </motion.tr>
              ))}
              {/* Add a few more mock rows for demonstration */}
              <tr className="border-t border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors">
                 <td className="p-4 font-medium">Customer query handling</td>
                  <td className="p-4 text-center"><StatusBadge status="guided" size="sm" /></td>
                  <td className="p-4 text-center"><span className="inline-flex items-center gap-1 text-[var(--muted-foreground)] text-xs font-medium"><CheckCircle2 className="w-4 h-4" /> No</span></td>
                  <td className="p-4 text-center"><span className="inline-flex items-center justify-center p-1.5 rounded-full bg-success/10 text-success"><BadgeCheck className="w-5 h-5" /></span></td>
                  <td className="p-4"><StatusBadge status="knowledge" /></td>
              </tr>
              <tr className="border-t border-[var(--border)] hover:bg-[var(--muted)]/30 transition-colors">
                 <td className="p-4 font-medium">Billing reconciliation</td>
                  <td className="p-4 text-center"><StatusBadge status="independent" size="sm" /></td>
                  <td className="p-4 text-center"><span className="inline-flex items-center gap-1 text-saffron text-xs font-medium"><HelpCircle className="w-4 h-4" /> Yes</span></td>
                  <td className="p-4 text-center"><span className="inline-flex items-center justify-center p-1.5 rounded-full bg-success/10 text-success"><BadgeCheck className="w-5 h-5" /></span></td>
                  <td className="p-4"><StatusBadge status="task_training" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
