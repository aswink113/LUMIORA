import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { About3DCanvas } from './About3DCanvas';
import { ArrowRight } from 'lucide-react';

const MotionLink = motion(Link);

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] as const } },
};

export const About: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  // Parallax animation for ambient background
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const blobY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between py-8 sm:py-10 md:py-12 px-6 overflow-hidden bg-brand-bg transition-colors duration-300"
    >
      {/* ── Scenic Hero Background Image (Moved from Hero Section to Who We Are) ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/hero-bg.png"
          alt="Who We Are Background"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle glass veil so Who We Are typography stays sharp, readable, and vibrant */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/70 pointer-events-none" />
      </div>

      {/* ── Soft Blended Blur Transition at Top Seam ── */}
      <div className="absolute top-0 left-0 right-0 h-28 sm:h-40 pointer-events-none z-20 select-none overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_top,transparent,black)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0a0718]/50 to-[#0a0718]" />
      </div>

      {/* 1. Subtle High-Tech Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(94, 91, 255, 0.08) 0%, transparent 70%),
            linear-gradient(to right, rgba(94, 91, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94, 91, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 72px 72px, 72px 72px',
        }}
      />

      {/* 2. Floating Ambient Glow Spheres with Scroll Parallax */}
      <motion.div
        style={{ y: blobY }}
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[160px] pointer-events-none z-0"
      />

      {/* ── 3. Interactive 3D Innovation Core Centered Directly in Background ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <About3DCanvas className="w-full h-full opacity-35" />
      </div>

      {/* Top breathing room */}
      <div className="h-2 sm:h-4" />

      {/* ── Main Content: Beautiful Heading, Concise Manifesto, CTA (Single View) ── */}
      <div className="max-w-4xl mx-auto w-full text-center relative z-10 my-auto flex flex-col items-center justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-col items-center w-full"
        >
          {/* Pill Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center mb-4 sm:mb-5">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-indigo-200 text-xs font-bold uppercase tracking-widest shadow-[0_4px_20px_rgba(0,0,0,0.3)] font-mono">
              Who We Are
            </span>
          </motion.div>

          {/* Balanced, Ultra-Beautiful Headline */}
          <motion.h2
            variants={itemVariants}
            className="font-heading font-black tracking-[-0.03em] leading-[1.08] text-white max-w-4xl mx-auto mb-4 sm:mb-5 text-3xl sm:text-5xl md:text-6xl lg:text-[62px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)]"
          >
            <span className="block text-white">
              A Consultancy <span className="whitespace-nowrap">Built for</span>
            </span>
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] via-[#E0C6FF] to-[#FFA6D5] filter drop-shadow-[0_0_35px_rgba(192,132,252,0.6)]">
              Ambitious Brands
            </span>
          </motion.h2>

          {/* Concise, Elegant Manifesto Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-slate-100 text-sm sm:text-base md:text-lg leading-relaxed max-w-5xl mx-auto font-normal mb-6 sm:mb-7 drop-shadow-[0_2px_10px_rgba(0,0,0,0.85)]"
          >
            Lumiora is a digital innovation partner for ambitious startups and scale-ups. We bring together{' '}
            <span className="text-white font-semibold underline decoration-[#A5A2FF] decoration-2 underline-offset-4 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Strategic Insight, Thoughtful Design, Advanced Engineering, and Performance-Focused Marketing
            </span>{' '}
            to create digital experiences that help businesses grow and compete. From shaping a clear vision to building and launching web and mobile products, our team works closely with yours at every stage. Through collaborative partnerships, agile delivery, and a commitment to quality, we turn complex ideas into reliable solutions built for lasting impact.
          </motion.p>

          {/* Interactive "Meet the Team" Button */}
          <motion.div variants={itemVariants} className="mb-2">
            <MotionLink
              to="/team"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#5E5BFF] via-[#7B61FF] to-[#9D50BB] text-white font-semibold text-sm shadow-[0_10px_30px_rgba(94,91,255,0.45)] hover:shadow-[0_15px_40px_rgba(94,91,255,0.65)] transition-all duration-300 overflow-hidden cursor-pointer border border-white/20"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <span className="relative z-10 flex items-center gap-2">
                Meet the Team
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </MotionLink>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Single-View Metrics Strip (Integrated cleanly at the base) ── */}
      <div className="w-full max-w-4xl mx-auto pt-5 pb-2 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center z-10 relative">
        <div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#A5A2FF] tracking-tight drop-shadow-[0_0_18px_rgba(165,162,255,0.5)]">20+</div>
          <div className="text-[11px] text-slate-200 font-semibold uppercase tracking-wider font-mono mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Projects Delivered</div>
        </div>
        <div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#D8B4FE] tracking-tight drop-shadow-[0_0_18px_rgba(216,180,254,0.5)]">98%</div>
          <div className="text-[11px] text-slate-200 font-semibold uppercase tracking-wider font-mono mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Client Satisfaction</div>
        </div>
        <div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#67E8F9] tracking-tight drop-shadow-[0_0_18px_rgba(103,232,249,0.5)]">2+</div>
          <div className="text-[11px] text-slate-200 font-semibold uppercase tracking-wider font-mono mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Years of Excellence</div>
        </div>
        <div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-[#F472B6] tracking-tight drop-shadow-[0_0_18px_rgba(244,114,182,0.5)]">6+</div>
          <div className="text-[11px] text-slate-200 font-semibold uppercase tracking-wider font-mono mt-0.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">Expert Creatives</div>
        </div>
      </div>
    </section>
  );
};
