import { Award } from "lucide-react";
import { useQuestStore } from "../../stores/useQuestStore";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";

export default function QuestCard({ questItem }) {
  const { onDeleteQuest, onTakeQuest, onCompleteQuest, setQuestById, loading } =
    useQuestStore(
      useShallow((state) => ({
        onDeleteQuest: state.onDeleteQuest,
        onTakeQuest: state.onTakeQuest,
        onCompleteQuest: state.onCompleteQuest,
        setQuestById: state.setQuestById,
        takenQuests: state.takenQuests,
        loading: state.loading,
      })),
    );

  const { quest } = questItem;
  const isInProgress = questItem.status === "Sedang dikerjakan";

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
            disabled={loading}
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

        {quest.achievement && (
          <div className="mt-2">
            <span className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              {quest.achievement}
            </span>
          </div>
        )}
        <div className="card-actions mt-3 justify-between flex-wrap gap-2">
          <button
            className={`btn w-full sm:w-auto ${!isInProgress ? "btn-secondary" : "btn-primary"}`}
            onClick={() => onTakeQuest(questItem.id)}
            disabled={loading || isInProgress}
          >
            {isInProgress ? "Quest Diambil" : "Ambil Quest"}
          </button>
          <Link
            to={`/quest/${questItem.id}`}
            className="btn btn-outline w-full sm:w-auto"
            onClick={() => setQuestById(questItem)}
            disabled={loading}
          >
            Tanya NPC
          </Link>
          {isInProgress && (
            <button
              className="btn btn-success w-full sm:w-auto"
              onClick={() => onCompleteQuest(questItem.id)}
              disabled={loading}
            >
              Quest Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
