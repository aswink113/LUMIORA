import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Portfolio } from '../components/Portfolio';
import { ProjectPlannerModal } from '../components/ProjectPlannerModal';
import { CustomCursor } from '../components/CustomCursor';
import { Footer } from '../components/Footer';

const filters = ['All', 'Web Development', 'Mobile Apps', 'AI & Machine Learning', 'UI/UX Design'];

export const WorkPage = () => {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerCategory, setPlannerCategory] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const openPlanner = (category = '') => {
    setPlannerCategory(category);
    setPlannerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070512] text-white">
      <CustomCursor />
      <ProjectPlannerModal
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        initialCategory={plannerCategory}
      />
      <Navbar onOpenPlanner={() => openPlanner()} />

      {/* Page Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[180px] pointer-events-none" style={{ background: 'rgba(99,102,241,0.12)' }} />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[300px] rounded-full blur-[150px] pointer-events-none" style={{ background: 'rgba(139,92,246,0.10)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-indigo-200 font-mono shadow-xs mb-6">
              Our Work
            </span>
            <h1 className="text-5xl md:text-7xl font-black font-heading leading-[1.0] tracking-tight mb-6 text-white">
              Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] via-[#C4B5FD] to-[#F472B6]">Projects</span>
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed text-slate-300">
              A curated collection of digital products, platforms, and experiences we've crafted for ambitious brands worldwide.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
            className="flex flex-wrap gap-3 mt-12"
          >
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                  activeFilter === f
                    ? 'text-white border-transparent bg-gradient-to-r from-[#5E5BFF] via-[#7B68FF] to-[#A855F7] shadow-[0_4px_20px_rgba(94,91,255,0.4)]'
                    : 'text-slate-300 border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <Portfolio onOpenPlanner={openPlanner} />

      {/* Bottom CTA */}
      <section className="py-24 px-6 text-center border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-black font-heading mb-4 text-white">
            Want to be our next{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5A2FF] via-[#C4B5FD] to-[#F472B6]">success story?</span>
          </h2>
          <p className="mb-8 max-w-md mx-auto text-lg text-slate-300">
            Let's talk about what we can build together.
          </p>
          <button
            onClick={() => openPlanner()}
            className="group relative px-8 py-4 text-white text-base font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-[0_6px_25px_rgba(94,91,255,0.45)] bg-gradient-to-r from-[#5E5BFF] via-[#7B68FF] to-[#A855F7] border border-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start a Project
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
};
