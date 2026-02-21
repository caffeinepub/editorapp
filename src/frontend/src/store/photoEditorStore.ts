import { create } from 'zustand';

export type Sticker = {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Filters = {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
};

export type PhotoEditorState = {
  imageUrl: string | null;
  filters: Filters;
  stickers: Sticker[];
};

export type PhotoEditorStore = PhotoEditorState & {
  setImage: (url: string | null) => void;
  updateFilter: (filterName: keyof Filters, value: number) => void;
  addSticker: (sticker: Omit<Sticker, 'id'>) => void;
  updateSticker: (id: string, updates: Partial<Sticker>) => void;
  removeSticker: (id: string) => void;
  resetFilters: () => void;
  reset: () => void;
};

const defaultFilters: Filters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0
};

export const usePhotoEditorStore = create<PhotoEditorStore>((set) => ({
  imageUrl: null,
  filters: { ...defaultFilters },
  stickers: [],

  setImage: (url: string | null) => set({ imageUrl: url }),

  updateFilter: (filterName: keyof Filters, value: number) =>
    set((state) => ({
      filters: {
        ...state.filters,
        [filterName]: value
      }
    })),

  addSticker: (sticker: Omit<Sticker, 'id'>) =>
    set((state) => ({
      stickers: [
        ...state.stickers,
        {
          ...sticker,
          id: `sticker-${Date.now()}`
        }
      ]
    })),

  updateSticker: (id: string, updates: Partial<Sticker>) =>
    set((state) => ({
      stickers: state.stickers.map((s) => (s.id === id ? { ...s, ...updates } : s))
    })),

  removeSticker: (id: string) =>
    set((state) => ({
      stickers: state.stickers.filter((s) => s.id !== id)
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  reset: () =>
    set({
      imageUrl: null,
      filters: { ...defaultFilters },
      stickers: []
    })
}));
