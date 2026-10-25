import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useInView, useScroll, useMotionValueEvent } from 'framer-motion';

const steps = [
  {
    step: '01',
    title: 'Discovery & Scoping',
    desc: 'We start with a deep-dive workshop to understand your goals, users, and constraints. We leave with a clear brief and a shared vision.',
    duration: '1 – 2 weeks',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    step: '02',
    title: 'Strategy & Architecture',
    desc: 'We map out the technical blueprint and UX strategy — defining every feature, flow, and integration before a line of code is written.',
    duration: '1 – 2 weeks',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
      </svg>
    ),
  },
  {
    step: '03',
    title: 'Design & Prototype',
    desc: 'Our designers produce high-fidelity Figma prototypes that you can click through before we build anything. Iterate fast, decide confidently.',
    duration: '2 – 4 weeks',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    ),
  },
  {
    step: '04',
    title: 'Build & Iterate',
    desc: "Our engineers ship in two-week sprints with continuous demos, so you always know exactly what's happening and can steer the direction.",
    duration: '4 – 16 weeks',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    step: '05',
    title: 'Launch & Scale',
    desc: 'We handle deployment, monitoring, and post-launch optimisation. Your success is our success — we stay on to grow with you.',
    duration: 'Ongoing',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
  },
];

interface StepItem {
  step: string;
  title: string;
  desc: string;
  duration: string;
  icon: React.ReactNode;
}

interface ProcessStepItemProps {
  step: StepItem;
  index: number;
  isActive: boolean;
  dotRef: (el: HTMLDivElement | null) => void;
}

const ProcessStepItem = ({ step, index, isActive, dotRef }: ProcessStepItemProps) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`relative flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content Column */}
      <div className={`w-full md:w-[calc(50%-48px)] ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12'} pl-16 md:pl-0`}>
        <div className="relative py-3 transition-all duration-500">
          
          {/* Ambient Luminescent Glow behind active card */}
          <div
            className={`absolute -inset-4 sm:-inset-6 rounded-3xl transition-opacity duration-700 pointer-events-none ${
              isActive
                ? 'opacity-100 bg-gradient-to-r from-[#5E5BFF]/15 via-[#8B5CF6]/12 to-[#F472B6]/12 blur-2xl'
                : 'opacity-0'
            }`}
          />

          {/* Interactive Card Border / Backdrop */}
          <div
            className={`relative p-5 sm:p-6 rounded-2xl border transition-all duration-500 backdrop-blur-sm ${
              isActive
                ? 'bg-gradient-to-b from-[#0e0a29]/80 to-[#070512]/90 border-[#A5A2FF]/40 shadow-[0_0_30px_rgba(94,91,255,0.22)] translate-y-[-2px] opacity-100'
                : 'bg-white/[0.02] border-white/5 opacity-50 hover:opacity-75'
            }`}
          >
            {/* Step Header: Icon + Number */}
            <div className={`flex items-center gap-3 mb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-500 flex-shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-tr from-[#5E5BFF] to-[#A5A2FF] text-white shadow-[0_0_20px_rgba(94,91,255,0.7)] scale-110'
                    : 'bg-white/5 border border-white/10 text-slate-400'
                }`}
              >
                {step.icon}
              </div>

              <span
                className={`text-xs font-mono font-bold tracking-widest uppercase transition-colors duration-500 ${
                  isActive
                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] to-[#F472B6] font-black drop-shadow-[0_0_8px_rgba(165,162,255,0.8)]'
                    : 'text-slate-500'
                }`}
              >
                PHASE {step.step}
              </span>
            </div>

            {/* Step Title */}
            <h3
              className={`font-heading font-black text-xl sm:text-2xl mb-2.5 transition-all duration-500 tracking-tight ${
                isActive
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C4B5FD] to-[#F472B6] drop-shadow-[0_0_25px_rgba(165,162,255,0.5)]'
                  : 'text-white/80'
              }`}
            >
              {step.title}
            </h3>

            {/* Step Description */}
            <p
              className={`text-sm sm:text-base leading-relaxed mb-4 max-w-md inline-block transition-colors duration-500 ${
                isActive ? 'text-slate-200 font-normal' : 'text-slate-400 font-light'
              }`}
            >
              {step.desc}
            </p>

            {/* Duration Tag */}
            <div className={`flex items-center ${isEven ? 'md:justify-end' : 'justify-start'}`}>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all duration-500 ${
                  isActive
                    ? 'bg-[#5E5BFF]/20 border border-[#A5A2FF]/50 text-[#C4B5FD] shadow-[0_0_12px_rgba(94,91,255,0.35)]'
                    : 'bg-white/5 border border-white/10 text-slate-400'
                }`}
              >
                <svg
                  className={`w-3.5 h-3.5 transition-colors duration-500 ${
                    isActive ? 'text-[#A5A2FF]' : 'text-slate-400'
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {step.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Centre Dot on Timeline Track */}
      <div
        ref={dotRef}
        className={`absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full border-2 transition-all duration-500 flex-shrink-0 z-20 ${
          isActive
            ? 'scale-135 bg-[#5E5BFF] border-white shadow-[0_0_22px_6px_rgba(94,91,255,0.85)] ring-4 ring-[#A5A2FF]/30'
            : 'scale-100 bg-[#1e1940] border-white/20 ring-2 ring-transparent'
        }`}
      />
    </div>
  );
};

