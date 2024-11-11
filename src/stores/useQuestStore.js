import { create } from "zustand";

export const useQuestStore = create((set) => ({
  quests: [],
  takenQuests: [],
  npcData: [],
  selectedNpc: null,
  error: null,

  setError: (message) => set({ error: message }),

  setNpcData: (data) => set({ npcData: data }),

  handleNpcChange: (npcName) => {
    set({ selectedNpc: npcName });
  },

  setSelectedNpc: (npcName) =>
    set({
      selectedNpc: npcName,
    }),

  setQuests: (quests) => set({ quests }),

  addQuest: (quest) => set((state) => ({ quests: [...state.quests, quest] })),

  onDeleteQuest: (questId) =>
    set((state) => ({
      quests: state.quests.filter((quest) => quest.id !== questId),
    })),

  onTakeQuest: (questId) =>
    set((state) => ({
      quests: state.quests.map((quest) =>
        quest.id === questId
          ? { ...quest, status: "Sedang dikerjakan" }
          : quest,
      ),
      takenQuests: [...state.takenQuests, questId],
    })),

  onCompleteQuest: (questId) =>
    set((state) => ({
      quests: state.quests.map((quest) =>
        quest.id === questId ? { ...quest, status: "Selesai" } : quest,
      ),
      takenQuests: state.takenQuests.filter((id) => id !== questId),
    })),
}));
