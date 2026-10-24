import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { About3DCanvas } from './About3DCanvas';
import { Sparkles, ArrowRight } from 'lucide-react';

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
      className="relative min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-between py-8 sm:py-10 md:py-12 px-6 overflow-hidden bg-brand-bg transition-colors duration-300"
    >
      {/* 1. Subtle High-Tech Architectural Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
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
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent rounded-full blur-[160px] pointer-events-none"
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
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4 sm:mb-5">
            <span className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200/70 bg-white/80 backdrop-blur-md text-indigo-600 text-xs font-bold uppercase tracking-widest shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-spin" style={{ animationDuration: '6s' }} />
              Who We Are
            </span>
          </motion.div>

          {/* Balanced, Ultra-Beautiful Headline */}
          <motion.h2
            variants={itemVariants}
            className="font-heading font-black tracking-[-0.03em] leading-[1.08] text-slate-900 max-w-4xl mx-auto mb-4 sm:mb-5 text-3xl sm:text-5xl md:text-6xl lg:text-[62px]"
          >
            <span className="block">
              A Consultancy <span className="whitespace-nowrap">Built for</span>
            </span>
            <span className="block mt-1 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 filter drop-shadow-sm">
              Ambitious Brands
            </span>
          </motion.h2>

          {/* Concise, Elegant Manifesto Paragraph */}
          <motion.p
            variants={itemVariants}
            className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-5xl mx-auto font-normal mb-6 sm:mb-7"
          >
            Lumiora is a digital innovation partner for ambitious startups and scale-ups. We bring together{' '}
            <span className="text-stone-900 font-semibold underline decoration-indigo-400/60 decoration-2 underline-offset-4">
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
              className="group relative inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-slate-900 text-white font-semibold text-sm shadow-[0_10px_25px_rgba(94,91,255,0.22)] hover:shadow-[0_15px_35px_rgba(94,91,255,0.38)] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              <span className="relative z-10 flex items-center gap-2">
                Meet the Team
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </MotionLink>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom Single-View Metrics Strip (Integrated cleanly at the base) ── */}
      <div className="w-full max-w-4xl mx-auto pt-5 pb-2 border-t border-indigo-500/10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center z-10 relative">
        <div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-indigo-600 tracking-tight">20+</div>
          <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider font-mono mt-0.5">Projects Delivered</div>
        </div>
        <div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-purple-600 tracking-tight">98%</div>
          <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider font-mono mt-0.5">Client Satisfaction</div>
        </div>
        <div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-cyan-600 tracking-tight">2+</div>
          <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider font-mono mt-0.5">Years of Excellence</div>
        </div>
        <div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-pink-600 tracking-tight">6+</div>
          <div className="text-[11px] text-stone-500 font-medium uppercase tracking-wider font-mono mt-0.5">Expert Creatives</div>
        </div>
      </div>
    </section>
  );
};
