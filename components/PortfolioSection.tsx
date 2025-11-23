
import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: "Neon Racer 2077",
    description: "Endless runner sci-fi dengan procedural generation.",
    image: "https://picsum.photos/seed/racer/600/400",
    tags: ["Unity 3D", "C#", "Shader Graph"],
    demoLink: "#",
    repoLink: "#"
  },
  {
    id: 2,
    title: "Kingdom Defense",
    description: "Game strategi Tower Defense dengan sistem AI pathfinding.",
    image: "https://picsum.photos/seed/defense/600/400",
    tags: ["Unity 2D", "A* Algorithm", "ScriptableObjects"],
    demoLink: "#",
    repoLink: "#"
  },
  {
    id: 3,
    title: "Dungeon Crawler",
    description: "RPG klasik dengan sistem inventory dan combat turn-based.",
    image: "https://picsum.photos/seed/dungeon/600/400",
    tags: ["C#", "MVC Pattern", "UI Toolkit"],
    repoLink: "#"
  }
];

const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="py-20 bg-slate-900 border-t-8 border-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-pixel text-center mb-4 text-white">
          <span className="text-yellow-400">SELECT</span> WORLD
        </h2>
        <p className="text-center text-gray-400 mb-12 font-mono max-w-2xl mx-auto">
          Project terpilih yang dibuat menggunakan Unity Engine & C#. Klik "Start" untuk melihat demo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-800 rounded-lg border-4 border-slate-700 hover:border-yellow-400 transition-all hover:-translate-y-2 shadow-[0_0_0_0_rgba(0,0,0,0)] hover:shadow-[8px_8px_0_0_#000] group overflow-hidden flex flex-col">
              {/* Cartridge Header */}
              <div className="bg-slate-700 p-2 border-b-4 border-slate-600 flex justify-between items-center">
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                </div>
                <span className="font-pixel text-[10px] text-slate-400">ROM-{project.id}00</span>
              </div>

              {/* Image Area */}
              <div className="relative h-48 bg-black overflow-hidden group">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 font-pixel">{project.title}</h3>
                <p className="text-gray-300 text-sm mb-4 font-mono flex-1">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-slate-900 border border-slate-600 text-green-400 text-xs font-bold font-mono rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 mt-auto">
                  {project.demoLink && (
                    <a href={project.demoLink} className="flex-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold font-pixel text-xs py-3 px-4 text-center border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all rounded-sm">
                      START
                    </a>
                  )}
                  {project.repoLink && (
                    <a href={project.repoLink} className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold font-pixel text-xs py-3 px-4 text-center border-b-4 border-slate-800 active:border-b-0 active:translate-y-1 transition-all rounded-sm">
                      CODE
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
