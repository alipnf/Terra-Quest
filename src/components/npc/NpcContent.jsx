import SelectNpc from "../common/SelectNpc";
import NpcInfo from "./NpcInfo";
import QuestItem from "./QuestItem";
import { useNpcData } from "../../hooks/useNpcData";

export default function NpcContent() {
  const { npcData, selectedNpc, handleNpcChange } = useNpcData();

  if (!npcData.length) {
    return <div className="min-h-screen">Loading NPC data...</div>;
  }

  if (!selectedNpc) {
    return (
      <>
        <SelectNpc
          npcData={npcData}
          selectedNpc={selectedNpc}
          handleNpcChange={handleNpcChange}
        />
      </>
    );
  }

  return (
    <>
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
    </>
  );
}
