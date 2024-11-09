import { useState } from "react";
import { generateQuest } from "../../services/geminiApiServices";
import { useNpcData } from "../../hooks/useNpcData";
import NpcSelector from "../common/SelectNpc";
import QuestList from "./QuestList";

export default function QuestContent() {
  const { npcData, selectedNpc, handleNpcChange } = useNpcData();
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQuestHandler = async () => {
    if (!selectedNpc) return;

    setLoading(true);
    setError(null);
    try {
      const responseJson = await generateQuest(selectedNpc);
      const questsWithId = responseJson.map((questObj, index) => ({
        id: index,
        ...questObj,
      }));
      setQuests(questsWithId);
    } catch (error) {
      console.error(error);
      setError("Gagal menghasilkan quest. Silakan coba lagi.");
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
          ? { ...questObj, quest: { ...questObj.quest, status: "taken" } }
          : questObj,
      ),
    );
  };

  return (
    <div className="container mx-auto mb-8 mt-3 min-h-screen px-4">
      <h1 className="mb-4 text-3xl font-bold">Quest NPC</h1>
      <NpcSelector
        npcData={npcData}
        selectedNpc={selectedNpc}
        handleNpcChange={handleNpcChange}
      />
      <button
        onClick={generateQuestHandler}
        disabled={loading || !selectedNpc}
        className="mt-2 rounded-md bg-blue-500 px-4 py-2 text-white disabled:bg-gray-400"
      >
        {loading ? "Menghasilkan..." : "Generate Quest"}
      </button>
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
