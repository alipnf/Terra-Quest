import NpcInfo from "./NpcInfo";
import QuestItem from "./QuestItem";
import { useNpcData } from "../../hooks/useNpcData";

export default function NpcContent() {
  const { npcData, selectedNpc, handleNpcChange } = useNpcData();

  if (!npcData.length) {
    return <div className="min-h-screen">Loading NPC data...</div>;
  }

  if (!selectedNpc && npcData.length > 0) {
    handleNpcChange(npcData[0].name);
  }

  return (
    <div role="tablist" className="tabs tabs-lifted">
      {npcData.map((npc, index) => (
        <>
          {/* Input radio untuk setiap tab dengan label unik */}
          <input
            type="radio"
            name="npc_tabs_2"
            role="tab"
            className="tab"
            aria-label={npc.name}
            id={`tab${index + 1}`}
            defaultChecked={
              selectedNpc === npc.name || (index === 0 && !selectedNpc)
            }
            onClick={() => handleNpcChange(npc.name)}
          />

          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
            id={`tabpanel${index + 1}`}
          >
            <NpcInfo selectedNpc={npc} />

            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Quests</h3>
              {npc.quest && npc.quest.length > 0 ? (
                npc.quest.map((quest, questIndex) => (
                  <QuestItem key={questIndex} quest={quest} />
                ))
              ) : (
                <div>No quests available.</div>
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
