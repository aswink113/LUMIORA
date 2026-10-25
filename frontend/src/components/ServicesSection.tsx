import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useReducedMotion } from 'framer-motion';
import {
  Globe,
  Smartphone,
  Monitor,
  Palette,
  Sparkles,
  Target,
  Search,
  Compass,
  TrendingUp,
  Camera,
  Video,
  Scissors,
  Heart,
  Film,
  ArrowRight,
} from 'lucide-react';

interface ServicesSectionProps {
  onOpenPlanner?: (category?: string) => void;
}

interface ServiceCard {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ServiceGroup {
  id: string;
  title: string;
  description: string;
  cards: ServiceCard[];
}

const serviceGroups: ServiceGroup[] = [
  {
    id: 'digital-experiences',
    title: 'Digital Experiences',
    description:
      'We design and build digital products that work beautifully—from responsive websites and mobile apps to desktop software and immersive 3D web experiences.',
    cards: [
      {
        name: 'Website Development',
        desc: 'Fast, responsive websites designed to turn visitors into customers.',
        icon: Globe,
      },
      {
        name: 'Mobile App Development',
        desc: 'Intuitive iOS and Android apps built for everyday use and long-term growth.',
        icon: Smartphone,
      },
      {
        name: 'Desktop Applications',
        desc: 'Purpose-built desktop software that helps your team work smarter.',
        icon: Monitor,
      },
      {
        name: 'UI/UX Design',
        desc: 'Clear, thoughtful interfaces that make every interaction feel effortless.',
        icon: Palette,
      },
      {
        name: '3D Web Experiences',
        desc: 'Interactive, immersive websites that bring your ideas to life.',
        icon: Sparkles,
      },
    ],
  },
  {
    id: 'brand-growth',
    title: 'Brand & Business Growth',
    description:
      'We help shape your identity, strengthen your online presence, and connect your business with the right audience through strategy, marketing, and search.',
    cards: [
      {
        name: 'Digital Marketing',
        desc: 'Campaigns that help you reach the right people and build lasting customer relationships.',
        icon: Target,
      },
      {
        name: 'SEO',
        desc: 'Search-focused improvements that help customers discover your business online.',
        icon: Search,
      },
      {
        name: 'Branding',
        desc: 'A distinctive brand identity built around your story, values, and goals.',
        icon: Compass,
      },
      {
        name: 'Logo Design',
        desc: 'Memorable logos that give your brand a confident, recognizable face.',
        icon: Sparkles,
      },
      {
        name: 'Digital Growth Strategy',
        desc: 'Practical strategies to grow your audience, improve engagement, and support business growth.',
        icon: TrendingUp,
      },
    ],
  },
  {
    id: 'photography-film',
    title: 'Photography & Film',
    description:
      'From a single photograph to a polished event film, we create visuals that preserve meaningful moments and bring your story to life.',
    cards: [
      {
        name: 'Photography',
        desc: 'Professional photos for people, products, events, and brands.',
        icon: Camera,
      },
      {
        name: 'Videography',
        desc: 'Engaging video that captures the energy and details of your story.',
        icon: Video,
      },
      {
        name: 'Photo & Video Editing',
        desc: 'Careful editing and finishing that brings every image and frame together.',
        icon: Scissors,
      },
      {
        name: 'Save-the-Date Videos',
        desc: 'Personal, cinematic announcements made for sharing.',
        icon: Heart,
      },
      {
        name: 'Event Video Editing',
        desc: 'Thoughtfully edited highlights and films that let you relive the occasion.',
        icon: Film,
      },
    ],
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenPlanner }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);

