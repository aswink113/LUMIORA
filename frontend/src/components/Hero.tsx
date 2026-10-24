import { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles, PhoneCall } from 'lucide-react';
import { getExpertiseCards } from '../utils/db';
import TextMorph from './TextMorph';

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
      // Strip leading emojis and symbols (e.g. "🤖 AI Automation" -> "AI Automation")
      .map((t) => t.replace(/^[^\w\s&+-]+/, '').trim())
      .filter((t) => t.length > 0);

    return (cleaned.length > 0
      ? cleaned
      : [
          'AI Automation & Intelligence',
          'FastAPI & Modern React',
          'Mobile App Development',
          'Cloud Solutions & DevOps',
          'Strategic Brand Identity',
          'UI/UX Product Design',
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
      className="relative w-full min-h-screen lg:h-screen lg:max-h-screen flex items-center pt-24 pb-12 lg:py-0 overflow-hidden bg-transparent"
    >
      {/* ── 16:9 Scenic Hero Background Image (Watermark-Free Full Single View) ── */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/hero-bg.png"
          alt=""
          className="w-full h-full object-cover object-center"
        />

        {/* ── Multi-Layer Smoky Atmosphere Tightly Anchored to the Bottom Edge ── */}
        {/* Layer 1: Smooth Gradient Fade (Lowered to bottom edge) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 sm:h-44 md:h-52 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(252, 252, 252, 0.15) 30%, rgba(245, 244, 255, 0.55) 60%, rgba(250, 242, 255, 0.9) 85%, #FCFCFC 100%)',
          }}
        />

        {/* Layer 2: Ethereal Misty Blur along the bottom boundary */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 backdrop-blur-[2px] sm:backdrop-blur-[3px] pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 85%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 85%)',
          }}
        />

        {/* Layer 3: Low-Hanging Smoky Fog Cloud at boundary */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[115vw] h-28 sm:h-36 pointer-events-none rounded-[100%]"
          style={{
            background: 'radial-gradient(ellipse at center bottom, rgba(252, 252, 252, 0.95) 0%, rgba(245, 244, 255, 0.6) 40%, transparent 75%)',
            filter: 'blur(14px)',
          }}
        />
      </div>

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-20">

        {/* Left Side Content Column */}
        <div className="lg:col-span-8 xl:col-span-7 flex flex-col items-start text-left space-y-8">

          {/* Sparkle Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-transparent border border-[#5E5BFF]/35 text-[#4F46E5] text-xs font-black tracking-wider uppercase select-none shadow-sm"
          >
            <span>
              WEB • APPS • MARKETING
            </span>
          </motion.div>

          {/* Premium Headline */}
          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-6xl sm:text-8xl lg:text-8xl font-black text-[#0f172a] leading-[1.08] tracking-tight font-heading max-w-none drop-shadow-[0_2px_15px_rgba(255,255,255,0.7)]"
            >
              WHERE <span className="text-gradient font-black">INNOVATION</span> <br className="hidden sm:inline" />BEGINS
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-slate-900 text-base md:text-lg font-bold leading-relaxed max-w-xl drop-shadow-[0_1px_8px_rgba(255,255,255,0.7)]"
            >
              Lumiora designs and develops premium websites, high-performance web & mobile applications, and scalable digital marketing strategies that help ambitious businesses grow faster.
            </motion.p>
          </div>

          {/* Dynamic Expertise Text - Pure typography without background */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 py-1 select-none bg-transparent"
          >
            <div className="flex items-center gap-2 select-none shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#5E5BFF] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.25em] text-slate-900 font-mono drop-shadow-[0_1px_6px_rgba(255,255,255,0.7)]">
                OUR EXPERTISE
              </span>
            </div>

            <div className="hidden sm:block w-px h-5 bg-slate-400/80" />

            <div className="h-10 sm:h-12 min-w-[280px] max-w-full flex items-center justify-start overflow-hidden">
              <TextMorph
                words={expertiseWords}
                color="#5E5BFF"
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
                  fontSize: "clamp(1.4rem, 2.5vw, 32px)",
                  textAlign: "left",
                  lineHeight: "1.2em",
                  letterSpacing: "-0.01em",
                }}
              />
            </div>
          </motion.div>

          {/* Action Call to Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-4 items-center w-full z-30 pt-1"
          >
            {/* Primary CTA */}
            <motion.button
              onClick={onOpenPlanner}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative group/btn overflow-hidden px-8 py-4 bg-gradient-to-r from-[#5E5BFF] to-[#8A6DFF] text-white text-sm font-bold rounded-full tracking-wider transition-all duration-300 uppercase shadow-lg shadow-[#5E5BFF]/20"
            >
              <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                CONNECT WITH US
                <PhoneCall className="w-4 h-4" />
              </span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              onClick={() => setActiveModal('portfolio')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-white/75 hover:bg-white/95 backdrop-blur-md border border-slate-300/80 text-slate-900 text-sm font-black rounded-full tracking-wider transition-all duration-300 uppercase shadow-md"
            >
              Explore Our Work
            </motion.button>
          </motion.div>
        </div>



      </div>

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
