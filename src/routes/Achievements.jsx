import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Trophy, Flag, Mic, Star, Lightbulb, GraduationCap, Shield } from 'lucide-react'
import { riseIn, staggerWrap } from '../lib/motion'
import { achievements } from '../content/achievements'

const iconMap = {
  Trophy,
  Flag,
  Mic,
  Star,
  Lightbulb,
  GraduationCap,
  Shield,
}

const typeColors = {
  award: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  recognition: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  competition: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  program: 'text-green-400 bg-green-400/10 border-green-400/20',
  training: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
}

const Achievements = () => {
  const featured = achievements.filter((a) => a.featured)
  const rest = achievements.filter((a) => !a.featured)

  return (
    <main id="main-content" className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div variants={staggerWrap} initial="hidden" animate="show">

          {/* Header */}
          <motion.div variants={riseIn} className="pt-10 lg:pt-16 mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-3">Achievements</h1>
            <p className="text-[var(--muted)]">Awards, recognitions, and programs I've been part of.</p>
          </motion.div>

          {/* Featured */}
          <motion.div variants={riseIn} className="mb-14">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-6">Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featured.map((a) => {
                const Icon = iconMap[a.icon] || Trophy
                return (
                  <div key={a.id} className="card p-6 border-[var(--primary)]/20 hover:-translate-y-1 transition-transform flex flex-col h-full hover:bg-white/[0.02]">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="shrink-0 w-12 h-12 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                        <Icon size={24} className="text-[var(--primary)]" />
                      </div>
                      <div className="flex-1 min-w-0 pt-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                          <h3 className="font-bold text-[var(--text)] text-base lg:text-lg leading-snug">{a.title}</h3>
                        </div>
                        <div className="text-sm text-[var(--primary)] font-medium mb-1">{a.organization}</div>
                        <span className="text-xs text-[var(--muted)] shrink-0">{a.date}</span>
                      </div>
                    </div>
                    <p className="text-sm text-[var(--muted)] leading-relaxed flex-grow">{a.description}</p>
                    {a.link && (
                      <div className="mt-4 pt-4 border-t border-white/5">
                        <a
                          href={a.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text)] hover:text-[var(--primary)] transition-colors group"
                        >
                          Read more <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Rest */}
          <motion.div variants={riseIn}>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[var(--muted)] mb-6">More</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((a) => {
                const Icon = iconMap[a.icon] || Trophy
                const colorClass = typeColors[a.type] || typeColors.program
                return (
                  <div key={a.id} className="card p-5 flex flex-col h-full hover:-translate-y-1 transition-transform hover:bg-white/[0.02]">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${colorClass}`}>
                        <Icon size={18} />
                      </div>
                      <div className="flex-1 min-w-0 pt-0.5">
                        <h3 className="font-medium text-[var(--text)] text-sm leading-snug mb-1">{a.title}</h3>
                        <div className="text-xs text-[var(--muted)]">{a.organization}</div>
                      </div>
                    </div>
                    <p className="text-xs text-[var(--muted)] leading-relaxed flex-grow mt-1">{a.description}</p>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                      <span className="text-xs font-medium text-[var(--muted)]">{a.date}</span>
                      {a.link && (
                        <a
                          href={a.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text)] hover:text-[var(--primary)] transition-colors group"
                        >
                          Details <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  )
}

export default Achievements
