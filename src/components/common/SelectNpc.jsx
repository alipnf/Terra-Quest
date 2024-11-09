export default function SelectNpc({ npcData, selectedNpc, handleNpcChange }) {
  return (
    <div className="mb-4">
      <label htmlFor="npc-select" className="mr-2">
        Pilih NPC:
      </label>
      <select
        id="npc-select"
        value={selectedNpc?.name || ""}
        onChange={handleNpcChange}
        className="select select-bordered"
      >
        <option value="">--Pilih NPC--</option>
        {npcData.map((npc) => (
          <option key={npc.id} value={npc.name}>
            {npc.name}
          </option>
        ))}
      </select>
    </div>
  );
}