export const Process = () => {
  const ref = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeSteps, setActiveSteps] = useState<boolean[]>([false, false, false, false, false]);

  // Scroll timeline progress drawing
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const updateActiveSteps = useCallback(() => {
    if (!timelineRef.current) return;
    const timelineRect = timelineRef.current.getBoundingClientRect();
    const progress = scrollYProgress.get();
    const currentLineTipY = timelineRect.top + progress * timelineRect.height;

    const newActive = dotRefs.current.map((dotEl) => {
      if (!dotEl) return false;
      const dotRect = dotEl.getBoundingClientRect();
      // Only activate when the glowing line tip physically reaches the top of the dot
      return currentLineTipY >= dotRect.top;
    });

    setActiveSteps((prev) => {
      if (prev.length !== newActive.length) return newActive;
      const hasChanged = prev.some((val, idx) => val !== newActive[idx]);
      return hasChanged ? newActive : prev;
    });
  }, [scrollYProgress]);

  useMotionValueEvent(scrollYProgress, "change", () => {
    updateActiveSteps();
  });

  useEffect(() => {
    updateActiveSteps();
    const handleScrollOrResize = () => updateActiveSteps();
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);
    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [updateActiveSteps]);

  return (
    <section id="process" ref={ref} className="relative py-28 overflow-hidden bg-[#070512] text-white transition-colors duration-300">
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-indigo-200 font-mono shadow-xs mb-6">
            How We Work
          </span>
          <h2 className="text-4xl md:text-5xl font-black font-heading leading-[1.1] tracking-tight text-white">
            A Process That{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] via-[#C4B5FD] to-[#F472B6]">
              Delivers Results
            </span>
          </h2>
          <p className="mt-5 text-slate-300 text-lg max-w-xl mx-auto leading-relaxed">
            Our proven five-stage framework turns ambiguous ideas into polished, scalable products.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical track line */}
          <div className="absolute left-[27px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/10" />
          
          {/* Glowing active drawing line */}
          <motion.div 
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className="absolute left-[27px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-[#5E5BFF] via-[#A5A2FF] to-[#F472B6] shadow-[0_0_8px_rgba(165,162,255,0.8)]" 
          />

          <div className="flex flex-col gap-12 sm:gap-16">
            {steps.map((step, i) => (
              <ProcessStepItem
                key={i}
                step={step}
                index={i}
                isActive={activeSteps[i] ?? false}
                dotRef={(el) => {
                  dotRefs.current[i] = el;
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
