import { create } from "zustand";
export const useNpcStore = create((set) => ({
  npcData: [],
  selectedNpc: null,

  setNpcData: (data) => set({ npcData: data }),

  selectNpc: (npcName) =>
    set((state) => ({
      selectedNpc: state.npcData.find((npc) => npc.name === npcName) || null,
    })),
}));
