import QuestBadge from "./QuestBadge";

export default function QuestItem({ quest }) {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-box border border-base-300 bg-neutral mb-4"
    >
      <input type="checkbox" className="peer" />
      <div className="collapse-title flex items-center justify-between text-lg font-medium text-neutral-content">
        <span>{quest.title}</span>
        <QuestBadge difficulty={quest.difficulty} />
      </div>
      <div className="collapse-content text-neutral-content">
        <p>{quest.description}</p>
      </div>
    </div>
  );
}
