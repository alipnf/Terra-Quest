import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../../stores/useUserstore"; // Import global store
import IconLink from "./IconLink";
import { Leaf, Home, Trophy, ScrollText, Bot, Menu } from "lucide-react";
import { LogOut } from "lucide-react";
import { User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useUserStore(); // Ambil state user dan fungsi logout dari global store
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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

  return (
    <div className="navbar relative w-full justify-between bg-neutral px-5 md:px-10 xl:px-20">
      <Link to="/" className="btn btn-ghost">
        <Leaf className="h-6 w-6 text-neutral-content" />
        <p className="text-lg font-bold text-neutral-content md:text-base xl:text-xl">
          TerraQuest
        </p>
      </Link>

      <div className="relative md:hidden">
        <button onClick={toggleMenu} className="btn btn-ghost">
          <Menu className="h-6 w-6 text-neutral-content" />
        </button>
        {/* Dropdown Menu */}
        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-8 w-max flex flex-col p-2 items-start rounded-lg bg-neutral shadow-lg z-10">
            <IconLink
              to="/"
              icon={Home}
              label="Beranda"
              onClick={() => setIsMenuOpen(false)}
            />
            <IconLink
              to="/quest"
              icon={ScrollText}
              label="Quest"
              onClick={() => setIsMenuOpen(false)}
            />
            <IconLink
              to="/npc"
              icon={Bot}
              label="Detail NPC"
              onClick={() => setIsMenuOpen(false)}
            />
            <IconLink
              to="/achievements"
              icon={Trophy}
              label="Pencapaian"
              onClick={() => setIsMenuOpen(false)}
            />
            {/* Menambahkan User Profile dan Logout pada menu mobile */}
            {user ? (
              <>
                <IconLink
                  to="/"
                  icon={User}
                  label={user.displayName || "User"}
                  onClick={() => setIsMenuOpen(false)}
                />
                <IconLink
                  to="/"
                  icon={LogOut}
                  label="LogOut"
                  onClick={logout}
                />
              </>
            ) : (
              <IconLink
                to="/login"
                icon={Trophy}
                label="Login"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </div>
        )}
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex gap-3">
        <IconLink to="/" icon={Home} label="Beranda" />
        <IconLink to="/quest" icon={ScrollText} label="Quest" />
        <IconLink to="/npc" icon={Bot} label="Detail NPC" />
        <IconLink to="/achievements" icon={Trophy} label="Pencapaian" />

        {/* Conditional Rendering: Show Login/Register or Avatar */}
        <div className="flex items-center">
          {user ? (
            <div className="dropdown dropdown-end text-neutral-content">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Avatar"
                    src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXVzZXIiPjxwYXRoIGQ9Ik0xOSAyMXYtMmE0IDQgMCAwIDAtNC00SDlhNCA0IDAgMCAwLTQgNHYyIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ii8+PC9zdmc+"
                    className="text-neutral-content"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    {user.displayName || "User"}
                  </a>
                </li>
                <li>
                  <a onClick={logout}>Logout</a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
