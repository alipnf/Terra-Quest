import NpcInfo from "./NpcInfo";
import QuestItem from "./QuestItem";
import React, { useEffect, useState } from "react";
import { useNpcStore } from "../../stores/useNpcStore";
import { useFetch } from "../../hooks/useFetch";
import { useShallow } from "zustand/react/shallow";

export default function NpcContent() {
  const { npcData, selectedNpc, setNpcData, selectNpc } = useNpcStore(
    useShallow((state) => ({
      npcData: state.npcData,
      selectedNpc: state.selectedNpc,
      setNpcData: state.setNpcData,
      selectNpc: state.selectNpc,
    })),
  );

  const [isDataFetched, setIsDataFetched] = useState(false);

  const { data, loading, error } = useFetch(
    !isDataFetched ? "https://672b14f7976a834dd0258331.mockapi.io/npc" : null,
  );

  useEffect(() => {
    if (data) {
      setNpcData(data);
      setIsDataFetched(true);
    }
  }, [data, setNpcData]);

  useEffect(() => {
    if (!selectedNpc && npcData.length > 0) {
      selectNpc(npcData[0].name);
    }
  }, [npcData, selectedNpc, selectNpc]);

  if (npcData.length === 0 && loading) {
    return <div className="min-h-screen">Loading NPC data...</div>;
  }

  if (error) {
    return <div>Error loading NPC data: {error.message}</div>;
  }

  return (
    <div role="tablist" className="tabs tabs-bordered border-neutral-300">
      {npcData.map((npc, index) => (
        <React.Fragment key={npc.name}>
          <input
            type="radio"
            name="npc_tabs_2"
            role="tab"
            className="tab mx-2"
            aria-label={npc.name}
            id={`tab${index + 1}`}
            defaultChecked={
              selectedNpc?.name === npc.name || (index === 0 && !selectedNpc)
            }
            onClick={() => selectNpc(npc.name)}
          />

          {selectedNpc?.name === npc.name && (
            <div
              role="tabpanel"
              className="tab-content rounded-box p-6"
              id={`tabpanel${index + 1}`}
            >
              <NpcInfo />
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
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
