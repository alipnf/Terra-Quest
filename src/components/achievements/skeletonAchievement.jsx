export default function SkeletonAchievement() {
  return (
    <div className="p-6">
      <div className="skeleton h-8 w-1/4 mb-8 mx-auto"></div>{" "}
      <div className="flex justify-center mb-8">
        <div className="skeleton h-40 w-full rounded-lg"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 rounded-lg skeleton h-96">
          <div className="skeleton h-6 w-1/3 mb-4"></div>{" "}
          <div className="flex justify-between items-center mb-4">
            <div className="skeleton h-4 w-2/3"></div>
            <div className="skeleton h-4 w-1/5"></div> {/* Dropdown */}
          </div>
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <div className="skeleton h-4 w-2/3"></div>
              <div className="skeleton h-4 w-10"></div>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-lg skeleton h-96">
          <div className="skeleton h-6 w-1/3 mb-4"></div>{" "}
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex justify-between items-center mb-4">
              <div className="skeleton h-4 w-2/3"></div>
              <div className="skeleton h-4 w-8"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
