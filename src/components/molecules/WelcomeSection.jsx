import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WelcomeSection() {
  return (
    <section className="mb-12 text-center">
      <h1 className="mb-4 text-4xl font-bold text-primary-content">
        Selamat Datang di TerraQuest
      </h1>
      <p className="mb-8 text-xl text-gray-600">
        Bergabunglah dalam petualangan untuk menyelamatkan bumi melalui
        quest-quest interaktif!
      </p>
      <Link to="/quest" className="btn btn-primary btn-lg text-lg">
        Mulai Petualangan <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </section>
  );
}
