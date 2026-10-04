import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { useAppStore } from '@/store/useAppStore';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Info, PlayCircle, BookOpen, AlertTriangle, Lightbulb, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function LearnerPracticalWorkbench() {
  const { t } = useTranslation();
  const { equipmentFault } = useAppStore();
  const [mode, setMode] = useState<'guided' | 'independent'>('guided');
  const [loadCellReading, setLoadCellReading] = useState(0.0);
  const [step, setStep] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [status, setStatus] = useState<'idle' | 'running' | 'fault' | 'mismatch' | 'success'>('idle');
  const [netInput, setNetInput] = useState('');

  // Simulate load cell reading
  useEffect(() => {
    if (status !== 'running') return;
    
    if (equipmentFault) {
      setStatus('fault');
      return;
    }

    const target = step === 1 ? 2.4 : step === 2 ? 0.4 : 0.0;
    
    const interval = setInterval(() => {
      setLoadCellReading(prev => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.05) return target;
        return prev + diff * 0.2 + (Math.random() * 0.02 - 0.01); // Add some noise
      });
    }, 100);

    return () => clearInterval(interval);
  }, [step, status, equipmentFault]);

  const handleStart = () => {
    setStatus('running');
    setStep(1); // Place gross weight
  };

  const handleSubmit = () => {
    const net = parseFloat(netInput);
    if (net === 2.0) { // 2.4 - 0.4
      setStatus('success');
    } else {
      setStatus('mismatch');
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="Practical Workbench Simulator"
        subtitle="Task: Goods Receiving (Weighing and reconciliation)"
        actions={
          <div className="flex bg-[var(--muted)] rounded-lg p-1">
            <button 
              onClick={() => { setMode('guided'); setStatus('idle'); setStep(0); setNetInput(''); setHintsUsed(0); }}
              className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", mode === 'guided' ? "bg-[var(--card)] shadow-sm" : "text-[var(--muted-foreground)]")}
            >
              Guided Mode
            </button>
            <button 
              onClick={() => { setMode('independent'); setStatus('idle'); setStep(0); setNetInput(''); setHintsUsed(0); }}
              className={cn("px-4 py-1.5 rounded-md text-sm font-medium transition-colors", mode === 'independent' ? "bg-primary text-white shadow-sm" : "text-[var(--muted-foreground)]")}
            >
              Independent Exam
            </button>
          </div>
        }
      />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Instructions and State */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-elevated p-5">
            <h3 className="font-semibold mb-4">Task Steps</h3>
            <div className="space-y-4">
              {[
                'Identify member and lot',
                'Place container (Gross Weight)',
                'Remove goods, place empty container (Tare)',
                'Calculate and enter Net Quantity',
                'Reconcile receipt'
              ].map((s, i) => (
                <div key={i} className={cn(
                  "flex items-start gap-3 p-3 rounded-lg border",
                  step === i ? "border-primary bg-primary/5" : step > i ? "border-success bg-success/5 opacity-70" : "border-[var(--border)] opacity-50"
                )}>
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                    step === i ? "bg-primary text-white" : step > i ? "bg-success text-white" : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                  )}>
                    {i + 1}
                  </div>
                  <span className="text-sm font-medium pt-0.5">{s}</span>
                </div>
              ))}
            </div>
            
            {status === 'idle' && (
              <button onClick={handleStart} className="w-full mt-6 py-2.5 bg-primary text-white rounded-lg font-medium flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" /> Start Attempt
              </button>
            )}

            {mode === 'guided' && status === 'running' && (
              <button 
                onClick={() => setHintsUsed(h => h + 1)}
                className="w-full mt-4 py-2 bg-saffron/10 text-saffron hover:bg-saffron/20 border border-saffron/20 rounded-lg font-medium flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Lightbulb className="w-4 h-4" /> Need a hint?
              </button>
            )}
            
            {hintsUsed > 0 && (
              <p className="text-xs text-saffron mt-2 text-center text-medium">
                {hintsUsed} hint(s) used. Logged in record.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Elements */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Animated Load Cell Widget */}
          <div className="card-elevated p-8 bg-gray-900 text-white relative overflow-hidden">
            <div className="absolute top-4 left-4 flex gap-2">
              <StatusBadge status="active" label="Sensor Connected" size="sm" />
              {mode === 'independent' && <StatusBadge status="warning" label="Identity Verifying" size="sm" />}
            </div>
            
            <div className="text-center mt-8">
              <p className="text-gray-400 mb-2 font-medium tracking-widest uppercase text-sm">Load Cell Reading</p>
              <div className="text-7xl font-mono font-bold tracking-tight mb-2">
                {loadCellReading.toFixed(2)} <span className="text-3xl text-gray-500">kg</span>
              </div>
              <p className="text-sm text-gray-500">Calibrated: Today, 08:00 AM</p>
            </div>

            {/* Simulated actions */}
            {status === 'running' && (
              <div className="flex justify-center gap-4 mt-8">
                {step === 1 && <button onClick={() => setStep(2)} className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200">Simulate: Place Empty (Tare)</button>}
                {step === 2 && <button onClick={() => setStep(3)} className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200">Simulate: Finalize Weigths</button>}
              </div>
            )}
          </div>

          {/* Input Area */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="card-elevated p-6 border-l-4 border-l-primary">
              <h3 className="font-semibold mb-4 text-lg">Enter Net Quantity</h3>
              <div className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="text-sm font-medium mb-1 block">Net Weight (kg)</label>
                  <input 
                    type="number" 
                    step="0.1"
                    value={netInput}
                    onChange={(e) => setNetInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-lg font-mono focus:ring-2 focus:ring-primary focus:outline-none"
                    placeholder="0.0"
                  />
                </div>
                <button onClick={handleSubmit} disabled={!netInput} className="px-6 py-2.5 bg-primary text-white rounded-lg font-medium h-12 disabled:opacity-50">
                  Submit
                </button>
              </div>
            </motion.div>
          )}

          {/* Status Results */}
          {status === 'fault' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-warning/10 border border-warning/30 flex gap-4">
              <ShieldAlert className="w-8 h-8 text-warning shrink-0" />
              <div>
                <h4 className="font-bold text-warning-dark text-lg">Equipment Issue Detected</h4>
                <p className="text-sm text-warning-dark/80 mt-1">Sensor drift detected. Attempt held for retest. <strong>You are not marked as failed.</strong></p>
                <button onClick={() => { setStatus('idle'); setStep(0); }} className="mt-3 px-4 py-1.5 bg-white rounded-lg text-sm font-medium shadow-sm flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" /> Reset Simulator
                </button>
              </div>
            </motion.div>
          )}

          {status === 'mismatch' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 rounded-xl bg-error/10 border border-error/30 flex gap-4">
              <AlertTriangle className="w-8 h-8 text-error shrink-0" />
              <div className="w-full">
                <h4 className="font-bold text-error-dark text-lg">Mismatch Detected</h4>
                <p className="text-sm text-error-dark/80 mt-1">
                  Gross: 2.4 kg, Tare: 0.4 kg. Correct Net: 2.0 kg. You entered: {netInput} kg.
                </p>
                
                <div className="mt-4 p-3 bg-white dark:bg-gray-800 rounded-lg border border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">Assigned Remedial Lesson</p>
                      <p className="text-xs text-[var(--muted-foreground)]">Net weight calculations and tare basics</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-primary/10 text-primary text-xs font-bold rounded-md">Start</button>
                </div>

                <div className="mt-4 flex gap-2">
                   <button onClick={() => { setStatus('idle'); setStep(0); setNetInput(''); }} className="px-4 py-1.5 bg-[var(--card)] border border-[var(--border)] rounded-lg text-sm font-medium hover:bg-[var(--muted)]">Try Again</button>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-6 rounded-xl bg-success/10 border border-success/30 text-center">
              <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center mx-auto mb-4">
                <ShieldAlert className="w-8 h-8 text-success" />
              </div>
              <h4 className="font-bold text-success-dark text-xl mb-2">Task Completed Successfully</h4>
              <p className="text-sm text-success-dark/80">Measurements match. Assessor will review sensor data timeline to sign off.</p>
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}
