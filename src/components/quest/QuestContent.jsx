import { useEffect } from "react";
import { useQuestStore } from "../../stores/useQuestStore";
import SelectNpc from "./SelectNpc";
import QuestList from "./QuestList";
import { useFetch } from "../../hooks/useFetch";
import { useState } from "react";

export default function QuestContent({ setTheme }) {
  const { quests, setNpcData, npcData } = useQuestStore();
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

  if (npcData.length === 0 && loading) {
    return <div className="min-h-screen">Loading NPC data...</div>;
  }
  return (
    <div className="container mx-auto mb-8 mt-3 min-h-screen px-4">
      <SelectNpc setTheme={setTheme} />

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {quests && quests.length > 0 && <QuestList />}
    </div>
  );
}
