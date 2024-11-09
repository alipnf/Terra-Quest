export default function AchievementItem({ achievements }) {
  return (
    <>
      <h2 className="card-title">Pencapaian</h2>
      <div className="h-[300px] overflow-y-auto">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="mb-6 last:mb-0">
            <div className="mb-2 flex items-center">
              <div className="ml-4">
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-gray-600">
                  {achievement.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
