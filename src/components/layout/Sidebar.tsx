import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, BookPlus, Users, CalendarDays, Building, UtensilsCrossed,
  Bus, Fingerprint, Cpu, DollarSign, AlertTriangle, BarChart3, FileText,
  UserCircle, GraduationCap, Brain, Glasses, Wrench, FileCheck, Award,
  Briefcase, MessageCircle, ClipboardCheck, WifiOff, Home, Plus,
  UserSearch, Columns3, Eye, Building2, BookOpen, Layers, Shield,
  Lightbulb, Scale, FlaskConical, CheckCircle2, Info
} from 'lucide-react';
import type { Role } from '@/types';

interface SidebarItem {
  key: string;
  icon: typeof LayoutDashboard;
  path: string;
  badge?: number;
}

const adminItems: SidebarItem[] = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/admin' },
  { key: 'programmeRegistration', icon: BookPlus, path: '/admin/programmes' },
  { key: 'participants', icon: Users, path: '/admin/participants' },
  { key: 'autoTimetable', icon: CalendarDays, path: '/admin/timetable' },
  { key: 'hostelManagement', icon: Building, path: '/admin/hostel' },
  { key: 'messManagement', icon: UtensilsCrossed, path: '/admin/mess' },
  { key: 'busTransport', icon: Bus, path: '/admin/transport' },
  { key: 'attendanceCentre', icon: Fingerprint, path: '/admin/attendance' },
  { key: 'devicesEdge', icon: Cpu, path: '/admin/devices' },
  { key: 'costsUtilisation', icon: DollarSign, path: '/admin/costs' },
  { key: 'barrierCases', icon: AlertTriangle, path: '/admin/barriers', badge: 3 },
  { key: 'analyticsPlanning', icon: BarChart3, path: '/admin/analytics' },
  { key: 'auditLog', icon: FileText, path: '/admin/audit' },
];

const trainerItems: SidebarItem[] = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/trainer' },
  { key: 'cohortView', icon: Users, path: '/trainer/cohort' },
  { key: 'liveSession', icon: BookOpen, path: '/trainer/session' },
  { key: 'practicalAssessment', icon: Wrench, path: '/trainer/assessment' },
  { key: 'examBuilder', icon: FileCheck, path: '/trainer/exams' },
  { key: 'contentManager', icon: Layers, path: '/trainer/content' },
];

const learnerItems: SidebarItem[] = [
  { key: 'home', icon: Home, path: '/learner' },
  { key: 'myIdentity', icon: UserCircle, path: '/learner/identity' },
  { key: 'learning', icon: GraduationCap, path: '/learner/learning' },
  { key: 'gapAnalysis', icon: Brain, path: '/learner/gaps' },
  { key: 'arvrLabs', icon: Glasses, path: '/learner/labs' },
  { key: 'practicalWorkbench', icon: Wrench, path: '/learner/workbench' },
  { key: 'exams', icon: FileCheck, path: '/learner/exams' },
  { key: 'workReadiness', icon: ClipboardCheck, path: '/learner/readiness' },
  { key: 'credentials', icon: Award, path: '/learner/credentials' },
  { key: 'careerEngine', icon: Briefcase, path: '/learner/career' },
  { key: 'careerChatbot', icon: MessageCircle, path: '/learner/chatbot' },
  { key: 'followUp', icon: CheckCircle2, path: '/learner/followup' },
  { key: 'offlineCentre', icon: WifiOff, path: '/learner/offline' },
];

const employerItems: SidebarItem[] = [
  { key: 'dashboard', icon: LayoutDashboard, path: '/employer' },
  { key: 'postOpening', icon: Plus, path: '/employer/post' },
  { key: 'candidates', icon: UserSearch, path: '/employer/candidates' },
  { key: 'pipelineBoard', icon: Columns3, path: '/employer/pipeline' },
  { key: 'workplaceObservation', icon: Eye, path: '/employer/observation' },
  { key: 'employerTypes', icon: Building2, path: '/employer/types' },
];

const sharedItems: SidebarItem[] = [
  { key: 'howItWorks', icon: Info, path: '/how-it-works' },
  { key: 'aiPlatform', icon: Brain, path: '/ai' },
  { key: 'privacyTrust', icon: Shield, path: '/privacy' },
  { key: 'impactBenefits', icon: Lightbulb, path: '/impact' },
  { key: 'feasibilityRisks', icon: Scale, path: '/feasibility' },
  { key: 'researchReferences', icon: FlaskConical, path: '/research' },
];

const roleItems: Record<Role, SidebarItem[]> = {
  admin: adminItems,
  trainer: trainerItems,
  learner: learnerItems,
  employer: employerItems,
};

export function Sidebar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { currentRole, sidebarOpen } = useAppStore();

  const items = roleItems[currentRole];

  return (
    <aside
      className={cn(
        'fixed left-0 top-[var(--topbar-height)] bottom-0 z-40 bg-[var(--card)] border-r border-[var(--border)] transition-all duration-300 overflow-y-auto',
        sidebarOpen ? 'w-[var(--sidebar-width)]' : 'w-16'
      )}
    >
      <nav className="flex flex-col p-2 gap-0.5">
        {/* Role-specific items */}
        <div className="mb-2">
          {sidebarOpen && (
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
              {t(currentRole)}
            </div>
          )}
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== `/${currentRole}` && location.pathname.startsWith(item.path));
            return (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200',
                  isActive
                    ? 'bg-primary/10 text-primary font-medium shadow-sm'
                    : 'hover:bg-[var(--muted)] text-[var(--foreground)]',
                  !sidebarOpen && 'justify-center px-0'
                )}
                title={!sidebarOpen ? t(item.key) : undefined}
                aria-label={t(item.key)}
              >
                <Icon className={cn('w-4.5 h-4.5 flex-shrink-0', isActive && 'text-primary')} />
                {sidebarOpen && (
                  <span className="truncate">{t(item.key)}</span>
                )}
                {sidebarOpen && item.badge && (
                  <span className="ml-auto px-1.5 py-0.5 rounded-full bg-error text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="border-t border-[var(--border)] my-2" />

        {/* Shared pages */}
        {sidebarOpen && (
          <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-widest text-[var(--muted-foreground)]">
            Resources
          </div>
        )}
        {sharedItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.key}
              onClick={() => navigate(item.path)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all duration-200',
                isActive
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-[var(--muted)] text-[var(--muted-foreground)]',
                !sidebarOpen && 'justify-center px-0'
              )}
              title={!sidebarOpen ? t(item.key) : undefined}
              aria-label={t(item.key)}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              {sidebarOpen && <span className="truncate">{t(item.key)}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
