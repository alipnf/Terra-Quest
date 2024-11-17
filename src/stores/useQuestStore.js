import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addQuestToUser,
  completeQuestInUser,
  deleteQuestFromUser,
  getOngoingQuests,
} from "../services/firebase/questServices";
import { useUserStore } from "./useUserStore";

const questStore = (set) => ({
  // State
  quests: [],
  takenQuests: [],
  npcData: [],
  selectedNpc: null,
  error: null,
  selectedQuest: [],
  loading: false,

  // action
  setLoading: (isLoading) => set({ loading: isLoading }),
  setError: (message) => set({ error: message }),
  setNpcData: (data) => set({ npcData: data }),
  setSelectedNpc: (npcName) => set({ selectedNpc: npcName }),
  setQuestById: (quest) => set({ selectedQuest: quest }),
  handleNpcChange: (npcName) => set({ selectedNpc: npcName }),

  // Quest management
  addQuests: (newQuests) =>
    set((state) => {
      const existingQuests = state.quests.filter(
        (quest) => quest.status === "Sedang dikerjakan",
      );
      const uniqueNewQuests = newQuests.filter(
        (newQuest) => !existingQuests.some((quest) => quest.id === newQuest.id),
      );
      const updatedQuests = [...existingQuests, ...uniqueNewQuests];
      return { quests: updatedQuests };
    }),

  onDeleteQuest: (questId) => {
    const { user } = useUserStore.getState();
    const uid = user?.uid;
    if (uid) {
      deleteQuestFromUser(uid, questId);
    }
    set((state) => ({
      quests: state.quests.filter((quest) => quest.id !== questId),
    }));
    Toastify({
      text: "Quest berhasil dihapus!",
      duration: 3000,
      close: true,
      gravity: "center",
      position: "center",
      offset: { y: 60 },
      style: {
        background: "#ff5f5f",
        borderRadius: "12px",
      },
    }).showToast();
  },

  onTakeQuest: (questId) => {
    const { user } = useUserStore.getState();
    const uid = user?.uid;

    set((state) => {
      const updatedQuests = state.quests.map((quest) =>
        quest.id === questId
          ? { ...quest, status: "Sedang dikerjakan" }
          : quest,
      );
      const takenQuest = updatedQuests.find((quest) => quest.id === questId);

      if (takenQuest && uid) {
        addQuestToUser(uid, { ...takenQuest, status: "Sedang dikerjakan" });
      }

      Toastify({
        text: "Quest berhasil diambil!",
        duration: 3000,
        close: true,
        gravity: "center",
        position: "center",
        offset: { y: 60 },
        style: {
          background: "#FFC107",
          borderRadius: "12px",
          position: "fixed",
        },
      }).showToast();

      return {
        quests: updatedQuests,
        takenQuests: [...state.takenQuests, questId],
      };
    });
  },

  onCompleteQuest: (questId) => {
    const { user } = useUserStore.getState();
    const uid = user?.uid;

    if (uid) {
      completeQuestInUser(uid, questId)
        .then(() => {
          set((state) => ({
            quests: state.quests.filter((quest) => quest.id !== questId),
            takenQuests: state.takenQuests.filter((id) => id !== questId),
          }));
          Toastify({
            text: "Quest selesai!",
            duration: 3000,
            close: true,
            gravity: "center",
            position: "center",
            offset: { y: 60 },
            style: {
              background: "#4caf50",
              borderRadius: "12px",
              position: "fixed",
            },
          }).showToast();
        })
        .catch((error) => {
          console.error("Error completing quest:", error);
          set({ error: "Failed to complete quest. Please try again." });
        });
    } else {
      set({ error: "User is not authenticated." });
    }
  },
  resetAll: () =>
    set({
      quests: [],
      takenQuests: [],
      npcData: [],
      selectedNpc: null,
      error: null,
      selectedQuest: [],
    }),

  // Load quests from Firebase
  loadQuestsFromFirebase: async () => {
    const { user } = useUserStore.getState();
    const uid = user?.uid;

    if (uid) {
      try {
        const ongoingQuests = await getOngoingQuests(uid);
        set({ quests: ongoingQuests });
      } catch (error) {
        console.error("Error loading quests from Firebase:", error);
        set({ error: error.message });
      }
    }
  },
});

export const useQuestStore = create(
  persist(questStore, {
    name: "quest-store",
  }),
);
