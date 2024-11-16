import { Leaf, Zap } from "lucide-react";

const npcs = [
  {
    icon: Leaf,
    name: "Greenia",
    title: "Penjaga alam dari masa lalu",
    description: "Pelajari kebijaksanaan alam untuk melestarikan lingkungan.",
    image:
      "https://res.cloudinary.com/dpye48lbg/image/upload/v1731735978/greenia_unkuiw.webp",
  },
  {
    icon: Zap,
    name: "Okta",
    title: "Utusan dari masa depan",
    description: "Jelajahi inovasi hijau untuk masa kini.",
    image:
      "https://res.cloudinary.com/dpye48lbg/image/upload/v1731660735/okta_qmwzbu.webp",
  },
];

export default function NPCSection() {
  return (
    <section className="mb-12 grid gap-8 md:grid-cols-2">
      {npcs.map((npc, index) => (
        <div key={index} className="card bg-neutral shadow-lg">
          <div className="card-body">
            <img
              src={npc.image}
              alt={npc.name}
              className="object-cover w-full h-48 md:h-80"
            />
            <h2 className="card-title flex items-center text-neutral-content">
              <npc.icon className="mr-2 h-6 w-6" /> {npc.name}
            </h2>
            <p className="text-sm text-neutral-content">{npc.title}</p>
            <p className="text-neutral-content">{npc.description}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
