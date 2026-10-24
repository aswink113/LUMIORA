import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { TeamMember } from '../utils/db';

import aswinImg from '../assets/employee/aswin.png';
import rashinImg from '../assets/employee/rashin.png';
import sreeragImg from '../assets/employee/sreerag.png';
import ashinImg from '../assets/employee/ashin.png';

const fallbackImages: Record<string, string> = {
  aswin: aswinImg,
  rashin: rashinImg,
  sreerag: sreeragImg,
  ashin: ashinImg,
  'aswin.png': aswinImg,
  'rashin.png': rashinImg,
  'sreerag.png': sreeragImg,
  'ashin.png': ashinImg,
  '/employee/aswin.png': aswinImg,
  '/employee/rashin.png': rashinImg,
  '/employee/sreerag.png': sreeragImg,
  '/employee/ashin.png': ashinImg,
};

// Clean, precise role mapping
const roleMap: Record<string, string> = {
  aswin: 'Full-Stack Developer, AI & Data Science Expert',
  rashin: 'Digital Marketer',
  sreerag: 'Full-Stack Developer',
  ashin: 'On-Site Marketing',
};

// Refined, minimal bios
const bioMap: Record<string, string> = {
  aswin: 'Specializing in end-to-end full-stack architectures, machine learning models, and intelligent AI systems.',
  rashin: 'Driving data-backed digital campaigns, performance marketing, search visibility, and organic brand traction.',
  sreerag: 'Engineering scalable web platforms, responsive user experiences, and modular full-stack solutions.',
  ashin: 'Leading direct on-ground marketing initiatives, B2B business outreach, and executive client partnerships.',
};

// Core skills
const skillsMap: Record<string, string[]> = {
  aswin: ['Full Stack', 'Data Science', 'Machine Learning', 'AI Systems', 'React', 'Python', 'TypeScript'],
  rashin: ['Digital Marketing', 'SEO', 'Paid Media', 'Growth Strategy', 'Analytics'],
  sreerag: ['Full Stack', 'React', 'Node.js', 'System Architecture', 'APIs'],
  ashin: ['On-Site Marketing', 'B2B Outreach', 'Brand Activation', 'Client Relations'],
};

interface TeamCard3DProps {
  member: TeamMember;
  index: number;
  onDelete?: (id: string) => void;
  showAdminActions?: boolean;
}

export const TeamCard3D: React.FC<TeamCard3DProps> = ({
  member,
  index,
  onDelete: _onDelete,
  showAdminActions: _showAdminActions = false,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const key = member.id?.toLowerCase() || member.name?.toLowerCase().split(' ')[0] || '';

  // Resolve best image URL
  const resolvedPhoto =
    fallbackImages[key] ||
    fallbackImages[member.photo_url] ||
    member.photo_url ||
    aswinImg;

  // Resolve role, bio, and skills
  const resolvedRole = roleMap[key] || member.role || 'Team Member';
  const resolvedBio = bioMap[key] || member.bio || 'Core member of the Lumiora team.';
  const resolvedSkills = skillsMap[key] || member.skills || ['Development', 'Design'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="team-card-3d-wrapper relative w-full select-none"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(prev => !prev)}
    >
      <div className={`team-card-3d-inner ${isFlipped ? 'flipped' : ''}`}>
        
        {/* =========================================================================
            FRONT FACE: 100% CLEAN PORTRAIT PICTURE ONLY
           ========================================================================= */}
        <div className="team-card-face team-card-face-front border border-stone-200/80 hover:border-indigo-400/80 transition-colors duration-300 bg-white">
          <img
            src={resolvedPhoto}
            alt={member.name}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-3xl pointer-events-none ring-1 ring-inset ring-black/5" />
        </div>

        {/* =========================================================================
            BACK FACE: MINIMAL & CLASSIC DETAILS CARD (CLEAN, NO UNWANTED JUNK)
           ========================================================================= */}
        <div className="team-card-face team-card-face-back p-8 sm:p-9 flex flex-col justify-between border border-stone-200/90 bg-white text-left rounded-3xl shadow-lg">

          {/* Middle Body: Name, Role, Bio, Skills */}
          <div className="my-auto space-y-4">
            <div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-stone-900 tracking-tight leading-tight">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-indigo-600 mt-1 tracking-wide">
                {resolvedRole}
              </p>
            </div>

            <div className="h-px w-full bg-stone-100" />

            <p className="text-stone-600 text-xs sm:text-sm font-normal leading-relaxed">
              {resolvedBio}
            </p>

            <div className="pt-2">
              <div className="flex flex-wrap gap-1.5">
                {resolvedSkills.map((skill, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-stone-100/80 text-stone-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-400 font-mono">
            <span>Lumiora</span>
            <span>&bull;</span>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
