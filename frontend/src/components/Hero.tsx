import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, PhoneCall } from 'lucide-react';
import { getExpertiseCards } from '../utils/db';
import TextMorph from './TextMorph';
import VenomButton from './VenomButton';
import GlimmerVale from './GlimmerVale';

export const Hero = ({ onOpenPlanner }: { onOpenPlanner?: () => void }) => {
  const [activeModal, setActiveModal] = useState<'project' | 'portfolio' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // Dynamic content loaded from local storage database
  const [dynamicCards, setDynamicCards] = useState<any[]>([]);

  useEffect(() => {
    setDynamicCards(getExpertiseCards());

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pf_expertise_cards') {
        setDynamicCards(getExpertiseCards());
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Clean expertise items without emojis/icons for TextMorph
  const expertiseWords = useMemo(() => {
    const cleaned = dynamicCards
      .map((c) => (typeof c === 'string' ? c : c.text))
      // Strip leading emojis and symbols (e.g. "🤖 AI Automation" -> "AI Automation") cleanly via Unicode
      .map((t) => t.replace(/^[^\p{L}\p{N}]+/u, '').trim())
      .filter((t) => t.length > 0);

    return (cleaned.length > 0
      ? cleaned
      : [
        'AI Integrated Solutions',
        '3D Web Designing',
        'Mobile App Development',
        'Brand Identity',
        'UI/UX Web Designing',
        'Photography & Videography',
        'Video Editing',
        'Logo Design',
        'Content Writing',
      ]
    ).join('\n');
  }, [dynamicCards]);

  // Mouse positions for interactive parallax and tilt
  const mouseX = useSpring(0, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 20 });


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);


  return (
    <section
      ref={containerRef}
      className="relative z-20 w-full min-h-screen lg:h-screen lg:max-h-screen flex flex-col justify-center items-center pt-24 sm:pt-28 lg:pt-28 xl:pt-32 pb-16 overflow-visible bg-transparent text-center"
    >
      {/* ── Glimmer Vale WebGL2 Scenic Background ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto z-0 overflow-hidden select-none">
        <GlimmerVale className="w-full h-full" />
      </div>

      {/* ── Soft Blended Blur Page Break Transition ── */}
      <div className="absolute bottom-0 left-0 right-0 h-28 sm:h-40 pointer-events-none z-30 select-none overflow-hidden">
        <div className="absolute inset-0 backdrop-blur-md [mask-image:linear-gradient(to_bottom,transparent,black)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0718]/50 to-[#0a0718]" />
      </div>

      {/* ── Atmospheric Shadow Scrim (Lightened to keep 3D background vivid and visible) ── */}
      <div
        className="absolute inset-0 pointer-events-none z-10 select-none"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 48%, rgba(3, 2, 8, 0.35) 0%, rgba(3, 2, 8, 0.12) 55%, transparent 80%),
            radial-gradient(ellipse 50% 30% at 50% 92%, rgba(3, 2, 8, 0.25) 0%, transparent 70%),
            linear-gradient(to bottom, rgba(3, 2, 8, 0.2) 0%, transparent 25%, transparent 75%, rgba(7, 5, 18, 0.75) 100%)
          `,
        }}
      />

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center relative z-20 pt-1 sm:pt-2 lg:pt-2 text-center">

        {/* Content Column */}
        <div className="w-full max-w-6xl flex flex-col items-center text-center space-y-6 lg:space-y-7 relative mx-auto">

          {/* Premium Headline - Increased Font Size & Single Line with Crisp Background Drop Shadows */}
          <div className="w-full flex justify-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px] 2xl:text-[118px] font-black text-white leading-none tracking-tight font-heading whitespace-nowrap text-center filter drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] drop-shadow-[0_12px_45px_rgba(0,0,0,0.85)]"
            >
              WHERE{' '}
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] via-[#C4B5FD] to-[#F472B6]">
                INNOVATION
              </span>{' '}
              BEGINS
            </motion.h1>
          </div>

          {/* Main Hero Copy & Buttons */}
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-100 text-base sm:text-lg md:text-xl font-medium leading-relaxed text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] [text-shadow:_0_2px_10px_rgba(0,0,0,0.9),_0_4px_20px_rgba(0,0,0,0.75)]"
            >
              Lumiora designs and develops premium websites, high-performance web & mobile applications, and scalable digital marketing strategies that help ambitious businesses grow faster.
            </motion.p>

            {/* Action Call to Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-4 items-center justify-center w-full z-30 pt-1"
            >
              {/* Primary CTA */}
              <VenomButton
                onClick={onOpenPlanner}
                gooColor="#5E5BFF"
                textColor="#FFFFFF"
                size={52}
                className="text-xs sm:text-sm font-bold tracking-wider uppercase"
              >
                CONNECT WITH US
                <PhoneCall className="w-4 h-4 ml-1" />
              </VenomButton>

              {/* Secondary CTA */}
              <VenomButton
                onClick={() => setActiveModal('portfolio')}
                gooColor="#FFFFFF"
                textColor="#0F172A"
                size={52}
                className="text-xs sm:text-sm font-black tracking-wider uppercase"
              >
                Explore Our Work
              </VenomButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Boxless Minimalist "OUR EXPERTISE" Centered at Base ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-35 flex flex-col items-center select-none text-center w-full max-w-3xl px-4 pointer-events-none"
      >
        <div className="flex items-center justify-center gap-2 mb-1.5 select-none">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A5A2FF] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A5A2FF]" />
          </span>
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-[0.25em] text-indigo-200/90 font-mono drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] [text-shadow:_0_1px_6px_rgba(0,0,0,0.95)]">
            OUR EXPERTISE
          </span>
        </div>

        <div className="w-full flex items-center justify-center min-h-[44px] sm:min-h-[52px] overflow-visible drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          <TextMorph
            words={expertiseWords}
            color="#FFFFFF"
            glass={false}
            transition={{
              type: "tween",
              duration: 0.85,
              delay: 1.2,
              ease: "easeInOut",
            }}
            font={{
              fontFamily: "'Space Grotesk', 'Outfit', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.15rem, 2.2vw, 26px)",
              textAlign: "center",
              lineHeight: "1.25em",
              letterSpacing: "-0.01em",
            }}
          />
        </div>
      </motion.div>

      {/* Modern Dialog Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/10 backdrop-blur-2xl">
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="max-w-md w-full p-8 rounded-3xl text-center bg-white border border-stone-200/50 shadow-2xl relative"
            >
              {/* Close button */}
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-600 p-2 rounded-full hover:bg-stone-50 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="w-16 h-16 rounded-2xl bg-[#5E5BFF]/8 border border-[#5E5BFF]/15 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-[#5E5BFF]" />
              </div>

              <h3 className="text-2xl font-bold font-heading mb-3 text-stone-900">
                {activeModal === 'project' ? 'Start Your Project' : 'Our Portfolio'}
              </h3>
              <p className="text-stone-500 text-sm leading-relaxed mb-8">
                {activeModal === 'project'
                  ? "Let's align on your next digital milestone. We will get back to you within 24 hours."
                  : "We craft top-tier software and premium identity suites. Standard case studies are undergoing update."}
              </p>
              <button
                onClick={() => setActiveModal(null)}
                className="w-full py-4 font-bold rounded-full text-white transition-all duration-300 shadow-lg shadow-[#5E5BFF]/20"
                style={{
                  background: 'linear-gradient(135deg, #5E5BFF 0%, #7B68FF 100%)',
                }}
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
