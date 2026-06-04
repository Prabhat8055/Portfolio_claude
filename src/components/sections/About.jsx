import { motion } from "framer-motion";
import { useReveal } from "../../hooks";
import { about, personalInfo } from "../../data/portfolio";
import { MapPin, Zap, Code2, Heart } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const traits = [
  {
    icon: Code2,
    label: "Systems Thinker",
    desc: "I love building things that scale elegantly from 1 to 1M users.",
    color: "var(--accent)",
  },
  {
    icon: Zap,
    label: "Performance First",
    desc: "Every millisecond matters. I obsess over Core Web Vitals and runtime efficiency.",
    color: "var(--cyan)",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* Background decoration */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div {...fadeUp(0)} className="mb-16">
          <p
            className="text-xs font-mono mb-3 tracking-[0.3em] uppercase"
            style={{ color: "var(--accent)", fontFamily: "DM Mono" }}
          >
            01 / About
          </p>
          <h2
            className="text-4xl md:text-5xl font-black leading-tight"
            style={{ fontFamily: "Syne", color: "var(--text)" }}
          >
            The person
            <br />
            <span className="grad-text">behind the code.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left: bio + stats */}
          <div>
            {about.bio.map((paragraph, i) => (
              <motion.p
                key={i}
                {...fadeUp(0.1 + i * 0.1)}
                className="text-base md:text-lg leading-relaxed mb-5"
                style={{
                  color: "var(--text-2)",
                  fontFamily: i === 0 ? "Instrument Serif" : "Syne",
                  fontStyle: i === 0 ? "italic" : "normal",
                  fontSize: i === 0 ? "1.2rem" : "1rem",
                }}
              >
                {paragraph}
              </motion.p>
            ))}

            {/* Stats grid */}
            <motion.div
              {...fadeUp(0.3)}
              className="grid grid-cols-2 gap-4 mt-8"
            >
              {about.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: 0.4 + i * 0.1,
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="glass-2 p-5 rounded-2xl"
                >
                  <div
                    className="text-3xl font-black mb-1 grad-text"
                    style={{ fontFamily: "Syne" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "var(--text-3)", fontFamily: "DM Mono" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: trait cards */}
          <div className="space-y-4">
            {traits.map((trait, i) => (
              <motion.div
                key={trait.label}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.2 + i * 0.1,
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ x: 8, transition: { duration: 0.2 } }}
                className="glass p-5 rounded-2xl flex items-start gap-4 group cursor-default"
                style={{ border: "1px solid var(--border)" }}
                data-cursor-hover
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{
                    background: `${trait.color}20`,
                    border: `1px solid ${trait.color}40`,
                    color: trait.color,
                  }}
                >
                  <trait.icon size={18} />
                </div>
                <div>
                  <div
                    className="font-bold text-sm mb-1"
                    style={{ color: "var(--text)", fontFamily: "Syne" }}
                  >
                    {trait.label}
                  </div>
                  <div
                    className="text-xs leading-relaxed"
                    style={{ color: "var(--text-3)" }}
                  >
                    {trait.desc}
                  </div>
                </div>
                <div
                  className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  style={{ color: trait.color }}
                >
                  →
                </div>
              </motion.div>
            ))}

            {/* Decorative code snippet */}
            <motion.div
              {...fadeUp(0.6)}
              className="glass p-5 rounded-2xl font-mono text-xs leading-6"
              style={{
                border: "1px solid var(--border)",
                fontFamily: "DM Mono",
              }}
            >
              <div style={{ color: "var(--text-3)" }}>// My philosophy</div>
              <div>
                <span style={{ color: "var(--accent)" }}>const</span>
                <span style={{ color: "var(--text)" }}> alex </span>
                <span style={{ color: "var(--text-2)" }}>= {"{"}</span>
              </div>
              <div className="pl-4">
                <span style={{ color: "var(--cyan)" }}>craft</span>
                <span style={{ color: "var(--text-2)" }}>: </span>
                <span style={{ color: "var(--accent-2)" }}>"obsessive"</span>
                <span style={{ color: "var(--text-2)" }}>,</span>
              </div>
              <div className="pl-4">
                <span style={{ color: "var(--cyan)" }}>ships</span>
                <span style={{ color: "var(--text-2)" }}>: </span>
                <span style={{ color: "var(--accent-3)" }}>true</span>
                <span style={{ color: "var(--text-2)" }}>,</span>
              </div>
              <div className="pl-4">
                <span style={{ color: "var(--cyan)" }}>caffeine</span>
                <span style={{ color: "var(--text-2)" }}>: </span>
                <span style={{ color: "var(--text)" }}>Infinity</span>
              </div>
              <div style={{ color: "var(--text-2)" }}>{"}"}</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
