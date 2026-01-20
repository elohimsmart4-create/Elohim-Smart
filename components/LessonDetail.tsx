
import React, { useState } from 'react';
import { Lesson, Language } from '../types';

interface LessonDetailProps {
  lesson: Lesson;
  onBack: () => void;
  isBookmarked: boolean;
  onBookmark: () => void;
  language: Language;
}

const LessonDetail: React.FC<LessonDetailProps> = ({ lesson, onBack, isBookmarked, onBookmark, language }) => {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);

  const t = {
    [Language.SW]: {
      back: "Rudi",
      readingTime: "min kusoma",
      source: "Chanzo",
      takeaway: "Zingatio la Leo",
      sharePrompt: "Share maarifa haya na marafiki.",
      shareBtn: "Share Somo",
      copyBtn: "Nakili",
      copied: "Somo limenakiliwa!",
      success: "Tayari!"
    },
    [Language.EN]: {
      back: "Back",
      readingTime: "min read",
      source: "Insight from",
      takeaway: "Core Takeaway",
      sharePrompt: "Share this wisdom with others.",
      shareBtn: "Share Lesson",
      copyBtn: "Copy",
      copied: "Lesson copied!",
      success: "Great!"
    }
  }[language];

  const showPopup = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 2500);
  };

  const handleCopy = async () => {
    const fullText = `${lesson.title}\n\n${lesson.content.join('\n\n')}\n\n${t.takeaway}: ${lesson.takeaway}\n\nSource: Minute Class App`;
    try {
      await navigator.clipboard.writeText(fullText);
      showPopup(t.copied);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleShare = async () => {
    // Only include URL if it's a valid public web protocol to avoid "Invalid URL" errors in sandboxed environments
    const currentUrl = window.location.href;
    const isValidUrl = currentUrl.startsWith('http://') || currentUrl.startsWith('https://');

    const shareData: ShareData = {
      title: `Minute Class: ${lesson.title}`,
      text: `${lesson.title}\n\n${lesson.content[0].substring(0, 120)}...\n\nSoma zaidi kwenye Minute Class App.`,
    };

    if (isValidUrl) {
      shareData.url = currentUrl;
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Share failed:', err);
          // Fallback to copy if sharing fails
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24 relative">
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-indigo-600 transition-all group"
        >
          <div className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 group-hover:border-indigo-100">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
          </div>
          <span className="font-bold text-xs uppercase tracking-[0.2em]">{t.back}</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={handleCopy}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white text-slate-300 border border-slate-100 hover:text-indigo-600 transition-all"
            title={t.copyBtn}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
          </button>
          <button onClick={onBookmark} className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isBookmarked ? 'bg-indigo-600 text-white shadow-lg' : 'bg-white text-slate-300 border border-slate-100 hover:text-indigo-600'}`}>
            <svg className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
          </button>
        </div>
      </div>

      <div className="mb-12">
        <div className="flex items-center space-x-2 mb-4">
            <span className="px-3 py-1 bg-indigo-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg shadow-indigo-100">
                {lesson.category}
            </span>
            <span className="text-slate-300 font-bold text-[10px] uppercase tracking-widest">• {lesson.readTime} {t.readingTime}</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-[1.15] tracking-tight mb-8">
          {lesson.title}
        </h1>
        
        <div className="flex items-center py-5 border-y border-slate-100">
            <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mr-4 border border-indigo-100/50">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">{t.source}</p>
              <p className="text-xs font-extrabold text-slate-700">{lesson.inspiration}</p>
            </div>
        </div>
      </div>

      <div className="lesson-body text-slate-700">
        {lesson.content.map((para, idx) => (
          <p 
            key={idx} 
            className="mb-8 first-letter:text-4xl first-letter:font-black first-letter:text-indigo-600 first-letter:mr-2 animate-in fade-in"
            style={{ animationDelay: `${(idx + 1) * 150}ms` }}
          >
            {para}
          </p>
        ))}
      </div>

      <div className="mt-16 p-1 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[2.5rem] shadow-2xl shadow-indigo-200">
        <div className="bg-white/5 backdrop-blur-sm rounded-[2.4rem] p-10 text-white">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 opacity-60 flex items-center">
              <span className="w-12 h-px bg-white/30 mr-3"></span>
              {t.takeaway}
            </h3>
            <p className="text-2xl md:text-3xl font-black leading-tight italic">
              "{lesson.takeaway}"
            </p>
        </div>
      </div>

      <div className="mt-20 text-center animate-in fade-in" style={{ animationDelay: '800ms' }}>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">{t.sharePrompt}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 max-w-md mx-auto">
          <button 
              onClick={handleShare}
              className="w-full bg-slate-900 text-white py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 100-2.684 3 3 0 000 2.684zm0 12.684a3 3 0 100-2.684 3 3 0 000 2.684z" /></svg>
            <span>{t.shareBtn}</span>
          </button>
          <button 
              onClick={handleCopy}
              className="w-full bg-white border border-slate-200 text-slate-900 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
            <span>{t.copyBtn}</span>
          </button>
        </div>
      </div>

      {/* Visually Engaging Confirmation Pop-up */}
      {popupMessage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-[3rem] p-10 shadow-2xl shadow-indigo-200/50 max-w-xs w-full text-center animate-in zoom-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">{t.success}</h3>
            <p className="text-slate-500 font-bold leading-relaxed">{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonDetail;
