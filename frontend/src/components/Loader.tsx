import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete: () => void;
}

type LoaderPhase =
  | 'blank'             // Initial dark ambient screen
  | 'sweep-left'        // Logo moves from right to left, revealing "LUMIORA"
  | 'hold-lumiora'      // Quick crisp hold on Logo + LUMIORA
  | 'sweep-transition'  // Logo sweeps across words from left to right, covering LUMIORA and revealing "WHERE INNOVATION BEGINS" in lockstep
  | 'hold-tagline'      // Crisp hold on WHERE INNOVATION BEGINS
  | 'zoom-portal'       // Hyper-zoom portal into the main page
  | 'done';

export const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const [phase, setPhase] = useState<LoaderPhase>('blank');

  const complete = useCallback(() => {
    setPhase('done');
    onLoadingComplete();
  }, [onLoadingComplete]);

  // Support pressing Escape to skip instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        complete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [complete]);

  // Cinematic easing curves
  const cinematicEase = [0.16, 1, 0.3, 1] as const;  // Ultra-smooth Apple-grade quintic deceleration
  const smoothSweep = [0.4, 0, 0.2, 1] as const;     // Continuous, fluid acceleration-deceleration for sweeps
  const zoomEase = [0.7, 0, 0.2, 1] as const;        // Exponential hyper-zoom acceleration

  // Orchestrate the seamless timeline
  useEffect(() => {
    // 0. Quick atmospheric fade-in: 0.12s
    const t1 = setTimeout(() => {
      setPhase('sweep-left');
    }, 120);

    // 1. Sweep-left duration: 1.3s -> Reaches left beside LUMIORA at 1.42s
    const t2 = setTimeout(() => {
      setPhase('hold-lumiora');
    }, 1420);

    // 2. Hold for 0.8s -> At 2.22s, logo sweeps across words covering LUMIORA and revealing tagline
    const t3 = setTimeout(() => {
      setPhase('sweep-transition');
    }, 2220);

    // 3. Sweep-transition duration: 1.4s -> Reaches right edge at 3.62s. Tagline is fully revealed!
    const t4 = setTimeout(() => {
      setPhase('hold-tagline');
    }, 3620);

    // 4. Hold tagline for 0.85s -> At 4.47s, start smooth hyper-zoom portal
    const t5 = setTimeout(() => {
      setPhase('zoom-portal');
    }, 4470);

    // 5. Zoom duration: 0.8s -> Complete at 5.27s
    const t6 = setTimeout(() => {
      complete();
    }, 5270);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [complete]);

  if (phase === 'done') return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lumiora-loader-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: phase === 'zoom-portal' ? 0 : 1,
        }}
        transition={{
          duration: phase === 'zoom-portal' ? 0.8 : 0.3,
          ease: zoomEase,
        }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#070512] overflow-hidden select-none pointer-events-auto"
      >
        {/* ── Atmospheric Ambient Nebulae ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-gradient-to-tr from-[#5E5BFF]/20 via-[#8B5CF6]/15 to-transparent blur-[160px]" />
          <div className="absolute top-1/4 right-1/4 w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-[#F472B6]/12 blur-[150px]" />
        </div>

        {/* ── Main Animation Stage ── */}
        <div className="relative w-full max-w-7xl px-6 flex items-center justify-center min-h-[360px]">

          {/* ══════════════════════════════════════════════════════════════════════════
              STAGE A: LUMIORA Lockup (Enlarged Logo + Big "LUMIORA" Text)
              Pre-mounted to eliminate frame-drops; smoothly transitions during sweep
             ══════════════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{
              opacity: phase === 'hold-tagline' || phase === 'zoom-portal' ? 0 : 1,
            }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className={`relative flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-full ${
              phase === 'hold-tagline' || phase === 'zoom-portal' ? 'pointer-events-none' : ''
            }`}
          >
            {/* The Logo: sweeps in, holds, then sweeps across words covering LUMIORA and revealing tagline */}
            <motion.div
              initial={{ x: '75vw', opacity: 0, rotate: -15, scale: 0.92 }}
              animate={
                phase === 'blank'
                  ? { x: '75vw', opacity: 0, rotate: -15, scale: 0.92 }
                  : phase === 'sweep-left' || phase === 'hold-lumiora'
                  ? { x: 0, opacity: 1, rotate: 0, scale: 1 }
                  : { x: '65vw', opacity: [1, 1, 0.4, 0], rotate: 15, scale: [1, 1.05, 0.95, 0.9] }
              }
              transition={{
                duration: phase === 'sweep-transition' ? 1.4 : 1.3,
                ease: phase === 'sweep-transition' ? smoothSweep : cinematicEase,
                times: phase === 'sweep-transition' ? [0, 0.4, 0.85, 1] : undefined,
              }}
              className="relative flex-shrink-0 z-30"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Luminous aura behind the enlarged logo */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-[#5E5BFF]/40 via-[#8B5CF6]/30 to-[#F472B6]/25 blur-2xl pointer-events-none" />

              <img
                src="/logo.png"
                alt="Lumiora Logo"
                className="relative w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-44 xl:h-44 object-contain filter drop-shadow-[0_0_35px_rgba(94,91,255,0.85)] drop-shadow-[0_0_65px_rgba(139,92,246,0.45)]"
              />
            </motion.div>

            {/* The "LUMIORA" Text: Revealed in sweep-left, wiped away in lockstep under logo */}
            <motion.div
              initial={{ clipPath: 'inset(0 0 0 100%)', opacity: 0 }}
              animate={
                phase === 'blank'
                  ? { clipPath: 'inset(0 0 0 100%)', opacity: 0 }
                  : phase === 'sweep-left' || phase === 'hold-lumiora'
                  ? { clipPath: 'inset(0 0 0 0%)', opacity: 1 }
                  : { clipPath: 'inset(0 0 0 100%)', opacity: 0 }
              }
              transition={{
                duration: phase === 'sweep-transition' ? 1.4 : 1.3,
                ease: phase === 'sweep-transition' ? smoothSweep : cinematicEase,
              }}
              className="relative flex-shrink-0 z-10"
              style={{ willChange: 'clip-path, opacity' }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[104px] font-black font-logo tracking-[0.07em] bg-gradient-to-r from-white via-[#C4B5FD] via-[#7B77FF] to-[#F472B6] bg-clip-text text-transparent leading-none select-none whitespace-nowrap">
                LUMIORA
              </h1>
            </motion.div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════════════
              STAGE B: "WHERE INNOVATION BEGINS" Text
              Pre-mounted in DOM; revealed in lockstep as logo sweeps across, then hyper-zoomed
             ══════════════════════════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 flex items-center justify-center text-center px-4 z-20 pointer-events-none">
            {/* The Tagline Text: Covered and written cleanly as logo glides across */}
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1, opacity: 0 }}
              animate={
                phase === 'blank' || phase === 'sweep-left' || phase === 'hold-lumiora'
                  ? { clipPath: 'inset(0 100% 0 0)', scale: 1, opacity: 0 }
                  : phase === 'sweep-transition' || phase === 'hold-tagline'
                  ? { clipPath: 'inset(0 0% 0 0)', scale: 1, opacity: 1 }
                  : {
                      scale: 36,
                      opacity: 0,
                      filter: 'blur(12px)',
                    }
              }
              transition={
                phase === 'zoom-portal'
                  ? {
                      duration: 0.8,
                      ease: zoomEase,
                    }
                  : {
                      duration: 1.4,
                      ease: smoothSweep,
                    }
              }
              className="flex items-center justify-center text-center px-4"
              style={{ transformOrigin: '50% 50%', willChange: 'transform, clip-path, opacity, filter' }}
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-black font-heading tracking-tight whitespace-nowrap text-white filter drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
                WHERE{' '}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] via-[#C4B5FD] to-[#F472B6]">
                  INNOVATION
                </span>{' '}
                BEGINS
              </h2>
            </motion.div>
          </div>

        </div>

        {/* ── Subtle Skip Hint ── */}
        <div className="absolute bottom-6 right-8 text-xs font-mono text-slate-500/70 tracking-widest uppercase pointer-events-none select-none">
          Press ESC to Skip
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
