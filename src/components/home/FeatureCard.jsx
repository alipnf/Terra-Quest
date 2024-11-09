export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="card bg-neutral-content shadow-lg">
      <div className="card-body text-center">
        <h3 className="card-title flex items-center justify-center">
          <Icon className="mr-2 h-6 w-6" />
          {title}
        </h3>
        <p>{description}</p>
      </div>
    </div>
  );
}
