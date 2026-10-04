import { useAppStore } from '@/store/useAppStore';
import { useTranslation } from 'react-i18next';
import { Settings2, WifiOff, Wifi, Zap, ZapOff, Globe, Users, ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import type { Role } from '@/types';

export function ControlPanel() {
  const { t, i18n } = useTranslation();
  const {
    controlPanelOpen, setControlPanelOpen,
    connectivity, setConnectivity,
    equipmentFault, setEquipmentFault,
    powerCut, setPowerCut,
    language, setLanguage,
    currentRole, setRole,
    clearOfflineQueue,
  } = useAppStore();

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed bottom-4 left-4 z-[60]">
      {!controlPanelOpen ? (
        <button
          onClick={() => setControlPanelOpen(true)}
          className="w-10 h-10 rounded-full bg-primary text-white shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Open control panel"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      ) : (
        <div className="w-72 rounded-2xl bg-[var(--card)] border border-[var(--border)] shadow-2xl overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b border-[var(--border)] bg-[var(--muted)]">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Settings2 className="w-4 h-4" />
              Demo Controls
            </div>
            <div className="flex gap-1">
              <button onClick={() => setExpanded(!expanded)} className="p-1 rounded hover:bg-[var(--border)]">
                {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
              </button>
              <button onClick={() => setControlPanelOpen(false)} className="p-1 rounded hover:bg-[var(--border)] text-xs">
                x
              </button>
            </div>
          </div>

          <div className="p-3 space-y-3">
            {/* Offline Toggle */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                {connectivity === 'online' ? <Wifi className="w-4 h-4 text-success" /> : <WifiOff className="w-4 h-4 text-error" />}
                Offline Mode
              </label>
              <button
                onClick={() => setConnectivity(connectivity === 'online' ? 'offline' : 'online')}
                className={cn(
                  'w-10 h-5 rounded-full transition-colors relative',
                  connectivity === 'offline' ? 'bg-error' : 'bg-success'
                )}
              >
                <div className={cn(
                  'w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all shadow-sm',
                  connectivity === 'offline' ? 'left-5.5' : 'left-0.5'
                )} />
              </button>
            </div>

            {/* Equipment Fault */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <Zap className={cn('w-4 h-4', equipmentFault ? 'text-error' : 'text-success')} />
                Equipment Fault
              </label>
              <button
                onClick={() => setEquipmentFault(!equipmentFault)}
                className={cn(
                  'w-10 h-5 rounded-full transition-colors relative',
                  equipmentFault ? 'bg-error' : 'bg-gray-300 dark:bg-gray-600'
                )}
              >
                <div className={cn(
                  'w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all shadow-sm',
                  equipmentFault ? 'left-5.5' : 'left-0.5'
                )} />
              </button>
            </div>

            {/* Power Cut */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                {powerCut ? <ZapOff className="w-4 h-4 text-error" /> : <Zap className="w-4 h-4 text-success" />}
                Power Cut
              </label>
              <button
                onClick={() => setPowerCut(!powerCut)}
                className={cn(
                  'w-10 h-5 rounded-full transition-colors relative',
                  powerCut ? 'bg-error' : 'bg-gray-300 dark:bg-gray-600'
                )}
              >
                <div className={cn(
                  'w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all shadow-sm',
                  powerCut ? 'left-5.5' : 'left-0.5'
                )} />
              </button>
            </div>

            {expanded && (
              <>
                {/* Language */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4" />
                    Language
                  </label>
                  <div className="flex gap-1">
                    <button
                      onClick={() => { setLanguage('en'); i18n.changeLanguage('en'); }}
                      className={cn('px-2 py-1 rounded text-xs', language === 'en' ? 'bg-primary text-white' : 'bg-[var(--muted)]')}
                    >
                      EN
                    </button>
                    <button
                      onClick={() => { setLanguage('hi'); i18n.changeLanguage('hi'); }}
                      className={cn('px-2 py-1 rounded text-xs font-hindi', language === 'hi' ? 'bg-primary text-white' : 'bg-[var(--muted)]')}
                    >
                      हि
                    </button>
                  </div>
                </div>

                {/* Role Switcher */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4" />
                    Role
                  </label>
                  <select
                    value={currentRole}
                    onChange={(e) => setRole(e.target.value as Role)}
                    className="text-xs px-2 py-1 rounded bg-[var(--muted)] border-none"
                  >
                    <option value="admin">Admin</option>
                    <option value="trainer">Trainer</option>
                    <option value="learner">Learner</option>
                    <option value="employer">Employer</option>
                  </select>
                </div>

                {/* Reset */}
                <button
                  onClick={() => {
                    setConnectivity('online');
                    setEquipmentFault(false);
                    setPowerCut(false);
                    clearOfflineQueue();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[var(--muted)] hover:bg-[var(--border)] text-sm transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  {t('resetDemo')}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
