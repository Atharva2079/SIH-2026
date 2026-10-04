import { useTranslation } from 'react-i18next';
import { PageHeader, StatusBadge } from '@/components/ui/SharedComponents';
import { learners } from '@/data/learners';
import { QRCodeSVG } from 'qrcode.react';
import { Fingerprint, ScanFace, QrCode, ShieldCheck, Download, ExternalLink, Settings2, Info } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function LearnerIdentity() {
  const { t } = useTranslation();
  const learner = learners[0];

  const [consents, setConsents] = useState(learner.consentStatus);

  const handleToggleConsent = (key: keyof typeof consents) => {
    setConsents(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        title="My Identity"
        subtitle="Manage your digital ID and privacy preferences."
      />

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* ID Card */}
        <div className="card-elevated relative overflow-hidden bg-gradient-to-br from-primary via-primary-light to-blue-900 text-white p-6">
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10" />
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-heading font-bold text-lg">KaushalyaConnect ID</h3>
                <p className="text-xs text-white/70">Ministry of Cooperation</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-white p-1">
                <QRCodeSVG value={`KC-ID-${learner.id}`} size={40} className="w-full h-full" />
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold font-heading">{learner.name}</h2>
              <p className="text-sm text-white/80 font-hindi mt-1">{learner.nameHi}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-6">
              <div>
                <p className="text-white/60 text-xs">ID Number</p>
                <p className="font-mono mt-0.5">{learner.id.toUpperCase()}</p>
              </div>
              <div>
                <p className="text-white/60 text-xs">State</p>
                <p className="mt-0.5">{learner.state}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/20 flex items-center justify-between">
              <span className="text-xs text-white/80">Valid till: Dec 2026</span>
              <div className="flex gap-2">
                <StatusBadge status={learner.enrolmentStatus.face ? 'verified' : 'pending'} size="sm" />
              </div>
            </div>
          </div>
        </div>

        {/* Biometrics Status */}
        <div className="card-elevated p-6 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold font-heading mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Enrolment Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", learner.enrolmentStatus.face ? "bg-success/10 text-success" : "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                    <ScanFace className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Face Recognition</p>
                    <p className="text-xs text-[var(--muted-foreground)]">Local device processing only</p>
                  </div>
                </div>
                {learner.enrolmentStatus.face ? <CheckCircle /> : <button className="text-xs text-primary font-medium border border-primary px-2 py-1 rounded">Setup</button>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={cn("p-2 rounded-lg", learner.enrolmentStatus.fingerprint ? "bg-success/10 text-success" : "bg-[var(--muted)] text-[var(--muted-foreground)]")}>
                    <Fingerprint className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Fingerprint</p>
                    <p className="text-xs text-[var(--muted-foreground)]">For workbench & exams</p>
                  </div>
                </div>
                {learner.enrolmentStatus.fingerprint ? <CheckCircle /> : <button className="text-xs text-primary font-medium border border-primary px-2 py-1 rounded">Setup</button>}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-success/10 text-success">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Digital QR Code</p>
                    <p className="text-xs text-[var(--muted-foreground)]">For quick sign-ins</p>
                  </div>
                </div>
                <CheckCircle />
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t border-[var(--border)] bg-blue-50/50 dark:bg-blue-900/10 p-3 rounded-lg flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
              <strong>Aadhaar token is active.</strong> Your Aadhaar number is never stored, only a secure reference token is kept to prevent duplicates.
            </p>
          </div>
        </div>
      </div>

      {/* Consents */}
      <div className="card-elevated p-6">
        <h3 className="font-semibold font-heading mb-4 flex items-center gap-2">
          <Settings2 className="w-5 h-5 text-primary" />
          Consent & Privacy
        </h3>
        
        <div className="space-y-4">
          <ConsentToggle 
            title="Attendance Biometrics" 
            desc="Allow face and fingerprint to be used for proxy-free attendance. Processing happens on edge devices." 
            active={consents.biometrics} 
            onToggle={() => handleToggleConsent('biometrics')}
          />
          <ConsentToggle 
            title="Aadhaar-route Verification" 
            desc="Allow generating a secure token via Aadhaar to establish unique identity. (Number is not stored)." 
            active={consents.aadhaarToken} 
            onToggle={() => handleToggleConsent('aadhaarToken')}
          />
          <ConsentToggle 
            title="Employer Visibility" 
            desc="Allow verified employers to view your demonstrated skills, exam mode, and contact details." 
            active={consents.employerVisibility} 
            onToggle={() => handleToggleConsent('employerVisibility')}
          />
          <ConsentToggle 
            title="Follow-up Contact" 
            desc="Allow system coordinators to contact you at 30 and 90 days after training to check employment status." 
            active={consents.followUpContact} 
            onToggle={() => handleToggleConsent('followUpContact')}
          />
        </div>
      </div>
    </div>
  );
}

function CheckCircle() {
  return (
    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center">
      <div className="w-2 h-2 rounded-full bg-success" />
    </div>
  );
}

function ConsentToggle({ title, desc, active, onToggle }: { title: string, desc: string, active: boolean, onToggle: () => void }) {
  return (
    <div className="flex items-start justify-between p-3 rounded-xl hover:bg-[var(--muted)]/50 transition-colors border border-transparent hover:border-[var(--border)]">
      <div className="pr-4">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-[var(--muted-foreground)] mt-1">{desc}</p>
      </div>
      <button 
        onClick={onToggle}
        className={cn(
          "relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          active ? "bg-success" : "bg-gray-200 dark:bg-gray-700"
        )}
      >
        <span 
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
            active ? "translate-x-4" : "translate-x-0"
          )}
        />
      </button>
    </div>
  );
}
