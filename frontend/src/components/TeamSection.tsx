import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTeam } from '../utils/db';
import type { TeamMember } from '../utils/db';
import { TeamCard3D } from './TeamCard3D';

interface TeamSectionProps {
  onOpenPlanner?: () => void;
}

const DESIRED_ORDER = ['aswin', 'rashin', 'sreerag', 'ashin'];

export const TeamSection: React.FC<TeamSectionProps> = ({ onOpenPlanner }) => {
  const [members, setMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const loadTeam = () => {
      try {
        const data = getTeam();
        if (data && data.length > 0) {
          // Sort strictly in the requested order: aswin, rashin, sreerag, ashin
          const sorted = [...data].sort((a, b) => {
            const indexA = DESIRED_ORDER.indexOf(a.id.toLowerCase());
            const indexB = DESIRED_ORDER.indexOf(b.id.toLowerCase());
            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;
            return 0;
          });
          setMembers(sorted);
        }
      } catch (err) {
        console.error('Failed to load team data', err);
      }
    };

    loadTeam();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pf_team') {
        loadTeam();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section
      id="team"
      className="relative py-28 bg-brand-bg border-t border-border-color z-10 px-6 transition-colors duration-300 overflow-hidden"
    >
      {/* Background ambient glow spheres */}
      <div
        className="absolute top-1/4 left-1/3 w-[550px] h-[450px] rounded-full blur-[180px] pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(94,91,255,0.18) 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-10 right-1/4 w-[500px] h-[400px] rounded-full blur-[160px] pointer-events-none opacity-35"
        style={{ background: 'radial-gradient(circle, rgba(138,109,255,0.18) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Our Team
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-text-main tracking-tight leading-[1.1]">
              The Innovators Behind <br />
              <span className="text-gradient">LUMIORA</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-text-muted text-base md:text-lg max-w-md leading-relaxed"
          >
            A dedicated collective of architects, AI specialists, and product creators turning ambitious visions into industry-defining digital experiences.
          </motion.p>
        </div>

        {/* 3D Team Cards Grid in Specified Order: Aswin, Rashin, Sreerag, Ashin */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {members.map((member, index) => (
            <TeamCard3D
              key={member.id}
              member={member}
              index={index}
            />
          ))}
        </div>

        {/* Bottom CTA bar */}
        {onOpenPlanner && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-wrap items-center justify-center gap-4 p-2 pl-6 rounded-full bg-slate-900/40 backdrop-blur-md border border-indigo-500/20 shadow-xl">
              <span className="text-sm text-text-muted">
                Looking to build something extraordinary with our team?
              </span>
              <button
                onClick={onOpenPlanner}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-md cursor-pointer"
              >
                Start a Project →
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
