import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { learners } from '@/data/learners';
import { Award, DownloadCloud, Share2, ShieldCheck, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';
import { mockDelay } from '@/lib/utils';

export default function LearnerCredentials() {
  const { t } = useTranslation();
  const learner = learners[0];

  const [pushingId, setPushingId] = useState<string | null>(null);
  const [showQR, setShowQR] = useState<string | null>(null);

  const handleDigiLockerPush = async (credId: string) => {
    setPushingId(credId);
    await mockDelay(1500); // Simulate API call
    setPushingId(null);
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0B1F4B', '#F28C28', '#1E8E5A']
    });

    // In a real app, we would update the state here to show it's pushed.
    // Since it's mock data, we just rely on the confetti to show success for the demo.
  };

  return (
    <div className="max-w-5xl mx-auto">
      <PageHeader
        title="My Credentials"
        subtitle="Verified, portable credentials tied to your identity."
      />

      {learner.credentials.length === 0 ? (
        <div className="card-elevated p-12 text-center flex flex-col items-center">
           <Award className="w-16 h-16 text-[var(--muted-foreground)] mb-4 opacity-50" />
           <h3 className="text-xl font-bold mb-2">No Credentials Yet</h3>
           <p className="text-[var(--muted-foreground)] max-w-sm">Complete your programme and pass the independent assessments to earn your first verified credential.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {learner.credentials.map((cred, i) => (
            <motion.div 
              key={cred.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-elevated overflow-hidden flex flex-col"
            >
              {/* Certificate Header */}
              <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white relative">
                 <div className="absolute top-4 right-4 opacity-20">
                    <Award className="w-24 h-24" />
                 </div>
                 <div className="relative z-10">
                    <span className="text-xs font-bold tracking-widest uppercase mb-1 block opacity-80">{cred.issuer}</span>
                    <h3 className="text-xl font-heading font-bold leading-tight">{cred.title}</h3>
                    <p className="text-sm font-hindi opacity-90 mt-1">{cred.titleHi}</p>
                 </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col">
                 <div className="grid grid-cols-2 gap-4 mb-6">
                   <div>
                      <p className="text-xs text-[var(--muted-foreground)]">Issued To</p>
                      <p className="font-medium text-sm mt-0.5">{learner.name}</p>
                   </div>
                   <div>
                      <p className="text-xs text-[var(--muted-foreground)]">Date</p>
                      <p className="font-medium text-sm mt-0.5">{new Date(cred.issuedDate).toLocaleDateString()}</p>
                   </div>
                   <div>
                      <p className="text-xs text-[var(--muted-foreground)]">Status</p>
                      <div className="mt-0.5"><StatusBadge status={cred.status} size="sm" /></div>
                   </div>
                   {cred.credits && (
                     <div>
                        <p className="text-xs text-[var(--muted-foreground)]">NCF Credits</p>
                        <p className="font-medium text-sm mt-0.5">{cred.credits}</p>
                     </div>
                   )}
                 </div>

                 {/* Actions */}
                 <div className="mt-auto pt-4 border-t border-[var(--border)] space-y-3">
                   <div className="flex gap-2">
                     <button className="flex-1 px-3 py-2 bg-[var(--muted)] hover:bg-[var(--border)] transition-colors rounded-lg text-sm font-medium flex items-center justify-center gap-2">
                       <DownloadCloud className="w-4 h-4" /> PDF
                     </button>
                     <button 
                       onClick={() => setShowQR(showQR === cred.id ? null : cred.id)}
                       className="flex-1 px-3 py-2 bg-[var(--muted)] hover:bg-[var(--border)] transition-colors rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                     >
                       <QrCode className="w-4 h-4" /> Verify
                     </button>
                     <button className="flex-none w-10 h-10 bg-[var(--muted)] hover:bg-[var(--border)] transition-colors rounded-lg flex items-center justify-center">
                       <Share2 className="w-4 h-4" />
                     </button>
                   </div>

                   <button 
                     onClick={() => handleDigiLockerPush(cred.id)}
                     disabled={pushingId === cred.id || cred.digilockerPushed}
                     className={cn(
                       "w-full px-4 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all",
                       cred.digilockerPushed 
                         ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800" 
                         : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                     )}
                   >
                     {pushingId === cred.id ? (
                        <span className="flex items-center gap-2">Pushing...</span>
                     ) : cred.digilockerPushed ? (
                        <><ShieldCheck className="w-4 h-4" /> Available in DigiLocker</>
                     ) : (
                        <><img src="https://upload.wikimedia.org/wikipedia/commons/5/52/DigiLocker_logo.svg" alt="DigiLocker" className="h-5 brightness-0 invert" /> Push to DigiLocker</>
                     )}
                   </button>
                 </div>
              </div>

              {/* QR Overlay */}
              <AnimatePresence>
                {showQR === cred.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="border-t border-[var(--border)] bg-gray-50 dark:bg-gray-800/50 p-6 flex flex-col items-center text-center"
                  >
                     <div className="bg-white p-3 rounded-xl shadow-sm mb-4">
                        <QRCodeSVG value={`https://verify.kaushalyaconnect.gov.in/${cred.id}`} size={140} />
                     </div>
                     <p className="text-sm font-medium">Scan to verify authenticity</p>
                     <p className="text-xs text-[var(--muted-foreground)] mt-1">Signature valid. Revocation checked just now.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}

      {/* Credit Wallet */}
      {learner.credentials.some(c => c.credits) && (
         <div className="mt-8 card-elevated p-6 bg-gradient-to-br from-[var(--muted)] to-[var(--card)]">
            <h3 className="font-semibold font-heading mb-2">National Credit Framework (NCF) Wallet</h3>
            <p className="text-sm text-[var(--muted-foreground)] max-w-2xl mb-6">Your earned credits are mapped to the NCF, allowing for seamless transfer between vocational and academic pathways.</p>
            
            <div className="flex items-center gap-4">
               <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center flex-col">
                  <span className="text-3xl font-bold font-heading">{learner.credentials.reduce((sum, c) => sum + (c.credits || 0), 0)}</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Credits</span>
               </div>
               <div>
                  <p className="font-medium text-sm">Level 3 Equivalent</p>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1">Transferable to ITI or Diploma courses</p>
               </div>
            </div>
         </div>
      )}
    </div>
  );
}
