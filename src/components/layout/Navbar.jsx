import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import IconLink from "./IconLink";
import { Leaf, Home, Trophy, ScrollText, Bot, Menu } from "lucide-react";

export default function Navbar() {
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
          <div className="absolute right-0 top-full mt-8 w-48 rounded-lg bg-neutral shadow-lg z-10">
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
          </div>
        )}
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex">
        <IconLink to="/" icon={Home} label="Beranda" />
        <IconLink to="/quest" icon={ScrollText} label="Quest" />
        <IconLink to="/npc" icon={Bot} label="Detail NPC" />
        <IconLink to="/achievements" icon={Trophy} label="Pencapaian" />
      </div>
    </div>
  );
}
