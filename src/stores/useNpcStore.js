import { create } from "zustand";
import { persist } from "zustand/middleware";

const npcStore = (set) => ({
  // State
  npcData: [],
  selectedNpc: null,
  theme: "lemonade", // Tema default

  // Actions
  setNpcData: (data) => set({ npcData: data }),

  selectNpc: (npcName) =>
    set((state) => {
      const selectedNpc =
        state.npcData.find((npc) => npc.name === npcName) || null;
      const newTheme = selectedNpc?.theme || "lemonade";
      set({ selectedNpc, theme: newTheme });
      document.documentElement.setAttribute("data-theme", newTheme);
      return { selectedNpc };
    }),

  setTheme: (newTheme) => {
    set({ theme: newTheme });
    document.documentElement.setAttribute("data-theme", newTheme);
  },

  resetAll: () => {
    set({
      selectedNpc: null,
      theme: "lemonade",
    });
    document.documentElement.setAttribute("data-theme", "lemonade");
  },
});

export const useNpcStore = create(persist(npcStore, { name: "npc-store" }));
