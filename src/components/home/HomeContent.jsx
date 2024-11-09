import WelcomeSection from "./WelcomeSection";
import FeatureList from "./FeatureList";
import NPCSection from "./NpcSection";

export default function HomeContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <WelcomeSection />
      <NPCSection />
      <FeatureList />
    </div>
  );
}
