import QuestContent from "../components/quest/QuestContent";

export default function Quest({ setTheme }) {
  return (
    <div className="container mx-auto min-h-screen p-4">
      <QuestContent setTheme={setTheme} />
    </div>
  );
}
