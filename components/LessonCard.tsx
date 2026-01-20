
import React from 'react';
import { Lesson } from '../types';

interface LessonCardProps {
  lesson: Lesson;
  onClick: () => void;
  isBookmarked: boolean;
  onBookmark: (e: React.MouseEvent) => void;
}

const LessonCard: React.FC<LessonCardProps> = ({ lesson, onClick, isBookmarked, onBookmark }) => {
  return (
    <div 
      onClick={onClick}
      className="group relative bg-white rounded-[2.5rem] p-8 shadow-premium border border-white/40 hover:translate-y-[-6px] transition-all duration-500 cursor-pointer active:scale-[0.98] overflow-hidden"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
            <span className="px-4 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-xl">
                {lesson.category}
            </span>
            <span className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">• {lesson.readTime}</span>
        </div>
        <button 
          onClick={(e) => { e.stopPropagation(); onBookmark(e); }}
          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isBookmarked ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-50 text-slate-300 hover:text-indigo-400 hover:bg-indigo-50/50'}`}
        >
          <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
          </svg>
        </button>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors leading-[1.2] tracking-tight">
        {lesson.title}
      </h2>
      
      <p className="text-slate-500 text-base line-clamp-2 mb-8 leading-relaxed font-medium">
        {lesson.content[0]}
      </p>
      
      <div className="flex items-center justify-between pt-6 border-t border-slate-50">
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Soma Makala</span>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:translate-x-1 transition-transform">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </div>
      </div>
      
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[80px] rounded-full"></div>
    </div>
  );
};

export default LessonCard;
