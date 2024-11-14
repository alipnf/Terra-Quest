import { Leaf, Zap } from "lucide-react";

export default function NPCSection() {
  return (
    <section className="mb-12 grid gap-8 md:grid-cols-2">
      <div className="card bg-neutral shadow-lg">
        <div className="card-body">
          <h2 className="card-title flex items-center text-neutral-content">
            <Leaf className="mr-2 h-6 w-6 " /> Greenia
          </h2>
          <p className="text-sm text-neutral-content">
            Penjaga alam dari masa lalu
          </p>
          <p className="text-neutral-content">
            Pelajari kebijaksanaan alam untuk melestarikan lingkungan.
          </p>
        </div>
      </div>
      <div className="card bg-neutral shadow-lg">
        <div className="card-body">
          <h2 className="card-title flex items-center text-neutral-content">
            <Zap className="mr-2 h-6 w-6" /> Okta
          </h2>
          <p className="text-sm text-neutral-content">Utusan dari masa depan</p>
          <p className="text-neutral-content">
            Jelajahi inovasi hijau untuk masa kini.
          </p>
        </div>
      </div>
    </section>
  );
}
