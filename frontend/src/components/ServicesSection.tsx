import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, TrendingUp } from 'lucide-react';

interface ServicesSectionProps {
  onOpenPlanner?: (category?: string) => void;
}

const servicesData = [
  {
    number: '01',
    category: 'Engineering',
    title: 'Web & Mobile Development',
    desc: 'From high-performance React & Next.js web applications to native iOS and Android apps — we build scalable, maintainable software engineered to support millions of concurrent users.',
    tags: ['React & Next.js', 'React Native', 'Cloud Architecture', 'API Microservices'],
    deliverables: [
      'Ultra-responsive Next.js frontends with 60 FPS motion',
      'Cross-platform iOS & Android mobile applications',
      'Resilient serverless & cloud microservice backends'
    ],
    image: '/services/03_dev.png',
    badge: 'High Performance',
    stat: '60 FPS Smooth',
    color: 'from-[#3B82F6] to-[#6D4AFF]',
    accent: '#3B82F6'
  },
  {
    number: '02',
    category: 'Experience Design',
    title: 'UI/UX Design & Prototyping',
    desc: 'We craft intuitive, visually stunning interfaces grounded in user psychology. Every design decision is purposeful, every interaction delightful, converting casual visitors into loyal brand advocates.',
    tags: ['Wireframing', 'Design Systems', 'Interactive Prototypes', 'Motion Design'],
    deliverables: [
      'Scalable design systems & token libraries',
      'High-fidelity clickable interactive prototypes',
      'Pixel-perfect developer handoff specifications'
    ],
    image: '/services/02_uiux.png',
    badge: 'Human-Centered UX',
    stat: 'Awwwards Quality',
    color: 'from-[#EC4899] to-[#8B5DFF]',
    accent: '#EC4899'
  },
  {
    number: '03',
    category: 'Digital Strategy',
    title: 'Digital Strategy & Consulting',
    desc: 'We analyse your market, define your digital roadmap, and create a blueprint for sustainable growth. From UX audits to tech stack decisions — we guide every strategic move.',
    tags: ['Market Analysis', 'Tech Stack Design', 'Growth Roadmaps', 'UX Audits'],
    deliverables: [
      'Empirical market & competitor research',
      'Target architecture & tech stack selection',
      'Phased product roadmap & MVP scoping'
    ],
    image: '/services/01_strategy.png',
    badge: 'Strategic Vision',
    stat: '98% Success Rate',
    color: 'from-[#6D4AFF] to-[#8B5DFF]',
    accent: '#6D4AFF'
  },
  {
    number: '04',
    category: 'Growth & Marketing',
    title: 'Growth & Performance Marketing',
    desc: 'Data-driven campaigns that fill your pipeline with high-intent leads. We manage multi-channel paid media, technical SEO, conversion rate optimisation, and full-funnel tracking.',
    tags: ['SEO & SEM', 'Conversion Optimisation', 'Analytics', 'Funnel Strategy'],
    deliverables: [
      'Precision multi-channel paid acquisition campaigns',
      'Deep technical SEO architecture & content engines',
      'Full-funnel conversion rate experimentation'
    ],
    image: '/services/06_growth.png',
    badge: 'Scalable Growth',
    stat: '+340% Avg ROI',
    color: 'from-[#8B5DFF] to-[#3B82F6]',
    accent: '#8B5DFF'
  },
  {
    number: '05',
    category: 'Brand Strategy',
    title: 'Brand Identity & Content',
    desc: 'We build cohesive brand identities that resonate and endure. Logo, typography, tone of voice, and content strategy — all unified under a single, unforgettable visual narrative.',
    tags: ['Visual Identity', 'Copywriting', 'Brand Guidelines', 'Typography'],
    deliverables: [
      'Comprehensive brand guideline books & palettes',
      'Distinctive logos, typography, and iconography',
      'Compelling editorial copywriting and voice frameworks'
    ],
    image: '/services/05_brand.png',
    badge: 'Iconic Branding',
    stat: '100% Unique Voice',
    color: 'from-[#F59E0B] to-[#EC4899]',
    accent: '#F59E0B'
  },
];

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenPlanner }) => {
  return (
    <section id="services" className="relative bg-brand-bg py-24 sm:py-32 px-6 overflow-hidden">
      {/* Ambient Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 10%, rgba(94, 91, 255, 0.08) 0%, transparent 60%),
            linear-gradient(to right, rgba(94, 91, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(94, 91, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 72px 72px, 72px 72px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-5xl mx-auto mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-1.5 rounded-full border border-indigo-200/80 bg-white/80 backdrop-blur-md shadow-xs mb-5"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 font-mono">
              Core Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black font-heading tracking-tight leading-tight text-slate-900 mb-6 sm:whitespace-nowrap"
          >
            Five Disciplines.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
              One Unified Vision.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-stone-600 text-base sm:text-lg md:text-xl leading-relaxed font-light max-w-3xl mx-auto"
          >
            We merge strategic vision, human-centered design, and high-performance engineering to transform ambitious ideas into market-commanding digital reality.
          </motion.p>
        </div>

        {/* 5 Services: Natural Flowing Alternating Editorial Layout */}
        <div className="flex flex-col gap-24 sm:gap-32">
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center pt-8 border-t border-indigo-500/10"
              >
                {/* ── Content Column (Takes 6 cols) ── */}
                <div
                  className={`lg:col-span-6 flex flex-col justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  {/* Category & Index Header */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-sm font-bold text-indigo-600 tracking-wider">
                      [{service.number} / 0{servicesData.length}]
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">
                      {service.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading text-slate-900 tracking-tight leading-[1.1] mb-5">
                    {service.title}
                  </h3>

                  {/* Narrative Description */}
                  <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                    {service.desc}
                  </p>

                  {/* Key Deliverables */}
                  <div className="flex flex-col gap-2.5 mb-8">
                    {service.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2.5 text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-indigo-600 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags Pill Row */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-600 shadow-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Action & Metric Bar */}
                  <div className="flex items-center gap-6 pt-4 border-t border-stone-200/60">
                    <motion.button
                      whileHover={{ scale: 1.03, x: 2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onOpenPlanner?.(service.title)}
                      className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold text-xs uppercase tracking-wider shadow-md hover:bg-indigo-600 transition-colors duration-300 cursor-pointer"
                    >
                      <span>Start Project</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>

                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-stone-500">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span>{service.stat}</span>
                    </div>
                  </div>
                </div>

                {/* ── Visual Column (Takes 6 cols) ── */}
                <div
                  className={`lg:col-span-6 relative flex items-center justify-center ${isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                >
                  {/* Ambient Glow Aura */}
                  <div
                    className={`absolute inset-4 sm:inset-10 bg-gradient-to-tr ${service.color} opacity-20 sm:opacity-25 rounded-full blur-[90px] -z-10 pointer-events-none`}
                  />

                  {/* High Resolution Floating 3D Artwork */}
                  <motion.div
                    whileHover={{ scale: 1.04, y: -4 }}
                    transition={{ duration: 0.4 }}
                    className="relative w-full max-w-lg aspect-square flex items-center justify-center p-4 sm:p-8"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain filter drop-shadow-[0_20px_40px_rgba(94,91,255,0.16)] transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Subtle Floating Badge */}
                    <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-200/80 shadow-md text-[11px] font-mono font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                      {service.badge}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
