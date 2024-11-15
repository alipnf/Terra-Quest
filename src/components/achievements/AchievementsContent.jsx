import { useState, useEffect } from "react";
import AchievementsCard from "./AchievementsCard";
import TotalPoints from "./TotalPoints";
import AchievementItem from "./AchievementItem";
import { getCompletedQuests } from "../../services/firebase/questServices";
import { useUserStore } from "../../stores/useUserStore";
import CompletedQuestItem from "./CompletedQuestItem";
import SkeletonAchievement from "./skeletonAchievement";

export default function CompletedMissions() {
  const [completedMissions, setCompletedMissions] = useState([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useUserStore();

  useEffect(() => {
    if (!user?.uid) return;

    async function fetchCompletedMissions() {
      try {
        const questsData = await getCompletedQuests(user.uid);
        setCompletedMissions(questsData);
        setLoading(false);

        const extractedAchievements = questsData
          .filter((quest) => quest.quest?.achievement)
          .map((quest) => ({
            id: quest.id,
            title: quest.quest.achievement,
            description: quest.quest.description,
          }));

        setAchievements(extractedAchievements); // Set achievements ke state
      } catch (error) {
        console.error("Error fetching completed quests:", error);
        setLoading(false);
      }
    }

    fetchCompletedMissions();
  }, [user?.uid]);

  useEffect(() => {
    // Menghitung total points berdasarkan completedMissions
    const points = completedMissions.reduce(
      (sum, mission) => sum + (mission.quest?.points || 0),
      0,
    );
    setTotalPoints(points);
  }, [completedMissions]);

  if (loading) {
    return <SkeletonAchievement />;
  }

  return (
    <div className="mx-auto p-4">
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
          <CompletedQuestItem mission={completedMissions} />
        </AchievementsCard>

        <AchievementsCard>
          <AchievementItem achievements={achievements} />
        </AchievementsCard>
      </div>
    </div>
  );
}
