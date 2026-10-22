import { Link, useLocation } from 'react-router-dom';

export const Footer = () => {
  const location = useLocation();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (location.pathname === '/') {
      e.preventDefault();
      const targetId = href.replace('/#', '').replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="relative border-t border-stone-200/80 bg-stone-50/60 dark:bg-stone-950/60 backdrop-blur-xl py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
        
        {/* Brand identity column */}
        <div className="flex flex-col items-start gap-3">
          <Link 
            to="/" 
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-3 group"
          >
            <img 
              src="/logo.png" 
              alt="LUMIORA Logo" 
              className="w-9 h-9 object-contain group-hover:rotate-[360deg] transition-transform duration-700" 
            />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-[0.25em] bg-gradient-to-r from-[#5E5BFF] to-[#A855F7] bg-clip-text text-transparent group-hover:from-[#A855F7] group-hover:to-[#5E5BFF] transition-all duration-500 font-logo uppercase leading-none">
                LUMIORA
              </span>
              <span className="text-[9px] font-semibold tracking-[0.25em] text-stone-400 group-hover:text-[#5E5BFF] transition-colors uppercase mt-1">
                WEB • APPS • MARKETING
              </span>
            </div>
          </Link>

          <p className="text-sm font-medium text-stone-500 tracking-wider mt-1">
            Where Innovation Begins.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-stone-600">
          <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="hover:text-[#5E5BFF] transition-colors">
            Services
          </a>
          <Link to="/work" className="hover:text-[#5E5BFF] transition-colors">
            Work
          </Link>
          <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')} className="hover:text-[#5E5BFF] transition-colors">
            About
          </a>
          <Link to="/team" className="hover:text-[#5E5BFF] transition-colors">
            Team
          </Link>
          <Link to="/blog" className="hover:text-[#5E5BFF] transition-colors">
            Insights
          </Link>
          <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')} className="hover:text-[#5E5BFF] transition-colors">
            Contact
          </a>
        </div>

        {/* Copyright notice */}
        <div className="text-xs text-stone-400 font-medium">
          © {new Date().getFullYear()} LUMIORA. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
