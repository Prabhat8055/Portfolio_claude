import { useEffect, useRef, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTyping, useParallax } from "../../hooks";
import { personalInfo, roles } from "../../data/portfolio";

// Particle canvas background
function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let w, h;
    let particles = [];

    const resize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      particles = Array.from({ length: 80 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (time) => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + w) % w;
        p.y = (p.y + p.vy + h) % h;
        p.twinklePhase += p.twinkleSpeed;
        const alpha = p.opacity * (0.5 + 0.5 * Math.sin(p.twinklePhase));

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(() => {
      resize();
      createParticles();
    });
    ro.observe(canvas);
    resize();
    createParticles();
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  );
}

export default function Hero() {
  const typedText = useTyping(roles, 80, 45, 2200);
  const { ref: parallaxRef, offset } = useParallax(0.03);
  const [downloading, setDownloading] = useState(false);

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => setDownloading(false), 1500);
  };
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Layered background effects */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      <ParticleField />

      {/* Radial glow spots */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-20 blob"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-15 blob float-slow"
        style={{
          background:
            "radial-gradient(circle, var(--accent-2) 0%, transparent 70%)",
          animationDelay: "-4s",
        }}
      />
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full blur-3xl opacity-10"
        style={{
          background:
            "radial-gradient(circle, var(--cyan) 0%, transparent 70%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto mt-10 px-6 md:px-12 flex flex-col items-center text-center">
        {/* Avatar / Profile */}
        <motion.div
          ref={parallaxRef}
          style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className="relative w-28 h-28 md:w-36 md:h-36 mb-8"
        >
          {/* Orbital rings */}
          <motion.div
            className="absolute -inset-3 rounded-full"
            style={{ border: "1px dashed rgba(108,99,255,0.25)" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute -top-1 left-1/2 w-2 h-2 rounded-full -translate-x-1/2"
              style={{ background: "var(--accent)" }}
            />
          </motion.div>
          <motion.div
            className="absolute -inset-7 rounded-full"
            style={{ border: "1px dashed rgba(255,101,132,0.15)" }}
            animate={{ rotate: -360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div
              className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--accent-2)" }}
            />
          </motion.div>

          {/* Avatar circle */}
          <div className="w-full h-full rounded-full animated-border p-1">
            <div
              className="w-full h-full rounded-full flex items-center justify-center text-3xl md:text-4xl font-black grad-text"
              style={{ background: "var(--bg-2)" }}
            >
              <img
                src={personalInfo.avatar}
                alt="profileImage"
                className="z-1 rounded-full"
              />
            </div>
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-sm font-mono mb-3"
          style={{
            color: "var(--accent)",
            fontFamily: "DM Mono",
            letterSpacing: "0.15em",
          }}
        >
          &gt;_ Hello, world. I'm
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-6xl font-black leading-none tracking-tight mb-4"
          style={{ color: "var(--text)", fontFamily: "Syne" }}
        >
          {personalInfo.name.split(" ").map((word, i) => (
            <span key={i} className={i === 1 ? "grad-text" : ""}>
              {word}
              {i === 0 ? " " : ""}
            </span>
          ))}
        </motion.h1>

        {/* Typing role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="h-10 flex items-center gap-2 mb-6"
        >
          <span
            className="text-xl md:text-2xl font-semibold"
            style={{ color: "var(--text-2)" }}
          >
            {typedText}
          </span>
          <span
            className="text-2xl font-thin cursor-blink"
            style={{ color: "var(--accent)" }}
          >
            |
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="max-w-xl text-base md:text-lg leading-relaxed mb-10"
          style={{
            color: "var(--text-2)",
            fontFamily: "Instrument Serif",
            fontStyle: "italic",
          }}
        >
          "{personalInfo.tagline}"
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            data-cursor-hover
            className="group relative px-7 py-3 rounded-xl font-semibold text-sm overflow-hidden transition-all duration-300"
            style={{
              background: "var(--accent)",
              color: "#fff",
              boxShadow: "0 0 30px var(--glow)",
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background:
                  "linear-gradient(135deg, var(--accent), var(--accent-2))",
              }}
            />
          </button>
          <a
            href="/Prabhat_Bhasme.pdf"
            download="Prabhat's_Resume.pdf"
            onClick={handleDownload}
          >
            <button
              data-cursor-hover
              className="px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 glass"
              style={{
                border: "1px solid var(--border-2)",
                color: "var(--text)",
              }}
            >
              {downloading ? "Downloading..." : "Download CV"}
            </button>
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex items-center gap-3 mb-16"
        >
          {[
            {
              href: personalInfo.socials.github,
              icon: FaGithub,
              label: "GitHub",
            },
            {
              href: personalInfo.socials.linkedin,
              icon: FaLinkedin,
              label: "LinkedIn",
            },
            {
              href: personalInfo.socials.twitter,
              icon: FaTwitter,
              label: "Twitter",
            },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-200 neon-hover"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
                color: "var(--text-2)",
              }}
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
          <div
            className="w-px h-6 mx-1"
            style={{ background: "var(--border)" }}
          />
          <a
            href={`mailto:${personalInfo.email}`}
            data-cursor-hover
            className="text-xs font-mono transition-all duration-200 neon-hover"
            style={{ color: "var(--text-3)", fontFamily: "DM Mono" }}
          >
            {personalInfo.email}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToAbout}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-2 transition-opacity hover:opacity-60"
          style={{ color: "var(--text-3)" }}
          data-cursor-hover
        >
          <span
            className="text-xs font-mono tracking-widest uppercase"
            style={{ fontFamily: "DM Mono" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowDown size={16} />
          </motion.div>
        </motion.button>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, var(--bg), transparent)",
        }}
      />
    </section>
  );
}
