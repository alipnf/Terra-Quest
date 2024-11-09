import { Leaf, Zap } from "lucide-react";

export default function NPCSection() {
  return (
    <section className="mb-12 grid gap-8 md:grid-cols-2">
      <div className="card bg-neutral-content shadow-lg">
        <div className="card-body">
          <h2 className="card-title flex items-center">
            <Leaf className="mr-2 h-6 w-6 text-green-600" /> Greenia
          </h2>
          <p className="text-sm text-gray-500">Penjaga alam dari masa lalu</p>
          <p>Pelajari kebijaksanaan alam untuk melestarikan lingkungan.</p>
        </div>
      </div>
      <div className="card bg-neutral-content shadow-lg">
        <div className="card-body">
          <h2 className="card-title flex items-center">
            <Zap className="mr-2 h-6 w-6 text-blue-600" /> Okta
          </h2>
          <p className="text-sm text-gray-500">Utusan dari masa depan</p>
          <p>Jelajahi inovasi hijau untuk masa kini.</p>
        </div>
      </div>
    </section>
  );
}
