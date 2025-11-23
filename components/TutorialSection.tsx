
import React, { useState } from 'react';
import { Tutorial } from '../types';

const tutorials: Tutorial[] = [
  {
    id: 'movement',
    title: 'Player Movement',
    description: 'Dasar pergerakan karakter menggunakan Rigidbody dan Input System.',
    difficulty: 'Easy',
    codeSnippet: `using UnityEngine;

public class PlayerMovement : MonoBehaviour {
    public float speed = 5f;
    private Rigidbody2D rb;

    void Start() {
        rb = GetComponent<Rigidbody2D>();
    }

    void Update() {
        float moveX = Input.GetAxis("Horizontal");
        // Physics calculation
        rb.velocity = new Vector2(moveX * speed, rb.velocity.y);
    }
}`
  },
  {
    id: 'collision',
    title: 'Detect Collision',
    description: 'Mendeteksi tabrakan antar objek untuk logika game over atau skor.',
    difficulty: 'Easy',
    codeSnippet: `using UnityEngine;

public class CollisionHandler : MonoBehaviour {
    void OnCollisionEnter2D(Collision2D other) {
        if (other.gameObject.CompareTag("Enemy")) {
            Debug.Log("Game Over!");
            // Reload scene logic here
        }
    }

    void OnTriggerEnter2D(Collider2D other) {
        if (other.CompareTag("Coin")) {
            Destroy(other.gameObject);
            ScoreManager.AddScore(10);
        }
    }
}`
  },
  {
    id: 'singleton',
    title: 'Game Manager',
    description: 'Pola Singleton untuk mengatur state game secara global.',
    difficulty: 'Medium',
    codeSnippet: `using UnityEngine;

public class GameManager : MonoBehaviour {
    public static GameManager Instance { get; private set; }
    
    public int Score { get; private set; }

    private void Awake() {
        if (Instance != null && Instance != this) {
            Destroy(this);
            return;
        }
        Instance = this;
        DontDestroyOnLoad(gameObject);
    }
}`
  }
];

const TutorialSection: React.FC = () => {
  const [activeTutorial, setActiveTutorial] = useState<Tutorial>(tutorials[0]);

  return (
    <section id="tutorials" className="py-20 bg-[#2D2D2D] text-white border-t-8 border-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-4xl font-pixel text-yellow-400 mb-2">
                QUICK <span className="text-white">TUTORIALS</span>
                </h2>
                <p className="text-gray-400 font-mono">Pelajari konsep dasar Unity dalam 60 detik.</p>
            </div>
            <div className="hidden md:block animate-bounce text-4xl">👨‍💻</div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 bg-black p-4 rounded-xl border-4 border-slate-600 shadow-2xl">
          {/* Sidebar List */}
          <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {tutorials.map((tut) => (
              <button
                key={tut.id}
                onClick={() => setActiveTutorial(tut)}
                className={`p-4 text-left font-mono text-sm rounded border-l-4 transition-all ${
                  activeTutorial.id === tut.id 
                    ? 'bg-slate-800 border-yellow-400 text-white' 
                    : 'bg-slate-900 border-transparent text-gray-500 hover:bg-slate-800'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{tut.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded ${
                        tut.difficulty === 'Easy' ? 'bg-green-900 text-green-400' : 'bg-orange-900 text-orange-400'
                    }`}>{tut.difficulty}</span>
                </div>
                <p className="text-xs opacity-70 truncate">{tut.description}</p>
              </button>
            ))}
          </div>

          {/* Code Viewer (VS Code Style) */}
          <div className="w-full lg:w-2/3 bg-[#1E1E1E] rounded-lg overflow-hidden flex flex-col font-mono border border-slate-700">
            {/* Editor Header */}
            <div className="bg-[#252526] px-4 py-2 flex items-center gap-4 text-xs text-gray-400 border-b border-black">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <span className="ml-4 bg-[#1E1E1E] px-3 py-1 rounded-t text-white">{activeTutorial.title}.cs</span>
            </div>

            {/* Code Area */}
            <div className="p-6 overflow-x-auto custom-scrollbar flex-1">
              <pre className="text-sm leading-relaxed text-[#D4D4D4]">
                <code>
                  {activeTutorial.codeSnippet.split('\n').map((line, i) => (
                    <div key={i} className="table-row">
                        <span className="table-cell text-gray-600 select-none w-8 text-right pr-4">{i + 1}</span>
                        <span className="table-cell whitespace-pre-wrap">{highlightSyntax(line)}</span>
                    </div>
                  ))}
                </code>
              </pre>
            </div>
            
            {/* Explanation Footer */}
            <div className="bg-[#007ACC] text-white px-4 py-2 text-xs flex justify-between items-center">
                 <span>READY</span>
                 <span>UTF-8</span>
                 <span>C#</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple pseudo-syntax highlighting for demo purposes
const highlightSyntax = (line: string) => {
  const keywords = ['using', 'public', 'class', 'void', 'float', 'int', 'private', 'new', 'return', 'if', 'static'];
  const unityTypes = ['MonoBehaviour', 'Rigidbody2D', 'Vector2', 'Input', 'Debug', 'GameObject', 'Collision2D', 'Collider2D'];
  
  let formatted = line;
  
  // Very basic replacement - in a real app use Prism.js or similar
  keywords.forEach(k => {
      formatted = formatted.replace(new RegExp(`\\b${k}\\b`, 'g'), `<span class="text-[#569CD6]">${k}</span>`);
  });
  
  unityTypes.forEach(t => {
      formatted = formatted.replace(new RegExp(`\\b${t}\\b`, 'g'), `<span class="text-[#4EC9B0]">${t}</span>`);
  });
  
  formatted = formatted.replace(/"(.*?)"/g, '<span class="text-[#CE9178]">"$1"</span>');
  formatted = formatted.replace(/\/\/(.*)/g, '<span class="text-[#6A9955] italic">//$1</span>');

  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
};

export default TutorialSection;
