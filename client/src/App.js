import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function App() {
  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const API_BASE = process.env.NODE_ENV === 'production'
          ? 'https://nikhitha-portfolio-app.onrender.com'
          : '';
        const res = await axios.get(`${API_BASE}/api/theme`);
        if (res.data) {
          const r = document.querySelector(':root');
          r.style.setProperty('--primary', res.data.primary);
          r.style.setProperty('--secondary', res.data.secondary);
          r.style.setProperty('--accent', res.data.accent);
          r.style.setProperty('--bg-dark', res.data.bgDark);
          r.style.setProperty('--text-main', res.data.textMain);
          r.style.setProperty('--gradient-main', `linear-gradient(135deg, ${res.data.primary} 0%, ${res.data.accent} 50%, ${res.data.secondary} 100%)`);
        }
      } catch (err) {
        console.error("Error applying theme:", err);
      }
    };
    fetchTheme();
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}
