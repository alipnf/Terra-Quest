import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/molecules/Navbar";
import Footer from "./components/molecules/Footer";
import NPCDetail from "./components/pages/NpcDetail";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/npc" element={<NPCDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}
