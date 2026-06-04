import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, ChevronDown, MapPin, Calendar } from 'lucide-react';
import { experience } from '../../data/portfolio';

function TimelineItem({ item, index, isLast }) {
  const [open, setOpen] = useState(false);
  const isWork = item.type === 'work';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex gap-6 md:gap-8"
    >
      {/* Timeline line */}
      <div className="flex flex-col items-center">
        {/* Icon */}
        <motion.div
          whileHover={{ scale: 1.15 }}
          className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `${item.color}15`,
            border: `1.5px solid ${item.color}40`,
            color: item.color,
            boxShadow: `0 0 20px ${item.color}20`,
          }}
        >
          {isWork ? <Briefcase size={16} /> : <GraduationCap size={16} />}
        </motion.div>

        {/* Vertical line */}
        {!isLast && (
          <div className="w-px flex-1 mt-3"
            style={{ background: `linear-gradient(to bottom, ${item.color}30, transparent)`, minHeight: '40px' }} />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-10">
        <button
          onClick={() => setOpen(v => !v)}
          data-cursor-hover
          className="w-full text-left group"
        >
          <div className="glass rounded-2xl p-5 transition-all duration-300 hover:border-current"
            style={{ border: `1px solid var(--border)` }}
            onMouseEnter={e => e.currentTarget.style.borderColor = `${item.color}30`}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
          >
            {/* Header row */}
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-base font-bold mb-0.5" style={{ color: 'var(--text)', fontFamily: 'Syne' }}>
                  {item.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="font-semibold" style={{ color: item.color }}>
                    {item.company}
                  </span>
                  <span className="flex items-center gap-1" style={{ color: 'var(--text-3)' }}>
                    <MapPin size={10} /> {item.location}
                  </span>
                  <span className="flex items-center gap-1" style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>
                    <Calendar size={10} /> {item.period}
                  </span>
                </div>
              </div>

              <motion.div
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ color: 'var(--text-3)', flexShrink: 0 }}
              >
                <ChevronDown size={16} />
              </motion.div>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-2)' }}>
              {item.description}
            </p>

            {/* Expandable highlights */}
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 mt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <p className="text-xs mb-3" style={{ color: 'var(--text-3)', fontFamily: 'DM Mono', letterSpacing: '0.1em' }}>
                      KEY CONTRIBUTIONS
                    </p>
                    <ul className="space-y-2">
                      {item.highlights.map((h, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-start gap-2 text-sm"
                          style={{ color: 'var(--text-2)' }}
                        >
                          <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: item.color }} />
                          {h}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </button>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-28 overflow-hidden" style={{ background: 'var(--bg-2)' }}>
      <div className="absolute left-1/2 top-1/3 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-8"
        style={{ background: 'var(--accent)' }} />

      <div className="max-w-3xl mx-auto px-6 md:px-12">
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
            04 / Timeline
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight" style={{ fontFamily: 'Syne', color: 'var(--text)' }}>
            Where I've<br />
            <span className="grad-text">been & built.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div>
          {experience.map((item, i) => (
            <TimelineItem
              key={`${item.company}-${i}`}
              item={item}
              index={i}
              isLast={i === experience.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
