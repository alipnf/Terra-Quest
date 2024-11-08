export default function ListItem({ label, value }) {
  return (
    <li className="mb-2">
      <span className="font-medium">{label}:</span> {value}
    </li>
  );
}
