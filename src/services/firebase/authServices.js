import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword, //fungsi untuk membuat user baru
  signInWithEmailAndPassword, // fungsi untuk login user
  signOut, //fungsi untuk logout user
} from "firebase/auth";

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = () => {
  return signOut(auth);
};
