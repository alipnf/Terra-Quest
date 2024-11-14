import { Navigate } from "react-router-dom";
import { useUserStore } from "../stores/useUserstore";

export default function ProtectedRoute({ children }) {
  const { user } = useUserStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
