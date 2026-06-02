import { create } from 'zustand';

interface AppStore {
  sidebarOpen: boolean;
  pageTitle: string;
  setSidebarOpen: (open: boolean) => void;
  setPageTitle: (title: string) => void;
}

export const useAppStore = create<AppStore>((set) => ({
  sidebarOpen: true,
  pageTitle: 'Dashboard',
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setPageTitle: (title) => set({ pageTitle: title }),
}));
