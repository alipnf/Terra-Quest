import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchNpcDataFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "npcData"));
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error("Error fetching NPC data:", error);
    throw error;
  }
};
