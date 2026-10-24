import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const CTA = ({ onOpenPlanner }: { onOpenPlanner?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden bg-brand-bg transition-colors duration-300">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-border-color to-transparent" />

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[400px] bg-gradient-to-r from-blue-700/15 via-purple-700/15 to-blue-700/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#5E5BFF] font-semibold mb-8 px-4 py-1.5 rounded-full border border-[#5E5BFF]/25 bg-[#5E5BFF]/8">
            WHERE INNOVATION BEGINS
          </span>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold font-heading leading-[1.0] tracking-tight text-text-main mb-6">
            Ready to Build <br />
            <span className="text-gradient">With LUMIORA?</span>
          </h2>

          <p className="text-text-muted text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12">
            Whether you need a bespoke web platform, scalable application, or growth-focused marketing engine, we are ready to build what's next.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => onOpenPlanner && onOpenPlanner()}
              className="group relative px-8 py-4 rounded-full overflow-hidden hover-target transition-all hover:scale-105 active:scale-95 cursor-none text-white font-bold shadow-lg shadow-[#5E5BFF]/25 hover:shadow-xl hover:shadow-[#5E5BFF]/40"
              style={{
                background: 'linear-gradient(135deg, #5E5BFF 0%, #7B68FF 50%, #8A6DFF 100%)',
                color: '#FFFFFF'
              }}
            >
              <span className="relative z-10 flex items-center gap-2.5">
                Schedule a Discovery Call
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <div 
                className="absolute inset-0 bg-white/15 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
              />
            </button>

            <a
              href="mailto:lumiora.innovate@gmail.com"
              className="px-6 py-4 rounded-full border border-indigo-100/80 bg-white/70 hover:bg-white text-stone-700 hover:text-[#5E5BFF] text-base font-medium transition-all duration-300 flex items-center gap-2.5 cursor-none hover-target shadow-sm hover:shadow-md hover:border-indigo-200"
            >
              <svg className="w-4 h-4 text-[#5E5BFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              lumiora.innovate@gmail.com
            </a>
          </div>

          {/* Trust line */}
          <p className="mt-12 text-text-muted/60 text-sm">
            No commitment. Free 30-minute strategy session. ✦ We respond within 24 hours.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
