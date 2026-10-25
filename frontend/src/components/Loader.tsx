import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onLoadingComplete: () => void;
}

type LoaderPhase =
  | 'blank'           // Blank dark screen
  | 'sweep-left'      // Logo moves from right to left, revealing "LUMIORA"
  | 'hold-lumiora'    // Hold for 2 seconds with Logo + LUMIORA
  | 'sweep-right'     // Logo moves back to right outside screen, erasing LUMIORA & writing WHERE INNOVATION BEGINS
  | 'hold-tagline'    // Hold for 2 seconds with WHERE INNOVATION BEGINS
  | 'zoom-portal'     // Fully zoom inside text, revealing main page as overlay effect
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

  // Orchestrate the exact timeline with slower, smoother pacing
  useEffect(() => {
    // 0. Blank section for 0.4s
    const t1 = setTimeout(() => {
      setPhase('sweep-left');
    }, 400);

    // 1. Sweep-left duration is 2.8s -> Reaches left beside LUMIORA at 3.2s
    const t2 = setTimeout(() => {
      setPhase('hold-lumiora');
    }, 3200);

    // 2. Hold for 2.0s -> At 5.2s, sweep back to the right
    const t3 = setTimeout(() => {
      setPhase('sweep-right');
    }, 5200);

    // 3. Slow, majestic sweep-right duration is 3.6s -> Finishes outside screen at 8.8s
    const t4 = setTimeout(() => {
      setPhase('hold-tagline');
    }, 8800);

    // 4. Hold for 2.0s -> At 10.8s, start zoom inside text
    const t5 = setTimeout(() => {
      setPhase('zoom-portal');
    }, 10800);

    // 5. Zoom duration is 1.1s -> Complete at 11.9s
    const t6 = setTimeout(() => {
      complete();
    }, 11900);

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

  // Gentle, luxurious easing curves
  const enterEase = [0.22, 1, 0.36, 1];     // Smooth glide-in to stop
  const sweepOutEase = [0.35, 0, 0.2, 1];   // Gentle acceleration from rest, steady glide across, smooth exit

  return (
    <AnimatePresence>
      <motion.div
        key="lumiora-loader-overlay"
        initial={{ opacity: 1 }}
        animate={{
          opacity: phase === 'zoom-portal' ? 0 : 1,
        }}
        transition={{
          duration: phase === 'zoom-portal' ? 1.1 : 0.4,
          ease: [0.65, 0, 0.35, 1],
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
              Active during 'sweep-left' and 'hold-lumiora', then erased during 'sweep-right'
             ══════════════════════════════════════════════════════════════════════════ */}
          {(phase === 'blank' || phase === 'sweep-left' || phase === 'hold-lumiora' || phase === 'sweep-right') && (
            <div className="relative flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 max-w-full">
              
              {/* The Logo: sweeps in slowly, holds, then glides gently across to the right */}
              <motion.div
                initial={{ x: '75vw', opacity: 0, rotate: 0 }}
                animate={
                  phase === 'blank'
                    ? { x: '75vw', opacity: 0, rotate: 0 }
                    : phase === 'sweep-left' || phase === 'hold-lumiora'
                    ? { x: 0, opacity: 1, rotate: 0 }
                    : { x: '88vw', opacity: [1, 1, 1, 0], rotate: 180 } // Slower, steady glide out to the right
                }
                transition={{
                  duration: phase === 'sweep-right' ? 3.6 : 2.8,
                  ease: phase === 'sweep-right' ? sweepOutEase : enterEase,
                }}
                className="relative flex-shrink-0 z-20"
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

              {/* The "LUMIORA" Text: Revealed as logo sweeps left, erased in lockstep as logo sweeps right */}
              <motion.div
                initial={{ clipPath: 'inset(0 0 0 100%)', opacity: 1 }}
                animate={
                  phase === 'blank'
                    ? { clipPath: 'inset(0 0 0 100%)', opacity: 0 }
                    : phase === 'sweep-left' || phase === 'hold-lumiora'
                    ? { clipPath: 'inset(0 0 0 0%)', opacity: 1 }
                    : { clipPath: 'inset(0 0 0 100%)', opacity: 1 } // Erased from left to right trailing the logo
                }
                transition={{
                  duration: phase === 'sweep-right' ? 3.6 : 2.8,
                  ease: phase === 'sweep-right' ? sweepOutEase : enterEase,
                }}
                className="relative flex-shrink-0"
                style={{ willChange: 'clip-path, opacity' }}
              >
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[104px] font-black font-logo tracking-[0.07em] bg-gradient-to-r from-white via-[#C4B5FD] via-[#7B77FF] to-[#F472B6] bg-clip-text text-transparent leading-none select-none whitespace-nowrap">
                  LUMIORA
                </h1>
              </motion.div>
            </div>
          )}

          {/* ══════════════════════════════════════════════════════════════════════════
              STAGE B: "WHERE INNOVATION BEGINS" Text
              Written as logo sweeps right, held for 2s, then hyper-zoomed to reveal page
             ══════════════════════════════════════════════════════════════════════════ */}
          {(phase === 'sweep-right' || phase === 'hold-tagline' || phase === 'zoom-portal') && (
            <motion.div
              initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1, opacity: 1 }}
              animate={
                phase === 'sweep-right'
                  ? { clipPath: 'inset(0 0% 0 0)', scale: 1, opacity: 1 }
                  : phase === 'hold-tagline'
                  ? { clipPath: 'inset(0 0% 0 0)', scale: 1, opacity: 1 }
                  : {
                      scale: 55, // Hyper-zoom inside the text
                      opacity: [1, 0.85, 0], // Smoothly dissolves into the live page
                    }
              }
              transition={
                phase === 'zoom-portal'
                  ? {
                      duration: 1.1,
                      ease: [0.65, 0, 0.35, 1],
                    }
                  : {
                      duration: 3.6,
                      ease: sweepOutEase,
                    }
              }
              className="absolute inset-0 flex items-center justify-center text-center px-4"
              style={{ transformOrigin: '50% 50%', willChange: 'transform, clip-path, opacity' }}
            >
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[88px] font-black font-heading tracking-tight whitespace-nowrap text-white filter drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]">
                WHERE{' '}
                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] via-[#C4B5FD] to-[#F472B6]">
                  INNOVATION
                </span>{' '}
                BEGINS
              </h2>
            </motion.div>
          )}

        </div>

        {/* ── Subtle Skip Hint ── */}
        <div className="absolute bottom-6 right-8 text-xs font-mono text-slate-500/70 tracking-widest uppercase pointer-events-none select-none">
          Press ESC to Skip
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
