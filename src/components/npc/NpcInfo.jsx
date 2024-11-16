import ListItem from "./ListItem";
import { useNpcStore } from "../../stores/useNpcStore";
import { useShallow } from "zustand/react/shallow";

export default function NpcInfo() {
  const { selectedNpc } = useNpcStore(
    useShallow((state) => ({ selectedNpc: state.selectedNpc })),
  );

  return (
    <div className="card mb-8 w-full bg-neutral shadow-md">
      <div className="card-body text-neutral-content flex flex-col md:flex-row items-center gap-8 md:items-center">
        {/* Image container */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <img
            src={selectedNpc.image}
            alt={selectedNpc.name}
            className="object-cover w-full h-64 md:h-80 rounded-lg shadow-xl"
          />
        </div>

        {/* Text content container */}
        <div className="w-full md:w-1/2 pr-6">
          <h2 className="card-title">{selectedNpc.name}</h2>
          <p className="text-sm text-gray-500">{selectedNpc.title}</p>
          <p className="mt-4">{selectedNpc.description}</p>
          <h3 className="mb-2 mt-6 text-lg font-semibold">
            Personality Traits:
          </h3>
          <ul className="list-disc pl-5">
            {/* mengubah object menjadi array dan menampilkan key dan value 
            contohnya: { "key": "value" } => ["key", "value"] 
            */}
            {Object.entries(selectedNpc.personality).map(([key, value]) => (
              <ListItem
                key={key}
                label={key
                  .replace(/_/g, " ") // ganti _ dengan spasi
                  .replace(/\b\w/g, (l) => l.toUpperCase())} //mengubah huruf pertama menjadi kapital
                value={value}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
