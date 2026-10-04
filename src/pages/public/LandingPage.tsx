import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '@/components/ui/SharedComponents';
import {
  Shield, Target, Wifi, Award, RefreshCw, ArrowRight, Play,
  UserCheck, Fingerprint, QrCode, ClipboardList, Bus, DoorOpen,
  BookOpen, UtensilsCrossed, Wrench, FileCheck, CheckCircle2,
  Briefcase, Phone, ChevronRight, GraduationCap, Building2,
  BookOpenCheck, AlertTriangle, Users, BarChart3, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAppStore } from '@/store/useAppStore';
import { useState } from 'react';

const stats = [
  { key: 'institutions', value: 12, icon: Building2 },
  { key: 'learners', value: 2553, icon: Users },
  { key: 'programmes', value: 20, icon: BookOpenCheck },
  { key: 'credentialsIssued', value: 1847, icon: Award },
  { key: 'placementsVerified', value: 923, icon: Briefcase },
];

const problems = [
  'Fragmented registers across institutions with no single source of truth',
  'Proxy attendance undermines trust in training records',
  'Duplicated administrative effort wastes limited resources',
  'Weak rural access and unreliable connectivity interrupt learning',
  'No verified outcome data to guide planning and resource allocation',
];

const usps = [
  {
    icon: Shield,
    title: 'One verified identity across the full journey',
    desc: 'From enrolment to placement, a single face/fingerprint/QR identity ties together attendance, assessments, credentials and employment records. Aadhaar is referenced by token only.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Target,
    title: 'Skill proved on real equipment, with fair scoring',
    desc: 'Practical workbenches with sensors (load cells, temperature probes) measure learner performance objectively. Guided and Independent exam modes separate learning from assessment.',
    color: 'from-orange-400 to-red-500',
  },
  {
    icon: Wifi,
    title: 'Offline-first delivery with AR/VR sector labs',
    desc: 'Edge servers sync lessons and attendance locally. AR/VR labs simulate dairy, farming and factory environments so learners practise safely before touching real equipment.',
    color: 'from-green-400 to-emerald-600',
  },
  {
    icon: Award,
    title: 'Verified, portable credentials tied to real openings',
    desc: 'Signed certificates with QR verification push to DigiLocker. The career engine matches demonstrated tasks to employer requirements, not just keywords.',
    color: 'from-purple-400 to-violet-600',
  },
  {
    icon: RefreshCw,
    title: 'A closed loop from placement back to planning',
    desc: '30 and 90 day follow-ups track actual employment. Blockers feed back to NCCT analytics so the next programme targets real gaps, not assumptions.',
    color: 'from-teal-400 to-cyan-600',
  },
];

const journeySteps = [
  { icon: UserCheck, label: 'Nomination', desc: 'Cooperative or institution nominates a candidate' },
  { icon: Fingerprint, label: 'Enrolment', desc: 'Face, fingerprint and QR-based identity registration' },
  { icon: ClipboardList, label: 'Baseline', desc: 'Skill assessment to determine starting competency level' },
  { icon: Bus, label: 'Transport', desc: 'Bus route and seat allotment with GPS tracking' },
  { icon: DoorOpen, label: 'Check-in', desc: 'Hostel room allotment with RFID or face entry' },
  { icon: BookOpen, label: 'Lessons', desc: 'Online, offline and AR/VR learning with offline packs' },
  { icon: UtensilsCrossed, label: 'Mess', desc: 'Meal counts from verified attendance, RFID meal taps' },
  { icon: Wrench, label: 'Practice', desc: 'Guided practice on sensor-equipped workbenches' },
  { icon: FileCheck, label: 'Exam', desc: 'Independent assessment with identity checks, no hints' },
  { icon: CheckCircle2, label: 'Approval', desc: 'Assessor reviews sensor data and approves competency' },
  { icon: Award, label: 'Credential', desc: 'Signed certificate pushed to DigiLocker with QR code' },
  { icon: Briefcase, label: 'Match', desc: 'Career engine matches skills to employer openings' },
  { icon: Phone, label: 'Follow-up', desc: '30 and 90 day check-ins track real employment' },
];

