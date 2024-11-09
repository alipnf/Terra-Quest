import { Users, Trophy, Leaf } from "lucide-react";
import FeatureCard from "./FeatureCard";

export default function FeatureList() {
  const features = [
    {
      icon: Users,
      title: "Quest Interaktif",
      description: "Selesaikan quest untuk lingkungan.",
    },
    {
      icon: Trophy,
      title: "Pencapaian",
      description: "Kumpulkan badge dan naik level.",
    },
    {
      icon: Leaf,
      title: "Edukasi Lingkungan",
      description: "Pelajari fakta-fakta menarik.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="mb-4 text-center text-2xl font-bold">Fitur Utama</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
