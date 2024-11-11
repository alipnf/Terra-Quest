import { useQuestStore } from "../../stores/useQuestStore";
import QuestCard from "./QuestCard";

export default function QuestList() {
  const { quests, takenQuests } = useQuestStore();

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quests
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
          />
        ))}
    </div>
  );
}
