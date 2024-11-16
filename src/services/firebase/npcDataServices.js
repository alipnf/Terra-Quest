import {
  collection, //fungsi untuk mengambil koleksi data dari firestore
  getDocs, //fungsi untuk mengambil data dari koleksi
} from "firebase/firestore";
import { db } from "./firebaseConfig";

export const fetchNpcDataFromFirestore = async () => {
  try {
    //fetch koleksi data NPC dari firestore
    const querySnapshot = await getDocs(collection(db, "npcData"));
    //mengubah data didalam querySnapshot menjadi array
    const data = querySnapshot.docs.map((doc) => doc.data());
    return data;
  } catch (error) {
    console.error("Error fetching NPC data:", error);
    throw error;
  }
};
