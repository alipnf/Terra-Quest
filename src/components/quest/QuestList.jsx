import QuestCard from "./QuestCard";
import { useQuestStore } from "../../stores/useQuestStore";
import { useShallow } from "zustand/react/shallow";

export default function QuestList() {
  const { quests, takenQuests } = useQuestStore(
    useShallow((state) => ({
      quests: state.quests,
      takenQuests: state.takenQuests,
    })),
  );

  return (
    <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {quests
        .sort((a, b) => {
          const isATaken = takenQuests.includes(a.id) ? 1 : 0;
          const isBTaken = takenQuests.includes(b.id) ? 1 : 0;
          return isBTaken - isATaken; //mengurutkan dari yang terbesar
        })
        .map((questItem) => (
          <QuestCard key={questItem.id} questItem={questItem} />
        ))}
    </div>
  );
}
