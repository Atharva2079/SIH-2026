import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { useAppStore } from '@/store/useAppStore';
import { Wifi, WifiOff, RefreshCw, HardDrive, AlertTriangle, UploadCloud, Database, ServerCrash, ZapOff, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function LearnerOfflineCentre() {
  const { t } = useTranslation();
  const { connectivity, setConnectivity, powerCut } = useAppStore();
  const [syncing, setSyncing] = useState(false);
  
  // Mock queued events
  const [queue, setQueue] = useState([
    { id: 'ev-1', seq: 1042, type: 'Attendance (Face)', size: '12 KB', status: 'queued', conflict: false },
    { id: 'ev-2', seq: 1043, type: 'Lesson Progress (Mod 2)', size: '4 KB', status: 'queued', conflict: false },
    { id: 'ev-3', seq: 1044, type: 'Practical Attempt Data', size: '2.4 MB', status: 'queued', conflict: false },
    { id: 'ev-4', seq: 1045, type: 'Lesson Progress (Mod 2)', size: '4 KB', status: 'queued', conflict: true, reason: 'Duplicate event acknowledged' },
  ]);

  const [powerCutAttempt, setPowerCutAttempt] = useState(powerCut);

  useEffect(() => {
    if (powerCut) {
       setPowerCutAttempt(true);
    }
  }, [powerCut]);

  const handleSync = () => {
    setConnectivity('syncing');
    setSyncing(true);
    
    // Simulate syncing one by one
    let current = 0;
    const interval = setInterval(() => {
      if (current < queue.length) {
        setQueue(prev => prev.map((q, i) => i === current ? { ...q, status: q.conflict ? 'duplicate' : 'synced' } : q));
        current++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setConnectivity('online');
          setSyncing(false);
        }, 500);
      }
    }, 800); // 800ms per item
  };

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Offline Centre Simulator"
        subtitle="Manage local data and sync state. The app works seamlessly without internet."
      />

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Status Card */}
        <div className={cn("md:col-span-1 card-elevated p-6 flex flex-col items-center justify-center text-center transition-colors", 
          connectivity === 'online' ? 'bg-success/5 border-success/20' : 
          connectivity === 'offline' ? 'bg-error/5 border-error/20' : 'bg-warning/5 border-warning/20'
        )}>
           {connectivity === 'online' && <Wifi className="w-16 h-16 text-success mb-4" />}
           {connectivity === 'offline' && <WifiOff className="w-16 h-16 text-error mb-4" />}
           {connectivity === 'syncing' && <RefreshCw className="w-16 h-16 text-warning mb-4 animate-spin" />}
           
           <h3 className="text-xl font-bold font-heading mb-1 capitalize text-[var(--foreground)]">System {connectivity}</h3>
           <p className="text-sm text-[var(--muted-foreground)]">
             {connectivity === 'online' ? 'Connected to cloud server.' : 
              connectivity === 'offline' ? 'Logging locally to edge server.' : 'Synchronising data...'}
           </p>

           <button 
             onClick={() => setConnectivity(connectivity === 'online' ? 'offline' : 'online')}
             className="mt-6 px-6 py-2 border-2 border-[var(--border)] rounded-full text-sm font-bold hover:bg-[var(--muted)]"
             disabled={syncing}
           >
             {connectivity === 'online' ? 'Simulate Disconnect' : 'Simulate Reconnect'}
           </button>
        </div>

        {/* Local Storage & Sync */}
        <div className="md:col-span-2 card-elevated p-6 flex flex-col">
           <div className="flex items-start justify-between mb-6">
              <div>
                 <h3 className="font-semibold font-heading flex items-center gap-2 mb-1">
                    <Database className="w-5 h-5 text-primary" /> Edge Server Queue
                 </h3>
                 <p className="text-sm text-[var(--muted-foreground)]">Locally stored events awaiting cloud sync.</p>
              </div>
              <button 
                 onClick={handleSync}
                 disabled={connectivity === 'offline' || syncing || queue.every(q => q.status !== 'queued')}
                 className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50 flex items-center gap-2"
              >
                 <UploadCloud className="w-4 h-4" /> Sync Now
              </button>
           </div>

           <div className="flex-1 border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--muted)]/30">
              <div className="grid grid-cols-12 gap-2 p-3 bg-[var(--muted)] text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                 <div className="col-span-2">Seq</div>
                 <div className="col-span-5">Event Type</div>
                 <div className="col-span-2 text-right">Size</div>
                 <div className="col-span-3 text-center">Status</div>
              </div>
              <div className="divide-y divide-[var(--border)] overflow-y-auto max-h-[240px]">
                 {queue.map(q => (
                    <div key={q.id} className="grid grid-cols-12 gap-2 p-3 text-sm items-center hover:bg-[var(--card)] transition-colors">
                       <div className="col-span-2 font-mono text-xs">{q.seq}</div>
                       <div className="col-span-5">
                          <p className="font-medium">{q.type}</p>
                          {q.conflict && <p className="text-[10px] text-saffron mt-0.5">{q.reason}</p>}
                       </div>
                       <div className="col-span-2 text-right text-xs text-[var(--muted-foreground)]">{q.size}</div>
                       <div className="col-span-3 text-center">
                          {q.status === 'queued' && <StatusBadge status="draft" label="Queued" size="sm" />}
                          {q.status === 'synced' && <StatusBadge status="verified" label="Synced" size="sm" />}
                          {q.status === 'duplicate' && <StatusBadge status="warning" label="Duplicate" size="sm" />}
                       </div>
                    </div>
                 ))}
                 {queue.every(q => q.status !== 'queued') && !syncing && (
                    <div className="p-8 text-center text-[var(--muted-foreground)] text-sm flex flex-col items-center">
                       <CheckCircle2 className="w-8 h-8 text-success mb-2 opacity-50" />
                       All data synchronised. Queue is empty.
                    </div>
                 )}
              </div>
           </div>
           
           <div className="mt-4 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <HardDrive className="w-4 h-4" /> Resumable upload enabled. Small records sync first, followed by large evidence files.
           </div>
        </div>
      </div>

      {/* Power Cut Case */}
      <AnimatePresence>
         {powerCutAttempt && (
            <motion.div 
               initial={{ opacity: 0, height: 0 }}
               animate={{ opacity: 1, height: 'auto' }}
               className="card-elevated p-6 border-l-4 border-error bg-error/5"
            >
               <div className="flex gap-4">
                  <ZapOff className="w-8 h-8 text-error shrink-0" />
                  <div>
                     <h3 className="font-bold text-error-dark text-lg">Power Cut Recovery</h3>
                     <p className="text-sm text-error-dark/80 mt-1 mb-4">
                        A power cut occurred during your Practical Workbench attempt. The edge server preserved your state.
                     </p>
                     <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-[var(--border)] flex items-center justify-between">
                        <div>
                           <p className="font-medium">Task: Goods Receiving</p>
                           <p className="text-xs text-[var(--muted-foreground)] mt-0.5">Status: Unfinished (Step 2 completed)</p>
                        </div>
                        <button className="px-4 py-2 bg-[var(--card)] border border-[var(--border)] shadow-sm rounded-lg text-sm font-bold">
                           Resume Attempt
                        </button>
                     </div>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
    </div>
  );
}
