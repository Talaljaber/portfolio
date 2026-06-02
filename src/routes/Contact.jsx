import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Phone, MessageCircle, Github, Linkedin, MapPin } from 'lucide-react'
import { riseIn, staggerWrap } from '../lib/motion'
import { siteConfig } from '../content/site'

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    value: '+962 7 9048 9125',
    href: 'https://wa.me/962790489125',
    note: 'Fastest response · usually within a few hours',
    primary: true,
  },
  {
    icon: Mail,
    title: 'Email',
    value: 'talalhjaber@gmail.com',
    href: 'mailto:talalhjaber@gmail.com',
    note: 'For detailed project briefs and file attachments',
    primary: false,
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+962 7 9048 9125',
    href: 'tel:+962790489125',
    note: 'Available for calls during Jordan business hours',
    primary: false,
  },
]

const Contact = () => {
  return (
    <main id="main-content" className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          animate="show"
          className="space-y-10"
        >
          {/* Header */}
          <motion.div variants={riseIn}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-[var(--muted)]">Available for work</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-3">Get in Touch</h1>
            <p className="text-[var(--muted)] leading-relaxed">
              Ready to start a project? Pick any method below. I respond within 24 hours.
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--muted)] mt-2">
              <MapPin size={14} />
              <span>{siteConfig.location}</span>
            </div>
          </motion.div>

          {/* Contact methods */}
          <motion.div variants={riseIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.href.startsWith('mailto') || method.href.startsWith('tel') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className={`card p-6 md:p-8 flex flex-col items-center text-center gap-4 hover:-translate-y-1 transition-all group ${
                  method.primary ? 'border-[var(--primary)]/30 bg-[var(--primary)]/5 shadow-[0_0_30px_rgba(99,102,241,0.1)]' : 'hover:bg-white/[0.02]'
                }`}
              >
                <div className={`p-4 rounded-xl shrink-0 ${
                  method.primary ? 'bg-[var(--primary)]/20 shadow-inner' : 'bg-white/5'
                }`}>
                  <method.icon size={28} className={method.primary ? 'text-[var(--primary)]' : 'text-[var(--muted)]'} />
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex flex-col items-center gap-2 mb-2">
                    <span className="font-bold text-[var(--text)] text-lg">{method.title}</span>
                    {method.primary && (
                      <span className="text-xs bg-[var(--primary)] text-black px-3 py-1 rounded-full font-bold tracking-wide uppercase">
                        Recommended
                      </span>
                    )}
                  </div>
                  <div className="text-base font-medium text-[var(--primary)] mt-1 group-hover:underline">{method.value}</div>
                  <div className="text-sm text-[var(--muted)] mt-3 leading-relaxed max-w-[200px]">{method.note}</div>
                </div>
              </a>
            ))}
          </motion.div>

          {/* Social links */}
          <motion.div variants={riseIn} className="card p-5">
            <h2 className="font-semibold text-[var(--text)] mb-4 text-sm">Also find me on</h2>
            <div className="flex gap-4">
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                <Github size={16} /> GitHub
              </a>
              <a
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--primary)] transition-colors"
              >
                <Linkedin size={16} /> LinkedIn
              </a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </main>
  )
}

export default Contact

