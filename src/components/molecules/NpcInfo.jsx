import ListItem from "../atoms/ListItem";

export default function NpcInfo({ selectedNpc }) {
  return (
    <div className="card mb-8 w-full bg-neutral-content shadow-md">
      <div className="card-body">
        <h2 className="card-title">{selectedNpc.name}</h2>
        <p className="text-sm text-gray-500">{selectedNpc.title}</p>
        <p className="mt-4">{selectedNpc.description}</p>
        <h3 className="mb-2 mt-6 text-lg font-semibold">Personality Traits:</h3>
        <ul className="list-disc pl-5">
          {Object.entries(selectedNpc.personality).map(([key, value]) => (
            <ListItem
              key={key}
              label={key
                .replace(/_/g, " ")
                .replace(/\b\w/g, (l) => l.toUpperCase())}
              value={value}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
