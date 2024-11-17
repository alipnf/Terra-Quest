import SelectNpc from "./SelectNpc";
import QuestList from "./QuestList";
import { useEffect, useState } from "react";
import { useQuestStore } from "../../stores/useQuestStore";
import { useShallow } from "zustand/react/shallow";
import { fetchNpcDataFromFirestore } from "../../services/firebase/npcDataServices";
import { getOngoingQuests } from "../../services/firebase/questServices";
import { useUserStore } from "../../stores/useUserStore";
import SkeletonQuest from "./skeletonQuest";

export default function QuestContent() {
  const { quests, setNpcData, addQuests } = useQuestStore(
    useShallow((state) => ({
      setNpcData: state.setNpcData,
      quests: state.quests,
      addQuests: state.addQuests,
    })),
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const npcData = await fetchNpcDataFromFirestore();
        setNpcData(npcData);

        if (user) {
          const ongoingQuests = await getOngoingQuests(user.uid);
          if (ongoingQuests.length > 0) {
            addQuests(ongoingQuests);
          }
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [setNpcData, addQuests, user]);

  if (loading) {
    return <SkeletonQuest />;
  }

  if (error) {
    return <div>Error loading NPC data: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mb-8 mt-3 min-h-screen px-4">
      <SelectNpc />

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-10 mb-10 divider">Quests</div>
      {quests && quests.length > 0 && <QuestList />}
    </div>
  );
}