const comparison = [
  { feature: 'Identity verification', typical: 'Manual register, no biometrics', kc: 'Face + fingerprint + QR, tokenised Aadhaar' },
  { feature: 'Attendance', typical: 'Paper sign-in, easy to proxy', kc: 'Biometric terminals with proxy detection and alerts' },
  { feature: 'Practical training', typical: 'Observation only, subjective scoring', kc: 'Sensor-equipped workbenches with objective measurements' },
  { feature: 'Assessment fairness', typical: 'Same exam format, hints available', kc: 'Guided vs Independent modes, randomised values, hint logging' },
  { feature: 'Credentials', typical: 'Paper certificates, no verification', kc: 'Signed digital credentials, QR verification, DigiLocker push' },
  { feature: 'Offline access', typical: 'Requires constant internet', kc: 'Edge servers, local sync, resumable uploads, conflict resolution' },
  { feature: 'Hostel and transport', typical: 'Separate manual systems', kc: 'Integrated management with RFID check-in and GPS tracking' },
  { feature: 'Placement tracking', typical: 'Self-reported, unverified', kc: 'Employer-verified placement with follow-up and blocker tracking' },
  { feature: 'Mess management', typical: 'Fixed meal counts, wastage', kc: 'Attendance-linked counts, RFID taps, wastage forecasting' },
  { feature: 'Planning', typical: 'Based on assumptions', kc: 'Verified outcomes feed back to demand vs capacity planning' },
];

const roleCards = [
  { role: 'admin' as const, icon: Shield, title: 'NCCT / Institution Admin', desc: 'Manage programmes, learners, facilities and outcomes at national scale.', path: '/admin', color: 'border-primary/30 hover:border-primary' },
  { role: 'trainer' as const, icon: BookOpen, title: 'Trainer / Assessor', desc: 'Deliver sessions, assess skills fairly and manage content.', path: '/trainer', color: 'border-purple-300 hover:border-purple-500' },
  { role: 'learner' as const, icon: GraduationCap, title: 'Learner', desc: 'Learn, practise, get certified and find employment.', path: '/learner', color: 'border-success/30 hover:border-success' },
  { role: 'employer' as const, icon: Building2, title: 'Employer / Cooperative', desc: 'Post openings, review verified candidates and track retention.', path: '/employer', color: 'border-saffron/30 hover:border-saffron' },
];

