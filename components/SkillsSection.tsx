import React from 'react';
import { Skill } from '../types';

const skills: Skill[] = [
  { name: 'C# Programming', level: 95, icon: '👾' },
  { name: 'Unity Engine 3D/2D', level: 90, icon: '🎮' },
  { name: 'Game Physics', level: 85, icon: '📐' },
  { name: 'UI/UX for Games', level: 80, icon: '🎨' },
  { name: 'Multiplayer (Netcode)', level: 70, icon: '🌐' },
];

const SkillsSection: React.FC = () => {
  return (
    <section className="py-20 bg-slate-900 text-white" id="skills">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-pixel text-center mb-16 text-yellow-400">
          <span className="text-red-500">PLAYER</span> STATS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {skills.map((skill) => (
            <div key={skill.name} className="bg-slate-800 p-6 rounded-lg border-2 border-slate-600 hover:border-yellow-400 transition-all group">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-xl flex items-center gap-2">
                  <span className="text-2xl group-hover:animate-bounce">{skill.icon}</span> {skill.name}
                </span>
                <span className="font-mono text-yellow-400">{skill.level}/100</span>
              </div>
              <div className="w-full bg-slate-700 h-6 rounded-full overflow-hidden border-2 border-black relative">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-full relative"
                  style={{ width: `${skill.level}%` }}
                >
                    <div className="absolute top-0 right-0 h-full w-2 bg-white/50 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;