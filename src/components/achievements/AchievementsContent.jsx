import { useState, useEffect } from "react";
import AchievementsCard from "./AchievementsCard";
import TotalPoints from "./TotalPoints";
import CompletedMissionItem from "./CompletedMissionItem";
import AchievementItem from "./AchievementItem";

export default function CompletedMissions() {
  const [completedMissions, setCompletedMissions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    setCompletedMissions([
      {
        id: 1,
        title: "Misi Penyelamatan Energi",
        difficulty: "Medium",
        points: 4,
      },
      { id: 2, title: "Daur Ulang Kreatif", difficulty: "Easy", points: 2 },
      { id: 3, title: "Transportasi Hijau", difficulty: "Medium", points: 5 },
    ]);

    setAchievements([
      {
        id: 1,
        title: "Pahlawan Bumi Pemula",
        description: "Selesaikan 3 misi",
        progress: 100,
      },
      {
        id: 2,
        title: "Penyelamat Energi",
        description: "Hemat 100 kWh energi",
        progress: 75,
      },
      {
        id: 3,
        title: "Pelindung Hutan",
        description: "Tanam 10 pohon",
        progress: 50,
      },
    ]);
  }, []);

  useEffect(() => {
    const points = completedMissions.reduce(
      (sum, mission) => sum + mission.points,
      0,
    );
    setTotalPoints(points);
  }, [completedMissions]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="mb-8 text-center text-4xl font-bold">
        Misi Selesai & Pencapaian
      </h1>

      <div className="mb-8">
        <AchievementsCard>
          <TotalPoints totalPoints={totalPoints} />
        </AchievementsCard>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <AchievementsCard>
          <CompletedMissionItem mission={completedMissions} />
        </AchievementsCard>

        <AchievementsCard>
          <AchievementItem achievements={achievements} />
        </AchievementsCard>
      </div>
    </div>
  );
}
