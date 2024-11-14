export default function TotalPoints({ totalPoints }) {
  // rank poin
  const getRank = (points) => {
    if (points >= 150) return "S";
    if (points >= 100) return "A";
    if (points >= 50) return "B";
    if (points >= 20) return "C";
    if (points >= 1) return "D";
    return "F";
  };

  return (
    <>
      <h2 className="text-xl font-bold text-center">Total Poin & Peringkat</h2>
      <p className="text-center text-4xl font-bold">
        {totalPoints} | {getRank(totalPoints)}
      </p>
    </>
  );
}
