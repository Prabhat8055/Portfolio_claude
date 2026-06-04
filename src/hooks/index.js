import { useState, useEffect, useRef, useCallback } from "react";

// Theme hook with localStorage persistence
export function useTheme() {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      return saved !== null ? saved === "dark" : true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    } catch {}
    document.documentElement.classList.toggle("light", !isDark);
  }, [isDark]);

  const toggle = useCallback(() => setIsDark((v) => !v), []);
  return { isDark, toggle };
}

// Scroll progress hook
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const el = document.documentElement;
      const scrollTop = el.scrollTop || document.body.scrollTop;
      const scrollHeight = el.scrollHeight - el.clientHeight;
      setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return progress;
}

// Active section hook
// export function useActiveSection(sections) {
//   const [active, setActive] = useState("hero");
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) setActive(entry.target.id);
//         });
//       },
//       { threshold: 0.3 },
//     );
//     sections.forEach((id) => {
//       const el = document.getElementById(id);
//       if (el) observer.observe(el);
//     });
//     return () => observer.disconnect();
//   }, [sections]);
//   return active;
// }

export function useActiveSection(sections) {
  const [active, setActive] = useState(sections[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (!el) return;

        const offsetTop = el.offsetTop;
        const offsetHeight = el.offsetHeight;

        if (
          scrollPosition >= offsetTop &&
          scrollPosition < offsetTop + offsetHeight
        ) {
          setActive(section);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  return active;
}

// Intersection observer for reveal animations
export function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// Typing effect hook
export function useTyping(words, speed = 90, deleteSpeed = 50, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!words.length) return;
    const word = words[wordIndex % words.length];

    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pause);
      return () => clearTimeout(t);
    }

    const delta = isDeleting ? deleteSpeed : speed;
    const t = setTimeout(() => {
      if (!isDeleting) {
        const next = word.slice(0, display.length + 1);
        setDisplay(next);
        if (next === word) setIsPaused(true);
      } else {
        const next = display.slice(0, -1);
        setDisplay(next);
        if (next === "") {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, delta);
    return () => clearTimeout(t);
  }, [
    display,
    isDeleting,
    isPaused,
    wordIndex,
    words,
    speed,
    deleteSpeed,
    pause,
  ]);

  return display;
}

// Mouse position hook
export function useMouse() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const update = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", update, { passive: true });
    return () => window.removeEventListener("mousemove", update);
  }, []);
  return pos;
}

// Parallax hook
export function useParallax(strength = 0.05) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.closest("section") || el.parentElement;
    const handleMouse = (e) => {
      const rect = parent.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setOffset({
        x: (e.clientX - cx) * strength,
        y: (e.clientY - cy) * strength,
      });
    };
    parent.addEventListener("mousemove", handleMouse, { passive: true });
    return () => parent.removeEventListener("mousemove", handleMouse);
  }, [strength]);
  return { ref, offset };
}
