import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { motion } from 'framer-motion';
import { Shield, BookOpen, GraduationCap, Building2, Phone, ArrowRight, Check, Eye, EyeOff, UserPlus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Role } from '@/types';

const roles = [
  { key: 'admin' as Role, icon: Shield, label: 'NCCT / Institution Admin', color: 'border-primary bg-primary/5' },
  { key: 'trainer' as Role, icon: BookOpen, label: 'Trainer / Assessor', color: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' },
  { key: 'learner' as Role, icon: GraduationCap, label: 'Learner', color: 'border-success bg-success/5' },
  { key: 'employer' as Role, icon: Building2, label: 'Employer / Cooperative', color: 'border-saffron bg-saffron/5' },
];

export default function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setRole } = useAppStore();

  const [selectedRole, setSelectedRole] = useState<Role>('learner');
  const [step, setStep] = useState<'role' | 'otp' | 'consent' | 'assisted'>('role');
  const [phone, setPhone] = useState('+91 ');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [showAssisted, setShowAssisted] = useState(false);
  const [assistedStaff, setAssistedStaff] = useState('');

  const [consents, setConsents] = useState({
    biometrics: true,
    aadhaarToken: true,
    employerVisibility: true,
    followUpContact: true,
  });

  const handleSendOtp = () => {
    if (phone.length >= 14) {
      setOtpSent(true);
    }
  };

  const handleVerifyOtp = () => {
    if (otp.length === 6) {
      setStep('consent');
    }
  };

  const handleLogin = () => {
    setRole(selectedRole);
    const paths: Record<Role, string> = {
      admin: '/admin',
      trainer: '/trainer',
      learner: '/learner',
      employer: '/employer',
    };
    navigate(paths[selectedRole]);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-saffron/5" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md"
      >
        <div className="card-elevated p-8">
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-3">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <h1 className="text-2xl font-bold font-heading">{t('appName')}</h1>
            <p className="text-sm text-[var(--muted-foreground)] mt-1">{t('login')}</p>
          </div>

          {/* Step: Role Selection */}
          {step === 'role' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
              <p className="text-sm font-medium mb-3">Select your role:</p>
              {roles.map((r) => {
                const Icon = r.icon;
                return (
                  <button
                    key={r.key}
                    onClick={() => setSelectedRole(r.key)}
                    className={cn(
                      'w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left',
                      selectedRole === r.key ? r.color : 'border-transparent hover:border-[var(--border)]'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="text-sm font-medium">{r.label}</span>
                    {selectedRole === r.key && <Check className="w-4 h-4 ml-auto text-primary" />}
                  </button>
                );
              })}

              <button
                onClick={() => setStep('otp')}
                className="w-full mt-4 px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
              >
                Continue <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => { setShowAssisted(true); setStep('assisted'); }}
                className="w-full px-4 py-2 text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors flex items-center justify-center gap-1"
              >
                <UserPlus className="w-3 h-3" /> Assisted registration (staff on behalf of learner)
              </button>
            </motion.div>
          )}

          {/* Step: Assisted Registration */}
          {step === 'assisted' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <p className="text-sm font-medium">Assisted Registration Mode</p>
              <p className="text-xs text-[var(--muted-foreground)]">Staff registers on behalf of a learner. Staff identity is recorded.</p>

              <div>
                <label className="text-xs font-medium block mb-1">Assisting staff name</label>
                <input
                  type="text"
                  value={assistedStaff}
                  onChange={(e) => setAssistedStaff(e.target.value)}
                  placeholder="Enter staff name"
                  className="w-full px-3 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-medium block mb-1">Learner mobile number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-3 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-2">
                <button onClick={() => setStep('role')} className="flex-1 px-4 py-2 bg-[var(--muted)] rounded-xl text-sm">Back</button>
                <button
                  onClick={() => setStep('consent')}
                  disabled={!assistedStaff}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-xl text-sm disabled:opacity-50"
                >
                  Register
                </button>
              </div>
            </motion.div>
          )}

          {/* Step: OTP Login */}
          {step === 'otp' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div>
                <label className="text-xs font-medium block mb-1">Mobile number</label>
                <div className="flex gap-2">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 9876543210"
                    className="flex-1 px-3 py-2 rounded-lg bg-[var(--muted)] border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={handleSendOtp}
                    disabled={phone.length < 14}
                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium disabled:opacity-50 whitespace-nowrap"
                  >
                    {otpSent ? 'Resend' : 'Send OTP'}
                  </button>
                </div>
              </div>

              {otpSent && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                  <label className="text-xs font-medium block mb-1">Enter OTP</label>
                  <div className="flex gap-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <input
                        key={i}
                        type="text"
                        maxLength={1}
                        value={otp[i] || ''}
                        onChange={(e) => {
                          const val = otp.split('');
                          val[i] = e.target.value;
                          setOtp(val.join(''));
                          if (e.target.value && i < 5) {
                            const next = e.target.parentElement?.children[i + 1] as HTMLInputElement;
                            next?.focus();
                          }
                        }}
                        className="w-10 h-12 text-center rounded-lg bg-[var(--muted)] border border-[var(--border)] text-lg font-bold focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    ))}
                  </div>
                  <p className="text-xs text-[var(--muted-foreground)] mt-2">Demo: enter any 6 digits</p>
                </motion.div>
              )}

              <div className="flex gap-2">
                <button onClick={() => setStep('role')} className="flex-1 px-4 py-2 bg-[var(--muted)] rounded-xl text-sm">Back</button>
                <button
                  onClick={handleVerifyOtp}
                  disabled={otp.length < 6}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-xl text-sm disabled:opacity-50"
                >
                  Verify
                </button>
              </div>
            </motion.div>
          )}

          {/* Step: Consent */}
          {step === 'consent' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <h3 className="font-semibold text-sm">Review your consent preferences</h3>
              <p className="text-xs text-[var(--muted-foreground)]">You can change these at any time from your profile settings.</p>

              {[
                { key: 'biometrics', label: 'Attendance biometrics (face and fingerprint verification)', desc: 'Used for proxy-free attendance. Data is processed on-device.' },
                { key: 'aadhaarToken', label: 'Aadhaar-route verification (token only)', desc: 'Your Aadhaar number is never stored. Only a verification token is used.' },
                { key: 'employerVisibility', label: 'Profile visible to employers', desc: 'Employers can see your demonstrated skills and credentials.' },
                { key: 'followUpContact', label: 'Follow-up contact after placement', desc: 'We may contact you at 30 and 90 days to check on your employment.' },
              ].map((c) => (
                <label key={c.key} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--muted)] cursor-pointer">
                  <div className="mt-0.5">
                    <button
                      onClick={() => setConsents(prev => ({ ...prev, [c.key]: !prev[c.key as keyof typeof prev] }))}
                      className={cn(
                        'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                        consents[c.key as keyof typeof consents] ? 'bg-primary border-primary' : 'border-[var(--border)]'
                      )}
                    >
                      {consents[c.key as keyof typeof consents] && <Check className="w-3 h-3 text-white" />}
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.label}</p>
                    <p className="text-xs text-[var(--muted-foreground)] mt-0.5">{c.desc}</p>
                  </div>
                </label>
              ))}

              <button
                onClick={handleLogin}
                className="w-full px-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors flex items-center justify-center gap-2"
              >
                Enter Dashboard <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
