import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills, techStack } from '../../data/portfolio';

// Icon mapping using text
const ICONS = {
  SiReact: '⚛', SiNextdotjs: '▲', SiTypescript: 'TS', SiNodedotjs: '⬡',
  SiPython: '🐍', SiPostgresql: '🐘', SiGraphql: '◈', SiDocker: '🐳',
  SiAmazonaws: '☁', SiFigma: '✦', SiThreedotjs: '⬟', SiRust: '⚙',
};

const categoryColors = {
  Frontend: 'var(--accent)',
  Backend: 'var(--cyan)',
  Database: 'var(--accent-3)',
  API: 'var(--accent-2)',
  DevOps: '#ff9900',
  Creative: 'var(--gold)',
};

function SkillBar({ skill, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full"
            style={{ background: categoryColors[skill.category] || 'var(--accent)' }} />
          <span className="text-sm font-semibold" style={{ color: 'var(--text)', fontFamily: 'Syne' }}>
            {skill.name}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: `${categoryColors[skill.category]}15`,
              color: categoryColors[skill.category],
              fontFamily: 'DM Mono',
              fontSize: '0.65rem',
            }}>
            {skill.category}
          </span>
        </div>
        <span className="text-xs font-mono" style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>
          {skill.level}%
        </span>
      </div>

      {/* Progress track */}
      <div className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'var(--surface-2)' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: index * 0.07 + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full relative overflow-hidden"
          style={{ background: `linear-gradient(90deg, ${categoryColors[skill.category] || 'var(--accent)'}, ${categoryColors[skill.category] || 'var(--accent)'}80)` }}
        >
          {/* Shimmer on bar */}
          <motion.div
            className="absolute inset-y-0 w-16 -skew-x-12"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }}
            animate={{ x: ['-64px', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 + index * 0.1, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}

function TechBadge({ tech, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      whileHover={{ y: -6, scale: 1.05 }}
      className="flex flex-col items-center gap-2 p-4 rounded-2xl glass group cursor-default"
      style={{ border: '1px solid var(--border)', minWidth: '80px' }}
      data-cursor-hover
    >
      <div
        className="text-xl transition-all duration-300 group-hover:scale-125 group-hover:drop-shadow-lg"
        style={{ filter: `drop-shadow(0 0 8px ${tech.color}60)` }}
      >
        {ICONS[tech.icon] || tech.name[0]}
      </div>
      <span className="text-xs text-center leading-tight"
        style={{ color: 'var(--text-3)', fontFamily: 'DM Mono', fontSize: '0.65rem' }}>
        {tech.name}
      </span>
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', ...new Set(skills.map(s => s.category))];
  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="relative py-28 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute right-0 top-0 w-80 h-80 rounded-full blur-3xl opacity-8"
        style={{ background: 'radial-gradient(circle, var(--cyan), transparent)' }} />

      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <p className="text-xs font-mono mb-3 tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)', fontFamily: 'DM Mono' }}>
            03 / Skills
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ fontFamily: 'Syne', color: 'var(--text)' }}>
            My toolkit for<br />
            <span className="grad-text">building things.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Skills list */}
          <div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  data-cursor-hover
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
                  style={{
                    background: activeCategory === cat ? 'var(--accent)' : 'var(--surface-2)',
                    color: activeCategory === cat ? '#fff' : 'var(--text-3)',
                    border: activeCategory === cat ? 'none' : '1px solid var(--border)',
                    fontFamily: 'DM Mono',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-5">
              {filtered.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>

          {/* Right: tech icons grid + visual */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text)', fontFamily: 'Syne' }}>
                Tech Stack
              </p>
              <p className="text-xs" style={{ color: 'var(--text-3)' }}>
                Tools & technologies I reach for daily
              </p>
            </motion.div>

            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <TechBadge key={tech.name} tech={tech} index={i} />
              ))}
            </div>

            {/* Decorative terminal */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mt-8 glass rounded-2xl overflow-hidden"
              style={{ border: '1px solid var(--border)' }}
            >
              {/* Terminal header */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: '1px solid var(--border)', background: 'var(--surface-2)' }}>
                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                  <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
                ))}
                <span className="ml-2 text-xs" style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>
                  ~/ terminal
                </span>
              </div>
              <div className="p-4 font-mono text-xs space-y-1.5" style={{ fontFamily: 'DM Mono' }}>
                <div style={{ color: 'var(--text-3)' }}>$ npx alex-mercer --skills</div>
                <div style={{ color: 'var(--accent-3)' }}>✓ Loading expertise modules...</div>
                <div><span style={{ color: 'var(--cyan)' }}>frontend</span><span style={{ color: 'var(--text-2)' }}>: React, Next.js, TypeScript</span></div>
                <div><span style={{ color: 'var(--accent-2)' }}>backend</span><span style={{ color: 'var(--text-2)' }}>: Node.js, Python, Rust</span></div>
                <div><span style={{ color: 'var(--accent-3)' }}>infra</span><span style={{ color: 'var(--text-2)' }}>: AWS, Docker, Kubernetes</span></div>
                <div style={{ color: 'var(--text-3)' }}>
                  <span style={{ color: 'var(--accent)' }}>$</span> <span className="cursor-blink">_</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
