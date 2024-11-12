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
});

export const useNpcStore = create(persist(npcStore, { name: "npc-store" }));
