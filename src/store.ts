
import { create } from 'zustand';

const initialState = (window as any).__DNA_STATE__ || {};

interface ProductionState {
  globalSettings: any;
  currentLanguage: string;
  setCurrentLanguage: (lang: string) => void;
  toggleSiteTheme: () => void;
  getPageData: (pageName?: string) => any[];
  // Добавлены заглушки для методов редактора, чтобы компоненты не падали
  selectedBlockId: string | null;
  setSelectedBlock: (id: string | null) => void;
  viewportMode: string;
  isPreviewMode: boolean;
  gridMode: string;
  cycleGrid: () => void;
}

export const useStore = create<ProductionState>((set, get) => ({
  globalSettings: initialState.globalSettings || {},
  currentLanguage: initialState.currentLanguage || 'en',
  selectedBlockId: null,
  viewportMode: 'desktop',
  isPreviewMode: true,
  gridMode: 'off',

  setCurrentLanguage: (lang: string) => set({ currentLanguage: lang }),
  
  toggleSiteTheme: () => {
    const { globalSettings } = get();
    const current = globalSettings['GL10']?.params?.[6]?.value || 'Dark';
    const next = current === 'Light' ? 'Dark' : 'Light';
    if(globalSettings['GL10']) globalSettings['GL10'].params[6].value = next;
    set({ globalSettings: { ...globalSettings } });
  },

  getPageData: (pageName = 'home') => {
    return initialState.pages?.[pageName] || initialState.contentBlocks || [];
  },

  // Заглушки
  setSelectedBlock: () => {},
  cycleGrid: () => {}
}));
