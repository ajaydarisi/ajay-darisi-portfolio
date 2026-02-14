import { create } from 'zustand';

interface UIState {
  activeSection: string;
  isMobile: boolean;
  setActiveSection: (id: string) => void;
  setIsMobile: (isMobile: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: 'hero',
  isMobile: false,
  setActiveSection: (id) => set({ activeSection: id }),
  setIsMobile: (isMobile) => set({ isMobile }),
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));
