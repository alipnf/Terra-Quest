import WelcomeSection from "../molecules/WelcomeSection";
import NPCSection from "../molecules/NPCSection";
import FeatureList from "../molecules/FeatureList";

export default function HomeContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <WelcomeSection />
      <NPCSection />
      <FeatureList />
    </div>
  );
}
