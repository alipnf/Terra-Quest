import { useState } from "react";
import QuestList from "./QuestList";
import { useNpcData } from "../../hooks/useNpcData";
import { generateQuest } from "../../services/geminiApiServices";
import SelectNpc from "./SelectNpc";

export default function QuestContent({ setTheme }) {
  const { npcData, selectedNpc, handleNpcChange } = useNpcData();
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQuestHandler = async () => {
    if (!selectedNpc) return;

    setLoading(true);
    setError(null);
    try {
      const responseJson = await generateQuest(selectedNpc, npcData);
      const questsWithId = responseJson.map((questObj, index) => ({
        id: index,
        ...questObj,
      }));
      setQuests(questsWithId);
    } catch (error) {
      console.error(error);
      setError("Gagal mencari quest. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteQuest = (questId) => {
    setQuests((prevQuests) =>
      prevQuests.filter((questObj) => questObj.id !== questId),
    );
  };

  const handleTakeQuest = (questId) => {
    setQuests((prevQuests) =>
      prevQuests.map((questObj) =>
        questObj.id === questId
          ? {
              ...questObj,
              quest: { ...questObj.quest, status: "Sedang dikerjakan" },
            }
          : questObj,
      ),
    );
  };

  return (
    <div className="container mx-auto mb-8 mt-3 min-h-screen px-4">
      <SelectNpc
        npcData={npcData}
        selectedNpc={selectedNpc}
        handleNpcChange={handleNpcChange}
        handleSearchQuests={generateQuestHandler}
        loading={loading}
        setTheme={setTheme}
      />
      {error && <p className="mt-4 text-red-500">{error}</p>}
      {quests.length > 0 && (
        <QuestList
          sortedQuests={quests}
          handleDeleteQuest={handleDeleteQuest}
          handleTakeQuest={handleTakeQuest}
        />
      )}
    </div>
  );
}
