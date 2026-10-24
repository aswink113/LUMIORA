import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export interface PillarData {
  index: string;
  title: string;
  desc: string;
  metric: string;
  metricLabel: string;
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  badge: string;
}

interface AboutPillarCardProps {
  pillar: PillarData;
  index: number;
}

export const AboutPillarCard: React.FC<AboutPillarCardProps> = ({ pillar, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare(prev => ({ ...prev, opacity: 0 }));
    setHovered(false);
  };

  return (
    <div
      className="relative w-full"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        className="group relative p-6 md:p-7 rounded-3xl overflow-hidden cursor-pointer select-none transition-all duration-300"
        style={{
          transformStyle: 'preserve-3d',
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${
            hovered ? 1.025 : 1
          }, ${hovered ? 1.025 : 1}, 1)`,
          background: 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(20px)',
          border: hovered
            ? '1.5px solid rgba(94, 91, 255, 0.6)'
            : '1.5px solid rgba(94, 91, 255, 0.12)',
          boxShadow: hovered
            ? `0 20px 45px -10px ${pillar.glowColor}, 0 0 25px rgba(138, 109, 255, 0.2), inset 0 0 15px rgba(255, 255, 255, 0.8)`
            : '0 8px 30px -6px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(94, 91, 255, 0.04)',
        }}
      >
        {/* Holographic Cursor Reflection Layer */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl z-20 transition-opacity duration-200"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.85) 0%, rgba(94, 91, 255, 0.15) 40%, transparent 70%)`,
            transform: 'translateZ(30px)',
          }}
        />

        {/* Ambient Corner Accent */}
        <div
          className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-20 pointer-events-none transition-opacity duration-500 group-hover:opacity-40 ${pillar.gradient}`}
          style={{ transform: 'translateZ(5px)' }}
        />

        {/* Top Meta Header: Index & Badge */}
        <div
          className="flex items-center justify-between mb-4 transition-transform duration-300"
          style={{ transform: hovered ? 'translateZ(30px)' : 'translateZ(10px)' }}
        >
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold tracking-wider text-indigo-500 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200/60">
              {pillar.index}
            </span>
            <span className="text-[11px] font-semibold tracking-wider uppercase text-gray-500">
              {pillar.badge}
            </span>
          </div>

          {/* Micro Status Beacon */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/5 border border-indigo-100 text-[10px] font-mono text-gray-600 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>ACTIVE</span>
          </div>
        </div>

        {/* Main Body with 3D Pop */}
        <div className="flex items-start gap-4 mb-4">
          {/* 3D Elevated Icon Sphere */}
          <div
            className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform duration-300 ${pillar.gradient}`}
            style={{
              transform: hovered ? 'translateZ(40px) scale(1.05)' : 'translateZ(15px)',
              boxShadow: hovered
                ? `0 12px 25px -4px ${pillar.glowColor}`
                : '0 6px 16px -2px rgba(94, 91, 255, 0.2)',
            }}
          >
            {pillar.icon}
          </div>

          <div
            className="flex-1 transition-transform duration-300"
            style={{ transform: hovered ? 'translateZ(25px)' : 'translateZ(10px)' }}
          >
            <h3 className="text-gray-900 font-extrabold text-lg md:text-xl font-heading mb-1.5 tracking-tight group-hover:text-indigo-600 transition-colors">
              {pillar.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        </div>

        {/* Bottom Interactive Metric Highlight Plate */}
        <div
          className="mt-4 pt-3.5 border-t border-indigo-100/80 flex items-center justify-between transition-transform duration-300"
          style={{ transform: hovered ? 'translateZ(35px)' : 'translateZ(15px)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Key Metric:</span>
            <span className="text-sm font-bold font-mono text-indigo-600 tracking-tight">
              {pillar.metric}
            </span>
          </div>
          <span className="text-[11px] font-medium text-gray-500">
            {pillar.metricLabel}
          </span>
        </div>

        {/* Cyberpunk Animated Edge Scanline */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center"
        />
      </motion.div>
    </div>
  );
};
