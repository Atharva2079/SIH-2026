import { create } from 'zustand';
import type { Role, Theme, Language, FontSize, ConnectivityStatus } from '@/types';

interface AppStore {
  // Theme
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;

  // Language
  language: Language;
  setLanguage: (lang: Language) => void;

  // Font size
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;

  // Role
  currentRole: Role;
  setRole: (role: Role) => void;

  // Connectivity
  connectivity: ConnectivityStatus;
  setConnectivity: (status: ConnectivityStatus) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Demo mode
  demoMode: boolean;
  setDemoMode: (mode: boolean) => void;
  demoStep: number;
  setDemoStep: (step: number) => void;

  // Prototype ribbon
  showPrototypeRibbon: boolean;
  setShowPrototypeRibbon: (show: boolean) => void;

  // Notifications
  notificationCount: number;
  setNotificationCount: (count: number) => void;

  // Control panel
  controlPanelOpen: boolean;
  setControlPanelOpen: (open: boolean) => void;
  equipmentFault: boolean;
  setEquipmentFault: (fault: boolean) => void;
  powerCut: boolean;
  setPowerCut: (cut: boolean) => void;

  // Offline queue
  offlineQueue: Array<{ id: string; type: string; timestamp: string; status: 'queued' | 'synced' | 'duplicate' }>;
  addToOfflineQueue: (item: { id: string; type: string; timestamp: string }) => void;
  clearOfflineQueue: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  theme: 'light',
  setTheme: (theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    set({ theme });
  },
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'light' ? 'dark' : 'light';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    return { theme: newTheme };
  }),

  language: 'en',
  setLanguage: (language) => set({ language }),

  fontSize: 'md',
  setFontSize: (fontSize) => {
    document.documentElement.classList.remove('font-sm', 'font-md', 'font-lg');
    document.documentElement.classList.add(`font-${fontSize}`);
    set({ fontSize });
  },

  currentRole: 'learner',
  setRole: (currentRole) => set({ currentRole }),

  connectivity: 'online',
  setConnectivity: (connectivity) => set({ connectivity }),

  sidebarOpen: true,
  setSidebarOpen: (sidebarOpen) => set({ sidebarOpen }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  demoMode: false,
  setDemoMode: (demoMode) => set({ demoMode }),
  demoStep: 0,
  setDemoStep: (demoStep) => set({ demoStep }),

  showPrototypeRibbon: true,
  setShowPrototypeRibbon: (showPrototypeRibbon) => set({ showPrototypeRibbon }),

  notificationCount: 5,
  setNotificationCount: (notificationCount) => set({ notificationCount }),

  controlPanelOpen: false,
  setControlPanelOpen: (controlPanelOpen) => set({ controlPanelOpen }),
  equipmentFault: false,
  setEquipmentFault: (equipmentFault) => set({ equipmentFault }),
  powerCut: false,
  setPowerCut: (powerCut) => set({ powerCut }),

  offlineQueue: [],
  addToOfflineQueue: (item) => set((state) => ({
    offlineQueue: [...state.offlineQueue, { ...item, status: 'queued' as const }]
  })),
  clearOfflineQueue: () => set({ offlineQueue: [] }),
}));
