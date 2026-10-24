import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { getPortfolio } from '../utils/db';

interface Project {
  id: string;
  title: string;
  client: string;
  category: string;
  gradient?: string;
  year: string;
  photo_url?: string;
}

interface ProjectProps {
  title: string;
  client: string;
  category: string;
  gradient?: string;
  year: string;
  photo_url?: string;
  onInquire: () => void;
}

const ProjectCard = ({ title, client, category, gradient, year, photo_url, onInquire }: ProjectProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific card to drive parallax image shift
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="group relative flex flex-col cursor-pointer"
      onClick={onInquire}
    >
      {/* Cover image preview with subtle depth and zoom */}
      <div className="w-full aspect-[16/10] relative rounded-2xl overflow-hidden bg-slate-900 shadow-md">
        <motion.div style={{ y: imageY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          {photo_url ? (
            <img 
              src={photo_url} 
              alt={title} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${gradient || 'from-indigo-600 via-purple-600 to-pink-600'}`} />
          )}
        </motion.div>
        
        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors duration-300" />
        
        {/* Floating pill badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-wider text-white">
            {client}
          </span>
        </div>

        <div className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
          <ExternalLink className="w-4 h-4" />
        </div>
      </div>

      {/* Fluid Editorial Typography Below Media (No Card Box) */}
      <div className="pt-5 pb-2 flex flex-col justify-between">
        <div className="flex items-center justify-between text-xs text-text-muted font-mono mb-2">
          <span className="text-indigo-600 font-semibold">{category}</span>
          <span>{year}</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-heading font-extrabold text-text-main group-hover:text-indigo-600 transition-colors duration-300 mb-3">
          {title}
        </h3>

        <div className="flex items-center gap-2 text-xs font-semibold text-text-muted group-hover:text-indigo-600 transition-colors">
          <span>Explore Case Study</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </motion.div>
  );
};

export const Portfolio = ({ onOpenPlanner }: { onOpenPlanner: (category: string) => void }) => {
  const defaultProjects: Project[] = [
    {
      id: "default-1",
      title: "Synthetix AI Core Integration",
      client: "Synthetix Corp",
      category: "AI & Machine Learning",
      gradient: "from-blue-600 via-indigo-600 to-purple-600",
      year: "2026",
    },
    {
      id: "default-2",
      title: "Aura Luxury E-Commerce Engine",
      client: "Aura International",
      category: "Web Development",
      gradient: "from-purple-600 via-pink-600 to-red-500",
      year: "2025",
    },
    {
      id: "default-3",
      title: "Nova Fintech Wallet Experience",
      client: "Nova Labs Inc",
      category: "Mobile Apps",
      gradient: "from-emerald-500 via-teal-600 to-blue-600",
      year: "2025",
    }
  ];

  const [projects, setProjects] = useState<Project[]>(defaultProjects);

  useEffect(() => {
    try {
      const data = getPortfolio();
      if (data && data.length > 0) {
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to fetch portfolio projects', err);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pf_projects') {
        try {
          const data = getPortfolio();
          if (data && data.length > 0) {
            setProjects(data);
          }
        } catch (err) {
          console.error('Failed to fetch portfolio projects', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section id="projects" className="relative py-28 bg-brand-bg border-t border-border-color z-10 px-6 transition-colors duration-300">
      {/* Ambient background lights */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-900/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-200/80 bg-white/80 dark:border-white/20 dark:bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-200 font-mono shadow-xs mb-4">
              Case Studies
            </span>
            <h2 className="text-4xl md:text-6xl font-bold font-heading tracking-tight text-text-main mb-4">
              Selected <span className="text-gradient">projects.</span>
            </h2>
            <p className="text-text-muted text-base font-light leading-relaxed">
              Explore our record of building highly refined digital platforms, tools, and bespoke software experiences.
            </p>
          </div>

          <button
            onClick={() => onOpenPlanner("General Inquiry")}
            className="group relative px-6 py-3 border border-border-color hover:border-text-main text-text-main rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 hover-target flex items-center gap-2 cursor-none"
          >
            Inquire Full Archive
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              client={project.client}
              category={project.category}
              gradient={project.gradient}
              photo_url={project.photo_url}
              year={project.year}
              onInquire={() => onOpenPlanner(project.category)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
