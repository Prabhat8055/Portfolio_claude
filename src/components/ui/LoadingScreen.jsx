import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // loading | done

  useEffect(() => {
    const steps = [0, 15, 30, 48, 62, 75, 88, 95, 100];
    let i = 0;
    const next = () => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
        const delay = i < steps.length - 1 ? 120 + Math.random() * 150 : 300;
        setTimeout(next, delay);
      } else {
        setTimeout(() => { setPhase('done'); setTimeout(onComplete, 700); }, 400);
      }
    };
    setTimeout(next, 200);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'var(--bg)' }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, var(--accent), transparent)' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Logo/monogram */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              className="relative w-20 h-20"
            >
              <div className="absolute inset-0 rounded-2xl animated-border" />
              <div className="absolute inset-1 rounded-xl flex items-center justify-center"
                style={{ background: 'var(--bg-2)' }}>
                <span className="grad-text text-2xl font-black" style={{ fontFamily: 'Syne' }}>PB</span>
              </div>
            </motion.div>

            {/* Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-center"
            >
              <div className="text-xs font-mono tracking-[0.4em] uppercase mb-1"
                style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>
                Initializing
              </div>
              <div className="text-xl font-bold" style={{ color: 'var(--text)' }}>
                Prabhat Bhasme
              </div>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '240px' }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="w-full h-px relative overflow-hidden"
                style={{ background: 'var(--border)' }}>
                <motion.div
                  className="absolute inset-y-0 left-0 h-full"
                  style={{ background: 'linear-gradient(90deg, var(--accent), var(--cyan))' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between w-full">
                <span className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>
                  {['Booting systems', 'Loading assets', 'Calibrating UI', 'Almost ready'][Math.floor(progress / 26)]}...
                </span>
                <span className="text-xs" style={{ color: 'var(--accent)', fontFamily: 'DM Mono' }}>
                  {progress}%
                </span>
              </div>
            </motion.div>

            {/* Decorative dots */}
            <div className="flex gap-2 mt-2">
              {[0, 1, 2, 3].map(i => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: 'var(--accent)' }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
