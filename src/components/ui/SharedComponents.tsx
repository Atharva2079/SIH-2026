import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

// Animated Counter
export function AnimatedCounter({ value, duration = 2000, prefix = '', suffix = '' }: {
  value: number; duration?: number; prefix?: string; suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const end = value;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value, duration, isVisible]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{count.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

// Progress Ring
export function ProgressRing({ progress, size = 80, strokeWidth = 8, color = 'var(--color-primary)' }: {
  progress: number; size?: number; strokeWidth?: number; color?: string;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="var(--muted)" strokeWidth={strokeWidth}
        />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          strokeDasharray={circumference}
        />
      </svg>
      <span className="absolute text-sm font-bold">{progress}%</span>
    </div>
  );
}

// Shimmer Skeleton
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('shimmer rounded-lg', className)} />;
}

// KPI Card
export function KPICard({ title, value, subtitle, icon, trend, color = 'primary' }: {
  title: string; value: number | string; subtitle?: string;
  icon: React.ReactNode; trend?: { value: number; positive: boolean };
  color?: 'primary' | 'saffron' | 'success' | 'error' | 'warning';
}) {
  const colorMap = {
    primary: 'bg-primary/10 text-primary',
    saffron: 'bg-saffron/10 text-saffron',
    success: 'bg-success/10 text-success',
    error: 'bg-error/10 text-error',
    warning: 'bg-warning/10 text-warning',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-elevated p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wide">{title}</p>
          <p className="text-2xl font-bold mt-1 font-heading">
            {typeof value === 'number' ? <AnimatedCounter value={value} /> : value}
          </p>
          {subtitle && <p className="text-xs text-[var(--muted-foreground)] mt-1">{subtitle}</p>}
          {trend && (
            <p className={cn('text-xs mt-1 font-medium', trend.positive ? 'text-success' : 'text-error')}>
              {trend.positive ? '+' : ''}{trend.value}% from last month
            </p>
          )}
        </div>
        <div className={cn('p-2.5 rounded-xl', colorMap[color])}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

// Status Badge
export function StatusBadge({ status, size = 'md', className, label }: { status: string; size?: 'sm' | 'md'; className?: string; label?: string; }) {
  const config: Record<string, { bg: string; text: string; label: string }> = {
    active: { bg: 'bg-success/10', text: 'text-success', label: 'Active' },
    completed: { bg: 'bg-primary/10', text: 'text-primary', label: 'Completed' },
    draft: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', label: 'Draft' },
    healthy: { bg: 'bg-success/10', text: 'text-success', label: 'Healthy' },
    warning: { bg: 'bg-warning/10', text: 'text-warning', label: 'Warning' },
    error: { bg: 'bg-error/10', text: 'text-error', label: 'Error' },
    offline: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-500', label: 'Offline' },
    verified: { bg: 'bg-success/10', text: 'text-success', label: 'Verified' },
    proxy_alert: { bg: 'bg-error/10', text: 'text-error', label: 'Proxy Alert' },
    failed: { bg: 'bg-error/10', text: 'text-error', label: 'Failed' },
    pending_verification: { bg: 'bg-warning/10', text: 'text-warning', label: 'Pending Verification' },
    knowledge: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600', label: 'Knowledge' },
    task_training: { bg: 'bg-saffron/10', text: 'text-saffron', label: 'Task in Training' },
    task_work: { bg: 'bg-success/10', text: 'text-success', label: 'Task at Work' },
    opportunity_confirmed: { bg: 'bg-primary/10', text: 'text-primary', label: 'Opportunity Confirmed' },
    blocked: { bg: 'bg-error/10', text: 'text-error', label: 'Blocked' },
    awaiting_verification: { bg: 'bg-warning/10', text: 'text-warning', label: 'Awaiting Verification' },
    new: { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-600', label: 'New' },
    assigned: { bg: 'bg-saffron/10', text: 'text-saffron', label: 'Assigned' },
    in_progress: { bg: 'bg-primary/10', text: 'text-primary', label: 'In Progress' },
    resolved: { bg: 'bg-success/10', text: 'text-success', label: 'Resolved' },
    on_route: { bg: 'bg-success/10', text: 'text-success', label: 'On Route' },
    at_stop: { bg: 'bg-primary/10', text: 'text-primary', label: 'At Stop' },
    returned: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-500', label: 'Returned' },
    delayed: { bg: 'bg-warning/10', text: 'text-warning', label: 'Delayed' },
    guided: { bg: 'bg-saffron/10', text: 'text-saffron', label: 'Guided' },
    independent: { bg: 'bg-primary/10', text: 'text-primary', label: 'Independent' },
  };

  const c = config[status] || { bg: 'bg-gray-100', text: 'text-gray-600', label: status };

  return (
    <span className={cn(
      'inline-flex items-center gap-1 rounded-full font-medium',
      c.bg, c.text,
      className,
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs'
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', c.text.replace('text-', 'bg-'))} />
      {label || c.label}
    </span>
  );
}

// Method Badge (for attendance)
export function MethodBadge({ method }: { method: string }) {
  const config: Record<string, { icon: string; label: string; color: string }> = {
    face: { icon: '👤', label: 'Face', color: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300' },
    fingerprint: { icon: '👆', label: 'Fingerprint', color: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300' },
    qr: { icon: '📱', label: 'QR', color: 'bg-purple-50 text-purple-700 dark:bg-purple-900/20 dark:text-purple-300' },
    assisted: { icon: '🤝', label: 'Assisted', color: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300' },
  };
  const c = config[method] || { icon: '?', label: method, color: 'bg-gray-100 text-gray-700' };

  return (
    <span className={cn('inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', c.color)}>
      {c.icon} {c.label}
    </span>
  );
}

// Empty State
export function EmptyState({ title, description, icon }: {
  title: string; description: string; icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-full bg-[var(--muted)] mb-4">{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-[var(--muted-foreground)] max-w-sm">{description}</p>
    </div>
  );
}

// Page Header
export function PageHeader({ title, subtitle, actions }: {
  title: string; subtitle?: string; actions?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold font-heading">{title}</h1>
        {subtitle && <p className="text-sm text-[var(--muted-foreground)] mt-1">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
