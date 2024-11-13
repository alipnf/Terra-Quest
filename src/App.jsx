import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NpcDetail from "./pages/NpcDetail";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Quest from "./pages/Quest";
import Achievements from "./pages/Achievements";
import { useState, useEffect } from "react";
import QuestDetail from "./components/quest/QuestDetail";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

export default function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "lemonade",
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/npc" element={<NpcDetail />} />
        <Route path="/quest" element={<Quest setTheme={setTheme} />} />
        <Route path="/quest/:id" element={<QuestDetail />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </Router>
  );
}
