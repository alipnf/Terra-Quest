export default function SkeletonQuest() {
  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <div className="skeleton h-6 w-1/3 mb-6"></div> {/* Heading Skeleton */}
        <div className="flex gap-4 mb-6">
          <div className="skeleton h-10 w-24 rounded-md"></div>{" "}
          <div className="skeleton h-10 w-24 rounded-md"></div>{" "}
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="card p-4 border rounded-md shadow-md skeleton"
          >
            <div className="skeleton h-6 w-2/3 mb-2"></div>
            <div className="skeleton h-4 w-16 mb-2"></div>
            <div className="skeleton h-4 w-12 mb-4"></div>
            <div className="skeleton h-4 w-12 mb-4"></div>
            <div className="skeleton h-4 w-12 mb-4"></div>
            <div className="skeleton h-4 w-12 mb-4"></div>
            <div className="flex justify-between mt-auto">
              <div className="skeleton h-10 w-32 rounded-md"></div>
              <div className="skeleton h-10 w-24 rounded-md"></div>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
