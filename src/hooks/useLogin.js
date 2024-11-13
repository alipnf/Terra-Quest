import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserstore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase/firebaseConfig";

export function useLogin() {
  const { login, user, error, setUser, setError } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Login dengan Google gagal. Silakan coba lagi.");
    }
  };

  useEffect(() => {
    setError(null);
  }, [setError]);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    handleSubmit,
    handleGoogleLogin,
    error,
  };
}
