import { create } from "zustand";
import { persist } from "zustand/middleware";

const npcStore = (set) => ({
  npcData: [],
  selectedNpc: null,

  setNpcData: (data) => set({ npcData: data }),

  selectNpc: (npcName) =>
    set((state) => ({
      selectedNpc: state.npcData.find((npc) => npc.name === npcName) || null,
    })),

  resetAll: () => set({ user: null, loading: true, error: null }), // Reset semua state
});

export const useNpcStore = create(persist(npcStore, { name: "npc-store" }));
