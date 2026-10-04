import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Simulate API delay
export function mockDelay(ms: number = 800): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Format number with Indian numbering (lakhs, crores)
export function formatIndianNumber(num: number): string {
  if (num >= 10000000) return `${(num / 10000000).toFixed(1)} Cr`;
  if (num >= 100000) return `${(num / 100000).toFixed(1)} L`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

// Format date
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Format time
export function formatTime(date: string): string {
  return new Date(date).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Generate random ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// Get initials
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Role colors
export function getRoleColor(role: string): string {
  const colors: Record<string, string> = {
    admin: '#0B1F4B',
    trainer: '#7c3aed',
    learner: '#1E8E5A',
    employer: '#F28C28',
  };
  return colors[role] || '#64748b';
}

// Status colors
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    active: '#1E8E5A',
    completed: '#3b82f6',
    draft: '#64748b',
    archived: '#94a3b8',
    healthy: '#1E8E5A',
    warning: '#E5A100',
    error: '#D64545',
    offline: '#94a3b8',
    verified: '#1E8E5A',
    proxy_alert: '#D64545',
    failed: '#D64545',
  };
  return colors[status] || '#64748b';
}
