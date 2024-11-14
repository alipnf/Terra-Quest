import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";
import useNavbar from "../../hooks/useNavbar";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const {
    user,
    isMenuOpen,
    toggleMenu,
    isModalOpen,
    openLogoutModal,
    closeLogoutModal,
    handleLogout,
  } = useNavbar();

  return (
    <>
      <div className="navbar sticky top-0 z-50 w-full justify-between bg-neutral px-5 md:px-10 xl:px-20">
        <Link to="/" className="btn btn-ghost">
          <Leaf className="h-6 w-6 text-neutral-content" />
          <p className="text-lg font-bold text-neutral-content md:text-base xl:text-xl">
            TerraQuest
          </p>
        </Link>

        {/* Mobile Menu */}
        <MobileMenu
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          user={user}
          openLogoutModal={openLogoutModal}
        />

        {/* Desktop Menu */}
        <DesktopMenu user={user} openLogoutModal={openLogoutModal} />
      </div>

      {/* Modal Konfirmasi Logout */}
      <LogoutModal
        isOpen={isModalOpen}
        closeModal={closeLogoutModal}
        onLogout={handleLogout}
      />
    </>
  );
}
