
import React from 'react';
import { Language } from '../types';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  streakCount: number;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, language, streakCount }) => {
  const isSwahili = language === Language.SW;

  const t = {
    title: isSwahili ? "Kuhusu App" : "About App",
    streakTitle: isSwahili ? "Siku za Kujifunza" : "Learning Streak",
    streakDesc: isSwahili ? "Umejifunza mfululizo kwa siku hizi." : "You've learned for these consecutive days.",
    developer: isSwahili ? "Imetengenezwa na" : "Developed by",
    version: "v1.2.0 (BETA)",
    close: isSwahili ? "Funga" : "Close",
    mission: isSwahili ? "Lengo: Kujenga utamaduni wa kujifunza kila siku." : "Goal: Building a daily learning habit.",
    thanks: isSwahili ? "Asante kwa kuwa sehemu ya Minute Class!" : "Thank you for being part of Minute Class!"
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl max-w-sm w-full relative animate-in zoom-in duration-300">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-slate-300 hover:text-slate-900 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center text-white text-3xl font-black italic mx-auto mb-6 shadow-xl shadow-indigo-100">
            M
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-2">Minute Class</h2>
          <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{t.version}</p>
        </div>

        <div className="bg-slate-50 rounded-[2rem] p-6 mb-8 border border-slate-100">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.streakTitle}</h3>
            <span className="text-orange-500">🔥</span>
          </div>
          <div className="flex items-end space-x-2">
            <span className="text-4xl font-black text-slate-900 leading-none">{streakCount}</span>
            <span className="text-slate-400 font-bold text-sm pb-1">{isSwahili ? 'Siku' : 'Days'}</span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 mt-3 leading-relaxed">
            {t.streakDesc}
          </p>
        </div>

        <div className="space-y-6 mb-10">
          <div className="text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{t.mission}</p>
          </div>
          <div className="text-center pt-4 border-t border-slate-100">
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-2">{t.developer}</p>
            <p className="text-lg font-black text-slate-900">Lambert P.M</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95"
        >
          {t.close}
        </button>
        
        <p className="text-center mt-6 text-[10px] font-bold text-slate-300 italic">{t.thanks}</p>
      </div>
    </div>
  );
};

export default InfoModal;
