export default function QuestBadge({ difficulty }) {
  return (
    <span
      className={`badge ${
        difficulty === "Easy"
          ? "badge-success"
          : difficulty === "Medium"
            ? "badge-warning"
            : "badge-error"
      }`}
    >
      {difficulty}
    </span>
  );
}
