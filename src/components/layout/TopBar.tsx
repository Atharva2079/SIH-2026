import { useTranslation } from 'react-i18next';
import { useAppStore } from '@/store/useAppStore';
import { useNavigate } from 'react-router-dom';
import {
  Sun, Moon, Globe, Bell, Menu, User, Wifi, WifiOff, RefreshCw,
  Shield, BookOpen, GraduationCap, Building2, ChevronDown,
  Settings, LogOut, Minus, Type, Plus
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { notifications } from '@/data/mockData';
import type { Role } from '@/types';

const roleConfig: Record<Role, { icon: typeof Shield; label: string; color: string }> = {
  admin: { icon: Shield, label: 'admin', color: 'bg-primary text-white' },
  trainer: { icon: BookOpen, label: 'trainer', color: 'bg-purple-600 text-white' },
  learner: { icon: GraduationCap, label: 'learner', color: 'bg-success text-white' },
  employer: { icon: Building2, label: 'employer', color: 'bg-saffron text-white' },
};

export function TopBar() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const {
    theme, toggleTheme, language, setLanguage, currentRole, setRole,
    connectivity, fontSize, setFontSize, sidebarOpen, toggleSidebar,
    notificationCount,
  } = useAppStore();

  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const roleRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (roleRef.current && !roleRef.current.contains(e.target as Node)) setRoleMenuOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileMenuOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangMenuOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLangSwitch = (lang: 'en' | 'hi') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    setLangMenuOpen(false);
  };

  const handleRoleSwitch = (role: Role) => {
    setRole(role);
    setRoleMenuOpen(false);
    const paths: Record<Role, string> = {
      admin: '/admin',
      trainer: '/trainer',
      learner: '/learner',
      employer: '/employer',
    };
    navigate(paths[role]);
  };

  const RoleIcon = roleConfig[currentRole].icon;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[var(--topbar-height)] glass border-b border-[var(--border)]">
      <div className="flex items-center justify-between h-full px-3 max-w-full">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 font-heading font-bold text-base hover:opacity-80 transition-opacity"
          >
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="hidden sm:inline gradient-text">{t('appName')}</span>
          </button>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-1">
          {/* Language Toggle */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1 px-2 py-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors text-sm"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">{language === 'en' ? 'EN' : 'हि'}</span>
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-36 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-lg p-1 animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => handleLangSwitch('en')}
                  className={cn('w-full text-left px-3 py-2 rounded-lg text-sm transition-colors', language === 'en' ? 'bg-[var(--muted)] font-medium' : 'hover:bg-[var(--muted)]')}
                >
                  English
                </button>
                <button
                  onClick={() => handleLangSwitch('hi')}
                  className={cn('w-full text-left px-3 py-2 rounded-lg text-sm font-hindi transition-colors', language === 'hi' ? 'bg-[var(--muted)] font-medium' : 'hover:bg-[var(--muted)]')}
                >
                  हिन्दी
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
            aria-label={theme === 'light' ? t('darkMode') : t('lightMode')}
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Font Size Toggle */}
          <div className="hidden md:flex items-center gap-0.5 px-1">
            <button
              onClick={() => setFontSize('sm')}
              className={cn('p-1 rounded text-xs', fontSize === 'sm' ? 'bg-[var(--muted)] font-bold' : 'hover:bg-[var(--muted)]')}
              aria-label="Small font"
            >
              <Minus className="w-3 h-3" />
            </button>
            <button
              onClick={() => setFontSize('md')}
              className={cn('p-1 rounded text-xs', fontSize === 'md' ? 'bg-[var(--muted)] font-bold' : 'hover:bg-[var(--muted)]')}
              aria-label="Medium font"
            >
              <Type className="w-3 h-3" />
            </button>
            <button
              onClick={() => setFontSize('lg')}
              className={cn('p-1 rounded text-xs', fontSize === 'lg' ? 'bg-[var(--muted)] font-bold' : 'hover:bg-[var(--muted)]')}
              aria-label="Large font"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>

          {/* Role Switcher */}
          <div ref={roleRef} className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className={cn('flex items-center gap-1.5 px-2 py-1 rounded-lg transition-colors text-xs font-medium', roleConfig[currentRole].color)}
              aria-label={t('switchRole')}
            >
              <RoleIcon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t(roleConfig[currentRole].label)}</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {roleMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-56 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-lg p-1">
                <div className="px-3 py-2 text-xs font-medium text-[var(--muted-foreground)]">{t('switchRole')}</div>
                {(Object.keys(roleConfig) as Role[]).map((role) => {
                  const cfg = roleConfig[role];
                  const Icon = cfg.icon;
                  return (
                    <button
                      key={role}
                      onClick={() => handleRoleSwitch(role)}
                      className={cn(
                        'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                        currentRole === role ? 'bg-[var(--muted)] font-medium' : 'hover:bg-[var(--muted)]'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                      {t(cfg.label)}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Connectivity Chip */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full bg-[var(--muted)] text-xs">
            {connectivity === 'online' && <><Wifi className="w-3 h-3 text-success" /><span className="text-success">{t('online')}</span></>}
            {connectivity === 'offline' && <><WifiOff className="w-3 h-3 text-error" /><span className="text-error">{t('offline')}</span></>}
            {connectivity === 'syncing' && <><RefreshCw className="w-3 h-3 text-warning animate-spin" /><span className="text-warning">{t('syncing')}</span></>}
          </div>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-1.5 rounded-lg hover:bg-[var(--muted)] transition-colors"
              aria-label={t('notifications')}
            >
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-error text-white text-[10px] flex items-center justify-center font-bold">
                  {notificationCount}
                </span>
              )}
            </button>
            {notifOpen && (
              <div className="absolute right-0 top-full mt-1 w-80 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-xl p-2 max-h-96 overflow-y-auto">
                <div className="px-2 py-1 text-sm font-semibold">{t('notifications')}</div>
                {notifications.map((n) => (
                  <div key={n.id} className={cn('px-3 py-2 rounded-lg text-sm border-l-3 mb-1', {
                    'border-l-error bg-error/5': n.type === 'error',
                    'border-l-warning bg-warning/5': n.type === 'warning',
                    'border-l-success bg-success/5': n.type === 'success',
                    'border-l-primary bg-primary/5': n.type === 'info',
                  })}>
                    <div className="font-medium text-xs">{n.title}</div>
                    <div className="text-xs text-[var(--muted-foreground)] mt-0.5">{n.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div ref={profileRef} className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
              aria-label={t('profile')}
            >
              <User className="w-4 h-4 text-primary" />
            </button>
            {profileMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-xl bg-[var(--card)] border border-[var(--border)] shadow-lg p-1">
                <button onClick={() => { navigate('/settings'); setProfileMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-[var(--muted)] transition-colors">
                  <Settings className="w-4 h-4" /> {t('settings')}
                </button>
                <button onClick={() => { navigate('/login'); setProfileMenuOpen(false); }} className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-[var(--muted)] transition-colors text-error">
                  <LogOut className="w-4 h-4" /> {t('logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
