
import React, { useState, useEffect } from 'react';
import HeroParallax from './components/HeroParallax';
import BotChat from './components/BotChat';
import SkillsSection from './components/SkillsSection';
import PortfolioSection from './components/PortfolioSection';
import TutorialSection from './components/TutorialSection';

const App: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      const headerOffset = 85; // Height of sticky header + small buffer
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: "#about", label: "ABOUT" },
    { href: "#skills", label: "STATS" },
    { href: "#portfolio", label: "GAMES" },
    { href: "#tutorials", label: "CODE" },
    { href: "#contact", label: "CONTACT" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 overflow-x-hidden">
      {/* Navigation - Sticky */}
      <nav className="fixed top-0 left-0 w-full bg-slate-900/95 backdrop-blur-md border-b-4 border-black z-50 transition-all">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-yellow-400 font-pixel text-lg md:text-xl z-50 relative cursor-pointer" onClick={scrollToTop}>
            DEV<span className="text-white">.TEACHER</span>
          </div>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-8 font-bold text-sm">
            {navLinks.map((link) => (
              <li key={link.label} className="hover:text-yellow-400 cursor-pointer transition-colors">
                <a 
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button 
            className="md:hidden text-white text-2xl z-50 relative focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`md:hidden absolute top-full left-0 w-full bg-slate-900 border-b-4 border-black shadow-xl transition-all duration-300 ease-in-out origin-top ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 h-0'}`}>
           <ul className="flex flex-col p-6 gap-4 font-bold text-center">
             {navLinks.map((link) => (
                <li key={link.label} className="border-b border-slate-700 pb-2 last:border-0">
                  <a 
                    href={link.href} 
                    className="block hover:text-yellow-400 py-2"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
             ))}
           </ul>
        </div>
      </nav>

      <HeroParallax />

      {/* About Section */}
      <section id="about" className="py-20 bg-slate-800 relative border-t-8 border-black z-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
          <div className="w-64 h-64 shrink-0 bg-yellow-400 rounded-full border-8 border-white shadow-[0_0_0_8px_rgba(0,0,0,1)] overflow-hidden relative">
             <img 
               src="https://picsum.photos/400/400?grayscale" 
               alt="Instructor" 
               className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
             />
          </div>
          <div>
            <h2 className="text-3xl font-pixel mb-6 text-white">Hello, World!</h2>
            <p className="text-lg leading-relaxed text-gray-300 mb-4">
              Saya adalah seorang <strong className="text-yellow-400">Game Developer</strong> dan <strong className="text-green-400">Instruktur</strong> yang berdedikasi. 
              Dengan pengalaman lebih dari 5 tahun menggunakan <span className="text-purple-400 font-mono">Unity</span> dan <span className="text-purple-400 font-mono">C#</span>, 
              saya membantu pemula mengubah ide gila mereka menjadi game yang dapat dimainkan.
            </p>
            <p className="text-lg leading-relaxed text-gray-300">
              Pendekatan saya simpel: <em className="italic">Learn by Doing</em>. Kita tidak hanya menulis kode, kita membangun dunia.
            </p>
            <div className="mt-8 flex gap-4">
                <a 
                  href="#tutorials" 
                  onClick={(e) => handleNavClick(e, '#tutorials')}
                  className="bg-red-500 hover:bg-red-600 text-white font-pixel py-3 px-6 border-b-4 border-red-800 active:border-b-0 active:translate-y-1 transition-all text-center"
                >
                    START COURSE
                </a>
                <a 
                  href="#portfolio" 
                  onClick={(e) => handleNavClick(e, '#portfolio')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-pixel py-3 px-6 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all text-center"
                >
                    VIEW GAMES
                </a>
            </div>
          </div>
        </div>
      </section>

      <SkillsSection />
      
      <PortfolioSection />
      
      <TutorialSection />

      {/* Curriculum / Levels Section */}
      <section id="curriculum" className="py-20 bg-[#5C94FC] relative border-y-8 border-black">
         {/* Decorative Clouds */}
         <div className="absolute top-10 left-10 text-white/30 text-9xl select-none">☁</div>
         <div className="absolute bottom-20 right-20 text-white/30 text-8xl select-none">☁</div>

         <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-4xl font-pixel text-center mb-16 text-white drop-shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
              COURSE MAP
            </h2>
            
            <div className="flex flex-col md:flex-row justify-center gap-8">
                {[
                    { title: "Level 1: C# Basics", desc: "Variables, Loops, OOP", color: "bg-green-500" },
                    { title: "Level 2: Unity Physics", desc: "Rigidbody, Colliders, Raycast", color: "bg-yellow-400" },
                    { title: "Level 3: Game Polish", desc: "Particles, UI, Sound", color: "bg-red-500" }
                ].map((level, idx) => (
                    <div key={idx} className={`${level.color} p-1 rounded-xl border-4 border-black w-full md:w-1/3 transform hover:-translate-y-2 transition-transform duration-300 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)]`}>
                        <div className="bg-white/90 h-full p-6 rounded-lg text-black">
                            <h3 className="text-xl font-bold font-pixel mb-2">{level.title}</h3>
                            <p className="font-mono text-sm">{level.desc}</p>
                            <div className="mt-4 flex justify-end">
                                <span className="text-2xl">⭐</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* Contact & AI Section */}
      <section id="contact" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-pixel text-yellow-400 mb-8">ASK THE SENSEI</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Ingin tahu silabus lengkap? Atau bingung kenapa kodemu error? Tanya asisten AI saya di bawah ini!
            </p>
            
            <BotChat />

            <div className="mt-20 border-t border-slate-700 pt-10 text-slate-500 font-mono text-sm hover:text-[#00FF41] hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.8)] transition-all duration-300 cursor-default">
                <p>&copy; {new Date().getFullYear()} GameDev Instructor. Built with React & Tailwind.</p>
                <p className="mt-2 group">
                  Press Start to Continue
                  <span className="inline-block animate-pulse ml-1 text-[#00FF41] opacity-0 group-hover:opacity-100 transition-opacity">_</span>
                </p>
            </div>
        </div>
      </section>

      {/* Scroll To Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-yellow-400 hover:bg-yellow-300 text-black border-4 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={4}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
};

export default App;