  // Track overall scroll progress inside this sticky pinned track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Keep activeGroupIndex in sync with scroll position
  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      if (latest < 0.33) {
        setActiveGroupIndex(0);
      } else if (latest < 0.67) {
        setActiveGroupIndex(1);
      } else {
        setActiveGroupIndex(2);
      }
    });
  }, [scrollYProgress]);

  // Click tab to smoothly scroll to that specific group's range
  const scrollToGroup = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight;
    // Target anchor points for each group
    const targetPercentages = [0.08, 0.46, 0.82];
    const targetScroll = containerTop + containerHeight * targetPercentages[index];
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    setActiveGroupIndex(index);
  };

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      const nextIndex = (index + 1) % serviceGroups.length;
      scrollToGroup(nextIndex);
      document.getElementById(`tab-${serviceGroups[nextIndex].id}`)?.focus();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      const prevIndex = (index - 1 + serviceGroups.length) % serviceGroups.length;
      scrollToGroup(prevIndex);
      document.getElementById(`tab-${serviceGroups[prevIndex].id}`)?.focus();
    }
  };

  const activeGroup = serviceGroups[activeGroupIndex];

  // Motion variants for sequential zoom and stagger
  const groupVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.90,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.55,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: shouldReduceMotion ? 0 : 0.07,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.04,
      y: shouldReduceMotion ? 0 : -20,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.45,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative w-full h-[320vh] bg-[#070512] text-white selection:bg-[#5E5BFF]/30"
    >
      {/* ── Soft Seam Transitions ── */}
      <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-30 select-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0718] via-[#0a0718]/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none z-30 select-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0718] via-[#0a0718]/60 to-transparent" />
      </div>

      {/* ── Cyber Grid & Atmospheric Nebulae ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 25%, rgba(94, 91, 255, 0.15) 0%, transparent 70%),
            linear-gradient(to right, rgba(94, 91, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94, 91, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 72px 72px, 72px 72px',
        }}
      />
      <div className="absolute top-1/4 left-1/4 w-[650px] h-[550px] bg-indigo-600/10 rounded-full blur-[190px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[500px] bg-pink-600/10 rounded-full blur-[180px] pointer-events-none z-0" />

      {/* ── Sticky Pinned Screen (Stays in viewport while scrolling through 320vh) ── */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-6 sm:pb-8 z-20">
        
        {/* ── Header: "WHAT WE DO" + "Ideas into experiences." + Compact Category Tabs ── */}
        <div className="w-full max-w-5xl mx-auto flex flex-col items-center text-center z-30 flex-shrink-0">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-white/15 bg-white/5 backdrop-blur-md mb-2 select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#A5A2FF]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-200 font-mono">
              WHAT WE DO
            </span>
          </div>

          {/* Heading - Positioned clearly below navbar */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-heading tracking-tight text-white mb-3">
            Ideas into{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] via-[#C4B5FD] to-[#F472B6]">
              experiences.
            </span>
          </h2>

          {/* Compact, Clearly Readable Category Tabs with Purple-to-Pink Underline */}
          <div
            role="tablist"
            aria-label="Lumiora Service Categories"
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-8 border-b border-white/10 pb-2.5 w-full max-w-3xl"
          >
            {serviceGroups.map((group, index) => {
              const isActive = activeGroupIndex === index;
              return (
                <button
                  key={group.id}
                  role="tab"
                  id={`tab-${group.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${group.id}`}
                  tabIndex={0}
                  onClick={() => scrollToGroup(index)}
                  onKeyDown={(e) => handleTabKeyDown(e, index)}
                  className={`relative px-3 sm:px-4 py-1.5 text-xs sm:text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A5A2FF] ${
                    isActive
                      ? 'text-white font-bold drop-shadow-[0_0_12px_rgba(165,162,255,0.4)]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{group.title}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryUnderline"
                      className="absolute -bottom-[11px] left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#5E5BFF] via-[#A5A2FF] to-[#F472B6] rounded-full shadow-[0_0_10px_rgba(165,162,255,0.6)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Center Stage: Zooming Service Groups with Sequential Stagger ── */}
        <div className="relative w-full max-w-5xl mx-auto flex-1 flex items-center justify-center my-auto min-h-0 py-2 sm:py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeGroup.id}
              id={`panel-${activeGroup.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeGroup.id}`}
              variants={groupVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="w-full flex flex-col items-center text-center px-2"
            >
              {/* Group Title and Short Description */}
              <motion.div variants={itemVariants} className="text-center max-w-2xl mx-auto mb-5 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-heading tracking-tight text-white mb-2">
                  {activeGroup.title}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                  {activeGroup.description}
                </p>
              </motion.div>

              {/* Service Cards Grid: 3 cols desktop, 2 cols tablet, 1 col mobile */}
              <motion.div
                variants={groupVariants}
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch text-left"
              >
                {activeGroup.cards.map((card, idx) => {
                  const IconComponent = card.icon;
                  const isPink = idx % 2 === 1;

                  return (
                    <motion.div
                      key={card.name}
                      variants={itemVariants}
                      className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl bg-[#0c0924]/85 backdrop-blur-md border border-white/10 hover:border-[#A5A2FF]/40 hover:bg-[#120e32]/95 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_35px_rgba(94,91,255,0.18)] hover:-translate-y-1"
                    >
                      <div>
                        {/* Small Purple or Pink Icon */}
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                            isPink
                              ? 'bg-pink-500/10 border border-pink-500/20 text-[#F472B6] group-hover:bg-pink-500/20'
                              : 'bg-purple-500/10 border border-purple-500/20 text-[#A5A2FF] group-hover:bg-purple-500/20'
                          }`}
                        >
                          <IconComponent className="w-4 h-4" />
                        </div>

                        {/* Bold Service Title */}
                        <h4 className="font-heading font-bold text-base sm:text-lg text-white mb-1.5 tracking-tight group-hover:text-[#A5A2FF] transition-colors">
                          {card.name}
                        </h4>

                        {/* Short Description */}
                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                          {card.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Clear “Start a Project” Button Below the Cards */}
              <motion.div variants={itemVariants} className="mt-5 sm:mt-7 flex justify-center">
                <button
                  onClick={() => onOpenPlanner?.(activeGroup.title)}
                  className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-bold text-white transition-all duration-300 shadow-[0_4px_25px_rgba(94,91,255,0.45)] hover:shadow-[0_8px_35px_rgba(94,91,255,0.7)] hover:scale-105 active:scale-95 cursor-pointer bg-gradient-to-r from-[#5E5BFF] via-[#7B68FF] to-[#A855F7] border border-white/20 group"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom Bar: Scroll Progress Tracker ── */}
        <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-30 pt-2.5 border-t border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
              Scroll to explore
            </span>
            <div className="w-24 sm:w-32 h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-[#5E5BFF] via-[#A5A2FF] to-[#F472B6]"
                style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
            <span className="text-white font-bold">{activeGroupIndex + 1}</span>
            <span>/</span>
            <span>{serviceGroups.length}</span>
          </div>
        </div>

      </div>
    </section>
  );
};
