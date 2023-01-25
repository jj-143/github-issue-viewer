import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { MAX_COUNT_SAVED_REPOSITORY } from "@lib/config/constants";

export const useSavedRepositoryStore = create(
  immer<SavedRepositoryStoreAPI>((set, get) => ({
    items: [],
    add: (fullName) => {
      if (get().items.length >= MAX_COUNT_SAVED_REPOSITORY) return;
      if (get().isSaved(fullName)) return;
      set((draft) => {
        draft.items.push(fullName);
      });
    },
    remove: (fullName) => {
      set((draft) => {
        const itemIdx = draft.items.findIndex((item) => item === fullName);
        if (itemIdx != -1) {
          draft.items.splice(itemIdx, 1);
        }
      });
    },
    isSaved: (fullName) => {
      return get().items.find((item) => item === fullName) !== undefined;
    },
    isAvailable: () => {
      return get().items.length < MAX_COUNT_SAVED_REPOSITORY;
    },
  })),
);
