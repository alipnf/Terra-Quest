import { useState } from "react";

export default function CompletedQuestItem({ mission }) {
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const handleDifficultyChange = (event) => {
    setDifficultyFilter(event.target.value);
  };

  const filteredMissions = mission.filter((mission) => {
    if (difficultyFilter === "All") return true;
    return mission.quest.difficulty === difficultyFilter;
  });

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Misi Selesai</h2>
        <select
          className="select select-ghost"
          value={difficultyFilter}
          onChange={handleDifficultyChange}
        >
          <option disabled value="">
            Pilih Kesulitan
          </option>
          <option value="All">Semua</option>
          <option value="Easy">Mudah</option>
          <option value="Medium">Sedang</option>
          <option value="Hard">Sulit</option>
        </select>
      </div>

      <div className="h-[300px] overflow-y-auto">
        {filteredMissions.map((mission) => (
          <div
            key={mission.id}
            className="mt-3 mb-4 flex items-center justify-between last:mb-0"
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-semibold">{mission.quest.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`badge ${
                  mission.quest.difficulty === "Easy"
                    ? "badge-secondary"
                    : mission.quest.difficulty === "Medium"
                      ? "badge-primary"
                      : "badge-error"
                }`}
              >
                {mission.quest.difficulty}
              </span>
              <span className="font-bold">{mission.quest.points}p</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
