import {
  Menu,
  Home,
  ScrollText,
  Bot,
  Trophy,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import IconLink from "./IconLink";

export default function MobileMenu({
  isMenuOpen,
  toggleMenu,
  user,
  openLogoutModal,
}) {
  return (
    <div className="relative md:hidden">
      <button onClick={toggleMenu} className="btn btn-ghost" aria-label="menu">
        <Menu className="h-6 w-6 text-neutral-content" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-8 w-max flex flex-col p-2 items-start rounded-lg bg-neutral shadow-lg z-10">
          <IconLink to="/" icon={Home} label="Beranda" onClick={toggleMenu} />

          {user && (
            <>
              <IconLink
                to="/quest"
                icon={ScrollText}
                label="Quest"
                onClick={toggleMenu}
              />
              <IconLink
                to="/npc"
                icon={Bot}
                label="Detail NPC"
                onClick={toggleMenu}
              />
              <IconLink
                to="/achievements"
                icon={Trophy}
                label="Pencapaian"
                onClick={toggleMenu}
              />
            </>
          )}

          {user ? (
            <>
              <IconLink
                to="/"
                icon={User}
                label={user.displayName || "User"}
                onClick={toggleMenu}
              />
              <IconLink
                to="#"
                icon={LogOut}
                label="Logout"
                onClick={openLogoutModal}
              />
            </>
          ) : (
            <IconLink
              to="/login"
              icon={LogIn}
              label="Login"
              onClick={toggleMenu}
            />
          )}
        </div>
      )}
    </div>
  );
}
