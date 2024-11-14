import { create } from "zustand";
import { persist } from "zustand/middleware";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { app } from "../services/firebase/firebaseConfig";
import { useQuestStore } from "./useQuestStore";
import { useNpcStore } from "./useNpcStore";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const userStore = (set) => ({
  user: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user, loading: false }),
  setError: (error) => set({ error }),

  register: async (email, password, name, callback) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      await updateProfile(userCredential.user, { displayName: name });
      set({ error: null });
      callback(true); // Indikasikan register berhasil
    } catch (error) {
      console.error(error);
      let errorMessage = "Gagal mendaftar. Silakan coba lagi."; // Default error message
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email sudah digunakan.";
      }
      set({ error: errorMessage });
      callback("error", errorMessage); // Pass error message to callback
    }
  },

  login: async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      set({ user: userCredential.user, error: null });
    } catch (error) {
      console.error(error);
      set({
        error: "Email atau password yang dimasukkan salah. Silakan coba lagi.",
      });
    }
  },

  loginWithGoogle: async (callback) => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      set({ user: result.user, error: null });
      callback("success"); // Indikasikan login berhasil
    } catch (error) {
      console.error(error);
      set({ error: "Gagal login dengan Google. Silakan coba lagi." });
      callback("error"); // Indikasikan ada error
    }
  },

  resetAll: () => set({ npcData: [], selectedNpc: null }),

  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("user-store"); // Hapus data dari localStorage
      localStorage.removeItem("npc-store"); // Hapus data dari store lain
      localStorage.removeItem("quest-store");

      useUserStore.getState().resetAll();
      useQuestStore.getState().resetAll();
      useNpcStore.getState().resetAll();

      set({ user: null, loading: false, error: null });
    } catch (error) {
      set({ error: error.message });
    }
  },

  listenToAuthChanges: () => {
    set({ loading: true });
    onAuthStateChanged(auth, (user) => {
      set({ user, loading: false });
    });
  },
});

export const useUserStore = create(
  persist(userStore, {
    name: "user-store",
  }),
);

export const initializeAuthListener = () => {
  const { listenToAuthChanges } = useUserStore.getState();
  listenToAuthChanges();
};