export default function LandingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setRole } = useAppStore();
  const [activeJourneyStep, setActiveJourneyStep] = useState(0);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-20 px-6 md:px-12 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-saffron/5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-saffron/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Smart India Hackathon 2026 | PS SIH26087
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading leading-tight mb-6">
              <span className="gradient-text">{t('tagline')}</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-3xl mx-auto mb-8">
              {t('subtitle')}
            </p>

            <div className="flex items-center justify-center gap-4 mb-12">
              <button
                onClick={() => navigate('/admin')}
                className="px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors shadow-lg shadow-primary/25 flex items-center gap-2"
              >
                {t('exploreDemo')} <ArrowRight className="w-4 h-4" />
              </button>
              <button
                className="px-6 py-3 bg-[var(--muted)] rounded-xl font-medium hover:bg-[var(--border)] transition-colors flex items-center gap-2"
              >
                <Play className="w-4 h-4" /> {t('watchVideo')}
              </button>
            </div>

            {/* Animated Journey Line */}
            <div className="relative max-w-4xl mx-auto">
              <div className="flex items-center justify-between relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-saffron to-success" />
                {['Identity', 'Learn', 'Practise', 'Certify', 'Placed'].map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.15 }}
                    className="relative z-10 flex flex-col items-center"
                  >
                    <div className={cn(
                      'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg',
                      i === 0 ? 'bg-primary' : i === 1 ? 'bg-blue-500' : i === 2 ? 'bg-saffron' : i === 3 ? 'bg-purple-500' : 'bg-success'
                    )}>
                      {i + 1}
                    </div>
                    <span className="mt-2 text-xs font-medium">{step}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="py-8 px-6 bg-primary text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <div className="text-3xl font-bold font-heading">
                    <AnimatedCounter value={s.value} />
                  </div>
                  <div className="text-sm opacity-80">{t(s.key)}</div>
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-xs opacity-60 mt-4">{t('syntheticData')}</p>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold font-heading text-center mb-8">{t('theProblem')}</h2>
            <div className="grid gap-3">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 p-4 rounded-xl bg-error/5 border border-error/10"
                >
                  <AlertTriangle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
                  <p className="text-sm">{p}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5 USPs */}
      <section className="py-16 px-6 bg-[var(--muted)]/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">{t('fiveUSPs')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {usps.map((usp, i) => {
              const Icon = usp.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="card-elevated p-6 cursor-pointer group"
                >
                  <div className={cn('w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform', usp.color)}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold font-heading mb-2">{usp.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{usp.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learner Journey */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-12">{t('learnerJourney')}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {journeySteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = activeJourneyStep === i;
              return (
                <motion.button
                  key={i}
                  onClick={() => setActiveJourneyStep(i)}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    'p-4 rounded-xl text-center transition-all border',
                    isActive
                      ? 'bg-primary/10 border-primary shadow-md'
                      : 'bg-[var(--card)] border-[var(--border)] hover:border-primary/30'
                  )}
                >
                  <Icon className={cn('w-6 h-6 mx-auto mb-2', isActive ? 'text-primary' : 'text-[var(--muted-foreground)]')} />
                  <p className="text-xs font-medium">{step.label}</p>
                </motion.button>
              );
            })}
          </div>
          {/* Detail panel */}
          <motion.div
            key={activeJourneyStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-6 rounded-xl bg-primary/5 border border-primary/10"
          >
            <div className="flex items-center gap-3">
              {(() => { const Icon = journeySteps[activeJourneyStep].icon; return <Icon className="w-6 h-6 text-primary" />; })()}
              <div>
                <h3 className="font-semibold">{journeySteps[activeJourneyStep].label}</h3>
                <p className="text-sm text-[var(--muted-foreground)]">{journeySteps[activeJourneyStep].desc}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Role Cards */}
      <section className="py-16 px-6 bg-[var(--muted)]/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-8">Explore by Role</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {roleCards.map((rc) => {
              const Icon = rc.icon;
              return (
                <motion.button
                  key={rc.role}
                  onClick={() => { setRole(rc.role); navigate(rc.path); }}
                  whileHover={{ y: -4 }}
                  className={cn('p-6 rounded-2xl bg-[var(--card)] border-2 text-left transition-all shadow-sm', rc.color)}
                >
                  <Icon className="w-8 h-8 mb-3 text-primary" />
                  <h3 className="font-semibold font-heading mb-1">{rc.title}</h3>
                  <p className="text-xs text-[var(--muted-foreground)]">{rc.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-xs font-medium text-primary">
                    Enter dashboard <ChevronRight className="w-3 h-3" />
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold font-heading text-center mb-8">{t('whyDifferent')}</h2>
          <div className="overflow-x-auto rounded-2xl border border-[var(--border)]">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[var(--muted)]">
                  <th className="text-left p-4 font-semibold">Feature</th>
                  <th className="text-left p-4 font-semibold text-[var(--muted-foreground)]">Typical LMS + ERP</th>
                  <th className="text-left p-4 font-semibold text-primary">KaushalyaConnect</th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((row, i) => (
                  <tr key={i} className="border-t border-[var(--border)] hover:bg-[var(--muted)]/50">
                    <td className="p-4 font-medium">{row.feature}</td>
                    <td className="p-4 text-[var(--muted-foreground)]">{row.typical}</td>
                    <td className="p-4 text-primary font-medium">{row.kc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-primary text-white/80">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-2xl font-bold font-heading mb-2 text-white">KaushalyaConnect</div>
          <p className="text-sm mb-4">{t('subtitle')}</p>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-xs mb-4">
            <span>{t('footerMinistry')}</span>
            <span>{t('footerNCCT')}</span>
            <span>{t('footerMentions')}</span>
          </div>
          <p className="text-xs text-white/60 mb-2">{t('footerTeam')}</p>
          <p className="text-xs text-white/40">{t('footerSynthetic')}</p>
        </div>
      </footer>
    </div>
  );
}
