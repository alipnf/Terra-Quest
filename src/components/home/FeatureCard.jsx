export default function FeatureCard({ icon: Icon, title, description }) {
  //alias Icon biar bisa di render sebagai component
  return (
    <div className="card bg-neutral shadow-lg">
      <div className="card-body text-center">
        <h3 className="card-title flex items-center text-neutral-content justify-center">
          <Icon className="mr-2 h-6 w-6" />
          {title}
        </h3>
        <p className="text-neutral-content">{description}</p>
      </div>
    </div>
  );
}
