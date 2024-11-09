import { useState } from "react";
import QuestCard from "./QuestCard";

export default function QuestList({
  sortedQuests,
  handleDeleteQuest,
  handleTakeQuest,
}) {
  const [takenQuests, setTakenQuests] = useState([]);

  const handleTakeQuestClick = (questId) => {
    handleTakeQuest(questId);
    setTakenQuests([questId, ...takenQuests]);
  };

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {sortedQuests
        .sort(
          (a, b) =>
            (takenQuests.includes(b.id) ? 1 : 0) -
            (takenQuests.includes(a.id) ? 1 : 0),
        )
        .map((questItem) => (
          <QuestCard
            key={questItem.id}
            questItem={questItem}
            isTaken={takenQuests.includes(questItem.id)}
            onTakeQuest={handleTakeQuestClick}
            onDeleteQuest={handleDeleteQuest}
          />
        ))}
    </div>
  );
}
