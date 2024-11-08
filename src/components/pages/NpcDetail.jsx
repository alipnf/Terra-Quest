import { useNpcData } from "../../hooks/useNpcData";
import SelectNpc from "../atoms/SelectNpc";
import NpcInfo from "../molecules/NpcInfo";
import QuestItem from "../molecules/QuestItem";

export default function NPCDetail() {
  const { npcData, selectedNpc, handleNpcChange } = useNpcData();

  if (!npcData.length) {
    return <div className="min-h-screen">Loading NPC data...</div>;
  }

  if (!selectedNpc) {
    return (
      <div className="container mx-auto mb-8 min-h-screen p-4">
        <SelectNpc
          npcData={npcData}
          selectedNpc={selectedNpc}
          handleNpcChange={handleNpcChange}
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto min-h-screen p-4">
      <SelectNpc
        npcData={npcData}
        selectedNpc={selectedNpc}
        handleNpcChange={handleNpcChange}
      />
      <NpcInfo selectedNpc={selectedNpc} />
      <h3 className="mb-4 text-2xl font-bold">Quests</h3>
      <div className="space-y-4">
        {selectedNpc.quest && selectedNpc.quest.length > 0 ? (
          selectedNpc.quest.map((quest, index) => (
            <QuestItem key={index} quest={quest} />
          ))
        ) : (
          <div>No quests available.</div>
        )}
      </div>
    </div>
  );
}
