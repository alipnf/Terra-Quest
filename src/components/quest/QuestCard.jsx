import { useQuestStore } from "../../stores/useQuestStore";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

export default function QuestCard({ questItem }) {
  const {
    onDeleteQuest,
    onTakeQuest,
    onCompleteQuest,
    setQuestById,
    takenQuests,
  } = useQuestStore(
    useShallow((state) => ({
      onDeleteQuest: state.onDeleteQuest,
      onTakeQuest: state.onTakeQuest,
      onCompleteQuest: state.onCompleteQuest,
      setQuestById: state.setQuestById,
      takenQuests: state.takenQuests,
    })),
  );

  const { quest } = questItem;
  const isTaken = takenQuests.includes(questItem.id);
  const isInProgress = questItem.status === "Sedang dikerjakan"; // Cek status

  return (
    <div
      key={questItem.id}
      className={`card border bg-base-100 shadow-lg ${isInProgress ? "border-green-500" : ""}`}
    >
      <div className="card-body">
        <div className="flex items-start justify-between">
          <h2 className="card-title">{quest.title}</h2>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => onDeleteQuest(questItem.id)}
          >
            ✕
          </button>
        </div>
        <div className="mb-2 flex items-center space-x-2">
          <span
            className={`badge ${quest.difficulty === "Easy" ? "badge-secondary" : quest.difficulty === "Medium" ? "badge-primary" : "badge-error"}`}
          >
            {quest.difficulty}
          </span>
          <span className="text-sm">Poin: {quest.points}</span>
        </div>
        <p>{quest.description}</p>
        <div className="card-actions mt-3 justify-between">
          <button
            className={`btn ${!isInProgress ? "btn-secondary" : "btn-primary"}`}
            onClick={() => onTakeQuest(questItem.id)}
            disabled={isInProgress}
          >
            {isTaken ? "Quest Diambil" : "Ambil Quest"}
          </button>
          <Link
            to={`/quest/${questItem.id}`}
            className="btn btn-outline"
            onClick={() => setQuestById(questItem)}
          >
            Tanya NPC
          </Link>
          {isTaken && (
            <button
              className="btn btn-success"
              onClick={() => onCompleteQuest(questItem.id)}
            >
              Quest Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
