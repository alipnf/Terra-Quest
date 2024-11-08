import QuestBadge from "../atoms/QuestBadge";

export default function QuestItem({ quest }) {
  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow rounded-box border border-base-300 bg-neutral-content"
    >
      <input type="checkbox" className="peer" />
      <div className="collapse-title flex items-center justify-between text-lg font-medium">
        <span>{quest.title}</span>
        <QuestBadge difficulty={quest.difficulty} />
      </div>
      <div className="collapse-content">
        <p>{quest.description}</p>
      </div>
    </div>
  );
}
