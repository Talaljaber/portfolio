import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Download, MapPin, Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import { staggerWrap, riseIn, fadeIn, hoverLift, press } from '../lib/motion'
import { siteConfig } from '../content/site'
import { cn } from '../lib/utils'
import cvFile from '../assets/talal.pdf'
const Hero = () => {
  const { name, handle, title, location, shortBio, socials } = siteConfig

  return (
    <section id="main-content" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="container-custom relative z-10">
        <motion.div
          variants={staggerWrap}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Greeting */}
          <motion.div variants={riseIn} className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              <span className="text-sm text-[var(--muted)]">Available for freelance</span>
            </div>
            {handle && (
              <span className="ml-4 text-sm font-semibold tracking-wide text-[var(--primary)]">
                {handle}
              </span>
            )}
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={riseIn}
            className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6"
          >
            Hello, I'm{' '}
            <span className="text-[var(--primary)]">{name}</span>
            <br />
            <span className="text-[var(--text)]">{title}</span>
          </motion.h1>

          {/* Location */}
          <motion.div 
            variants={riseIn}
            className="flex items-center gap-2 mb-6 text-[var(--muted)]"
          >
            <MapPin size={18} />
            <span>{location}</span>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={riseIn}
            className="text-lg lg:text-xl text-[var(--muted)] max-w-2xl mb-8 leading-relaxed"
          >
            {shortBio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={riseIn}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            <motion.div {...hoverLift} {...press}>
              <Link
                to="/projects"
                className="btn-primary group"
              >
                View My Work
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div {...hoverLift} {...press}>
              <a
                href={cvFile}
                className="btn-secondary group"
                download
              >
                Download CV
                <Download size={18} className="group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            variants={riseIn}
            className="flex items-center gap-4"
          >
            <span className="text-sm text-[var(--muted)]">Connect with me:</span>
            <div className="flex items-center gap-3">
              <motion.a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--primary)] hover:bg-white/5 transition-all duration-200 focus-ring"
                {...hoverLift}
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </motion.a>
              
              <motion.a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--primary)] hover:bg-white/5 transition-all duration-200 focus-ring"
                {...hoverLift}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </motion.a>
              
              <motion.a
                href={socials.email}
                className="p-2 rounded-lg text-[var(--muted)] hover:text-[var(--primary)] hover:bg-white/5 transition-all duration-200 focus-ring"
                {...hoverLift}
                aria-label="Email Contact"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[var(--primary)] rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Hero