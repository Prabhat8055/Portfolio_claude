import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useActiveSection } from "../../hooks";

const SECTIONS = ["hero", "about", "projects", "skills", "contact"];
const NAV_LABELS = {
  hero: "Home",
  about: "About",
  projects: "Work",
  skills: "Skills",
  contact: "Contact",
};

export default function Navbar({ isDark, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(SECTIONS);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12"
        style={{
          height: "64px",
          background: scrolled ? "var(--surface)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--border)"
            : "1px solid transparent",
          transition:
            "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="relative group flex items-center gap-3"
        >
          <div
            className="w-8 h-8 rounded-lg animated-border flex items-center justify-center"
            style={{ background: "var(--bg-2)" }}
          >
            <span className="grad-text text-sm font-black">PB</span>
          </div>
          <span
            className="hidden md:block text-sm font-semibold"
            style={{ color: "var(--text)" }}
          >
            Prabhat Bhasme
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {SECTIONS.map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="relative px-4 py-1.5 text-sm rounded-lg transition-all duration-200 group"
              style={{
                color: active === id ? "var(--accent)" : "var(--text-2)",
                fontFamily: "Syne",
                fontWeight: active === id ? "600" : "400",
              }}
            >
              {active === id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: "rgba(108,99,255,0.12)",
                    border: "1px solid rgba(108,99,255,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{NAV_LABELS[id]}</span>
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            data-cursor-hover
            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--text-2)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? <Moon size={15} /> : <Sun size={15} />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* CTA */}
          <button
            onClick={() => scrollTo("contact")}
            data-cursor-hover
            className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 0 20px var(--glow)",
            }}
          >
            Hire Me
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
            style={{
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              color: "var(--text)",
            }}
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-72 flex flex-col pt-20 pb-8 px-6 gap-2"
            style={{
              background: "var(--bg-2)",
              borderLeft: "1px solid var(--border)",
            }}
          >
            {/* Decorative */}
            <div
              className="absolute top-16 left-4 right-4 h-px"
              style={{ background: "var(--border)" }}
            />

            {SECTIONS.map((id, i) => (
              <motion.button
                key={id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(id)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200"
                style={{
                  background:
                    active === id ? "rgba(108,99,255,0.12)" : "transparent",
                  border: `1px solid ${active === id ? "rgba(108,99,255,0.2)" : "transparent"}`,
                  color: active === id ? "var(--accent)" : "var(--text-2)",
                }}
              >
                <span
                  className="text-xs font-mono"
                  style={{ color: "var(--text-3)", fontFamily: "DM Mono" }}
                >
                  0{i + 1}
                </span>
                <span className="font-semibold">{NAV_LABELS[id]}</span>
              </motion.button>
            ))}

            <div
              className="mt-auto pt-6 border-t"
              style={{ borderColor: "var(--border)" }}
            >
              <button
                onClick={() => scrollTo("contact")}
                className="w-full py-3 rounded-xl font-semibold text-white"
                style={{
                  background: "var(--accent)",
                  boxShadow: "0 0 20px var(--glow)",
                }}
              >
                Let's Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
