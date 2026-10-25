import { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';

import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { ServicesSection } from './components/ServicesSection';
import { Process } from './components/Process';
import { Portfolio } from './components/Portfolio';
import { Testimonials } from './components/Testimonials';
import { Clients } from './components/Clients';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { ProjectPlannerModal } from './components/ProjectPlannerModal';
import { WorkPage } from './pages/WorkPage';
import { BlogPage } from './pages/BlogPage';
import { TeamPage } from './pages/TeamPage';
import { AdminPage } from './pages/AdminPage';


function HomePage() {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [plannerCategory, setPlannerCategory] = useState('');
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }

    return () => { 
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(element, { duration: 1.2, immediate: false });
          } else {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const openPlanner = (category = '') => {
    setPlannerCategory(category);
    setPlannerOpen(true);
  };

  return (
    <div className="bg-[#070512] min-h-screen text-white selection:bg-[#5E5BFF]/30 transition-colors duration-300">
      <CustomCursor />
      <ProjectPlannerModal
        isOpen={plannerOpen}
        onClose={() => setPlannerOpen(false)}
        initialCategory={plannerCategory}
      />
      <div>
        <Navbar onOpenPlanner={() => openPlanner()} />
        <main>
          <Hero onOpenPlanner={() => openPlanner()} />
          <About />
          <ServicesSection onOpenPlanner={openPlanner} />
          <Clients />
          <Process />
          <Portfolio onOpenPlanner={openPlanner} />
          <Testimonials />
          <CTA onOpenPlanner={() => openPlanner()} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  // Opening animation only plays on page refresh or initial site startup
  const [appLoading, setAppLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {appLoading && (
          <Loader key="app-loader" onLoadingComplete={() => setAppLoading(false)} />
        )}
      </AnimatePresence>

      <motion.div 
        className="fixed top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 origin-[0%] z-[9999]" 
        style={{ scaleX }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

export default App;

