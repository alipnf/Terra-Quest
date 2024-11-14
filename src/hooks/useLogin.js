import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserstore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase/firebaseConfig";

export function useLogin() {
  const { login, user, error, setUser, setError } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoadingStandard, setIsLoadingStandard] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Password harus minimal 8 karakter.");
      return;
    }

    setIsLoadingStandard(true);
    try {
      await login(email, password);
    } catch (err) {
      console.error("Error during login:", err);
      setError("Login gagal. Silakan coba lagi.");
    } finally {
      setIsLoadingStandard(false);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoadingGoogle(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Login dengan Google gagal. Silakan coba lagi.");
    } finally {
      setIsLoadingGoogle(false);
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
    isLoadingStandard,
    isLoadingGoogle,
  };
}
