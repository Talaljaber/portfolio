import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import { riseIn, staggerWrap } from '../lib/motion'
import { services } from '../content/services'

const Services = () => {
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
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] mb-3">Services</h1>
            <p className="text-[var(--muted)] leading-relaxed">
              Full-stack development services — from landing pages to complete platforms.
              I typically deliver within 2–6 weeks depending on scope.
            </p>
          </motion.div>

          {/* Services list */}
          <motion.div variants={riseIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => {
              const IconComponent = Icons[service.icon] || Icons.Code2
              return (
                <div key={service.id} className="card p-6 md:p-8 hover:-translate-y-1 transition-transform flex flex-col h-full hover:bg-white/[0.02]">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-[var(--primary)]/10 rounded-xl shrink-0 border border-[var(--primary)]/20">
                      <IconComponent size={24} className="text-[var(--primary)]" />
                    </div>
                    <div className="flex-1 min-w-0 pt-1">
                      <h2 className="font-bold text-[var(--text)] text-lg mb-1">{service.title}</h2>
                      {service.startingPrice && (
                        <span className="text-xs font-semibold text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20 px-2 py-1 rounded-md inline-block">
                          {service.startingPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-[var(--muted)] leading-relaxed flex-grow">
                    {service.shortDescription}
                  </p>
                  
                  {service.technologies && (
                    <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/5">
                      {service.technologies.map((tech) => (
                        <span key={tech} className="px-2.5 py-1 text-xs bg-white/5 border border-white/10 rounded-md text-[var(--text)] hover:border-[var(--primary)]/50 transition-colors">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </motion.div>

          {/* CTA */}
          <motion.div variants={riseIn} className="card p-6 text-center">
            <h2 className="font-semibold text-[var(--text)] mb-2">Have a project in mind?</h2>
            <p className="text-sm text-[var(--muted)] mb-4">
              Let's discuss what you need. I'll reply within 24 hours.
            </p>
            <Link to="/contact" className="btn-primary">
              <Icons.Mail size={16} /> Get in Touch
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}

export default Services

