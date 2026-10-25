import { Link, useLocation } from 'react-router-dom';
import { Mail, ArrowUp } from 'lucide-react';

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z" />
  </svg>
);

const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      className="relative border-t border-white/10 overflow-hidden bg-[#05030e] text-white"
    >
      {/* Subtle ambient light glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-8 relative z-10">
        
        {/* Compact Main Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* Brand & Slogan */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <Link 
              to="/" 
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
              className="flex items-center gap-3 group hover-target"
            >
              <img 
                src="/logo.png" 
                alt="LUMIORA Logo" 
                className="w-8 h-8 object-contain group-hover:rotate-[360deg] transition-transform duration-700" 
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-[0.12em] bg-gradient-to-r from-white via-[#C4B5FD] to-[#F472B6] bg-clip-text text-transparent font-logo uppercase leading-none">
                  LUMIORA
                </span>
                <span className="text-[9.5px] font-bold tracking-[0.24em] text-[#A5A2FF] group-hover:text-white transition-colors uppercase mt-0.5 font-mono">
                  WHERE INNOVATION BEGINS
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-block w-px h-6 bg-white/10" />

            {/* Availability Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Available for Projects
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-slate-300">
            <a href="#services" onClick={(e) => handleAnchorClick(e, '#services')} className="hover:text-[#A5A2FF] transition-colors hover-target">
              Services
            </a>
            <Link to="/work" className="hover:text-[#A5A2FF] transition-colors hover-target">
              Selected Work
            </Link>
            <a href="#about" onClick={(e) => handleAnchorClick(e, '#about')} className="hover:text-[#A5A2FF] transition-colors hover-target">
              About
            </a>
            <Link to="/team" className="hover:text-[#A5A2FF] transition-colors hover-target">
              Team
            </Link>
            <Link to="/blog" className="hover:text-[#A5A2FF] transition-colors hover-target">
              Insights
            </Link>
            <a href="#contact" onClick={(e) => handleAnchorClick(e, '#contact')} className="hover:text-[#A5A2FF] transition-colors hover-target">
              Contact
            </a>
          </nav>

          {/* Direct Email Action */}
          <div className="flex items-center gap-3">
            <a 
              href="mailto:lumiora.innovate@gmail.com"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-[#A5A2FF] bg-white/5 hover:bg-white/10 px-3.5 py-1.5 rounded-full border border-white/15 shadow-sm transition-all hover-target"
            >
              <Mail className="w-3.5 h-3.5 text-[#A5A2FF]" />
              <span>lumiora.innovate@gmail.com</span>
            </a>
          </div>

        </div>

        {/* Compact Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-medium text-slate-400">
          
          <div>
            © {new Date().getFullYear()} <span className="font-semibold text-white">LUMIORA</span>. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {[
              { icon: TwitterIcon, href: "https://twitter.com", label: "Twitter" },
              { icon: LinkedinIcon, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: GithubIcon, href: "https://github.com", label: "GitHub" },
              { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 hover:border-[#A5A2FF]/40 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-xs hover:scale-110 hover-target"
              >
                <s.icon className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>

          {/* Scroll to Top */}
          <button 
            onClick={scrollToTop} 
            className="inline-flex items-center gap-1 text-slate-400 hover:text-[#A5A2FF] transition-colors hover-target font-semibold cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3 h-3" />
          </button>

        </div>

      </div>
    </footer>
  );
};
