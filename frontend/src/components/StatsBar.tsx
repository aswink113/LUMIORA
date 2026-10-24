import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { getStats } from '../utils/db';

interface StatItem {
  id?: string;
  value: string;
  label: string;
  suffix: string;
}

export const StatsBar = () => {
  const [statsData, setStatsData] = useState<StatItem[]>([
    { id: 'stat-1', value: '20+', label: 'Projects Delivered', suffix: '' },
    { id: 'stat-2', value: '98', label: 'Client Satisfaction', suffix: '%' },
    { id: 'stat-3', value: '2', label: 'Years of Excellence', suffix: '+' },
    { id: 'stat-4', value: '6+', label: 'Expert Creatives', suffix: '+' },
  ]);

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    try {
      const data = getStats();
      if (data && data.length > 0) {
        setStatsData(data);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'pf_stats') {
        try {
          const data = getStats();
          if (data && data.length > 0) {
            setStatsData(data);
          }
        } catch (err) {
          console.error('Error fetching stats:', err);
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <section ref={ref} className="relative py-12 overflow-hidden bg-brand-bg/50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-8 border-y border-indigo-500/10">
          {statsData.map((stat, i) => (
            <motion.div
              key={stat.id || i}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.76, 0, 0.24, 1] }}
              className="relative flex flex-col items-center md:items-start text-center md:text-left group"
            >
              <div className="text-4xl md:text-5xl font-black font-heading text-gradient tracking-tight">
                {stat.value}
                <span className="text-indigo-500">{stat.suffix}</span>
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-text-muted font-semibold font-mono">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

