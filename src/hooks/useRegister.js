import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserstore";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../services/firebase/firebaseConfig";

export function useRegister() {
  const { register, error, setUser, setError } = useUserStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(email, password, name, (status, errorMessage) => {
      if (status === true) {
        setShowSuccessModal(true);
      } else if (status === "error") {
        console.error(errorMessage);
        setShowSuccessModal(false);
      }
    });
  };

  const handleGoogleRegister = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      console.error("Error registering with Google:", error);
      setError("Pendaftaran dengan Google gagal. Silakan coba lagi.");
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, setError]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    name,
    setName,
    handleSubmit,
    handleGoogleRegister,
    showSuccessModal,
    closeSuccessModal,
    error,
  };
}
