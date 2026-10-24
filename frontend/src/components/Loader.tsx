import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomTextTunnel } from './ZoomTextTunnel';

const TUNNEL_TEXTS = ["LUMIORA", "WHERE INNOVATION BIGINS"];

// Zero-lag ease transition
const TUNNEL_TRANSITION = {
  type: "tween" as const,
  duration: 1.05,
  ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
};

const TUNNEL_FONT: React.CSSProperties = {
  fontFamily: "'Maggle', 'Outfit', 'Plus Jakarta Sans', sans-serif",
  fontWeight: 900,
  fontSize: "clamp(2.4rem, 7vw, 115px)",
  lineHeight: "1.05em",
  letterSpacing: "-0.035em",
  textAlign: "center",
  textTransform: "uppercase",
  filter: "drop-shadow(0 10px 32px rgba(94, 91, 255, 0.2))",
};

// Rich, high-contrast Lumiora electric gradient matching the website's signature text-gradient (#5E5BFF -> #7B68FF -> #A855F7)
const TUNNEL_GRADIENT = "linear-gradient(110deg, #5E5BFF 10%, #7B68FF 30%, #A855F7 46%, #FFFFFF 52%, #A855F7 58%, #7B68FF 74%, #5E5BFF 92%)";

export const Loader = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const completeLoading = useCallback(() => {
    setIsLoaded(true);
    setTimeout(() => {
      onLoadingComplete();
    }, 900); // Wait for the exit curtain animation to finish
  }, [onLoadingComplete]);

  // Support pressing Escape to skip instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        completeLoading();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [completeLoading]);

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          key="loader"
          exit={{ 
            clipPath: "inset(0 0 100% 0)",
            opacity: 0.98,
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none"
          style={{ 
            clipPath: "inset(0 0 0 0)",
            background: "linear-gradient(135deg, #FCFCFC 0%, #F5F4FF 40%, #FAF2FF 80%, #FCFCFC 100%)",
          }}
        >
          {/* ── Ambient Light Washes Matching Website Background ── */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Center Violet Aura */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(94, 91, 255, 0.16) 0%, rgba(168, 85, 247, 0.08) 45%, transparent 70%)",
              }}
            />

            {/* Top-Right Soft Electric Wash */}
            <div 
              className="absolute -top-[10%] -right-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(94, 91, 255, 0.12) 0%, transparent 65%)",
              }}
            />

            {/* Bottom-Left Soft Purple/Pink Hue */}
            <div 
              className="absolute -bottom-[10%] -left-[10%] w-[50vw] h-[50vw] max-w-[650px] max-h-[650px] rounded-full pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(168, 85, 247, 0.10) 0%, transparent 65%)",
              }}
            />
          </div>

          {/* ── Decorative Background Orbital Elements (Website Color Palette) ── */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden">
            {/* Inner Rotating Orbital Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute w-[480px] h-[480px] md:w-[580px] md:h-[580px] rounded-full border border-[#5E5BFF]/25 border-dashed"
            />

            {/* Outer Subtle Orbital Ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute w-[760px] h-[760px] md:w-[920px] md:h-[920px] rounded-full border border-[#A855F7]/20"
            >
              {/* Satellite Dot */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#5E5BFF] to-[#A855F7] shadow-sm shadow-[#5E5BFF]/50" />
            </motion.div>

            {/* 4-Point Prismatic Sparkles (✦) */}
            <motion.div
              animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.75, 0.35] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-24 right-1/3 text-violet-500/40 text-xl font-bold select-none"
            >
              ✦
            </motion.div>
            <motion.div
              animate={{ scale: [1.2, 1, 1.2], opacity: [0.65, 0.3, 0.65] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-28 left-1/3 text-indigo-500/40 text-lg font-bold select-none"
            >
              ✦
            </motion.div>
          </div>

          {/* ── Center Stage: Lag-Free Pure Zoom Text Tunnel with Slow Shimmer ── */}
          <div className="relative w-full h-[70vh] flex items-center justify-center z-10 px-4">
            <ZoomTextTunnel
              texts={TUNNEL_TEXTS}
              gradient={TUNNEL_GRADIENT}
              hold={2200}
              stayDuration={2200}
              maxScale={8}
              loop={false}
              onComplete={completeLoading}
              transition={TUNNEL_TRANSITION}
              font={TUNNEL_FONT}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
