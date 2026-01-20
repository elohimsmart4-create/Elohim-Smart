
import React from 'react';
import { Lesson, Language } from '../types';

interface BookmarkListProps {
  bookmarks: Lesson[];
  onOpenLesson: (l: Lesson) => void;
  onRemove: (l: Lesson) => void;
  language: Language;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onOpenLesson, onRemove, language }) => {
  const isSwahili = language === Language.SW;

  if (bookmarks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center animate-in fade-in duration-500">
        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mb-8 border border-slate-100">
          <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
        </div>
        <h3 className="text-xl font-black text-slate-900">
            {isSwahili ? 'Hujajihifadhia masomo bado' : 'Your library is empty'}
        </h3>
        <p className="text-slate-400 max-w-xs mx-auto mt-3 font-medium text-sm">
            {isSwahili ? 'Masomo utakayoyahifadhi yataonekana hapa kwa ajili ya kusoma baadaye.' : 'Lessons you bookmark will appear here for later reading.'}
        </p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="text-3xl font-black text-slate-900 mb-8">{isSwahili ? 'Maktaba Yako' : 'Your Library'}</h2>
      <div className="space-y-4">
        {bookmarks.map(lesson => (
          <div 
            key={lesson.id}
            className="flex items-center p-6 bg-white border border-slate-100 rounded-[2rem] group hover:border-indigo-100 hover:shadow-lg transition-all shadow-sm"
          >
            <div className="flex-1 cursor-pointer" onClick={() => onOpenLesson(lesson)}>
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">{lesson.category}</span>
              <h3 className="text-lg font-black text-slate-800 group-hover:text-indigo-600 transition-colors leading-tight mt-1">{lesson.title}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2">{lesson.date}</p>
            </div>
            <button 
              onClick={() => onRemove(lesson)}
              className="p-3 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookmarkList;
