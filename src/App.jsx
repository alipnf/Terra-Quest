import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NpcDetail from "./pages/NpcDetail";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Quest from "./pages/Quest";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/npc" element={<NpcDetail />} />
        <Route path="/quest" element={<Quest />} />
      </Routes>
      <Footer />
    </Router>
  );
}
