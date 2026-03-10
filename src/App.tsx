import { Routes, Route } from "react-router-dom";
import { Home, User, Folder, Briefcase, Code, Mail, BookOpen } from "lucide-react";
import { Navbar } from "./components/primitives";
import HomePage from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Experience from "./pages/Experience";
import Blogs from "./pages/Blogs";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Admin — no navbar */}
      <Route path="/admin" element={<Admin />} />

      {/* Public portfolio */}
      <Route
        path="*"
        element={
          <div className="min-h-screen">
            <Navbar
              navItems={[
                { name: "Home", href: "/", icon: <Home className="h-4 w-4" /> },
                { name: "About", href: "/about", icon: <User className="h-4 w-4" /> },
                {
                  name: "Experience",
                  href: "/experience",
                  icon: <Briefcase className="h-4 w-4" />,
                },
                {
                  name: "Projects",
                  href: "/projects",
                  icon: <Folder className="h-4 w-4" />,
                },
                {
                  name: "Skills",
                  href: "/skills",
                  icon: <Code className="h-4 w-4" />,
                },
                {
                  name: "Contact",
                  href: "/contact",
                  icon: <Mail className="h-4 w-4" />,
                },
                {
                  name: "Blogs",
                  href: "/blogs",
                  icon: <BookOpen className="h-4 w-4" />,
                },
              ]}
            />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<About />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
