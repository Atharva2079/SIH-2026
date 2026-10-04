import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { PlayCircle, DownloadCloud, CheckCircle2, Cuboid, Eye } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const labs = [
  {
    id: 'lab-1',
    title: 'Farmer: Crop Management',
    desc: 'Practice soil sampling, drip irrigation setup, pesticide safety, and crop disease identification in a simulated field.',
    sector: 'Agriculture',
    offline: true,
    size: '120 MB',
    thumbnail: 'bg-green-100 dark:bg-green-900/20 text-green-600',
  },
  {
    id: 'lab-2',
    title: 'Dairy: Collection Centre',
    desc: 'Simulated workflow of a milk collection centre including milking hygiene, equipment operation, and cleaning SOPs.',
    sector: 'Dairy',
    offline: true,
    size: '85 MB',
    thumbnail: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600',
  },
  {
    id: 'lab-3',
    title: 'Factory: Machine Safety',
    desc: 'Learn PPE protocols, lock-out/tag-out steps, and safe packaging line SOPs in an interactive factory environment.',
    sector: 'Processing',
    offline: false,
    size: '150 MB',
    thumbnail: 'bg-saffron/10 text-saffron',
  },
];

export default function LearnerARVRLabs() {
  const { t } = useTranslation();
  const [activeLab, setActiveLab] = useState<typeof labs[0] | null>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="AR/VR Labs"
        subtitle="Practice skills safely in simulated environments before touching real equipment."
      />

      {!activeLab ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {labs.map((lab, i) => (
            <motion.div
              key={lab.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-elevated overflow-hidden group cursor-pointer"
              onClick={() => setActiveLab(lab)}
            >
              <div className={`h-40 ${lab.thumbnail} flex items-center justify-center relative`}>
                <Cuboid className="w-16 h-16 opacity-50 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-primary px-2 py-0.5 rounded-full bg-primary/10">
                    {lab.sector}
                  </span>
                  {lab.offline && <StatusBadge status="completed" label="Offline Ready" size="sm" />}
                </div>
                <h3 className="font-bold text-lg mb-2">{lab.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] line-clamp-2 mb-4">
                  {lab.desc}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[var(--border)]">
                  <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                    <DownloadCloud className="w-3 h-3" /> {lab.size}
                  </span>
                  <button className="text-sm font-medium text-primary flex items-center gap-1">
                    Start Lab <PlayCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <LabViewer lab={activeLab} onClose={() => setActiveLab(null)} />
      )}
    </div>
  );
}

function LabViewer({ lab, onClose }: { lab: typeof labs[0], onClose: () => void }) {
  const [step, setStep] = useState(0);
  const steps = [
    { text: 'Identify correct PPE for the task.', score: 0 },
    { text: 'Perform safety lock-out procedure.', score: 0 },
    { text: 'Complete the simulated workflow.', score: 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="card-elevated overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 bg-[var(--muted)] border-b border-[var(--border)]">
        <div>
          <h2 className="font-bold font-heading">{lab.title}</h2>
          <p className="text-xs text-[var(--muted-foreground)]">Simulated Environment</p>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-sm font-medium flex items-center gap-1">
            <Eye className="w-4 h-4" /> Open in AR
          </button>
          <button onClick={onClose} className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm font-medium">
            Exit Lab
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-0">
        <div className="md:col-span-2 bg-gray-900 h-[60vh] relative flex items-center justify-center overflow-hidden">
          {/* Simulated 3D Scene Background */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, #4a5568 0%, #1a202c 100%)',
            backgroundSize: '100% 100%'
          }}>
             <div className="w-full h-full" style={{
               background: 'linear-gradient(90deg, transparent 95%, rgba(255,255,255,0.1) 100%)',
               backgroundSize: '40px 40px'
             }}/>
          </div>
          
          <div className="relative z-10 text-center">
             <Cuboid className="w-24 h-24 text-blue-400 mx-auto mb-6 animate-pulse" />
             <h3 className="text-xl text-white font-bold mb-2">Interactive 3D Scene</h3>
             <p className="text-gray-400 max-w-sm mx-auto text-sm">
               VR scores procedure and decisions. Physical skill is assessed on the kit or by an assessor.
             </p>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4 flex justify-center">
             <button onClick={() => setStep(s => Math.min(steps.length, s + 1))} className="px-6 py-2 bg-white text-black font-bold rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-105 active:scale-95">
                {step < steps.length ? `Complete Step ${step + 1}` : 'Finish Lab'}
             </button>
          </div>
        </div>

        <div className="p-6 bg-[var(--card)] border-l border-[var(--border)]">
          <h3 className="font-bold mb-4">Task Checklist</h3>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                    step > i ? "bg-success text-white" : step === i ? "bg-primary text-white ring-4 ring-primary/20" : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                  )}>
                    {step > i ? <CheckCircle2 className="w-5 h-5" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && <div className="w-0.5 h-full bg-[var(--border)] mt-2" />}
                </div>
                <div className="pb-6 pt-1">
                  <p className={cn("text-sm font-medium", step < i && "text-[var(--muted-foreground)]")}>{s.text}</p>
                  {step > i && (
                    <p className="text-xs text-success mt-1">Decision logged. Score: +10</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {step === steps.length && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-success/10 rounded-xl border border-success/20 text-center">
              <h4 className="font-bold text-success mb-1">Lab Completed</h4>
              <p className="text-sm text-success/80 mb-3">You made the correct decisions.</p>
              <button onClick={onClose} className="w-full py-2 bg-success text-white rounded-lg text-sm font-medium">
                Return to Modules
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
