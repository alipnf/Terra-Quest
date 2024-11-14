export default function SkeletonNpc() {
  return (
    <div className="p-4">
      <div className="skeleton h-6 w-1/4 mb-4"></div> {/* Tab Skeleton */}
      <div className="card mb-8 w-full bg-neutral skeleton shadow-md">
        <div className="card-body">
          <h2 className="skeleton h-8 w-1/3 mb-2"></h2>{" "}
          <div className="skeleton h-4 w-16 mb-2"></div>
          <p className="skeleton h-6 w-full mb-4"></p>{" "}
          <h3 className="skeleton h-4 w-1/5 mb-2"></h3>{" "}
          <ul className="list-disc pl-5">
            <li className="skeleton h-4 w-3/4 mb-2"></li>
            <li className="skeleton h-4 w-2/3 mb-2"></li>
            <li className="skeleton h-4 w-3/5 mb-2"></li>
          </ul>
        </div>
      </div>
      <h3 className="skeleton h-6 w-1/5 mb-4"></h3>{" "}
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="collapse collapse-arrow rounded-box border border-base-300 bg-neutral mb-4 skeleton w-full"
        >
          <div className="collapse-title flex items-center justify-between">
            <span className="skeleton h-4 w-1/2"></span>{" "}
            <span className="skeleton h-4 w-12"></span>
          </div>
          <div className="collapse-content">
            <p className="skeleton h-4 w-full"></p>{" "}
          </div>
        </div>
      ))}
    </div>
  );
}
