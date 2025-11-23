import React, { useState } from 'react';
import { askTeachingAssistant } from '../services/geminiService';
import { ChatState } from '../types';

const BotChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [status, setStatus] = useState<ChatState>(ChatState.IDLE);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setStatus(ChatState.LOADING);
    setResponse(null);
    
    const answer = await askTeachingAssistant(input);
    
    setResponse(answer);
    setStatus(ChatState.SUCCESS);
    setInput('');
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg border-4 border-yellow-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] max-w-2xl mx-auto mt-10">
      <div className="flex items-center gap-4 mb-4 border-b-2 border-slate-600 pb-4">
        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center border-2 border-white">
          <span className="text-2xl">🤖</span>
        </div>
        <div>
          <h3 className="text-xl font-pixel text-yellow-400">PixelBot Assistant</h3>
          <p className="text-sm text-gray-300">Tanya tentang C#, Unity, atau Kursus!</p>
        </div>
      </div>

      <div className="bg-slate-900 p-4 rounded mb-4 min-h-[100px] font-mono text-green-400 border border-slate-700">
        {status === ChatState.IDLE && <p className="opacity-50">// System ready. Waiting for input...</p>}
        {status === ChatState.LOADING && <p className="animate-pulse">Analyzing query...</p>}
        {status === ChatState.SUCCESS && <p>{response}</p>}
        {status === ChatState.ERROR && <p className="text-red-500">Error accessing server.</p>}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="e.g., Apa itu Rigidbody di Unity?"
          className="flex-1 bg-slate-700 text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400 font-bold"
        />
        <button 
          type="submit"
          disabled={status === ChatState.LOADING}
          className="bg-yellow-400 text-black font-pixel px-6 py-2 hover:bg-yellow-300 disabled:opacity-50 transition-colors"
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default BotChat;