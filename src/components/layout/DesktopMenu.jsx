import { Link } from "react-router-dom";
import {
  Home,
  ScrollText,
  Bot,
  Trophy,
  LogOut,
  User,
  LogIn,
} from "lucide-react";
import IconLink from "./IconLink";

export default function DesktopMenu({ user, openLogoutModal }) {
  return (
    <div className="hidden md:flex gap-3">
      <IconLink to="/" icon={Home} label="Beranda" />

      {/* Menambahkan pengecekan user */}
      {user && (
        <>
          <IconLink to="/quest" icon={ScrollText} label="Quest" />
          <IconLink to="/npc" icon={Bot} label="Detail NPC" />
          <IconLink to="/achievements" icon={Trophy} label="Pencapaian" />
        </>
      )}

      <div className="flex items-center">
        {user ? (
          <div className="dropdown dropdown-end text-neutral-content">
            <div tabIndex={0} role="button" className="btn btn-ghost">
              <User className="h-6 w-6 text-neutral-content" />
              <p className="text-lg font-normal text-neutral-content md:text-base xl:text-xl">
                {user.displayName || "User"}
              </p>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral rounded-box mt-3 w-52 p-2 shadow"
            >
              <p
                className="btn btn-ghost justify-start"
                onClick={openLogoutModal}
              >
                <LogOut />
                Logout
              </p>
            </ul>
          </div>
        ) : (
          <Link to="/login" className="btn btn-primary">
            <LogIn />
            Login
          </Link>
        )}
      </div>
    </div>
  );
}
