export default function AchievementsCard({ children }) {
  return (
    <div className="card bg-neutral shadow-lg">
      <div className="card-body text-neutral-content">{children}</div>
    </div>
  );
}
