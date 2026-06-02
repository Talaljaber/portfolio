import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Download, MapPin, Mail, Github, Linkedin } from 'lucide-react'
import { riseIn, staggerWrap } from '../lib/motion'
import { siteConfig } from '../content/site'
import cvFile from '../assets/talal.pdf'

const skills = [
  { label: 'Frontend', items: ['React.js', 'Next.js', 'Tailwind CSS', 'Vue.js', 'TypeScript'] },
  { label: 'Backend', items: ['Node.js', 'NestJS', 'FastAPI', 'Express.js'] },
  { label: 'Database', items: ['PostgreSQL', 'MySQL', 'Supabase'] },
  { label: 'AI / ML', items: ['Python', 'SVM', 'MediaPipe', 'Signal Processing', 'LLMs'] },
  { label: 'DevOps', items: ['Docker', 'GitHub Actions', 'AWS', 'Netlify', 'Linux'] },
  { label: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++'] },
]

const experience = [
  { role: 'Front-End Lead', org: 'H20 Digital Solutions', period: 'Nov 2025 – Present' },
  { role: 'Founder & CTO', org: 'DineLink (Startup)', period: 'Feb 2025 – Present' },
  { role: 'Ambassador – Jordan', org: 'Falling Walls Foundation', period: 'Apr 2026 – Present' },
  { role: 'Technical Director', org: 'GDG Amman', period: 'Aug 2025 – Present' },
  { role: 'Freelance Full-Stack Developer', org: 'Self-employed', period: 'Feb 2025 – Present' },
]

const highlights = [
  { value: 'Top 100', label: 'Global Innovator', sub: 'Falling Walls, Berlin · 2,700+ applicants' },
  { value: '1st', label: 'Falling Walls Jordan', sub: 'Among 50+ national innovators' },
  { value: '9+', label: 'Freelance Projects', sub: 'Delivered within 4-week deadlines' },
]

const Home = () => {
  return (
    <main id="main-content" className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div variants={staggerWrap} initial="hidden" animate="show" className="space-y-16 lg:space-y-24">

          {/* ── Top Section: Hero ── */}
          <div className="pt-10 lg:pt-16 max-w-4xl">
            <motion.div variants={riseIn}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm text-[var(--muted)]">Available for work</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[var(--text)] mb-3 leading-tight">
                Talal Jaber
              </h1>
              <p className="text-xl lg:text-3xl text-[var(--primary)] font-medium mb-4">
                Software Engineer & Full-Stack Developer
              </p>
              <div className="flex items-center gap-2 text-[var(--muted)] text-base mb-6 mt-2">
                <MapPin size={18} />
                <span>Amman, Jordan · German Jordanian University</span>
              </div>
              <p className="text-[var(--muted)] leading-relaxed text-lg lg:text-xl max-w-3xl">
                {siteConfig.fullBio}
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <a href={cvFile} download className="btn-primary">
                  <Download size={18} /> Download CV
                </a>
                <Link to="/contact" className="btn-secondary">
                  <Mail size={18} /> Contact Me
                </Link>
                <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <Github size={18} /> GitHub
                </a>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </motion.div>
          </div>

          {/* ── Middle Section: Highlights ── */}
          <motion.div variants={riseIn}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((h) => (
                <div key={h.label} className="card p-6 md:p-8 hover:-translate-y-1 transition-transform">
                  <div className="text-3xl font-bold text-[var(--primary)] mb-2">{h.value}</div>
                  <div className="font-semibold text-[var(--text)] text-base mb-1">{h.label}</div>
                  <div className="text-sm text-[var(--muted)]">{h.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── Bottom Section: Two Columns ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Left: Experience & Education */}
            <div className="space-y-12">
              <motion.div variants={riseIn}>
                <h2 className="text-lg font-bold text-[var(--text)] mb-6 uppercase tracking-wide opacity-80">Experience</h2>
                <div className="space-y-0">
                  {experience.map((e) => (
                    <div key={e.role} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] px-2 -mx-2 rounded transition-colors">
                      <div>
                        <span className="font-medium text-[var(--text)] text-base">{e.role}</span>
                        <span className="text-[var(--muted)] text-base"> · {e.org}</span>
                      </div>
                      <span className="text-sm text-[var(--muted)] shrink-0">{e.period}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={riseIn} className="card p-6 lg:p-8">
                <h2 className="text-base font-bold text-[var(--text)] mb-3 uppercase tracking-wide opacity-80">Education</h2>
                <div className="font-semibold text-[var(--text)] text-lg">B.Sc. Computer Engineering</div>
                <div className="text-base text-[var(--muted)] mt-1">German Jordanian University (GJU)</div>
                <div className="text-sm text-[var(--muted)] mt-1">2023 – Present</div>
              </motion.div>
            </div>

            {/* Right: Skills & Explore */}
            <motion.div variants={riseIn} className="space-y-8 lg:space-y-12">
              <div className="card p-6 lg:p-8">
                <h2 className="text-lg font-bold text-[var(--text)] mb-6 uppercase tracking-wide opacity-80">Skills</h2>
                <div className="space-y-5">
                  {skills.map((group) => (
                    <div key={group.label} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                      <span className="text-sm font-semibold text-[var(--primary)] sm:w-24 shrink-0 pt-0.5">{group.label}</span>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <span key={item} className="px-2.5 py-1 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-md text-[var(--text)] hover:border-[var(--primary)]/50 transition-colors">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Explore cards */}
              <div>
                <h2 className="text-lg font-bold text-[var(--text)] mb-4 uppercase tracking-wide opacity-80">Explore</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                  <Link to="/projects" className="card p-5 hover:border-[var(--primary)]/40 transition-all group flex items-center justify-between hover:bg-white/[0.02]">
                    <div>
                      <div className="font-semibold text-base text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">Projects</div>
                      <div className="text-sm text-[var(--muted)] mt-1">9+ full-stack, ML & IoT projects</div>
                    </div>
                    <span className="text-[var(--primary)] text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                  <Link to="/services" className="card p-5 hover:border-[var(--primary)]/40 transition-all group flex items-center justify-between hover:bg-white/[0.02]">
                    <div>
                      <div className="font-semibold text-base text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">Services</div>
                      <div className="text-sm text-[var(--muted)] mt-1">Web dev, e-commerce & more</div>
                    </div>
                    <span className="text-[var(--primary)] text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                  <Link to="/contact" className="card p-5 hover:border-[var(--primary)]/40 transition-all group flex items-center justify-between hover:bg-white/[0.02] sm:col-span-2 lg:col-span-1">
                    <div>
                      <div className="font-semibold text-base text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">Contact</div>
                      <div className="text-sm text-[var(--muted)] mt-1">WhatsApp, email, or phone</div>
                    </div>
                    <span className="text-[var(--primary)] text-xl opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default Home
