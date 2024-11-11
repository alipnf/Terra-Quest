import { useQuestStore } from "../../stores/useQuestStore";
import { Link } from "react-router-dom";

export default function QuestCard({ questItem, isTaken }) {
  const { onDeleteQuest, onTakeQuest, onCompleteQuest, setQuestById } =
    useQuestStore();
  const { quest } = questItem;

  return (
    <div
      key={questItem.id}
      className={`card border bg-base-100 shadow-lg ${isTaken ? "border-green-500" : ""}`}
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
            className={`btn ${isTaken ? "btn-secondary" : "btn-primary"}`}
            onClick={() => onTakeQuest(questItem.id)}
            disabled={isTaken}
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
