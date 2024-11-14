export default function CompletedMissionItem({ mission }) {
  return (
    <>
      <h2 className="card-title">Misi Selesai</h2>
      <div className="h-[300px] overflow-y-auto">
        {mission.map((mission) => (
          <div
            key={mission.id}
            className="mb-4 flex items-center justify-between last:mb-0"
          >
            <div className="flex items-center">
              <span>{mission.title}</span>
            </div>
            <div className="flex items-center">
              <span
                className={`badge ${mission.difficulty === "Easy" ? "badge-secondary" : mission.difficulty === "Medium" ? "badge-primary" : "badge-error"}`}
              >
                {mission.difficulty}
              </span>
              <span className="ml-2 font-bold">{mission.points} p</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
