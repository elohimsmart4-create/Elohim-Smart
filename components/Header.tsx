
import React from 'react';
import { View, Language } from '../types';

interface HeaderProps {
  currentView: View;
  setView: (v: View) => void;
  language: Language;
  streakCount: number;
  onLanguageToggle: () => void;
  onHomeClick: () => void;
  onInfoClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView, language, streakCount, onLanguageToggle, onHomeClick, onInfoClick }) => {
  return (
    <header className="sticky top-0 glass-nav z-40 px-6 py-5">
      <div className="flex items-center justify-between">
        <div 
            className="flex items-center space-x-4 cursor-pointer group"
            onClick={onHomeClick}
        >
          <div className="relative">
            <div className="w-10 h-10 active-pill rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-all duration-500">
              <span className="font-black text-xl italic leading-none">M</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 tracking-tight leading-none">Minute Class</h1>
            <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.25em] mt-1.5 opacity-80">
                {language === Language.SW ? 'Mafunzo ya Leo' : 'Today\'s Insight'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
            {streakCount > 0 && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 bg-orange-50 border border-orange-100/50 text-orange-600 rounded-full animate-in zoom-in">
                <span className="text-xs font-black">{streakCount}</span>
                <span className="text-sm">🔥</span>
              </div>
            )}
            
            <button 
                onClick={onLanguageToggle}
                className="w-10 h-10 flex items-center justify-center bg-white border border-slate-100 rounded-full hover:bg-slate-50 transition-all text-[10px] font-black uppercase tracking-widest text-slate-500 shadow-sm"
            >
                {language === Language.SW ? 'EN' : 'SW'}
            </button>
            
            <button 
              onClick={onInfoClick}
              className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white transition-all rounded-full hover:bg-indigo-600 shadow-lg shadow-slate-200 active:scale-95"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
