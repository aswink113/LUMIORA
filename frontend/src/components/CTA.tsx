import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import VenomButton from './VenomButton';

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
          <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-200/80 bg-white/80 dark:border-white/20 dark:bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-200 font-mono shadow-xs mb-8">
            Get In Touch
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black font-heading leading-[1.05] tracking-tight text-slate-900 dark:text-white mb-6">
            Ready to Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
              With LUMIORA?
            </span>
          </h2>

          <p className="text-text-muted text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-12">
            Whether you need a bespoke web platform, scalable application, or growth-focused marketing engine, we are ready to build what's next.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <VenomButton
              onClick={() => onOpenPlanner && onOpenPlanner()}
              gooColor="#5E5BFF"
              textColor="#FFFFFF"
              size={54}
              className="text-sm sm:text-base font-bold tracking-wide"
            >
              Schedule a Discovery Call
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </VenomButton>

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
