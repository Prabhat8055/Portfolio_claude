import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { personalInfo } from '../../data/portfolio';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative py-12 overflow-hidden" style={{ background: 'var(--bg-2)', borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg animated-border flex items-center justify-center"
              style={{ background: 'var(--bg)' }}>
              <span className="grad-text text-xs font-black">AM</span>
            </div>
            <div>
              <div className="text-sm font-bold" style={{ color: 'var(--text)', fontFamily: 'Syne' }}>
                {personalInfo.name}
              </div>
              <div className="text-xs" style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>
                Full Stack Developer
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="flex items-center gap-1.5 text-xs" style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>
            <span>Crafted with</span>
            <Heart size={11} style={{ color: 'var(--accent-2)' }} fill="currentColor" />
            <span>& React</span>
            <span className="mx-2">·</span>
            <span>© {new Date().getFullYear()}</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            {[
              { href: personalInfo.socials.github, icon: FaGithub },
              { href: personalInfo.socials.linkedin, icon: FaLinkedin },
              { href: personalInfo.socials.twitter, icon: FaTwitter },
            ].map(({ href, icon: Icon }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 neon-hover"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text-3)' }}
              >
                <Icon size={13} />
              </a>
            ))}

            <motion.button
              onClick={scrollTop}
              data-cursor-hover
              whileHover={{ y: -2 }}
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              <ArrowUp size={13} />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
}
