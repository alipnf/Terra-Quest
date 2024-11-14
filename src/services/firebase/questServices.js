import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  deleteField,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const addQuestToUser = async (uid, questItem) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      // Buat dokumen baru jika belum ada
      await setDoc(userRef, {
        quests: {
          [questItem.id]: questItem,
        },
      });
    } else {
      // Perbarui dokumen jika sudah ada
      await updateDoc(userRef, {
        [`quests.${questItem.id}`]: questItem,
      });
    }
    console.log("Quest berhasil disimpan ke Firebase.");
  } catch (error) {
    console.error("Error updating user quests:", error);
  }
};

export const completeQuestInUser = async (uid, questId) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      [`quests.${questId}.status`]: "Selesai",
    });
    console.log(
      "Status misi berhasil diperbarui menjadi 'Selesai' di Firebase.",
    );
  } catch (error) {
    console.error("Error updating quest status to 'Selesai':", error);
  }
};

export const deleteQuestFromUser = async (uid, questId) => {
  try {
    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      [`quests.${questId}`]: deleteField(),
    });
    console.log("Misi berhasil dihapus dari Firebase.");
  } catch (error) {
    console.error("Error deleting quest from Firebase:", error);
  }
};

export const getOngoingQuests = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const quests = userData.quests || {};

      // Filter quests yang statusnya "Sedang dikerjakan"
      const ongoingQuests = Object.values(quests).filter(
        (quest) => quest.status === "Sedang dikerjakan",
      );

      return ongoingQuests;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error mengambil quest yang sedang dikerjakan:", error);
    return [];
  }
};

export const getCompletedQuests = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      const quests = userData.quests || {};

      // Filter quests yang statusnya "Selesai"
      const completedQuests = Object.values(quests).filter(
        (quest) => quest.status === "Selesai",
      );

      console.log(completedQuests); // Tambahkan log ini
      return completedQuests;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error mengambil quest yang selesai:", error);
    return [];
  }
};
