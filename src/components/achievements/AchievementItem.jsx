import { Award } from "lucide-react";

export default function AchievementItem({ achievements }) {
  return (
    <>
      <h2 className="text-xl font-bold text-center">Pencapaian</h2>
      <div className="h-[300px] overflow-y-auto mt-3">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="mb-6 last:mb-0">
            <div
              tabIndex={0}
              className="collapse collapse-arrow rounded-box border border-base-300 bg-neutral mb-4"
            >
              <input type="checkbox" className="peer" />
              <div className="collapse-title flex items-center justify-between text-lg font-medium text-neutral-content">
                <span>{achievement.title}</span>
                <Award className="text-yellow-500" />
              </div>
              <div className="collapse-content text-neutral-content">
                <p>{achievement.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
