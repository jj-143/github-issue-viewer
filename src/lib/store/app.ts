import { create } from "zustand";

export const useAppStore = create<AppStoreAPI>((set, get) => ({
  setFlash: (flash) => {
    set({ flash });
  },
}));
