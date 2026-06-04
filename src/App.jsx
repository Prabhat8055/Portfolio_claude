import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "./hooks";

// Layout
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

// UI
import Cursor from "./components/ui/Cursor";
import LoadingScreen from "./components/ui/LoadingScreen";
import ScrollProgress from "./components/ui/ScrollProgress";

// Sections
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Contact from "./components/sections/Contact";

export default function App() {
  const { isDark, toggle } = useTheme();
  const [loaded, setLoaded] = useState(false);

  // Prevent body scroll during load
  useEffect(() => {
    if (!loaded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loaded]);

  return (
    <>
      {/* Custom cursor (desktop only) */}
      <Cursor />

      {/* Loading screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main app */}
      {loaded && (
        <>
          <ScrollProgress />
          <Navbar isDark={isDark} onToggleTheme={toggle} />
          <main>
            <Hero />
            <About />
            <Projects />
            <Skills />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
