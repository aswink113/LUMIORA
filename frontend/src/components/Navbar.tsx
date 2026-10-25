import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import VenomButton from './VenomButton';

export const Navbar = ({ onOpenPlanner }: { onOpenPlanner: () => void }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => document.body.classList.remove('overflow-hidden');
  }, [menuOpen]);

  const navLinks = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'Services', href: '#services', isRoute: false },
    { name: 'Solutions', href: '#process', isRoute: false },
    { name: 'Projects', href: '#projects', isRoute: false },
    { name: 'About', href: '#about', isRoute: false },
    { name: 'Team', href: '/team', isRoute: true },
    { name: 'Contact', href: '#contact', isRoute: false },
  ];

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + href);
    } else {
      e.preventDefault();
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3.5 bg-[#070512]/95 backdrop-blur-2xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.65)]'
            : 'py-5 bg-gradient-to-b from-[#070512]/60 via-[#070512]/20 to-transparent backdrop-blur-[6px]'
        }`}
      >
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 flex items-center justify-between">
          <div className="flex-shrink-0 z-[60]">
            <Link
              to="/"
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="hover-target flex items-center gap-3 group"
            >
              {/* Actual Company Logo Image */}
              <img
                src="/logo.png"
                alt="Lumiora Logo"
                className="w-9 h-9 object-contain group-hover:rotate-[360deg] transition-transform duration-700"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-[0.12em] bg-gradient-to-r from-white via-[#C4B5FD] to-[#F472B6] bg-clip-text text-transparent group-hover:from-[#F472B6] group-hover:to-[#5E5BFF] transition-all duration-500 font-logo uppercase leading-none">
                  LUMIORA
                </span>
                <span className="text-[9.5px] font-bold tracking-[0.24em] text-[#A5A2FF] font-mono group-hover:text-white transition-colors uppercase mt-1">
                  WHERE INNOVATION BEGINS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.isRoute
                ? location.pathname === link.href
                : location.pathname === '/' && location.hash === link.href;

              const linkClasses = `text-sm font-medium transition-colors hover-target relative group py-1 tracking-wide ${
                isActive
                  ? 'text-[#A5A2FF] font-semibold drop-shadow-[0_0_12px_rgba(165,162,255,0.4)]'
                  : 'text-white/90 hover:text-[#A5A2FF]'
              }`;

              return link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    if (link.href === '/' && location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={linkClasses}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#5E5BFF] via-[#A5A2FF] to-[#F472B6] transition-all duration-300 ${
                      isActive ? 'w-full shadow-[0_0_8px_rgba(165,162,255,0.6)]' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className={linkClasses}
                >
                  {link.name}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#5E5BFF] via-[#A5A2FF] to-[#F472B6] transition-all duration-300 ${
                      isActive ? 'w-full shadow-[0_0_8px_rgba(165,162,255,0.6)]' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </a>
              );
            })}

            <VenomButton
              onClick={onOpenPlanner}
              gooColor="#5E5BFF"
              textColor="#FFFFFF"
              size={42}
              className="text-xs sm:text-sm font-bold ml-2"
            >
              Start Your Project
              <span className="ml-1 text-white">→</span>
            </VenomButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden z-[60]">
            <button
              className="w-10 h-10 flex flex-col justify-center items-center gap-1.5 hover-target"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-white block transition-all"
              />
              <motion.span
                animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-6 h-[2px] bg-[#A5A2FF] block transition-all"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                className="w-6 h-[2px] bg-white block transition-all"
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#070512]/98 backdrop-blur-2xl flex flex-col justify-center items-center text-white"
          >
            <div className="flex flex-col items-center gap-8 text-3xl font-bold tracking-tight">
              {navLinks.map((link, i) => (
                link.isRoute ? (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 + 0.2 }}
                  >
                    <Link
                      to={link.href}
                      onClick={(e) => {
                        setMenuOpen(false);
                        if (link.href === '/' && location.pathname === '/') {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="text-white hover:text-[#A5A2FF] transition-colors text-3xl font-bold tracking-tight"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ) : (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 + 0.2 }}
                    onClick={(e) => {
                      setMenuOpen(false);
                      handleAnchorClick(e, link.href);
                    }}
                    className="text-white hover:text-[#A5A2FF] transition-colors"
                  >
                    {link.name}
                  </motion.a>
                )
              ))}
              <div className="mt-8 flex justify-center">
                <VenomButton
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenPlanner();
                  }}
                  gooColor="#5E5BFF"
                  textColor="#FFFFFF"
                  size={54}
                  className="text-lg font-bold"
                >
                  Start Your Project →
                </VenomButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
