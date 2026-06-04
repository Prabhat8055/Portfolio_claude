import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, Star, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../../data/portfolio';

function ProjectCard({ project, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${project.color}50`;
        e.currentTarget.style.boxShadow = `0 0 30px ${project.color}15`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Top color bar */}
      <div className="h-1 w-full transition-all duration-300 group-hover:h-1.5"
        style={{ background: `linear-gradient(90deg, ${project.color}, ${project.color}80)` }} />

      {/* Card image area */}
      <div className="relative h-44 overflow-hidden"
        style={{ background: `${project.color}08` }}>
        {/* Abstract visual */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="w-32 h-32 rounded-full blur-3xl"
            style={{ background: project.color, opacity: 0.15 }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="absolute inset-0 grid-bg opacity-30" />
          {/* Project number */}
          <div className="absolute top-4 left-5 text-6xl font-black opacity-5"
            style={{ color: project.color, fontFamily: 'Syne' }}>
            {String(project.id).padStart(2, '0')}
          </div>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full glass text-xs font-mono"
            style={{ border: '1px solid var(--border)', color: 'var(--accent)', fontFamily: 'DM Mono' }}>
            <Star size={9} fill="currentColor" /> Featured
          </div>
        )}

        {/* Year */}
        <div className="absolute bottom-3 left-5 text-xs font-mono"
          style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>
          {project.year}
        </div>
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <div className="text-xs font-mono mb-1" style={{ color: project.color, fontFamily: 'DM Mono' }}>
            {project.subtitle}
          </div>
          <h3 className="text-xl font-black" style={{ color: 'var(--text)', fontFamily: 'Syne' }}>
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-2)' }}>
          {project.description}
        </p>

        {/* Expanded description */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <p className="text-sm leading-relaxed mb-4 pt-2"
                style={{ color: 'var(--text-3)', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
                {project.longDescription}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.tags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200"
            style={{
              background: project.color,
              color: '#fff',
              boxShadow: `0 0 15px ${project.color}40`,
            }}
          >
            <ExternalLink size={12} /> Live Preview
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 glass"
            style={{ border: '1px solid var(--border)', color: 'var(--text-2)' }}
          >
            <FaGithub size={12} /> GitHub
          </a>
          <button
            onClick={() => setExpanded(v => !v)}
            data-cursor-hover
            className="ml-auto flex items-center gap-1 text-xs transition-all duration-200"
            style={{ color: 'var(--text-3)' }}
          >
            {expanded ? 'Less' : 'More'}
            <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
              <ChevronDown size={12} />
            </motion.div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 overflow-hidden"
      style={{ background: 'var(--bg-2)' }}>
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Decorative blob */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-10 blob"
        style={{ background: 'var(--accent-2)' }} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-mono mb-3 tracking-[0.3em] uppercase"
              style={{ color: 'var(--accent)', fontFamily: 'DM Mono' }}>
              02 / Work
            </p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ fontFamily: 'Syne', color: 'var(--text)' }}>
              Things I've<br />
              <span className="grad-text">shipped.</span>
            </h2>
          </motion.div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 neon-hover"
            style={{ color: 'var(--text-2)' }}
          >
            All projects on GitHub <ArrowUpRight size={16} />
          </motion.a>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
