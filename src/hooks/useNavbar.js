import { useState, useEffect, useRef, useCallback } from "react";
import { useUserStore } from "../stores/useUserStore";

export default function useNavbar() {
  const { user, logout } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useRef untuk melacak isMenuOpen tanpa mempengaruhi render ulang
  const isMenuOpenRef = useRef(isMenuOpen);

  useEffect(() => {
    isMenuOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen((value) => !value);
  const openLogoutModal = () => setIsModalOpen(true);
  const closeLogoutModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    logout();
    closeLogoutModal();
  };

  //useCallback untuk menghindari pembuatan fungsi baru setiap render
  const handleClickOutside = useCallback((event) => {
    // Jika user mengklik di luar navbar dan menu terbuka, maka tutup menu
    if (!event.target.closest(".navbar") && isMenuOpenRef.current) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    isMenuOpen
      ? document.addEventListener("click", handleClickOutside)
      : document.removeEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside, isMenuOpen]);

  return {
    user,
    isMenuOpen,
    isModalOpen,
    toggleMenu,
    openLogoutModal,
    closeLogoutModal,
    handleLogout,
  };
}
