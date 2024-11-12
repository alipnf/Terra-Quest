import QuestCard from "./QuestCard";
import { useQuestStore } from "../../stores/useQuestStore";
import { useShallow } from "zustand/react/shallow";

export default function QuestList() {
  const { quests, takenQuests } = useQuestStore(
    useShallow((state) => ({
      setQuestById: state.setQuestById,
      quests: state.quests,
      takenQuests: state.takenQuests,
    })),
  );

  console.log("render QuestList");
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
