import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NpcDetail from "../pages/NpcDetail";
import Quest from "../pages/Quest";
import Achievements from "../pages/Achievements";
import QuestDetail from "../components/quest/QuestDetail";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes({ setTheme }) {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/npc"
        element={
          <ProtectedRoute>
            <NpcDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quest"
        element={
          <ProtectedRoute>
            <Quest setTheme={setTheme} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/quest/:id"
        element={
          <ProtectedRoute>
            <QuestDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/achievements"
        element={
          <ProtectedRoute>
            <Achievements />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}
