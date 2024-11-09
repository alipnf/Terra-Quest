import { Link } from "react-router-dom";

export default function IconLink({ to, icon: Icon, label, onClick }) {
  return (
    <Link to={to} className="btn btn-ghost" onClick={onClick}>
      <Icon className="h-6 w-6 text-neutral-content" />
      <p className="text-lg font-normal text-neutral-content md:text-base xl:text-xl">
        {label}
      </p>
    </Link>
  );
}
