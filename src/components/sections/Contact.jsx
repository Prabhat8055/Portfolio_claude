import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mail, MapPin, Clock, CheckCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { personalInfo } from '../../data/portfolio';

const info = [
  { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}`, color: "var(--accent)" },
  { icon: MapPin, label: "Location", value: personalInfo.location, href: null, color: "var(--accent-2)" },
  { icon: Clock, label: "Timezone", value: "PST (UTC-8)", href: null, color: "var(--cyan)" },
];

function InputField({ label, name, type = 'text', value, onChange, error, multiline }) {
  const Tag = multiline ? 'textarea' : 'input';
  return (
    <div className="relative group">
      <label className="block text-xs font-mono mb-2 tracking-wider uppercase"
        style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>
        {label}
      </label>
      <Tag
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        rows={multiline ? 5 : undefined}
        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none"
        style={{
          background: 'var(--surface-2)',
          border: `1px solid ${error ? 'var(--accent-2)' : 'var(--border)'}`,
          color: 'var(--text)',
          fontFamily: 'Syne',
        }}
        onFocus={e => {
          e.target.style.borderColor = 'var(--accent)';
          e.target.style.boxShadow = '0 0 0 3px rgba(108,99,255,0.1)';
        }}
        onBlur={e => {
          e.target.style.borderColor = error ? 'var(--accent-2)' : 'var(--border)';
          e.target.style.boxShadow = 'none';
        }}
      />
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs mt-1"
          style={{ color: 'var(--accent-2)', fontFamily: 'DM Mono' }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Message is required';
    return e;
  };

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(e2 => ({ ...e2, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('sending');
    await new Promise(r => setTimeout(r, 1800));
    setStatus('sent');
  };

  return (
    <section id="contact" className="relative py-28 overflow-hidden" style={{ background: 'var(--bg)' }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full blur-3xl opacity-10"
        style={{ background: 'var(--accent)' }} />

      <div className="relative max-w-6xl mx-auto px-6 md:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-mono mb-3 tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)', fontFamily: 'DM Mono' }}>
            05 / Contact
          </p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-4" style={{ fontFamily: 'Syne', color: 'var(--text)' }}>
            Let's build something<br />
            <span className="grad-text">remarkable together.</span>
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: 'var(--text-2)' }}>
            I'm open to new opportunities, collaborations, and interesting conversations.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 flex flex-col gap-4"
          >
            {info.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-2 p-5 rounded-2xl flex items-center gap-4"
                style={{ border: '1px solid var(--border)' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}>
                  <item.icon size={16} />
                </div>
                <div>
                  <div className="text-xs mb-0.5" style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-semibold neon-hover transition-all duration-200"
                      style={{ color: 'var(--text)' }}>
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-sm font-semibold" style={{ color: 'var(--text)' }}>{item.value}</div>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="glass-2 p-5 rounded-2xl"
              style={{ border: '1px solid var(--border)' }}
            >
              <p className="text-xs mb-4" style={{ color: 'var(--text-3)', fontFamily: 'DM Mono' }}>SOCIALS</p>
              <div className="flex gap-3">
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
                    className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 neon-hover"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)', color: 'var(--text-2)' }}
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-3"
          >
            <div className="glass-2 p-8 rounded-2xl relative overflow-hidden"
              style={{ border: '1px solid var(--border)' }}>
              {/* Decorative corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl opacity-20"
                style={{ background: 'var(--accent)', transform: 'translate(50%, -50%)' }} />

              <AnimatePresence mode="wait">
                {status === 'sent' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-16 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ background: 'rgba(67,233,123,0.15)', border: '2px solid var(--accent-3)' }}
                    >
                      <CheckCircle size={28} style={{ color: 'var(--accent-3)' }} />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)', fontFamily: 'Syne' }}>
                      Message Sent!
                    </h3>
                    <p className="text-sm" style={{ color: 'var(--text-2)' }}>
                      I'll get back to you within 24 hours. Promise.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <InputField label="Name" name="name" value={form.name} onChange={handleChange} error={errors.name} />
                      <InputField label="Email" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} />
                    </div>
                    <InputField label="Subject" name="subject" value={form.subject} onChange={handleChange} />
                    <InputField label="Message" name="message" value={form.message} onChange={handleChange} error={errors.message} multiline />

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      data-cursor-hover
                      className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 relative overflow-hidden"
                      style={{
                        background: status === 'sending' ? 'var(--surface-2)' : 'var(--accent)',
                        color: status === 'sending' ? 'var(--text-2)' : '#fff',
                        boxShadow: status !== 'sending' ? '0 0 30px var(--glow)' : 'none',
                      }}
                    >
                      {status === 'sending' ? (
                        <>
                          <motion.div
                            className="w-4 h-4 rounded-full border-2 border-t-transparent"
                            style={{ borderColor: 'var(--text-3)', borderTopColor: 'transparent' }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          />
                          Transmitting...
                        </>
                      ) : (
                        <>
                          <Send size={14} /> Send Message
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
