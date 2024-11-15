import { useState, useEffect } from "react";
import { useUserStore } from "../stores/useUserStore";

export default function useNavbar() {
  const { user, logout } = useUserStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const openLogoutModal = () => setIsModalOpen(true);
  const closeLogoutModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    logout();
    closeLogoutModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".navbar")) setIsMenuOpen(false);
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

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
