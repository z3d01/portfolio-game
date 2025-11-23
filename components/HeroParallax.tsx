
import React, { useEffect, useState } from 'react';

const HeroParallax: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Use requestAnimationFrame for smoother visual updates
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax calculations
  // 0 - 1 progress based on initial viewport height
  const progress = Math.min(scrollY / 800, 1);
  
  const birdY = scrollY * 1.1;
  const birdRotation = scrollY * 0.15;
  
  const pipeSpeed = scrollY * 0.5;
  const cloudSpeed = scrollY * 0.2;
  
  const marioFloorRise = Math.max(0, scrollY - 200); // Delay the ground slightly

  // Dynamic Background: Transition from Flappy Cyan (#4EC0CA) to Mario Blue (#5C94FC)
  // We can achieve this with an overlay opacity or CSS gradient variable
  
  return (
    <div className="relative h-[130vh] overflow-hidden w-full bg-[#4EC0CA] z-0">
      <style>{`
        @keyframes bird-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes bird-flap {
          0% { transform: rotate(-20deg) scaleY(1); }
          50% { transform: rotate(10deg) scaleY(0.8); }
        }
        .animate-bird-bob {
          animation: bird-bob 0.6s ease-in-out infinite;
        }
        .animate-bird-flap {
          animation: bird-flap 0.2s steps(2) infinite;
        }
      `}</style>

      {/* Sky Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-[#5C94FC] pointer-events-none transition-opacity duration-75"
        style={{ opacity: progress }}
      ></div>

      {/* Layer 1: Clouds (Shared Universe) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-16 bg-white/80 rounded-full blur-sm" 
             style={{ transform: `translate(${-cloudSpeed}px, ${scrollY * 0.1}px)` }}></div>
        <div className="absolute top-40 right-20 w-48 h-20 bg-white/60 rounded-full blur-sm"
             style={{ transform: `translate(${cloudSpeed}px, ${scrollY * 0.15}px)` }}></div>
        
        <div className="absolute top-32 left-1/2 -translate-x-1/2 z-20 text-center w-full px-4" style={{ transform: `translate(-50%, ${scrollY * 0.8}px)` }}>
            <h1 className="text-4xl md:text-6xl text-white font-pixel drop-shadow-[4px_4px_0_#000]">
            CODE YOUR DREAMS
            </h1>
            <span className="block text-lg md:text-2xl mt-4 text-yellow-300 font-bold font-mono bg-black/30 inline-block px-4 py-2 rounded">
                Unity & C# Masterclass
            </span>
        </div>
      </div>

      {/* Layer 2: Flappy Elements (Leaving scene) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Top Pipe */}
        <div 
          className="absolute -top-20 left-[10%] w-24 h-96 bg-green-500 border-4 border-black"
          style={{ transform: `translateY(${-pipeSpeed}px)` }}
        >
            <div className="absolute bottom-0 w-[120%] -left-[10%] h-12 bg-green-500 border-4 border-black"></div>
        </div>
        
        {/* Bottom Pipe (Moves down faster to clear way for Mario) */}
        <div 
          className="absolute bottom-0 right-[15%] w-24 h-64 bg-green-500 border-4 border-black"
          style={{ transform: `translateY(${pipeSpeed * 1.5}px)` }}
        >
             <div className="absolute top-0 w-[120%] -left-[10%] h-12 bg-green-500 border-4 border-black"></div>
        </div>
      </div>

      {/* Character (The "Player") - Transforms from "Flying" to "Falling" */}
      <div 
        className="absolute top-[30vh] left-1/2 w-16 h-16 z-30"
        style={{ 
            transform: `translate(-50%, ${birdY}px) rotate(${birdRotation}deg)` 
        }}
      >
        {/* Pixel Bird Body with Bobbing */}
        <div className="w-full h-full bg-yellow-400 rounded-md border-4 border-black relative animate-bird-bob">
            <div className="w-8 h-8 bg-white rounded-full absolute top-1 right-2 border-2 border-black">
                 <div className="w-3 h-3 bg-black rounded-full absolute top-2 right-2"></div>
            </div>
            <div className="w-10 h-6 bg-orange-500 absolute -right-4 top-8 border-2 border-black rounded-r-md"></div>
            {/* Wing with Flapping */}
            <div className="w-8 h-5 bg-white border-2 border-black absolute -left-3 top-6 rounded-full animate-bird-flap origin-top-left"></div>
        </div>
      </div>

      {/* Layer 3: Mario Terrain (Entering scene) */}
      <div 
        className="absolute bottom-[-20vh] w-full h-[50vh] z-20 pointer-events-none flex flex-col justify-end"
        style={{ transform: `translateY(${-marioFloorRise * 0.8}px)` }}
      >
        {/* Floating Platforms */}
        <div className="w-full flex justify-center gap-4 mb-16">
             {[1, 2, 3].map((i) => (
                 <div key={i} className="w-16 h-16 relative group">
                     <div className={`w-full h-full border-4 border-black ${i === 2 ? 'bg-yellow-400 animate-pulse' : 'bg-[#B73303]'}`}>
                        {i !== 2 && (
                           <>
                             <div className="absolute top-0 left-0 w-full h-full border-t-4 border-l-4 border-white/20"></div>
                             <div className="absolute bottom-0 right-0 w-full h-full border-b-4 border-r-4 border-black/20"></div>
                           </>
                        )}
                        {i === 2 && <span className="flex items-center justify-center h-full text-3xl font-pixel font-bold text-black">?</span>}
                     </div>
                 </div>
             ))}
        </div>

        {/* The Ground */}
        <div className="w-full h-32 bg-[#E6906F] border-t-4 border-black relative overflow-hidden">
             {/* Grass Top */}
             <div className="absolute top-0 left-0 w-full h-4 bg-[#00A800] opacity-80"></div>
             
             {/* Pattern */}
             <div className="flex flex-wrap w-[110%]">
                 {Array.from({ length: 60 }).map((_, i) => (
                     <div key={i} className="w-12 h-12 border-r-2 border-b-2 border-black/10 relative">
                         <div className="absolute top-1 left-1 w-1 h-1 bg-black/20"></div>
                         <div className="absolute bottom-2 right-2 w-1 h-1 bg-black/20"></div>
                     </div>
                 ))}
             </div>

             {/* Pipe rising from ground */}
             <div className="absolute bottom-0 left-20 w-24 h-24 bg-[#00A800] border-4 border-black flex flex-col items-center">
                <div className="w-[110%] h-10 bg-[#00A800] border-4 border-black -mt-4"></div>
             </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce text-center z-40 transition-opacity duration-300"
        style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
      >
        <p className="font-pixel text-xs md:text-sm mb-2 text-black bg-white p-1 px-2 border-2 border-black">START GAME</p>
        <svg className="w-8 h-8 mx-auto text-white drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </div>
  );
};

export default HeroParallax;
