import { create } from 'zustand';

interface UIState {
  activeSection: string;
  isMobile: boolean;
  isScrollingTo: boolean;
  setActiveSection: (id: string) => void;
  setIsMobile: (isMobile: boolean) => void;
  setIsScrollingTo: (v: boolean) => void;
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeSection: 'hero',
  isMobile: false,
  isScrollingTo: false,
  setActiveSection: (id) => set({ activeSection: id }),
  setIsMobile: (isMobile) => set({ isMobile }),
  setIsScrollingTo: (v) => set({ isScrollingTo: v }),
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));
